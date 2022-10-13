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
import { getStaff } from '@/services/api';

const CreateNew: React.FC = () => {
    const formRef = useRef<ProFormInstance>()
    // 因为重写页脚button，还是选择老方法用一个state控制open
    const [isOpen, setOpen] = useState<boolean>(false)

    const onSave = async () => {
        await waitTime(1000)
        const value = formRef.current?.getFieldsFormatValue?.(true)
        console.log(value)
        setOpen(false)
    }

    return (
        <ModalForm
            formRef={formRef}
            title='新建工单'
            open={isOpen}
            trigger={
                <Button
                    type='primary'
                    size='large'
                    onClick={()=>{setOpen(true);}}
                >新建工单</Button>
            }
            grid
            rowProps={{
                gutter: [24, 24]
            }}
            modalProps={{
                destroyOnClose: true,
                maskClosable: false,
                onCancel: ()=>{setOpen(false)}
            }}
            submitter={{
                searchConfig: {
                    submitText: '提交'
                },
                render: (props, dom) => [

                    <Button
                        key='cancel'
                        onClick={() => {setOpen(false)}}
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
                        {...props.submitButtonProps}
                        onClick={()=>{
                            props.submit()
                            console.log(props.submitButtonProps)
                        }}
                    >提交</Button>
                ]
            }}
            onFinish={async value => {
                try{
                    await waitTime(1000)
                    message.success('提交成功！')
                    setOpen(false)
                    return true
                } catch(e) {
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
                        name='picture'
                        label='上传相关图片'
                        key='picture'
                        listType='picture-card'
                        max={6}
                        fieldProps={{
                            multiple: true,
                        }}
                        extra={<FormattedMessage id="component.uploadPic.limit3" defaultMessage='up to 3 photos' />}
                        rules={[{
                            required: true,
                            message: '此为必填项，请填写'
                        }]}
                    />
                </ProCard>

                <ProCard>
                    <ProFormGroup>
                        <ProFormSelect
                            name='workTarget'
                            label='工作对象'
                            key='workTarget'
                            colProps={{ sm: 12 }}
                            rules={[{
                                required: true,
                                message: '此为必填项，请填写'
                            }]}
                            options={[
                                {
                                    label: '3',
                                    value: 3,
                                }
                            ]}

                        />
                        <ProFormSelect
                            name='problemType'
                            label='故障类型'
                            key='problemType'
                            colProps={{ sm: 12 }}
                            rules={[{
                                required: true,
                                message: '此为必填项，请填写'
                            }]}
                            options={[
                                {
                                    label: '1',
                                    value: 1,
                                }
                            ]}
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
                            options={[
                                {
                                    label: '高',
                                    value: 'high',
                                },
                                {
                                    label: '中',
                                    value: 'medium',
                                },
                                {
                                    label: '低',
                                    value: 'low',
                                },
                            ]}
                            radioType='button'
                            // initialValue={problemtype}
                            fieldProps={{
                                buttonStyle: 'solid',
                            }}
                            rules={[{
                                required: true,
                                message: '此为必填项，请填写'
                            }]}
                        />

                        <ProFormDatePicker
                            name='estimatedTime'
                            label='时间期限'
                            key='estimatedTime'
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
                            name='nextProcesser'
                            label='下一流程处理人'
                            key='nextProcesser'
                            colProps={{ sm: 12 }}
                            rules={[{
                                required: true,
                                message: '此为必填项，请填写'
                            }]}
                            request={getStaff}
                            params={{ staffType: 'all' }}
                        />
                    </ProFormGroup>
                </ProCard>
            </ProCard>
        </ModalForm>
    )
}

export default CreateNew;