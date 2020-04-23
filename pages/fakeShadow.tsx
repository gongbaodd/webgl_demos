import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { getStaticProps } from "../server/getMenu";

const FakeShadow = dynamic(() => import("../playgrounds/fakeShadow"));

export default ({ menuItems }) => (
  <Layout menuItems={menuItems}>
    <FakeShadow />
  </Layout>
);

export { getStaticProps };
