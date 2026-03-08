"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

type DonateSuccessModalProps = {
  firstName: string;
  lastName: string;
  onClose: () => void;
};

function DonateSuccessModal({ firstName, lastName, onClose }: DonateSuccessModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    dialogRef.current?.close();
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    previousActiveRef.current = document.activeElement as HTMLElement | null;
    dialog.showModal();
    return () => {
      previousActiveRef.current?.focus?.();
    };
  }, []);

  const displayName = [firstName, lastName].filter(Boolean).join(" ") || "there";

  return (
    <dialog
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      onCancel={(e) => {
        e.preventDefault();
        handleClose();
      }}
      className="fixed inset-0 z-50 m-0 flex max-h-dvh w-full items-center justify-center border-0 bg-transparent p-4 shadow-none backdrop:bg-zinc-900/50 dark:backdrop:bg-zinc-950/50"
      aria-modal="true"
      aria-labelledby="donate-success-title"
      aria-describedby="donate-success-description"
    >
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <h2
          id="donate-success-title"
          className="text-xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          Donation received
        </h2>
        <p id="donate-success-description" className="mt-2 text-zinc-600 dark:text-zinc-400">
          Thank you, {displayName}. You will receive an email regarding your
          donation for tax purposes.
        </p>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-offset-zinc-900"
          >
            OK
          </button>
        </div>
      </div>
    </dialog>
  );
}

type DonateSuccessModalControllerProps = {
  donationSuccess: boolean;
  first: string | null;
  last: string | null;
};

export function DonateSuccessModalController({
  donationSuccess,
  first,
  last,
}: DonateSuccessModalControllerProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.replace("/donate");
  }, [router]);

  if (!donationSuccess || (!first && !last)) return null;

  return (
    <DonateSuccessModal
      firstName={first ?? ""}
      lastName={last ?? ""}
      onClose={handleClose}
    />
  );
}
