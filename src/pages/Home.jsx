import { useState } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import HomeServicesCarousel from '../components/HomeServicesCarousel'
import HomeStats from '../components/HomeStats'
import WhyChoose from '../components/WhyChoose'
import ClientReviews from '../components/ClientReviews'
import CommonQuestions from '../components/CommonQuestions'
import HeroInquiryForm from '../components/HeroInquiryForm'
import OurClients from '../components/OurClients'
import HomeHowWeWork from '../components/HomeHowWeWork'
import HomeBlog from '../components/HomeBlog'
import HomeContact from '../components/HomeContact'

function Home({ openLightbox }) {
  const [heroVideoReady, setHeroVideoReady] = useState(false)
  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero onVideoReady={() => setHeroVideoReady(true)} />
      <HeroInquiryForm videoReady={heroVideoReady} />

      {/* Homepage sections follow the visitor journey. */}
      <OurClients />
      <About openLightbox={openLightbox} />
      <HomeServicesCarousel />
      <HomeStats />
      <HomeHowWeWork />
      <WhyChoose />
      <ClientReviews />
      <CommonQuestions />
      <HomeBlog />
      <HomeContact />
    </div>
  )
}

export default Home
