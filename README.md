# 逸云图库 - 前端项目

[![Vue Version](https://img.shields.io/badge/Vue-3.3.4-brightgreen)](https://vuejs.org/)
[![Vite Version](https://img.shields.io/badge/Vite-4.4.9-blueviolet)](https://vitejs.dev/)
[![Ant Design Vue](https://img.shields.io/badge/Ant%20Design%20Vue-3.2.20-blue)](https://www.antdv.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue)](https://www.typescriptlang.org/)
[![Pinia](https://img.shields.io/badge/Pinia-2.1.6-orange)](https://pinia.vuejs.org/)

逸云图库是一个功能强大的图片管理系统，提供图片存储、分类、元数据管理和智能审核等功能。本仓库包含逸云图库的前端项目代码。

## 技术架构

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite 4
- **UI 组件库**: Ant Design Vue 3.x
- **可视化**: ECharts 5 + Vue-ECharts
- **状态管理**: Pinia
- **路由管理**: Vue Router 4
- **HTTP 客户端**: Axios
- **代码规范**: ESLint + Prettier

## 功能特性

- **图片管理界面**
  - 图片上传与预览
  - 图片元数据展示
  - 图片裁剪与编辑
  - 批量图片操作
- **空间管理**
  - 私有/团队空间切换
  - 空间成员管理
  - 空间权限控制
- **用户系统**
  - 用户注册与登录
  - 个人信息管理
  - 权限角色管理
- **数据可视化**
  - 空间使用分析
  - 图片分类统计
  - 用户活跃度分析
- **响应式设计**
  - 适配桌面与移动设备
  - 暗黑模式支持

## 项目结构

```
picture-frontend/
├── src/                # 源代码目录
│   ├── api/            # API 接口定义
│   ├── assets/         # 静态资源
│   ├── components/     # 公共组件
│   ├── constants/      # 常量定义
│   ├── layouts/        # 布局组件
│   ├── pages/          # 页面组件
│   ├── router/         # 路由配置
│   ├── stores/         # Pinia 状态管理
│   ├── utils/          # 工具函数
│   ├── App.vue         # 根组件
│   └── main.ts         # 入口文件
├── public/             # 公共静态资源
└── package.json        # 项目依赖配置
```

## 快速启动

### 环境要求
- Node.js 18+
- npm 9+

### 安装依赖
```bash
npm install
```

### 开发环境编译并热重载
```bash
npm run dev
```

### 生产环境类型检查、编译和压缩
```bash
npm run build
```

### 使用 ESLint 进行代码检查
```bash
npm run lint
```

## 开发指南

### 目录规范
- 组件使用 PascalCase 命名
- 页面放置在 `pages` 目录下
- API 接口按模块分类放置在 `api` 目录下
- 工具函数放置在 `utils` 目录下

### 开发流程
1. 从主分支创建功能分支
2. 开发并测试新功能
3. 提交代码并创建 Pull Request
4. 代码审查通过后合并到主分支

## 与后端交互

本项目通过 RESTful API 与后端服务进行交互，API 接口定义位于 `src/api` 目录下。

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

[MIT License](LICENSE)
