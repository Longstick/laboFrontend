import { ProCard } from '@ant-design/pro-components';
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
        return {sl, tk}
    }

    const setStaff = async () =>{
        const {sl, tk} = await getAllStaff()
        setStaffList(sl)
        setTargetKeys(tk)    
    }

    useEffect(()=>{
        setStaff()
    }, [])

    const Staff = (name: string) =>
        <ProCard
            direction='row'
            ghost
            gutter={[12, 12]}
        >
            <ProCard
                colSpan={3}
                className={styles.WorkingStaffName}
                style={{ fontSize: 16 }}
            >{name}</ProCard>

            {dateList.map((date) => {
                const data = Math.random()
                return <ProCard
                    hoverable
                    key={date}
                    bordered
                    colSpan={3}
                    style={{
                        fontFamily: 'Alimama ShuHeiTi_Bold',
                        // fontSize: 16,
                        textAlign: 'center',
                    }}
                    className={
                        function cssChoose() {
                            if (data <= 0.4) return styles.WorkingEfficiencyLow
                            else if (data <= 0.7) return styles.WorkingEfficiencyMedium
                            return styles.WorkingEfficiencyHigh
                        }()
                    }
                >{data.toPrecision(2)}</ProCard>
            })}
        </ProCard>

    const DateColumn = () =>
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

    return <>
        <ProCard
            // ghost
            direction='column'
            gutter={[12, 12]}
            title={<div style={{ fontFamily: 'Alimama ShuHeiTi_Bold', fontSize: 18 }}>用户能效透视</div>}
            extra={
                <Space>
                    <Button onClick={()=>{getAllStaff()}}>刷新</Button>
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
                                    const {sl} = await getAllStaff()
                                    setStaffList(sl)
                                }}
                                render={(item) => item.label!}
                            />
                        }
                    >
                        <Button type='primary' >配置</Button></Popover>
                    {/* <Select
                        mode="multiple"
                        style={{ width: 200 }}
                        allowClear
                        labelInValue
                        dropdownMatchSelectWidth
                        placeholder="请选择员工"
                        options={staffList}
                    /> */}
                </Space>
            }
        >
            {DateColumn()}
            {targetKeys.map((staff) => Staff(staff))}

        </ProCard>

    </>
}

export default StaffWorking