declare namespace API {
    type TableColumns = {
        key: number;
        issueID: number,
        issueTitle: string,
        issueDescription: string,
        category: any,
        priority: number,
        remainingTime: number,
        estimatedTime: number,
        updatedTime: number,
        status: number,
        object: string,
        failureType: number,
        manufacturer: string,
        picture: string[],
        processDetails: {
            stage: number,
            submit?: {
                success?: boolean,
                processerID?: number,
            },
            approval?: {
                success?: boolean,
                processerID?: number,
                result?: string,
                comments?: string
            },
            dispatch?: {
                success?: boolean,
                processerID?: number,
                result?: string,
                comments?: string
            },
            repairment?: {
                success?: boolean,
                processerID?: number,
                result?: string,
                cause?: string,
                solution?: string
            },
            acceptance?: {
                success?: boolean,
                processerID?: number,
                rating?: number,
                comments?: string
            }
        },
    };

    type ProcesserInfo = {
        processerID: number
        processer: string
        phoneNumber: string
        updateTime: string
    };
}