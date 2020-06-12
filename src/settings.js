export default {
  title: 'New World',
  flag: 200,
  async asyncCommonFn(api, args, successFn, header, failFn, catchFn) {
    try {
      const { code, result } = await api(args, header)
      console.log(code, result, 'asyncCommonFn')
      if (code === this.code) {
        successFn && successFn(result)
      } else {
        failFn && failFn
      }
    } catch (error) {
      console.error(error)
      catchFn && catchFn(error)
    }
  }
}