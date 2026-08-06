import AirportTransfers from '@/components/Fleets';
import React from 'react';

export default async function Page({ params }) {
  const resolvedParams = await params;
  const serviceType = resolvedParams?.serviceType;

  return (
    <div className='py-20'>
        <AirportTransfers serviceType={serviceType} />
    </div>
  );
}