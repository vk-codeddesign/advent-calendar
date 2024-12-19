import { fetchData } from '@/utils/FetchData';
import { StoryblokStory } from '@storyblok/react/rsc';
import { CanvasSnowOverlay } from '@/components/CanvasSnowOverlay';

export default async function Home() {
  const { data } = await fetchData();

  const bridgeOptions = { resolveRelations: ['article.author'] };

  // Adding this stupid comment to force refresh for låge 19 hahah

  return (
    <main className='flex items-center justify-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]'>
      <CanvasSnowOverlay />
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <StoryblokStory story={data.story} bridgeOptions={bridgeOptions} />
      </div>
    </main>
  );
}
