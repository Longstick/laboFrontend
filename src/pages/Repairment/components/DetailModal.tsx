// 详细信息弹出框

import React, { useState } from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import { Modal } from 'antd'  
import { issueDescColumns } from '../struct';

export type DetailModalProps = {
    isOpen?: boolean,
    onClose?: () => void,
    responsive?: boolean,
    value?: Partial<API.IssueInfo>,
}
 
const DetailModal: React.FC<DetailModalProps> = props => {

    return (
        <Modal
            open={props.isOpen}
            onCancel={props.onClose}
            footer={null}
            title={`工单 No.${props.value?.identifier}`}
            width={800}
        >
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
                        width: 120,
                        fontWeight: 'bolder'
                    }}
                />
        </Modal>
    )
}

export default DetailModal;