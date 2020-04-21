import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { getStaticProps } from "../server/getMenu";

const Cameras = dynamic(() => import("../playgrounds/cameras"));

export default ({ menuItems }) => (
  <Layout menuItems={menuItems}>
    <Cameras />
  </Layout>
);

export { getStaticProps };
