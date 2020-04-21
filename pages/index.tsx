import dynamic from "next/dynamic";
import Layout, { Props } from "../components/Layout";
import { getStaticProps } from "../server/getMenu";
import { FC } from "react";

const Playground = dynamic(() => import("../playgrounds/welcome"));

const Index: FC<Props> = ({ menuItems }) => {
  return (
    <Layout menuItems={menuItems}>
      <Playground />
    </Layout>
  );
};

export default Index;
export { getStaticProps };
