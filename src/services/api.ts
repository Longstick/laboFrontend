// @ts-ignore
/* eslint-disable */

import { request } from '@umijs/max';

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