import { redirect } from "next/navigation";
import Table from "../components/table";
import { getSession } from "@/utils/cookies";
import { cookies } from "next/headers";

export default function Home() {
  const session = getSession({ cookies });

  if (!session) {
    //redirect
    redirect("/login?redirect=/dashboard");
  } else {
    redirect("/dashboard");
  }
  return <main>{/* <Table /> */}</main>;
}
