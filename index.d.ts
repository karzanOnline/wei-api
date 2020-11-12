// 集团微前端标准规范
// Documents: https://yuque.antfin-inc.com/mo/wei/specification
// Project: http://gitlab.alibaba-inc.com/wei/wei-api
// Definitions by: 集团微前端规范小组

/**
 * 微应用的资源信息描述 entry
 */
export interface IAppManifest {
  /**
   * JS类型静态资源加载列表
   */
  scripts: string[],

  /**
   * CSS类型静态资源加载列表
   */
  styles: string[]
}

////////////////
/// IAppConfig
////////////////

/**
 * 描述一个微应用
 */
export interface IAppConfig {
  /**
   * 微应用名称，用以标识一个微应用。
   */
  name: string;

  /**
   * 微应用名称，用以标识一个微应用。
   */
  entry: string | string[] | IAppManifest;
  
  /**
   * 微应用挂载的节点。
   */
  container?: HTMLElement | string;

  /**
   * 微应用受当前路由影响的激活规则。
   */
  activePath?: string | Array<string>;

  /**
   * 下发给微应用的参数列表。
   */
  props?: object;
}

/**
 * 用以补充描述主应用集成微应用时的额外配置，作为第二参数提供给主应用初始化时消费。
 * 多个微应用之间，此配置项一般是相同的。
 */
export interface IOptions {

  /**
   * 是否启用内置的沙箱隔离，或者使用自定义的沙箱实例。
   */
  sandbox?: boolean;

  /**
   * 是否预加载微应用的资源。
   */
  prefetch?: boolean;

  /**
   * 对微应用生命周期监听的钩子函数 - 加载前
   * @param app 
   */
  beforeMount?(app: IApp): void;

  /**
   * 对微应用生命周期监听的钩子函数 - 加载后
   * @param app 
   */
  afterMount?(app: IApp): void;

  /**
   * 对微应用生命周期监听的钩子函数 - 卸载前
   * @param app 
   */
  beforeUnmount?(app: IApp): void;

  /**
   * 对微应用生命周期监听的钩子函数 - 卸载后
   * @param app 
   */
  afterUnmount?(app: IApp): void;

  /**
   * 对微应用生命周期监听的钩子函数 - 更新前
   * @param app 
   */
  beforeUpdate?(app: IApp): void;

  /**
   * 对微应用生命周期监听的钩子函数 - 更新后
   * @param app 
   */
  afterUpdate?(app: IApp): void;
}

////////////////
/// IApp
////////////////

/**
 * 用以描述一个被创建的微应用实例，它具备所有的 IAppConfig 的成员字段，以及一些额外的可被调用的方法。
 */
export interface IApp extends Required<IAppConfig> {

  /**
   * 加载（所有的 entry 资源）
   */ 
  load(): void;
  
  /**
   * 挂载到指定的节点上。
   * @param container 
   * @param props 
   */
  mount(container: HTMLElement, props?: object): void;

  /**
   * 卸载该实例微应用
   */
  unmount(): void;

  /**
   * 更新
   * @param props 
   */
  update(props?: object): void;
}

