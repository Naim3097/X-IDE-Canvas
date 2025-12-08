export type SocialFormat = {
  id: string;
  name: string;
  width: number;
  height: number;
  platform: 'Instagram' | 'Facebook' | 'TikTok' | 'YouTube' | 'Twitter' | 'LinkedIn' | 'Pinterest' | 'Other';
  icon: string;
  description: string;
  safeZones?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

export const SOCIAL_FORMATS: SocialFormat[] = [
  // Instagram
  {
    id: 'ig-post-square',
    name: 'Square Post',
    width: 1080,
    height: 1080,
    platform: 'Instagram',
    icon: 'square',
    description: '1080 x 1080 px'
  },
  {
    id: 'ig-post-portrait',
    name: 'Portrait Post',
    width: 1080,
    height: 1350,
    platform: 'Instagram',
    icon: 'image',
    description: '1080 x 1350 px'
  },
  {
    id: 'ig-story',
    name: 'Story / Reel',
    width: 1080,
    height: 1920,
    platform: 'Instagram',
    icon: 'smartphone',
    description: '1080 x 1920 px',
    safeZones: {
        top: 250,    // Profile info & top bar
        bottom: 340, // Reply bar & actions
        left: 0,
        right: 0
    }
  },
  
  // Facebook
  {
    id: 'fb-post-landscape',
    name: 'Landscape Post',
    width: 1200,
    height: 630,
    platform: 'Facebook',
    icon: 'image',
    description: '1200 x 630 px'
  },
  {
    id: 'fb-post-square',
    name: 'Square Post',
    width: 1200,
    height: 1200,
    platform: 'Facebook',
    icon: 'square',
    description: '1200 x 1200 px'
  },
  {
    id: 'fb-story',
    name: 'Story',
    width: 1080,
    height: 1920,
    platform: 'Facebook',
    icon: 'smartphone',
    description: '1080 x 1920 px',
    safeZones: {
        top: 150,
        bottom: 250
    }
  },
  {
    id: 'fb-cover',
    name: 'Cover Photo',
    width: 820,
    height: 312,
    platform: 'Facebook',
    icon: 'layout',
    description: '820 x 312 px',
    safeZones: {
        bottom: 90, // Profile picture overlap area roughly
        left: 200   // Profile picture overlap area roughly
    }
  },

  // TikTok
  {
    id: 'tiktok-video',
    name: 'TikTok Video',
    width: 1080,
    height: 1920,
    platform: 'TikTok',
    icon: 'video',
    description: '1080 x 1920 px',
    safeZones: {
        top: 130,
        bottom: 380, // Caption & music
        right: 160,  // Action buttons
        left: 20
    }
  },

  // YouTube
  {
    id: 'yt-thumbnail',
    name: 'Thumbnail',
    width: 1280,
    height: 720,
    platform: 'YouTube',
    icon: 'monitor',
    description: '1280 x 720 px',
    safeZones: {
        bottom: 50, // Time stamp usually bottom right
        right: 200
    }
  },
  {
    id: 'yt-banner',
    name: 'Channel Banner',
    width: 2560,
    height: 1440,
    platform: 'YouTube',
    icon: 'layout',
    description: '2560 x 1440 px'
  },

  // Twitter / X
  {
    id: 'twitter-post',
    name: 'Post',
    width: 1600,
    height: 900,
    platform: 'Twitter',
    icon: 'image',
    description: '1600 x 900 px'
  },
  {
    id: 'twitter-header',
    name: 'Header',
    width: 1500,
    height: 500,
    platform: 'Twitter',
    icon: 'layout',
    description: '1500 x 500 px'
  },

  // LinkedIn
  {
    id: 'linkedin-post',
    name: 'Post',
    width: 1200,
    height: 627,
    platform: 'LinkedIn',
    icon: 'image',
    description: '1200 x 627 px'
  },

  // Pinterest
  {
    id: 'pinterest-pin',
    name: 'Pin',
    width: 1000,
    height: 1500,
    platform: 'Pinterest',
    icon: 'image',
    description: '1000 x 1500 px'
  }
];
