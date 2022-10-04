import { Request, Response } from 'express';
import { parse } from 'url';

const getRandomInt = (range: number) => {
    return Math.floor(Math.random() * range)
}


const genList = (current: number, pageSize: number) => {
    const tableListDataSource: API.TableColumns[] = []
    for (let i = 0; i < pageSize; i++) {
      tableListDataSource.push({
        key: i,
        issueID: i,
        issueTitle: '实验器材损坏',
        issueDescription: '今天上午在实验室使用仪器的时候发现仪器损坏balabalabalablabalabalabalabalablabalabalabalabalablabalabalabalabalablabala',
        category: getRandomInt(3),
        priority: getRandomInt(3),
        remainingTime: Date.now(),
        estimatedTime: Date.now() + getRandomInt(3600000000),
        updatedTime: Date.now() + getRandomInt(3600000000),
        status: 0,
        currentProcesser: getRandomInt(2),
        object: '大数据学院楼-204-椅子0015',
        failureType: 1,
        manufacturer: '西昊 XiHao',
        picture: ['https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'],
        trackingNumber: '123231',
        processDetails: {
          // stage: getRandomInt(5),
          stage: 3,
          submit: {
            processerID: 1,
            status: 'finish',
          },
          approval: {
            processerID: 1,
            status: 'process',
            result: 'pass',
            comments: 'BDI equipment'
          },
          dispatch: {
            processerID: 1,
            status: 'process',
            result: 'pass',
            comments: 'dispatcher HHX'
          },
          repairment: {
            processerID: 1,
            status: 'process',
            result: 'done',
            cause: 'somebody pour some water on it.',
            solution: 'have to change motherboard',
            stage: 1
          },
          acceptance: {
            processerID: 1,
            status: 'process',
            rating: 5,
            comments: 'what a good repairman'
          }
        }
      })
    }
    // tableListDataSource.reverse();
    return tableListDataSource;
  };
  
  let tableListDataSource = genList(1, 100);
  
  function getRule(req: Request, res: Response, u: string) {
    let realUrl = u;
    if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
      realUrl = req.url;
    }
    const { current = 1, pageSize = 10 } = req.query;
    const params = parse(realUrl, true).query as unknown as API.PageParams &
      API.TableColumns & {
        sorter: any;
        filter: any;
      };
  
    let dataSource = [...tableListDataSource].slice(
      ((current as number) - 1) * (pageSize as number),
      (current as number) * (pageSize as number),
    );
    if (params.sorter) {
      const sorter = JSON.parse(params.sorter);
      dataSource = dataSource.sort((prev, next) => {
        let sortNumber = 0;
        Object.keys(sorter).forEach((key) => {
          if (sorter[key] === 'descend') {
            if (prev[key] - next[key] > 0) {
              sortNumber += -1;
            } else {
              sortNumber += 1;
            }
            return;
          }
          if (prev[key] - next[key] > 0) {
            sortNumber += 1;
          } else {
            sortNumber += -1;
          }
        });
        return sortNumber;
      });
    }
    if (params.filter) {
      const filter = JSON.parse(params.filter as any) as {
        [key: string]: string[];
      };
      if (Object.keys(filter).length > 0) {
        dataSource = dataSource.filter((item) => {
          return Object.keys(filter).some((key) => {
            if (!filter[key]) {
              return true;
            }
            if (filter[key].includes(`${item[key]}`)) {
              return true;
            }
            return false;
          });
        });
      }
    }
  
    const result = {
      data: dataSource,
      total: tableListDataSource.length,
      success: true,
      pageSize,
      current: parseInt(`${params.current}`, 10) || 1,
    };
  
    return res.json(result);
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
    'GET /api/rule': getRule,
    'GET /api/getApporver': getApporver,
    'GET /api/getStaff': getStaff,
    'GET /api/getTrackingNumber': getTrackingNumber
}