// 维修管理系统主体

import { getIssueList, getTodoList, issueTableRule } from '@/services/api';
import { PageContainer, ProTable, ProCard, TableDropdown } from '@ant-design/pro-components';

import { Button, Tag, Badge, Space } from 'antd';
import { FormattedMessage, useModel } from '@umijs/max';
import type { ProColumns, ActionType, ColumnsState } from '@ant-design/pro-components';

import React, { Children, useRef, useState } from 'react';
import RcResizeObserver from 'rc-resize-observer';

import ProcessDrawer from './components/ProcessDrawer';
import CreateNew from './components/CreateNew';
import styles from './index.less';
import { priorityList, staticGroup, statusList } from './struct';
import ButtonGroup from 'antd/lib/button/button-group';
import DetailModal from './components/DetailModal';
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
            width: '10%',
        },  
        {
            key: 'title',
            title: '工单标题',
            dataIndex: 'title',
            ellipsis: true,
            search: false,
        },
        {
            key: 'description',
            title: '工单描述',
            dataIndex: 'description',
            valueType: 'textarea',
            ellipsis: true,
            search: false,
        },
        {
            key: 'resource_id',
            title: '工作对象',
            dataIndex: 'resource_id',
            ellipsis: true,
            search: false,
        },
        // {
        //     key: 'type',
        //     title: '对象类别',
        //     dataIndex: 'type',
        //     hideInTable: true,
        //     // valueEnum: {
        //     //     0: '电脑',
        //     //     1: '实验设备',
        //     //     2: '灯',
        //     // },
        //     valueType: 'select',
        //     fieldProps: {
        //         dropdownMatchSelectWidth: false,
        //     }
        // },
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
            sorter: (a, b) => a.finish_date - b.finish_date,
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
            },
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
                return responsive ? (
                    <TableDropdown
                        key="actionGroup"
                        onSelect={() => action?.reload()}
                        menus={[
                            {
                                key: 'detail',
                                name: '详细信息',
                                onClick: () => {
                                    setCurrentRow(record);
                                    setModalOpen(true);
                                },
                            },
                            {
                                key: 'dropdownProcess',
                                name:
                                    record.currentProcesser === initialState?.userInfo?.identity
                                        ? '点击处理'
                                        : '查看流程',
                                onClick: () => {
                                    setCurrentRow(record);
                                    setProcessDrawer(true);
                                },
                            },
                        ]}
                    />
                ) : (
                    <Space size={24}>
                        <a
                            onClick={() => {
                                setCurrentRow(record);
                                setModalOpen(true);
                            }}
                        >
                            详细信息
                        </a>

                        <a
                            onClick={() => {
                                setCurrentRow(record);
                                setProcessDrawer(true);
                            }}
                        >
                            {record.has_person[len - 1] === initialState?.userInfo?.id ? '点击处理' : '查看流程'
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
                        tab: '全部',
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
                        tab: '我的提交',
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

                            <Button key="outputSelected" size="large" disabled={selectedRowsState.length === 0}>
                                <FormattedMessage
                                    id="pages.repairment.searchTable.outputSelected"
                                    defaultMessage="Output Selected"
                                />
                            </Button>
                        </ButtonGroup>
                    </Space>
                }
            >
                {activeKey !== 'drafts' ? (
                    <>
                        <ProCard.Group
                            direction={responsive ? 'column' : 'row'}
                            ghost
                            gutter={[12, 12]}
                            className={styles.statisticsBaseCard}
                        >
                            {staticGroup[activeKey]}
                        </ProCard.Group>

                        <ProTable<API.IssueInfo, API.PageParams>
                            columns={columns}
                            actionRef={actionRef}
                            // request={(params) => issueTableRule({ ...params, activeKey })}
                            request={
                                {
                                    all: getIssueList,
                                    mySubmission: getTodoList,
                                }[activeKey]
                            }
                            tableLayout="fixed"
                            rowKey="key"
                            scroll={{ x: 1200 }}
                            rowSelection={{
                                onChange: (_, selectedRows) => {
                                    setSelectedRows(selectedRows);
                                },
                            }}
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
                            columnsState={{
                                value: columnsStateMap,
                                onChange: setColumnsStateMap,
                            }}
                        />

                        {/* {selectedRowsState?.length > 0 && (
                    <FooterToolbar
                        extra={
                            <div>
                                <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
                                <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
                                <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
                                &nbsp;&nbsp;
                            </div>
                        }
                    >
                        <Button type="primary">
                            <FormattedMessage
                                id="pages.searchTable.batchApproval"
                                defaultMessage="Batch approval"
                            />
                        </Button>
                    </FooterToolbar>
                )} */}

                        <ProcessDrawer
                            responsive={responsive}
                            drawerOpen={processDrawerOpen}
                            onClose={onCloseProcessDrawer}
                            value={currentRow}
                        />

                        <DetailModal
                            isOpen={detailModalOpen}
                            onClose={onCloseDetailModal}
                            responsive={responsive}
                            value={currentRow}
                        />
                    </>
                ) : (
                    <DraftsTable />
                )}
            </PageContainer>
        </RcResizeObserver>
    );
};

export default Repairment;
