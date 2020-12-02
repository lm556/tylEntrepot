import React, { Component } from 'react'

import { Menu, Modal, Tabs, Form, Input, Button, message } from 'antd'


import { AndroidOutlined, AppleOutlined, WindowsOutlined, IeOutlined, ChromeOutlined, GithubOutlined, AliwangwangOutlined }
    from '@ant-design/icons'
import { Link } from 'react-router-dom'
import qs from 'querystring'

const { TabPane } = Tabs



export default class Nac extends Component {
    state = {
        current: '/',
        visible: false,
        username: '',
        arr: [
            {
                title: '首页',
                icons: <AndroidOutlined />,
                local: "/"
            },
            {
                title: '国内',
                icons: <AppleOutlined />,
                local: '/guonei'
            },
            {
                title: '国际',
                icons: <WindowsOutlined />,
                local: '/guoji'
            },
            {
                title: '财经',
                icons: <IeOutlined />,
                local: '/caijing'
            },
            {
                title: '军事',
                icons: <ChromeOutlined />,
                local: '/junshi'
            },
            {
                title: '科技',
                icons: <GithubOutlined />,
                local: '/keji'
            },
            {
                title: '时尚',
                icons: <AliwangwangOutlined />,
                local: '/shishang'
            }
        ]
    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
        if (e.key == 'login') {
            this.setState({
                visible: true,
            });
        }
    };
    // //对话框上的点击事件
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    callback = (key) => {
        console.log(key);
    }
    //登录
    onFinish = (values) => {
        fetch('/center/login', {
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: qs.stringify(values)
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
                if (data.code == 1) {
                    localStorage.setItem('react-user', data.username);
                    localStorage.setItem('react-token', data.token);
                    message.success(data.msg);
                    console.log(data.username);
                    this.setState({
                        visible: false,
                        username: data.username
                    })
                }
            })
    }
    onFinishFailed = (errorInfo) => {
        console.log('失败', errorInfo);
    }
    onRezFinish = (values) => {
        console.log('注册成功', values);
        fetch('/center/reg', {
            method: 'post',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: qs.stringify(values)
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
                if (data.code == 2) {
                    localStorage.setItem('react-user', data.username);
                    localStorage.setItem('react-token', data.token);
                    message.success(data.msg);
                    this.setState({
                        visible: false
                    })
                } else {
                    message.error(data.msg)
                }
            })
    }
    onRezFinishFailed = (errorInfo) => {
        console.log('注册失败', errorInfo);
    }
    componentDidMount() {
        if (sessionStorage.getItem('current'))
            this.setState({
                current: sessionStorage.getItem('current')
            })
        let token = localStorage.getItem('react-token');
        let user = localStorage.getItem('react-user');
        fetch('./center/isexp', {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                authorization: token
            },
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
                if (token === 1) {
                    this.setState({
                        username: user
                    })
                } else {
                    this.setState({
                        username: '',
                    })
                    message.info('登录失效，请重新登录')
                }
            })
    }
    //退出登录
    loginOut = (e) => {
        e.stopPropagation()
        this.setState({
            username: '',
        })
        localStorage.removeItem('react-user')
        localStorage.removeItem('react-token')

    }
    nav(local) {
        sessionStorage.setItem('current', local)
    }
    render() {
        console.log(this.setState.username);
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        const tailLayout = {
            wrapperCol: { offset: 4, span: 20 },
        };
        return (
            <div>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    {this.state.arr.map(item => <Menu.Item key={item.local} icon={item.icons}>
                        <Link to={item.local} exact onClick={this.nav.bind(this, item.local)}>{item.title}</Link>
                    </Menu.Item>)}

                    <Menu.Item key='login' style={{ float: 'right', marginRight: '20px' }}>
                        <Link exact >
                            {this.state.username ? <div>{this.state.username}<Button onClick={this.loginOut}>退出登录</Button></div> : '登录'}
                        </Link>
                    </Menu.Item>
                </Menu>

                {/* 登录对话框 */}
                <Modal
                    title="登录 注册"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="登 录" key="1">
                            <Form
                                {...layout}
                                name="login"
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                            >
                                <Form.Item
                                    label="用户名"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="密 码"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="注 册" key="2">
                            <Form
                                {...layout}
                                name="reg"
                                onFinish={this.onRezFinish}
                                onFinishFailed={this.onRezFinishFailed}
                            >
                                <Form.Item
                                    label="用户名"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="密 码"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    label="确认密码"
                                    name="password2"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        注册
                                </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>

                </Modal>
            </div >
        )
    }
}
