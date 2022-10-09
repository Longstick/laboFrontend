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
    PageContainer,
} from '@ant-design/pro-components';

import { Button } from 'antd';
import { FormattedMessage } from '@umijs/max';

import React, { useState } from 'react';

import { useForm } from 'antd/es/form/Form';
import { waitTime } from '@/services/utils';
import moment from 'moment';
import { getStaff } from '@/services/api';


export type DraftProps = {
    dataSource?: API.TableColumns,
}

const Draft: React.FC<DraftProps> = props => 
    <ProCard>
        
    </ProCard>

const DraftsBox: React.FC = () => {
    return (
        <PageContainer >
            <ProCard 
                wrap
            >
                <ProCard></ProCard>

            </ProCard>
        </PageContainer>
    )
}
export default DraftsBox;