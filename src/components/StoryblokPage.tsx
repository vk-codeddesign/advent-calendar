import { PageProps } from "@/types/blok";
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

export default function Page({ blok }: PageProps) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}