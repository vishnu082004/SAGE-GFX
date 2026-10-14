import {
  FiCompass,
  FiFilm,
  FiGlobe,
  FiLayers,
  FiPenTool,
  FiPrinter,
  FiUsers,
  FiUserCheck,
} from 'react-icons/fi'
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
    title: 'Branding & Identity',
    description: 'Build a clear, memorable brand identity that earns recognition and trust.',
    details: ['Logo design', 'Brand identity systems', 'Brand guidelines', 'Corporate stationery', 'Rebranding and brand refresh'],
    image: brandingImage,
    Icon: FiLayers,
  },
  {
    id: 2,
    title: 'Graphic Design',
    description: 'Create polished visuals that communicate your message and strengthen your brand.',
    details: ['Posters and social media creatives', 'Brochures, flyers and pamphlets', 'Corporate collateral', 'Packaging and label design', 'Print-ready artwork'],
    image: graphicDesignImage,
    Icon: FiPenTool,
  },
  {
    id: 3,
    title: 'Social Media Marketing',
    description: 'Reach the right people with social campaigns built around your business goals.',
    details: ['Social media campaigns', 'Lead generation ads', 'Audience targeting', 'Sales and conversion strategy', 'A/B testing and optimization'],
    image: influencerImage,
    Icon: FiUsers,
  },
  {
    id: 4,
    title: 'Social Media Management',
    description: 'Keep your channels active, consistent and useful to the people you want to reach.',
    details: ['Page setup and optimization', 'Monthly content planning', 'Daily or weekly publishing', 'Creative design', 'Community and query management', 'Insights and reporting'],
    image: socialMediaImage,
    Icon: FiUserCheck,
  },
  {
    id: 5,
    title: 'Website Development',
    description: 'Get a fast, mobile-friendly website designed to present your brand and convert visitors.',
    details: ['Business and service websites', 'WordPress websites', 'Landing pages', 'Portfolio websites', 'Custom UI/UX', 'Responsive development'],
    image: websiteDevelopmentImage,
    Icon: FiGlobe,
  },
  {
    id: 6,
    title: 'SEO',
    description: 'Improve your search visibility and help more qualified customers find your website.',
    details: ['On-page SEO', 'Technical SEO', 'Keyword strategy', 'SEO audits', 'Local SEO', 'Performance improvements'],
    image: seoImage,
    Icon: FiCompass,
  },
  {
    id: 7,
    title: 'Video Editing',
    description: 'Turn your ideas into engaging videos for campaigns, social channels and product stories.',
    details: ['Promotional videos', 'Social media reels', 'Ad videos', 'Corporate videos', 'Product videos', 'Motion graphics'],
    image: videoEditingImage,
    Icon: FiFilm,
  },
  {
    id: 8,
    title: 'Signage & Digital Print',
    description: 'Extend your brand into the real world with clear, high-quality signage and print.',
    details: ['Storefront signage', 'Flex and vinyl prints', 'Business cards', 'Brochures and marketing materials', 'Large-format printing'],
    image: digitalMarketingImage,
    Icon: FiPrinter,
  },
]

export default servicesData
