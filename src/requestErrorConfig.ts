import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res: API.AsyncResult) => {
      const { data, msg, code } = res
      if (code === -1) {
        const error: any = new Error(msg);
        error.name = 'BizError';
        error.info = { code, msg, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warn(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        if (error.response.status === 401) {
          message.warn('身份认证已过期')
        } else {
          message.error('服务器错误，请稍后重试！')
        }
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        // message.error('Response status:', error.response.status);
      } else if (error.request) {
        message.error('请求超时，请重试！')
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
      } else {
        // 发送请求时出了点问题
        message.error('未知错误，请重试！');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    // (config: RequestOptions) => {
    //   // 拦截请求配置，进行个性化处理。
    //   const url = config?.url?.concat('?token = 123');
    //   return { ...config, url };
    // },

    // 首部添加Auth
    (url: string, options: RequestConfig) => {
      const authHeader = {
        Authorization: window.localStorage.getItem('token'),
        // 'Access-Control-Allow-Origin': '*'
      };
      return {
        url: `${url}`,
        options: { ...options, interceptors: true, headers: authHeader },
      }
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response: ResponseStructure) => {
      // 拦截响应数据，进行个性化处理
      // const { data } = response as unknown as ResponseStructure;
      return response;
    },
  ],
};
