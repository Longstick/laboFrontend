// 流程抽屉


import { getApporver, getIssueDetail, getUserInfo } from '@/services/api';
import { ActionType, ProCard, ProDescriptions } from '@ant-design/pro-components';

import { Button, Drawer, Space, Steps, Typography } from 'antd';
import { FormattedMessage, useModel } from '@umijs/max';

import React, { useEffect, useState } from 'react';
import styles from '../index.less';
import ApprovalModal from './ApprovalModal';
import { ProcesserDetailColumns, stepLabel } from '../struct';

const { Step } = Steps;
const { Item } = ProDescriptions;
const { Title } = Typography;
const { Divider } = ProCard

export type ProcessDrawerProps = {
    drawerOpen?: boolean;
    onClose?: () => void;
    value: API.IssueInfo;
    recordId?: string;
    responsive?: boolean;
    tableActionRef?: React.MutableRefObject<ActionType | undefined>;
};

const ProcessDrawer: React.FC<ProcessDrawerProps> = (props) => {
    const { initialState } = useModel("@@initialState")
    const [issueDetail, setIssueDetail] = useState<API.IssueInfo>()
    
    const GetIssueDetail = async () => {
        console.log(props.recordId)
        const res: API.AsyncResult = await getIssueDetail(props.recordId!)
        // 步骤顺序排序
        res.data.orderNodes.sort((a: API.OrderNode, b: API.OrderNode) => { return a.current_stage! - b.current_stage! })
        setIssueDetail(res.data)
    }

    const updateData = () =>{
        GetIssueDetail()
    }

    useEffect(()=>{
        console.log(111)
    })


    const StatusEnum = {
        1: '通过',
        2: '异常',
    }
    const ProcessDetailColumns = {
        0: {
            step: 'submit',
            columns: [
                {
                    label: '创建人',
                    key: 'username',
                    dataIndex: ['orderNodes', 0, 'now_user', 'username'],
                },
                {
                    label: '联系电话',
                    key: 'phone',
                    dataIndex: ['orderNodes', 0, 'now_user', 'phone'],
                },
                {
                    label: '创建时间',
                    key: 'create_time',
                    dataIndex: 'create_time',
                },
                {
                    label: '订单号',
                    key: 'identifier',
                    dataIndex: 'identifier',
                },
            ]
        },
        1: {
            step: 'approval',
            columns: [
                {
                    label: '审核结果',
                    key: 'approvalResult',
                    dataIndex: 'status',
                    valueEnum: StatusEnum
                },
                {
                    label: '备注',
                    key: 'approvalComments',
                    dataIndex: 'remark',
                },
            ],
        },
        2: {
            step: 'dispatch',
            columns: [
                {
                    label: '派发结果',
                    key: 'dispatchResult',
                    dataIndex: 'status',
                    valueEnum: StatusEnum

                },
                {
                    label: '备注',
                    key: 'dispatchComments',
                    dataIndex: 'remark',
                },
            ],
        },
        3: {
            step: 'repairment',
            columns: [
                {
                    label: '维修结果',
                    key: 'repairResult',
                    dataIndex: 'status',
                    valueEnum: StatusEnum
                },

                {
                    label: '故障原因',
                    key: 'reason',
                    dataIndex: 'reason',
                },
                {
                    label: '解决方案',
                    key: 'solution',
                    dataIndex: 'solution',
                },
            ],
        },
        4: {
            step: 'acceptance',
            columns: [
                {
                    label: '评分',
                    key: 'score',
                    dataIndex: 'score',
                    valueType: 'rate',
                },
                {
                    label: '评论',
                    key: 'remark',
                    dataIndex: 'remark',
                },
            ],
        },
    };

    // 已打回流程的详细
    const rejectColumns = [
        {
            title: (<FormattedMessage id='pages.repairment.issue.reject.reason' defaultMessage='reject reason' />),
            key: 'reason',
            dataIndex: 'reason',
        },
        {
            title: (<FormattedMessage id='pages.repairment.issue.reject.type' defaultMessage='reject type' />),
            key: 'type',
            dataIndex: 'type',
            valueType: 'select',
            valueEnum: {
                0: 'not real',
                1: 'can not be repaired',
                2: 'have no staff now',
            }
        },
    ]

    const processerInfo = (step: number) =>
        <ProDescriptions
            column={{ xs: 1, sm: 2, md: 2 }}
            columns={ProcesserDetailColumns}
            size="middle"
            labelStyle={{ fontWeight: 'bolder' }}
            dataSource={issueDetail?.orderNodes?.[step]}
        />


    const stepItem = (step: number) => {
        const orderNodeInfo = issueDetail?.orderNodes?.[step - 1]
        return <Step
            title={
                <h1 className={
                    orderNodeInfo ? styles.ProcessedStepTitle : styles.WaitingStepTitle
                }>{stepLabel[step - 1]}</h1>
            }
            description={
                <ProCard ghost>
                    {orderNodeInfo ? {
                        1: <>
                            {processerInfo(step - 1)}
                            <ProCard className={styles.processDrawerStepDetails}>
                                <ProDescriptions
                                    column={1}
                                    columns={ProcessDetailColumns[step - 1].columns}
                                    labelStyle={{ fontWeight: 'bolder' }}
                                    dataSource={issueDetail?.orderNodes![step - 1]}
                                />
                            </ProCard>
                        </>,
                        2: <>
                            {processerInfo(step - 1)}
                            {initialState?.userInfo?.id === issueDetail?.orderNodes![step - 1]?.now_user?.id ?
                                <ProCard layout='center'>
                                    <ApprovalModal
                                        currentStage={step - 1}
                                        value={props.value}
                                        responsive={props.responsive}
                                        onDrawerClose={props.onClose}
                                        tableActionRef={props.tableActionRef}
                                        updateDrawerData={updateData}
                                    >{stepLabel[step - 1]}</ApprovalModal>
                                    &nbsp;&nbsp;
                                    <Button
                                        size='large'
                                        className={styles.StepItemButton}
                                    >驳回</Button>
                                </ProCard>
                                :
                                <ProCard layout='center' className={styles.PatientWaiting}>请耐心等待处理哦</ProCard>
                            }
                        </>,
                    }[orderNodeInfo.status!]
                        :
                        <></>
                    }</ProCard>}

            status={orderNodeInfo ? {
                1: 'finish',
                2: 'process',
            }[orderNodeInfo.status!] : 'wait'}
        />
    }

    const step_Item = (step: number) => (
        <ProCard>
            {function stepRender() {
                const currentStep = issueDetail?.orderNodes?.length ?? 1
                if (step === currentStep) {
                    return <>
                        {processerInfo(step - 1)}
                        {initialState?.userInfo?.id === issueDetail?.orderNodes![step - 1]?.now_user?.id ?
                            <ProCard layout='center'>
                                <ApprovalModal
                                    currentStage={step - 1}
                                    value={props.value}
                                    responsive={props.responsive}
                                    onDrawerClose={props.onClose}
                                    updateDrawerData={updateData}
                                >{stepLabel[step - 1]}</ApprovalModal>
                                &nbsp;&nbsp;
                                <Button
                                    size='large'
                                    className={styles.StepItemButton}
                                >驳回</Button>
                            </ProCard>
                            :
                            <ProCard layout='center'>请耐心等待处理哦</ProCard>
                        }
                    </>
                }
                else if (step < currentStep) {
                    return <>
                        {processerInfo(step - 1)}
                        {step !== 1 &&
                            <ProCard className={styles.processDrawerStepDetails}>
                                <ProDescriptions
                                    column={1}
                                    columns={ProcessDetailColumns[step - 1].columns}
                                    labelStyle={{ fontWeight: 'bolder' }}
                                    dataSource={issueDetail?.orderNodes![step - 1]}
                                />
                            </ProCard>}
                    </>
                }
                else {
                    return <></>
                }
            }()}
        </ProCard>
    );

    return (
        <Drawer
            title={issueDetail?.identifier}
            width={props.responsive ? '100%' : 600}
            open={props.drawerOpen}
            onClose={props.onClose}
            // 调试信息
            // extra={
            //     <Button
            //         onClick={() => {
            //             console.log(props.value)
            //         }}

            //     >获取console信息</Button>
            // }
            destroyOnClose
        >

            <ProCard direction='column' ghost className={styles.SubmitDetail}>
                <div className={styles.SubmitDetailTitle}>提交信息</div>
                <ProCard ghost className={styles.SubmitDetailDesc}>
                    <ProDescriptions
                        columns={ProcessDetailColumns[0].columns}
                        labelStyle={{ fontWeight: 'bolder' }}
                        dataSource={props.value}
                        column={2}
                        size='small'
                    />
                </ProCard>
            </ProCard>
            <Divider type='horizontal' /><br />
            <Steps
                direction="vertical"
                current={(issueDetail?.orderNodes?.length ?? 1) - 1}
            >
                {/* {stepItem(1)} */}
                {stepItem(2)}
                {stepItem(3)}
                {stepItem(4)}
                {stepItem(5)}

            </Steps>
        </Drawer>
    );
};

export default ProcessDrawer;
