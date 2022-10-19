import React, { useState } from "react";
import { ProCard, ProTable, EditableProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Button, Space, TableColumnType } from "antd";
import { waitTime } from "@/services/utils";

export const UserTable: React.FC = props => {

    const [editableKeys, setEditableKeys] = useState<React.Key[]>([])
    const [value, setValue] = useState<API.UserTableColumnsType[]>([])
    const userData: API.UserTableColumnsType[] = [
        {
            userid: 4,
            name: 'HHX',
            sex: 'male',
            ID: '201902010315',
            phoneNumber: '13537536685',
            character: 'dispatcher',
        },
        {
            userid: 2,
            name: 'WZC',
            sex: 'male',
            ID: '12312323',
            phoneNumber: '13537536685',
            character: 'maintainer',
        },
        {
            userid: 1,
            name: 'CWS',
            sex: 'female',
            ID: '34699094433',
            phoneNumber: '342434342436',
            character: 'maintainer',
        },
        {
            userid: 5,
            name: 'ZJH',
            sex: 'female',
            ID: '201902010315',
            phoneNumber: '12333245542',
            character: 'approver',
        },
    ]

    const userTableColumns: ProColumns<API.UserTableColumnsType>[] = [
        {
            key: 'name',
            title: '姓名',
            dataIndex: 'name',
            readonly: true,
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
            editable: ()=>true,
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
            valueType: 'select',
            valueEnum: {
                dispatcher: '派发员',
                maintainer: '维修员',
                approver: '审批员',
            }
        },
        {
            key: 'option',
            valueType: 'option',
            title: '操作',
            dataIndex: 'operate',
            hideInSearch: true,
            render: (text, record, _, action)=> 
                <Space>
                    <Button 
                        type='primary'
                        key='editable'
                        onClick={()=>{
                            action?.startEditable?.(record.userid)
                        }}
                    >修改</Button>
                    <Button
                        key='delete'
                        onClick={()=>{
                            setValue(value.filter((item) => item.userid !== record.userid));
                        }}
                    >删除</Button>
                </Space>
        },
    ]
    
    return (
        <EditableProTable<API.UserTableColumnsType, API.PageParams>
            rowKey='userid'
            columns={userTableColumns}
            value={userData}
            onChange={setValue}
            recordCreatorProps={false}
            tableLayout='fixed'
            request={async()=>({
                data: userData,
                total: 4,
                success: true,
            })}
            editable={{
                type: 'single',
                editableKeys,
                onSave: async (rowKey, data, row) => {
                    console.log(rowKey, data, row)
                    await waitTime(1000)
                },
                onChange: setEditableKeys,
            }}

        />
    )
}

