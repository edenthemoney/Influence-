import { NextResponse } from 'next/server';

// Fetches new music releases from Spotify filtered by genre
// Make.com calls this weekly to get fresh prospects for the music reactions pipeline
// Returns: artist name, track, genre, energy, tempo, spotify_url, artist_id

const TARGET_GENRES = ['hip-hop', 'rap', 'r-n-b', 'reggae', 'dancehall', 'trap', 'afrobeats'];

async function getSpotifyToken(): Promise<string> {
  const creds = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();
  return data.access_token;
}

export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${process.env.OUTREACH_WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const genre = searchParams.get('genre') || 'hip-hop';

    const token = await getSpotifyToken();

    // Search for new releases in the target genre using tag:new for recency
    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=tag:new+genre:${encodeURIComponent(genre)}&type=track&limit=${limit}&market=US`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const searchData = await searchRes.json();
    const tracks = searchData.tracks?.items || [];

    if (tracks.length === 0) {
      return NextResponse.json({ prospects: [], count: 0 });
    }

    // Get audio features for all tracks in one batch call
    const trackIds = tracks.map((t: any) => t.id).join(',');
    const featuresRes = await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const featuresData = await featuresRes.json();
    const features = featuresData.audio_features || [];

    // Keywords that indicate major label, management, or mainstream status
    const SKIP_KEYWORDS = [
      'records', 'music group', 'entertainment', 'label', 'mgmt', 'official',
      'universal', 'sony', 'warner', 'atlantic', 'interscope', 'republic',
      'def jam', 'capitol', 'rca', 'columbia', 'epic records',
    ];

    // Build prospect list — indie artists only, reachable via DM
    const prospects = tracks.map((track: any, i: number) => {
      const feat = features[i] || {};
      const artist = track.artists[0];
      const popularity = track.popularity;
      const artistNameLower = artist.name.toLowerCase();

      // Only target truly independent artists:
      // - Popularity 5–35: has some real listeners, not mainstream
      // - Not a multi-artist collab name (contains "feat" or "&" heavily)
      // - No major label keywords in artist name
      const inRange = popularity >= 5 && popularity <= 35;
      const noLabelKeyword = !SKIP_KEYWORDS.some(k => artistNameLower.includes(k));
      const notMainstream = track.artists.length === 1; // skip "Artist feat. BigName" tracks
      const isTargetSize = inRange && noLabelKeyword && notMainstream;

      return {
        artist_name: artist.name,
        artist_id: artist.id,
        artist_spotify_url: artist.external_urls?.spotify,
        track_name: track.name,
        track_id: track.id,
        track_url: track.external_urls?.spotify,
        album_image: track.album?.images?.[0]?.url,
        release_date: track.album?.release_date,
        popularity,
        is_target_size: isTargetSize,
        genre,
        // Audio features for Claude pitch generation
        tempo: feat.tempo ? Math.round(feat.tempo) : null,
        energy: feat.energy ? Math.round(feat.energy * 100) : null,
        danceability: feat.danceability ? Math.round(feat.danceability * 100) : null,
        valence: feat.valence ? Math.round(feat.valence * 100) : null,
        mood: feat.valence > 0.5 ? 'upbeat' : 'dark/aggressive',
      };
    }).filter((p: any) => p.is_target_size);

    return NextResponse.json({
      prospects,
      count: prospects.length,
      genre,
      fetched_at: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Spotify prospects error:', error);
    return NextResponse.json({ error: 'Failed', details: error.message }, { status: 500 });
  }
}
