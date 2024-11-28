"use client"
import { AboutBlok, DeployedProjectBlok, FrameProps } from "@/types/blok";
import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import { AnimatePresence, motion } from "motion/react";
import { useSelectedFrame } from "@/contexts/SelectedFrameContext";
import { useState } from "react";

interface FrameComponentProps extends FrameProps {
  letter: string;
}

export default function Frame({ blok, letter }: FrameComponentProps) {
  const { selectedUid, setSelectedUid } = useSelectedFrame();
  const isSelected = blok._uid === selectedUid;
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setSelectedUid(blok._uid);
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedUid(null);
    setAnimationComplete(false);
  }

  const handleLayoutAnimationStart = () => {
    setIsAnimating(true);
  }

  const handleLayoutAnimationComplete = () => {
    setIsAnimating(false);
    setAnimationComplete(isSelected);
  }

  return (
    <motion.div
      layout
      {...storyblokEditable(blok)}
      layoutId={`frame-${blok._uid}`}
      style={{
        gridArea: letter,
        zIndex: isAnimating || isSelected ? 50 : 0,
        width: isSelected ? "100vw" : "100%",
        height: isSelected ? "100vh" : "100%",
        position: isSelected ? "fixed" : "relative",
        top: 0,
        left: 0,
      }}
      transition={{
        layout: { duration: 0.5, ease: "easeInOut" },
      }}
      className={`border-gray-400 border-2 rounded-lg overflow-hidden text-black ${isSelected ? "bg-[#E9E9E6]" : "bg-[#ffffff]"} transition-colors duration-500`}
      onClick={isSelected ? undefined : handleClick}
      onLayoutAnimationStart={handleLayoutAnimationStart}
      onLayoutAnimationComplete={handleLayoutAnimationComplete}
    >
      <motion.div layout className="flex justify-center items-center w-full h-full p-8">
        <AnimatePresence>
          {!isSelected && !animationComplete && (
            <motion.h2
              key={`preview-${blok._uid}`}
              layoutId={`title-${blok._uid}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-fluid-6xl font-semibold ${(letter == "x" || letter == "t") && "text-fluid-9xl"} ${(letter == "a" || letter == "m" || letter == "q") && "text-fluid-8xl"}`}
            >
              {blok.name.slice(0, -10)}
            </motion.h2>
          )}
          {isSelected && animationComplete && (
            <motion.div
              key={`expanded-${blok._uid}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="w-full h-full"
            >
              <motion.button
                layout
                className="absolute top-4 left-4"
                onClick={handleClose}
              >
                Close
              </motion.button>
              <motion.div
                layout
                layoutId={`content-${blok._uid}`}
                className="h-full flex flex-col justify-start md:justify-center items-center"
              >
                <div className="mt-2 mb-8 text-2xl">{blok.name.slice(0, -5) + "."}</div>
                <div className="max-w-screen-xl w-full flex flex-col md:flex-row">
                  <div className="m-auto w-full flex justify-center items-center">
                    {blok.deployed_project.map((projectBlok: DeployedProjectBlok) => (
                      <StoryblokServerComponent blok={projectBlok} key={projectBlok._uid} />
                    ))}
                  </div>
                  <span className="border-t-[1px] mt-6 md:mt-0 md:border-l-[1px] border-black" />
                  <div className="w-full flex items-center justify-center">
                    {blok.about.map((aboutBlok: AboutBlok) => (
                      <StoryblokServerComponent blok={aboutBlok} key={aboutBlok._uid} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}