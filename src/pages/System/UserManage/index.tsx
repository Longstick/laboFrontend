import { PageContainer, ProCard } from '@ant-design/pro-components';
import type { ActionType } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { UserTable } from '../components/UserTable';
    
const UserManage: React.FC = () => {
    const [tabKey, setTabKey] = useState<string>('UserSearch')
    const actionRef = useRef<ActionType>()

    return (
        <PageContainer
            onTabChange={ key =>{
                setTabKey(key)
                actionRef.current?.reloadAndRest?.();
            }}
            tabList={[
                {
                    tab: '用户查询',
                    key: 'UserSearch',
                    
                },
                {
                    tab: '新增用户',
                    key: 'NewUser',
                },
            ]}
        >
            {{
                UserSearch: <UserTable />,
                NewUser: <></>
            }[tabKey]}
            {/* <UserTable /> */}

        </PageContainer>
    )
}

export default UserManage