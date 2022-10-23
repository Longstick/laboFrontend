import { PageContainer, ProCard } from '@ant-design/pro-components';
import type { ActionType } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { UserTable } from '../components/UserTable';
import { CreateUserForm } from '../components/CreateUserForm';
    
const UserManage: React.FC = () => {
    const [tabKey, setTabKey] = useState<string>('UserSearch')
    const actionRef = useRef<ActionType>()

    return (
        <PageContainer>
            <UserTable />

        </PageContainer>
    )
}

export default UserManage