import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';

import moment from 'moment';
import React, { useState } from 'react';
import { MaintenanceLine } from '../../../components/Charts/charts';

const { Statistic } = StatisticCard

const MaintenanceData: React.FC = () => {

    const [responsive, setResponsive] = useState<boolean>(false)

    return(
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width < 800);
            }}
        >
        <PageContainer>
            <ProCard split='vertical' title='123' headerBordered bordered >
                <ProCard split='horizontal'>
                <ProCard split='horizontal'>
                    <ProCard split='vertical'>
                        <StatisticCard 
                            statistic={{
                                title: '数据',
                                value: 123,
                            }}
                        />
                        <StatisticCard 
                            statistic={{
                                title: '数据',
                                value: 123,
                            }}
                        />
                    </ProCard>
                    <ProCard split='vertical'>
                        <StatisticCard 
                            statistic={{
                                title: '数据',
                                value: 123,
                            }}
                        />
                        <StatisticCard 
                            statistic={{
                                title: '数据',
                                value: 123,
                            }}
                        />
                        
                    </ProCard>
                    <StatisticCard 
                        title='大宗商品交易'
                        chart={<MaintenanceLine />}
                    />
                </ProCard>
                </ProCard>
                <StatisticCard 
                        title='大宗商品交易'
                        chart={<MaintenanceLine />}
                    />
            </ProCard>
            {/* <StatisticCard.Group ghost gutter={24}>
            <StatisticCard 
                colSpan={{lg: 12}}
                title="工单总量统计"
                statistic={{
                    // title: `数据截止于${moment().format('YYYY-MM-DD')}`,
                    value: 1155,
                    suffix: '项',
                    description: <Statistic title="月同比" trend='up' value='2.5%' />
                }}
                chart={<MaintenanceLine />}
                // chartPlacement='right'
            />
            </StatisticCard.Group> */}
        </PageContainer>
        </RcResizeObserver>
    )
}

export default MaintenanceData