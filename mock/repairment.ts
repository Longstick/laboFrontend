import { query, Request, Response } from 'express';

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

const getStaff = (req: Request, res: Response) => {
    const { staffType } = req.query
    const student = [
        {label: 'hhx', value: 0},
        {label: 'wzc', value: 1},
        {label: 'cws', value: 2},
        {label: 'zjh', value: 3},
    ]

    const teacher = [
        {label: 'Li Ju', value: 4},
        {label: 'Liu Chengjian', value: 5},
        {label: 'Li Fajun', value: 6},
        {label: 'Fan Jun', value: 7},
    ]
    let dataSource: any[] = []
    switch(staffType){
        case 'student': dataSource = student; break;
        case 'teacher': dataSource = teacher; break;
        case 'all': dataSource = student.concat(teacher); break;
    }
    return res.json({
        data: dataSource,
        success: true,
    })
}

const getTrackingNumber = (req: Request, res: Response) => {
    return res.json({
        data: { 
            trackingNumber: 'sf123jj1239055000051',
            deliveryCompany: '顺丰',
            shippingAddress: '深圳市坪山区深圳技术大学大数据与互联网学院C-1楼204实验室',
            senderPhone: '13537536685',
            sender: '黄先生'
        },
        success: true,
    })
}

export default {
    'GET /api/getApporver': getApporver,
    'GET /api/getStaff': getStaff,
    'GET /api/getTrackingNumber': getTrackingNumber
}