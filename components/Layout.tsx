import { FC } from "react";
import { Layout as AntLayout, Menu } from "antd";
import Link from "next/link";

const { Content, Sider } = AntLayout;

const SideMenu = () => {
  return (
    <Sider style={{ background: "#fff" }}>
      <Menu mode="vertical-left" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/box">
            <a>Three.js - Box</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/basic">
            <a>Babylon.js - Basic</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

const Layout: FC<{}> = ({ children }) => {
  return (
    <>
      <AntLayout>
        <SideMenu />
        <Content>{children}</Content>
      </AntLayout>
    </>
  );
};

export default Layout;
