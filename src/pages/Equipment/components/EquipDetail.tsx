import { ProCard, ProColumns, ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import React from 'react';
import { ResourceInfoColumns, ResourceTypeEnum } from '../struct';


type EquipDetailProps = {
    equipment?: API.ResourceInfo
}

// 描述列配置
const columnsFilter: string[] = [
    
]

const EquipDetail: React.FC<EquipDetailProps> = (props) => {
    
    return(
        <ProDescriptions 
            bordered
            column={{xs:1, md:2}}
            columns={ResourceInfoColumns(columnsFilter)}
            dataSource={props.equipment}
            
            labelStyle={{
                fontWeight: 'bolder',
            }}
        />

    )
}

export default EquipDetail;