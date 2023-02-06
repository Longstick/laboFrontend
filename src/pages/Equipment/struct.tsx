import type { ProColumns } from "@ant-design/pro-components";
import { Tag } from "antd";

export const ResourceTypeEnum = {
    '仪器设备': {
        text: '仪器设备',
        color: 'volcano',
    },
    '教学用具': {
        text: '教学用具',
        color: 'cyan',
    },
    '实验器材': {
        text: '实验器材',
        color: 'geekblue',
    },
    '公共资源': {
        text: '公共资源',
        color: 'magenta',
    },
}

export const ResourceInfoColumns: (keywords: string[]) => ProColumns<API.ResourceInfo>[] = (keywords) => {
    const columns: ProColumns<API.ResourceInfo>[] = [
        {
            key: 'identifier',
            title: '设备ID',
            dataIndex: 'identifier',
            width: "8%",
        },
        {
            key: 'name',
            title: '设备名称',
            dataIndex: 'name',
        },
        {
            key: 'modelNumber',
            title: '型号',
            dataIndex: 'modelNumber',
        },
        {
            key: 'type',
            title: '类别',
            dataIndex: 'type',
            valueType: 'select',
            valueEnum: ResourceTypeEnum,
            width: "8%",
            render: (dom, record, _, action) =>
                <Tag color={ResourceTypeEnum[record.type!].color}>{record.type}</Tag>
        },
        {
            key: 'presentSituation',
            title: '当前状态',
            dataIndex: 'presentSituation',
            width: '8%',
            valueType: 'select',
            valueEnum: {
                '在用': {
                    text: '在用',
                    status: 'Processing'
                },
                '废弃': {
                    text: '废弃',
                    status: 'Default'
                }
            }
        },
        {
            key: 'collectUnit',
            title: '所属单位',
            dataIndex: 'collectUnit',
        },
        {
            key: 'storagePlace',
            title: '存放位置',
            dataIndex: 'storagePlace',
        },
        {
            key: 'minServiceYear',
            title: '服务期限',
            dataIndex: 'minServiceYear',
            width: '8%',
            hideInSearch: true,
        },
        {
            key: 'supplier',
            title: '供应商',
            dataIndex: 'supplier',
        },
        {
            key: 'usedYear',
            title: '已使用时长',
            dataIndex: 'usedYear',
            width: '8%',
        },
        {
            key: 'remark',
            title: '标注',
            dataIndex: 'remark',
        },
        {
            key: 'collectPerson',
            title: '采购负责人',
            dataIndex: 'collectPerson',
        },
        {
            key: 'usePerson',
            title: '使用人',
            dataIndex: 'usePerson',
        },
        {
            key: 'usePersonEmail',
            title: '使用人邮箱',
            dataIndex: 'usePersonEmail',
        },
        {
            key: 'specifications',
            title: '配置',
            dataIndex: 'specifications',
        },
    ]
    if (!keywords.length) return columns
    else return columns.filter((item: any) => keywords.includes(item.key))
}