import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { getStaticProps } from "../server/getMenu";

const RenderTarget = dynamic(() => import("../playgrounds/renderTarget"));

export default ({ menuItems }) => (
  <Layout menuItems={menuItems}>
    <RenderTarget />
  </Layout>
);

export { getStaticProps };
