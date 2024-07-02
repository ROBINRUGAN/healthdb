# 🌟 益诊EasyCare——健康管理系统

2022FZU软件工程数据库实践项目（SinoDB）

## 📝 项目功能说明

![alt text](/mdAssets/overall.png)

## 🖥️ 项目展示

### 📥 下载页

![alt text](/mdAssets/image.png)

### 🔓 登录

![alt text](/mdAssets/image-1.png)

### 📝 注册

![alt text](/mdAssets/image-2.png)

### 🏥 医院查询

![alt text](/mdAssets/image-3.png)

### 📍 定位选取

![alt text](/mdAssets/image-4.png)

### 📅 预约陪诊

![alt text](/mdAssets/image-5.png)

### 🛒 下单

![alt text](/mdAssets/image-6.png)

### 🌟 每日精选

![alt text](/mdAssets/image-7.png)

### 📄 订单详情

![alt text](/mdAssets/image-8.png)

### 👩‍⚕️ 陪诊师信息

![alt text](/mdAssets/image-9.png)

### ⭐ 订单评价

![alt text](/mdAssets/image-10.png)

### ➕ 加入陪诊师

![alt text](/mdAssets/image-11.png)

### 👥 陪诊客户

![alt text](/mdAssets/image-12.png)

### 💰 充值提现

![alt text](/mdAssets/image-13.png)

### 📝 我的评价

![alt text](/mdAssets/image-14.png)

### 🔄 修改信息

![alt text](/mdAssets/image-15.png)

### ➕ 新增就诊人

![alt text](/mdAssets/image-16.png)

### 💬 意见反馈

![alt text](/mdAssets/image-17.png)

## 📊 E-R图

![alt text](/mdAssets/E-R.png)

## 🛠️ 技术栈

![Vue3](https://img.shields.io/badge/-Vue3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vant](https://img.shields.io/badge/-Vant4-07C160?style=for-the-badge&logo=html5&logoColor=white)
![Yarn](https://img.shields.io/badge/-Yarn-2188B6?style=for-the-badge&logo=yarn&logoColor=white)
![Pinia](https://img.shields.io/badge/-Pinia-42B883?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Axios](https://img.shields.io/badge/-Axios-671DDF?style=for-the-badge&logo=axios&logoColor=white)
![Spring Boot](https://img.shields.io/badge/-Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![MyBatis Plus](https://img.shields.io/badge/-MyBatis%20Plus-FF6347?style=for-the-badge&logo=database&logoColor=white)
![Spring Security](https://img.shields.io/badge/-Spring%20Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/-Git-F05032?style=for-the-badge&logo=git&logoColor=white)

- 使用国产自研数据库SinoDB进行数据管理
- 采用Vant4做移动端组件库，适配各手机、平板、电脑
- 前端采用Vue3+TypeScript+Pinia+Axios+VueRouter五件套标准进行开发
- Pinia进行持久化，Vant组件自动解包
- 前后端均部署，后端采用docker集成
- 后端采用SpringBoot+MybatisPlus+SpringSecurity三件套标准进行开发
- 使用Capacitor实现原生Android，iOS跨平台APP

## 🗂️ 项目结构

```sh
//前端目录树
├── App.vue
├── api //相关接口
│   ├── article //首页文章接口
│   │   ├── index.ts
│   │   └── type.ts
│   ├── escort //陪诊相关接口
│   │   ├── index.ts
│   │   └── type.ts
│   ├── evaluate //评论相关接口
│   │   ├── index.ts
│   │   └── type.ts
│   ├── file //文件上传相关接口
│   │   ├── index.ts
│   │   └── type.ts
│   ├── hosp //医院相关接口
│   │   ├── index.ts
│   │   └── type.ts
│   ├── hosp_server //服务类型接口
│   │   ├── index.ts
│   │   └── type.ts
│   ├── order //订单接口
│   │   ├── index.ts
│   │   └── type.ts
│   ├── patient //就诊人相关接口
│   │   ├── index.ts
│   │   └── type.ts
│   ├── type.ts //通用返回结果接口
│   └── user
│       ├── index.ts
│       └── type.ts
├── assets //静态图片和logo
│   ├── download
│   │   ├── Android.svg
│   │   ├── iOS.svg
│   │   ├── logo.png
│   │   └── web.svg
│   ├── home
│   │   ├── back.png
│   │   ├── bar.png
│   │   ├── img1.png
│   │   ├── img2.png
│   │   ├── location.png
│   │   └── mew.jpg
│   ├── hosp
│   │   ├── demo.jpg
│   │   └── info.jpg
│   ├── join
│   ├── login
│   │   └── back.png
│   ├── me
│   │   └── patient.jpeg
│   └── order
├── components //相关卡片和小组件
│   ├── BarLine.vue
│   ├── CardItem.vue
│   ├── CommentItem.vue
│   ├── CompItem.vue
│   ├── HaveCommentedOrder.vue
│   ├── HospItem.vue
│   └── OrderItem.vue
├── main.ts
├── router //路由管理
│   └── index.ts
├── stores //pinia全局状态管理
│   └── auth.ts
├── utils //Axios拦截器
│   └── request.ts
└── views //主要页面
    ├── ArticleView.vue
    ├── CommentDetailView.vue
    ├── CommentView.vue
    ├── CompView.vue
    ├── DownloadView.vue
    ├── HaveCommentedDetailView.vue
    ├── HelperOrderView.vue
    ├── HomeView.vue
    ├── HospView.vue
    ├── IWantView.vue
    ├── JoinView.vue
    ├── LoginView.vue
    ├── MeView.vue
    ├── OrderDetailView.vue
    ├── OrderView.vue
    ├── PatientView.vue
    ├── PaymentView.vue
    ├── RegisterView.vue
    ├── SearchView.vue
    └── UserInfoView.vue
```

## 🚀 后端设计

![alt text](/mdAssets/backend.png)

## ⚡ 快速启动

```sh
yarn
```

```sh
yarn vite
```
