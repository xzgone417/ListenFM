import { defineConfig } from '@umijs/max';

// umi项目的配置文件
export default defineConfig({
  // alias别名，Umi 内置了以下别名：
  // 1. @ 表示 项目 src 目录
  // 2. @@ 表示 临时目录，通常是 src/.umi 目录
  // 3. umi 表示 当前所运行的 umi 仓库目录
  alias: {
  },
  // 开启文件hash后缀
  hash: true,
  // 启用 history 路由
  history: {
    type: 'browser'
  },
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: { '@primary-color': '#1DA57A' },
  // 指定react-router的base，部署到根目录时需要配置
  base: '/',
  // 指定webpack的publicPath，指向静态资源文件所在的路径
  publicPath: '/',
  // DefinePlugin 全局常量定义
  define: { FOO: 'bar' },
  // 配置图片文件是否走 base64 编译的阈值
  inlineLimit: 10000,
  // 配置额外的 meta 标签
  metas: [
  ],

  // 代理配置
  proxy: {
    '/fm': {
      'target': 'http://yiapi.xinli001.com',
      'changeOrigin': true,
      // 'pathRewrite': { '^/fm': '' },
    },
      '/fm2': {
      'target': 'http://bapi.xinli001.com',
      'changeOrigin': true,
      // 'pathRewrite': { '^/fm2': '' },
    }
  },

  routes: [
    {
      path: "/",
      component: '@/layouts/index2',
      routes: [
        { path: "/home", component: "home", title: "首页" },
      ]
    }
  ],

  // 开启ant design插件
  antd: {},
  // 开启model插件
  model: {},
  // 开启initialState插件
  initialState: {},
  // 开启locale插件
  locale: {
    default: 'zh-CN',    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    baseSeparator: '-'
  },
  // 开启request插件
  request: {
    dataField: 'data'
  },
  // 开启dva
  dva: {},
  npmClient: 'pnpm'
});

