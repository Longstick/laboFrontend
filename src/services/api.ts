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

export const getNextProcesser = async () => {
	let params = await request('/api/getNextProcesser', {method: 'GET'})
	return params.data
}