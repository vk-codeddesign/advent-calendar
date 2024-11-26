import { fetchData } from "@/utils/FetchData";
import { StoryblokStory } from "@storyblok/react/rsc";


export default async function Home() {
  const { data } = await fetchData();

  const bridgeOptions = { resolveRelations: ['article.author'] }

  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Story: {data.story.name}</h1>
        {/* <StoryblokStory story={data.story} /> */}
        <StoryblokStory story={data.story} bridgeOptions={bridgeOptions} />
        {/* <pre>{JSON.stringify(data.story.content, null, 2)}</pre> */}
      </div>
    </main>
  );
}