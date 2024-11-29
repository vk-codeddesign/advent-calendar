import { DeployedProjectProps } from "@/types/blok";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function DeployedProject({ blok }: DeployedProjectProps) {
  return (
    <div {...storyblokEditable(blok)} className="overflow-hidden">
      <div className="relative w-[307px] h-[307px] md:w-[512px] md:h-[512px] overscroll-none">
        <iframe
          src={blok.netlify_url.url}
          className="absolute transform-gpu origin-top-left scale-30 md:scale-50 overflow-hidden"
          style={{ width: "1024px", height: "1024px", touchAction: "manipulation" }}
          allow="camera; microphone"
        />
      </div>
    </div>
  )
}