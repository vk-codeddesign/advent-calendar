// src/pages/StoryblokPage.tsx
import { PageProps } from "@/types/blok";
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import styles from './StoryblokPage.module.css';
import React from 'react';
// import SnowOverlay from '../components/SnowOverlay';

export default function StoryblokPage({ blok }: PageProps) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x'];  // All unique letters from the grid

  return (
    <main {...storyblokEditable(blok)} className="w-full min-h-svh px-2 md:px-4 lg:px-12 flex flex-col items-center justify-center">
      {/* <pre className="text-wrap">{JSON.stringify(blok, null, 2)}</pre> */}
      {/* <SnowOverlay /> */}
      <div className="flex flex-col justify-center items-center py-4">
        <h1 className="font-medum text-white text-5xl text-center tracking-normal uppercase">Coded Design<br />Julekalender</h1>
        <p className="opacity-25 hover:opacity-100 transition-all duration-100"><a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.dmjx.dk/uddannelser/coded-design&ved=2ahUKEwjfzKqV1IGKAxX_R_EDHRvcMl0QFnoECBsQAQ&usg=AOvVaw0Z8WabmmTeOckyOKvQCDTe">Læs mere om uddannelsen her</a></p>
      </div>
      <div className={`w-full max-w-screen-2xl ${styles.grid} gap-2 md:gap-1 xl:gap-4`}>
        {blok.body?.map((nestedBlok, index) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} letter={letters[index]} />
        ))}
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-4 px-4 md:px-0">
        <pre className="text-xs font-mono bg-gray-800/50 px-2 py-1 rounded-lg border border-gray-700/20">Main calendar <a href="https://www.linkedin.com/in/baldrian-sector-227042269/">Baldrian Sector</a> & <a href="https://www.linkedin.com/in/hannibal-marcellus-munk-5586a5150/">Hannibal Marcellus Munk</a></pre>
        <pre className="text-xs font-mono bg-gray-800/50 px-2 py-1 -mt-2 mb-2 rounded-lg border border-gray-700/20">Se kredittering under hver enkelt låge</pre>
      </div>
    </main >
  );
}

export function indexToLetter(index: number): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[index % letters.length];
}