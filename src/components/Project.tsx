import { DeployedProjectProps } from "@/types/blok";
import { storyblokEditable } from "@storyblok/react";

export default function DeployedProject({ blok }: DeployedProjectProps) {
  return (
    <div {...storyblokEditable(blok)}>
      <h3>{blok.preview.name}</h3>
      <a href={blok.netlify_url.url}>Visit Project</a>
    </div>
  )
}