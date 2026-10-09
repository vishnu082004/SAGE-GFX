import Hero from '../components/Hero'
import About from '../components/About'
import HomeServicesCarousel from '../components/HomeServicesCarousel'
import HomeProjects from '../components/HomeProjects'
import WhyChoose from '../components/WhyChoose'
import ClientReviews from '../components/ClientReviews'
import CommonQuestions from '../components/CommonQuestions'
import HowItWorks from '../components/HowItWorks'
import HeroInquiryForm from '../components/HeroInquiryForm'

function Home({ openLightbox }) {
  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero />
      <HeroInquiryForm />

      {/* 2. About Section with 3D Mouse Tilt */}
      <About openLightbox={openLightbox} />

      {/* Services Grid */}
      <HomeServicesCarousel />

      {/* Why Choose Us */}
      <WhyChoose />
      <HowItWorks />
      <HomeProjects />
      <ClientReviews />
      <CommonQuestions />
    </div>
  )
}

export default Home
