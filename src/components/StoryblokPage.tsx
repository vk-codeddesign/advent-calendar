import { PageProps } from "@/types/blok";
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import styles from './StoryblokPage.module.css';

export default function StoryblokPage({ blok }: PageProps) {
  const gridTemplateAreas = `
  "x x x w m m l i i q q"
  "x x x h m m s s d q q"
  "x x x b g g o t t t e"
  "c c r n a a k t t t p"
  "v j j n a a k f u u p"
`;

  const mobileGridTemplateAreas = `
  "c c r"
  "v j j"
  "x x x"
  "x x x"
  "w a a"
  "h a a"
  "b g g"
  "n m m"
  "n i i"
  "s s d"
  "o t t"
  "k t t"
  "k f p"
  "u u p"
  "q q e"
  "q q e"
`;

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