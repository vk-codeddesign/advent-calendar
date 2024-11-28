import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import Frame from '@/components/Frame';
import About from '@/components/About';
import DeployedProject from '@/components/Project';
import StoryblokPage from '@/components/StoryblokPage';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: StoryblokPage,
    frame: Frame,
    about: About,
    deployed_project: DeployedProject,
  },
});
