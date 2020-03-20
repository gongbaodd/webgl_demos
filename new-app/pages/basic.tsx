import React from "react";
import dynamic from "next/dynamic";

const Playground = dynamic(() => import("../components/BabylonPlayground"), {
  ssr: false,
});

const DefaultPlayground = () => (
  <div className="row">
    <div className="col-xs-12 col-md-6">
      <Playground />
    </div>
  </div>
);

export default DefaultPlayground;
