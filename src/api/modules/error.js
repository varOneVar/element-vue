export const errors = [
  { code: '-1', message: '服务器系统异常' },
  { code: '410', message: 'Token已失效或不存在' },
  { code: '420', message: '账号已在其他地方登陆，请重新登录' }
]
export const getMessage = (code, msg) => {
  const one = errors.find(v => v.code === code)
  return one ? one.message : msg
}