import { matchRoutes, RequestConfig } from '@umijs/max';
import { notification } from 'antd';

// app.ts 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '聆心FM' };
}

export function onRouteChange({
  clientRoutes,
  location,
}: {
  clientRoutes: any;
  location: any;
}) {
  const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
  if (route) {
    document.title = (route as any).title || '';
  }
}

// 导出的一个运行时request对象
export const request: RequestConfig = {
  timeout: 4000,
  errorConfig: {
    errorHandler(error: any) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
      throw error;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorThrower(res) {},
  },
  //请求拦截
  requestInterceptors: [
    [
      (config) => {
        // 拦截请求配置，进行个性化处理。
        const url = config.url;
        return { ...config, url };
      },
    ],
  ],
  //响应拦截
  responseInterceptors: [
    (response) => {
      // console.log("响应拦截器",response)
      return response;
    },
  ],
};
