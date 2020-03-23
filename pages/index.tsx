import dynamic from "next/dynamic";
import Layout from "../components/Layout";

const Playground = dynamic(() => import("../playgrounds/welcome"));

const Index = () => {
  return (
    <Layout>
      <Playground />
    </Layout>
  );
};

export default Index;
