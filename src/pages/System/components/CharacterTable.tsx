import React from "react";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Button, Space } from "antd";
export const CharacterTable: React.FC = () => {
    
    const characterTableColumns: ProColumns<API.CharacterTableColumnsType>[] = [
        {
            key: 'name',
            title: '姓名',
            dataIndex: 'name',
        },
        {
            key: 'sex',
            title: '性别',
            dataIndex: 'sex',
            hideInSearch: true,
            valueEnum: {
                male: '男',
                female: '女',
            }
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
            key: 'character',
            title: '角色',
            dataIndex: 'character',
        },
        {
            key: 'operate',
            title: '操作',
            dataIndex: 'operate',
            hideInSearch: true,
            render: (_, record)=> 
                <Space>
                    <Button>修改</Button>
                    <Button>删除</Button>
                </Space>
        },
    ]
    


    return (
        <ProTable 
            columns={characterTableColumns}
            
        />
    )
}

