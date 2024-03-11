import React,{ Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Menu } from 'antd';
import { useState, useEffect } from 'react';
import { HomeOutlined, AppstoreOutlined, CalendarOutlined } from '@ant-design/icons';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { ScheduleTable, RegistryTable } from './App';


const menuItems = [
  {
    label: '平板車借用狀態',
    key: '/tabletCart',
    icon: <CalendarOutlined />,
  },
  {
    label: '借用/歸還登記表',
    key: '/register',
    icon: <HomeOutlined />,
  },
  {
    label: '借用紀錄',
    key: '/history',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
];

const RegistryMenu = () => {
  // Menu
  const navigate = useNavigate();

  const [current, setCurrent] = useState('register');
  const menuClick = (e) => {
    console.log('menu click ', e);
    setCurrent(e.key);
    navigate(e.key);

  };

  return (
    <>
      <Menu onClick={menuClick} selectedKeys={[current]} mode="horizontal" items={menuItems} />
    </>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <RegistryMenu />

      <Routes>
        <Route path='/' element={<RegistryTable />} />
        <Route path='/register' element={<RegistryTable />} />
        <Route path='/tabletCart' element={<ScheduleTable />} />

      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();