
import { HeroSection } from '@/components/Hero'
import React from 'react'
import TourPackages from '@/components/TourPackages'

import AirportTransfers from '@/components/Fleets'
import TravelSolutions from '@/components/TravelSolutions'
import FAQSection from '@/components/FAQSection'
import TravelPartnerHero from '@/components/TravelPartnerHero'


const page = () => {
  return (
    <div>
      <HeroSection/>
      <TravelSolutions/>
      <TourPackages/>
      <TravelPartnerHero/>
      <AirportTransfers/>
      <FAQSection/>
    </div>
  )
}

export default page