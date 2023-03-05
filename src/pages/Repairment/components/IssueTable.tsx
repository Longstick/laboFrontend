// 工单表格

import { ActionType, ColumnsState, ProColumns, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Modal, Popconfirm, Space, Tag } from 'antd';
import ExportJsonExcel from 'js-export-excel';
import React, { useEffect, useRef, useState } from 'react';
import CreateNew from './CreateNew';
import ButtonGroup from 'antd/lib/button/button-group';
import { useModel } from '@umijs/max';

import { issueInfoColumns } from '../struct';
import { getIssueList } from '@/services/api';
import ProcessDrawer from './ProcessDrawer';
import moment from 'moment';
// import DetailCard from './DetailCard';

export type IssueTableProps = {
    onClose?: () => void;
    recordId?: string;
    responsive?: boolean;
    activeKey: string;
};

// 描述列配置
const columnsFilter: string[] = [

]

const IssueTable: React.FC<IssueTableProps> = (props) => {
    const [currentRow, setCurrentRow] = useState<API.IssueInfo>();
    const [selectedRowsState, setSelectedRows] = useState<API.IssueInfo[]>([]);
    const [rowSelect, setRowSelect] = useState<boolean>(false);
    const [processDrawerOpen, setProcessDrawer] = useState<boolean>(false);
    // const [detailModalOpen, setModalOpen] = useState<boolean>(false);
    const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
        object: { show: false },
        description: { show: false },
    });
    const [metaData, setMetaData] = useState<API.IssueInfo[]>([])
    const { initialState } = useModel('@@initialState');
    const actionRef = useRef<ActionType>();

    // 表格列配置
    const columns: ProColumns<API.IssueInfo>[] = [
        {
            key: 'tableOptions',
            title: '操作',
            dataIndex: 'tableOptions',
            valueType: 'option',
            search: false,
            width: props.responsive ? 60 : 120,
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
                    />) : (<>
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
                    </>);
            },
        },
        
        // 筛选的列配置
        ...issueInfoColumns(columnsFilter),
    ];

    // 关闭抽屉
    const onCloseProcessDrawer = () => { setProcessDrawer(false) }

    // 表格加载数据后回调，将数据存入state中，留给导出功能调用
    const onLoad = (dataSource: API.IssueInfo[]) => { setMetaData(dataSource) }

    // 选择行时回调
    const onSelectRowChange = (_: any, selectedRows: API.IssueInfo[]) => { setSelectedRows(selectedRows) }

    // const onCloseDetailModal = () => {
    //     setModalOpen(false);
    // };

    // 切换模块时触发表格刷新
    useEffect(() => {
        actionRef.current?.reloadAndRest?.()
    }, [props.activeKey])

    // 导出全部
    const downloadAllIssue = () => {
        const outputHead = columns.filter((arr: any) => arr.valueType !== 'option')
        const sheetData: any[] = []
        metaData.forEach((item: API.IssueInfo, index: number) => {
            const data = {}
            outputHead.forEach((el: ProColumns, i: number) => {
                const { dataIndex, valueEnum, title }: { dataIndex?: any, valueEnum?: object, title?: any } = el

                let value: any = undefined
                // 如果是一个二级的字段
                if (dataIndex instanceof Array) {
                    value = metaData[index][dataIndex[0]][dataIndex[1]]
                } else value = metaData[index][dataIndex]
                // 如果有枚举需要转化
                if (valueEnum) {
                    data[title] = valueEnum[value].text
                } else data[title] = value
            })
            sheetData.push(data)
        })
        const OutputHead = outputHead.map((item) => item.title)
        const outputOptions = {
            fileName: `${moment().format('YYYY_MM_DD_hh_mm_ss')}`,
            datas: [{
                sheetData: sheetData, // 数据
                sheetName: 'sheet',
                sheetFilter: OutputHead, // 表头
                sheetHeader: OutputHead, // 表头
            }]
        }
        const toExcel = new ExportJsonExcel(outputOptions)
        toExcel.saveExcel()
    }

    return (<>
        <ProTable<API.IssueInfo, {activeKey: string}>
            columns={columns}
            actionRef={actionRef}
            request={getIssueList}
            params={{ activeKey: props.activeKey }}
            onLoad={onLoad}
            // tableLayout="auto"
            rowKey="identifier"
            // defaultSize='large'
            scroll={{ x: 1600 }}
            search={{
                defaultCollapsed: false,
            }}
            rowSelection={
                rowSelect ? {
                    onChange: onSelectRowChange,
                    alwaysShowAlert: true,
                } : false
            }
            pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
            }}
            toolbar={{
                title: <Space size={16}>
                    <CreateNew type="newButton" tableActionRef={actionRef} key="CreateNew" />
                    <ButtonGroup key='ButtonGroup'>
                        <Button key="outputAll" onClick={() => { downloadAllIssue() }}>
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