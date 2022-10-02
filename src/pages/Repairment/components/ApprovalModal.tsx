import {
    ModalForm,
    ProCard,
    ProDescriptions,
    ProFormGroup,
    ProFormRadio,
    ProFormRate,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
    ProFormUploadDragger
} from '@ant-design/pro-components'
import type { ProDescriptionsItemProps } from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { Button, Form, message, Tag, Image, Space, Steps, Popover, Switch, Typography } from 'antd'
import React, { useState } from 'react'
import type { ReactNode } from 'react'

import {
    failureTypeLabel,
    priorityList,
    stepLabel,
    popContent,
} from '../struct'

import styles from '../index.less'
import { getStaff, getTrackingNumber } from '@/services/api'
import { ExportOutlined, ImportOutlined, ToolOutlined, TransactionOutlined } from '@ant-design/icons'

const { Step } = Steps
const { Title } = Typography
const { Divider } = ProCard

export type ModalProps = {
    currentStage: number;
    value: Partial<API.TableColumns>;
    responsive: boolean;
}

const ApprovalModal: React.FC<ModalProps> = props => {

    const [repairmentstage, setrepairmentstage] = useState<number>(2)
    const [currentuser, setuser] = useState<boolean>(true)
    const [isurged, clickUrge] = useState<boolean>(false)
    const [approach, setApproach] = useState<number>(0)
    const waitTime = (time: number) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, time)
        })
    }

    const addStage = () => {
        if (repairmentstage < 3) {
            setrepairmentstage(repairmentstage + 1)
        }
    }
    const subStage = () => {
        if (repairmentstage > 0) {
            setrepairmentstage(repairmentstage - 1)
        }
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

    const approvalForm =
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


    const dispatchForm =
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
        </>

    const repairmentForm =
        <>
            <Steps
                current={repairmentstage}
                labelPlacement='vertical'
            >
                <Step
                    title={<FormattedMessage id="pages.repairment.repairmentModal.receipt" defaultMessage='Receipt' />}
                    icon={<ImportOutlined />}
                />
                <Step
                    title={<FormattedMessage id="pages.repairment.repairmentModal.quotation" defaultMessage='Quotation' />}
                    icon={<TransactionOutlined />}
                />
                <Step
                    title={<FormattedMessage id="pages.repairment.repairmentModal.repairment" defaultMessage='Repairment' />}
                    icon={<ToolOutlined />}
                />
                <Step
                    title={<FormattedMessage id="pages.repairment.repairmentModal.sending" defaultMessage='Sending' />}
                    icon={<ExportOutlined />}
                />
            </Steps>
            <br />

            {{
                0:
                    <ProCard
                        ghost
                        direction={props.responsive ? 'column' : 'row'}
                        gutter={[24, 24]}
                    // split={props.responsive ? 'horizontal' : 'vertical'}
                    // split='vertical'
                    >
                        <ProCard colSpan={{ md: 10 }} boxShadow style={{ borderRadius: 20 }}>
                            <ProDescriptions
                                // bordered
                                size='small'
                                // column={{ xs: 1, sm: 1, md: 2 }}
                                layout={props.responsive ? 'horizontal' : 'vertical'}
                                column={1}
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
                                            id='pages.repairment.repairmentModal.senderPhone'
                                            defaultMessage='sender phone' />,
                                        dataIndex: 'senderPhone'
                                    },
                                    {
                                        title: <FormattedMessage
                                            id='pages.repairment.repairmentModal.sender'
                                            defaultMessage='sender' />,
                                        dataIndex: 'sender'
                                    },
                                ]}
                                request={getTrackingNumber}
                            />
                        </ProCard>

                        <ProCard ghost>
                            <ProFormText
                                name='consigneePhone'
                                required
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
                                name="receiptPhoto"
                                label={<FormattedMessage id="pages.repairment.repairmentModal.receivingPhotos" defaultMessage='receipt photos' />}
                                required
                                rules={[{
                                    required: true,
                                    message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                                }]}
                                max={3}
                                fieldProps={{
                                    name: 'file',
                                    listType: 'picture-card',
                                    multiple: true,
                                }}
                                action="/upload.do"
                                extra={<FormattedMessage id="component.uploadPic.limit3" defaultMessage='up to 3 photos' />}
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
                            description={<FormattedMessage id="pages.repairment.repairmentModal.quotationUploadDesc" defaultMessage='accept .doc / .pdf / .docx / .txt ' />}
                            rules={[{
                                required: true,
                                message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                            }]}
                            fieldProps={{ multiple: true }}
                        />
                        <ProFormSelect
                            colProps={{ sm: 12 }}
                            name="quotationApprover"
                            required
                            label={intl.formatMessage({
                                id: 'pages.repairment.repairmentModal.quotationApprover',
                                defaultMessage: "quotation approver",
                            })}
                            rules={[{
                                required: true,
                                message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                            }]}
                            request={getStaff}
                            params={{ staffType: 'all' }}
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
                    </ProFormGroup>,
                2:
                    currentuser ?
                        <ProCard layout='center'>
                            <Title level={4}>
                                <FormattedMessage id="pages.repairment.repairmentModal.pleaseWait" defaultMessage='Please wait for the maintenance staff to complete their job.' />

                            </Title>
                        </ProCard>
                        :
                        <>
                            <ProFormTextArea
                                name='issueCause'
                                label={<FormattedMessage id="pages.repairment.issue.repairment.cause" defaultMessage='issue case' />}
                                rules={[{
                                    required: true,
                                    message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                                }]}
                            />
                            <ProFormTextArea
                                name='solution'
                                label={<FormattedMessage id="pages.repairment.issue.repairment.solution" defaultMessage='solution' />}
                                rules={[{
                                    required: true,
                                    message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                                }]}
                            />
                        </>,
                3:
                    <ProCard
                        ghost
                        direction={props.responsive ? 'column' : 'row'}
                        gutter={24}
                    // split={!props.responsive ? 'vertical' : undefined}
                    >
                        <ProCard ghost colSpan={{ md: 12, xs: 24 }}>
                            <ProFormText
                                // colProps={{ sm:24, md: 10 }}
                                name='sendingTrackingNumber'
                                required
                                label={intl.formatMessage({
                                    id: 'pages.repairment.dispatchModal.trackingNumber',
                                    defaultMessage: "tracking number",
                                })}
                                rules={[{
                                    required: true,
                                    message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                                }]}
                            />
                            <ProFormText
                                // colProps={{ sm:24, md: 10 }}
                                name='senderPhone'
                                required
                                label={intl.formatMessage({
                                    id: 'pages.repairment.repairmentModal.senderPhone',
                                    defaultMessage: "sender phone number",
                                })}
                                rules={[{
                                    required: true,
                                    message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                                }]} />
                        </ProCard>
                        <ProCard ghost>
                            <ProFormUploadButton
                                name="sendingPhotos"
                                label={<FormattedMessage id="pages.repairment.repairmentModal.sendingPhotos" defaultMessage='sending photos' />}
                                required
                                rules={[{
                                    required: true,
                                    message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                                }]}
                                max={3}
                                fieldProps={{
                                    multiple: true,
                                    name: 'file',
                                    listType: 'picture-card',
                                }}
                                action="/upload.do"
                                extra={<FormattedMessage id="component.uploadPic.limit3" defaultMessage='up to 3 photos' />}
                            />
                        </ProCard>
                    </ProCard>,
            }[repairmentstage]}
        </>


    const acceptanceForm =
        <ProCard
            ghost
            direction='column'
            gutter={[24, 24]}
        // split={props.responsive ? 'horizontal' : 'vertical'}
        // split='vertical'
        >
            <ProCard boxShadow style={{ borderRadius: 20 }}>
                <ProDescriptions
                    size='small'
                    // layout={props.responsive ? 'horizontal' : 'vertical'}
                    layout='horizontal'
                    column={2}
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
                                id='pages.repairment.repairmentModal.senderPhone'
                                defaultMessage='sender phone' />,
                            dataIndex: 'senderPhone'
                        },
                        {
                            title: <FormattedMessage
                                id='pages.repairment.repairmentModal.sender'
                                defaultMessage='sender' />,
                            dataIndex: 'sender'
                        },
                    ]}
                    request={getTrackingNumber}
                />
            </ProCard>

            <ProCard ghost gutter={[24, 0]} direction={props.responsive ? 'column' : 'row'}>
                <ProCard ghost>

                    <ProFormText
                        name='consigneePhone'
                        required
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
                        name="receiptPhoto"
                        label={<FormattedMessage id="pages.repairment.repairmentModal.receivingPhotos" defaultMessage='receipt photos' />}
                        required
                        rules={[{
                            required: true,
                            message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                        }]}
                        max={3}
                        fieldProps={{
                            name: 'file',
                            listType: 'picture-card',
                            multiple: true,
                        }}
                        action="/upload.do"
                        extra={<FormattedMessage id="component.uploadPic.limit3" defaultMessage='up to 3 photos' />}
                    />

                </ProCard>
                <ProCard ghost colSpan={{ md: 12 }}>
                    <ProFormRate
                        name="rating"
                        label={<FormattedMessage id="pages.repairment.issue.acceptance.rating" defaultMessage='rating' />}
                        required
                        rules={[{
                            required: true,
                            message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                        }]}
                    />
                    <ProFormTextArea
                        name='comments'
                        label={<FormattedMessage id="pages.repairment.issue.acceptance.comments" defaultMessage='comments' />}
                        required
                        rules={[{
                            required: true,
                            message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                        }]}
                        fieldProps={{
                            rows: 5,
                            maxLength: 1000,
                            showCount: true,
                        }}
                    />
                </ProCard>
            </ProCard>
        </ProCard>


    const changeModal = {
        1: approvalForm,
        2: dispatchForm,
        3: repairmentForm,
        4: acceptanceForm,
    }[props.currentStage]

    return (
        <ModalForm
            form={form}
            title={stepLabel[props.currentStage]}
            trigger={
                <Button type="primary" size="large">
                    {props.children}
                </Button>
            }
            modalProps={{
                destroyOnClose: true,
                maskClosable: false,
            }}
            onFinish={onFinish}
            grid
            submitter={{
                searchConfig: {
                    submitText: ((props.currentStage === 3) ? {
                        0: <FormattedMessage id='pages.repairment.repairmentModal.confirmReceipt' defaultMessage='Confirm Receipt' />,
                        1: <FormattedMessage id='pages.repairment.repairmentModal.sendQuotation' defaultMessage='Send Quotation' />,
                        2: (currentuser ?
                            <></> :
                            <FormattedMessage id='pages.repairment.repairmentModal.repairComplete' defaultMessage='Repair Confirm' />
                        ),
                        3: <FormattedMessage id='pages.repairment.repairmentModal.sendingConfirm' defaultMessage='Sending Confirm' />
                    }[repairmentstage] :
                        <FormattedMessage id='component.button.confirm' defaultMessage='Confirm' />)
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
                            <Popover
                                key='problemPopover'
                                title='报价常见问题'
                                content={popContent[1]}
                            >
                                <Button key='quotationProblem' type='link'>
                                    <FormattedMessage id="pages.repairment.repairmentModal.quotationProblem" defaultMessage='quotation problem' />
                                </Button>
                            </Popover>,
                            ...dom
                        ],
                        2: [
                            <Switch key='switch'
                                onChange={checked => setuser(checked)}
                                checked={currentuser}
                            />,
                            currentuser ?
                                <Button
                                    type='primary'
                                    key='urge'
                                    disabled={isurged}
                                    onClick={() => {
                                        clickUrge(true)
                                        message.success(intl.formatMessage({
                                            id: 'pages.repairment.repairmentModal.urgeSuccess',
                                            defaultMessage: 'Urged successfully, please wait patiently.'
                                        }))
                                    }}
                                >
                                    <FormattedMessage id="pages.repairment.repairmentModal.urge" defaultMessage='Urge' />
                                </Button> :
                                dom
                            ,
                            // ...dom
                        ],
                        3: dom
                    }[repairmentstage]
                        : dom
                }
            }}
        >
            <ProCard>
                <ProDescriptions
                    columns={issueColumns}
                    column={{
                        xs: 1,
                        sm: 2,
                        md: 2,
                    }}
                    layout={props.responsive ? 'vertical' : 'horizontal'}
                    dataSource={props.value}
                    bordered
                    labelStyle={{
                        fontWeight: 'bolder'
                    }}
                    size='middle'
                />

                <Button onClick={subStage}>
                    &lt;
                </Button>
                <Button onClick={addStage}>
                    &gt;
                </Button>

            </ProCard>
            <ProCard>
                {changeModal}
            </ProCard>
        </ModalForm>
    )
}

export default ApprovalModal;