import digitalMarketingImage from '../assets/images/Images_for_dep/Images_for_dep/Digital marketing.webp'
import websiteDevelopmentImage from '../assets/images/Images_for_dep/Images_for_dep/web developmetn.webp'
import seoImage from '../assets/images/Images_for_dep/Images_for_dep/SEO.webp'
import socialMediaImage from '../assets/images/Images_for_dep/Images_for_dep/social_media.webp'
import brandingImage from '../assets/images/Images_for_dep/Images_for_dep/Branding&identity.webp'
import graphicDesignImage from '../assets/images/Images_for_dep/Images_for_dep/graphic_desgin.webp'
import videoEditingImage from '../assets/images/Images_for_dep/Images_for_dep/vdo_producction.webp'
import influencerImage from '../assets/images/Images_for_dep/Images_for_dep/influencer.webp'

const servicesData = [
   {
    id: 1,
    slug: 'seo',
    title: 'Search Engine Optimization (SEO)',
    description:
      'SEO isn’t just about ranking high in searches; it is about ensuring that your website gets discovered by the right people when they are looking for something you can provide to them. Here at Sage GFX, we integrate search insights, technical SEO, good content and enhancements into our strategy.',
    details: [
      'Keyword research and analysis',
      'On-page SEO optimization',
      'Technical SEO audits',
      'Content optimization',
      'Local SEO and Google Business Profile',
      'Website performance improvements',
      'Backlink strategy',
      'Organic traffic and ranking reports',
    ],
    image: seoImage,
    iconIndex: 0,
  },
  {
    id: 2,
    slug: 'aeo',
    title: 'Answer Engine Optimization (AEO)',
    description:
      'The landscape of search is evolving. And users want fast and accurate answers. We help brands by organizing their content in such a way that makes it easier for search engines and answering platforms to understand your industry knowledge. We ensure that your content is valuable and relevant enough to get featured in the right answers.',
    details: [
      'AI search visibility optimization',
      'Question-based keyword research',
      'Featured snippet optimization',
      'Structured content optimization',
      'FAQ and schema markup',
      'AI search performance tracking',
    ],
    image: brandingImage,
    iconIndex: 1,
  },
  {
    id: 3,
    slug: 'geo',
    title: 'Generative Engine Optimization (GEO)',
    description:
      'AI search is revolutionizing the way people find businesses and information. At Sage GFX, we help build intelligent and structurally sound content to make it easier for AI search engines to understand your brand, services, and expertise. Through our GEO strategy, we ensure that your digital footprint remains strong even as search evolves.',
    details: [
      'AI search content optimization',
      'Brand authority development',
      'Entity and topic optimization',
      'Content quality improvement',
      'Online brand mention strategy',
      'AI visibility monitoring',
    ],
    image: graphicDesignImage,
    iconIndex: 2,
  },
  {
    id: 4,
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    description:
      'Social media marketing involves more than just posting on a regular basis; it’s all about creating content that gives people a reason to engage with and pay attention to your brand. Sage GFX offers strategic social media marketing services and creative content that represents your brand and resonates with your target audience.',
    details: [
      'Social media strategy',
      'Content calendar planning',
      'Platform-specific campaigns',
      'Audience targeting',
      'Engagement and community management',
      'Campaign analytics and reporting',
    ],
    image: influencerImage,
    iconIndex: 3,
  },
  {
    id: 5,
    slug: 'performance-marketing ',
    title: 'Performance Marketing ',
    description:
      'We create strategic campaigns on Google Ads and Meta Ads which will help you reach your target audience. In campaign creation and continuous optimisation, our priority lies in improving targeting and growth. From strategic ad copy to landing pages, we take care of everything which is required for your campaign.',
    details: [
      'Google Ads campaign management',
      'Meta Ads campaign management',
      'Lead generation campaigns',
      'Conversion tracking setup',
      'Landing page optimization',
      'A/B testing and campaign optimization',
      'ROI and ROAS reporting',
    ],
    image: socialMediaImage,
    iconIndex: 4,
  },
  {
    id: 6,
    slug: 'website-development',
    title: 'Website Development',
    description:
      'The website is usually the first contact point where users get Well-informed with your brand. We design clean, responsive and functional websites that have a clear navigation system, represent your brand and enable the visitors to take the next step. In terms of structure, design, performance and functionality, we design websites that help you achieve your marketing objectives.',
    details: [
      'Business and corporate websites',
      'Custom website development',
      'React website development',
      'WordPress website development',
      'Landing pages and portfolios',
      'Responsive mobile-first design',
      'Website speed optimization',
      'Website maintenance and support',
    ],
    image: websiteDevelopmentImage,
    iconIndex: 5,
  },

  {
    id: 7,
    slug: 'graphic-design-video-editing',
    title: 'Graphic Design & Video Editing',
    description:
      'Eye-catching visuals will ensure that your brand catches the attention of your audience. We design fascinating graphics and videos for use on social media, websites, marketing campaigns, and other marketing purposes. Our visuals will be original, consistent, and representative of your brand from start to finish.',
    details: [
      'Instagram Reels and YouTube Shorts',
      'Promotional and advertising videos',
      'Corporate and brand videos',
      'Product demonstration videos',
      'Video transitions and effects',
      'Motion graphics and animations',
      'Color correction and sound editing',
    ],
    image: videoEditingImage,
    iconIndex: 6,
  },
  {
    id: 8,
    slug: 'videography',
    title: 'Video Graphy',
    description:
      'Great video is more than good visuals — it should make people feel something and remember your brand. We create purposeful video content that captures your people, products and ideas in a natural and engaging way. From brand stories and promotional videos to social media content, we help you communicate your message through visuals that connect',
    details: [
      'Social media post designs',
      'Logo and brand identity design',
      'Brochures and flyers',
      'Advertising creatives',
      'Product and packaging design',
      'Business cards and stationery',
      'Print-ready artwork',
    ],
    image: graphicDesignImage,
    iconIndex: 7,
  },
];
export default servicesData
