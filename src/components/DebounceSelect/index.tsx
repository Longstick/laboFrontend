import { ProFormSelect } from '@ant-design/pro-components';
import type { ProFormSelectProps } from '@ant-design/pro-components';
import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

export interface DebounceSelectProps<ValueType = any> extends ProFormSelectProps {
    debounceTimeout?: number;
}

export const DebounceSelect =
    <ValueType extends { key?: string, label: string, value: string | number }>({ debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>) => {
        
        const handleSearch = (value: string) => {
            console.log(value)
        }
        return (
            <ProFormSelect
                fieldProps={{
                    showSearch: true,
                    onSearch: debounce(handleSearch, debounceTimeout),
                    
                }}
                {...props}
            />
        )
    }