let cachedToken: { token: string; expires: number } | null = null;

async function getToken() {
  if (cachedToken && Date.now() < cachedToken.expires) return cachedToken.token;
  const clientId = process.env.SPOTIFY_CLIENT_ID || '';
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || '';
  if (!clientId || !clientSecret) throw new Error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Spotify token error: ${JSON.stringify(data)}`);
  cachedToken = { token: data.access_token, expires: Date.now() + (data.expires_in - 60) * 1000 };
  return cachedToken.token;
}

async function spotifyFetch(endpoint: string) {
  const token = await getToken();
  const url = `https://api.spotify.com/v1${endpoint}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Spotify ${res.status} for ${url}:`, body);
    throw new Error(`Spotify API error: ${res.status} - ${body}`);
  }
  return res.json();
}

export interface SpotifyArtist {
  id: string;
  name: string;
  followers: number;
  genres: string[];
  spotifyUrl: string;
  imageUrl?: string;
  popularity: number;
}

export async function searchArtists(query: string, limit = 10): Promise<SpotifyArtist[]> {
  const data = await spotifyFetch(`/search?q=${encodeURIComponent(query)}&type=artist&limit=${Math.min(limit, 10)}`);
  return data.artists.items.map((a: any) => ({
    id: a.id,
    name: a.name,
    followers: a.followers?.total || 0,
    genres: a.genres || [],
    spotifyUrl: a.external_urls?.spotify || '',
    imageUrl: a.images?.[0]?.url,
    popularity: a.popularity || 0,
  }));
}

export async function discoverSmallArtists(genre?: string) {
  // Niche search queries that surface small/upcoming artists, not mainstream
  const queries = [
    'florida underground rapper 2024',
    'miami rapper new',
    'independent hip hop artist',
    'underground r&b singer',
    'upcoming rapper south florida',
    'indie artist new single',
    'unsigned rapper 2024',
    'new artist hip hop miami',
    'underground latin trap',
    'independent artist florida',
  ];
  const query = genre || queries[Math.floor(Math.random() * queries.length)];
  const data = await spotifyFetch(`/search?q=${encodeURIComponent(query)}&type=artist&limit=10`);
  
  // Filter to only artists with popularity < 50 (excludes mainstream)
  const filtered = data.artists.items
    .filter((a: any) => a.popularity < 50)
    .map((a: any) => ({
      id: a.id,
      name: a.name,
      followers: a.followers?.total || 0,
      genres: a.genres || [],
      spotifyUrl: a.external_urls?.spotify || '',
      imageUrl: a.images?.[0]?.url,
      popularity: a.popularity || 0,
    }));
  
  return filtered.length > 0 ? filtered : data.artists.items.map((a: any) => ({
    id: a.id,
    name: a.name,
    followers: a.followers?.total || 0,
    genres: a.genres || [],
    spotifyUrl: a.external_urls?.spotify || '',
    imageUrl: a.images?.[0]?.url,
    popularity: a.popularity || 0,
  }));
}

export interface NewRelease {
  trackName: string;
  artistName: string;
  artistId: string;
  albumName: string;
  releaseDate: string;
  spotifyUrl: string;
  artistSpotifyUrl: string;
  imageUrl?: string;
  followers?: number;
  popularity?: number;
}

export async function findNewDrops(genre?: string): Promise<NewRelease[]> {
  // Search for tracks released recently in target genres
  const queries = [
    'hip hop new',
    'rap 2026',
    'r&b new single',
    'florida rap',
    'trap new',
    'latin hip hop new',
    'underground rap 2026',
    'indie r&b 2026',
  ];
  const q = genre || queries[Math.floor(Math.random() * queries.length)];
  const year = new Date().getFullYear();
  
  // Search for albums (singles count as albums in Spotify) released this year
  const data = await spotifyFetch(`/search?q=${encodeURIComponent(q)}+year%3A${year}&type=album&limit=10`);
  
  const releases: NewRelease[] = [];
  for (const album of data.albums?.items || []) {
    // Only singles and recent releases
    if (!album.release_date || album.release_date < `${year}`) continue;
    
    const artist = album.artists?.[0];
    if (!artist) continue;
    
    // Try to get full artist details for external links
    let artistDetails: any = null;
    try {
      artistDetails = await spotifyFetch(`/artists/${artist.id}`);
    } catch {}
    
    releases.push({
      trackName: album.name,
      artistName: artist.name,
      artistId: artist.id,
      albumName: album.name,
      releaseDate: album.release_date,
      spotifyUrl: album.external_urls?.spotify || '',
      artistSpotifyUrl: artist.external_urls?.spotify || '',
      imageUrl: album.images?.[0]?.url,
      followers: artistDetails?.followers?.total || 0,
      popularity: artistDetails?.popularity || 0,
    });
  }
  
  // Sort by release date descending (newest first)
  releases.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  return releases;
}

export async function getArtistDetails(artistId: string) {
  return spotifyFetch(`/artists/${artistId}`);
}

export async function getRelatedArtists(artistId: string): Promise<SpotifyArtist[]> {
  const data = await spotifyFetch(`/artists/${artistId}/related-artists`);
  return data.artists.map((a: any) => ({
    id: a.id,
    name: a.name,
    followers: a.followers?.total || 0,
    genres: a.genres || [],
    spotifyUrl: a.external_urls?.spotify || '',
    imageUrl: a.images?.[0]?.url,
    popularity: a.popularity || 0,
  }));
}
