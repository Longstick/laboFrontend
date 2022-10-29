import React, { useState } from "react";
import { ProCard, ProTable, EditableProTable, PageContainer } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, TableColumnType } from "antd";
import { waitTime } from "@/services/utils";
import ButtonGroup from "antd/lib/button/button-group";
import { characterType } from "../struct";
import { CreateUserForm } from "../components/CreateUserForm";
import { getCharData, getUserData } from "@/services/api";

const UserManage: React.FC = () => {

    const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<API.UserTableColumnsType[]>([]);

    const userTableColumns: ProColumns<API.UserTableColumnsType>[] = [
        {
            key: 'name',
            title: '用户名',
            dataIndex: 'name',
            editable: false,
        },
        {
            key: 'ID',
            title: '学工号',
            dataIndex: 'ID',
        },
        {
            key: 'phoneNumber',
            title: '联系电话',
            dataIndex: 'phoneNumber',
        },
        {
            key: 'email',
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            key: 'character',
            title: '角色',
            dataIndex: 'character',
            valueType: 'select',
            request: async() => {
                const res = (await getCharData()).data;
                const option: {label?: string, value: number}[] = []
                res.forEach((element: API.CharacterInfo) => {
                    option.push({
                        label: element.charName,
                        value: element.charID,
                    })
                })
                return option
            }            
        },
        {
            key: 'option',
            valueType: 'option',
            title: '操作',
            dataIndex: 'operate',
            hideInSearch: true,
            render: (text, record, _, action) =>
                <Space>
                    <Button
                        type='primary'
                        key='editable'
                        onClick={() => {
                            action?.startEditable?.(record.userid)
                        }}
                    >修改</Button>
                    <Popconfirm
                        title={<>确认删除该用户吗？<br />将无法还原数据!</>}
                        onConfirm={async () => {
                            try {
                                await waitTime(500)
                                message.success('删除成功！')
                            } catch (err) {
                                message.error('删除失败！')
                            }
                        }}
                    >
                        <Button
                            key='delete'
                        >删除</Button>
                    </Popconfirm>
                </Space>
        },
    ]
    return (
        <PageContainer>
            <ProTable<API.UserTableColumnsType, API.PageParams>
                rowKey='userid'
                columns={userTableColumns}
                tableLayout='fixed'
                rowSelection={{
                    onChange: (_, selected) => { setSelectedRows(selected) }
                }}
                request={getUserData}
                scroll={{ x: 500 }}
                toolbar={{
                    title:
                        <Space size={16}>
                            <CreateUserForm key='createUserForm' />
                            <ButtonGroup key='output'>
                                <Button
                                    key='outputAll'
                                >导出全部</Button>
                                <Button
                                    key='outputSelected'
                                    disabled={selectedRows.length === 0}
                                >导出已选</Button>
                            </ButtonGroup>
                        </Space>

                }}
                search={{
                    defaultCollapsed: false,
                    showHiddenNum: true,
                }}
                editable={{
                    type: 'single',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {
                        console.log(rowKey, data, row)
                        await waitTime(1000)
                        message.success('修改成功！')
                    },
                    onChange: setEditableKeys,
                    actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],

                }}


            />
        </PageContainer>
    )
}

export default UserManage