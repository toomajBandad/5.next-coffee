import PageTitle from "@/components/modules/pageTitle/PageTitle";
import React from "react";

function ArticlePage({ article }) {
  return (
    <section className="px-4 md:px-12 py-8">
      {/* Page Header */}
      <PageTitle title="Coffee Knowledge" subtitle="Explore the story behind every bean"/>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:px-20 px-0">
        {/* Text Content */}
        <div className="flex-1">
          {/* Article Header */}
          <header className="mb-6">
            <h1 className="text-4xl font-bold">{article.title}</h1>
            {article.subtitle && (
              <p className="text-gray-500 mt-2 text-lg">{article.subtitle}</p>
            )}
            <div className="text-sm text-gray-400 mt-2">
              <span>{article.author}</span> ·{" "}
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
          </header>

          {/* Content */}
          <article
            className="prose prose-lg max-w-none"
            data-aos="fade-up"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-6 flex gap-2 flex-wrap">
            {article.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm hover:opacity-80 transition"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Box */}
          <div className="mt-12 border-t pt-6">
            <p className="text-sm text-gray-500">Written by</p>
            <h3 className="text-lg font-semibold">{article.author}</h3>
          </div>
        </div>

        {/* Image */}
        {article.image && (
          <div className="w-full lg:w-[40%] h-64 lg:h-[500px] overflow-hidden rounded-lg shadow-sm">
            <img
              src={article.image}
              alt={`Image for article: ${article.title}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default ArticlePage;
