import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { DatePicker, DatePicker as TDatePicker, Input, Space, } from 'antd';
import type { DatePickerProps } from 'antd';
import moment from 'moment';
import RcResizeObserver from 'rc-resize-observer';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { NewIssues, NewUsers, TotalIssues, TotalUsers, UsersPie } from '../components/charts';
import { RightOutlined } from '@ant-design/icons';
import styles from '../index.less'

//因为可能React版本更新导致出现了一些类型问题，暂时把类型归为any解决。
const RangePicker: any = TDatePicker.RangePicker

const { Statistic } = StatisticCard
const { Divider } = ProCard
const RealTimeStatistic: React.FC = () => {

    const [responsive, setResponsive] = useState<boolean>(false);
    const [charts, setCharts] = useState<string>('totalUsers');
    const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString)
    }

    const tabItems = {
        totalUsers: '累计注册用户',
        newUsers: '今日新增用户',
        totalIssues: '累计工单总数',
        newIssues: '今日新增工单',
    }

    return (
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width < 800);
            }}
        >
            <PageContainer>
                {/* <ProCard
                    // ghost
                    title="数据统计"
                    collapsible
                    gutter={[24, 24]}
                >
                    <StatisticCard.Group
                        direction={responsive ? 'column' : 'row'}
                        ghost
                    >
                        <StatisticCard
                            title={tabItems.totalUsers}
                            colSpan={{ md: 12 }}
                            statistic={{
                                // title: tabItems.totalUsers,
                                value: 3221,
                                suffix: '位',
                                description: <Statistic value='1.2%' trend='up' title='月同比' />
                            }}
                            chart={<>
                                <br />
                                <TotalUsers
                                    height={200}
                                    point={{
                                        size: 4,
                                    }}
                                />
                            </>}
                            extra={
                                <RangePicker
                                    disabledDate={(date: moment.Moment) => {
                                        return date > moment()
                                    }}
                                    defaultValue={[
                                        moment(moment(), "yyyy-MM-DD"),
                                        moment(moment().subtract(7, 'days'), "yyyy-MM-DD")
                                    ]}
                                    allowClear={false}
                                />
                            }
                        />
                        <Divider />
                        <StatisticCard
                            title={tabItems.newUsers}
                            colSpan={{ md: 12 }}
                            statistic={{
                                value: 123,
                                suffix: '位',
                                description: <Statistic value='1.2%' trend='up' title='月同比' />
                            }}
                            chart={<>
                                <br />
                                <NewUsers
                                    height={200}
                                    point={{
                                        size: 4,
                                    }}
                                />
                            </>}
                            extra={
                                <RangePicker
                                    disabledDate={(date: moment.Moment) => {
                                        return date > moment()
                                    }}
                                    defaultValue={[
                                        moment(moment(), "yyyy-MM-DD"),
                                        moment(moment().subtract(7, 'days'), "yyyy-MM-DD")
                                    ]}
                                    allowClear={false}
                                />
                            }
                        />
                    </StatisticCard.Group>
                    <StatisticCard.Group>
                        <StatisticCard
                            title={tabItems.totalIssues}
                            colSpan={12}
                            statistic={{
                                value: 21515,
                                suffix: '项',
                                description: <Statistic value='1.2%' trend='up' title='月同比' />
                            }}
                            chart={<>
                                <br />
                                <TotalIssues
                                    height={200}
                                    point={{
                                        size: 4,
                                    }}
                                />
                            </>}
                            extra={
                                <RangePicker
                                    disabledDate={(date: moment.Moment) => {
                                        return date > moment()
                                    }}
                                    defaultValue={[
                                        moment(moment(), "yyyy-MM-DD"),
                                        moment(moment().subtract(7, 'days'), "yyyy-MM-DD")
                                    ]}
                                    allowClear={false}
                                />
                            }
                        />

                        <Divider />
                        <StatisticCard
                            title={tabItems.newIssues}
                            colSpan={12}
                            statistic={{
                                value: 21515,
                                suffix: '项',
                                description: <Statistic value='1.2%' trend='up' title='月同比' />
                            }}
                            chart={<>
                                <br />
                                <NewIssues
                                    height={200}
                                    point={{
                                        size: 4,
                                    }}
                                />
                            </>}
                            extra={
                                <RangePicker
                                    disabledDate={(date: moment.Moment) => {
                                        return date > moment()
                                    }}
                                    defaultValue={[
                                        moment(moment(), "yyyy-MM-DD"),
                                        moment(moment().subtract(7, 'days'), "yyyy-MM-DD")
                                    ]}
                                    allowClear={false}
                                />
                            }
                        />

                    </StatisticCard.Group>
                </ProCard> */}

                <ProCard ghost gutter={16} direction='column'>
                    <StatisticCard.Group ghost direction={responsive ? 'column' : 'row'} gutter={16}>
                        <StatisticCard
                            colSpan={{ lg: 6 }}
                            statistic={{
                                title: tabItems.totalUsers,
                                value: 3022,
                                suffix: '人',
                                // description: `截止至 ${moment().format('YYYY-MM-DD')}`,
                                description: <Statistic trend='up' value='7.25%' title='月同比' />
                            }}
                            chart={<TotalUsers />}
                        />
                        <StatisticCard
                            colSpan={{ lg: 6 }}
                            statistic={{
                                title: tabItems.newUsers,
                                value: 123,
                                suffix: '人',
                                description:
                                    <Space>
                                        <Statistic trend='up' value='17.9%' title='日同比' />
                                        <Statistic trend='down' value='25.13%' title='月同比' />
                                    </Space>
                            }}
                            chart={<NewUsers />}
                        />
                        <StatisticCard
                            colSpan={{ lg: 6 }}
                            statistic={{
                                title: tabItems.totalIssues,
                                value: 32660,
                                suffix: '项',
                                description: <Statistic trend='down' value='25.13%' title='月同比' />
                            }}
                            chart={<TotalIssues />}
                        />
                        <StatisticCard
                            colSpan={{ lg: 6 }}
                            statistic={{
                                title: tabItems.newIssues,
                                value: 123,
                                suffix: '项',
                                description:
                                    <Space>
                                        <Statistic trend='up' value='17.9%' title='日同比' />
                                        <Statistic trend='down' value='25.13%' title='月同比' />
                                    </Space>
                            }}
                            chart={<NewIssues />}
                        />
                    </StatisticCard.Group>

                    <br />
                    <StatisticCard.Group ghost gutter={16}>
                        <StatisticCard
                            colSpan={{lg: 12}}
                            title='用户分类图'
                            // title='123'
                            chart={
                                <UsersPie />
                            }
                        />

                    </StatisticCard.Group>
                </ProCard>


                {/* <ProCard
                    // title="数据统计"
                    direction='column'
                    gutter={[16, 16]}
                    title="数据统计"
                    subTitle="点击卡片切换图表"
                    extra={
                        <RangePicker
                            // bordered={false}
                            disabledDate={(date: moment.Moment) => {
                                return date > moment()
                            }}
                            defaultValue={[
                                moment(moment(), "yyyy-MM-DD"),
                                moment(moment().subtract(7, 'days'), "yyyy-MM-DD")
                            ]}
                            allowClear={false}
                        />
                    }
                    ghost
                >
                    <StatisticCard.Group ghost gutter={[16,16]}>
                        <StatisticCard 
                            // title='累计注册用户'
                            statistic={{
                                title: tabItems.totalUsers,
                                value: 3213,
                            }}
                            bordered
                            className={charts === 'totalUsers' ? styles.selected : undefined}
                            hoverable
                            onClick={()=>{
                                setCharts('totalUsers')
                            }}
                        />

                        <StatisticCard 
                            statistic={{
                                title: tabItems.newUsers,
                                value: 43,
                            }}
                            bordered
                            className={charts === 'newUsers' ? styles.selected : undefined}
                            hoverable
                            onClick={()=>{
                                setCharts('newUsers')
                            }}
                        />
                        <StatisticCard 
                            statistic={{
                                title: tabItems.totalIssues,
                                value: 1233,
                            }}
                            bordered
                            className={charts === 'totalIssues' ? styles.selected : undefined}
                            hoverable
                            onClick={()=>{
                                setCharts('totalIssues')
                            }}
                        />
                        <StatisticCard 
                            statistic={{
                                title: tabItems.newIssues,
                                value: 3213,
                            }}
                            bordered
                            className={charts === 'newIssues' ? styles.selected : undefined}
                            hoverable
                            onClick={()=>{
                                setCharts('newIssues')
                            }}
                        />
                    </StatisticCard.Group>
                    
                    <StatisticCard
                        ghost
                        title={tabItems[charts]}
                        style={{
                            width: '100%',
                        }}
                        chart={{
                            'totalUsers': TotalUsers({height: 200}),
                            'newUsers': <NewUsers height={200}/>,
                            'totalIssues': <TotalIssues height={200}/>,
                            'newIssues': <NewIssues height={200}/>,
                        }[charts]}
                    />
                </ProCard> */}

            </PageContainer>
        </RcResizeObserver>
    )
}

export default RealTimeStatistic