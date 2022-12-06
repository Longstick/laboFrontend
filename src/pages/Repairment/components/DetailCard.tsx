// 详细信息弹出框

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

const pictureGroup = (item: API.IssueInfo | undefined) => {
    if (!item) return <></>
    if (item.images!.length === 0) return <></>
    const picGroup: ReactNode[] = []
    for (let i = 0; i < item.images!.length; i++) {
        picGroup.push(
            <Image
                className={styles.approvalModalPicture}
                src={`http://43.139.11.85:3000/${item.images![i]}`}
                alt=''
            />)
    }
    return (
        <Image.PreviewGroup>
            <Space>
                {picGroup}
            </Space>
        </Image.PreviewGroup>
    )
}

const DetailCard: React.FC<DetailModalProps> = props => {

    return (
        <ProCard bordered>
            <Title level={4}>{props.value?.title}</Title>
            <Text type='secondary'>
                创建时间：{props.value?.create_time}
                &nbsp;&nbsp;&nbsp;&nbsp;
                创建人：{props.value?.create_person}
            </Text>
            <br /><br />
            <Text>{
                // 显示换行
                function formatten() {
                    const texts: ReactElement[] = []
                    props.value?.description?.split('\r\n')?.forEach((text) => {
                        texts.push(<>{text}<br /></>)
                    })
                    return texts
                }()}</Text>

            <br />
            {pictureGroup(props.value)}

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
        </ProCard>
    )
}

export default DetailCard;