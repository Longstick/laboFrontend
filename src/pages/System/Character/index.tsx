import { ActionType, PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import ButtonGroup from "antd/lib/button/button-group";
import { authType } from '../struct';
import { waitTime } from '@/services/utils';
import { getCharData } from '@/services/api';
import { CreateCharForm } from '../components/CreateCharForm';

const Character: React.FC = () => {

    const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
    const [selectRows, setSelectedRows] = useState<API.CharacterInfo[]>([]);
    const [rowSelect, setRowSelect] = useState<boolean>(false)
    const actionRef = useRef<ActionType>()

    const CharacterTableColumns: ProColumns<API.CharacterInfo>[] = [
        {
            key: 'charName',
            title: '角色名称',
            dataIndex: 'charName',
            editable: false,
        },
        {
            key: 'charDesc',
            title: '角色描述',
            dataIndex: 'charDesc',
            hideInSearch: true,
        },
        {
            key: 'createUserID',
            title: '添加人ID',
            dataIndex: 'createUserID',
            editable: false,
        },
        {
            key: 'createUserPhone',
            title: '添加人联系电话',
            dataIndex: 'createUserPhone',
            hideInSearch: true,
            editable: false,
        },
        {
            key: 'authGroup',
            title: '权限组',
            dataIndex: 'authGroup',
            valueType: 'select',
            valueEnum: authType,
            fieldProps: {
                mode: 'multiple',
            },
            render: (text, record, _, action) => {
                const authlist = record.authGroup
                const taglist: React.ReactNode[] = [];
                if (authlist.length === 0) {
                    return <>无特殊权限</>
                }
                authlist.sort()
                authlist.forEach(element => {
                    taglist.push(
                        <Tag>{authType[element]}</Tag>
                    )
                })
                return <Space direction='vertical'>
                    {taglist}
                </Space>
            }
        },
        {
            key: 'options',
            valueType: 'option',
            title: '操作',
            dataIndex: 'options',
            hideInSearch: true,
            render: (text, record, _, action) =>
                <Space>
                    <Button
                        key='edit'
                        type='primary'
                        onClick={() => {
                            action?.startEditable?.(record.charID)
                        }}
                    >编辑</Button>
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
            <ProTable<API.CharacterInfo, API.PageParams>
                rowKey='charID'
                columns={CharacterTableColumns}
                request={getCharData}
                actionRef={actionRef}
                search={{
                    defaultCollapsed: false,
                    showHiddenNum: true,
                }}
                toolbar={{
                    title: <Space size={16}>
                        <CreateCharForm />
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
                tableAlertOptionRender={({ selectedRowKeys, selectedRows, onCleanSelected }) =>
                    <Space size={18}>
                        <a>批量导出</a>
                        <Popconfirm
                            title={<>确认删除这些用户吗？<br />将无法还原数据!</>}
                            onConfirm={async()=>{
                                try{
                                    await waitTime(1000)
                                    message.success('删除成功')
                                    actionRef.current?.reloadAndRest?.()
                                } catch(err) {
                                    message.error('删除失败！')
                                }
                            }}
                        >
                            <a>批量删除</a>
                        </Popconfirm>

                        <a onClick={onCleanSelected}>清空选择</a>
                    </Space>
                }
                rowSelection={
                    rowSelect ?
                        {
                            onChange: (_, selected) => { setSelectedRows(selected) },
                            alwaysShowAlert: true,
                        } : false
                }
                scroll={{ x: 800 }}
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

export default Character