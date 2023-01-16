// 维修管理页面

import { PageContainer } from '@ant-design/pro-components';

import { Button, Badge, Space } from 'antd';
import type { ActionType } from '@ant-design/pro-components';

import React, { useRef, useState } from 'react';
import RcResizeObserver from 'rc-resize-observer';

import CreateNew from './components/CreateNew';
import styles from './index.less';
import ButtonGroup from 'antd/lib/button/button-group';
import DraftsTable from './components/DraftsTable';
import IssueTable from './components/IssueTable';

const Repairment: React.FC = () => {
    const [responsive, setResponsive] = useState<boolean>(false);
    const [activeKey, setActiveKey] = useState<string>('all');
    const [rowSelect, setRowSelect] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();

    const renderBadge = (count: number, active = false) => {
        return <Badge
            overflowCount={999}
            count={count}
            style={{
                marginBlockStart: -2,
                marginInlineStart: 4,
                color: active ? '#1890FF' : '#999',
                backgroundColor: active ? '#E6F7FF' : '#eee',
            }}
        />
    };

    const tabs = [
        {
            key: 'all',
            title: '所有工单',
            tab: <div className={styles.TabsTitle}>所有工单</div>,
            value: 12334,
        },
        {
            key: 'to-do',
            title: '待办工单',
            tab: <div className={styles.TabsTitle}>
                待办工单{renderBadge(12, activeKey === 'to-do')}
            </div>,
            value: 1151,
        },
        {
            key: 'myCompleted',
            title: '已流转工单',
            tab: <div className={styles.TabsTitle}>
                已流转工单{renderBadge(219, activeKey === 'myCompleted')}
            </div>,
            value: 213,
        },
        {
            key: 'mySubmission',
            title: '我的工单',
            tab: <div className={styles.TabsTitle}>我的工单</div>,
            value: 152,
        },
        {
            key: 'drafts',
            title: '草稿箱',
            tab: <div className={styles.TabsTitle}>草稿箱</div>,
            value: 223,
        },
    ]

    return (
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width <= 576);
            }}
        >
            <PageContainer
                tabList={tabs}
                tabActiveKey={activeKey}
                onTabChange={(key) => {
                    setActiveKey(key)
                }}
                // tabBarExtraContent={
                //     <Space size={16}>
                //         <CreateNew type="newButton" tableActionRef={actionRef} />
                //         <ButtonGroup>
                //             <Button key="outputAll">
                //                 导出全部
                //             </Button>

                //             {rowSelect ?
                //                 <Button
                //                     key='cancelOperate'
                //                     // size='large'
                //                     danger
                //                     onClick={() => { setRowSelect(false) }}
                //                 >取消操作</Button>
                //                 :
                //                 <Button
                //                     key="outputSelected"
                //                     // size="large"
                //                     onClick={() => { setRowSelect(true) }}
                //                 >批量操作</Button>
                //             }

                //         </ButtonGroup>
                //     </Space>
                // }
            >
                {/* <ProCard.Group
                    ghost
                    gutter={[24, 12]}
                    className={styles.statisticsBaseCard}
                    direction={responsive ? 'column' : 'row'}
                >
                    {function tabsRender() {
                        return tabs.map((item) =>
                            <StatisticCard
                                key='tabs'
                                statistic={{
                                    title: <div className={styles.StatisticTitle}>{item.title}</div>,
                                    value: item.value,
                                    valueStyle: {
                                        fontFamily: 'Alimama ShuHeiTi_Bold',
                                        fontSize: 18,
                                        // float: 'right',
                                    },
                                    suffix: <div style={{ fontFamily: 'Alimama ShuHeiTi_Bold', fontSize: 18 }}>项</div>,
                                }}
                                hoverable
                                className={activeKey === item.key ? styles.isActive : styles.statisticsCard}
                                onClick={() => {
                                    setActiveKey(item.key)
                                    actionRef.current?.reloadAndRest?.();
                                }}
                            />
                        )
                    }()}
                </ProCard.Group> */}
                {activeKey !== 'drafts' ?

                    <IssueTable
                        responsive={responsive}
                        activeKey={activeKey}
                    />
                    :
                    // 草稿箱单独渲染
                    <DraftsTable />
                }

            </PageContainer>
        </RcResizeObserver>
    );
};

export default Repairment;
