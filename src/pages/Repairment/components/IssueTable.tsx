// 工单表格

import { ActionType, ColumnsState, ProColumns, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Modal, Popconfirm, Space, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import CreateNew from './CreateNew';
import ButtonGroup from 'antd/lib/button/button-group';
import { useModel } from '@umijs/max';

import { failureTypeLabel, priorityList, statusList } from '../struct';

import { getIssueList, getTodoList, getResourceID } from '@/services/api';
import ProcessDrawer from './ProcessDrawer';
// import DetailCard from './DetailCard';

export type IssueTableProps = {
    onClose?: () => void;
    recordId?: string;
    responsive?: boolean;
    activeKey?: string;
};

const IssueTable: React.FC<IssueTableProps> = (props) => {
    const [currentRow, setCurrentRow] = useState<API.IssueInfo>();
    const [selectedRowsState, setSelectedRows] = useState<API.IssueInfo[]>([]);
    const [rowSelect, setRowSelect] = useState<boolean>(false);
    const [processDrawerOpen, setProcessDrawer] = useState<boolean>(false);
    // const [detailModalOpen, setModalOpen] = useState<boolean>(false);
    const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
        object: { show: false },
        issueDescription: { show: false },
    });
    const { initialState } = useModel('@@initialState');
    const actionRef = useRef<ActionType>();

    const onCloseProcessDrawer = () => {
        setProcessDrawer(false);
    };

    // const onCloseDetailModal = () => {
    //     setModalOpen(false);
    // };

    useEffect(() => {
        actionRef.current?.reloadAndRest?.()
    }, [props.activeKey])

    const columns: ProColumns<API.IssueInfo>[] = [
        {
            key: 'identifier',
            title: '工单ID',
            dataIndex: 'identifier',
            sorter: (a, b) => {
                return Number(a.identifier) - Number(b.identifier)
            }
        },
        {
            key: 'title',
            title: '工单标题',
            dataIndex: 'title',
            ellipsis: true,
            search: false,
            width: 300,
        },
        {
            key: 'resource',
            title: '工作对象',
            dataIndex: ['resource', 'name'],
            ellipsis: true,
            // search: false,
            request: getResourceID,
            fieldProps: {

                showSearch: true,
                // showArrow: false,
                debounceTime: 500,
            },
            render: (text, record, _, action) => {
                return `${record.resource?.identifier} ${record.resource?.name}`
            }
        },
        {
            key: 'type',
            title: '故障类型',
            dataIndex: 'type',
            valueType: 'select',
            valueEnum: failureTypeLabel,
            width: '8%',
            render: (_, record) => (
                <Tag color={failureTypeLabel[record.type!].color}>
                    {failureTypeLabel[record.type!].text}
                </Tag>
            ),
            fieldProps: {
                dropdownMatchSelectWidth: false,
            },
        },
        {
            key: 'priority',
            title: '优先级',
            dataIndex: 'priority',
            valueType: 'select',
            valueEnum: priorityList,
            width: '8%',
            render: (_, record) => (
                <Tag color={priorityList[record?.priority ?? 0].color}>
                    {priorityList[record?.priority ?? 0].text}
                </Tag>
            ),
            fieldProps: {
                dropdownMatchSelectWidth: false,
            },
        },
        {
            key: 'finish_date',
            title: '预期时限',
            dataIndex: 'finish_date',
            valueType: 'dateTime',
            sorter: (a, b) => {
                return new Date(a.finish_date!).getTime() - new Date(b.finish_date!).getTime()
            },
            render: (dom, record, _, action) => {
                const finish_date = new Date(record.finish_date!).getTime()
                if (finish_date < Date.now() && record.status !== 1) {
                    return <div style={{
                        color: 'red'
                    }}>
                        {record.finish_date}
                    </div>
                }
                return record.finish_date
            }
        },
        {
            key: 'create_time',
            title: '创建时间',
            dataIndex: 'create_time',
            search: false,
            valueType: 'dateTime',
            sorter: (a, b) => {
                const atime = new Date(a.create_time!).getTime();
                const btime = new Date(b.create_time!).getTime();
                return atime - btime
            },
            defaultSortOrder: 'descend',
            // hideInTable: true
        },

        {
            key: 'status',
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: statusList,
            width: 120,
            fieldProps: {
                dropdownMatchSelectWidth: false,
            }
        },
        {
            key: 'tableOptions',
            title: '操作',
            dataIndex: 'tableOptions',
            search: false,
            width: props.responsive ? 60 : 150,
            fixed: 'right',
            align: 'center',
            render: (text, record, _, action) => {
                const len = record.has_person?.length
                const onDetailButtonClick = () => {
                    console.log(record)
                    setCurrentRow(record);
                    // setModalOpen(true);
                }

                const onProcessButtonClick = () => {
                    setCurrentRow(record);
                    setProcessDrawer(true);
                }

                return props.responsive ? (
                    <TableDropdown
                        key="actionGroup"
                        onSelect={() => action?.reload()}
                        menus={[
                            // {
                            //     key: 'dropdownDetail',
                            //     name: '详细信息',
                            //     onClick: onDetailButtonClick
                            // },
                            {
                                key: 'dropdownProcess',
                                name:
                                    record.has_person[len - 1] === initialState?.userInfo?.id && record.status != 1
                                        ? '处理'
                                        : '查看',
                                onClick: onProcessButtonClick
                            },
                            {
                                disabled: initialState?.userInfo?.id !== record.has_person[0] || record.status === 1,
                                key: 'close',
                                name: '关闭工单',
                            }
                        ]}
                    />
                ) : (
                    <>
                        {/* <a onClick={onDetailButtonClick}>详细信息</a> */}
                        <a onClick={onProcessButtonClick}>
                            {record.has_person[len - 1] === initialState?.userInfo?.id && record.status !== 1 ?
                                <Button type='primary' onClick={onProcessButtonClick}>处理</Button> :
                                <a onClick={onProcessButtonClick}>查看</a>
                            }
                        </a>
                        {/* <Popconfirm title="确认要关闭订单吗">
                            {initialState?.userInfo?.id === record.has_person[0] && record.status != 1
                                && <>&nbsp;&nbsp;&nbsp;&nbsp;<a>关闭工单</a></>}
                        </Popconfirm> */}
                    </>
                );
            },
        },
    ];

    return (<>
        <ProTable<API.IssueInfo, API.PageParams>
            columns={columns}
            actionRef={actionRef}
            request={{
                all: getIssueList,
                mySubmission: getTodoList,
            }[props.activeKey!]}
            // tableLayout="auto"
            rowKey="identifier"
            defaultSize='large'
            scroll={{ x: 1600 }}
            search={{
                defaultCollapsed: false,
            }}
            rowSelection={
                rowSelect ?
                    {
                        onChange: (_, selectedRows) => {
                            setSelectedRows(selectedRows);
                        },
                        alwaysShowAlert: true,
                    } : false
            }
            toolbar={{
                title: <Space size={16}>
                    <CreateNew type="newButton" tableActionRef={actionRef} key="CreateNew" />
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

        <ProcessDrawer
            responsive={props.responsive}
            drawerOpen={processDrawerOpen}
            onClose={onCloseProcessDrawer}
            recordId={currentRow?.id}
            tableActionRef={actionRef}
        />

        {/* <Modal
                open={detailModalOpen}
                onCancel={onCloseDetailModal}
                footer={null}
                title={`工单 ${currentRow?.identifier}`}
                width={800}
            >
                <DetailCard
                    responsive={props.responsive}
                    value={currentRow}
                />
            </Modal> */}
    </>
    )
}

export default IssueTable