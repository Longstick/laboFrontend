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

import { Button } from 'antd';
import { FormattedMessage } from '@umijs/max';

import React from 'react';

import { useForm } from 'antd/es/form/Form';
import { waitTime } from '@/services/utils';
import moment from 'moment';
import { getStaff } from '@/services/api';

const CreateNew: React.FC = () => {
    const [form] = useForm()

    return (
        <ModalForm
            form={form}
            title='新建工单'
            trigger={
                <Button
                    type='primary'
                // shape='round'
                >新建工单</Button>
            }
            grid
            rowProps={{
                gutter: [24, 24]
            }}
            modalProps={{
                destroyOnClose: true,
            }}
            onFinish={async value => {
                await waitTime(2000)
                console.log(value)
                return true
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
                                    label:'3',
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
                                    label:'1',
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
                                    return date <= moment().subtract(1, 'days')}
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
                            params={{staffType: 'all'}}
                        />
                    </ProFormGroup>
                </ProCard>
            </ProCard>
        </ModalForm>
    )
}

export default CreateNew;