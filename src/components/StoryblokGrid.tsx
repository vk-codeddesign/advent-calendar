import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function Grid({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.frame.map((nestedBlok) => (
        { nestedBlok.name }
      ))}
    </div>
  )
}