import { fetchData } from "@/utils/FetchData";

export default async function Home() {
  const { data } = await fetchData();

  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Story: {data.story.name}</h1>
      </div>
    </main>
  );
}