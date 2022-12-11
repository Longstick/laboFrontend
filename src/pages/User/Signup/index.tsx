import React, { useRef, useState } from "react";
import { Input, Form, Button, Layout, message, Typography, Radio, Tooltip, Result } from 'antd';
import type { RadioChangeEvent } from "antd";
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    LeftOutlined
} from '@ant-design/icons';
import logo from '../../../img/3.png';
import styles from '../index.less';
import { ProCard, ProForm, ProFormCaptcha, ProFormGroup, ProFormText } from "@ant-design/pro-components";
import type { ProFormInstance } from "@ant-design/pro-components";
import RcResizeObserver from 'rc-resize-observer';
import { waitTime } from "@/services/utils";
import { signupInSchool, signupOutSchool, getCaptcha } from "@/services/api";
import { AxiosError, history, SelectLang } from "@umijs/max";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Signup = () => {
    // useState hooks
    const [identity, setid] = useState<string>('inSchool');
    const [loading, setloading] = useState<boolean>(false);
    const [responsive, setResponsive] = useState<boolean>(false)
    const [isSuccess, setSuccess] = useState<boolean>(false)
    const formRef = useRef<ProFormInstance>();


    // 处理函数
    const onChange = (e: RadioChangeEvent) => {
        setid(e.target.value);
    }

    const onGetCaptcha = async () => {
        try {
            const email = formRef?.current?.getFieldFormatValue?.()
            console.log(email)
            const res = await getCaptcha(email);
            if (res?.code === 1) {
                message.success(res?.msg)
            }
            else {
                message.error(res?.msg)
                throw new Error('getCaptcha failed')
            }
        } catch (error: any) {
            console.log(error)
            message.error(error.response?.data?.msg)

        }
    }

    const inSchoolFinished = async (value: Partial<API.UserInfo>) => {
        try {
            setloading(true)
            // await waitTime(1000)
            const res = await signupInSchool(value)
            if (res?.code !== 1) {
                message.error(res?.msg)
                throw new Error('error!')
            }
            else {
                message.success(res?.msg)
                history.push('/user/login')
            }
            setSuccess(true)
        } catch (error: any) {
            console.log(error?.response?.data?.data)
            // message.error(error?.)
        }
        setloading(false)
    }

    const outSchoolFinished = async (value: Partial<API.UserInfo>) => {
        try {
            await waitTime(1000)
            console.log(value)
            setloading(true);
            const res = await signupOutSchool(value)
            if (res?.code !== 1) {
                message.error(res?.msg)
                throw new Error('error!')
            }
            else {
                message.success(res?.msg)
                history.push('/user/login')
            }
        } catch (error: any) {
            console.log(error?.response?.data?.data)
        }
        setloading(false)
    }

    return (
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                // md: 768px
                setResponsive(offset.width <= 768);
            }}
        >
            <Layout>
                <Content className={styles.BasicBody}>
                    {isSuccess ?
                        <div className={styles.successPad}>
                            <Result
                                status="success"
                                title="注册账号成功！"
                                subTitle="可以跳转回主页进行登录"
                                extra={[
                                    <Button
                                        type="primary"
                                        key="backToLogin"
                                        onClick={() => {
                                            history.push('/user/login')
                                        }}
                                    >
                                        返回登录
                                    </Button>
                                ]}
                            />
                        </div>

                        :

                        <ProCard ghost direction='row' className={styles.SignupPad}>
                            <ProCard className={styles.SignupModule}>
                                <Title
                                    level={4}
                                    style={{
                                        marginBottom: '20px',
                                        textAlign: 'center'
                                    }}
                                >新用户注册</Title>
                                <Radio.Group
                                    // size='large'
                                    onChange={onChange}
                                    buttonStyle="solid"
                                    className={styles.idRadio}
                                    defaultValue='inSchool'
                                >
                                    <Radio.Button
                                        value="inSchool"
                                    >学生/教职工</Radio.Button>
                                    <Radio.Button
                                        value="outSchool"
                                    >合作/供应商</Radio.Button>
                                </Radio.Group>

                                <ProForm
                                    formRef={formRef}
                                    name="inSchoolRegister"
                                    scrollToFirstError
                                    grid
                                    isKeyPressSubmit
                                    requiredMark={false}
                                    submitter={{
                                        submitButtonProps: {
                                            size: 'large'
                                        },
                                        render: (props, dom) => [
                                            <Button
                                                key='submit'
                                                onClick={() => {
                                                    props.submit()
                                                }}
                                                type='primary'
                                                size="large"
                                                loading={loading}
                                                style={{
                                                    marginTop: 20,
                                                    width: '100%',
                                                }}
                                            >注册</Button>
                                        ]
                                    }}
                                    onFinish={identity === 'inSchool' ? inSchoolFinished : outSchoolFinished}
                                >

                                    <ProFormText
                                        name="username"
                                        label="用户名"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请填写用户名'
                                            },
                                            {
                                                max: 15,
                                                min: 2,
                                                message: '用户名长度只能在2-15位'
                                            }
                                        ]}
                                        fieldProps={{
                                            size: 'large',
                                            className: styles.RadiusInput,
                                            placeholder: '长度需要在2-15位之内'
                                        }}
                                    />

                                    <ProFormText
                                        name="phone"
                                        label="手机号码"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请填写手机号码'
                                            },
                                            {
                                                type: 'string',
                                                pattern: new RegExp(/^[0-9]{11}$/, "g"),
                                                len: 11,
                                                message: '手机号码格式有误',
                                                validateTrigger: 'onClick'
                                            },
                                        ]}
                                        fieldProps={{
                                            size: 'large',
                                            className: styles.RadiusInput,
                                            // placeholder: '手机号码',
                                        }}
                                    />

                                    {identity === 'inSchool' ?
                                        <ProFormText
                                            name="email"
                                            label='内部邮箱'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请填写内部邮箱'
                                                }
                                            ]}
                                            transform={(value, namePath, allValues) => {
                                                console.log(value, namePath, allValues)
                                                return {
                                                    email: `${value}@stumail.sztu.edu.cn`,
                                                    account: `${value}`,
                                                }
                                            }}
                                            fieldProps={{
                                                addonAfter: '@stumail.sztu.edu.cn',
                                                size: 'large',
                                                className: styles.RadiusInput,
                                                // placeholder: '内部邮箱',
                                            }}
                                        />

                                        :

                                        <ProFormText
                                            name="email"
                                            label='登录邮箱'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请填写登录邮箱'
                                                },
                                                {
                                                    type: 'email',
                                                    message: '邮箱格式有误',
                                                }
                                            ]}
                                            transform={(value, namePath, allValues) => {
                                                console.log(value, namePath, allValues)
                                                return {
                                                    email: `${value}`,
                                                    account: `${value}`,
                                                }
                                            }}
                                            fieldProps={{
                                                size: 'large',
                                                className: styles.RadiusInput,
                                                placeholder: '如"xxx@xxmail.com"',
                                            }}
                                        />
                                    }

                                    <ProFormCaptcha
                                        name="code"
                                        label="邮箱验证码"
                                        phoneName='email'
                                        rules={[
                                            {
                                                required: true,
                                                message: '请填写邮箱验证码'
                                            },
                                            {
                                                type: 'string',
                                                pattern: new RegExp(/^[0-9]{6}$/, "g"),
                                                len: 6,
                                                message: '验证码格式有误',
                                                validateTrigger: 'onClick'
                                            },
                                        ]}
                                        onGetCaptcha={onGetCaptcha}
                                        captchaProps={{
                                            size: 'large',
                                            type: 'primary',

                                        }}
                                        fieldProps={{
                                            size: 'large',
                                            className: styles.RadiusInput,
                                            placeholder: '邮箱验证码',
                                        }}
                                    />

                                    <ProFormText.Password
                                        name="password"
                                        label='密码'
                                        rules={[
                                            {
                                                required: true,
                                                message: '请填写密码',
                                            },
                                            {
                                                min: 6,
                                                max: 20,
                                                message: '密码长度只能为6-20位',
                                                validateTrigger: 'onClick'
                                            },
                                            {
                                                pattern: new RegExp(/^(?!.*\s).*$/, "g"),
                                                message: '包含非法字符',
                                                validateTrigger: 'onClick'
                                            }
                                        ]}
                                        fieldProps={{
                                            size: 'large',
                                            className: styles.RadiusInput,
                                            placeholder: '长度需要在6-20位之内',
                                        }}
                                    />
                                </ProForm>


                                <p className={styles.LoginLink}>
                                    已有账号？<a href="/user/login">返回登录</a>
                                </p>
                            </ProCard>

                            {!responsive && <ProCard colSpan={12} className={styles.SignupIllustration} />}

                        </ProCard>}
                </Content>
            </Layout>
        </RcResizeObserver>
    )
}

export default Signup