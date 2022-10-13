import React, { useState } from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import { Modal } from 'antd'  
import { issueColumns } from '../struct';

export type DetailModalProps = {
    isOpen?: boolean,
    onClose?: () => void,
    responsive?: boolean,
    value?: Partial<API.TableColumns>,
}

const DetailModal: React.FC<DetailModalProps> = props => {

    return (
        <Modal
            open={props.isOpen}
            onCancel={props.onClose}
            footer={null}
            title={`工单No.${props.value?.issueID}的详细信息`}
            width={800}
        >
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
                        width: 120,
                        fontWeight: 'bolder'
                    }}
                />
        </Modal>
    )
}

export default DetailModal;