// @ts-ignore
/* eslint-disable */

import { request } from '@umijs/max';

const serverIP = 'http://43.139.11.85:3000/api'

export const login = async (body: API.LoginParams, options?: { [key: string]: any }) => {
	return request<API.PostResult>(`${serverIP}/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

export const signupInSchool = async (body: API.LoginParams, options?: { [key: string]: any }) => {
	return request<API.PostResult>(`${serverIP}/user/schoolRegister`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

export const signupOutSchool = async (body: API.LoginParams, options?: { [key: string]: any }) => {
	return request<API.PostResult>(`${serverIP}/user/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

export const getCaptcha = async (email: string, options?: { [key: string]: any }) => {
	return request<API.PostResult>(`${serverIP}/user/getCode`, {
		method: 'GET',
		params: email,
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

export const getIssueList = async (options?: { [key: string]: any }) => (
	await request<{
		code: number,
		data: API.IssueInfo,
		msg: string,
	}[]>(`${serverIP}/order/getOrders`, {
		method: 'GET',
		...(options || {}),
	})
)

export const createNewIssue = async (
	body: API.IssueInfo,
	options?: { [key: string]: any },
) => {
	return request<{
		code: number,
		data: API.IssueInfo,
	}>(`${serverIP}/order/createOrder`, {
		method: 'POST',
		data: body,
		// headers: {
		// 	'Content-Type': 'multipart/form-data',
		// },
		...(options || {})
	})
}

export const getApporver = async (orderAuthType: number) => {
	const res = await request<API.PostResult>(`${serverIP}/user/getOrderPerson`, {
		method: 'GET',
		params: orderAuthType,
	})
	const data: API.ProcesserInfo[] = res.data
	return data.map((value) => {
		return {
			label: value.username,
			value: value.identity,
			key: value.identity,
		}
	})
}


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