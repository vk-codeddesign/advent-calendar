import { fetchData } from "@/utils/FetchData";
import { StoryblokStory } from "@storyblok/react/rsc";


export default async function Home() {
  const { data } = await fetchData();

  const bridgeOptions = { resolveRelations: ['article.author'] }

  return (
    <main className="flex items-center justify-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full h-full flex flex-col items-center justify-center">
        {/* <h1>Story: {data.story.name}</h1> */}
        {/* <StoryblokStory story={data.story} /> */}
        <StoryblokStory story={data.story} bridgeOptions={bridgeOptions} />
        {/* <pre>{JSON.stringify(data.story.content, null, 2)}</pre> */}
      </div>
    </main>
  );
}