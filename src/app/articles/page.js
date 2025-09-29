import connectToDB from "@/configs/db";
import articleModel from "@/models/Article";
import ArticleCard from "@/components/modules/articleCard/ArticleCard";
import React from "react";
import HeroTop from "@/components/modules/heroTop/HeroTop";
import PageTitle from "@/components/modules/pageTitle/PageTitle";

export default async function ArticlesPage() {
  await connectToDB();
  const articles = await articleModel.find({});

  return (
    <div>
      <HeroTop route="articles" bg="/images/webbanners/7.jpg" />
      {/* Header */}
      <div className="px-6 py-10 max-w-7xl mx-auto">
        <PageTitle
          title="Articles"
          subtitle="Insights, guides, and coffee stories"
        />

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
