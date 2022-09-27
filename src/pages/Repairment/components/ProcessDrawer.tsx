import { getApporver } from '@/services/api';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';

import { Drawer, Steps } from 'antd';
import { FormattedMessage } from '@umijs/max';

import React, { useRef, useState } from 'react';
import RcResizeObserver from 'rc-resize-observer';
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

const ProcessDrawer: React.FC<ProcessDrawerProps> = (props) => {

    const ProcessDetailColumns = {
        0: {
            step: 'submit',
            label: (stepLabel[0]),
            onClick: () => {
                
            },
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
            {current <= (props.value.processDetails?.stage ?? 0) ? (
                <>
                    {processerInfo}
                    {current === props.value.processDetails?.stage ?? 0 ? (
                        <ApprovalModal
                            currentStage={current}
                            value={props.value}
                            responsive={props.responsive}
                        >
                            {ProcessDetailColumns[current].label}
                        </ApprovalModal>
                    ) : (
                        <ProCard className={styles.processDrawerStepDetails}>
                            <ProDescriptions column={1} columns={ProcessDetailColumns[current].columns ?? {}} dataSource={detailsData ?? {}} />
                        </ProCard>
                    )}
                </>
            ) : (
                // <p>waiting previous processing</p>
                <></>
            )}
        </ProCard>
    );

    return (
        <Drawer width={600} open={props.drawerOpen} onClose={props.onClose} >
            <Steps direction="vertical" current={props.value?.processDetails?.stage}>
                <Step
                    title={stepLabel[0]}
                    description={stepItem(0, {
                        title: props.value.issueTitle,
                        description: props.value.issueDescription
                    })}
                />
                <Step
                    title={stepLabel[1]}
                    description={stepItem(1, props.value.processDetails?.approval)}
                />
                <Step
                    title={stepLabel[2]}
                    description={stepItem(2, props.value.processDetails?.dispatch)}
                />
                <Step
                    title={stepLabel[3]}
                    description={stepItem(3, props.value.processDetails?.repairment)}
                />
                <Step
                    title={stepLabel[4]}
                    description={stepItem(4, props.value.processDetails?.acceptance)}
                />
            </Steps>
        </Drawer>
    );
};

export default ProcessDrawer;
