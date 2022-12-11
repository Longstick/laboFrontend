// 维修管理系统主体

import { getIssueDetail, getIssueList, getTodoList, issueTableRule } from '@/services/api';
import { PageContainer, ProTable, ProCard, TableDropdown, StatisticCard } from '@ant-design/pro-components';

import { Button, Tag, Badge, Space, Modal } from 'antd';
import { FormattedMessage, useModel } from '@umijs/max';
import type { ProColumns, ActionType, ColumnsState } from '@ant-design/pro-components';

import React, { Children, useRef, useState } from 'react';
import RcResizeObserver from 'rc-resize-observer';

import ProcessDrawer from './components/ProcessDrawer';
import CreateNew from './components/CreateNew';
import styles from './index.less';
import { failureTypeLabel, priorityList, staticGroup, statusList } from './struct';
import ButtonGroup from 'antd/lib/button/button-group';
import DetailCard from './components/DetailCard';
import DraftsTable from './components/DraftsTable';

const Repairment: React.FC = () => {
    const [responsive, setResponsive] = useState<boolean>(false);
    const [currentRow, setCurrentRow] = useState<API.IssueInfo>();
    const [activeKey, setActiveKey] = useState<string>('all');
    const [selectedRowsState, setSelectedRows] = useState<API.IssueInfo[]>([]);
    const [rowSelect, setRowSelect] = useState<boolean>(false);
    const [processDrawerOpen, setProcessDrawer] = useState<boolean>(false);
    const [detailModalOpen, setModalOpen] = useState<boolean>(false);
    const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
        object: { show: false },
        issueDescription: { show: false },
    });
    const { initialState } = useModel('@@initialState');
    const actionRef = useRef<ActionType>();

    const onCloseProcessDrawer = () => {
        setProcessDrawer(false);
    };
    const onCloseDetailModal = () => {
        setModalOpen(false);
    };

    const renderBadge = (count: number, active = false) => {
        return count === 0 ? (
            <></>
        ) : (
            <Badge
                count={count}
                style={{
                    marginBlockStart: -2,
                    marginInlineStart: 4,
                    color: active ? '#1890FF' : '#999',
                    backgroundColor: active ? '#E6F7FF' : '#eee',
                }}
            />
        );
    };

    const columns: ProColumns<API.IssueInfo>[] = [
        {
            key: 'identifier',
            title: '工单ID',
            dataIndex: 'identifier',
            search: false,            
            // width: '10%',
        },
        {
            key: 'title',
            title: '工单标题',
            dataIndex: 'title',
            ellipsis: true,
            search: false,
        },
        // {
        //     key: 'description',
        //     title: '工单描述',
        //     dataIndex: 'description',
        //     valueType: 'textarea',
        //     ellipsis: true,
        //     search: false,
        // },
        {
            key: 'resource',
            title: '工作对象',
            dataIndex: ['resource', 'name'],
            ellipsis: true,
            search: false,
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
        // {
        //     key: 'remainingTime',
        //     title: (<FormattedMessage
        //         id="pages.repairment.issue.remainingTime"
        //         defaultMessage='Remaining'
        //     />),
        //     dataIndex: 'remainingTime',
        //     search: false,
        //     valueType: 'fromNow',
        //     width: '8%',
        //     sorter: (a, b) => a.remainingTime - b.remainingTime,
        // },
        {
            key: 'finish_date',
            title: '预期时限',
            dataIndex: 'finish_date',
            search: false,
            valueType: 'dateTime',
            sorter: (a, b) => {
                const atime = new Date(a.finish_date!).getTime();
                const btime = new Date(b.finish_date!).getTime();
                return atime - btime
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
            hideInTable: true
            
        },
        
        
        // {
        //     key: 'updatedTime',
        //     title: (<FormattedMessage
        //         id="pages.repairment.issue.updatedTime"
        //         defaultMessage='Updated'
        //     />),
        //     dataIndex: 'updatedTime',
        //     search: false,
        //     valueType: 'dateTime',
        //     sorter: (a, b) => a.updatedTime - b.updatedTime,
        // },
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
            title: (
                <FormattedMessage id="pages.repairment.searchTable.tableOptions" defaultMessage="Options" />
            ),
            dataIndex: 'tableOptions',
            search: false,
            width: responsive ? 60 : 200,
            fixed: 'right',
            render: (text, record, _, action) => {
                const len = record.has_person?.length

                const onDetailButtonClick = () => {
                    console.log(record)
                    setCurrentRow(record);
                    setModalOpen(true);
                }

                const onProcessButtonClick = async () => {
                    const res: API.AsyncResult = await getIssueDetail(record.id)
                    // 步骤顺序排序
                    res.data.orderNodes.sort((a: API.OrderNode, b: API.OrderNode) => { return a.current_stage! - b.current_stage! })
                    setCurrentRow(res.data);
                    setProcessDrawer(true);
                }

                return responsive ? (
                    <TableDropdown
                        key="actionGroup"
                        onSelect={() => action?.reload()}
                        menus={[
                            {
                                key: 'detail',
                                name: '详细信息',
                                onClick: onDetailButtonClick
                            },
                            {
                                key: 'dropdownProcess',
                                name:
                                    record.has_person[len - 1] === initialState?.userInfo?.id && record.status != 1
                                        ? '点击处理'
                                        : '查看流程',
                                onClick: onProcessButtonClick
                            },
                        ]}
                    />
                ) : (
                    <Space size={24}>
                        <a onClick={onDetailButtonClick}>详细信息</a>

                        <a onClick={onProcessButtonClick} >
                            {record.has_person[len - 1] === initialState?.userInfo?.id && record.status !== 1 ? '点击处理' : '查看流程'
                            }
                        </a>
                    </Space>
                );
            },
        },
    ];

    return (
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width <= 576);
            }}
        >
            <PageContainer
                onTabChange={(key) => {
                    setActiveKey(key as string);
                    actionRef.current?.reloadAndRest?.();
                }}
                tabList={[
                    {
                        key: 'all',
                        tab: '所有工单',
                    },
                    {
                        key: 'to-do',
                        tab: <span>我的待办{renderBadge(15, activeKey === 'to-do')}</span>,
                    },
                    {
                        key: 'myCompleted',
                        tab: <span>我的已处理{renderBadge(35, activeKey === 'myCompleted')}</span>,
                    },
                    {
                        key: 'mySubmission',
                        tab: '我的工单',
                    },
                    {
                        key: 'drafts',
                        tab: '草稿箱',
                    },
                ]}
                extra={
                    <Space size={16}>
                        <CreateNew type="newButton" tableActionRef={actionRef} />
                        <ButtonGroup>
                            <Button key="outputAll" size="large">
                                导出全部
                            </Button>

                            {rowSelect ?
                                <Button
                                    key='cancelOperate'
                                    size='large'
                                    danger
                                    onClick={() => { setRowSelect(false) }}
                                >取消操作</Button>
                                :
                                <Button
                                    key="outputSelected"
                                    size="large"
                                    onClick={() => { setRowSelect(true) }}
                                >批量操作</Button>
                            }

                        </ButtonGroup>
                    </Space>
                }
            >
                {activeKey !== 'drafts' ? (
                    <>
                        <StatisticCard.Group
                            direction={responsive ? 'column' : 'row'}
                            ghost
                            gutter={[12, 12]}
                            className={styles.statisticsBaseCard}
                        >
                            {staticGroup[activeKey]}
                        </StatisticCard.Group>

                        <ProTable<API.IssueInfo, API.PageParams>
                            columns={columns}
                            actionRef={actionRef}
                            request={{
                                all: getIssueList,
                                mySubmission: getTodoList,
                            }[activeKey]}
                            tableLayout="fixed"
                            rowKey="identifier"
                            scroll={{ x: 1200 }}
                            rowSelection={
                                rowSelect ?
                                    {
                                        onChange: (_, selectedRows) => {
                                            setSelectedRows(selectedRows);
                                        },
                                        alwaysShowAlert: true,
                                    } : false}
                            search={{
                                optionRender: false,
                                collapsed: false,
                                filterType: 'light',
                                labelWidth: 'auto',
                                // showHiddenNum: true,
                            }}
                            toolbar={{
                                search: true,
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
                            responsive={responsive}
                            drawerOpen={processDrawerOpen}
                            onClose={onCloseProcessDrawer}
                            value={currentRow!}
                            tableActionRef={actionRef}
                        />

                        <Modal
                            open={detailModalOpen}
                            onCancel={onCloseDetailModal}
                            footer={null}
                            // title={`工单 ${currentRow?.identifier} 详情`}
                            width={800}
                        >
                            <DetailCard
                                responsive={responsive}
                                value={currentRow}
                            />
                        </Modal>
                    </>
                ) : (
                    <DraftsTable />
                )}
            </PageContainer>
        </RcResizeObserver>
    );
};

export default Repairment;
