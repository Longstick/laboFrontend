import { ActionType, ColumnsState, PageContainer, ProCard, ProColumns, ProDescriptions, ProDescriptionsItemProps, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { Button, Modal, Popconfirm, Space, Tag } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { discardResource, getAllResources, getResourceID } from '@/services/api';
import { ResourceInfoColumns, ResourceTypeEnum } from '../struct';

// 描述列配置
const columnsFilter: string[] = [
    'identifier',
    'name',
    'modelNumber',
    'type',
    'presentSituation',
    'collectUnit',
    'storagePlace',
    'minServiceYear',

]

const EquipmentManage: React.FC = () => {
    const [currentRow, setCurrentRow] = useState<API.ResourceInfo>();
    const [selectedRowsState, setSelectedRows] = useState<API.ResourceInfo[]>([]);
    const [rowSelect, setRowSelect] = useState<boolean>(false);
    const [detailModalOpen, setModalOpen] = useState<boolean>(false);
    const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
        storagePlace: { show: false },
        supplier: { show: false },
    });
    // const { initialState } = useModel('@@initialState');
    const actionRef = useRef<ActionType>();

    return (
        <PageContainer>
            <ProTable<API.ResourceInfo, API.ResourceInfo>
                columns={[{
                    key: 'tableOptions',
                    title: '操作',
                    dataIndex: 'tableOptions',
                    search: false,
                    width: '10%',
                    fixed: 'right',
                    align: 'center',
                    render: (dom, record, _, action) =>
                        <Space size={16}>
                            <a onClick={() => {
                                setCurrentRow(record)
                                setModalOpen(true)
                            }}>详细</a>
                            {record.presentSituation !== '废弃' &&
                                <Popconfirm
                                    title="确定要废除吗？设备废除后将无法复原！"
                                    onConfirm={() => {
                                        discardResource(record.identifier!)
                                        actionRef.current?.reloadAndRest?.()
                                    }}
                                ><a>废弃</a></Popconfirm>}

                        </Space>
                },
                // 筛选的列配置
                ...ResourceInfoColumns(columnsFilter)
                ]}
                actionRef={actionRef}
                request={searchResources}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                }}
                tableLayout="auto"
                rowKey="identifier"
                scroll={{ x: 1600 }}
                search={{
                    defaultCollapsed: false,
                    labelWidth: 80
                }}
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

            <Modal
                title={`设备 ${currentRow?.identifier} 的详细信息`}
                open={detailModalOpen}
                onCancel={() => { setModalOpen(false) }}
                footer={false}
                width='50%'
            >
                <ProDescriptions
                    bordered
                    column={{ xs: 1, md: 2 }}
                    columns={ResourceInfoColumns([])}
                    dataSource={currentRow}
                    labelStyle={{
                        fontWeight: 'bolder',
                    }}
                />
            </Modal>

        </PageContainer >
    )
}

export default EquipmentManage