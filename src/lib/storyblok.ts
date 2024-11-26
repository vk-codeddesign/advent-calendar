import { storyblokInit, apiPlugin, getStoryblokApi } from '@storyblok/react/rsc';
import Frame from '@/components/Frame';
import Creator from '@/components/Creator';
import DeployedProject from '@/components/Project';

const components = {
  frame: Frame,
  creator: Creator,
  deployed_project: DeployedProject,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components,
});

export { getStoryblokApi };
