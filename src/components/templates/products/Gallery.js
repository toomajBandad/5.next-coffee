'use client';

export default function Gallery({ product }) {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[500px] overflow-hidden rounded-xl shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
      />

      {/* Optional Overlay for Text or Branding */}
      <div className="absolute inset-0 bg-black/30 flex items-end p-6">
        <div className="text-white">
          <h2 className="text-3xl font-bold drop-shadow">{product.name}</h2>
          <p className="text-sm drop-shadow">{product.shortDesc}</p>
        </div>
      </div>
    </div>
  );
}
