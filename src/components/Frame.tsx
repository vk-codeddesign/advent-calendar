import { CreatorBlok, DeployedProjectBlok, FrameProps } from "@/types/blok";
import { storyblokEditable } from "@storyblok/react/rsc";
import { StoryblokServerComponent } from "@storyblok/react/rsc";

export default function Frame({ blok }: FrameProps) {
  return (
    <div {...storyblokEditable(blok)}>
      <h2>{blok.name}</h2>
      {blok.creator.map((creatorBlok: CreatorBlok) => (
        <StoryblokServerComponent blok={creatorBlok} key={creatorBlok._uid} />
      ))}
      {blok.deployed_project.map((projectBlok: DeployedProjectBlok) => (
        <StoryblokServerComponent blok={projectBlok} key={projectBlok._uid} />
      ))}
    </div>
  )
}