export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '教育之星-大仙',
  /**
   * @description api请求基础路径
   */
    /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
   /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  baseUrl: {
    dev: 'http://localhost:8661/',
    pro: 'https://produce.com'
  },
  /**
   * 上传文件请求
   */
  uploadFileRequest:[
    'upload'
  ],
  /**
   * form表单的形式提交
   */
  FormRequest:[
    'auth/login'
  ],
    /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
