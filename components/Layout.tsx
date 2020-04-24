import { FC } from "react";
import { Layout as AntLayout, Menu, Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import Github from "./Github";
import Utterances from "./Utterances";

export interface Props {
  menuItems: { title: string; url: string }[];
}

const { Content, Sider } = AntLayout;

const SideMenu: FC<{ menuItems?: Props["menuItems"] }> = ({ menuItems }) => {
  const menu = menuItems || [];
  const { pathname } = useRouter();
  const pathIndex = menu.findIndex(({ url }) => url === pathname) || 0;

  return (
    <Sider style={{ background: "#fff" }} width={360}>
      <Menu mode="vertical-left" defaultSelectedKeys={[pathIndex.toString(10)]}>
        {menu.map((item, key) => {
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

const Layout: FC<Props> = ({ children, menuItems }) => {
  return (
    <>
      <AntLayout>
        <SideMenu menuItems={menuItems} />
        <Content>{children}</Content>
        <Github />
      </AntLayout>
    </>
  );
};

export default Layout;
