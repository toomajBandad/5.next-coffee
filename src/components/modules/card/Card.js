import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const {
    _id,
    name,
    brand,
    price,
    shortDesc,
    weight,
    type,
    origin,
    roastLevel,
    smell,
    stock,
    image,
  } = product;

  const isOutOfStock = stock <= 0;

  return (
    <div className="group relative">
      <Link href={`/products/${_id}`} className="block">
        <div
          className={`relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 ease-in-out ${
            isOutOfStock
              ? "grayscale opacity-70"
              : "hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01]"
          }`}
        >
          <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 ease-in-out"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {isOutOfStock && (
              <div className="absolute top-3 left-3 bg-black border border-white text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                Sold Out
              </div>
            )}
          </div>

          <div className="p-5 space-y-3 text-gray-900">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-light tracking-wide">{name}</h3>
              <span className="text-sm font-medium text-gray-500">{brand}</span>
            </div>

            <p className="text-sm text-gray-600 italic">{shortDesc}</p>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <span>Origin: {origin}</span>
              <span>Roast: {roastLevel}</span>
              <span>Type: {type}</span>
              <span>Smell: {smell}</span>
              <span>Weight: {weight}g</span>
              <span>Stock: {isOutOfStock ? "Unavailable" : "Available"}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-semibold text-black">€{price.toFixed(2)}</span>
              <span className="text-xs underline text-gray-500 hover:text-black">View →</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}