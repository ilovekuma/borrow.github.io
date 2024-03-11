import React, { useState, useEffect } from 'react';
import { EditOutlined, AppstoreOutlined, HomeOutlined, InfoCircleOutlined, UserOutlined, ApiOutlined } from '@ant-design/icons';
import { Tag, Spin, Table, Tooltip, Button, Drawer, Layout, Flex, Card, Col, Input, Row, Steps, Switch, message, Modal } from 'antd';
import axios from "axios";
import { Routes, Route, Link } from 'react-router-dom'

const submitURL = "https://25eadr7ui5.execute-api.ap-southeast-2.amazonaws.com/STG/register_item";
const tableURL = "https://25eadr7ui5.execute-api.ap-southeast-2.amazonaws.com/STG/getRegister";

const item_list = [
  'tablet1','tablet2','tablet3','tablet4','tablet5','tablet6',
  'stylusA','stylusB','stylusC',
  'adapter1','adapter2','adapter3',
];
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

function refreshPage() {
  window.location.reload(false);
}

export const ScheduleTable = () => {

  const [loading, setLoading] = React.useState(true);

  const [carRegData, setCarRegData] = useState(
    [
      {
        lesson: '1',
        sunday_list: [],
        monday_list: [],
        tuesday_list: [],
        thursday_list: [],
        friday_list: []
      },
      {
        lesson: '2',
        sunday_list: [],
        monday_list: [],
        tuesday_list: [],
        thursday_list: [],
        friday_list: []
      },
      {
        lesson: '3',
        sunday_list: [],
        monday_list: [],
        tuesday_list: [],
        thursday_list: [],
        friday_list: []
  
      },
      {
        lesson: '4',
        sunday_list: [],
        monday_list: [],
        tuesday_list: [],
        thursday_list: [],
        friday_list: []
  
      },
      {
        lesson: '午',
        sunday_list: [],
        monday_list: [],
        tuesday_list: [],
        thursday_list: [],
        friday_list: []
  
      },
      {
        lesson: '6',
        sunday_list: [],
        monday_list: [],
        tuesday_list: [],
        thursday_list: [],
        friday_list: []
  
      },
      {
        lesson: '7',
        sunday_list: [],
        monday_list: [],
        tuesday_list: [],
        thursday_list: [],
        friday_list: []
  
      },
      {
        lesson: '8',
        sunday_list: [],
        monday_list: [],
        tuesday_list: [],
        thursday_list: [],
        friday_list: []
  
      },
    ]
  );

  useEffect(() => {
    axios.post(tableURL, {
      notHtml: true,
    })
    .then(function (response) {
      // console.log(response);
      setLoading(false);
      setCarRegData(response.data.body);

    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);


  const colorMap = (name, idx) => {
    let color = 'lime';
    if (name.includes("A車")){
      color = 'geekblue';
    }
    if (name.includes("B車")){
      color = 'volcano';
    }
    if (name.includes("C車")){
      color = 'purple';
    }
    if (name.includes("D車")){
      color = 'gold';
    }
    if (name.includes("E車")){
      color = 'cyan';
    }
    if (name.includes("F車")){
      color = 'green';
    }
    return (
      <Tag color={color} key={idx}>
        {name.toUpperCase()}
      </Tag>
    );
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'lesson',
      key: 'lesson',
    },
    {
      title: '一',
      dataIndex: 'sunday',
      key: 'sunday',
      render: (_, { sunday_list }) => (
        <>
          {sunday_list.map((name, index) => <div key={index}>{colorMap(name, index)}</div>)}
        </>
      ),
    },
    {
      title: '二',
      dataIndex: 'monday',
      key: 'monday',
      render: (_, { monday_list }) => (
        <>
          {monday_list.map((name, index) => <div key={index}>{colorMap(name, index)}</div>)}
        </>
      ),
    },
    {
      title: '三',
      dataIndex: 'tuesday',
      key: 'tuesday',
      render: (_, { tuesday_list }) => (
        <>
          {tuesday_list.map((name, index) => <div key={index}>{colorMap(name, index)}</div>)}
        </>
      ),
    },
    {
      title: '四',
      key: 'thursday',
      dataIndex: 'thursday',
      render: (_, { thursday_list }) => (
        <>
          {thursday_list.map((name, index) => <div key={index}>{colorMap(name, index)}</div>)}
        </>
      ),
    },
    {
      title: '五',
      key: 'friday',
      dataIndex: 'friday',
      render: (_, { friday_list }) => (
        <>
          {friday_list.map((name, index) => <div key={index}>{colorMap(name, index)}</div>)}
        </>
      ),
    },
  ];
  
  return (
    <>
    <Spin spinning={loading} delay={200} size="large">
      <Table columns={columns} dataSource={carRegData} /> 
    </Spin>
    </>
  );
};


export const RegistryTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnItem, setReturnItem] = useState("");

  const showReturnModal = () => {
    setIsModalOpen(true);
  };

  const handleReturn = () => {
    setIsModalOpen(false);

    console.log(`return item:`, returnItem);
    let currentStatus = { ...itemControl }
    axios.post(submitURL, {
      TXType: 'return_item',
      currentStatus: currentStatus,
      returnItem: returnItem,
    })
    .then(function (response) {
      refreshPage()
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const handleReturnCancel = () => {
    setIsModalOpen(false);
  };

  // Drawer 
  const [open, setOpen] = useState(false);

  const showDrawer = (item) => {
    if (itemControl[item][2] === '可借用'){

      let currentStatus = { ...itemControl }
      var i = 0
      for (; i < item_list.length; i++) {
        var item_name = item_list[i];
        if (item === item_name){
          console.log(`item (true): `, item)
          currentStatus[item_name][0] = true;
        } else{
          currentStatus[item_name][0] = false;
        }
      }
      setItemControl(currentStatus);
      setOpen(true);
    }
    else{
      setReturnItem(item);
      showReturnModal();
    }
    
  };
  const drawerClose = () => {
    setOpen(false);
  };


  // control item status
  const [regName, setName] = useState("");
  const [submitReturn, setSubmitReturn] = useState(null);

  // message
  const [msg, msgHolder] = message.useMessage();
  
  // submit borrow
  const submitRegistry = () => {
    if (regName === ""){
      console.log("no name.")
      msg.open({
        type: 'warning',
        content: '請輸入姓名!',
      });
      return 
    }

    var submit_payload = {'username': regName}
    var i = 0
    for (; i < item_list.length; i++) {
      var item_name = item_list[i]
      if (itemControl[item_name][0] === true){
        // regiter this item
        submit_payload[item_name] = true;
      }
      else if (itemControl[item_name][2] !== '可借用') {
        // others
        submit_payload[item_name] = itemControl[item_name][2];
      }
      else {
        // AVAL
        submit_payload[item_name] = false;
      }
    }
    console.log(`click submit,`, submit_payload);
    submit_payload['TXType'] = 'borrow_item';
    axios.post(submitURL, submit_payload)
    .then(function (response) {
      console.log(response);

      refreshPage();

    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  const [itemControl, setItemControl] = useState({
    // 0 => borrow
    // 1 => background color in button
    // 2 => text in button
    // 3 => switch disable
    'tablet1': [false, null, '可借用', false],
    'tablet2': [false, null, '可借用', false],
    'tablet3': [false, null, '可借用', false],
    'tablet4': [false, null, '可借用', false],
    'tablet5': [false, null, '可借用', false],
    'tablet6': [false, null, '可借用', false],
    'stylusA': [false, null, '可借用', false],
    'stylusB': [false, null, '可借用', false],
    'stylusC': [false, null, '可借用', false],
    'adapter1': [false, null, '可借用', false],
    'adapter2': [false, null, '可借用', false],
    'adapter3': [false, null, '可借用', false],
  });

  const changeItem = (item) => {
    let currentStatus = { ...itemControl }
    var i = 0

    for (; i < item_list.length; i++) {
      var item_name = item_list[i]
      if (item === item_name){
        if (currentStatus[item][0] === true){
          currentStatus[item][0] = false;
        }
        else {
          currentStatus[item][0] = true;
        }
        console.log(`item to: `, item, currentStatus[item][0]);
      }
    }
    setItemControl(currentStatus);
  };

  // get the status from server
  useEffect(() => {
    axios.post(submitURL, {
      TXType: 'query_status',
    })
    .then(function (response) {
      // console.log(response);

      let currentStatus = { ...itemControl }

      var response_body = JSON.parse(response.data.body);
      console.log(`response_body: `, response_body);
      var i = 0

      for (; i < item_list.length; i++) {
        var item_name = item_list[i];
        var item_owner = response_body[item_name]; // name or AVAL
        
        var bg_color = null;
        var switch_disable = false;
        if (item_owner !== '可借用'){
          bg_color = "#FFE5CC";
          switch_disable = true;
        }
        currentStatus[item_name] = [false, bg_color, item_owner, switch_disable];
      }

      setItemControl(currentStatus);

    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  return (
    <>
      <Modal 
        title="請問是否確定歸還?" 
        open={isModalOpen} 
        onOk={handleReturn} 
        onCancel={handleReturnCancel}
        okText="是"
        cancelText="否">
      </Modal>

      {msgHolder}
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
                <Switch size="small" onClick={()=>changeItem('tablet1')} disabled={itemControl['tablet1'][3]} checked={itemControl['tablet1'][0]} />
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                2
                <Switch size="small" onClick={()=>changeItem('tablet2')} disabled={itemControl['tablet2'][3]} checked={itemControl['tablet2'][0]} />
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                3
                <Switch size="small" onClick={()=>changeItem('tablet3')} disabled={itemControl['tablet3'][3]} checked={itemControl['tablet3'][0]} />
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
                <Switch size="small" onClick={()=>changeItem('tablet4')} disabled={itemControl['tablet4'][3]} checked={itemControl['tablet4'][0]} />
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                5
                <Switch size="small" onClick={()=>changeItem('tablet5')} disabled={itemControl['tablet5'][3]} checked={itemControl['tablet5'][0]} />
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                6
                <Switch size="small" onClick={()=>changeItem('tablet6')} disabled={itemControl['tablet6'][3]} checked={itemControl['tablet6'][0]} />
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
                <Switch size="small" onClick={()=>changeItem('stylusA')} disabled={itemControl['stylusA'][3]} checked={itemControl['stylusA'][0]} />
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                B
                <Switch size="small" onClick={()=>changeItem('stylusB')} disabled={itemControl['stylusB'][3]} checked={itemControl['stylusB'][0]} />
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                C
                <Switch size="small" onClick={()=>changeItem('stylusC')} disabled={itemControl['stylusC'][3]} checked={itemControl['stylusC'][0]} />
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
                <Switch size="small" onClick={()=>changeItem('adapter1')} disabled={itemControl['adapter1'][3]} checked={itemControl['adapter1'][0]}/>
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                2
                <Switch size="small" onClick={()=>changeItem('adapter2')} disabled={itemControl['adapter2'][3]} checked={itemControl['adapter2'][0]}/>
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={itemStyle}>
                3
                <Switch size="small" onClick={()=>changeItem('adapter3')} disabled={itemControl['adapter3'][3]} checked={itemControl['adapter3'][0]}/>
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
 
          <Layout>
            <Content>

              <Card style={cardStyle}>
                <p className="card-text">即日起<b><font color="#FF0000">平板車鑰匙借用不需登記</font></b>，於校網確實登記借用平板車即可。一師一平板專案請洽施咅均，感謝。</p>

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
                      <Button type="dashed" icon={<AppstoreOutlined />} style={{ background: itemControl['tablet1'][1]}} onClick={()=>showDrawer('tablet1')} block>
                      1 {itemControl['tablet1'][2]}
                      </Button>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      <Button type="dashed" icon={<AppstoreOutlined />} style={{ background: itemControl['tablet2'][1]}} onClick={()=>showDrawer('tablet2')} block>
                      2 {itemControl['tablet2'][2]}
                      </Button>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      <Button type="dashed" icon={<AppstoreOutlined />} style={{ background: itemControl['tablet3'][1]}} onClick={()=>showDrawer('tablet3')} block>
                      3 {itemControl['tablet3'][2]}
                      </Button>
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
                      <Button type="dashed" icon={<AppstoreOutlined />} style={{ background: itemControl['tablet4'][1]}} onClick={()=>showDrawer('tablet4')} block>
                      4 {itemControl['tablet4'][2]}
                      </Button>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      <Button type="dashed" icon={<AppstoreOutlined />} style={{ background: itemControl['tablet5'][1]}} onClick={()=>showDrawer('tablet5')} block>
                      5 {itemControl['tablet5'][2]}
                      </Button>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      <Button type="dashed" icon={<AppstoreOutlined />} style={{ background: itemControl['tablet6'][1]}} onClick={()=>showDrawer('tablet6')} block>
                      6 {itemControl['tablet6'][2]}
                      </Button>
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
                      <Button type="dashed" icon={<EditOutlined />} style={{ background: itemControl['stylusA'][1]}} onClick={()=>showDrawer('stylusA')} block>
                      A {itemControl['stylusA'][2]}
                      </Button>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      <Button type="dashed" icon={<EditOutlined />} style={{ background: itemControl['stylusB'][1]}} onClick={()=>showDrawer('stylusB')} block>
                      B {itemControl['stylusB'][2]}
                      </Button>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      <Button type="dashed" icon={<EditOutlined />} style={{ background: itemControl['stylusC'][1]}} onClick={()=>showDrawer('stylusC')} block>
                      C {itemControl['stylusC'][2]}
                      </Button>
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
                      <Button type="dashed" icon={<ApiOutlined />} style={{ background: itemControl['adapter1'][1]}} onClick={()=>showDrawer('adapter1')} block>
                      1 {itemControl['adapter1'][2]}
                      </Button>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      <Button type="dashed" icon={<ApiOutlined />} style={{ background: itemControl['adapter2'][1]}} onClick={()=>showDrawer('adapter2')} block>
                      2 {itemControl['adapter2'][2]}
                      </Button>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <div style={itemStyle}>
                      <Button type="dashed" icon={<ApiOutlined />} style={{ background: itemControl['adapter3'][1]}} onClick={()=>showDrawer('adapter3')} block>
                      3 {itemControl['adapter3'][2]}
                      </Button>
                    </div>
                  </Col>
                </Row>

              </Card>
            </Content>

          </Layout>

      </Flex>

    </>
  );
};

class About extends React.Component {
  render () {
    return (<h1>About</h1>);
  }
}

function App() {
  return (
      <div className='App'>

      </div>
  )
}

export default App;