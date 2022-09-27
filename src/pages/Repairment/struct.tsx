import { FormattedMessage } from "@umijs/max"
import React from "react"

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