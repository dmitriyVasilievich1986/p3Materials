import * as React from "react";
import * as style from "./style.scss";

import { Flex, Layout, message } from "antd";
import { MaterialForm, MaterialList } from "./pages/material";
import { Route, Routes } from "react-router";
import { ShadowForm, ShadowsList } from "./pages/shadow";

import { Breadcrumb } from "./components/breadcrumb";
import { Navbar } from "./components/navbar";

import classnames from "classnames/bind";

const cx = classnames.bind(style);
const { Header, Footer, Content } = Layout;

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Flex gap="middle" wrap>
      {contextHolder}
      <Layout className={cx("app-container")}>
        <Header>
          <Navbar />
        </Header>
        <Content className={cx("content-container")}>
          <Breadcrumb />
          <div className={cx("content-wrapper")}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/shadow">
                <Route index element={<ShadowsList />} />
                <Route
                  path="create"
                  element={<ShadowForm messageApi={messageApi} />}
                />
                <Route
                  path=":shadowId"
                  element={<ShadowForm messageApi={messageApi} />}
                />
              </Route>
              <Route path="/material">
                <Route index element={<MaterialList />} />
                <Route
                  path="create"
                  element={<MaterialForm messageApi={messageApi} />}
                />
                <Route
                  path=":materialId"
                  element={<MaterialForm messageApi={messageApi} />}
                />
              </Route>
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center", height: "4rem" }}>
          persona 3 Materials ©{new Date().getFullYear()} Created by
          dmitriyvasil@gmail.com
        </Footer>
      </Layout>
    </Flex>
  );
}

export default App;
