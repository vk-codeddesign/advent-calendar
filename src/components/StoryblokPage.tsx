import { PageProps } from "@/types/blok";
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import styles from './StoryblokPage.module.css';

export default function StoryblokPage({ blok }: PageProps) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x'];  // All unique letters from the grid

  return (
    <main {...storyblokEditable(blok)} className="w-full h-full flex items-center justify-center">
      {/* <pre>{JSON.stringify(blok, null, 2)}</pre> */}
      <div className={`w-full gap-4 ${styles.grid}`}>
        {blok.body?.map((nestedBlok, index) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} letter={letters[index]} />
        ))}
      </div>
    </main>
  );
}

export function indexToLetter(index: number): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[index % letters.length];
}