import React, { useState } from "react";
import { Input, Form, Button, Layout, message, Typography, Checkbox } from 'antd';

import {
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons';
import { FormattedMessage, useIntl, useModel, history } from '@umijs/max';
import styles from './index.less'
import logo from '../../../img/3.png'
import { login } from '../../../services/api'

const { Header, Content } = Layout;
const { Title } = Typography;



const Login: React.FC = () => {
    const intl = useIntl()
    const { initialState, setInitialState } = useModel("@@initialState")

    const setUserInfo = async () => {
        // const currentuser = await initialState?.fetchUserInfo?.()
        const userInfo = await initialState?.getUserInfo?.()
        await setInitialState((s)=>({
            ...s,
            userInfo: userInfo,
        }));
    }

    const onFinish = async (values: API.LoginParams) => {
        try {
            const res = await login(values);
            if (res.code === 1) {
                const defaultLoginSuccessMessage = intl.formatMessage({
                    id: 'pages.login.success',
                    defaultMessage: '登录成功！',
                });
                message.success(defaultLoginSuccessMessage);
                window.sessionStorage.setItem('token', res.data?.token ?? '')
                await setUserInfo()

                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/');
                return;
            }
        } catch (error) {
            const defaultLoginFailureMessage = intl.formatMessage({
                id: 'pages.login.failure',
                defaultMessage: '登录失败，请重试！',
            });
            console.log(error);
            message.error(defaultLoginFailureMessage);
        }
    }

    return (
        <Layout>
            <Header className={styles.LoginHeader}>
                <img src={logo} alt='' className={styles.HeaderLogo} />
                {/* <Title level={2}>SZTU </Title> */}
            </Header>
            <Content className={styles.BasicBody}>
                <div className={styles.LoginPad}>
                    <div className={styles.LoginPadIllustration} />
                    <div className={styles.LoginModule}>
                        <Title
                            level={4}
                            style={{
                                marginBottom: '30px',
                                textAlign: 'center'
                            }}
                        >账号密码登录</Title>
                        <Form
                            name="LoginForm"
                            onFinish={onFinish}
                        >

                            <Form.Item
                                name="account"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入账号'
                                    }
                                ]}
                            >
                                <Input
                                    className={styles.RadiusInput}
                                    size="large"
                                    prefix={<UserOutlined />}
                                    allowClear
                                    placeholder="请输入账号"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码'
                                        }
                                    ]}
                                >
                                    <Input.Password
                                        className={styles.RadiusInput}
                                        size="large"
                                        allowClear
                                        placeholder="请输入密码"
                                        prefix={<LockOutlined />}
                                    />
                                </Form.Item>
                                <div className={styles.LoginAssist}>
                                    <Checkbox className={styles.RememberMe}>记住我</Checkbox>
                                    <a href="https://www.baidu.com" className={styles.ForgetPass} target='view_window'>
                                        忘记密码
                                    </a>
                                </div>

                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    style={{
                                        width: '100%',
                                    }}
                                    htmlType="submit"
                                // onClick={onFinish}
                                >登 录</Button>
                            </Form.Item>
                        </Form>

                        <a
                            href=""
                            className={styles.SignupLink}
                        >没有账号？点此注册</a>
                    </div>
                </div>
            </Content>
        </Layout>
    )
};

export default Login;