"use client";
import React from "react";
import ContactForm from "@/components/templates/contact-us/ContactForm";
import Information from "@/components/templates/contact-us/Information";
// import LeafletMap from "@/components/templates/contact-us/LeafletMap";

import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/templates/contact-us/LeafletMap'), {
  ssr: false,
});


const madrid = [40.416775, -3.703790];
const barcelona = [41.385063, 2.173404];

export default function ContactUsClient() {
  return (
    <>
      {/* Map Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Our Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LeafletMap center={madrid} position={madrid}>
            <div className="mt-4 text-center text-sm text-gray-700">
              <div className="font-semibold">Main Market Address</div>
              <div>Sell Market, Avenida de América, 24</div>
            </div>
          </LeafletMap>
          <LeafletMap center={barcelona} position={barcelona}>
            <div className="mt-4 text-center text-sm text-gray-700">
              <div className="font-semibold">Second Market Address</div>
              <div>Bulgari Avenida, Pasaje Roque, 3</div>
            </div>
          </LeafletMap>
        </div>
      </section>

      {/* Info & Form Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <Information />
          <ContactForm />
        </div>
      </section>
    </>
  );
}