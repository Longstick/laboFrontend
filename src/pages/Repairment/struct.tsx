/* eslint-disable react/jsx-key */
import { ProCard, ProColumns, ProSchema, StatisticCard, } from "@ant-design/pro-components";
import type { ProDescriptionsItemProps } from "@ant-design/pro-components"
import { FormattedMessage } from "@umijs/max"
import { Typography, Statistic, Tag, Image, Space } from "antd";
import styles from "./index.less"
import { getResourceID } from "@/services/api";

const { Title, Paragraph, Text } = Typography
const { Divider } = ProCard

export const priorityList = {
    0: {
        // value: 'high',
        color: 'red',
        text: '高'
    },
    1: {
        // value: 'medium',
        color: 'orange',
        text: '中'
    },
    2: {
        // value: 'low',
        color: 'green',
        text: '低'
    }
}

export const statusList = {
    0: {
        text: '已终止',
        status: 'Warning'
    },
    1: {
        text: '已完成',
        status: 'Success',
    },
    2: {
        text: '进行中',
        status: 'Default',
    }
}

export const stepLabel = {
    0: "提交",
    1: "审批",
    2: "派发",
    3: "维修",
    4: "验收",
};

export const failureTypeLabel = {
    badlyDamaged: {
        color: 'red',
        text: '严重损毁',
    },
    slightlyDamaged: {
        color: 'orange',
        text: '轻微损坏',
    },
    affectUse: {
        color: 'blue',
        text: '影响使用',
    },
    needImproved: {
        color: 'green',
        text: '需要改善',
    },
}

export const popContent = {
    0: (
        <ProCard
            style={{
                maxWidth: 600
            }}>
            <Title level={5}>
                签收图片上传失败？
            </Title>
            <Paragraph>
                如果您的签收图片一直上传失败，我们建议您：<br />
                1. 检查网络连接是否正常，本地网络是否有代理等。<br />
                2. 检查文件格式是否为<Text italic> .jpg / .jpeg / .png 等</Text><br />
                3. 如果上述无法解决问题，请联系&nbsp;&nbsp;<Text strong>黄恒新: 13537536685</Text>
            </Paragraph>

            <Title level={5}>
                签收图片上传失败？
            </Title>
            <Paragraph>
                如果您的报价文件一直上传失败，我们建议您：<br />
                1. 检查网络连接是否正常，本地网络是否有代理等。<br />
                2. 文件格式、大小是否符合要求<br />
                3. 记得
            </Paragraph>
        </ProCard>
    ),
    1: (
        <ProCard
            style={{
                maxWidth: 600
            }}
        >
            <Title level={5}>
                报价文件上传失败？
            </Title>
            <Paragraph>
                如果您的报价文件一直上传失败，我们建议您：<br />
                1. 检查网络连接是否正常，本地网络是否有代理等。<br />
                2. 检查文件格式、大小是否符合要求<br />
                3. 可以尝试修改本地网关为0.0.0.0<br />
                3. 如果上述无法解决问题，请联系&nbsp;&nbsp;<Text strong>黄恒新: 13537536685</Text>
            </Paragraph>

            <Title level={5}>
                报价文件上传失败？
            </Title>
            <Paragraph>
                如果您的报价文件一直上传失败，我们建议您：<br />
                1. 检查网络连接是否正常，本地网络是否有代理等。<br />
                2. 文件格式、大小是否符合要求<br />
                3. 记得
            </Paragraph>
        </ProCard>
    )
}

export const staticGroup = {
    'all': [
        <StatisticCard>
            <Statistic
                title={<FormattedMessage id='pages.repairment.all.statisticsData.newIssuesToday' defaultMessage="New Issues Today" />}
                value={34} />
        </StatisticCard>,
        <Divider />,
        <StatisticCard>
            <Statistic
                title={<FormattedMessage id='pages.repairment.all.statisticsData.totalIssues' defaultMessage="Total Issues" />}
                value={10245} />
        </StatisticCard>,
        <Divider />,
        <StatisticCard>
            <Statistic
                title={<FormattedMessage id='pages.repairment.all.statisticsData.highPriority' defaultMessage='High Priority' />}
                value={842} />
        </StatisticCard>,
        <Divider />,
        <StatisticCard>
            <Statistic
                title={<FormattedMessage id='pages.repairment.all.statisticsData.overdueIssue' defaultMessage="Overdue" />}
                value={86} />
        </StatisticCard>
    ],

    'to-do': [
        <StatisticCard
            statistic={{
                title: <div className={styles.StatisticTitle}>今日新增</div>,
                value: 1555,
                suffix: '项',
                // status: 'processing'
            }}
            className={styles.statisticsCard}
        // chart={<NewIssues height={100} autoFit/>}
        // chartPlacement='right'
        />,
        <Divider />,
        <StatisticCard
            statistic={{
                title: '总计待处理',
                value: 142,
            }}
            className={styles.statisticsCard}

        // chart={<NewIssues height={100} autoFit/>}
        // chartPlacement='right'
        />,
        <Divider />,
        <StatisticCard
            statistic={{
                title: '高优先级',
                value: 42,
            }}
            className={styles.statisticsCard}

        // chart={<NewIssues height={100} autoFit/>}
        // chartPlacement='right'
        />,
        <Divider />,
        <StatisticCard
            statistic={{
                title: '已逾期',
                value: 12,
            }}
            className={styles.statisticsCard}

        // chart={<NewIssues height={100} autoFit/>}

        />
    ],

    'mySubmission': [
        <StatisticCard>
            <Statistic
                title='今日提交'
                value={1} />
        </StatisticCard>,
        <StatisticCard>
            <Statistic
                title='累计提交'
                value={70} />
        </StatisticCard>,
        <StatisticCard>
            <Statistic
                title='已完成'
                value={65} />
        </StatisticCard>,
        <StatisticCard>
            <Statistic
                title='已逾期'
                value={2} />
        </StatisticCard>
    ],

    'myCompleted': [
        <StatisticCard>
            <Statistic
                title='今日已处理'
                value={3} />
        </StatisticCard>,
        <StatisticCard>
            <Statistic
                title='累计已处理'
                value={155} />
        </StatisticCard>,
        <StatisticCard>
            <Statistic
                title='高优先级'
                value={61} />
        </StatisticCard>,
        <StatisticCard>
            <Statistic
                title='已逾期'
                value={7} />
        </StatisticCard>
    ]
}


export const issueInfoColumns: (keywords: string[]) => ProSchema<API.IssueInfo>[] = (keywords) => {
    const columns: ProColumns<API.IssueInfo>[] = [
        {
            key: 'identifier',
            title: '工单ID',
            dataIndex: 'identifier',
            sorter: (a, b) => {
                return Number(a.identifier) - Number(b.identifier)
            }
        },
        {
            key: 'title',
            title: '工单标题',
            dataIndex: 'title',
            ellipsis: true,
            hideInSearch: true,
            // width: 300,
        },
        {
            key: 'description',
            title: '工单描述',
            dataIndex: 'description',
            ellipsis: true,
            hideInSearch: true,
        },
        {
            key: 'resource_id',
            title: '工作对象',
            dataIndex: 'resource_id',
            ellipsis: true,
            // search: false,
            request: getResourceID,
            fieldProps: {
                showSearch: true,
                // showArrow: false,
                debounceTime: 500,
            },
            render: (text, record, _, action) => {
                return `${record.resource?.identifier} ${record.resource?.name}`
            }
        },
        {
            title: '设备名称',
            dataIndex: ['resource', 'name'],
            key: 'resource_name',
            hideInTable: true,
            hideInSearch: true,
        },
        {
            title: '设备ID',
            dataIndex: ['resource', 'identifier'],
            key: 'resource_identifier',
            hideInTable: true,
            hideInSearch: true,
        },
        {
            title: '设备型号',
            dataIndex: ['resource', 'modelNumber'],
            key: 'resource_modelNumber',
            hideInTable: true,
            hideInSearch: true,
        },
        {
            title: '设备配置',
            dataIndex: ['resource', 'specifications'],
            key: 'resource_specifications',
            hideInTable: true,
            hideInSearch: true,
        },
        {
            title: '制造商',
            dataIndex: 'manufacturer',
            key: 'resource_specifications',
            hideInTable: true,
            hideInSearch: true,
        },
        {
            key: 'type',
            title: '故障类型',
            dataIndex: 'type',
            valueType: 'select',
            valueEnum: failureTypeLabel,
            width: '8%',
            render: (_, record) => (
                <Tag color={failureTypeLabel[record.type!].color}>
                    {failureTypeLabel[record.type!].text}
                </Tag>
            ),
            fieldProps: {
                dropdownMatchSelectWidth: false,
            },
        },
        {
            key: 'priority',
            title: '优先级',
            dataIndex: 'priority',
            valueType: 'select',
            valueEnum: priorityList,
            width: '8%',
            render: (_, record) => (
                <Tag color={priorityList[record?.priority ?? 0].color}>
                    {priorityList[record?.priority ?? 0].text}
                </Tag>
            ),
            fieldProps: {
                dropdownMatchSelectWidth: false,
            },
        },
        {
            key: 'status',
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: statusList,
            width: 120,
            fieldProps: {
                dropdownMatchSelectWidth: false,
            },
            formItemProps: {
                normalize: (value) => statusList[value]?.text
            }
        },
        {
            key: 'finish_date',
            title: '预期时限',
            dataIndex: 'finish_date',
            valueType: 'dateTime',
            sorter: (a, b) => {
                return new Date(a.finish_date!).getTime() - new Date(b.finish_date!).getTime()
            },
            render: (dom, record, _, action) => {
                const finish_date = new Date(record.finish_date!).getTime()
                if (finish_date < Date.now() && record.status !== 1) {
                    return <div style={{
                        color: 'red'
                    }}>
                        {record.finish_date}
                    </div>
                }
                return record.finish_date
            }
        },
        {
            key: 'create_time',
            title: '创建时间',
            dataIndex: 'create_time',
            search: false,
            valueType: 'dateTime',
            sorter: (a, b) => {
                const atime = new Date(a.create_time!).getTime();
                const btime = new Date(b.create_time!).getTime();
                return atime - btime
            },
            defaultSortOrder: 'descend',
            // hideInTable: true
        },
    ]
    // 通过配置关键词过滤出需要的列项
    if (!keywords.length) return columns
    return columns.filter((item: any) => keywords.includes(item.key))
}


export const ProcesserDetailColumns: ProDescriptionsItemProps[] = [
    {
        title: '处理人',
        dataIndex: ['now_user', 'username'],
    },
    {
        title: '联系电话',
        dataIndex: ['now_user', 'phone'],
    },
    {
        title: '更新时间',
        dataIndex: 'update_time',
    },
]