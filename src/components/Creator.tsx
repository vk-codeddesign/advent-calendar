import { CreatorProps } from "@/types/blok";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function Creator({ blok }: CreatorProps) {
  return (
    <div {...storyblokEditable(blok)}>
      <h3>{blok.full_name}</h3>
      {/* <p>LinkedIn: {blok.linkedin_handle}</p>
      <p>Instagram: {blok.instagram_handle}</p>
      <p>Portfolio: {blok.portfolio_link.url}</p> */}
    </div>
  );
}