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
        color: 'red',
        text: (<FormattedMessage
            id="pages.repairment.issue.priority.high"
            defaultMessage='High'
        />)
    },
    1: {
        color: 'warning',
        text: (<FormattedMessage
            id="pages.repairment.issue.priority.medium"
            defaultMessage='Medium'
        />)
    },
    2: {
        color: 'success',
        text: (<FormattedMessage
            id="pages.repairment.issue.priority.low"
            defaultMessage='Low'
        />)
    }
}

export const statusList = {
    0: {
        text: (<FormattedMessage
            id="pages.repairment.issue.status.processing"
            defaultMessage='Processing'
        />),
        status: 'Default',
    },
    1: {
        text: (<FormattedMessage
            id="pages.repairment.issue.status.done"
            defaultMessage='Done'
        />),
        status: 'Success',
    },
    2: {
        text: (<FormattedMessage
            id="pages.repairment.issue.status.error"
            defaultMessage='Error'
        />),
        status: 'Error',
    }
}

export const stepLabel = {
    0: (<FormattedMessage id="pages.repairment.issue.submit" defaultMessage="Submit" />),
    1: (<FormattedMessage id="pages.repairment.issue.approval" defaultMessage="Approval" />),
    2: (<FormattedMessage id="pages.repairment.issue.dispatch" defaultMessage="Dispatch" />),
    3: (<FormattedMessage id="pages.repairment.issue.repairment" defaultMessage="Repairment" />),
    4: (<FormattedMessage id="pages.repairment.issue.acceptance" defaultMessage="Acceptance" />),
};

export const failureTypeLabel = {
    0: (<FormattedMessage id="pages.repairment.issue.failureType.badlyDamaged" defaultMessage="badly damaged" />),
    1: (<FormattedMessage id="pages.repairment.issue.failureType.slightlyDamaged" defaultMessage="slightly damaged" />),
    2: (<FormattedMessage id="pages.repairment.issue.failureType.affectUse" defaultMessage="affect use" />),
    3: (<FormattedMessage id="pages.repairment.issue.failureType.needImproved" defaultMessage="need improved" />),
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


export const issueColumns: ProDescriptionsItemProps[] = [
    {
        title: <FormattedMessage id='pages.repairment.issue.issueTitle' defaultMessage='Issue Title' />,
        dataIndex: 'issueTitle',
        span: 2,

    },
    {
        title: <FormattedMessage id="pages.repairment.issue.object" defaultMessage='Object' />,
        dataIndex: 'object',
        span: 2,
    },
    {
        title: <FormattedMessage id='pages.repairment.issue.issueDescription' defaultMessage='Description' />,
        dataIndex: 'issueDescription',
        span: 2,
    },
    {
        title: <FormattedMessage id="pages.repairment.issue.failureType" defaultMessage='Failure Type' />,
        dataIndex: 'failureType',
        valueEnum: failureTypeLabel,
        valueType: 'select',
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
        dataIndex: 'estimatedTime',
        valueType: 'dateTime',
    },
    {
        title: <FormattedMessage id='pages.repairment.issue.picture' defaultMessage='Picture' />,
        dataIndex: 'picture',
        span: 2,
        render: (_, item) => {
            const picGroup: ReactNode[] = []
            for (let i = 0; i < item.picture.length; i++) {
                picGroup.push(
                    <Image
                        className={styles.approvalModalPicture}
                        src={item.picture[i]}
                        alt='123'
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