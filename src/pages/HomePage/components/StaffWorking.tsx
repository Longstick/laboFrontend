import { ProCard } from '@ant-design/pro-components';
import { ReloadOutlined } from '@ant-design/icons'

import React, { useEffect, useRef, useState } from 'react';
import styles from '../index.less';
import { Button, Checkbox, Popover, Select, Space, Transfer, Typography } from 'antd';
import { getAllUsers } from '@/services/api';

const { Title } = Typography

const StaffWorking: React.FC = () => {

    const [targetKeys, setTargetKeys] = useState<string[]>([])
    const [staffList, setStaffList] = useState<API.WorkingStaff[]>([])
    const dateList = [1, 2, 3, 4, 5, 6, 7]

    const getAllStaff = async () => {
        const res: API.UserInfo[] = (await getAllUsers({})).data
        const sl = []
        const tk = []
        for (let i = 0; i < res.length; i++) {
            const staff = {
                label: res[i].username,
                value: res[i].id,
                key: res[i].username,
            }
            sl.push(staff)
            tk.push(staff.key!)
        }
        return { sl, tk }
    }

    // const setStaff = async () => {
    //     const { sl, tk } = await getAllStaff()
    //     setStaffList(sl)
    //     setTargetKeys(tk)
    // }

    useEffect(() => {
        (async function setStaff() {
            const { sl, tk } = await getAllStaff()
            setStaffList(sl)
            setTargetKeys(tk)
        }())
    }, [])

    const Staff = (name: string) =>
        <ProCard
            direction='row'
            ghost
            gutter={[12, 12]}
        >
            <ProCard
                ghost
                colSpan={3}
                className={styles.WorkingStaffName}
                style={{ fontSize: 16, lineHeight: 3.5 }}
            >{name}</ProCard>

            {dateList.map((date) => {
                const data = Math.random()
                return <ProCard
                    hoverable
                    key={date}
                    ghost
                    colSpan={3}
                // style={{height: 56}}
                >
                    <div
                        className={
                            function cssChoose() {
                                if (data <= 0.4) return styles.WorkingEfficiencyLow
                                else if (data <= 0.7) return styles.WorkingEfficiencyMedium
                                return styles.WorkingEfficiencyHigh
                            }()
                        }
                        style={{
                            fontFamily: 'Alimama ShuHeiTi_Bold',
                            // fontSize: 16,
                            textAlign: 'center',
                            height: 56,
                            lineHeight: 4,
                            borderRadius: 5,
                        }}

                    >{data.toPrecision(2)}</div>
                </ProCard>
            })}
        </ProCard>

    const DateColumn =
        <ProCard
            direction='row'
            gutter={[12, 12]}
            ghost
        >
            <ProCard colSpan={3} ghost />
            {dateList.map((date) =>
                <ProCard key={date} colSpan={3} ghost
                    style={{ height: 25 }}
                    className={styles.WorkingStaffName}
                >{date}月</ProCard>
            )}
        </ProCard>

    return <ProCard
        // ghost
        direction='column'
        gutter={[12, 12]}
        title={<div style={{ fontFamily: 'Alimama ShuHeiTi_Bold', fontSize: 18 }}>用户能效透视</div>}
        extra={
            <Space>
                <Button 
                icon={<ReloadOutlined />} 
                shape="circle"
                onClick={async () => {
                    const { sl } = await getAllStaff()
                    setStaffList(sl)
                }} />
                <Popover
                    placement='bottomRight'
                    trigger="click"
                    title="人员配置"
                    content={
                        <Transfer
                            showSearch
                            listStyle={{
                                width: 250,
                                height: 300,
                            }}
                            operations={['显示', '隐藏']}
                            dataSource={staffList}
                            targetKeys={targetKeys}
                            onChange={async (keys) => {
                                const { sl } = await getAllStaff()
                                setStaffList(sl)
                                setTargetKeys(keys)
                            }}
                            render={(item) => item.label!}
                        />
                    }
                >
                    <Button type='primary' >配置</Button></Popover>
            </Space>
        }
    >
        {DateColumn}
        {targetKeys.length === 0 ? <Title level={3}>没有选择用户</Title> : targetKeys.map((staff) => Staff(staff))}
    </ProCard>
}

export default StaffWorking