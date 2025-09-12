import React from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";

function Tabs({ product }) {
  return (
    <div>
      <div>3 Tabs about product with 3 titles</div>

      <Description />
      <MoreInfoes />
      <Comments comments={JSON.parse(JSON.stringify(product.comments))} />
    </div>
  );
}

export default Tabs;
