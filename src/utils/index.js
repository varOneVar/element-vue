
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export const typeCheck = target => Object.prototype.toString.call(target).slice(8, -1)

export function simulateInterval(callback, interval, async = false) {
  let timerId = null
  async function fn() {
    // 没有返回值是常态，所以保持继续运行定时器
    let result = false
    if (async) {
      try {
        result = await callback()
      } catch (error) {
        console.error(error)
      }
    } else {
      result = callback()
    }
    // 没有返回值是常态，所以保持继续运行定时器
    if (!result) {
      const prevTimmerId = timerId
      timerId = setTimeout(fn, interval)
      clearTimeout(prevTimmerId)
    }
  }

  return setTimeout(fn, interval)
}
// 数组分块
export function arrChunk(array, size = 1) {
  const len = array.length
  Array.from({ length: Math.ceil(len / size) }, (v, i) => array.slice(i * size, (i + 1) * size))
}

export function getNumberRange(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
