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
import type {ActionType} from '@ant-design/pro-components'
import { FormattedMessage, useIntl } from '@umijs/max'

import { Button, Form, message, Switch, Typography, UploadFile } from 'antd'
import React, { useState } from 'react'
import { stepLabel, issueDescColumns } from '../struct'
import { getStaff, getDeliveryInfo, getApporver, submitOnProccess, submitOnAcceptance } from '@/services/api'
import styles from '../index.less'
import DetailCard from './DetailCard'
import type { UploadChangeParam } from 'antd/es/upload'

const { Title } = Typography

export type ModalProps = {
    // 流程当前阶段
    currentStage?: number;
    // 父组件传入的工单信息
    value?: Partial<API.IssueInfo>;
    // 响应式
    responsive?: boolean;
    // 调用父组件的更新函数
    updateDrawerData?: () => Promise<void>;
    // 表格组件的操作Ref
    tableActionRef?: React.MutableRefObject<ActionType | undefined>;
}

const ApprovalModal: React.FC<ModalProps> = props => {

    // const [currentuser, setuser] = useState<boolean>(true)
    // const [isurged, clickUrge] = useState<boolean>(false)
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [form] = Form.useForm()
    const intl = useIntl();

    // 图片上传修改回调函数
    const onPicChange = (info: UploadChangeParam) => {
        setFileList(info.fileList)
    }
    // 提交表单回调函数
    const onFinish = async (values: any) => {
        try {
            // 验收流程因为接口需要发送form-data，不能复用，另外使用一个API
            if (props.currentStage === 4) {
                const formData = new FormData();
                Object.keys(values).map((item) => {
                    formData.append(item, values[item]);
                });
                //form-data中添加文件
                fileList.forEach((file) => {
                    formData.append(file.uid, file.originFileObj!)
                })
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
            // 调用抽屉的刷新函数，提交成功后抽屉重新刷新加载数据
            props.updateDrawerData?.()
            // 调用表格的刷新重载函数
            props.tableActionRef?.current?.reloadAndRest?.()
            return true
        } catch (err) {
            message.error(`提交失败！`)
            return false
        }
    }


    // 审批表单
    const approvalForm = <>
        <ProFormTextArea
            required
            name="opinion"
            label='审核意见'
            placeholder='请输入审批意见'
            rules={[{
                required: true,
                message: <FormattedMessage id="component.formItem.required" />
            }]}
            fieldProps={{
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
            label='下一流程处理人'
            rules={[{
                required: true,
                message: <FormattedMessage id="component.formItem.required" />
            }]}
            request={getApporver}
            params={{ orderAuthType: 2 }}
        />
    </>

    // 派发表单
    const dispatchForm = <>
        {/* 维修方式选择 */}
        <ProFormRadio.Group
            name="handle_method"
            colProps={{ md: 12 }}
            required
            radioType='button'
            label='维修人员'
            options={[
                { label: '厂商维修', value: '厂商维修' },
                { label: '学生维修', value: '学生维修' },
                { label: '教职维修', value: '教职维修' },
            ]}
            initialValue='厂商维修'
            fieldProps={{
                buttonStyle: 'solid',
            }}
        />

        {/* 维修方式对应不同的表单项 */}
        <ProFormDependency name={['handle_method']}>
            {({ handle_method }) =>
                <ProFormGroup grid>
                    {handle_method === '厂商维修' ?
                        <ProFormGroup>
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
                                label="维修厂商"
                                rules={[{
                                    required: true,
                                    message: <FormattedMessage id="component.formItem.required" />
                                }]}
                            />
                        </ProFormGroup> : <></>
                    }

                    {/* TODO: 获取不同类别的维修人员的参数，这里不知道是什么 */}
                    <ProFormSelect
                        colProps={{ sm: 12 }}
                        width='md'
                        name="next_person"
                        required
                        label="负责人"
                        rules={[{
                            required: true,
                            message: <FormattedMessage id="component.formItem.required" />
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
                            message: <FormattedMessage id="component.formItem.required" />,
                        }]}
                        fieldProps={{
                            allowClear: true,
                        }}
                    />
                </ProFormGroup>
            }
        </ProFormDependency>

        {/* 备注信息 */}
        <ProFormTextArea
            required
            name="opinion"
            label='备注'
            placeholder={intl.formatMessage({ id: 'component.textarea.placeholder' })}
            rules={[{
                required: true,
                message: <FormattedMessage id="component.formItem.required" />
            }]}
            fieldProps={{
                // autoSize: { minRows: 2, maxRows: 6 },
                maxLength: 1000,
                showCount: true,
            }}
        />
    </>

    // 维修表单
    const repairmentForm = <>
        <ProFormTextArea
            name='reason'
            label={<FormattedMessage id="pages.repairment.issue.repairment.cause" defaultMessage='issue case' />}
            rules={[{
                required: true,
                message: <FormattedMessage id="component.formItem.required" />
            }]}
            fieldProps={{
                maxLength: 1000,
                showCount: true,
            }}
        />
        <ProFormTextArea
            name='solution'
            label={<FormattedMessage id="pages.repairment.issue.repairment.solution" />}
            rules={[{
                required: true,
                message: <FormattedMessage id="component.formItem.required" />
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
                    message: <FormattedMessage id="component.formItem.required" />
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
                label="下一流程处理人"
                rules={[{
                    required: true,
                    message: <FormattedMessage id="component.formItem.required" />
                }]}
                request={getApporver}
                params={{
                    orderAuthType: 4
                }}
            />
        </ProFormGroup>
    </>

    // 验收表单
    const acceptanceForm =
        <ProCard ghost direction='column' gutter={[24, 24]}>
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
                    <ProFormUploadButton
                        name="images"
                        label="上传验收图片"
                        key="images"
                        listType="picture-card"
                        value={fileList}
                        max={3}
                        fieldProps={{
                            maxCount: 3,
                            multiple: true,
                            beforeUpload: () => false,
                            onChange: onPicChange,
                        }}
                        accept="image/*"
                        extra='最多上传三张照片，图片格式支持 .jpg / .png / .jpeg'
                    />
                </ProCard>
            </ProCard>
        </ProCard>


    // 通过props中的参数来按需装载表单
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
                >{props.children}</Button>
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