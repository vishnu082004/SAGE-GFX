import Hero from '../components/Hero'
import About from '../components/About'
import HomeServicesCarousel from '../components/HomeServicesCarousel'
import HomeProjects from '../components/HomeProjects'
import WhyChoose from '../components/WhyChoose'
import ClientReviews from '../components/ClientReviews'
import CommonQuestions from '../components/CommonQuestions'
import HeroInquiryForm from '../components/HeroInquiryForm'
import OurClients from '../components/OurClients'

function Home({ openLightbox }) {
  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero />
      <HeroInquiryForm />

      {/* 2. About Section with 3D Mouse Tilt */}
      <About openLightbox={openLightbox} />
      <OurClients />

      {/* Services Grid */}
      <HomeServicesCarousel />

      {/* Why Choose Us */}
      <WhyChoose />
      <HomeProjects />
      <ClientReviews />
      <CommonQuestions />
    </div>
  )
}

export default Home
