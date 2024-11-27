"use client"
import { FrameProps } from "@/types/blok";
import { storyblokEditable } from "@storyblok/react/rsc";
import { motion } from "motion/react";

interface FrameComponentProps extends FrameProps {
  letter: string;
}

export default function Frame({ blok, letter }: FrameComponentProps) {
  return (
    <motion.div
      {...storyblokEditable(blok)}
      layoutId={`frame-${blok._uid}`}
      style={{ gridArea: letter }}
      className="border-gray-400 border-2 rounded-lg flex justify-center items-center"
    >
      <h2>{blok.name}</h2>
      {/* {blok.creator.map((creatorBlok: CreatorBlok) => (
        <StoryblokServerComponent blok={creatorBlok} key={creatorBlok._uid} />
        ))}
        {blok.deployed_project.map((projectBlok: DeployedProjectBlok) => (
          <StoryblokServerComponent blok={projectBlok} key={projectBlok._uid} />
          ))} */}
    </motion.div>
  )
}