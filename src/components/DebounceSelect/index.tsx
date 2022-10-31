import { ProFormSelect } from '@ant-design/pro-components';
import type { ProFormSelectProps } from '@ant-design/pro-components';
import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
export interface DebounceSelectProps<ValueType = any> extends ProFormSelectProps {
    debounceTimeout?: number;
    fetchRequest?: (params?: any) => Promise<ValueType[]>;
}

export const DebounceSelect =
    <ValueType extends { key?: string, label: string, value: string | number }>({ debounceTimeout = 500, fetchRequest, ...props }: DebounceSelectProps<ValueType>) => {
        
        const [options, setOptions] = useState<ValueType[]>([])

        const debounceFetch = useMemo(()=>{
            const loadOptions = (value: string) => {
                setOptions([])
                fetchRequest?.(props?.params).then(newOptions => {
                    console.log(newOptions)
                    setOptions(newOptions)
                })
            }
            return debounce(loadOptions, debounceTimeout)
        }, [fetchRequest, props?.params])

        return (
            <ProFormSelect
                fieldProps={{
                    showSearch: true,
                    filterOption: (inputValue, option) => {
                        if (option?.label?.toString().match(inputValue)) {return true}
                        return false;
                    },
                }}
                options={options}
                {...props}
            />
        )
    }