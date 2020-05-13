import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { getDeployments, createDeployments, deleteDeployments } from './components/deployment/slice';
import { Button, List, Skeleton, Row, Col, Divider, Form, Radio, Input, Select } from 'antd';
import logo from './logo.svg';
import { RootState } from './store/service';
import { IDeployment } from './types/models';
import { Store } from 'antd/lib/form/interface';

// TODO: Refactor All

const cT = (distance: number) => {

  let _distance = distance;

  const _milisecond = 10, _second = _milisecond * 100, _minute = _second * 60, _hour = _minute * 60, _day = _hour * 24;

  if (distance > 0) return {
    hour: Math.floor((distance % (_day)) / (_hour)),
    minute: Math.floor((distance % (_hour)) / (_minute)),
    second: Math.floor((distance % (_minute)) / (_second)),
    milisecond: Math.floor((distance % (_second)) / _milisecond)
  }
  return { hour: 0, minute: 0, second: 0, milisecond: 0 };

}

const InternalCountDown = ({ distance, onTimerEnds }: { distance: number, onTimerEnds?: any }) => {

  const [dist, setDist] = useState(distance);

  const timer = cT(dist);

  const timerEnds = (interval: any) => {
    clearInterval(interval);
    onTimerEnds();
  }

  useEffect(() => {
    let interval: any = null;
    interval = setInterval(() => {
      setDist(dist => dist - 10);
    }, 10);
    if (dist < 0 && interval) {
      timerEnds(interval);
    }
    return () => timerEnds(interval);
  }, [dist]);

  return <div className="container">
    <h1>{timer.hour}:{timer.minute}:{timer.second}:{timer.milisecond} </h1>
  </div>


}

const InternalList = ({ list, onDelete }: { list: IDeployment[], onDelete: Function }) => {

  list = list.slice().sort((a, b) => b.deployedAt.getTime() - a.deployedAt.getTime());

  return (
    <List
      className="demo-loadmore-list"
      // loading={initLoading}
      itemLayout="horizontal"
      // loadMore={loadMore}
      dataSource={list}
      renderItem={(item: IDeployment) => (
        <List.Item
          actions={[<a key="list-loadmore-edit" onClick={() => onDelete(item.id)}>delete</a>]}
        >
          <List.Item.Meta
            title={<a href="https://ant.design">{item.templateName}</a>}
            description={"version: " + item.version}
          />
          <div>{item.url}</div>
        </List.Item>
      )}
    />
  )
}

const InternalForm = ({ onSubmitForm }: { onSubmitForm: Function }) => {

  const validateMessages = {
    required: '${label} is required!',
    types: {
      url: '${label} is not validate url!',
    }
  };

  const formIState: Partial<IDeployment> = {
    templateName: '',
    version: '',
    url: ''
  }

  const [IFState, setIFState] = useState(formIState);

  const onFormLayoutChange = (state: typeof formIState) => setIFState(state);
  const submitIForm = (data: Store) => onSubmitForm(data);

  return <Form
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 14 }}
    layout="horizontal"
    initialValues={{ templateName: '', url: '', version: '' }}
    onValuesChange={onFormLayoutChange}
    onFinish={submitIForm}
    validateMessages={validateMessages}
  >
    <Form.Item label="Templates" name="templateName" >
      <Select>
        {templates.map((template, i) => <Radio.Button key={'_temp' + i} value={template.name}>{template.name}</Radio.Button>)}
      </Select>

    </Form.Item>
    <Form.Item label="Version" name="version">
      <Select>
        {(templates.find(temp => temp.name === IFState.templateName) || { name: 'default', versions: [] }).versions
          .map((ver: string, i) => (<Select.Option value={ver} key={'_ver' + i}>{ver}</Select.Option>))}
      </Select>
    </Form.Item>
    <Form.Item label="URL" name="url" rules={[{ required: true, type: 'url' }]}>
      <Input placeholder="url goes here." />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Deploy
      </Button>
    </Form.Item>
  </Form>
}

function App() {

  const deploymentS = useSelector((state: RootState) => state.deployment)

  React.useEffect(() => {
    dispatch(getDeployments());
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="App">
      <Row justify="center">
        <Col flex="1">
          <InternalForm onSubmitForm={(ev: IDeployment) => dispatch(createDeployments(ev))} />
        </Col>
      </Row>
      <Divider orientation="right">Deployments Listed Down</Divider>
      <Row justify="center">
        <Col>
          { deploymentS.fakeTimer ? <InternalCountDown onTimerEnds={() => dispatch(getDeployments())} distance={30000} /> : null}
          <InternalList onDelete={(id: string) => dispatch(deleteDeployments(id))} list={deploymentS.deployment} />
        </Col>
      </Row>

    </div>
  );
}

export default App;


const templates = [
  {
    "name": "Natural One",
    "versions": [
      "1.0.0",
      "1.0.1",
      "1.1.0",
      "2.0.0"
    ]
  },
  {
    "name": "Techno 01",
    "versions": [
      "1.0.0",
      "1.1.1",
      "2.0.1"
    ]
  },
  {
    "name": "Sporty",
    "versions": [
      "1.0.0",
      "1.1.0",
      "1.2.0",
      "1.2.1",
      "1.3.0",
      "2.0.0"
    ]
  }
]