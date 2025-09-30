import React from 'react';

function MoreInfoes({ product }) {
  const {
    brand,
    weight,
    type,
    origin,
    roastLevel,
    smell,
    score,
    stock,
  } = product || {};

  const info = [
    { label: 'Brand', value: brand },
    { label: 'Weight', value: `${weight}g` },
    { label: 'Type', value: type },
    { label: 'Origin', value: origin },
    { label: 'Roast Level', value: roastLevel },
    { label: 'Smell Profile', value: smell },
    { label: 'Rating', value: score?.toFixed(1) },
    { label: 'Availability', value: stock > 0 ? `${stock} in stock` : 'Out of stock' },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-14">
      <h3 className="text-3xl font-bold text-gray-900 mb-10 tracking-tight">
        Product Specifications
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8">
        {info.map(
          (item, idx) =>
            item.value && (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {item.label}
                </span>
                <span className="text-lg text-gray-800 font-medium">
                  {item.value}
                </span>
              </div>
            )
        )}
      </div>
    </section>
  );
}

export default MoreInfoes;