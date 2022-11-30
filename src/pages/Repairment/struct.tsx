/* eslint-disable react/jsx-key */
import { ProCard, } from "@ant-design/pro-components";
import type { ProDescriptionsItemProps } from "@ant-design/pro-components"
import { FormattedMessage } from "@umijs/max"
import { Typography, Statistic, Tag, Image, Space } from "antd";
import type { ReactNode } from "react"
import styles from "./index.less"

const { Title, Paragraph, Text } = Typography

export const priorityList = {
    0: {
        // value: 'high',
        color: 'red',
        text: (<FormattedMessage
            id="pages.repairment.issue.priority.high"
            defaultMessage='High'
        />)
    },
    1: {
        // value: 'medium',
        color: 'orange',
        text: (<FormattedMessage
            id="pages.repairment.issue.priority.medium"
            defaultMessage='Medium'
        />)
    },
    2: {
        // value: 'low',
        color: 'green',
        text: (<FormattedMessage
            id="pages.repairment.issue.priority.low"
            defaultMessage='Low'
        />)
    }
}

export const statusList = {
    1: {
        text: '已完成',
        status: 'Success',
    },
    2: {
        text: '进行中',
        status: 'Default',
    },
    3: {
        text: '待维修',
        status: 'Default',
    },
    4: {
        text: '待验收',
        status: 'Default'
    },
    5: {
        text: '已完成',
        status: 'Success'
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
    // 0: (<FormattedMessage id="pages.repairment.issue.failureType.badlyDamaged" defaultMessage="badly damaged" />),
    // 1: (<FormattedMessage id="pages.repairment.issue.failureType.slightlyDamaged" defaultMessage="slightly damaged" />),
    // 2: (<FormattedMessage id="pages.repairment.issue.failureType.affectUse" defaultMessage="affect use" />),
    // 3: (<FormattedMessage id="pages.repairment.issue.failureType.needImproved" defaultMessage="need improved" />),
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
        <ProCard>
            <Statistic
                title={<FormattedMessage id='pages.repairment.all.statisticsData.newIssuesToday' defaultMessage="New Issues Today" />}
                value={34} />
        </ProCard>,
        <ProCard>
            <Statistic
                title={<FormattedMessage id='pages.repairment.all.statisticsData.totalIssues' defaultMessage="Total Issues" />}
                value={10245} />
        </ProCard>,
        <ProCard>
            <Statistic
                title={<FormattedMessage id='pages.repairment.all.statisticsData.highPriority' defaultMessage='High Priority' />}
                value={842} />
        </ProCard>,
        <ProCard>
            <Statistic
                title={<FormattedMessage id='pages.repairment.all.statisticsData.overdueIssue' defaultMessage="Overdue" />}
                value={86} />
        </ProCard>
    ],

    'to-do': [
        <ProCard>
            <Statistic
                title={<FormattedMessage id='pages.repairment.statisticsData.newIssueToday' defaultMessage="New To-do Issues Today" />}
                value={15} />
        </ProCard>,
        <ProCard>
            <Statistic
                title={<FormattedMessage id='pages.repairment.statisticsData.totalTodoIssues' defaultMessage="Total To-do Issues" />}
                value={7502} />
        </ProCard>,
        <ProCard>
            <Statistic
                title={<FormattedMessage id='pages.repairment.statisticsData.highPriority' defaultMessage='High Priority' />}
                value={344} />
        </ProCard>,
        <ProCard>
            <Statistic
                title={<FormattedMessage id='pages.repairment.statisticsData.overdueIssue' defaultMessage='Overdue' />}
                value={75} />
        </ProCard>
    ],

    'mySubmission': [
        <ProCard>
            <Statistic
                title='今日提交'
                value={1} />
        </ProCard>,
        <ProCard>
            <Statistic
                title='累计提交'
                value={70} />
        </ProCard>,
        <ProCard>
            <Statistic
                title='已完成'
                value={65} />
        </ProCard>,
        <ProCard>
            <Statistic
                title='已逾期'
                value={2} />
        </ProCard>
    ],

    'myCompleted': [
        <ProCard>
            <Statistic
                title='今日已处理'
                value={3} />
        </ProCard>,
        <ProCard>
            <Statistic
                title='累计已处理'
                value={155} />
        </ProCard>,
        <ProCard>
            <Statistic
                title='高优先级'
                value={61} />
        </ProCard>,
        <ProCard>
            <Statistic
                title='已逾期'
                value={7} />
        </ProCard>
    ]
}


export const issueDescColumns: ProDescriptionsItemProps[] = [
    {
        title: <FormattedMessage id='pages.repairment.issue.issueTitle' defaultMessage='Issue Title' />,
        dataIndex: 'title',
        span: 2,

    },
    {
        title: <FormattedMessage id="pages.repairment.issue.object" defaultMessage='Object' />,
        dataIndex: ['resource', 'name'],
        span: 2,
    },
    {
        title: <FormattedMessage id='pages.repairment.issue.issueDescription' defaultMessage='Description' />,
        dataIndex: 'description',
        span: 2,
    },
    {
        title: <FormattedMessage id="pages.repairment.issue.failureType" defaultMessage='Failure Type' />,
        dataIndex: 'type',
        valueType: 'select',
        render: (_, item) =>
            <Tag color={failureTypeLabel[item.type].color}>
                {failureTypeLabel[item.type].text}
            </Tag>
    },
    {
        title: <FormattedMessage id="pages.repairment.issue.Manufacturer" defaultMessage='manufacturer' />,
        dataIndex: 'manufacturer',
    },
    {
        title: <FormattedMessage id='pages.repairment.issue.priority' defaultMessage='Priority' />,
        dataIndex: 'priority',
        render: (_, item) =>
            <Tag color={priorityList[item.priority].color}>
                {priorityList[item.priority].text}
            </Tag>
    },
    {
        title: <FormattedMessage id='pages.repairment.issue.estimatedTime' defaultMessage='Estimated Time' />,
        dataIndex: 'finish_date',
        valueType: 'dateTime',
    },
    {
        title: <FormattedMessage id='pages.repairment.issue.picture' defaultMessage='Picture' />,
        dataIndex: 'images',
        span: 2,
        render: (_, item) => {
            const picGroup: ReactNode[] = []
            for (let i = 0; i < item.images.length; i++) {
                picGroup.push(
                    <Image
                        className={styles.approvalModalPicture}
                        src={item.images[i]}
                        alt=''
                    />)
            }
            return (
                <Image.PreviewGroup>
                    <Space>
                        {picGroup}
                    </Space>
                </Image.PreviewGroup>
            )
        }
    },
]

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