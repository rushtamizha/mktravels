import AboutAndServicesSection from '@/components/AboutAndServicesSection'
import { HeroSection } from '@/components/Hero'
import React from 'react'
import TourPackages from '@/components/TourPackages'
import Testimonials from '@/components/Testimonials'
import AirportTransfers from '@/components/Fleets'
import TravelSolutions from '@/components/TravelSolutions'
import FAQSection from '@/components/FAQSection'
import TravelPartnerHero from '@/components/TravelPartnerHero'
import TravelGallery from '@/components/TravelGallery'

const page = () => {
  return (
    <div>
      <HeroSection/>
      <TravelSolutions/>
      <TourPackages/>
      <TravelPartnerHero/>
      <AirportTransfers/>
      <FAQSection/>
      <Testimonials/> 
      <TravelGallery/>
    </div>
  )
}

export default page