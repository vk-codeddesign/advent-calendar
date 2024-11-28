import { PageProps } from "@/types/blok";
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import styles from './StoryblokPage.module.css';

export default function StoryblokPage({ blok }: PageProps) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x'];  // All unique letters from the grid

  return (
    <main {...storyblokEditable(blok)} className="w-full min-h-svh pb-12 px-2 md:px-4 lg:px-12 flex flex-col items-center justify-center">
      {/* <pre>{JSON.stringify(blok, null, 2)}</pre> */}
      <h1 className="font-medum text-white text-5xl text-center tracking-normal uppercase py-12">Coded Design<br />Julekalender</h1>
      <div className={`w-full max-w-screen-2xl ${styles.grid} gap-2 md:gap-1 xl:gap-4`}>
        {blok.body?.map((nestedBlok, index) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} letter={letters[index]} />
        ))}
      </div>
    </main >
  );
}

export function indexToLetter(index: number): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[index % letters.length];
}