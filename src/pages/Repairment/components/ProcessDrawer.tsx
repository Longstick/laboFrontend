import { getApporver } from '@/services/api';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';

import { Drawer, Steps } from 'antd';
import { FormattedMessage } from '@umijs/max';

import React from 'react';
import styles from '../index.less';
import ApprovalModal from './ApprovalModal';
import { stepLabel } from '../struct';

const { Step } = Steps;
const { Item } = ProDescriptions;

export type ProcessDrawerProps = {
    drawerOpen: boolean;
    onClose: () => void;
    value: Partial<API.TableColumns>;
    responsive: boolean;
};

const rejectdata = {
    reason: 'this computer is available',
    type: 1,
}

const ProcessDrawer: React.FC<ProcessDrawerProps> = (props) => {

    const ProcessDetailColumns = {
        0: {
            step: 'submit',
            label: (stepLabel[0]),
            columns: [
                {
                    title: (
                        <FormattedMessage
                            id='pages.repairment.issue.issueTitle'
                            defaultMessage="Title"
                        />
                    ),
                    key: 'title',
                    dataIndex: 'title',
                },
                {
                    title: (
                        <FormattedMessage
                            id='pages.repairment.issue.issueDescription'
                            defaultMessage="Description"
                        />
                    ),
                    key: 'description',
                    dataIndex: 'description',
                },
            ]
        },
        1: {
            step: 'approval',
            label: (stepLabel[1]),
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
            label: (stepLabel[2]),
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
            label: (stepLabel[3]),
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
            label: (stepLabel[4]),
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
        <ProDescriptions<API.ProcesserInfo> request={getApporver} column={2} size="middle">
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

    const stepItem = (current: number, detailsData: any) => (
        <ProCard>
            {{
                'finish': (<>
                    {processerInfo}
                    <ProCard className={styles.processDrawerStepDetails}>
                        <ProDescriptions column={1} columns={ProcessDetailColumns[current].columns ?? {}} dataSource={detailsData ?? {}} />
                    </ProCard>
                </>),
                'process': (<>
                    {processerInfo}
                    <ApprovalModal
                        currentStage={current}
                        value={props.value}
                        responsive={props.responsive}
                    >
                        {current === 3 ?
                            <FormattedMessage 
                                id='pages.repairment.repairmentModal.progressEntry'
                                defaultMessage='Process Entry'
                            />
                            : ProcessDetailColumns[current].label
                        }
                    </ApprovalModal>
                </>),
                'error': (<>
                    {processerInfo}
                    <ProCard className={styles.processDrawerRejectDetails}>
                        <ProDescriptions column={1} columns={rejectColumns} dataSource={rejectdata} />
                    </ProCard>
                </>),
                'wait': <></>,
            }[detailsData?.status]}
        </ProCard>
    );

    return (
        <Drawer width={600} open={props.drawerOpen} onClose={props.onClose} >
            <Steps
                direction="vertical"
                current={props.value?.processDetails?.stage}
            // status='error'

            >
                <Step
                    title={stepLabel[0]}
                    description={stepItem(0, {
                        title: props.value.issueTitle,
                        description: props.value.issueDescription,
                        ...props.value.processDetails?.submit
                    })}
                    status={props.value.processDetails?.submit?.status}
                />
                <Step
                    title={stepLabel[1]}
                    description={stepItem(1, props.value.processDetails?.approval)}
                    status={props.value.processDetails?.approval?.status}
                />
                <Step
                    title={stepLabel[2]}
                    description={stepItem(2, props.value.processDetails?.dispatch)}
                    status={props.value.processDetails?.dispatch?.status}
                />
                <Step
                    title={stepLabel[3]}
                    description={stepItem(3, props.value.processDetails?.repairment)}
                    status={props.value.processDetails?.repairment?.status}
                />
                <Step
                    title={stepLabel[4]}
                    description={stepItem(4, props.value.processDetails?.acceptance)}
                    status={props.value.processDetails?.acceptance?.status}
                />
            </Steps>
        </Drawer>
    );
};

export default ProcessDrawer;
