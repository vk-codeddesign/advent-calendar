import { getStoryblokApi } from '@/lib/storyblok';
import { ISbStoriesParams } from '@storyblok/react';

export async function fetchData() {
  const sbParams: ISbStoriesParams = { version: 'draft' };

  const storyblokApi = getStoryblokApi();
  if (!storyblokApi) {
    throw new Error('Storyblok API is not initialized.');
  }

  return storyblokApi.get(`cdn/stories/home`, sbParams, { cache: 'no-store' });
}
