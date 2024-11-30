"use client"

import { DeployedProjectProps } from "@/types/blok";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useEffect } from "react";

export default function DeployedProject({ blok }: DeployedProjectProps) {

  useEffect(() => {
    const handleTouchStart = () => {
      const deviceMotionEvent = DeviceMotionEvent as typeof DeviceMotionEvent & {
        requestPermission: () => Promise<'granted' | 'denied'>;
      };

      if (typeof deviceMotionEvent.requestPermission === 'function') {
        deviceMotionEvent.requestPermission()
          .then(response => {
            if (response === 'granted') {
              console.log('Motion permission granted on parent page');
              const iframe = document.getElementById(`iframe-${blok._uid}`) as HTMLIFrameElement;
              iframe.contentWindow?.postMessage('motion-permission-granted', '*');
            } else {
              console.error('Motion permission denied on parent page');
            }
          })
          .catch(console.error);
      } else {
        console.log('DeviceMotionEvent.requestPermission is not available on this browser');
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { once: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [blok._uid]);


  return (
    <div {...storyblokEditable(blok)} className="overflow-hidden">
      <div className="relative w-[307px] h-[307px] md:w-[512px] md:h-[512px] overscroll-none">
        <iframe
          id={`iframe-${blok._uid}`}
          src={blok.netlify_url.url}
          // src="https://editor.p5js.org/amcc/sketches/kBndhSZER"
          className="absolute transform-gpu origin-top-left scale-30 md:scale-50 overflow-hidden"
          style={{ width: "1024px", height: "1024px", touchAction: "manipulation" }}
          allow="camera; microphone; accelerometer; gyroscope; geolocation; magnetometer; fullscreen; autoplay"
        />
      </div>
    </div>
  )
}