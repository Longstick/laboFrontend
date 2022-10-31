import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Button, message, Space, Tag } from 'antd';
import { authType } from '../struct';
import { waitTime } from '@/services/utils';
import { getCharData } from '@/services/api';

const Character: React.FC = () => {

    const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

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
                        onClick={()=>{
                            action?.startEditable?.(record.charID)
                        }}
                    >编辑</Button>
                    <Button
                        key='delete'
                    >删除</Button>
                </Space>
        },
    ]

    return (
        <PageContainer>
            <ProTable<API.CharacterInfo, API.PageParams>
                rowKey='charID'
                tableLayout='fixed'
                columns={CharacterTableColumns}
                request={getCharData}
                search={{
                    defaultCollapsed: false,
                    showHiddenNum: true,
                }}
                scroll={{x: 800}}
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