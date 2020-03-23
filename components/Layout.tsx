import { FC, useState } from "react";
import { Layout as AntLayout, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const { Content, Sider } = AntLayout;

const menuItems = [
  { title: "Home", url: "/" },
  { title: "Three.js - Box", url: "/box" },
  { title: "Babylon.js - Basic", url: "/basic" },
];

const SideMenu = () => {
  const { pathname } = useRouter();
  const pathIndex = menuItems.findIndex(({ url }) => url === pathname) || 0;

  return (
    <Sider style={{ background: "#fff" }}>
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
