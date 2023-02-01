import { ActionType, ColumnsState, PageContainer, ProCard, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { Button, Space, Tag } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { getAllResources, getResourceID } from '@/services/api';
import { ResourceTypeEnum } from '../struct';


const EquipmentManage: React.FC = () => {
    const [currentRow, setCurrentRow] = useState<API.ResourceInfo>();
    const [selectedRowsState, setSelectedRows] = useState<API.ResourceInfo[]>([]);
    const [rowSelect, setRowSelect] = useState<boolean>(false);
    const [processDrawerOpen, setProcessDrawer] = useState<boolean>(false);
    // const [detailModalOpen, setModalOpen] = useState<boolean>(false);
    const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
        object: { show: false },
        issueDescription: { show: false },
    });
    // const { initialState } = useModel('@@initialState');
    const actionRef = useRef<ActionType>();

    const columns: ProColumns<API.ResourceInfo>[] = [
        {
            key: 'identifier',
            title: '设备ID',
            dataIndex: 'identifier',
            width: "8%",
        },
        {
            key: 'name',
            title: '设备名称',
            dataIndex: 'name',
        },
        {
            key: 'modelNumber',
            title: '型号',
            dataIndex: 'modelNumber',
        },
        {
            key: 'type',
            title: '类别',
            dataIndex: 'type',
            valueType: 'select',
            width: "8%",
            render: (dom, record, _, action) =>
                <Tag color={ResourceTypeEnum[record.type!].color}>{record.type}</Tag>
        },
        {
            key: 'presentSituation',
            title: '当前状态',
            dataIndex: 'presentSituation',
            width: '8%',
            valueType: 'select',
            valueEnum: {
                '在用': {
                    text: '在用',
                    status: 'Processing'
                },
                '废弃': {
                    text: '废弃',
                    status: 'Default'
                }
            }
        },
        {
            key: 'collectUnit',
            title: '所属单位',
            dataIndex: 'collectUnit',
        },
        {
            key: 'storagePlace',
            title: '存放位置',
            dataIndex: 'storagePlace',
        },
        {
            key: 'minServiceYear',
            title: '服务期限',
            dataIndex: 'minServiceYear',
            width: '8%',
        },
        // {
        //     key: 'remark',
        //     title: '标注',
        //     dataIndex: 'remark',
        // },
        // {
        //     key: 'supplier',
        //     title: '供应商',
        //     dataIndex: 'supplier',
        // },
        {
            key: 'usedYear',
            title: '已使用时长',
            dataIndex: 'usedYear',
        },
        
        // {
        //     key: 'specifications',
        //     title: '配置',
        //     dataIndex: 'specifications',
        // },
        // {
        //     key: 'collectPerson',
        //     title: '采购负责人',
        //     dataIndex: 'collectPerson',
        // },
        {
            key: 'tableOptions',
            title: '操作',
            search: false,
            width: 120,
            fixed: 'right',
            align: 'center',
            render: (text, record, _, action) =>
                <Space size={16}>
                    <a>详情</a>
                    <a>处理</a>
                </Space>
        },
    ];

    return (
        <PageContainer>
            <ProTable<API.ResourceInfo, API.PageParams & API.ResourceInfo>
                columns={columns}
                actionRef={actionRef}
                request={getAllResources}
                // tableLayout="auto"
                rowKey="identifier"
                defaultSize='large'
                scroll={{ x: 1600 }}
                search={{
                    defaultCollapsed: false,
                }}
                pagination={{}}
                rowSelection={
                    rowSelect ?
                        {
                            onChange: (_, selectedRows) => {
                                // setSelectedRows(selectedRows);
                            },
                            alwaysShowAlert: true,
                        } : false
                }
                toolbar={{
                    title: <Space size={16}>
                        <Button type="primary">Excel导入</Button>
                        <ButtonGroup key='ButtonGroup'>
                            <Button key="outputAll">
                                导出全部
                            </Button>

                            {rowSelect ?
                                <Button
                                    key='cancelOperate'
                                    // size='large'
                                    danger
                                    onClick={() => { setRowSelect(false) }}
                                >取消操作</Button>
                                :
                                <Button
                                    key="outputSelected"
                                    // size="large"
                                    onClick={() => { setRowSelect(true) }}
                                >批量操作</Button>
                            }

                        </ButtonGroup>
                    </Space>
                }}
                tableAlertOptionRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
                    <Space size={24}>
                        <a >批量导出</a>
                        <a onClick={onCleanSelected}>取消选择</a>
                    </Space>
                )}
                columnsState={{
                    value: columnsStateMap,
                    onChange: setColumnsStateMap,
                }}
            />
        </PageContainer >
    )
}

export default EquipmentManage