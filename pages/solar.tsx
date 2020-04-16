import dynamic from "next/dynamic";
import Layout from "../components/Layout";

const Solar = dynamic(() => import("../playgrounds/solar"));

export default () => (
  <Layout>
    <Solar />
  </Layout>
);
