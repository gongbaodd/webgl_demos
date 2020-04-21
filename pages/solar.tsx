import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { getStaticProps } from "../server/getMenu";

const Solar = dynamic(() => import("../playgrounds/solar"));

export default ({ menuItems }) => (
  <Layout menuItems={menuItems}>
    <Solar />
  </Layout>
);

export { getStaticProps };
