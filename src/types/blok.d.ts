import { SbBlokData } from '@storyblok/react';

export interface PageProps {
  blok: PageBlok;
}

export interface FrameProps {
  blok: FrameBlok;
}

export interface CreatorProps {
  blok: CreatorBlok;
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
  creator: CreatorBlok[];
  deployed_project: DeployedProjectBlok[];
  component: string;
  _editable?: string;
}

export interface CreatorBlok extends SbBlokData {
  _uid: string;
  full_name: string;
  portfolio_link: MultiLinkBlok;
  linkedin_handle: string;
  instagram_handle: string;
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
