import { AboutProps } from "@/types/blok";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function Creator({ blok }: AboutProps) {
  return (
    <div {...storyblokEditable(blok)} className="flex flex-col w-full h-full cursor-auto">
      <div className="h-full flex flex-col justify-center items-center cursor-auto">
        <h1 className="text-3xl md:text-4xl mt-6 mb-0 leading-relaxed cursor-auto">{blok.project_title}</h1>
        <p className="max-w-lg text-xl font-medium text-center text-balance leading-relaxed my-4 cursor-auto">{blok.project_description}</p>
      </div>
      <div className="px-4 w-full flex justify-between items-end">
        <h3 className="text-sm -mb-1 cursor-auto">{blok.creator_full_name}</h3>
        <span className="text-sm flex flex-col items-end gap-2">
          {blok.creator_instagram_handle && <a href={`https://www.instagram.com/${blok.creator_instagram_handle.slice(1)}`}>{blok.creator_instagram_handle}</a>}
          {blok.creator_linkedin_handle && <a href={blok.creator_linkedin_handle.url} className="max-w-96 text-ellipsis -mr-px">LinkedIn Profile</a>}
        </span>
      </div>
    </div>
  );
}