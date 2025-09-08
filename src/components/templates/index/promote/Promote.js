import FotoTextBox from "@/components/modules/fotoTextBox/FotoTextBox";
import React from "react";

function Promote() {
  return (
    <div className="w-full bg-gray-800 my-5">
      <FotoTextBox
        reverse={false}
        title="Why Our Coffee?"
        text="Our beans are handpicked from the lush highlands of Colombia and the deep forests of Brazil, where nature crafts flavor like no machine ever could. Every cup is a tribute to the land, the farmers, and the passion that fuels our process."
        btn="Explore More"
      />

      <FotoTextBox
        reverse={true}
        title="Really Love Coffee?"
        text="We’d love to hear your story. Whether you're a casual sipper or a devoted connoisseur, our blends are crafted to connect people through taste. Come visit us, share your passion, and discover a community that celebrates coffee like you do."
        btn="Explore More"
      />
    </div>
  );
}

export default Promote;
