import { getStoryblokApi } from '@/lib/storyblok';
import { type ISbStoriesParams, type StoryblokClient } from '@storyblok/react';

export async function fetchData() {
  const sbParams: ISbStoriesParams = { version: 'draft' };

  const storyblokApi: StoryblokClient = getStoryblokApi();

  if (!storyblokApi) {
    throw new Error('Storyblok API is not initialized.');
  }

  return storyblokApi.get(`cdn/stories/home`, sbParams);
}
