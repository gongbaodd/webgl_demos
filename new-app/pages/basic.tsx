import React from "react";
import dynamic from "next/dynamic";

const Playground = dynamic(() => import("../components/BabylonPlayground"), {
  ssr: false,
});

const DefaultPlayground = () => (
  <div>
    <Playground />
  </div>
);

export default DefaultPlayground;
