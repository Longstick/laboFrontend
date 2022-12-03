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

export type ProcessDrawerProps = {
    drawerOpen?: boolean;
    onClose?: () => void;
    value: API.IssueInfo;
    responsive?: boolean;
    tableActionRef?: React.MutableRefObject<ActionType | undefined>;
};

const rejectdata = {
    reason: 'this computer is available',
    type: 1,
}

const ProcessDrawer: React.FC<ProcessDrawerProps> = (props) => {
    const { initialState } = useModel("@@initialState")
    const [issueDetail, setIssueDetail] = useState<API.IssueInfo>()

    const StatusEnum = {
        1: '通过',
        2: '异常',
    }
    const ProcessDetailColumns = {
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
            dataSource={props.value?.orderNodes?.[step]}
        />


    const stepItem = (step: number) => {
        const orderNodeInfo = props.value?.orderNodes?.[step - 1]
        return <Step
            title={stepLabel[step - 1]}
            description={
                <ProCard>
                    {orderNodeInfo ? {
                        1: <>
                            {processerInfo(step - 1)}
                            {step !== 1 &&
                                <ProCard className={styles.processDrawerStepDetails}>
                                    <ProDescriptions
                                        column={1}
                                        columns={ProcessDetailColumns[step - 1].columns}
                                        labelStyle={{ fontWeight: 'bolder' }}
                                        dataSource={props.value?.orderNodes![step - 1]}
                                    />
                                </ProCard>}
                        </>,
                        2: <>
                            {processerInfo(step - 1)}
                            {initialState?.userInfo?.id === props.value?.orderNodes![step - 1]?.now_user?.id ?
                                <ProCard layout='center'>
                                    <ApprovalModal
                                        currentStage={step - 1}
                                        value={props.value}
                                        responsive={props.responsive}
                                        onDrawerClose={props.onClose}
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
                const currentStep = props.value?.orderNodes?.length ?? 1
                if (step === currentStep) {
                    return <>
                        {processerInfo(step - 1)}
                        {initialState?.userInfo?.id === props.value?.orderNodes![step - 1]?.now_user?.id ?
                            <ProCard layout='center'>
                                <ApprovalModal
                                    currentStage={step - 1}
                                    value={props.value}
                                    responsive={props.responsive}
                                    onDrawerClose={props.onClose}
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
                                    dataSource={props.value?.orderNodes![step - 1]}
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
            <Steps
                direction="vertical"
                current={(props.value?.orderNodes?.length ?? 1) - 1}
            // status={{
            //     0: 'error',
            //     1: 'finish',
            //     2: 'process',
            // }[props.value.status!]}
            >
                {stepItem(1)}
                {stepItem(2)}
                {stepItem(3)}
                {stepItem(4)}
                {stepItem(5)}
                {/* <Step
                    title={stepLabel[0]}
                    description={stepItem(1)}
                />
                <Step
                    title={stepLabel[1]}
                    description={stepItem(2)}
                />
                <Step
                    title={stepLabel[2]}
                    description={stepItem(3)}
                />
                <Step
                    title={stepLabel[3]}
                    description={stepItem(4)}
                />
                <Step
                    title={stepLabel[4]}
                    description={stepItem(5)}
                /> */}
            </Steps>
        </Drawer>
    );
};

export default ProcessDrawer;
