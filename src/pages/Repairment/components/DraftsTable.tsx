// 草稿箱表格系统


import React, { useRef, useState } from 'react';
import {
    PageContainer,
    ProTable,
    ProCard,
} from '@ant-design/pro-components';

import { Button, Tag, Badge, Space } from 'antd';
import { FormattedMessage, useModel } from '@umijs/max';
import type { ProColumns, ActionType, ColumnsState } from '@ant-design/pro-components';
import { priorityList, statusList } from '../struct';
import { issueTableRule } from '@/services/api';
import CreateNew from './CreateNew';


const DraftsTable: React.FC = () => {
    const actionRef = useRef()
    const [selected, setSelectedRows] = useState<API.TableColumns[]>([])
    const [operateRow, setOperateRow] = useState<API.TableColumns>()
    const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>(

    )
    const draftsColumns: ProColumns<API.TableColumns>[] = [
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
            key: 'object',
            title: (<FormattedMessage
                id="pages.repairment.issue.object"
                defaultMessage='Object'
            />),
            dataIndex: 'object',
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
                <Tag color={priorityList[record.priority??0].color}>
                    {priorityList[record.priority??0].text}
                </Tag>,
            fieldProps: {
                dropdownMatchSelectWidth: false,
            }
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
        },
        {
            key: 'tableOptions',
            title: (<FormattedMessage
                id="pages.repairment.searchTable.tableOptions"
                defaultMessage='Options'
            />),
            dataIndex: 'tableOptions',
            search: false,
            // width: 120,
            fixed: 'right',
            render: (_, record) =>
                <Space size={24}>
                    <CreateNew 
                        type='editLink'
                        initialValue={record}
                    />

                    <a onClick={() => {

                    }}
                    >删除</a>
                </Space>
        },
    ]
    return (
        <>
            <ProTable
                columns={draftsColumns}
                actionRef={actionRef}
                request={(params) => issueTableRule({ ...params, activeKey: 'drafts' })}
                tableLayout='fixed'
                rowKey='key'
                scroll={{ x: 1200 }}
                rowSelection={{
                    onChange: (_, selectedRows) => { setSelectedRows(selectedRows) },
                }}
                // search={{
                //     optionRender: false,
                //     collapsed: false,
                //     filterType: 'light',
                //     labelWidth: 'auto',
                //     // showHiddenNum: true,
                // }}
                search={false}
                toolbar={{
                    search: true,
                }}
                // toolbar={{
                //     search: true,
                // }}
                columnsState={{
                    value: columnsStateMap,
                    onChange: setColumnsStateMap,
                }}
            />
        </>
    )
}

export default DraftsTable