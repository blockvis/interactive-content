import { redirect } from "next/navigation";
import { defaultLanguage } from "@/lib/slides";

export default function PresentationHome() {
  redirect(`/gq128-beauty-presentation/slides/${defaultLanguage}/1`);
}
