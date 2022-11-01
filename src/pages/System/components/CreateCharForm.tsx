import React, { useRef, useState } from "react";
import { ProCard, ProTable, EditableProTable, ProForm, ProFormText, ProFormGroup, ModalForm, ProFormTextArea, ProFormSelect } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, TableColumnType, Form, Typography } from "antd";
import { waitTime } from "@/services/utils";
import { authType } from "../struct";

export const CreateCharForm: React.FC = props => {

    const formRef = useRef()

    return (
        <ModalForm<API.UserInfo>
            formRef={formRef}
            formKey='CreateCharForm'
            grid
            title='新建角色'
            trigger={
                <Button
                    type='primary'
                >新建用户</Button>
            }
            width={600}
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
                name="charName"
                label="角色名称"
                rules={[{
                    required: true,
                    message: '请填写用户名'
                }]}
            />

            <ProFormTextArea
                name="charDesc"
                label="角色描述"
                fieldProps={{
                    minLength: 3,
                }}
            />

            <ProFormSelect
                name='authGroup'
                label='权限组'
                fieldProps={{
                    mode: 'multiple',
                }}
                valueEnum={authType}
            />

        </ModalForm>
    )
}

