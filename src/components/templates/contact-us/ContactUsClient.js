"use client";
import React from "react";
import dynamic from "next/dynamic";
import PageTitle from "@/components/modules/pageTitle/PageTitle";
import ContactForm from "@/components/templates/contact-us/ContactForm";
import Information from "@/components/templates/contact-us/Information";

const LeafletMap = dynamic(() => import('@/components/templates/contact-us/LeafletMap'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded" />,
});

const madrid = [40.416775, -3.703790];
const barcelona = [41.385063, 2.173404];

export default function ContactUsClient() {
  return (
    <main className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">

        {/* Map Section */}
        <section>
          <PageTitle title="Our Address" subtitle="Find us here for more connections" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
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
        <section>
          <PageTitle title="Contact Us" subtitle="We’d love to hear from you" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-10 items-start">
            <Information />
            <ContactForm />
          </div>
        </section>

      </div>
    </main>
  );
}