import dynamic from "next/dynamic";
import Layout from "../components/Layout";

const Cameras = dynamic(() => import("../playgrounds/cameras"));

export default () => (
  <Layout>
    <Cameras />
  </Layout>
);
