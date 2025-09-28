import FotoTextBox from "@/components/modules/fotoTextBox/FotoTextBox";
import React from "react";

function Promote() {
  return (
    <div className="w-full bg-gray-900">
      <FotoTextBox
        reverse={false}
        title="Crafted by Nature, Perfected by Passion"
        text="Our beans are handpicked from Colombia’s misty highlands and Brazil’s deep forests—where soil, sun, and soul converge. Each cup honors the land, the farmers, and the artistry behind every roast."
        btn="Explore More"
        image="/images/cards/2.jpg"
      />

      <FotoTextBox
        reverse={true}
        title="Your Story Belongs Here"
        text="Whether you're a casual sipper or a devoted connoisseur, our blends are crafted to spark connection. Visit us, share your journey, and discover a community that celebrates coffee like you do."
        btn="Explore More"
        image="/images/cards/1.jpg"
      />
    </div>
  );
}

export default Promote;
