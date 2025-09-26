"use client";
import React from "react";
import Image from "next/image";
import fallbackImage from "@images/cards/3.jpg";
import Link from "next/link";

function ArticleCard({ article, onEdit, onDelete }) {
  return (
    <Link
      href={`./articles/${article._id}`}
      className="bg-white shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:scale-103 hover:shadow-lg"
    >
      <div className="relative w-full h-52 sm:h-44 md:h-40 lg:h-36">
        <Image
          src={article?.image || fallbackImage}
          alt={article?.title || "Article Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
          {article?.title}
        </h3>
        {article?.subtitle && (
          <p className="text-sm text-gray-600 line-clamp-1">
            {article.subtitle}
          </p>
        )}
        <div className="text-xs text-gray-500">
          By <span className="font-medium">{article?.author}</span> •{" "}
          {new Date(article?.createdAt).toLocaleDateString()}
        </div>
        {article?.tags?.length > 0 && (
          <div className="text-xs text-blue-600 font-medium">
            {article.tags.join(", ")}
          </div>
        )}

        {/* Action Buttons */}
        {onEdit && onDelete && (
          <div className="flex justify-end gap-2 mt-3">
            <button
              className="bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-gray-700"
              onClick={(e) => onEdit?.(e,article)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-500"
              onClick={(e) => onDelete?.(e,article)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}

export default ArticleCard;
