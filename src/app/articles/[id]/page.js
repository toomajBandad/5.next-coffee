import React from "react";
import mongoose from "mongoose";
import articleModel from "@/models/Article";
import ArticlePage from "@/components/templates/articles/ArticlePage";

const NotFoundMessage = () => (
  <div className="text-center py-20 text-gray-500">Article not found.</div>
);

export default async function Page({ params }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <NotFoundMessage />;
  }

  let article = null;
  try {
    article = await articleModel.findById(id).lean();
  } catch (error) {
    console.error("Error fetching article:", error);
  }

  if (!article) {
    return <NotFoundMessage />;
  }

  return (
    <div>
      <ArticlePage article={article} />
    </div>
  );
}