// global.d.ts
export {}; // Ensure this file is treated as a module

declare global {
  interface DeviceMotionEventConstructor {
    requestPermission: () => Promise<'granted' | 'denied'>;
  }

  let DeviceMotionEvent: DeviceMotionEventConstructor;
}
