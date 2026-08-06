import FleetCards from '@/components/Fleets'
import Header from '@/components/Header'
import React from 'react'

const page = () => {
  return (
    <div >
        <Header prefix="Modern" suffix="AC Fleet" description="Choose from clean, well-maintained Sedans, MUVs, SUVs, and Tempo Travellers for safe outstation travel across Tamil Nadu."/>
        <FleetCards/>
    </div>
  )
}

export default page