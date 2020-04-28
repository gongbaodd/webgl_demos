import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { getStaticProps } from "../server/getMenu";

const Cannon = dynamic(() => import("../playgrounds/cannon"));

export default ({ menuItems }) => (
  <Layout menuItems={menuItems}>
    <Cannon />
  </Layout>
);

export { getStaticProps };
