import connectToDB from "@/configs/db";
import articleModel from "@/models/Article";
import ArticleCard from "@/components/modules/articleCard/ArticleCard";
import React from "react";
import HeroTop from "@/components/modules/heroTop/HeroTop";
import Navbar from "@/components/modules/navbar/Navbar";

export default async function ArticlesPage() {
  await connectToDB();
  const articles = await articleModel.find({});

  return (
    <div>
      <Navbar />
      <HeroTop route="articles" bg="/images/about/about3.jpg" />
      {/* Header */}
      <div className="px-6 py-10 max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-semibold text-gray-900">Articles</h1>
          <p className="text-gray-500 mt-2">
            Insights, guides, and coffee stories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              article={JSON.parse(JSON.stringify(article))}
              onEdit={null}
              onDelete={null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
