import { ProCard } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max"
import { Typography } from "antd";
import React from "react"

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
