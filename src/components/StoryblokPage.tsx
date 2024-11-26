import { PageProps } from "@/types/blok";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

export default function Page({ blok }: PageProps) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}