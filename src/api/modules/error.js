export const errors = [
  { flag: '-1', message: '服务器系统异常' },
  { flag: '410', message: 'Token已失效或不存在' },
  { flag: '420', message: '账号已在其他地方登陆，请重新登录' }
]
export const getMessage = (flag, msg) => {
  const one = errors.find(v => v.flag === flag)
  return one ? one.message : msg
}
