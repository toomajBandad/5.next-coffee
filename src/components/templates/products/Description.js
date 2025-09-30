import React from "react";

function Description({ shortDesc, desc }) {
  const paragraphs = desc?.split("\n").filter(Boolean);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 text-gray-900">
      <div className="space-y-8">
        {shortDesc && (
          <h2 className="text-2xl font-semibold tracking-tight leading-snug">
            {shortDesc}
          </h2>
        )}
        {paragraphs?.map((text, index) => (
          <p key={index} className="text-lg leading-relaxed text-gray-700">
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}

export default Description;
