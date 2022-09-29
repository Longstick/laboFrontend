import { Request, Response } from 'express';

const getRandomInt = (range: number) => {
    return Math.floor(Math.random() * range)
}

const getApporver = (req: Request, res: Response) => {
    const dataSource: API.ProcesserInfo = {
        processerID: 1,
        processer: 'Longstick',
        phoneNumber: '13537536685',
        updateTime: '2022-09-23 12:00:00',
    }
    return res.json({
        data: dataSource,
        success: true,
    })
}

const getNextProcesser = (req: Request, res: Response) => {
    const processer: {label: string, value: number}[] = [
        {
            label: 'hhx',
            value: 1,
        },
        {
            label: 'wzc',
            value: 2,
        },
        {
            label: 'cws',
            value: 3,
        },
        {
            label: 'zjh',
            value: 4,
        },
    ]

    return res.json({
        data: processer,
        success: true,
    })
}

const getTrackingNumber = (req:Request, res: Response) => {
    return res.json({
        data:{ trackingNumber: '123123123123' },
        success: true,
    })
}

export default {
    'GET /api/getApporver': getApporver,
    'GET /api/getNextProcesser': getNextProcesser,
    'GET /api/getTrackingNumber': getTrackingNumber,
}