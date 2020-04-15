import { FC } from "react";
import { Layout as AntLayout, Menu, Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import Github from "./Github";
import Utterances from "./Utterances";

const { Content, Sider } = AntLayout;

const menuItems = [
  { title: "Home", url: "/" },
  { title: "Three.js - Box", url: "/box" },
];

const SideMenu = () => {
  const { pathname } = useRouter();
  const pathIndex = menuItems.findIndex(({ url }) => url === pathname) || 0;

  return (
    <Sider style={{ background: "#fff" }} width={360}>
      <Menu mode="vertical-left" defaultSelectedKeys={[pathIndex.toString(10)]}>
        {menuItems.map((item, key) => {
          return (
            <Menu.Item key={key}>
              <Link href={item.url}>
                <a>{item.title}</a>
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>

      <Divider />

      <Utterances location={{ pathname }} />
    </Sider>
  );
};

const Layout: FC<{}> = ({ children }) => {
  return (
    <>
      <AntLayout>
        <SideMenu />
        <Content>{children}</Content>
        <Github />
      </AntLayout>
    </>
  );
};

export default Layout;
