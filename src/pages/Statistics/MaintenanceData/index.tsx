import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';

import moment from 'moment';
import React, { useState } from 'react';
import { MaintenanceLine } from '../components/charts';

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
            <StatisticCard.Group ghost gutter={24}>
            <StatisticCard 
                colSpan={{lg: 12}}
                title="工单总量统计"
                statistic={{
                    // title: `数据截止于${moment().format('YYYY-MM-DD')}`,
                    value: 1155,
                    suffix: '项',
                    description: <Statistic title="月同比" trend='up' value='2.5%' />
                }}
                
            />
            </StatisticCard.Group>
        </PageContainer>
        </RcResizeObserver>
    )
}

export default MaintenanceData