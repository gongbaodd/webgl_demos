import React from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";

const Playground = dynamic(() => import("../components/BabylonPlayground"), {
  ssr: false,
});

const DefaultPlayground = () => (
  <Layout>
    <Playground />
  </Layout>
);

export default DefaultPlayground;
