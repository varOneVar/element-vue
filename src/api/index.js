import { __get, __post } from './modules/interceptor'

// // https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./constant', true, /\.js$/)
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const API = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const result = (apiName, args, config) => {
  const methods = apiName.split('_')[0] || 'GET'
  const obj = {
    GET: __get,
    POST: __post
  }
  const F = obj[methods]
  return [F](args, config)
}

function installAxios(Vue) {
  Vue.prototype.$api = API
  Vue.prototype.$apiFn = result
}

export default installAxios
