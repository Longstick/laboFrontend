import { ProCard, ProColumns, ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import React from 'react';
import { ResourceInfoColumns, ResourceTypeEnum } from '../struct';


type EquipDetailProps = {
    equipment?: API.ResourceInfo

}

const EquipDetail: React.FC<EquipDetailProps> = (props) => {
    
    return(
        <ProDescriptions 
            bordered
            column={{xs:1, md:2}}
            columns={ResourceInfoColumns}
            dataSource={props.equipment}
            
            labelStyle={{
                fontWeight: 'bolder',
            }}
        />

    )
}

export default EquipDetail;