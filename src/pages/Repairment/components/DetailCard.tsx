// 详细信息卡片

import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Modal, Typography, Divider, Image, Space, Spin } from 'antd'
import { issueInfoColumns } from '../struct';
import styles from '../index.less';

const { Title, Text, Paragraph } = Typography

// 配置需要展示的列项key
const columnsFilter = [
    'resource_name',
    'resource_identifier',
    'resource_modelNumber',
    'resource_specifications',
    'type',
    'priority',
    'finish_date'
]

export type DetailModalProps = {
    responsive?: boolean,
    value?: API.IssueInfo,
}

const DetailCard: React.FC<DetailModalProps> = props => {

    // 加载时显示的组件
    const loading = (
        <Spin
            size="small"
            style={{
                marginLeft: 8,
                marginRight: 8,
            }}
        />
    )

    // 文本格式转换，将工单描述文本中的换行显示出来
    const TextFormatter = () => {
        const texts: ReactElement[] = []
        props.value?.description?.split('\r\n')?.forEach((text) => {
            texts.push(<>{text}<br /></>)
        })
        return texts
    }

    // 照片组
    const pictureGroup = () => {
        if (!props.value) return <></>
        if (props.value.images!.length === 0) return <></>
        const picGroup: ReactNode[] = []
        for (let i = 0; i < props.value.images!.length; i++) {
            picGroup.push(
                <Image
                    className={styles.approvalModalPicture}
                    src={`http://43.139.11.85:3000/${props.value.images![i]}`}
                    alt=''
                />)
        }
        return <>
            <br />
            <Image.PreviewGroup>
                {/* <Space> */}
                {picGroup}
                {/* </Space> */}
            </Image.PreviewGroup>
        </>
    }

    // 父组件的数据没有传入时，显示加载
    if (!props.value) {
        return loading
    }

    return (
        <>
            <Title level={4}>{props.value?.title}</Title>
            <Text type='secondary'
                style={{
                    display: 'block',
                    marginBottom: 10,
                }}
            >
                创建时间：{props.value?.create_time}
                &nbsp;&nbsp;&nbsp;&nbsp;
                创建人：{props.value?.orderNodes?.[0]?.now_user?.username}
            </Text>
            <Text>{TextFormatter()}</Text>
            {pictureGroup()}
            <Divider />
            <ProDescriptions
                columns={issueInfoColumns(columnsFilter)}
                column={{
                    xs: 1,
                    sm: 2,
                    md: 2,
                }}
                layout={props.responsive ? 'vertical' : 'horizontal'}
                dataSource={props.value}
                bordered
                size='small'
                labelStyle={{
                    width: 100,
                    fontWeight: 'bolder'
                }}
            />
        </>
    )
}

export default DetailCard;