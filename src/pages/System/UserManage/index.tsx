import React, { useRef, useState } from "react";
import { ProCard, ProTable, EditableProTable, PageContainer, ActionType } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, TableColumnType, Tag } from "antd";
import { waitTime } from "@/services/utils";
import ButtonGroup from "antd/lib/button/button-group";
import { authType, characterType, manageType } from "../struct";
import { CreateUserForm } from "../components/CreateUserForm";
import { getAllUsers, getApporver, getCharData, getUserData, setManageAuth, setProcessAuth } from "@/services/api";

const UserManage: React.FC = () => {

    const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
    const [selectRows, setSelectedRows] = useState<API.UserInfo[]>([]);
    const [rowSelect, setRowSelect] = useState<boolean>(false)
    const actionRef = useRef<ActionType>();

    const userTableColumns: ProColumns<API.UserInfo>[] = [
        {
            key: 'username',
            title: '用户名',
            dataIndex: 'username',
            editable: false,
        },
        {
            key: 'email',
            title: '邮箱',
            dataIndex: 'email',
            editable: false,

        },
        {
            key: 'id',
            title: '系统ID',
            dataIndex: 'id',
            editable: false,

        },
        {
            key: 'phone',
            title: '联系电话',
            dataIndex: 'phone',
        },
        // {
        //     key: 'character',
        //     title: '角色',
        //     dataIndex: 'character',
        //     valueType: 'select',
        //     request: async () => {
        //         const res = (await getCharData()).data;
        //         const option: { label?: string, value: number }[] = []
        //         res.forEach((element: API.CharacterInfo) => {
        //             option.push({
        //                 label: element.charName,
        //                 value: element.charID,
        //             })
        //         })
        //         return option
        //     }
        // },
        {
            key: 'authList',
            title: '工单处理权限',
            dataIndex: 'authList',
            valueType: 'select',
            fieldProps: {
                mode: 'multiple'
            },
            valueEnum: authType,
            render: (text, record, _, action) => {
                const taglist: React.ReactNode[] = []
                if (record.authList?.length === 0) {
                    return <>无权限</>
                }
                record.authList?.forEach(element => {
                    taglist.push(
                        <Tag>{authType[element]}</Tag>
                    )
                })
                // return <Space direction='vertical'>
                //     {taglist}
                // </Space>
                return <>{taglist}</>
            }
        },
        {
            key: 'manageType',
            title: '管理权限',
            dataIndex: 'manageType',
            valueType: 'select',
            valueEnum: manageType,
            fieldProps:{
                allowClear: false,
            },
            render: (text, record, _, action) => {
                return <Tag>{manageType[record.manageType!]}</Tag>
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
                            action?.startEditable?.(record.id!)
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
            <ProTable<API.UserInfo, API.PageParams>
                rowKey='id'
                actionRef={actionRef}
                columns={userTableColumns}
                request={getAllUsers}
                rowSelection={
                    rowSelect ?
                        {
                            onChange: (_, selected) => { setSelectedRows(selected) },
                            alwaysShowAlert: true,
                        } : false
                }
                tableAlertOptionRender={({ selectedRowKeys, selectedRows, onCleanSelected }) =>
                    <Space size={18}>
                        <a>批量导出</a>
                        <Popconfirm
                            title={<>确认删除这些用户吗？<br />将无法还原数据!</>}
                        >
                            <a>批量删除</a>
                        </Popconfirm>

                        <a onClick={onCleanSelected}>清空选择</a>
                    </Space>
                }

                scroll={{ x: 500 }}
                toolbar={{
                    title:
                        <Space size={16}>
                            <CreateUserForm key='createUserForm' />
                            <ButtonGroup key='output'>
                                <Button
                                    key='outputAll'
                                >导出全部</Button>
                                {
                                    rowSelect ?
                                        <Button
                                            key='cancelBatch'
                                            danger
                                            onClick={() => { setRowSelect(false) }}
                                        >取消选择</Button>
                                        :
                                        <Button
                                            key='batch'
                                            onClick={() => { setRowSelect(true) }}
                                        >批量操作</Button>
                                }
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
                        try {
                            let res = await setProcessAuth({
                                email: data.email!,
                                authList: data.authList!,
                            })
                            if (res.code === -1) {
                                throw new Error('设置流程处理权限错误')
                            }

                            res = await setManageAuth({
                                email: data.email!,
                                managetype: data.manageType!
                            })
                            if (res.code === -1) {
                                throw new Error('设置管理权限错误')
                            }

                            message.success('修改成功！')
                            actionRef.current?.reloadAndRest?.()
                        }
                        catch (error) {
                            message.error('发生错误，修改失败！')
                        }
                    },
                    onChange: (rowKey, row) => {
                        setEditableKeys(rowKey)
                    },
                    actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
                }}


            />
        </PageContainer>
    )
}

export default UserManage