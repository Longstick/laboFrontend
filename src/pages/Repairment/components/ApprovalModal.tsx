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
import { stepLabel, issueDescColumns } from '../struct'
import { getStaff, getDeliveryInfo, getApporver, submitOnProccess, submitOnAcceptance } from '@/services/api'
import styles from '../index.less'
import DetailCard from './DetailCard'

const { Title } = Typography

export type ModalProps = {
    currentStage?: number;
    value?: Partial<API.IssueInfo>;
    responsive?: boolean;
    updateDrawerData?: () => void;
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
            // 验收流程因为接口需要发送form-data，不能复用，另外使用一个API
            if (props.currentStage === 4) {
                const formData = new FormData();
                Object.keys(values).map((item) => {
                    formData.append(item, values[item]);
                });
                formData.append('orderId', props.value!.id!)
                formData.append('status', '1')
                await submitOnAcceptance(formData);
            }
            // 前三个流程复用同一个API函数，通过currentStage控制接口地址
            else {
                const body = {
                    ...values,
                    orderId: props.value?.id,
                    status: 1,
                }
                const res = await submitOnProccess(props.currentStage!, body)
                if (res.code !== 1) {
                    message.error(res.msg)
                    throw new Error()
                }
            }

            message.success('提交成功！')
            // props.onDrawerClose?.()
            props.updateDrawerData?.()
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
                    orderAuthType: 2
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
                                    // width='md'
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
                                    params={{ orderAuthType: 1 }}
                                    fieldProps={{
                                        showSearch: true,
                                        showArrow: false,
                                    }}
                                />
                                <ProFormText
                                    name="phone"
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
                                    params={{ orderAuthType: 1 }}
                                    fieldProps={{
                                        showSearch: true,
                                        showArrow: false,
                                    }}
                                />
                                <ProFormText
                                    name="phone"
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
                                    params={{ orderAuthType: 1 }}
                                />
                                <ProFormText
                                    name="phone"
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
            <ProFormTextArea
                name='reason'
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
            <ProFormGroup>
                <ProFormText
                    name="phone"
                    colProps={{ sm: 12 }}
                    // width="md"
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
                {/* <ProFormText
                    name="logistics_num"
                    colProps={{ sm: 12 }}
                    width='md'
                    required
                    label="物流单号"
                    rules={[{
                        required: true,
                        message: '此为必填项',
                    }]}
                    fieldProps={{
                        allowClear: true,
                    }}
                /> */}
                <ProFormSelect
                    colProps={{ sm: 12, xs: 16 }}
                    name="next_person"
                    // width="md"
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
                        orderAuthType: 4
                    }}
                />

            </ProFormGroup>
        </>


    const acceptanceForm =
        <ProCard
            ghost
            direction='column'
            gutter={[24, 24]}
        >

            <ProCard ghost gutter={[24, 0]} direction={props.responsive ? 'column' : 'row'}>
                <ProCard ghost>

                    <ProFormText
                        name='phone'
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
                        name="a"
                        label={<FormattedMessage id="pages.repairment.repairmentModal.receivingPhotos" defaultMessage='receipt photos' />}
                        // required
                        // rules={[{
                        //     required: true,
                        //     message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                        // }]}
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
                        name="score"
                        label={<FormattedMessage id="pages.repairment.issue.acceptance.rating" defaultMessage='rating' />}
                        required
                        rules={[{
                            required: true,
                            message: <FormattedMessage id="component.formItem.required" defaultMessage='this is a required field' />
                        }]}
                    />
                    <ProFormTextArea
                        name='remark'
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
                <Button
                    type="primary"
                    size="large"
                    className={styles.StepItemButton}
                >
                    {props.children}
                </Button>
            }
            modalProps={{
                destroyOnClose: true,
                maskClosable: false,
            }}
            onFinish={onFinish}
            grid
        // layout='horizontal'
        >
            <ProCard bordered>
                <DetailCard
                    value={props.value}
                    responsive={props.responsive}
                />
            </ProCard>
            <ProCard>
                {changeModal}
            </ProCard>
        </ModalForm >
    )
}

export default ApprovalModal;