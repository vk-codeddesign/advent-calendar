import { DeployedProjectProps } from "@/types/blok";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function DeployedProject({ blok }: DeployedProjectProps) {
  return (
    <div {...storyblokEditable(blok)} className="overflow-hidden">
      <div className="relative w-[512px] h-[512px]">
        <iframe src={blok.netlify_url.url}
          className="absolute transform-gpu origin-top-left scale-50 overflow-hidden"
          style={{ width: "1024px", height: "1024px" }} />
      </div>
    </div>
  )
}