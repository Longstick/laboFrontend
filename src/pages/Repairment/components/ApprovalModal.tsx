// 流程处理/审批弹出框


import {
    ActionType,
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

import { getStaff, getDeliveryInfo, getApporver, submitOnProccess } from '@/services/api'

const { Title } = Typography

export type ModalProps = {
    currentStage?: number;
    value?: Partial<API.IssueInfo>;
    responsive?: boolean;
    onDrawerClose?: () => void;
    tableActionRef?: React.MutableRefObject<ActionType | undefined>;
}

const ApprovalModal: React.FC<ModalProps> = props => {

    const [currentuser, setuser] = useState<boolean>(true)
    const [isurged, clickUrge] = useState<boolean>(false)

    const [form] = Form.useForm()
    const intl = useIntl();

    const onFinish = async (values: any) => {
        try {
            const body = {
                ...values,
                orderId: props.value?.id,
                status: 1,
            }
            console.log(body)
            const res = await submitOnProccess(props.currentStage!, body)
            if (res.code !== 1) {
                message.error(res.msg)
                throw new Error()
            }
            message.success('提交成功！')
            props.onDrawerClose?.()
            props.tableActionRef?.current?.reloadAndRest?.()
            return true
        } catch (err) {
            message.error(`提交失败！`)
            return false
        }
    }

    const approvalForm =
        <>
            <ProFormTextArea
                required
                name="opinion"
                label='审核意见'
                placeholder='请输入审批意见'
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
                name="next_person"
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
                request={getApporver}
                params={{
                    orderAuthType: 1
                }}
            />
        </>


    const dispatchForm =
        <>
            {/* 维修方式选择 */}
            <ProFormRadio.Group
                name="handle_method"
                colProps={{ md: 12 }}
                required
                radioType='button'
                label='维修人员'
                options={[
                    {
                        label: '厂商维修',
                        value: '厂商维修',
                    },
                    {
                        label: '学生维修',
                        value: '学生维修',
                    },
                    {
                        label: '教职维修',
                        value: '教职维修',
                    },
                ]}
                initialValue='厂商维修'
                fieldProps={{
                    buttonStyle: 'solid',
                }}
            />

            {/* 维修方式对应不同的表单项 */}
            <ProFormDependency name={['handle_method']}>
                {({ handle_method }) => {
                    if (handle_method === '厂商维修') {

                    }
                    switch (handle_method) {
                        case '厂商维修':
                            return <ProFormGroup grid>
                                <ProFormRadio.Group
                                    name="repair_method"
                                    width='md'
                                    colProps={{ sm: 12 }}
                                    required
                                    radioType='button'
                                    label='维修方式'
                                    options={[
                                        {
                                            label: '现场维修',
                                            value: '现场维修',
                                        },
                                        {
                                            label: '邮寄维修',
                                            value: '邮寄维修',
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
                                    name='repair_manufacturer'
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
                                    name="next_person"
                                    required
                                    label={intl.formatMessage({
                                        id: 'pages.repairment.dispatchModal.repairStaff',
                                        defaultMessage: 'repair staff'
                                    })}
                                    rules={[{
                                        required: true,
                                        message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                                    }]}
                                    request={getApporver}
                                    params={{ orderAuthType: 2 }}
                                    fieldProps={{
                                        showSearch: true,
                                        showArrow: false,
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


                        case '学生维修':
                            return <ProFormGroup grid>
                                <ProFormSelect
                                    colProps={{ sm: 12 }}
                                    width='md'
                                    name="next_person"
                                    required
                                    label={intl.formatMessage({
                                        id: 'pages.repairment.dispatchModal.repairStaff',
                                        defaultMessage: 'repair staff'
                                    })}
                                    rules={[{
                                        required: true,
                                        message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                                    }]}
                                    request={getApporver}
                                    params={{ orderAuthType: 2 }}
                                    fieldProps={{
                                        showSearch: true,
                                        showArrow: false,
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
                        case '教职维修':
                            return <ProFormGroup grid>
                                <ProFormSelect
                                    colProps={{ sm: 12 }}
                                    width='md'
                                    name="next_person"
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
                                    request={getApporver}
                                    params={{ orderAuthType: 2 }}
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
                        default: return <></>
                    }
                }
                }
            </ProFormDependency>

            {/* 备注信息 */}
            <ProFormTextArea
                required
                name="opinion"
                label='备注'
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
                </>
            }
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
                    submitText:
                        (props.currentStage === 3) ?
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