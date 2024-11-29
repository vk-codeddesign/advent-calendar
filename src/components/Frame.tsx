"use client"
import { useSelectedFrame } from "@/contexts/SelectedFrameContext";
import { AboutBlok, DeployedProjectBlok, FrameProps } from "@/types/blok";
import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface FrameComponentProps extends FrameProps {
  letter: string;
}

export default function Frame({ blok, letter }: FrameComponentProps) {
  const { selectedUid, setSelectedUid } = useSelectedFrame();
  const isSelected = blok._uid === selectedUid;
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);


  // Extract day number from blok.name
  const frameDay = blok.dayNumber;

  // Get current day of december
  const today = new Date();
  const currentMonth = today.getMonth(); // Months are zero-indexed
  // const currentDay = currentMonth == 11 ? today.getDate() : 0;
  const currentDay = 11 == 11 ? 10 : 0;

  // Determine if the frame should be accessible
  const isAccessible = frameDay <= currentDay;

  const handleClick = () => {
    if (isAccessible && !isSelected) {
      setSelectedUid(blok._uid);
    }
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      setSelectedUid(null);
    }
  }

  const frameVariants = {
    initial: {
      borderRadius: "0.5rem",
    },
    expanded: {
      borderRadius: "0rem",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  };

  const previewVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, delay: 1 },
    },
  };

  const expandedVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      layout
      onLayoutAnimationStart={() => setIsAnimating(true)}
      onLayoutAnimationComplete={() => setIsAnimating(false)}

      {...storyblokEditable(blok)}

      variants={frameVariants}
      initial="initial"
      animate={isSelected ? "expanded" : "initial"}

      style={{
        gridArea: letter,
        zIndex: isFadingOut || isAnimating || isSelected ? 50 : 0,
        width: isFadingOut && isSelected ? "100vw" : "100%",
        height: isFadingOut && isSelected ? "100vh" : "100%",
        position: isFadingOut || isSelected ? "fixed" : "relative",
        borderRadius: isFadingOut && isSelected ? "0rem" : "0.5rem",
        top: 0,
        left: 0,
        cursor: isAccessible ? 'pointer' : 'normal',
      }}
      transition={{
        layout: { duration: 0.5, ease: "easeInOut" },
      }}
      className={`overflow-hidden text-black
        ${isAccessible && !isSelected ? "bg-[#3688D3]" : "bg-[#E9E9E6]"}
        transition-colors duration-500`}
      onClick={isAccessible && !isSelected ? handleClick : undefined}
    >
      <motion.div
        layout
        className="flex justify-center items-center w-full h-full p-8">
        <AnimatePresence mode="wait">
          {!isSelected && (
            // Render preview content
            <motion.h2
              key={`preview-${blok._uid}`}
              layout
              // layoutId={`title-${blok._uid}`}
              layoutId={`content-${blok._uid}`}
              variants={previewVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onAnimationStart={() => setIsFadingOut(true)}
              onAnimationComplete={() => setIsFadingOut(false)}

              className={`text-fluid-6xl font-semibold ${(letter == "x" || letter == "t") && "text-fluid-9xl"} ${(letter == "a" || letter == "m" || letter == "q") && "text-fluid-8xl"}`}
            >
              {blok.name.slice(0, -10)}
            </motion.h2>

          )}
          {isSelected && (
            <motion.div
              key={`expanded-${blok._uid}`}
              layout
              // layoutId={`content-${blok._uid}`}
              layoutId={`content-${blok._uid}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onAnimationStart={() => setIsFadingOut(true)}
              onAnimationComplete={() => setIsFadingOut(false)}

              className="w-full h-full"
            >
              <button
                // layout
                className="absolute top-4 left-4"
                onClick={handleClose}
              >
                Close
              </button>
              <div
                // layout
                // layoutId={`content-${blok._uid}`}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div >
  )
}