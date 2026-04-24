import { redirect } from "next/navigation";
import { getPresentationData } from "@/lib/slides";

export default async function PresentationHome({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPresentationData(slug);
  if (!p) {
    redirect("/");
  }
  redirect(`/${slug}/slides/${p.defaultLanguage}/1`);
}
