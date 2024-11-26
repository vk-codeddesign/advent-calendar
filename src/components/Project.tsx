import { DeployedProjectProps } from "@/types/blok";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function DeployedProject({ blok }: DeployedProjectProps) {
  return (
    <div {...storyblokEditable(blok)}>
      <h3>{blok.preview.name}</h3>
      <iframe src={blok.netlify_url.url} className="aspect-square w-[500px] overflow-hidden" style={{ width: "500px", height: "500px" }}></iframe>
    </div>
  )
}