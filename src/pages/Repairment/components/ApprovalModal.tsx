import {
    ModalForm,
    ProCard,
    ProDescriptions,
    ProFormGroup,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
    ProFormUploadDragger
} from '@ant-design/pro-components'
import type { ProDescriptionsItemProps } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { Button, Form, message, Tag, Image, Space, Steps, Popover } from 'antd'
import React, { useState } from 'react'
import type { ReactNode } from 'react'

import { failureTypeLabel, priorityList, stepLabel, popContent } from '../struct'
import styles from '../index.less'
import { getStaff, getTrackingNumber } from '@/services/api'
import { ExportOutlined, ImportOutlined, ToolOutlined, TransactionOutlined } from '@ant-design/icons'

const { Step } = Steps
const { Divider } = ProCard

export type ModalProps = {
    currentStage: number;
    value: Partial<API.TableColumns>;
    responsive: boolean;
}

const ApprovalModal: React.FC<ModalProps> = props => {

    const [repairmentstage, setrepairmentstage] = useState<number>(2)
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
            title: <FormattedMessage id='pages.repairment.issue.issueDescription' defaultMessage='Description' />,
            dataIndex: 'issueDescription',
            span: 2,
        },
        {
            title: <FormattedMessage id="pages.repairment.issue.failureType" defaultMessage='Failure Type' />,
            dataIndex: 'failureType',
            valueEnum: failureTypeLabel,
            valueType: 'select',
        },
        {
            title: <FormattedMessage id="pages.repairment.issue.Manufacturer" defaultMessage='manufacturer' />,
            dataIndex: 'manufacturer',
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
        {
            title: <FormattedMessage id='pages.repairment.issue.picture' defaultMessage='Picture' />,
            dataIndex: 'picture',
            span: 2,
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
    ]

    const ApprovalForm = (
        <>
            <ProFormTextArea
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
                rules={[{
                    required: true,
                    message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                }]}
                fieldProps={{
                    // autoSize: { minRows: 2, maxRows: 6 },
                    showCount: true,
                }}
            />
            <ProFormSelect
                colProps={{ sm: 12, xs: 16 }}
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
                request={getStaff}
                params={{
                    staffType: 'all'
                }}
            />
        </>
    )

    const dispatchForm = (
        <>
            {/* 维修方式选择 */}
            <ProFormRadio.Group
                name="repairmentApproach"
                required
                radioType='button'
                label={intl.formatMessage({
                    id: 'pages.repairment.dispatchModal.repairmentApproach',
                    defaultMessage: 'repairment approach'
                })}
                // rules={[{
                //     required: true,
                //     message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                // }]}
                options={[
                    {
                        label: <FormattedMessage id="pages.repairment.dispatchModal.manufacturer" defaultMessage='manufacturer' />,
                        value: 0,
                    },
                    {
                        label: <FormattedMessage id="pages.repairment.dispatchModal.student" defaultMessage='student' />,
                        value: 1,
                    },
                    {
                        label: <FormattedMessage id="pages.repairment.dispatchModal.teacher" defaultMessage='teacher' />,
                        value: 2,
                    },
                ]}
                initialValue={approach}
                fieldProps={{
                    buttonStyle: 'solid',
                    // defaultValue: 0,
                    onChange: onApproachSelect
                }}
            />

            {/* 维修方式对应不同的表单项 */}
            {{
                0:
                    <ProFormGroup >
                        <ProFormText
                            colProps={{ md: 12 }}
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
                            colProps={{ md: 12 }}
                            // width='md'
                            name='trackingNumberInput'
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
                        colProps={{ sm: 12, xs: 16 }}
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
                        request={getStaff}
                        params={{
                            staffType: 'student',
                        }}
                    />,

                2:
                    <ProFormSelect
                        colProps={{ sm: 12, xs: 16 }}
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
                        request={getStaff}
                        params={{
                            staffType: 'teacher',
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
                labelPlacement='vertical'
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
                0:
                    <ProCard ghost>
                        <ProCard colSpan={10} className={styles.deliveryDetails} >
                            <ProDescriptions
                                layout='vertical'
                                // bordered
                                size='small'
                                title={<FormattedMessage
                                    id="pages.repairment.repairmentModal.deliveryDetails"
                                    defaultMessage='Delivery Details'
                                />}
                                labelStyle={{
                                    fontWeight: 'bolder'
                                }}
                                columns={[
                                    {
                                        title: <FormattedMessage
                                            id='pages.repairment.dispatchModal.trackingNumber'
                                            defaultMessage='tracking number' />,
                                        dataIndex: 'trackingNumber'
                                    },
                                    {
                                        title: <FormattedMessage
                                            id='pages.repairment.repairmentModal.deliveryCompany'
                                            defaultMessage='delivery company' />,
                                        dataIndex: 'deliveryCompany'
                                    },
                                    {
                                        title: <FormattedMessage
                                            id='pages.repairment.issue.shippingAddress'
                                            defaultMessage='shipping address' />,
                                        dataIndex: 'shippingAddress'
                                    },
                                ]}

                                request={getTrackingNumber}
                                column={1}
                            />
                        </ProCard>
                        <Divider />
                        <ProCard>
                            <ProFormText
                                name='consigneePhone'
                                required
                                colProps={{ span: 24 }}
                                label={intl.formatMessage({
                                    id: 'pages.repairment.repairmentModal.consigneePhone',
                                    defaultMessage: "consignee phone",
                                })}
                                rules={[{
                                    required: true,
                                    message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                                }]}
                            />
                            <ProFormUploadButton
                                name="receivingPhoto"
                                label={<FormattedMessage id="pages.repairment.repairmentModal.receivingPhotos" 
                                description='accept .jpg / .png / .jpeg'
                                defaultMessage='receiving photos' />}
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
                                extra={<FormattedMessage id="component.uploadPic.limit3" defaultMessage='up to three photos' />}
                            />
                        </ProCard>
                    </ProCard>,
                1:
                    <ProFormGroup>
                        <ProFormUploadDragger
                            name="quotationDocument"
                            label={<FormattedMessage
                                id="pages.repairment.repairmentModal.quotationDocument"
                                defaultMessage="quotation document"
                            />}
                            description="accept .doc / .png / .docx types"
                            rules={[{
                                required: true,
                                message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                            }]}
                        />
                        <ProFormSelect
                            colProps={{ sm: 12 }}
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
                            request={getStaff}
                            params={{
                                staffType: 'all'
                            }}
                        />
                        <ProFormText
                            name='consigneePhone'
                            required
                            colProps={{ sm: 12 }}
                            label={intl.formatMessage({
                                id: 'pages.repairment.repairmentModal.consigneePhone',
                                defaultMessage: "consignee phone",
                            })}
                            rules={[{
                                required: true,
                                message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                            }]}
                        />
                    </ProFormGroup>

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
            grid
            submitter={{
                searchConfig: {
                    submitText: ((props.currentStage === 3) ? {
                        0: <FormattedMessage id='pages.repairment.repairmentModal.confirm receipt' defaultMessage='Confirm Receipt'/>,
                        1: <FormattedMessage id='pages.repairment.repairmentModal.sendQuotation' defaultMessage='Send Quotation'/>,
                        2: <FormattedMessage id='pages.repairment.repairmentModal.repair complete' defaultMessage='Repair Confirm'/>,
                        3: <FormattedMessage id='component.button.sendingConfirm' defaultMessage='Sending Confirm'/>
                    }[repairmentstage]:
                        <FormattedMessage id='component.button.confirm' defaultMessage='Confirm'/>
                    )
                },
                render: (prop, dom) => {
                    return (props.currentStage === 3) ? {
                        0: [
                            <Popover 
                                key='problemPopover' 
                                title="签收常见问题"
                                content={popContent[0]}
                            >
                                <Button key='receiptProblem' type='link'>
                                    <FormattedMessage id="pages.repairment.repairmentModal.receiptProblem" defaultMessage='receipt problem' />
                                </Button>
                            </Popover>,
                            ...dom
                        ],
                        1: [
                            <Button key='quotationProblem' type='link'>
                                <FormattedMessage id="pages.repairment.repairmentModal.quotationProblem" defaultMessage='quotation problem' />
                            </Button>,
                            ...dom
                        ],
                        2: [
                            <Button key='urge'>
                                <FormattedMessage 
                                    id="pages.repairment.repairmentModal.urge"
                                    defaultMessage='urge'
                                />
                            </Button>,
                            ...dom
                        ],
                        3: [
                            <Button key='123' type='link'>催促</Button>,
                            ...dom
                        ]
                    }[repairmentstage]
                        : dom
                }
            }}
        >
            <ProCard ghost direction='column'>
                <ProCard>
                    <ProDescriptions
                        columns={issueColumns}
                        column={{
                            xs: 1,
                            sm: 1,
                            md: 2,
                        }}
                        dataSource={props.value}
                        bordered
                        labelStyle={{
                            fontWeight: 'bolder'
                        }}
                        size='middle'
                    />
                </ProCard>
                <Divider type='horizontal' />
                <ProCard>
                    {changeModal}
                </ProCard>
            </ProCard>
        </ModalForm>
    )
}

export default ApprovalModal;