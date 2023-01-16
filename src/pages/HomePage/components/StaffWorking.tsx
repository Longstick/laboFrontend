import { ProCard } from '@ant-design/pro-components';
import React from 'react';

const StaffWorking: React.FC = () => {
    const dateList = [
        1, 2, 3, 4, 5, 6
    ]
    const staffList = [
        'hhx',
        'longstick',
        'longlong'
    ]

    const Staff = (name: string) =>
        <ProCard.Group
            direction='row'
            ghost
            style={{
                display: 'inline-block',

            }}
        >
            <ProCard style={{ width: 100 }}>{name}</ProCard>
            {dateList.map((date) =>
                <ProCard key={date} ghost
                    style={{
                        margin: '0 auto',
                        textAlign: 'center',
                        justifyContent: 'center',
                        verticalAlign: 'middle',
                    }}
                >{Math.random().toPrecision(2)}</ProCard>
            )}
        </ProCard.Group>


    return <>
        <ProCard ghost>
            {staffList.map((staff) => Staff(staff))}

        </ProCard>

    </>
}

export default StaffWorking