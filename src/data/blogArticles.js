import blogImageOne from '../assets/images/blog-img/blog-img/blogs 1.webp'
import blogImageTwo from '../assets/images/blog-img/blog-img/blogs 2.webp'
import blogImageThree from '../assets/images/blog-img/blog-img/blogs 3.webp'
import localSeoBlog from './localSeoBlog'
import seoTambaramBlog from './seoTambaramBlog'
import videoMarketingBlog from './videoMarketingBlog'

const blogArticles = [
  localSeoBlog,
  seoTambaramBlog,
  videoMarketingBlog,
  {
    slug: 'social-content-with-purpose',
    category: 'Social media',
    title: 'A more thoughtful approach to social media content',
    summary: 'Useful, recognizable content gives people a reason to stop, respond, and come back.',
    image: '/images/blog/card-4.webp',
    accent: '#ee58bc',
    readTime: '4 min read',
    sections: [
      { heading: 'Give each post a clear job', paragraphs: ['A social post can teach, show how something works, share a customer story, or invite a conversation. Choosing one purpose keeps the message focused.', 'Build a short list of themes your audience cares about and your team can speak about with confidence. This makes planning easier and keeps content connected to the brand.'] },
      { heading: 'Make consistency realistic', paragraphs: ['A sustainable schedule is better than a burst of posts followed by silence. Plan around the time and creative resources your team actually has.', 'Reuse strong ideas in different formats when it helps the audience. A useful article, for example, can become a short video, a carousel, and a set of practical tips.'] },
      { heading: 'Treat replies as part of the work', paragraphs: ['Social media is a two-way channel. Respond clearly, learn from recurring questions, and make it easy for people to reach the right person when they need help.', 'Measure meaningful interactions and enquiries alongside reach. The goal is to build trust and useful relationships, not simply to fill a calendar.'] },
    ],
  },
  {
    slug: 'video-content-that-connects',
    category: 'Video & content',
    title: 'How to make short-form video feel more human',
    summary: 'A clear idea, a natural voice, and a strong opening can make a small video memorable.',
    image: '/images/blog/card-5.webp',
    accent: '#ff9a53',
    readTime: '5 min read',
    sections: [
      { heading: 'Begin with one useful idea', paragraphs: ['Before filming, write down the single thing a viewer should understand or remember. A focused idea is easier to explain and easier to edit into a short piece.', 'Open with the question, result, or moment that matters most. Give people a reason to stay before adding extra context.'] },
      { heading: 'Let the real people and process show', paragraphs: ['Polished production helps, but clarity and authenticity matter more. A real demonstration, team perspective, or behind-the-scenes detail can make a business feel approachable.', 'Use natural language and add captions so the video works with the sound off. Keep text readable and make sure important information is not hidden by platform controls.'] },
      { heading: 'Plan the next step', paragraphs: ['Decide where the video will appear and what the viewer can do after watching. A helpful link, a specific question, or a related resource gives the content a purpose.', 'Review watch time, saves, replies, and enquiries to learn which ideas deserve a follow-up.'] },
    ],
  },
  {
    slug: 'ui-ux-design-clearer-experiences',
    category: 'UI/UX design',
    title: 'Small UX decisions that make digital products easier to use',
    summary: 'Clear labels, useful feedback, and fewer unnecessary steps build confidence in a product.',
    image: '/images/blog/card-6.webp',
    accent: '#47d6ae',
    readTime: '6 min read',
    sections: [
      { heading: 'Use the language people already know', paragraphs: ['Interface labels should describe what happens in familiar words. Replace internal jargon with the language customers use when they ask for help or explain a task.', 'Keep buttons specific. â€œSend enquiryâ€ tells someone more than â€œSubmit,â€ especially when the action has a meaningful result.'] },
      { heading: 'Show what the system is doing', paragraphs: ['People need feedback after they act. Confirm when a form is sent, explain what is required when something is missing, and make errors easy to correct.', 'Good feedback reduces uncertainty and helps users recover without starting over.'] },
      { heading: 'Remove steps that do not help', paragraphs: ['Review important flows from the userâ€™s point of view. Ask what information is truly needed, what can be deferred, and where a decision can be made simpler.', 'Test changes with real users where possible. Small, observed improvements often reveal more than assumptions made in a meeting.'] },
    ],
  },
  {
    slug: 'seo-foundations-for-small-business', category: 'SEO', title: 'SEO foundations every small business can get right',
    summary: 'A useful search strategy starts with a technically sound site, helpful pages, and a clear understanding of customer intent.',
    image: '/images/blog/card-7.webp', accent: '#76a0ff', readTime: '7 min read',
    sections: [
      { heading: 'Make important pages easy to find', paragraphs: ['Organize your site around the questions customers bring to you. Use clear page titles, descriptive headings, and links that help people move naturally from an overview to the detail they need.', 'Give each page one clear purpose. When several pages target the same need, combine or distinguish them so visitors and search engines can understand which page is most useful.'] },
      { heading: 'Help search engines access your site', paragraphs: ['Check that key pages load reliably, work well on phones, and can be crawled. Fix broken links, redirect retired URLs thoughtfully, and submit a sitemap so pages are easier to discover.', 'Resize and compress large images, limit unnecessary scripts, and test pages on mobile connections.'] },
      { heading: 'Publish useful answers and keep them current', paragraphs: ['Start with real customer questions and answer them with specific, accurate guidance. First-hand examples and clear explanations are more valuable than pages written only to repeat a keyword.', 'Review important pages regularly. Update outdated details, improve confusing sections, and use search performance as a clue about what people still need.'] },
    ],
  },
  {
    slug: 'social-media-calendar-that-works', category: 'Social media', title: 'Plan a social media calendar your team can actually keep',
    summary: 'A flexible rhythm, a few strong content themes, and a simple review process make consistent publishing manageable.',
    image: '/images/blog/card-8.webp', accent: '#ed72bb', readTime: '5 min read',
    sections: [
      { heading: 'Choose a few repeatable themes', paragraphs: ['Build your calendar around subjects your audience cares about and your team can speak about with confidence. A useful mix might include practical advice, process stories, customer perspectives, and timely updates.', 'Themes create consistency without making every post feel the same. They also make it easier to generate ideas when planning time is short.'] },
      { heading: 'Set a pace you can sustain', paragraphs: ['Choose a posting frequency that fits your available time and creative resources. A dependable schedule of strong posts builds more trust than an ambitious plan that quickly becomes difficult to maintain.', 'Batch simple tasks such as gathering photos or drafting captions, while leaving room to respond to conversations and timely opportunities.'] },
      { heading: 'Learn from the response', paragraphs: ['Review saves, replies, shares, profile visits, and enquiries alongside reach. These signals help you understand which content is useful and which topics deserve another angle.', 'Repeat what works, improve what feels unclear, and retire formats that no longer serve your audience.'] },
    ],
  },
  {
    slug: 'website-refresh-priorities', category: 'Web strategy', title: 'Planning a website refresh? Start with these priorities',
    summary: 'A focused refresh begins with customer needs and evidence, then improves the pages and journeys that matter most.',
    image: '/images/blog/card-9.webp', accent: '#43c6dc', readTime: '6 min read',
    sections: [
      { heading: 'Find friction before changing visuals', paragraphs: ['Look at analytics, search terms, sales questions, and support requests to find where visitors struggle. Slow pages, unclear service details, and hidden contact options often matter more than a new visual effect.', 'Ask a few customers to complete a common task on the current site. Watching where they hesitate gives you concrete problems to solve.'] },
      { heading: 'Prioritize high value journeys', paragraphs: ['Map the paths that lead to meaningful outcomes, such as understanding a service or sending an enquiry. Make each step clear and remove information that distracts from the decision.', 'Refresh the pages that support these journeys first. A focused set of improvements is easier to review than a rebuild without clear priorities.'] },
      { heading: 'Protect what already works', paragraphs: ['Before launch, list pages people rely on, useful search rankings, and important links from other sites. Keep valuable content, redirect changed URLs, and check forms, tracking, and mobile layouts.', 'After launch, measure your goals and use customer feedback to guide the next improvements.'] },
    ],
  }
]

export default blogArticles



