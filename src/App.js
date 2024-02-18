import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, HomeOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Tooltip, Button, Drawer, Layout, Flex, Card, Col, Input, Row, Steps, Switch  } from 'antd';
import axios from "axios";

const submitURL = "https://jsonplaceholder.typicode.com/posts/1";

const itemStyle = {
  //background: '#0092ff',
  padding: '8px 0',
};
const { Sider, Content } = Layout;


const layoutStyle = {
  borderRadius: 8,
  // overflow: 'hidden',
  // backgroundColor: '#4096ff',
  width: 'calc(100% - 2px)',
  maxWidth: 'calc(100% - 2px)',
};

const cardStyle = {
  borderRadius: 16,
  overflow: 'hidden',
  width: 'calc(100% - 2px)',
  maxWidth: 'calc(100% - 2px)',
};

const menuItems = [
  {
    label: '借用/歸還登記表',
    key: 'register',
    icon: <HomeOutlined />,
  },
  {
    label: '借用紀錄',
    key: 'history',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
];


const App = () => {

  // Menu
  const [current, setCurrent] = useState('register');
  const menuClick = (e) => {
    console.log('menu click ', e);
    setCurrent(e.key);
  };

  // Drawer 
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const drawerClose = () => {
    setOpen(false);
  };

  // step
  const description = 'This is a description.';

  //
  const [regName, setName] = useState("");
  const [tablet1, setTablet1] = useState(false);
  const [tablet2, setTablet2] = useState(false);
  const [tablet3, setTablet3] = useState(false);
  const [tablet4, setTablet4] = useState(false);
  const [tablet5, setTablet5] = useState(false);
  const [tablet6, setTablet6] = useState(false);
  const [stylusA, setStylusA] = useState(false);
  const [stylusB, setStylusB] = useState(false);
  const [stylusC, setStylusC] = useState(false);
  const [adapter1, setAdapter1] = useState(false);
  const [adapter2, setAdapter2] = useState(false);
  const [adapter3, setAdapter3] = useState(false);
  const changeTablet1 = () => {
    setTablet1(!tablet1);
  };
  const changeTablet2 = () => {
    setTablet2(!tablet2);
  };
  const changeTablet3 = () => {
    setTablet3(!tablet3);
  };
  const changeTablet4 = () => {
    setTablet4(!tablet4);
  };
  const changeTablet5 = () => {
    setTablet5(!tablet5);
  };
  const changeTablet6 = () => {
    setTablet6(!tablet6);
  };
  const changeStylusA = () => {
    setStylusA(!stylusA);
  };
  const changeStylusB = () => {
    setStylusB(!stylusB);
  };
  const changeStylusC = () => {
    setStylusC(!stylusC);
  };
  const changeAdapter1 = () => {
    setAdapter1(!adapter1);
  };
  const changeAdapter2 = () => {
    setAdapter2(!adapter2);
  };
  const changeAdapter3 = () => {
    setAdapter3(!adapter3);
  };
  const [submitReturn, setSubmitReturn] = useState(null);
  // React.useEffect(() => {
  //   axios.get(baseURL).then((response) => {
  //     setSubmitReturn(response.data);
  //   });
  // }, []);

  // if (!submitReturn) return null;
  const submitRegistry = () => {
    const data = {
      'username': regName,
      'tablet1': tablet1,
      'tablet2': tablet2,
      'tablet3': tablet3,
      'tablet4': tablet4,
      'tablet5': tablet5,
      'tablet6': tablet6,
      'stylusA': stylusA,
      'stylusB': stylusB,
      'stylusC': stylusC,
      'adapter1': adapter1,
      'adapter2': adapter2,
      'adapter3': adapter3,
    }
    console.log(`click submit,`, data);

    axios.get(submitURL).then((response) => {
      setSubmitReturn(response.data);

      console.log(submitReturn.title)
    });
    
  };

  return (
    <>
      <Menu onClick={menuClick} selectedKeys={[current]} mode="horizontal" items={menuItems} />

      <Drawer title="借用器材" onClose={drawerClose} open={open}>

        <Card
          title="教師短期借用平板(1~6)"
          size="small"
          // extra={<a href="#">More</a>}
          style={cardStyle}
        >
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                1
                <Switch size="small" onClick={changeTablet1} checked={tablet1}/>
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                2
                <Switch size="small" onClick={changeTablet2} checked={tablet2}/>
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                3
                <Switch size="small" onClick={changeTablet3} checked={tablet3}/>
              </div>
            </Col>
          </Row>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                4
                <Switch size="small" onClick={changeTablet4} checked={tablet4}/>
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                5
                <Switch size="small" onClick={changeTablet5} checked={tablet5}/>
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                6
                <Switch size="small" onClick={changeTablet6} checked={tablet6}/>
              </div>
            </Col>
          </Row>

        </Card>

        <Card
          title="觸控筆(A,B,C)"
          size="small"
          // extra={<a href="#">More</a>}
          style={cardStyle}
        >
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                A
                <Switch size="small" onClick={changeStylusA} checked={stylusA}/>
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                B
                <Switch size="small" onClick={changeStylusB} checked={stylusB}/>
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                C
                <Switch size="small" onClick={changeStylusC} checked={stylusC}/>
              </div>
            </Col>
          </Row>

        </Card>
      
        <Card
          title="轉接頭 (1~3)"
          size="small"
          // extra={<a href="#">More</a>}
          style={cardStyle}
        >
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                1
                <Switch size="small" onClick={changeAdapter1} checked={adapter1}/>
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                2
                <Switch size="small" onClick={changeAdapter2} checked={adapter2}/>
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                3
                <Switch size="small" onClick={changeAdapter3} checked={adapter3}/>
              </div>
            </Col>
          </Row>

        </Card>

        <Card style={cardStyle}>
          <Input
            placeholder="Enter your name"
            onChange={(event) =>
              setName(event.target.value)
            }
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="請輸入借用者姓名">
                <InfoCircleOutlined
                  style={{
                    color: 'rgba(0,0,0,.45)',
                  }}
                />
              </Tooltip>
            }
          />

          <Button type="dashed" onClick={submitRegistry}>
            Submit
          </Button>

      </Card>
        
      </Drawer>
      
      <div><br></br></div>

      <Flex gap="middle" wrap="wrap">
 
        <Layout style={layoutStyle}>
          <Sider width="35%" style={{
            backgroundColor: "#FFFFFF"
          }}>
            
            <Steps
              direction="vertical"
              current="0"
              items={[
                {
                  title: 'Step 1',
                  description,
                },
                {
                  title: 'Step 2',
                  description,
                },
                {
                  title: 'Step 3',
                  description,
                },
              ]}
            />
          </Sider>

          <Layout>
            <Content>

              <Card style={cardStyle}>
                <p class="card-text">即日起<b><font color="#FF0000">平板車鑰匙借用不需登記</font></b>，於校網確實登記借用平板車即可。一師一平板專案請洽施咅均，感謝。</p>

                <Button type="dashed" onClick={showDrawer} block>
                  借用器材請點我              
                </Button>

              </Card>
            </Content>
            <Content>
              <Card
                title="教師短期借用平板(1~6)"
                size="small"
                // extra={<a href="#">More</a>}
                style={cardStyle}
              >
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                  }}
                >
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      1
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      2
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      3
                    </div>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                  }}
                >
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      4
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      5
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      6
                    </div>
                  </Col>
                </Row>

              </Card>
            </Content>
            <Content>
              <Card
                title="觸控筆(A,B,C)"
                size="small"
                // extra={<a href="#">More</a>}
                style={cardStyle}
              >
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                  }}
                >
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      A
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      B
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      C
                    </div>
                  </Col>
                </Row>

              </Card>
            </Content>
            
            <Content>
              <Card
                title="轉接頭 (1~3)"
                size="small"
                // extra={<a href="#">More</a>}
                style={cardStyle}
              >
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                  }}
                >
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      1
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      2
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      3
                    </div>
                  </Col>
                </Row>

              </Card>
            </Content>

          </Layout>
        </Layout>

      </Flex>

    </>
  );
};
export default App;