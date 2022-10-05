import { removeRule } from '@/services/ant-design-pro/api';
import { issueTableRule } from '@/services/api'

import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import {
    FooterToolbar,
    PageContainer,
    ProTable,
    ProCard,
} from '@ant-design/pro-components';

import { Button, message, Statistic, Typography, Tag, Badge, Space } from 'antd';
import { FormattedMessage, useIntl, useModel } from '@umijs/max';
import type { ProColumns, ActionType, } from '@ant-design/pro-components';

import React, { useRef, useState } from 'react';
import RcResizeObserver from 'rc-resize-observer';

import ProcessDrawer from '../components/ProcessDrawer';
import styles from '../index.less';
import { priorityList, statusList } from '../struct';

const { Title } = Typography;

const handleRemove = async (selectedRows: API.TableColumns[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        await removeRule({
            key: selectedRows.map((row) => row.key),
        });
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};

const RepairmentTable: React.FC = () => {
    const [responsive, setResponsive] = useState<boolean>(false);
    const [currentRow, setCurrentRow] = useState<API.TableColumns>();
    const [activeKey, setActiveKey] = useState<string>('all')
    const [selectedRowsState, setSelectedRows] = useState<API.TableColumns[]>([]);
    const [processDrawerOpen, setProcessDrawer] = useState<boolean>(false);
    const { initialState } = useModel('@@initialState');
    const actionRef = useRef<ActionType>();

    const onCloseProcessDrawer = () => {
        setProcessDrawer(false);
    }

    const intl = useIntl();

    const renderBadge = (count: number, active = false) => {
        return (
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

    const columns: ProColumns<API.TableColumns>[] = [
        {
            key: 'issueID',
            title: (<FormattedMessage
                id="pages.repairment.issue.issueID"
                defaultMessage='Issue ID'
            />),
            dataIndex: 'issueID',
            search: false,
            width: '6%',
        },
        {
            key: 'issueTitle',
            title: (<FormattedMessage
                id="pages.repairment.issue.issueTitle"
                defaultMessage='Title'
            />),
            dataIndex: 'issueTitle',
            ellipsis: true,
            search: false,
        },
        {
            key: 'issueDescription',
            title: (<FormattedMessage
                id="pages.repairment.issue.issueDescription"
                defaultMessage='Description'
            />),
            dataIndex: 'issueDescription',
            valueType: 'textarea',
            ellipsis: true,
            search: false,
        },
        {
            key: 'categoryList',
            title: (<FormattedMessage
                id="pages.repairment.issue.categoryList"
                defaultMessage='Category'
            />),
            dataIndex: 'categoryList',
            hideInTable: true,
            valueEnum: {
                0: '电脑',
                1: '实验设备',
                2: '灯',
            },
            valueType: 'select',
            fieldProps: {
                dropdownMatchSelectWidth: false,
            }
        },
        {
            key: 'priority',
            title: (<FormattedMessage
                id="pages.repairment.issue.priority"
                defaultMessage='Priority'
            />),
            dataIndex: 'priority',
            valueType: 'select',
            valueEnum: priorityList,
            width: '8%',
            render: (_, record) =>
                <Tag color={priorityList[record.priority].color}>
                    {priorityList[record.priority].text}
                </Tag>,
            fieldProps: {
                dropdownMatchSelectWidth: false,
            }
        },
        {
            key: 'remainingTime',
            title: (<FormattedMessage
                id="pages.repairment.issue.remainingTime"
                defaultMessage='Remaining'
            />),
            dataIndex: 'remainingTime',
            search: false,
            valueType: 'fromNow',
            width: '8%',
            sorter: (a, b) => a.remainingTime - b.remainingTime,
        },
        {
            key: 'estimatedTime',
            title: (<FormattedMessage
                id="pages.repairment.issue.estimatedTime"
                defaultMessage='Estimated'
            />),
            dataIndex: 'estimatedTime',
            search: false,
            valueType: 'dateTime',
            sorter: (a, b) => a.estimatedTime - b.estimatedTime,
        },
        {
            key: 'updatedTime',
            title: (<FormattedMessage
                id="pages.repairment.issue.updatedTime"
                defaultMessage='Updated'
            />),
            dataIndex: 'updatedTime',
            search: false,
            valueType: 'dateTime',
            sorter: (a, b) => a.updatedTime - b.updatedTime,
        },
        {
            key: 'status',
            title: (<FormattedMessage
                id="pages.repairment.issue.status"
                defaultMessage='Status'
            />),
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
            title: (<FormattedMessage
                id="pages.repairment.searchTable.tableOptions"
                defaultMessage='Options'
            />),
            dataIndex: 'tableOptions',
            search: false,
            width: 120,
            fixed: 'right',
            render: (_, record) =>
                <Button
                    type="link"
                    // ghost
                    // shape="circle"
                    onClick={() => {
                        setProcessDrawer(true);
                        setCurrentRow(record);
                    }}
                >
                    {record.currentProcesser === initialState?.userInfo?.identity ?
                        <FormattedMessage id="pages.repairment.searchTable.options.process" defaultMessage='Process' /> :
                        <FormattedMessage id="pages.repairment.searchTable.options.check" defaultMessage='Check' />
                    }
                </Button>
        },
    ];

    return (
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width <= 576);
            }}
        >
            <PageContainer>
                <ProCard.Group
                    title={intl.formatMessage({
                        id: 'pages.repairment.statisticsData.title',
                        defaultMessage: 'Statistic Data'
                    })}
                    direction={responsive ? 'column' : 'row'}
                    ghost
                    gutter={[12, 12]}
                    className={styles.statisticsBaseCard}
                >
                    <ProCard>
                        <Statistic
                            title={intl.formatMessage({
                                id: 'pages.repairment.all.statisticsData.newIssuesToday',
                                defaultMessage: 'New Issues Today'
                            })}
                            value={34} />
                    </ProCard>
                    {/* <Divider type={responsive ? 'horizontal' : 'vertical'} /> */}
                    <ProCard>
                        <Statistic
                            title={intl.formatMessage({
                                id: 'pages.repairment.all.statisticsData.totalIssues',
                                defaultMessage: 'Total Issues'
                            })}
                            value={10245} />
                    </ProCard>
                    {/* <Divider type={responsive ? 'horizontal' : 'vertical'} /> */}
                    <ProCard>
                        <Statistic
                            title={intl.formatMessage({
                                id: 'pages.repairment.all.statisticsData.highPriority',
                                defaultMessage: 'High Priority Issues'
                            })}
                            value={842} />
                    </ProCard>
                    {/* <Divider type={responsive ? 'horizontal' : 'vertical'} /> */}
                    <ProCard>
                        <Statistic
                            title={intl.formatMessage({
                                id: 'pages.repairment.all.statisticsData.overdueIssue',
                                defaultMessage: 'Overdue Issues'
                            })} value={86} />
                    </ProCard>
                </ProCard.Group>


                <Title level={5} style={{ marginBottom: 10 }}>
                    <FormattedMessage
                        id="pages.repairment.all.searchTable.title"
                        defaultMessage='All Issues'
                    />
                </Title>


                <ProTable<API.TableColumns, API.PageParams>
                    columns={columns}
                    actionRef={actionRef}
                    request={(params) => issueTableRule({ ...params, activeKey })}
                    tableLayout='fixed'
                    rowKey='key'
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
                        multipleLine: true,
                        actions: [
                            <Button type="primary" key="New" size='large' icon={<PlusOutlined />}>
                                <FormattedMessage
                                    id='pages.repairment.searchTable.createNew'
                                    defaultMessage='Create New'
                                />
                            </Button>,
                            <Button type="primary" key="outputAll" size='large'>
                                <FormattedMessage
                                    id='pages.repairment.searchTable.outputAll'
                                    defaultMessage='Output All'
                                />
                            </Button>
                        ],

                        tabs: {
                            activeKey,
                            onChange: (key) => {
                                setActiveKey(key as string)
                                actionRef.current?.reloadAndRest?.();
                            },
                            items: [
                                {
                                    key: 'all',
                                    tab: '全部'
                                },
                                {
                                    key: 'to-do',
                                    tab: <span>我的待办{renderBadge(15, activeKey === 'to-do')}</span>
                                },
                                {
                                    key: 'myCompleted',
                                    tab: '我的已办'
                                },
                                {
                                    key: 'mySubmission',
                                    tab: '我的提交'
                                },
                            ],

                        },

                    }}
                />

                {selectedRowsState?.length > 0 && (
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
                        <Button
                            onClick={async () => {
                                await handleRemove(selectedRowsState);
                                setSelectedRows([]);
                                actionRef.current?.reloadAndRest?.();
                            }}
                        >
                            <FormattedMessage
                                id="pages.searchTable.batchDeletion"
                                defaultMessage="Batch deletion"
                            />
                        </Button>
                        <Button type="primary">
                            <FormattedMessage
                                id="pages.searchTable.batchApproval"
                                defaultMessage="Batch approval"
                            />
                        </Button>
                    </FooterToolbar>
                )}

                <ProcessDrawer
                    responsive={responsive}
                    drawerOpen={processDrawerOpen}
                    onClose={onCloseProcessDrawer}
                    value={currentRow || {}}
                />
            </PageContainer>
        </RcResizeObserver>
    );
};

export default RepairmentTable;
