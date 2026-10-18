import { verifiedClaims, verifiedPartners } from '@/data/partners';

const gold = '#c9a96e';

/**
 * Static proof row. Hidden entirely until at least one partner or claim
 * is marked verified in data/partners.ts. No scrolling ticker.
 */
export default function VerifiedPartners() {
  if (verifiedPartners.length === 0 && verifiedClaims.length === 0) return null;

  return (
    <section className="bg-[#0c0c0c] border-t border-white/10 px-5 py-16 md:px-16 md:py-24" aria-label="Brands and venues we've worked with">
      {verifiedPartners.length > 0 && (
        <>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: gold }}>
            Proof
          </p>
          <h2 className="mt-3 font-display text-[36px] font-semibold leading-[1.05] text-[#f6f1e7] md:text-[56px]">
            Brands &amp; venues we&apos;ve worked with
          </h2>
          <ul className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
            {verifiedPartners.map((partner) => {
              const mark = partner.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- logo path is data-driven and may be added later
                <img src={partner.logo} alt={partner.name} className="h-10 w-auto" />
              ) : (
                <span className="font-display text-[22px] font-semibold uppercase tracking-[0.12em] md:text-[28px]" style={{ color: gold }}>
                  {partner.name}
                </span>
              );

              return (
                <li key={partner.name}>
                  {partner.proofUrl ? (
                    <a href={partner.proofUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      {mark}
                    </a>
                  ) : (
                    mark
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {verifiedClaims.length > 0 && (
        <ul className={verifiedPartners.length > 0 ? 'mt-10 space-y-3' : 'space-y-3'}>
          {verifiedClaims.map((claim) => (
            <li key={claim.name} className="text-[16px] leading-relaxed text-[#f6f1e7]">
              {claim.proofUrl ? (
                <a href={claim.proofUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  {claim.text}
                </a>
              ) : (
                claim.text
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
