import React, { useRef, useState } from "react";
import { ProCard, ProTable, EditableProTable, ProForm, ProFormText, ProFormGroup, ModalForm, ProFormTextArea, ProFormSelect } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, TableColumnType, Form, Typography } from "antd";
import { waitTime } from "@/services/utils";
import { characterType } from "../struct";

const { Title } = Typography;

export const CreateUserForm: React.FC = props => {

    const formRef = useRef()

    return (
        <ModalForm<API.UserInfo>
            formRef={formRef}
            formKey='createUserForm'
            grid
            title='新建用户'
            trigger={
                <Button
                    type='primary'
                >新建用户</Button>
            }
            width={400}
            modalProps={{
                destroyOnClose: true,
                maskClosable: false,
            }}
            onFinish={async values => {
                await waitTime(1000);
                console.log(values)
                return true
            }}
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
                        max: 8,
                        min: 2,
                        message: '用户名长度只能在2-8位'
                    }
                ]}
                fieldProps={{
                    placeholder: '长度在2-8位之间'
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
            />

            <ProFormSelect 
                name='character'
                label='角色'
                valueEnum={characterType}
                rules={[{
                    required: true,
                    message: '请选择角色',
                }]}
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
                    placeholder: '长度在6-20位之间',
                }}
            />

        </ModalForm>
    )
}

