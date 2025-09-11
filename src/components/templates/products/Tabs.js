import React from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";

function Tabs() {
  return (
    <div>
      <div>3 Tabs about product with 3 titles</div>

      <Description />
      <MoreInfoes />
      <Comments />
    </div>
  );
}

export default Tabs;
