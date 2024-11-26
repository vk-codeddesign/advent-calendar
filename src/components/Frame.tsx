import { CreatorBlok, DeployedProjectBlok, FrameProps } from "@/types/blok";
import { storyblokEditable } from "@storyblok/react";
import { StoryblokComponent } from "@storyblok/react/rsc";

export default function Grid({ blok }: FrameProps) {
  return (
    <div {...storyblokEditable(blok)}>
      <h2>{blok.name}</h2>
      {blok.creator.map((creatorBlok: CreatorBlok) => (
        <StoryblokComponent blok={creatorBlok} key={creatorBlok._uid} />
      ))}
      {blok.deployed_project.map((projectBlok: DeployedProjectBlok) => (
        <StoryblokComponent blok={projectBlok} key={projectBlok._uid} />
      ))}
    </div>
  )
}