/**
 * Per-clip object-position for the stage clips (subject centre on the 720x1568 encodes).
 * `cover` trims the sides on narrower frames; these keep the subject centred.
 */
const POS: Record<string, string> = {
  'og-des-arrive': '50% 30%',
};
/** '/images/stage/og-des-arrive-anim.webp?v=11' -> '50% 30%' (default centre). */
export function posOf(src?: string | null): string {
  const m = (src || '').match(/\/stage\/([\w-]+?)(?:-hevc|-anim|-poster|-sq-anim|-sq-a|-sq-b)?\.(?:mp4|webp)/);
  return (m && POS[m[1]]) || '50% 50%';
}
