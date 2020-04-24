import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import { Props } from "../components/Layout";

export const getStaticProps: GetStaticProps<Props> = async () => {
  const folder = fs.readdirSync(path.resolve(process.cwd(), "./pages"));

  const menuItems = folder
    .filter((file) => !/^_/.test(file))
    .filter((file) => !["welcome.tsx", "index.tsx"].includes(file))
    .map((file) => {
      const title = file.split(".")[0];
      return {
        title,
        url: `/${title}`,
      };
    });

  return {
    props: {
      menuItems: [{ title: "Home", url: "/" }, ...menuItems],
    },
  };
};
