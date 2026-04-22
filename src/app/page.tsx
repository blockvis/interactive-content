import { redirect } from "next/navigation";
import { defaultLanguage } from "@/lib/slides";

export default function Home() {
  redirect(`/slides/${defaultLanguage}/1`);
}
