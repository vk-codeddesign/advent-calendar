import { SbBlokData } from '@storyblok/react';

export interface PageProps {
  blok: PageBlok;
}

export interface FrameProps {
  blok: FrameBlok;
}

export interface AboutProps {
  blok: AboutBlok;
}

export interface DeployedProjectProps {
  blok: DeployedProjectBlok;
}

// Storyblok JSON types

export interface PageBlok extends SbBlokData {
  _uid: string;
  body: FrameBlok[];
  component: string;
  _editable?: string;
}

export interface FrameBlok extends SbBlokData {
  _uid: string;
  name: string;
  dayNumber: number;
  about: AboutBlok[];
  deployed_project: DeployedProjectBlok[];
  component: string;
  _editable?: string;
  mobile_ar_width: number;
  mobile_ar_height: number;
  desktop_ar_width: number;
  desktop_ar_height: number;
}

export interface AboutBlok extends SbBlokData {
  _uid: string;
  project_title: string;
  project_description: string;
  creator_full_name: string;
  creator_portfolio_link: MultiLinkBlok;
  creator_linkedin_handle: MultiLinkBlok;
  creator_instagram_handle: string;
  component: string;
  _editable?: string;
}

export interface DeployedProjectBlok extends SbBlokData {
  _uid: string;
  preview: PreviewBlok;
  netlify_url: MultiLinkBlok;
  component: string;
  _editable?: string;
}

export interface PreviewBlok {
  id: number | null;
  alt: string | null;
  name: string;
  filename: string;
}

export interface MultiLinkBlok {
  id: string;
  url: string;
  linktype: string;
  fieldtype: string;
  cached_url: string;
}
