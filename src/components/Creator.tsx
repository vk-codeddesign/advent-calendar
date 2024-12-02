import { AboutProps } from "@/types/blok";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function Creator({ blok }: AboutProps) {
  return (
    <div {...storyblokEditable(blok)}>
      <h3>{blok.creator_full_name}</h3>
      {/* <p>LinkedIn: {blok.linkedin_handle}</p>
      <p>Instagram: {blok.instagram_handle}</p>
      <p>Portfolio: {blok.portfolio_link.url}</p> */}
    </div>
  );
}