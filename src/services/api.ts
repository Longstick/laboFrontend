// @ts-ignore
/* eslint-disable */

import { request } from '@umijs/max';
import { message } from 'antd';

const serverIP = 'http://43.139.11.85:3000/api'

export const login = async (body: API.LoginParams, options?: { [key: string]: any }) => {
	return request<API.AsyncResult>(`${serverIP}/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

export const signupInSchool = async (body: API.LoginParams, options?: { [key: string]: any }) => {
	return request<API.AsyncResult>(`${serverIP}/user/schoolRegister`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

export const signupOutSchool = async (body: API.LoginParams, options?: { [key: string]: any }) => {
	return request<API.AsyncResult>(`${serverIP}/user/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

export const getCaptcha = async (email: string, options?: { [key: string]: any }) => {
	return request<API.AsyncResult>(`${serverIP}/user/getCode`, {
		method: 'GET',
		params: { email: email },
	})
}


export const getUserInfo = async (options?: { [key: string]: any }) => {
	return request<{
		data: API.UserInfo
	}>(`${serverIP}/user/getUserInfo`, {
		method: 'GET',
		...(options || {}),
	})
}

// export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
// 	return request<API.LoginResult>('/api/login/account', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		data: body,
// 		...(options || {}),
// 	});
// }

/** 工单表获取数据 GET /api/rule */
export async function issueTableRule(
	params: {
		// query
		/** 当前的页码 */
		current?: number;
		/** 页面的容量 */
		pageSize?: number;
		activeKey?: string;
	},
	options?: { [key: string]: any },
) {
	return request<API.TableColumns>('/api/rule', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

export const getIssueList = async (
	params: {
		current?: number;
		pageSize?: number;
		activeKey?: string,
	},
	options?: { [key: string]: any }
) => {
	const apiMap = {
		'all': 1,
		'to-do': 2,
		'myCompleted': 3,
		'mySubmission': 4,
	}
	const res = await request<API.AsyncResult>(`${serverIP}/order/searchOrder`, {
		method: 'GET',
		params: {
			page: params.current,
			limit: params.pageSize,
			order_type: apiMap[params.activeKey!],
			...params
		},
		...(options || {}),
	})
	return {
		data: res.data.orders,
		success: true,
		total: res.data.count,
	}
}

export const getIssueDetail = async (orderID: string) => (
	await request<API.AsyncResult>(`${serverIP}/order/getOrder`, {
		method: 'GET',
		params: { orderId: orderID },
	})
)

export const getTodoList = async (
	params: {
		current?: number;
		pageSize?: number;
	},
	options?: { [key: string]: any }
) => {
	const res = await request<API.AsyncResult>(`${serverIP}/order/getToDoOrders`, {
		method: 'GET',
		params: {
			page: params.current,
			limit: params.pageSize,
			...params
		},
		...(options || {}),
	})
	return {
		data: res.data.orders,
		success: true,
		total: res.data.count,
	}
}


export const createNewIssue = async (
	body: FormData,
	options?: { [key: string]: any },
) => {
	return request<API.AsyncResult>(`${serverIP}/order/createOrder`, {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		data: body,
		...(options || {})
	})
}

export const getApporver = async (orderAuthType: number) => {
	const res = await request<API.AsyncResult>(`${serverIP}/user/getOrderPerson`, {
		method: 'GET',
		params: orderAuthType,
	})
	const data: API.ProcesserInfo[] = res.data
	return data.map((value) => {
		return {
			label: value.username,
			value: value.id,
			key: value.identity,
		}
	})
}

export const getResourceID = async (params: { keyWords: string | undefined }) => {
	const res = await request<API.AsyncResult>(`${serverIP}/resource/searchResource`, {
		method: 'GET',
		params: { condition: params?.keyWords },
	})
	const data: API.ResourceInfo[] = res.data
	return data.map((value) => {
		return {
			label: `${value.identifier} ${value.name}`,
			value: value.id,
			key: value.identifier,
		}
	})
}

export const searchResources = async (params: {
	current?: number;
	pageSize?: number;
}, options?: { [key: string]: any }) => {
	const res = await request<API.AsyncResult>(`${serverIP}/resource/searchResources`, {
		method: 'GET',
		params: {
			page: params.current,
			limit: params.pageSize,
			...params
		},
		...(options || {}),
	})
	return {
		data: res.data.resources,
		success: true,
		total: res.data.count,
	}
}


export const submitOnProccess = async (currentStage: number, body: API.OrderNode, options?: { [key: string]: any }) => {
	return request<API.AsyncResult>({
		1: `${serverIP}/order/approvalOrder`,
		2: `${serverIP}/order/dispatchOrder`,
		3: `${serverIP}/order/repairOrder`,
	}[currentStage]!, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}


export const submitOnAcceptance = async (
	body: FormData,
	options?: { [key: string]: any },
) => {
	return request<API.AsyncResult>(`${serverIP}/order/checkBeforeAccept`, {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		data: body,
		...(options || {})
	})
}

export const getAllUsers = async (
	params: {
		current?: number; //当前页码
		pageSize?: number; //每页容量
		activeKey?: string;
	},
	options?: { [key: string]: any },
) => {
	const res = await request<API.AsyncResult>(`${serverIP}/user/getAllPerson`, {
		method: 'GET',
		params: {
			page: params.current,
			limit: params.pageSize,
		},
		...(options || {}),
	})
	res.data.users.forEach((user: API.UserInfo) => {
		const authlist = []
		if (user.isExamine === 1) {
			authlist.push('approve')
		}
		if (user.isDispatch === 1) {
			authlist.push('dispatch')
		}
		if (user.isRepair === 1) {
			authlist.push('maintain')
		}
		if (user.isAccept === 1) {
			authlist.push('accept')
		}
		user['authList'] = authlist.sort()

		if (user.systemManage === 1) { user['manageType'] = 'systemManage' }
		else if (user.equipManage === 1) { user['manageType'] = 'equipmentManage' }
		else { user['manageType'] = 'none' }
	})
	return {
		data: res.data.users,
		success: true,
		total: res.data.count
	}
}


export const setProcessAuth = async (
	params: {
		email: string
		authList: string[]
	}
) => {
	const body = {
		...params,
		isExamine: 0,
		isDispatch: 0,
		isRepair: 0,
		isAccept: 0,
	}
	body.authList.forEach((auth) => {
		switch (auth) {
			case 'approve': {
				body['isExamine'] = 1
				break;
			}
			case 'dispatch': {
				body['isDispatch'] = 1
				break;
			} case 'maintain': {
				body['isRepair'] = 1
				break;
			}
			case 'accept': {
				body['isAccept'] = 1
				break;
			}
		}
	})
	return request<API.AsyncResult>(`${serverIP}/user/setOrderAuth`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
	})
}


export const setManageAuth = async (params: {
	email: string
	managetype: string,
}) => {
	//因后端逻辑，更改系统权限之前需要先调用一次接口取消掉之前的管理权限，否则权限会冲突
	const cancelBody = {
		...params,
		isHaveMange: 0,
		manageType: 0,
	}
	const body = {
		...params,
		isHaveMange: 0,
		manageType: 0,
	}
	switch (params.managetype) {
		case 'systemManage': {
			cancelBody['manageType'] = 2
			cancelBody['isHaveMange'] = 0
			body['manageType'] = 1
			body['isHaveMange'] = 1
			break;
		}
		case 'equipmentManage': {
			cancelBody['manageType'] = 1
			cancelBody['isHaveMange'] = 0
			body['manageType'] = 2
			body['isHaveMange'] = 1
			break;
		}
		case 'none': {
			cancelBody['manageType'] = 1
			cancelBody['isHaveMange'] = 0
			body['manageType'] = 2
			body['isHaveMange'] = 0
			break;
		}
	}
	await request<API.AsyncResult>(`${serverIP}/user/setManage`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: cancelBody,
	})

	return request<API.AsyncResult>(`${serverIP}/user/setManage`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
	})
}

export const discardResource = async (identifier: string) => {
	return request(`${serverIP}/resource/setResourceAbandonment`, {
		method: 'POST',
		data: { identifier: identifier },
	})
}


//------------------------------------------------------------------------------


export const getStaff = async (params: string) => (
	await request<{
		data: {
			key?: string
			label: string
			value: number | string
		}[]
	}>('/api/getStaff', {
		method: 'GET',
		params: params,
	})).data


export const getDeliveryInfo = async (options?: { [key: string]: any }) => {
	let params = await request<API.TrackingInfo>('/api/getDeliveryInfo', {
		method: 'GET',
		...(options || {}),
	})
	return params
}

export const getUserData = async (options?: { [key: string]: any }) => {
	return request('/api/getUserData', {
		method: 'GET',
		...(options || {}),
	})
}

export const getCharData = async (options?: { [key: string]: any }) => {
	return request<{ data: API.CharacterInfo[] }>('/api/getCharData', {
		method: 'GET',
		...(options || {}),
	})
}