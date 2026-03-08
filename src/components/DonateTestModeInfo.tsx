/**
 * Shown only when Stripe test keys are used (pk_test_).
 * Lets donors know this is a sandbox payment and how email receipts work.
 */
export function DonateTestModeInfo({
  isTestMode,
}: {
  isTestMode: boolean;
}) {
  if (!isTestMode) return null;

  return (
    <div
      className="mt-4 mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100"
      role="region"
      aria-labelledby="test-mode-heading"
    >
      <h2
        id="test-mode-heading"
        className="text-sm font-semibold text-amber-900 dark:text-amber-200"
      >
        Test mode (Stripe sandbox)
      </h2>
      <p className="mt-2">
        This donation page is running in Stripe test mode. Payments here do not
        create real charges.
      </p>
      <p className="mt-2">
        When you are redirected to Stripe, use the test card details shown on
        that page (no real card is required).
      </p>
      <p className="mt-2">
        If you want to receive a confirmation email for this test donation, use
        your real email address. Otherwise, you can use a dummy email and no
        one will be contacted.
      </p>
    </div>
  );
}
