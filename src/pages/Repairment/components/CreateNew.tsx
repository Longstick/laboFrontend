// 新建工单/编辑提交弹出框表单

import {
    ProCard,
    ModalForm,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
    ProFormSelect,
    ProFormRadio,
    ProFormGroup,
    ProFormDatePicker,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';

import { Button, message, Popconfirm } from 'antd';
import { FormattedMessage } from '@umijs/max';

import React, { useState, useRef } from 'react';

import { waitTime } from '@/services/utils';
import moment from 'moment';
import { createNewIssue, getApporver, getResourceID, getStaff } from '@/services/api';
import { failureTypeLabel, priorityList } from '../struct';
import { UploadFile } from 'antd/es/upload';

export type CreateNewModalProps = {
    type?: 'newButton' | 'editLink'
    initialValue?: API.IssueInfo
}

const CreateNew: React.FC<CreateNewModalProps> = props => {
    const formRef = useRef<ProFormInstance>()

    // 因为重写页脚button，还是选择老方法用一个state控制open
    const [isOpen, setOpen] = useState<boolean>(false)

    // 图片需要使用form-data上传
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const onSave = async () => {
        await waitTime(1000)
        const value = formRef.current?.getFieldsFormatValue?.(true)
        setOpen(false)
    }

    const beforeUpload = (file: UploadFile) => {
        fileList.push(file)
        console.log(fileList)
        return false
    }

    return (
        <ModalForm
            formRef={formRef}
            title='新建工单'
            open={isOpen}
            initialValues={props.initialValue}
            trigger={
                props.type === 'newButton' ?
                    <Button
                        type='primary'
                        size='large'
                        onClick={() => { setOpen(true); }}
                    >新建工单</Button>
                    :
                    <a onClick={() => { setOpen(true); }}
                    >编辑提交</a>
            }
            grid
            rowProps={{
                gutter: [24, 24]
            }}
            modalProps={{
                destroyOnClose: true,
                maskClosable: false,
                onCancel: () => { setOpen(false) }
            }}

            submitter={{
                searchConfig: {
                    submitText: '提交'
                },
                render: (prop, dom) => [

                    <Button
                        key='cancel'
                        onClick={() => { setOpen(false) }}
                    >取消</Button>,

                    <Popconfirm
                        key='cancelConfirm'
                        title='确认暂存为草稿吗？'
                        onConfirm={onSave}
                    >
                        <Button
                            key='save'
                        >暂存</Button>
                    </Popconfirm>,

                    <Button
                        key='submit'
                        type='primary'
                        {...prop.submitButtonProps}
                        onClick={() => {
                            prop.submit()
                        }}
                    >提交</Button>
                ]
            }}
            onFinish={async value => {
                try {
                    // await waitTime(1000)
                    await createNewIssue(value)
                    console.log(value)

                    message.success('提交成功！')
                    setOpen(false)
                    return true
                } catch (e) {
                    message.error('提交失败！')
                    return false
                }

            }}

        >
            <ProCard split='horizontal'>
                <ProCard>
                    <ProFormText
                        name='title'
                        label='工单标题'
                        key='title'
                        colProps={{ span: 24 }}
                        rules={[{
                            required: true,
                            message: '此为必填项，请填写'
                        }]}
                    />

                    <ProFormTextArea
                        name='description'
                        label='工单描述'
                        key='description'
                        // colProps={{span: 24}}
                        fieldProps={{
                            showCount: true,
                            maxLength: 1000,
                            // autoSize: {minRows:2, maxRows:6},
                        }}
                        rules={[{
                            required: true,
                            message: '此为必填项，请填写'
                        }]}
                    />

                    <ProFormUploadButton
                        name='a'
                        label='上传相关图片'
                        key='picture'
                        listType='picture-card'
                        max={6}
                        fieldProps={{
                            multiple: true,
                            // beforeUpload: beforeUpload,
                            // fileList
                        }}
                        accept="image/*"
                        extra={<FormattedMessage id="component.uploadPic.limit3" defaultMessage='up to 6 photos' />}
                    // rules={[{
                    //     required: true,
                    //     message: '此为必填项，请填写'
                    // }]}
                    />
                </ProCard>

                <ProCard>
                    <ProFormGroup>
                        <ProFormSelect
                            name='resource'
                            label='工作对象'
                            key='resource'
                            colProps={{ sm: 12 }}
                            rules={[{
                                required: true,
                                message: '此为必填项，请填写'
                            }]}
                            request={getResourceID}
                            params={{ condition: 102 }}
                            // options={[
                            //     { label: '电脑', value: 'computers' },
                            //     { label: '设备', value: 'equipments' },
                            //     { label: '书本', value: 'books' },
                            // ]}

                        />
                        <ProFormSelect
                            name='type'
                            label='故障类型'
                            key='type'
                            colProps={{ sm: 12 }}
                            rules={[{
                                required: true,
                                message: '此为必填项，请填写'
                            }]}
                            valueEnum={failureTypeLabel}
                        />
                        <ProFormText
                            name='manufacturer'
                            label='厂商'
                            key='manufacturer'
                            colProps={{ sm: 12 }}
                            rules={[{
                                required: true,
                                message: '此为必填项，请填写'
                            }]}
                        />
                    </ProFormGroup>
                    <ProFormGroup>
                        <ProFormRadio.Group
                            name='priority'
                            label='优先级'
                            key='priority'
                            colProps={{ md: 6 }}
                            valueEnum={priorityList}
                            radioType='button'
                            fieldProps={{
                                buttonStyle: 'solid',
                            }}
                            rules={[{
                                required: true,
                                message: '此为必填项，请填写'
                            }]}
                        />

                        <ProFormDatePicker
                            name='finishDate'
                            label='时间期限'
                            key='finishDate'
                            colProps={{ md: 6 }}
                            rules={[{
                                required: true,
                                message: '此为必填项，请填写'
                            }]}
                            fieldProps={{
                                disabledDate: (date) => {
                                    return date <= moment().subtract(1, 'days')
                                }
                            }}
                        />

                        <ProFormSelect
                            name='next_person'
                            label='下一流程处理人'
                            key='next_person'
                            colProps={{ sm: 12 }}
                            rules={[{
                                required: true,
                                message: '此为必填项，请填写'
                            }]}
                            request={getApporver}
                            params={{ orderAuthType: 1 }}
                        />
                    </ProFormGroup>
                </ProCard>
            </ProCard>
        </ModalForm>
    )
}

export default CreateNew;