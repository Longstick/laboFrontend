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
                character: 'dispatcher',
            },
            {
                userid: 2,
                name: 'WZC',
                ID: '12312323',
                phoneNumber: '13537536685',
                email: 'wzc@example.com',
                character: 'maintainer',
            },
            {
                userid: 1,
                name: 'CWS',
                ID: '34699094433',
                phoneNumber: '342434342436',
                email: 'cws@qq.com',
                character: 'maintainer',
            },
            {
                userid: 5,
                name: 'ZJH',
                ID: '201902010315',
                phoneNumber: '12333245542',
                email: 'user@example.com',
                character: 'approver',
            },
        ]
        return res.send({
            data: userData,
            success: true,
            total: userData.length,
        })
    }
}