'use client';

import { ReactNode } from 'react';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import Frame from '@/components/Frame';
import Creator from '@/components/Creator';
import Project from '@/components/Project';
import Page from '@/components/StoryblokPage';

const components = {
  page: Page,
  frame: Frame,
  creator: Creator,
  deployed_project: Project,
};

interface StoryblokProviderProps {
  children: ReactNode;
}

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components,
});

export default function StoryblokProvider({ children }: StoryblokProviderProps): ReactNode {
  return children;
}
