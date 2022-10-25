import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import React from 'react';
import { Tag } from 'antd';

const Character: React.FC = () => {
    const charData: API.CharacterInfo[] = [
        {
            charName: '审核员',
            charDesc: '12123123',
            createUserID: '123123',
            createUserPhone: '13537536685',
            authGroup: ['approve', '']
        }
    ]


    const CharacterTableColumns: ProColumns<API.CharacterInfo>[] = [
        {
            key: 'charName',
            title: '角色名称',
            dataIndex: 'charName',
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
        },
        {
            key: 'createUserPhone',
            title: '添加人联系电话',
            dataIndex: 'createUserPhone',
        },
        {
            key: 'authGroup',
            title: '权限组',
            dataIndex: 'authGroup',
            render: (text, record, _, action) => {
                const authlist = record.authGroup
                const taglist = [];
                console.log(text, record, action)
                for (let i=0; i<authlist.length; i++){
                    taglist.push(
                        <Tag>{authlist[i]}</Tag>
                    )
                }
                return taglist
            }
        },
        {
            key: 'options',
            title: '操作',
            dataIndex: 'options',
        },
    ]

    return (
        <PageContainer>
            <ProTable
                columns={CharacterTableColumns}
                dataSource={charData}

            />

        </PageContainer>
    )
}

export default Character