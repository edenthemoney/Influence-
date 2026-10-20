/**
 * Per-clip object-position (face/subject centre measured with face detection on the 720x1568 encodes).
 * The phone screen (~0.42) is narrower than the clips (0.459) and profile tiles are 0.72, so `cover`
 * trims the sides; these keep the subject centred instead of drifting off-frame.
 */
const POS: Record<string, string> = {
  beach: '35% 50%',
  bathtub: '36% 45%',
  martini: '54% 30%',
  dance: '48% 45%',
  editorial: '47% 0%',
  'pool-shoot': '50% 64%',
};
/** '/images/stage/beach-anim.webp?v=7' -> '35% 50%' (default centre). */
export function posOf(src?: string | null): string {
  const m = (src || '').match(/\/stage\/([\w-]+?)(?:-hevc|-anim|-poster|-sq-anim|-sq-a|-sq-b)?\.(?:mp4|webp)/);
  return (m && POS[m[1]]) || '50% 50%';
}
