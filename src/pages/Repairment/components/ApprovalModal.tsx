import {
    ModalForm,
    ProCard,
    ProDescriptions,
    ProFormGroup,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton
} from '@ant-design/pro-components'
import type { ProDescriptionsItemProps } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { Button, Form, message, Tag, Image, Space, Divider, Steps } from 'antd'
import React, { useState } from 'react'
import type { ReactNode } from 'react'

import { priorityList, stepLabel } from '../struct'
import styles from '../index.less'
import { getNextProcesser, getTrackingNumber } from '@/services/api'
import { ExportOutlined, ImportOutlined, ToolOutlined, TransactionOutlined } from '@ant-design/icons'
const { Step } = Steps

export type ModalProps = {
    currentStage: number;
    value: Partial<API.TableColumns>;
    responsive: boolean;
}

const ApprovalModal: React.FC<ModalProps> = props => {

    const [repairmentstage, setrepairmentstage] = useState(0)
    const [approach, setApproach] = useState<number>(0)
    const waitTime = (time: number) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, time)
        })
    }

    const onFinish = async (values: any) => {
        await waitTime(2000)
        console.log(values)
        message.success('submit successfully!')
        return true
    }

    const onApproachSelect = (e: any) => {
        setApproach(e.target.value)
    }


    const [form] = Form.useForm()
    const intl = useIntl();
    const issueColumns: ProDescriptionsItemProps[] = [
        {
            title: <FormattedMessage id='pages.repairment.issue.issueTitle' defaultMessage='Issue Title' />,
            dataIndex: 'issueTitle',
        },
        {
            title: <FormattedMessage id="pages.repairment.issue.object" defaultMessage='Object' />,
            dataIndex: 'object',
        },
        {
            title: <FormattedMessage id="pages.repairment.issue.failureType" defaultMessage='Failure Type' />,
            dataIndex: 'failureType',
            valueType: 'select',
        },
        {
            title: <FormattedMessage id="pages.repairment.issue.Manufacturer" defaultMessage='manufacturer' />,
            dataIndex: 'manufacturer',
        },
        {
            title: <FormattedMessage id='pages.repairment.issue.issueDescription' defaultMessage='Description' />,
            dataIndex: 'issueDescription',
            span: 2,
        },
        {
            title: <FormattedMessage id='pages.repairment.issue.picture' defaultMessage='Picture' />,
            dataIndex: 'picture',
            render: (_, item) => {
                const picGroup: ReactNode[] = []
                for (let i = 0; i < item.picture.length; i++) {
                    picGroup.push(
                        <Image
                            className={styles.approvalModalPicture}
                            src={item.picture[i]}
                            alt='123'
                        />)
                }
                return (
                    <Image.PreviewGroup>
                        <Space>
                            {picGroup}
                        </Space>
                    </Image.PreviewGroup>
                )
            }
        },
        {
            title: <FormattedMessage id='pages.repairment.issue.priority' defaultMessage='Priority' />,
            dataIndex: 'priority',
            render: (_, item) => (
                <Tag color={priorityList[item.priority].color}>
                    {priorityList[item.priority].text}
                </Tag>
            )
        },
        {
            title: <FormattedMessage id='pages.repairment.issue.estimatedTime' defaultMessage='Estimated Time' />,
            dataIndex: 'estimatedTime',
            valueType: 'dateTime',
        },
    ]

    const ApprovalForm = (
        <>
            <ProFormTextArea
                // width='lg'
                required
                name="approvalComments"
                label={intl.formatMessage({
                    id: "pages.repairment.issue.approval.comments",
                    defaultMessage: "approval comments"
                })}
                placeholder={intl.formatMessage({
                    id: 'component.textarea.placeholder',
                    defaultMessage: 'Please enter your approval comments'
                })}
                rules={[
                    {
                        required: true,
                        message: "this is a required field"
                    }
                ]}
                fieldProps={{
                    // autoSize: { minRows: 2, maxRows: 6 },
                    showCount: true,
                }}
            />
            <ProFormSelect
                width='md'
                name="nextProcesser"
                required
                label={intl.formatMessage({
                    id: 'pages.repairment.issue.nextProcesser',
                    defaultMessage: "next processer",
                })}
                rules={[{
                    required: true,
                    message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                }]}
                request={getNextProcesser}
            />
        </>
    )

    const dispatchForm = (
        <>
            {/* 维修方式选择 */}
            <ProFormRadio.Group
                width='md'
                name="repairmentApproach"
                required
                radioType='button'
                label={intl.formatMessage({
                    id: 'pages.repairment.dispatchModal.repairmentApproach',
                    defaultMessage: 'repairment approach'
                })}
                rules={[{
                    required: true,
                    message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                }]}
                options={[
                    {
                        label: <FormattedMessage id="pages.repairment.dispatchModal.manufacturer" defaultMessage='manufacturer'/>,
                        value: 0,
                    },
                    {
                        label: <FormattedMessage id="pages.repairment.dispatchModal.student" defaultMessage='student'/>,
                        value: 1,
                    },
                    {
                        label: <FormattedMessage id="pages.repairment.dispatchModal.teacher" defaultMessage='teacher'/>,
                        value: 2,
                    },
                ]}
                fieldProps={{
                    buttonStyle: 'solid',
                    defaultValue: 0,
                    onChange: onApproachSelect
                }}
            />

            {/* 维修方式对应不同的表单项 */}
            {{
                0:
                    <ProFormGroup>
                        <ProFormText
                            width='md'
                            name='manufacturer'
                            required
                            label={intl.formatMessage({
                                id: 'pages.repairment.dispatchModal.Manufacturer',
                                defaultMessage: "repairment manufacturer",
                            })}
                            rules={[{
                                required: true,
                                message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                            }]}
                        />
                        <ProFormText
                            width='md'
                            name=''
                            required
                            label={intl.formatMessage({
                                id: 'pages.repairment.dispatchModal.trackingNumber',
                                defaultMessage: "tracking number",
                            })}
                            rules={[{
                                required: true,
                                message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                            }]} />
                    </ProFormGroup>,


                1:
                    <ProFormSelect
                        width='md'
                        name="repairStaffStudent"
                        required
                        label={intl.formatMessage({
                            id: 'pages.repairment.dispatchModal.repairStaff',
                            defaultMessage: 'repair staff'
                        })}
                        rules={[{
                            required: true,
                            message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                        }]}
                        request={getNextProcesser}
                    />,

                2:
                    <ProFormSelect
                        width='md'
                        name="repairStaffTeacher"
                        required
                        label={intl.formatMessage({
                            id: 'pages.repairment.dispatchModal.repairStaff',
                            defaultMessage: 'repair staff'
                        })}
                        rules={[{
                            required: true,
                            message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                        }]}
                        valueEnum={{
                            0: 'Li Ju',
                            1: 'Liu Chengjian',
                            2: 'Li Fajun',
                        }}
                    />
            }[approach]}

            {/* 备注信息 */}
            <ProFormTextArea
                required
                name="dispatchComments"
                label={intl.formatMessage({
                    id: 'pages.repairment.issue.dispatch.comments',
                    defaultMessage: 'dispatch comments'
                })}
                placeholder={intl.formatMessage({
                    id: 'component.textarea.placeholder',
                    defaultMessage: 'Please enter your dispatch comments'
                })}
                rules={[{
                    required: true,
                    message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                }]}
                fieldProps={{
                    // autoSize: { minRows: 2, maxRows: 6 },
                    showCount: true,
                }}
            />
        </>)

    const repairmentForm = (
        <>
            <Steps
                current={repairmentstage}
            >
                <Step
                    title='签收'
                    icon={<ImportOutlined />}
                />
                <Step
                    title='报价'
                    icon={<TransactionOutlined />}
                />
                <Step
                    title='维修'
                    icon={<ToolOutlined />}
                />
                <Step
                    title='发出'
                    icon={<ExportOutlined />}
                />
            </Steps>
            <br />

            {{
                0: <>
                    <ProDescriptions 
                        columns={[{
                            title: <FormattedMessage id='pages.repairment.dispatchModal.trackingNumber' defaultMessage='tracking number' />,
                            dataIndex: 'trackingNumber',
                        }]}
                        request={getTrackingNumber}
                    />
                    <ProFormGroup>
                        <ProFormText
                            width='md'
                            name='123'
                            required
                            label={intl.formatMessage({
                                id: 'pages.repairment.dispatchModal.manufacturer',
                                defaultMessage: "repairment manufacturer",
                            })}
                            rules={[{
                                required: true,
                                message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                            }]}
                        />
                        <ProFormUploadButton 
                            name="upload"
                            label="Upload"
                            required
                            rules={[{
                                required: true,
                                message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                            }]}
                            max={3}
                            fieldProps={{
                              name: 'file',
                              listType: 'picture-card',
                            }}
                            action="/upload.do"
                            extra="支持最多三张照片"                    
                        />
                    </ProFormGroup></>
            }[repairmentstage]}
        </>
    )

    const changeModal = {
        1: ApprovalForm,
        2: dispatchForm,
        3: repairmentForm,
    }[props.currentStage]


    return (
        <ModalForm
            form={form}
            // width="70%"
            autoFocusFirstInput
            title={stepLabel[props.value.processDetails?.stage ?? 0]}
            trigger={
                <Button type="primary" size="large">
                    {props.children}
                </Button>
            }
            modalProps={{
                destroyOnClose: true,
            }}
            onFinish={onFinish}
        >
            <ProDescriptions
                columns={issueColumns}
                column={props.responsive ? 1 : 2}
                dataSource={props.value}
                bordered
            // size='middle'
            />

            <Divider />
            <ProCard>
                {changeModal}
            </ProCard>

        </ModalForm>
    )
}

export default ApprovalModal;