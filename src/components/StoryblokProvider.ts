'use client';

import { ReactNode } from 'react';
import { storyblokInit, apiPlugin } from '@storyblok/react';

storyblokInit({
  accessToken: process.env.storyblokApiToken,
  use: [apiPlugin],
});

export default function StoryblokProvider({ children }: { children: React.FC<ReactNode> }) {
  return children;
}
