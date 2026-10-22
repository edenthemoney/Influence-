/**
 * Per-clip object-position for the stage clips (subject centre on the 720x1568 encodes).
 * `cover` trims the sides on narrower frames; these keep the subject centred.
 */
const POS: Record<string, string> = {
  'st-brand-boutique': '50% 30%',
  'st-bar-cocktail': '50% 60%',
};
/** '/images/stage/st-bar-cocktail-anim.webp?v=9' -> '50% 60%' (default centre). */
export function posOf(src?: string | null): string {
  const m = (src || '').match(/\/stage\/([\w-]+?)(?:-hevc|-anim|-poster|-sq-anim|-sq-a|-sq-b)?\.(?:mp4|webp)/);
  return (m && POS[m[1]]) || '50% 50%';
}
