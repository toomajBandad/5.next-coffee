import ArticleEdit from "@/components/templates/p-admin/ArticleEdit";
import connectToDB from "@/configs/db";
import articleModel from "@/models/Article";
import React from "react";

async function ManageArticles() {
  await connectToDB();
  const articles = await articleModel.find({}).lean();
  return (
    <div>
      <ArticleEdit articles={JSON.parse(JSON.stringify(articles))} />
    </div>
  );
}

export default ManageArticles;
