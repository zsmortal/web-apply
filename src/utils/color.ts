/**
 * hex 颜色转 rgb 颜色
 * @param str 颜色值字符串
 * @returns 返回处理后的颜色值
 */
export const hexToRgb = (str: any) => {
  const reg = /^\#?[0-9A-Fa-f]{6}$/
  if (!reg.test(str)) return console.log('输入错误的hex')
  let hexs: any = ''
  hexs = str.replace('#', '').match(/../g)
  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16)
  return hexs
}

/**
 * rgb 颜色转 hex 颜色
 * @param r 代表红色
 * @param g 代表绿色
 * @param b 代表蓝色
 * @returns 返回处理后的颜色值
 */
export const rgbToHex = (r: any, g: any, b: any) => {
  const reg = /^\d{1,3}$/
  if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return console.log('输入错误的rgb颜色值')
  const hexs = [r.toString(16), g.toString(16), b.toString(16)]
  for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`
  return `#${hexs.join('')}`
}

/**
 * 深颜色值
 * @param color 颜色值字符串
 * @param level 加深的程度，限 0-1 之间
 * @returns 返回处理后的颜色值
 */
export const getDarkColor = (color: string, level: number) => {
  const reg = /^\#?[0-9A-Fa-f]{6}$/
  if (!reg.test(color)) return console.log('输入错误的hex颜色值')
  const rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level))
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

/**
 * 浅颜色值
 * @param color 颜色值字符串
 * @param level 加深的程度，限 0-1 之间
 * @returns 返回处理后的颜色值
 */
export const getLightColor = (color: string, level: number) => {
  const reg = /^\#?[0-9A-Fa-f]{6}$/
  if (!reg.test(color)) return console.log('输入错误的hex颜色值')
  const rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level))
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}
