import { PageContainer, ProCard } from '@ant-design/pro-components';
import React from 'react';
import { CharacterTable } from '../components/CharacterTable';


const Character: React.FC = () => {
    return (
        <PageContainer>
            <ProCard gutter={[24,24]} direction='column' ghost>
                <ProCard>
                    <CharacterTable/>
                </ProCard>
                <ProCard>
                    <CharacterTable/>
                </ProCard>
            </ProCard>
        </PageContainer>
    )
}

export default Character