// 流程抽屉


import { getApporver, getIssueDetail, getUserInfo } from '@/services/api';
import { ActionType, ProCard, ProDescriptions } from '@ant-design/pro-components';

import { Button, Drawer, Steps } from 'antd';
import { FormattedMessage, useModel } from '@umijs/max';

import React, { useEffect, useState } from 'react';
import styles from '../index.less';
import ApprovalModal from './ApprovalModal';
import { ProcesserDetailColumns, stepLabel } from '../struct';

const { Step } = Steps;
const { Item } = ProDescriptions;

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
    // useEffect(() => {
    //     (async function getDetail() {
    //         const value = await getIssueDetail(props.value)
    //         setIssueDetail(value.data)
    //     })()
    // }, [props.value])
    // 已完成流程详细
    const ProcessDetailColumns = {
        1: {
            step: 'approval',
            columns: [
                {
                    title: (
                        <FormattedMessage
                            id="pages.repairment.issue.approval.result"
                            defaultMessage="Result"
                        />
                    ),
                    key: 'approvalResult',
                    dataIndex: 'status',
                },
                {
                    title: (
                        <FormattedMessage
                            id="pages.repairment.issue.approval.comments"
                            defaultMessage="Approval Comments"
                        />
                    ),
                    key: 'approvalComments',
                    dataIndex: 'remark',
                },
            ],
        },
        2: {
            step: 'dispatch',
            columns: [
                {
                    title: (
                        <FormattedMessage
                            id="pages.repairment.issue.dispatch.result"
                            defaultMessage="Result"
                        />
                    ),
                    key: 'dispatchResult',
                    dataIndex: 'result',
                },
                {
                    title: (
                        <FormattedMessage
                            id="pages.repairment.issue.dispatch.comments"
                            defaultMessage="comments"
                        />
                    ),
                    key: 'dispatchComments',
                    dataIndex: 'comments',
                },
            ],
        },
        3: {
            step: 'repairment',
            columns: [
                {
                    title: (
                        <FormattedMessage
                            id="pages.repairment.issue.repairment.result"
                            defaultMessage="Result"
                        />
                    ),
                    key: 'repairResult',
                    dataIndex: 'result',
                },

                {
                    title: (
                        <FormattedMessage
                            id="pages.repairment.issue.repairment.cause"
                            defaultMessage="Cause"
                        />
                    ),
                    key: 'cause',
                    dataIndex: 'cause',
                },
                {
                    title: (
                        <FormattedMessage
                            id="pages.repairment.issue.repairment.solution"
                            defaultMessage="Solution"
                        />
                    ),
                    key: 'solution',
                    dataIndex: 'solution',
                },
            ],
        },
        4: {
            step: 'acceptance',
            columns: [
                {
                    title: (
                        <FormattedMessage
                            id="pages.repairment.issue.acceptance.rating"
                            defaultMessage="Rating"
                        />
                    ),
                    key: 'rating',
                    dataIndex: 'rating',
                    valueType: 'rate',
                },
                {
                    title: (
                        <FormattedMessage
                            id="pages.repairment.issue.acceptance.comments"
                            defaultMessage="Comments"
                        />
                    ),
                    key: 'comments',
                    dataIndex: 'comments',
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


    const stepItem = (step: number) => (
        <ProCard>
            {function stepRender() {
                const currentStep = props.value?.orderNodes?.length ?? 1
                if (step === currentStep) {
                    return <>
                        {processerInfo(step - 1)}
                        {/* {initialState?.userInfo?.id === props.value?.orderNodes![step - 1].user_id && */}
                            <ApprovalModal
                                currentStage={step - 1}
                                value={props.value}
                                responsive={props.responsive}
                                onDrawerClose={props.onClose}
                            >{stepLabel[step - 1]}</ApprovalModal>
                        {/* } */}
                    </>
                }
                else if (step < currentStep) {
                    return <>
                        {processerInfo(step - 1)}
                        {step !== 1 &&
                            <ProCard className={styles.processDrawerStepDetails}>
                                <ProDescriptions
                                    column={1}
                                    columns={ProcessDetailColumns[step-1].columns}
                                    labelStyle={{ fontWeight: 'bolder' }}
                                    dataSource={props.value?.orderNodes![step-1]}
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
            extra={
                <Button
                    onClick={() => {
                        console.log(props.value)
                    }}

                >获取console信息</Button>
            }
            destroyOnClose
        >
            <Steps
                direction="vertical"
                current={(props.value?.orderNodes?.length ?? 1) - 1}
            >
                <Step
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
                />
            </Steps>
        </Drawer>
    );
};

export default ProcessDrawer;
