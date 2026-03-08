import { redirect } from "next/navigation";
import { fulfillDonationFromSession } from "@/lib/actions";

export const metadata = {
  title: "Donation successful - UnitedRelief",
  description: "Thank you for your donation to UnitedRelief.",
};

type PageProps = { searchParams: Promise<{ session_id?: string }> };

export default async function DonateSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (sessionId) {
    const result = await fulfillDonationFromSession(sessionId);
    if (result.success) {
      const search = new URLSearchParams({
        donation_success: "1",
        first: result.first_name,
        last: result.last_name,
      });
      redirect(`/donate?${search.toString()}`);
    }
  }

  redirect("/donate?donation_error=1");
}
