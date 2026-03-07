"use server";

export type ActionResult = { success: boolean; message?: string };

export async function submitReliefRequest(formData: FormData): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true, message: "Request received (mock)" };
}

export async function submitVolunteer(formData: FormData): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true, message: "Thank you for signing up (mock)" };
}

export async function submitDonate(formData: FormData): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true, message: "Donation received (mock)" };
}

export async function submitContact(formData: FormData): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true, message: "Message sent (mock)" };
}

export async function signIn(formData: FormData): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true, message: "Signed in (mock)" };
}

export async function signUp(formData: FormData): Promise<ActionResult> {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true, message: "Account created (mock)" };
}
