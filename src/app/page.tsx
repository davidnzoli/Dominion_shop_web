import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("dominion_token")?.value;
  const role = cookieStore.get("dominion_user_role")?.value;

  if (token) {
    redirect(role === "percepteur" ? "/commissions" : "/dashboard");
  } else {
    redirect("/login");
  }
}

