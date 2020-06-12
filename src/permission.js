/* eslint-disable space-before-function-paren */

import store from './store'
import { hasPermission } from '@/utils/login-manage'
// import { goLoginPortal } from '@/utils/client-info'
import { Message } from 'element-ui'

// 路由拦截
async function routerEnterFunc(to, from, next) {
  // 是否有用户id判断有没有登录，有就前往页面
  if (!store.getters.userId) {
    // 没有userid看有没有token，有就获取信息
    if (!store.getters.token) {
      // 没有token看url上有没有token，有就获取信息，做好iframe处理
      // iframe在地址上带token，统一登录平台带code
      if (!to.query.token && !to.query.code) {
        // 这个应用不用接入统一登入页，直接放行了
        console.log('直接放行')
        next()
        // goLoginPortal()
      } else {
        const token = to.query.token
        store.commit('user/CHANGE_TOKEN', token)
        try {
          // 登录
          const isOk = await store.dispatch('user/getUserInfoByToken')
          console.log(isOk)
          const R = store.state.user.accessedRoutes
          if (isOk && R[0].path !== '*') {
            const homePath = R[0].redirect || R[0].path
            next(homePath)
          } else {
            messageTIP('抱歉！您暂无权限进入此应用！', next)
          }
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      try {
        // 获取用户id，要么token失效，要么接口有问题
        const isOk = await store.dispatch('user/getUserInfoByToken')
        console.log(isOk, 2)
        const R = store.state.user.accessedRoutes
        if (isOk && R[0].path !== '*') {
          const homePath = R[0].redirect || R[0].path
          next(homePath)
        } else {
          messageTIP('抱歉！您暂无权限进入此应用！', next)
        }
      } catch (error) {
        console.log(error)
      }
    }
  } else {
    const roles = store.state.user.roles
    const R = store.state.user.accessedRoutes
    if (hasPermission(roles, to) && to.path !== '/') {
      next()
    } else {
      if (R[0].path === '*') {
        messageTIP('抱歉！您暂无权限进入此应用！', next)
        return
      }
      const homePath = R[0].redirect || R[0].path
      if (to.path === homePath || to.redirect === homePath) {
        next()
      } else {
        next(homePath)
      }
    }
  }
}
async function messageTIP(str, next) {
  Message.error(str)
  await store.dispatch('user/loginOutByToken')
}

const changeTitle = (title) => (document.title = title)
const mainTitle = store.state.settings.title
const routerAfterFunc = (to) => {
  store.commit('app/SET_CONTENT_LOADING', false)
  store.commit('app/SET_WHOLE_PAGE_LOADING', false)
  const title = to.meta.title ? `${to.meta.title} - ${mainTitle}` : mainTitle
  changeTitle(title)
}

export {
  routerEnterFunc,
  routerAfterFunc
}
