"use client"
import { useSelectedFrame } from "@/contexts/SelectedFrameContext";
import { AboutBlok, DeployedProjectBlok, FrameProps } from "@/types/blok";
import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface FrameComponentProps extends FrameProps {
  letter: string;
}

export default function Frame({ blok, letter }: FrameComponentProps) {
  const { selectedUid, setSelectedUid } = useSelectedFrame();
  const isSelected = blok._uid === selectedUid;
  const [isAnimating, setIsAnimating] = useState(false);

  const previewVariants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const expandedVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, delayChildren: 0.5 }, // Delay content appearance until frame has expanded
    },
  };

  // Extract day number from blok.name
  const frameDay = blok.dayNumber;

  // Get current day of december
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDay = currentMonth == 11 ? today.getDate() : 0;
  // const currentDay = 11 == 11 ? 24 : 0;

  // Determine if the frame should be accessible
  const isAccessible = frameDay <= currentDay;
  const isOld = frameDay < currentDay;

  const handleClick = () => {
    if (isAccessible && !isAnimating) {
      setIsAnimating(true);
      setSelectedUid(blok._uid);
    }
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAnimating) {
      setIsAnimating(true);
      setSelectedUid(null);
    }
  }

  const handleLayoutAnimationStart = () => {
    setIsAnimating(true);
  }

  const handleLayoutAnimationComplete = () => {
    setIsAnimating(false);
  }

  return (
    <motion.div
      layout
      {...storyblokEditable(blok)}
      layoutId={`frame-${blok._uid}`}
      style={{
        gridArea: letter,
        zIndex: isAnimating || isSelected ? 50 : 0,
        width: isSelected ? "100dvw" : "100%",
        height: isSelected ? "100dvh" : "100%",
        position: isSelected ? "fixed" : "relative",
        borderRadius: isSelected ? "0rem" : "0.5rem",
        top: 0,
        left: 0,
        cursor: isAccessible ? 'pointer' : 'normal',
      }}
      transition={{
        layout: { duration: 0.5, ease: "easeInOut" },
      }}
      className={`overflow-hidden text-black border-0 bg-[#E9E9E6] transition-colors duration-500`}
      onClick={isAccessible && !isSelected ? handleClick : undefined}
      onLayoutAnimationStart={handleLayoutAnimationStart}
      onLayoutAnimationComplete={handleLayoutAnimationComplete}
    >
      <motion.div layout className="flex justify-center items-center w-full h-full p-8">
        <AnimatePresence mode="wait">
          {isSelected ? (
            <motion.div
              key={`expanded-${blok._uid}-${isSelected}`}
              variants={expandedVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
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
                <div className="mt-2 mb-8 text-2xl cursor-auto">{blok.name.slice(0, -5) + "."}</div>
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
          ) : (
            // Render preview content
            <motion.h2
              key={`preview-${blok._uid}-${isSelected}`}
              variants={previewVariants}
              initial="visible"
              animate="visible"
              exit="hidden"
              layoutId={`title-${blok._uid}`}
              className={`select-none text-fluid-6xl font-semibold ${(letter == "x" || letter == "t") && "text-fluid-9xl"} ${(letter == "a" || letter == "m" || letter == "q") && "text-fluid-8xl"}`}

            >
              {blok.name.slice(0, -10)}
            </motion.h2>

          )}
        </AnimatePresence>
      </motion.div>
      {/* Framer Motion for Image Fade */}
      {isOld && (<motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isSelected ? 0 : 1 }}
        transition={{ duration: 0.25, delay: isSelected ? 0 : 0.5 }}
        className="-z-10 absolute top-0 left-0 w-full h-full inset-10"
      >
        <Image
          src={`${blok.deployed_project[0].preview.filename}/m/`}
          fill
          alt="preview image"
          className="object-cover"
          sizes="350x350"
        />
      </motion.div>)}
    </motion.div >
  )
}