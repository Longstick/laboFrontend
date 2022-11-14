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
} from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { Button, Form, message, Switch, Typography } from 'antd'
import React, { useState } from 'react'
import {
    stepLabel,
    issueDescColumns,
} from '../struct'

import { getStaff, getDeliveryInfo } from '@/services/api'
import { waitTime } from "@/services/utils";

const { Title } = Typography

export type ModalProps = {
    currentStage?: number;
    value?: Partial<API.TableColumns>;
    responsive?: boolean;
}

const ApprovalModal: React.FC<ModalProps> = props => {

    const [currentuser, setuser] = useState<boolean>(true)
    const [isurged, clickUrge] = useState<boolean>(false)

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
                fieldProps={{
                    showSearch: true,
                }}
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
                            return <ProFormGroup grid>
                                <ProFormRadio.Group
                                    name="repairApproach"
                                    width='md'
                                    colProps={{ sm: 12 }}
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

                                <ProFormText
                                    colProps={{ sm: 12 }}
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


                                <ProFormSelect
                                    colProps={{ sm: 12 }}
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
                                    request={getStaff}
                                    fieldProps={{
                                        showSearch: true,
                                        showArrow: false,
                                    }}
                                    params={{
                                        staffType: 'all',
                                    }}
                                />
                                <ProFormText
                                    name="phoneNumber"
                                    colProps={{ sm: 12 }}
                                    width='md'
                                    required
                                    label="联系电话"
                                    rules={[{
                                        required: true,
                                        message: '此为必填项',
                                    }]}
                                    fieldProps={{
                                        allowClear: true,
                                    }}
                                />
                            </ProFormGroup>


                        case 1:
                            return <>

                                <ProFormSelect
                                    colProps={{ sm: 12 }}
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
                                    request={getStaff}
                                    fieldProps={{
                                        showSearch: true,
                                        showArrow: false,
                                    }}
                                    params={{
                                        staffType: 'student',
                                    }}
                                />
                                <ProFormText
                                    name="phoneNumber"
                                    colProps={{ sm: 12 }}
                                    width='md'
                                    required
                                    label="联系电话"
                                    rules={[{
                                        required: true,
                                        message: '此为必填项',
                                    }]}
                                    fieldProps={{
                                        allowClear: true,
                                    }}
                                />
                            </>
                        case 2:
                            return <>
                                <ProFormText
                                    name="phoneNumber"
                                    colProps={{ sm: 12 }}
                                    width='md'
                                    required
                                    label="联系电话"
                                    rules={[{
                                        required: true,
                                        message: '此为必填项',
                                    }]}
                                    fieldProps={{
                                        allowClear: true,
                                    }}
                                />
                                <ProFormSelect
                                    colProps={{ sm: 12 }}
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
                                    fieldProps={{
                                        showSearch: true,
                                        showArrow: false,
                                    }}
                                    request={getStaff}
                                    params={{
                                        staffType: 'teacher',
                                    }}
                                />
                            </>
                        default: return <></>
                    }
                }
                }
            </ProFormDependency>

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


    const postForm =
        <ProCard ghost gutter={[24, 0]} direction={props.responsive ? 'column' : 'row'}>
            <ProCard ghost>
                <ProFormText
                    name="senderPhone"
                    label="寄件人联系电话"
                    // colProps={{ md: 12 }}
                    rules={[{
                        required: true,
                        message: '此为必填项，请填写',
                    }]}
                />
                <ProFormText
                    name="sender"
                    label="寄件人"
                    rules={[{
                        required: true,
                        message: '此为必填项，请填写',
                    }]}
                // colProps={{ md: 12 }}
                />
                <ProFormText
                    name="deliveryComp"
                    label="快递公司"
                // colProps={{ md: 12 }}
                />
            </ProCard>
            <ProCard ghost>
                <ProFormUploadButton
                    name='picture'
                    label='相关照片'
                    listType='picture-card'
                    max={5}
                    fieldProps={{
                        multiple: true,
                    }}
                    extra='最多上传五张照片，图片格式支持 .jpg / .png / .jpeg'
                />

            </ProCard>
        </ProCard>


    const repairmentForm =
        <>
            {currentuser ?
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
                </>}
        </>


    const acceptanceForm =
        <ProCard
            ghost
            direction='column'
            gutter={[24, 24]}
        >
            {/* {props.value?.processDetails?.dispatch?.approach === 0 &&
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
                </ProCard>} */}
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
        3: postForm,
        4: repairmentForm,
        5: acceptanceForm,
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
                    submitText:
                        (props.currentStage === 4) ?
                            currentuser ?
                                <></> :
                                <FormattedMessage id='pages.repairment.repairmentModal.repairComplete' defaultMessage='Repair Confirm' />

                            :
                            <FormattedMessage id='component.button.confirm' defaultMessage='Confirm' />
                },

                render: (prop, dom) => {
                    return (props.currentStage === 4) ?
                        [
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
                                </Button>
                                : dom

                        ] : dom
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

            </ProCard>
            <ProCard>
                {changeModal}
            </ProCard>
        </ModalForm >
    )
}

export default ApprovalModal;