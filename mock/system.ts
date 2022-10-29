import { request, Request, Response } from 'express'

export default {
    'GET /api/getUserData': (req: Request, res: Response) => {
        const userData: API.UserTableColumnsType[] = [
            {
                userid: 4,
                name: 'HHX',
                ID: '201902010315',
                phoneNumber: '13537536685',
                email: 'userhhx@example.com',
                character: 0,
            },
            {
                userid: 2,
                name: 'WZC',
                ID: '12312323',
                phoneNumber: '13537536685',
                email: 'wzc@example.com',
                character: 1,
            },
            {
                userid: 1,
                name: 'CWS',
                ID: '34699094433',
                phoneNumber: '342434342436',
                email: 'cws@qq.com',
                character: 1,
            },
            {
                userid: 5,
                name: 'ZJH',
                ID: '201902010315',
                phoneNumber: '12333245542',
                email: 'user@example.com',
                character: 3,
            },
        ]
        return res.send({
            data: userData,
            success: true,
            total: userData.length,
        })
    },

    'GET /api/getCharData': (req: Request, res: Response) => {
        const userData: API.CharacterInfo[] = [
            {
                charID: 0,
                charName: '审核员',
                charDesc: '12123123',
                createUserID: '123123',
                createUserPhone: '13537536685',
                authGroup: ['approve']
            },
            {
                charID: 1,
                charName: '大型设备管理员',
                charDesc: '可以维修大型设备，也可以派发给其他同事维修',
                createUserID: '1312',
                createUserPhone: '13537536685',
                authGroup: ['maintain', 'dispatch', 'equipmentManage', 'systemManage']
            },
            {
                charID: 2,
                charName: '维修组长',
                charDesc: '维修组长可以对工单审批',
                createUserID: '113312',
                createUserPhone: '13537536685',
                authGroup: ['approve', 'maintain']
            },
            {
                charID: 3,
                charName: '中台工单管理员',
                charDesc: '主要负责中台的工单的流程流转，管理工单平台',
                createUserID: '123123',
                createUserPhone: '13537536685',
                authGroup: ['approve', 'dispatch', 'systemManage']
            },
        ]
        return res.send({
            data: userData,
            success: true,
            total: userData.length,
        })
    }

}