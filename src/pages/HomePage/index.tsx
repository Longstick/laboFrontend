import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import React from 'react';
import { useModel } from "@umijs/max"

import styles from './index.less'
import { TotalUsers } from '@/components/Charts/charts';
import { Select, Statistic } from 'antd';
import StaffWorking from './components/StaffWorking';

const { Divider } = ProCard

const HomePage: React.FC = (props) => {
    const { initialState } = useModel('@@initialState');

    const SecondaryStatisticItem: Record<string, {
        color: string,
        title: string,
        value: number
    }> = {
        todayAll: {
            color: '#ff9f24',
            title: '今日处理工单',
            value: 2
        },
        todo: {
            color: '#5473e8',
            title: '高优先级待处理',
            value: 12311
        },
        expired: {
            color: '#23bcca',
            title: '已逾期',
            value: 123211
        }

    }
    const SecondaryStatistic = (itemKey: string) =>
        <ProCard
            // colSpan={6}
            bodyStyle={{
                padding: 12,
                alignItems: 'center',
                display: 'flex',
            }}
        >
            <div style={{ height: 30, width: 8, backgroundColor: SecondaryStatisticItem[itemKey].color, position: 'absolute' }} />

            <ProCard ghost style={{ paddingLeft: 20, color: "#888888" }}>
                {SecondaryStatisticItem[itemKey].title}
            </ProCard>

            <ProCard ghost style={{ display: 'flex' }}>
                <div style={{ float: 'right', color: '#888888' }}>
                    <Statistic
                        value={SecondaryStatisticItem[itemKey].value}
                        valueStyle={{ fontSize: 18 }}
                        suffix={'项'}
                    />
                </div>
            </ProCard>
        </ProCard>

    return (
        <PageContainer title={`欢迎回来，${initialState?.userInfo?.username}`}>
            <ProCard gutter={[24, 24]} ghost direction='column'>
                <ProCard gutter={[24, 24]} >
                    <ProCard direction='column' gutter={[24, 24]} colSpan={8}>
                        <StatisticCard
                            className={styles.MainStatisticCard}
                            boxShadow
                            statistic={{
                                value: 123312,
                                title: <div style={{ color: 'white', fontSize: '16px' }}>
                                    当前已获取金额</div>,
                                // suffix: '元',
                                prefix: '￥',
                                valueStyle: {
                                    fontFamily: 'Alimama ShuHeiTi_Bold',
                                    color: 'white',
                                },
                            }}
                        />
                        <StatisticCard.Group direction='column'>
                            {SecondaryStatistic('todayAll')}
                            <Divider type='horizontal' />
                            {SecondaryStatistic('todo')}
                            <Divider type='horizontal' />
                            {SecondaryStatistic('expired')}
                        </StatisticCard.Group>
                    </ProCard>
                    <StatisticCard
                        title="本月统计数据"
                    // chart={<TotalUsers height={400} />}
                    />
                </ProCard>
                <ProCard
                    gutter={[24, 24]}
                >
                    <ProCard colSpan={8} style={{minHeight: 300}}>123213</ProCard>
                    <StaffWorking />
                </ProCard>
            </ProCard>
        </PageContainer>
    )
}

export default HomePage