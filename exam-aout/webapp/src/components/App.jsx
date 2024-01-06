import React from 'react';
import { Layout, Menu } from 'antd';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import JokesPage from './Jokes/JokesPage';
import AboutPage from './About/AboutPage';
import JokePage from './Jokes/JokePage';
import { JokeContextProvider } from '../contexts/JokesContext';

const { Header, Content } = Layout;

const App = () => {
  const location = useLocation();

  return (
    <JokeContextProvider>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key="/jokes">
              <Link to="/jokes">Jokes</Link>
            </Menu.Item>
            <Menu.Item key="/about">
              <Link to="/about">About</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '30px 50px' }}>
          <p>Add your content here</p>
        </Content>
        <Routes>
          <Route path="/jokes" element={<JokesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/jokes/:id" element={<JokePage/>} />
        </Routes>
      </Layout>
    </JokeContextProvider>
  );
};

export default App;
