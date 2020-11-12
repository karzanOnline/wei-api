## 集团微前端标准

### 背景

集团微前端标准的制定是时代发展的产物。2019年集团内外微前端框架如雨后春笋般出现，并在各 BU 落地了对应的业务实践。同时一些对微前端有定制化需求的 BU 想快速复用，但技术选型存在很高的门槛，对想要进入的 BU 成本非常大。

技术方面，各个微前端框架各自为战。解决同一个问题可能会出现不同或大致相同的技术方案，一方面微前端的技术发展存在一定的内耗，另一方面微前端生态体系已有萌芽。

### 目标

标准收敛为一套，促进微前端生态圈发展，支撑业务 BU 快速做技术决策。

### 共建思路图

![](https://img.alicdn.com/imgextra/i4/19999999999999/O1CN01oXAFF52Njasyk35E5_!!19999999999999-2-tps.png)

### 集团标准草案

https://yuque.antfin-inc.com/mo/wei/specification

## Usage

### 安装依赖

```shell
tnpm i @ali/wei-api --save
```

### 开始使用

```jsx
import { IAppConfig, IAppManifest, IOptions, IApp } from '@ali/wei-api'

const appConfig: IAppConfig = {
  name: "wei-micro-app-example1",
  entry: [
    "//wei.alicdn.com/micro-app-example/0.1.0/index.js",
    "//wei.alicdn.com/micro-app-example/0.1.0/index.css"
  ],
  activePath: '/demo1',
  // 传递下发的props
  props: {
    title: 'currentTitle'
  },
  // 根据 string 运行时查找DOM节点
  container: "#root-slave",
}

```

## API

### 路由配置化规范

```jsx
import { setup, start } from '@ali/wei';
import Sandbox from '@ali/sandbox;

setup({
    appConfigs: [{
    name: "wei-micro-app-example1",
    entry: [
      "//wei.alicdn.com/micro-app-example/0.1.0/index.js",
      "//wei.alicdn.com/micro-app-example/0.1.0/index.css"
    ],
    activePath: '/demo1',

    // 传递下发的props
    props: {
      title: 'currentTitle'
    },
   
    // 根据 string 运行时查找DOM节点
    container: "#root-slave",
  }, {
    name: "wei-micro-app-example2",
    entry: {
      "scripts": [
        "//wei.alicdn.com/micro-app-example/0.1.0/chunk-libs.js",
        "//wei.alicdn.com/micro-app-example/0.1.0/index.js"
      ],
      "styles": [
        "//wei.alicdn.com/micro-app-example/0.1.0/chunk-libs.css",
        "//wei.alicdn.com/micro-app-example/0.1.0/index.css"
      ]
    },
    activePath: '/demo2',
  }, {
    name: "wei-micro-app-example3",
    entry: "//wei.alicdn.com/micro-app-example/0.1.0/index.html",
    activePath: '/demo3',
  }],
  options: {
    sandbox: new Sandbox(),
    prefetch: true,

    // 生命周期钩子函数
    beforeMount: (app) => {},
    // ...
  },
})
start();
```

### 注册及运行函数规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| setup  | 注册 app 微应用函数 | IConfig  | 是 | [] |
| start  | 开始运行微应用函数 | -  | 是 | - |

### IConfig - 微应用全局配置规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| appConfigs  | 微应用配置集 | IAppConfig[]  | 是 | - |
| options  | 额外的配置 | IOptions  | 是 | - |

### IAppConfig - app 配置规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| name  | 微应用名称，用以标识一个微应用。 | string  | 是 | - |
| entry  | 微应用的资源信息描述。 | `string | [string, string] | <IAppManifest>`  | 是 | - |
| activePath  | 微应用受当前路由影响的激活规则。 | IActivePath  | 是 | - |
| container  | 微应用挂载的节点。 | HTMLElement  | 是 | - |
| props  | 微应用传入的参数 | object   | 是 | - |

### IOptions - 微应用配置规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| sandbox  | 是否启用内置的沙箱隔离，或者使用自定义的沙箱实例。 | `boolean | ISandbox `  | 否 | false  |
| prefetch  | 是否预加载微应用的资源。 | boolean  | 否 | false |
| activePath  | 微应用受当前路由影响的激活规则。 | IActivePath  | 是 | - |
| container  | 微应用挂载的节点。 | HTMLElement  | 是 | - |
| props  | 微应用传入的参数 | object   | 是 | - |
| beforeMount  | 微应用生命周期 - 加载前 | -   | - | - |
| afterMount  | 微应用生命周期 - 加载后 | - | - | - |
| beforeUnmount  | 微应用生命周期 -卸载前 | - | - | - |
| afterUnmount  | 微应用生命周期 - 卸载后 | - | - | - |
| beforeUpdate  | 微应用生命周期 -更新前 | - | - | - |
| afterUpdate  | 微应用生命周期 - 更新后 | - | - | - |

### IAppManifest - entry 配置规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| script  | js 相关资源 | string[]  | 是 | -  |
| styles  | css 相关资源  | string[]  | 是 | - |

### 手动加载规范

```jsx
import React, { useEffect, useRef } from 'react'
import { createMicroApp } from '@ali/wei';
interface IApp extends Required<IAppConfig> {
  load(): void;
  mount(container: HTMLElement, props?: object): void;
  unmount(): void;
  update(props?: object): void;
}
const APP = () => {
  const containerRef: React.MutableRefObject<any> = useRef();
  
  useEffect(() => {
    const WidgetInstance: IApp = createMicroApp({
      name: 'widgetName',
      container: containerRef.current,
      entry: [
        "//wei.alicdn.com/micro-app-example/0.1.0/index.js",
        "//wei.alicdn.com/micro-app-example/0.1.0/index.css"
      ],
    }, {
      sandbox: true,
      prefetch: true
    })
    WidgetInstance.load();
  }, [])
  
  return (<div ref={containerRef}></div>)
}
```

### 注册函数规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| createMicroApp  | 注册 app 微应用入口 | IConfig  | 是 | [] |


### 返回实例规范

| 配置	 | 说明	 | 类型	 | 是否必填	| 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| load  | 加载子应用 | -  | - | - |
| mount  | 子应用生命周期 - 装载后触发 | `HTMLElement , Props `  | - | - |
| unmount  | 子应用生命周期 - 卸载后触发 | -  | - | - |
| update  | 子应用生命周期 - 更新时触发 | props  | - | - |




