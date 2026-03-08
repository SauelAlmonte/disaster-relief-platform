"use client";

import { useCallback, useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";

type FormSuccessModalProps = {
  title: string;
  body: string;
  onClose: () => void;
};

export function FormSuccessModal({ title, body, onClose }: FormSuccessModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    dialogRef.current?.close();
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDialogElement>) => {
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
      aria-labelledby="form-success-title"
      aria-describedby="form-success-description"
    >
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <h2
          id="form-success-title"
          className="text-xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          {title}
        </h2>
        <p
          id="form-success-description"
          className="mt-2 text-zinc-600 dark:text-zinc-400"
        >
          {body}
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

