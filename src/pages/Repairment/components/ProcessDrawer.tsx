// 流程抽屉


import { getApporver, getIssueDetail } from '@/services/api';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';

import { Button, Drawer, Steps } from 'antd';
import { FormattedMessage, useModel } from '@umijs/max';

import React, { useEffect } from 'react';
import styles from '../index.less';
import ApprovalModal from './ApprovalModal';
import { stepLabel } from '../struct';

const { Step } = Steps;
const { Item } = ProDescriptions;

export type ProcessDrawerProps = {
    drawerOpen?: boolean;
    onClose?: () => void;
    value: string;
    responsive?: boolean;
};

const rejectdata = {
    reason: 'this computer is available',
    type: 1,
}

const ProcessDrawer: React.FC<ProcessDrawerProps> = (props) => {
    const { initialState } = useModel("@@initialState")
    const [issueDetail, setIssueDetail] = useState<API.Issue>()
    useEffect(() => {
        (async function getDetail(){
            await getIssueDetail(props.value)
        })()
        console.log(props.value)
    },[props.value])
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
                    dataIndex: 'result',
                },
                {
                    title: (
                        <FormattedMessage
                            id="pages.repairment.issue.approval.comments"
                            defaultMessage="Approval Comments"
                        />
                    ),
                    key: 'approvalComments',
                    dataIndex: 'comments',
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
            step: 'post',
            columns: [
                {
                    title: '快递单号',
                    key: 'TrackingNumber',
                    dataIndex: 'TrackingNumber',
                },

                {
                    title: '快递公司',
                    key: 'DeliveryComp',
                    dataIndex: 'DeliveryComp',
                },
                {
                    title: '寄件人联系电话',
                    key: 'senderPhone',
                    dataIndex: 'senderPhone',
                },
                {
                    title: '寄件人',
                    key: 'sender',
                    dataIndex: 'sender',
                },
            ],
        },
        4: {
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
        5: {
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

    const processerInfo = (
        <ProDescriptions<API.ProcesserInfo> request={getApporver} column={{ xs: 1, sm: 2, md: 2 }} size="middle" labelStyle={{ fontWeight: 'bolder' }}>
            <Item
                dataIndex="processer"
                label={
                    <FormattedMessage
                        id="pages.repairment.issue.processer"
                        defaultMessage="Processer"
                    />
                }
            />
            <Item
                dataIndex="phoneNumber"
                label={
                    <FormattedMessage
                        id="pages.repairment.issue.phoneNumber"
                        defaultMessage="Phone Number"
                    />
                }
            />
            <Item
                dataIndex="updateTime"
                label={
                    <FormattedMessage
                        id="pages.repairment.issue.updateTime"
                        defaultMessage="Update Time"
                    />
                }
            />
        </ProDescriptions>
    );

    const stepItem = (step: number, detailsData: any) => (
        <ProCard>
            {{
                'finish': (<>
                    {processerInfo}
                    {step !== 0 &&
                        <ProCard className={styles.processDrawerStepDetails}>

                            <ProDescriptions column={1} columns={ProcessDetailColumns[step].columns ?? {}} labelStyle={{ fontWeight: 'bolder' }} dataSource={detailsData ?? {}} />
                        </ProCard>
                    }
                </>),
                'process': (<>
                    {processerInfo}
                    {initialState?.userInfo?.identity === props.value?.currentProcesser && <ApprovalModal
                        currentStage={step}
                        value={props.value}
                        responsive={props.responsive}
                    >
                        {step === 4 ?
                            <FormattedMessage
                                id='pages.repairment.repairmentModal.progressEntry'
                                defaultMessage='Process Entry'
                            />
                            : stepLabel[step]
                        }
                    </ApprovalModal>}
                </>),
                'error': (<>
                    {processerInfo}
                    <ProCard className={styles.processDrawerRejectDetails}>
                        <ProDescriptions column={1} columns={rejectColumns} dataSource={rejectdata} labelStyle={{ fontWeight: 'bolder' }} />
                    </ProCard>
                </>),
                'wait': <></>,
            }[detailsData?.status]}
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

        >
            <Steps
                direction="vertical"
                current={props.value?.processDetails?.stage}
            >
                <Step
                    title={stepLabel[0]}
                    description={stepItem(0, {
                        ...props.value?.processDetails?.submit
                    })}
                    status={props.value?.processDetails?.submit?.status}
                />
                <Step
                    title={stepLabel[1]}
                    description={stepItem(1, props.value?.processDetails?.approval)}
                    status={props.value?.processDetails?.approval?.status}
                />
                <Step
                    title={stepLabel[2]}
                    description={stepItem(2, props.value?.processDetails?.dispatch)}
                    status={props.value?.processDetails?.dispatch?.status}
                />
                {/* <Step
                    title={stepLabel[3]}
                    description={stepItem(3, props.value?.processDetails?.post)}
                    status={props.value?.processDetails?.post?.status}
                /> */}
                <Step
                    title={stepLabel[4]}
                    description={stepItem(4, props.value?.processDetails?.repairment)}
                    status={props.value?.processDetails?.repairment?.status}
                />
                <Step
                    title={stepLabel[5]}
                    description={stepItem(5, props.value?.processDetails?.acceptance)}
                    status={props.value?.processDetails?.acceptance?.status}
                />
            </Steps>
        </Drawer>
    );
};

export default ProcessDrawer;
