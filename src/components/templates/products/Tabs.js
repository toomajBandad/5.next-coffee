"use client"
import React, { useState } from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";

function Tabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  const tabList = [
    { key: "description", label: "Description" },
    { key: "moreInfoes", label: "More Info" },
    { key: "comments", label: "Comments" },
  ];

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      {/* Tab Titles */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.key
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white py-6 px-5 lg:px-30 rounded-lg shadow-sm w-full">
        {activeTab === "description" && <Description />}
        {activeTab === "moreInfoes" && <MoreInfoes />}
        {activeTab === "comments" && (
          <Comments comments={JSON.parse(JSON.stringify(product.comments))} />
        )}
      </div>
    </div>
  );
}

export default Tabs;
