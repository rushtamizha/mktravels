import AirportTransfers from '@/components/Fleets';
import Header from '@/components/Header';
import React from 'react';

export default async function Page({ params }) {
  const resolvedParams = await params;
  const serviceType = resolvedParams?.serviceType;

  return (
    <div className='pt-20'>
        <Header prefix="Modern" suffix="AC Fleet" description="Choose from clean, well-maintained Sedans, MUVs, SUVs, and Tempo Travellers for safe outstation travel across Tamil Nadu."/>
        <AirportTransfers serviceType={serviceType} />
    </div>
  );
}