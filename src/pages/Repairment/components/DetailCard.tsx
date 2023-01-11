// 详细信息卡片

import React, { ReactElement, ReactNode, useState } from 'react';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Modal, Typography, Divider, Image, Space } from 'antd'
import { issueDescColumns } from '../struct';
import styles from '../index.less';

const { Title, Text, Paragraph } = Typography

export type DetailModalProps = {
    responsive?: boolean,
    value?: Partial<API.IssueInfo>,
}

const DetailCard: React.FC<DetailModalProps> = props => {

    const textFormatter = () => {
        const texts: ReactElement[] = []
        props.value?.description?.split('\r\n')?.forEach((text) => {
            texts.push(<>{text}<br /></>)
        })
        return texts
    }

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
                创建人：{props.value?.create_person}
            </Text>
            <Text>{textFormatter()}</Text>
            {pictureGroup()}
            <Divider />
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