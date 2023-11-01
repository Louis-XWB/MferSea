import React, { useState } from "react";
import "../index.css";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Divider, Image, Layout, Menu, Space, theme } from "antd";
import Home from "./Home";

import { Routes, Route, Outlet, Link } from "react-router-dom";
import Connect from "./Connect";
import ConnectIpfs from "./ConnectIpfs";
import styles from "./TopLayout.module.css";
import Personal from "./Personal";
import NftMarket from "./NftMarket";

const { Header, Content, Sider } = Layout;
const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

type Props = {
  children: JSX.Element;
};

export default function TopLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [current, setCurrent] = useState("home");

  function getMenuItem() {}

  return (
    <Layout>
      <Header className={`header ${styles.top_header}`}>
        <div className={styles.logo}>
          <Link to="/" onClick={() => setCurrent("home")}>
            <Image src="/logo_nft.png" width={50} preview={false}></Image>
          </Link>
          <Space />
          <Link to="/" onClick={() => setCurrent("home")}>
            <span
              style={{
                fontSize: "23px",
                fontWeight: "bold",
                color: "white",
                marginLeft: "10px",
                marginRight: "30px",
              }}
            >
              MferSea
            </span>
          </Link>
          <Divider type="vertical" />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          style={{ fontSize: "16px", marginLeft: "20px" }}
          className={styles.custom_selected_style}
          onClick={(e) => {
            setCurrent(e.key);
            console.log("---onClick------" + current);
          }}
        >
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="market">
            <Link to="/nft-market">NFT Market</Link>
          </Menu.Item>

          <Menu.Item key="me">
            <Link to="/personal">Profile</Link>
          </Menu.Item>

          <Menu.Item key="connect">
            <Connect />
          </Menu.Item>
          <Menu.Item key="ConnectIpfs">{/* <ConnectIpfs /> */}</Menu.Item>
        </Menu>
      </Header>
      <div>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/nft-market/*" element={<NftMarket />} />
          <Route path="/personal/*" element={<Personal />} />
        </Routes>
      </div>
    </Layout>
  );
}
