// @ts-ignore
/* eslint-disable */

import { request } from '@umijs/max';

export const login = async (body: API.LoginParams, options?: { [key: string]: any }) => {
	return request<API.LoginResult>('http://1.13.198.41:3000/api/user/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}


export const getUserInfo = async ( options?: { [key: string]: any }) => {
	return request<{
		data: API.UserInfo
	}>('http://1.13.198.41:3000/api/user/getUserInfo', {
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

/** 工单表获取规则列表 GET /api/rule */
export async function issueTableRule(
	params: {
		// query
		/** 当前的页码 */
		current?: number;
		/** 页面的容量 */
		pageSize?: number;
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

export async function getApporver(options?: { [key: string]: any }) {
	return request<API.ProcesserInfo>('/api/getApporver', {
		method: 'GET',
		...options || {},
	})
}

export const getStaff = async (params: string) => (
	await request('/api/getStaff', {
		method: 'GET',
		params: params,
	})).data


export const getTrackingNumber = async (options?: { [key: string]: any }) => {
	let params = await request('/api/getTrackingNumber', {
		method: 'GET',
		...(options || {}),
	})
	return params
}