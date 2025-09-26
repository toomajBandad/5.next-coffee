import React from "react";
import articleModel from "@/models/Article";
import ArticlePage from "@/components/templates/articles/ArticlePage";
import Navbar from "@/components/modules/navbar/Navbar";

export default async function Page({ params }) {
  const { id } = await params;
  const article = await articleModel.findById(id);

  if (!article) {
    return (
      <div className="text-center py-20 text-gray-500">Article not found.</div>
    );
  }

  return (
    <div>
      <Navbar />
      <ArticlePage article={JSON.parse(JSON.stringify(article))} />
    </div>
  );
}
