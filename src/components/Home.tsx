import React from "react";
import "../index.css";

import { EditOutlined, PoundOutlined, UserOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  ConfigProvider,
  Divider,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import ArticleBrowser from "./home-comp/ArticleBrowser";
import MarketBrowser from "./home-comp/MarketBrowser";
import StarBrowser from "./home-comp/StarBrowser";
import HomeBrowser from "./home-comp/HomeBrowser";
import { SpaceContext } from "antd/es/space";
const { Header, Content, Sider } = Layout;

export default function Home() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            //   darkItemBg: '#100f10',
            //   colorBgBase: '#100f10',
            //   colorBgContainer: '#100f10',
            //   colorBgLayout: '#100f10',
            //   itemMarginBlock: '40px',
            //   itemHeight: 50,
            //   borderRadiusLG: 40,
            //   fontSize: 18,
            itemMarginBlock: "10px",
          },
        },
      }}
    >
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
            theme="light"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0, fontSize: "15px" }}
          >
            <Menu.Item icon={React.createElement(EditOutlined)}>
              <Link to="article">Article</Link>
            </Menu.Item>
            <Space />
            <Menu.Item icon={React.createElement(PoundOutlined)}>
              <Link to="market">Market</Link>
            </Menu.Item>
            <Menu.Item icon={React.createElement(UserOutlined)}>
              <Link to="star">KOL</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 12px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
          <Content
            style={{
              padding: 24,
              margin: 0,
              height: "100vh",
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<HomeBrowser />} index />
              <Route path="article" element={<ArticleBrowser />} />
              <Route path="market" element={<MarketBrowser />} />
              <Route path="star" element={<StarBrowser />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
