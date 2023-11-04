import React from "react";
import "../index.css";
import {
  PoundOutlined,
  NotificationOutlined,
  FileOutlined,
  EditOutlined,
  FolderViewOutlined,
  BookOutlined,
  PropertySafetyOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Divider } from "antd";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import NftMintor from "./personal-comp/NftMintor";
import MyNft from "./personal-comp/MyNft";
import ArticleViewer from "./personal-comp/browser/ArticleViewer";
import ArticleEditor from "./personal-comp/ArticleEditor";
import ArticleList from "./personal-comp/ArticleList";
import ArticleScratch from "./personal-comp/ArticleScratch";

const { Header, Content, Sider } = Layout;

const items2: MenuProps["items"] = [
  {
    key: "0",
    icon: React.createElement(BookOutlined),
    label: "article",
    children: [
      {
        key: "1",
        icon: React.createElement(EditOutlined),
        label: "write",
      },
      {
        key: "2",
        icon: React.createElement(FolderViewOutlined),
        label: "browse",
      },
    ],
  },
  {
    key: "10",
    icon: React.createElement(PoundOutlined),
    label: "collectables",
    children: [
      {
        key: "11",
        icon: React.createElement(PropertySafetyOutlined),
        label: "mint",
      },
      {
        key: "12",
        icon: React.createElement(FolderViewOutlined),
        label: "browse",
      },
    ],
  },
];

export default function Personal() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={200}
        style={{ background: colorBgContainer }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["Collections", "Articles"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.SubMenu title="Collections" key={"Collections"}>
            <Menu.Item icon={React.createElement(PoundOutlined)}>
              <Link to="collectible-mint">Mint NFTs</Link>
            </Menu.Item>
            <Menu.Item icon={React.createElement(PropertySafetyOutlined)}>
              <Link to="collectible-browse">Browse NFTs</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="Articles" key={"Articles"}>
            <Menu.Item icon={React.createElement(EditOutlined)}>
              <Link to="article-write">Write Article</Link>
            </Menu.Item>
            <Menu.Item icon={React.createElement(FileOutlined)}>
              <Link to="article-scratch">Drafts</Link>
            </Menu.Item>
            <Menu.Item icon={React.createElement(FolderViewOutlined)}>
              <Link to="article-browse">Browse Articles</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 12px", background: colorBgContainer }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Content
          style={{
            padding: 24,
            // margin: "100vh",
          }}
        >
          <Routes>
            <Route path="article-read" element={<ArticleViewer />} />
            <Route path="article-write" element={<ArticleEditor />} />
            <Route path="article-scratch" element={<ArticleScratch />} />
            <Route path="article-browse" element={<ArticleList />} />
            <Route path="collectible-mint" element={<NftMintor />} />
            <Route path="collectible-browse" element={<MyNft />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}
