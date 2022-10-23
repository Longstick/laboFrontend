import React, { useState } from "react";
import { ProCard, ProTable, EditableProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, TableColumnType } from "antd";
import { waitTime } from "@/services/utils";
import { CreateUserForm } from "./CreateUserForm";
import ButtonGroup from "antd/lib/button/button-group";
import { characterType } from "../struct";

export const UserTable: React.FC = props => {
    const userData: API.UserTableColumnsType[] = [
        {
            userid: 4,
            name: 'HHX',
            ID: '201902010315',
            phoneNumber: '13537536685',
            email: 'userhhx@example.com',
            character: 'dispatcher',
        },
        {
            userid: 2,
            name: 'WZC',
            ID: '12312323',
            phoneNumber: '13537536685',
            email: 'wzc@example.com',
            character: 'maintainer',
        },
        {
            userid: 1,
            name: 'CWS',
            ID: '34699094433',
            phoneNumber: '342434342436',
            email: 'cws@qq.com',
            character: 'maintainer',
        },
        {
            userid: 5,
            name: 'ZJH',
            ID: '201902010315',
            phoneNumber: '12333245542',
            email: 'user@example.com',
            character: 'approver',
        },
    ]

    const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
    const [value, setValue] = useState<API.UserTableColumnsType[]>(userData);
    const [selectedRows,setSelectedRows] = useState<API.UserTableColumnsType[]>([]);

    const userTableColumns: ProColumns<API.UserTableColumnsType>[] = [
        {
            key: 'name',
            title: '用户名',
            dataIndex: 'name',
            // readonly: true,
            // hideInSearch: true,
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
            valueEnum: characterType
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
                    <Popconfirm
                        title={<>确认删除该用户吗？<br />将无法还原数据!</>}
                        // title = {"确认删除吗？\r将无法复原"}
                        onConfirm={async ()=>{
                            try {
                                await waitTime(500)
                                message.success('删除成功！')
                                // setValue(value.filter((item)=> item.userid !== record.userid))
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
        <ProTable<API.UserTableColumnsType, API.PageParams>
            rowKey='userid'
            columns={userTableColumns}
            dataSource={value}
            // onChange={setValue}
            tableLayout='fixed'
            rowSelection={{
                onChange: (_, selected) => {setSelectedRows(selected)}
            }}
            request={async()=>({
                data: userData,
                total: 4,
                success: true,
            })}
            scroll={{ x: 500}}
            toolbar={{
                title: 
                    <Space size={16}>
                    <CreateUserForm key='createUserForm'/>
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
                filterType: 'query',
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
    )
}

