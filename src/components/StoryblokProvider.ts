'use client';

import { ReactNode } from 'react';
import { storyblokInit, apiPlugin } from '@storyblok/react';

interface StoryblokProviderProps {
  children: ReactNode;
}

storyblokInit({
  accessToken: process.env.storyblokApiToken,
  use: [apiPlugin],
});

export default function StoryblokProvider({ children }: StoryblokProviderProps): ReactNode {
  return children;
}
