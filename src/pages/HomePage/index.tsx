import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import React from 'react';
import { useModel } from "@umijs/max"

import styles from './index.less'
import { TotalUsers } from '@/components/Charts/charts';

const { Divider } = ProCard

const HomePage: React.FC = (props) => {
    const { initialState } = useModel('@@initialState');

    const SecondaryStatistic = () =>
        <ProCard
            colSpan={6}
            bodyStyle={{
                padding: 12,
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
            }}
        >

            <ProCard ghost style={{ paddingLeft: 10, fontSize: 16, borderLeft: "5px solid rgb(33, 129, 255)"}} colSpan={18}>今日处理工单</ProCard>
            <ProCard ghost style={{ margin: "0 auto" }}>45464445465456456</ProCard>

        </ProCard>

    console.log(initialState)
    return (
        <PageContainer title={`欢迎回来，${initialState?.userInfo?.username}`}>
            <ProCard gutter={[24, 24]} >
                <ProCard direction='column' gutter={[24, 24]} colSpan={6}>
                    <StatisticCard
                        className={styles.MainStatisticCard}
                        boxShadow
                        statistic={{
                            value: 1231223123,
                            title: <div style={{ color: 'white', fontSize: '16px' }}>
                                当前已获取金额</div>,
                            suffix: '元',
                            valueStyle: {
                                fontFamily: 'Alimama ShuHeiTi_Bold',
                                color: 'white',
                            },
                        }}
                    />
                    <StatisticCard.Group direction='column'>
                        <SecondaryStatistic />
                        <Divider type='horizontal' />
                        <StatisticCard
                            statistic={{
                                value: 1231223123,
                                title: "当前已获取金额",
                                suffix: '元',
                            }}
                        />
                        <Divider type='horizontal' />
                        <StatisticCard
                            statistic={{
                                value: 1231223123,
                                title: "当前已获取金额",
                                suffix: '元',
                            }}
                        />
                    </StatisticCard.Group>
                </ProCard>
                <StatisticCard
                    title="本月统计数据"
                // chart={<TotalUsers height={400} />}
                />
            </ProCard>

        </PageContainer>
    )
}

export default HomePage