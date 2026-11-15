import { TICKET_CHECKOUT_PATH } from '@/lib/dec16/payment-link';

// Plain HTML form POST so it works on iPhone even before JS loads, and link
// previewers or prefetchers can never open a Stripe session by accident.
export default function TicketButton({ className, tabIndex, children }: { className: string; tabIndex?: number; children: React.ReactNode }) {
  return (
    <form method="post" action={TICKET_CHECKOUT_PATH} className="w-full">
      <input type="hidden" name="tier" value="gentlemen" />
      <button type="submit" tabIndex={tabIndex} data-testid="ticket-checkout" className={className}>
        {children}
      </button>
    </form>
  );
}
