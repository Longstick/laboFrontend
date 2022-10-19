// 流程处理/审批弹出框


import {
    ModalForm,
    ProCard,
    ProDescriptions,
    ProFormDependency,
    ProFormGroup,
    ProFormRadio,
    ProFormRate,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
    ProFormUploadDragger
} from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { Button, Form, message, Steps, Popover, Switch, Typography } from 'antd'
import React, { useState } from 'react'
import {
    stepLabel,
    popContent,
    issueDescColumns,
} from '../struct'

import styles from '../index.less'
import { getStaff, getDeliveryInfo } from '@/services/api'
import { ExportOutlined, ImportOutlined, ToolOutlined, TransactionOutlined } from '@ant-design/icons'
import { waitTime } from "@/services/utils";

const { Step } = Steps
const { Title } = Typography

export type ModalProps = {
    currentStage?: number;
    value?: Partial<API.TableColumns>;
    responsive?: boolean;
}

const ApprovalModal: React.FC<ModalProps> = props => {

    const [repairmentstage, setrepairmentstage] = useState<number>(2)
    const [currentuser, setuser] = useState<boolean>(true)
    const [isurged, clickUrge] = useState<boolean>(false)

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
        message.success('提交成功！')
        return true
    }

    const [form] = Form.useForm()
    const intl = useIntl();

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
                    maxLength: 1000,
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
            <ProFormGroup>
                {/* 维修方式选择 */}
                <ProFormRadio.Group
                    name="repairStaff"
                    colProps={{ md: 12 }}
                    required
                    radioType='button'
                    label='维修人员'
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
                    initialValue={0}
                    fieldProps={{
                        buttonStyle: 'solid',
                    }}
                />
                {/* 维修方式对应不同的表单项 */}
                <ProFormDependency name={['repairStaff']}>
                    {({ repairStaff }) => {
                        switch (repairStaff) {
                            case 0:
                                return <ProFormText
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
                            case 1:
                                return <ProFormSelect
                                    colProps={{ sm: 12 }}
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
                                />
                            case 2:
                                return <ProFormSelect
                                    colProps={{ sm: 12 }}
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
                            default: return <></>
                        }
                    }
                    }
                </ProFormDependency>
            </ProFormGroup>

            <ProFormGroup>
                <ProFormRadio.Group
                    name="repairApproach"
                    colProps={{ md: 12 }}
                    required
                    radioType='button'
                    label='维修方式'

                    options={[
                        {
                            label: '现场维修',
                            value: 0,
                        },
                        {
                            label: '邮寄维修',
                            value: 1,
                        },
                    ]}
                    initialValue={0}
                    fieldProps={{
                        buttonStyle: 'solid',
                    }}
                />

                <ProFormDependency name={['repairApproach']}>
                    {({ repairApproach }) =>
                        repairApproach === 1 &&
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
                    }
                </ProFormDependency>
            </ProFormGroup>

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
                    maxLength: 1000,
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
                                request={getDeliveryInfo}
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
                                fieldProps={{
                                    maxLength: 1000,
                                    showCount: true,
                                }}
                            />
                            <ProFormTextArea
                                name='solution'
                                label={<FormattedMessage id="pages.repairment.issue.repairment.solution" defaultMessage='solution' />}
                                rules={[{
                                    required: true,
                                    message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                                }]}
                                fieldProps={{
                                    maxLength: 1000,
                                    showCount: true,
                                }}
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
        >
            {props.value?.processDetails?.dispatch?.approach === 0 &&
                <ProCard boxShadow style={{ borderRadius: 20 }}>
                    <ProDescriptions
                        size='small'
                        layout='horizontal'
                        column={{
                            xs: 1,
                            sm: 2,
                            md: 2,
                        }}
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
                        request={getDeliveryInfo}
                    />
                </ProCard>}
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
    }[props.currentStage ?? 0]

    return (
        <ModalForm
            form={form}
            title={stepLabel[props.currentStage ?? 0]}
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
                        ],
                        3: dom
                    }[repairmentstage]
                        : dom
                }
            }}
        >
            <ProCard>
                <ProDescriptions
                    columns={issueDescColumns}
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