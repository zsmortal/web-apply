/**
 * 一维数组分割二维数组
 * @param arr 原数组   [ 1, 2, 3, 4, 5, 6, 7, 8 ]
 * @param len 要切割的长度 3
 * @returns 二维数组 [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8 ] ]
 */
export const sliceTwoDimArr = (arr: ArrayType, len: number) => {
  return arr.reduce((prev: any, curr: any, index: any) => {
    const i = Math.floor(index / len)
    prev[i] = [...(prev[i] || []), curr]
    return prev
  }, [])
}

/**
 * 根据相同项返回二维数组
 * @param arr 原数组 [ { name: 'jack' }, { name: 'rosi' }, { name: 'jack' } ]
 * @param key 指定键名 name
 * @returns 二维数组 [ [ { name: 'jack' }, { name: 'jack' } ], [ { name: 'rosi' } ] ]
 */
export const alikeTwoDimArr = (arr: ArrayType, key: string) => {
  return Object.values(
    arr.reduce((obj: ObjectType, v: ObjectType) => {
      obj[v[key]] ? obj[v[key]].push(v) : (obj[v[key]] = [v])
      return obj
    }, {})
  )
}

/**
 * 2个数组（对象）比较查找符合条件的相同数据并返回数组
 * @param arr1 原数组1 [ { name: 'jack' }, { name: 'rosi' } ]
 * @param arr2 原数组2 [ { name: 'jack' } ]
 * @param key 指定键名 name
 * @returns 相同项 [ { name: 'jack' } ]
 */
export const alikeOneDimArr = (arr1: ArrayType, arr2: ArrayType, key: string) => {
  return arr1.filter((v: any) => {
    return arr2.some((i: any) => v[key] === i[key])
  })
}

/**
 * 更改对象 / 数组（对象）的键名
 * @param data 原数据 { name: 'jack' }
 * @param oldKey 原键名 name
 * @param newKey 新键名 nick
 * @returns 新数据 { nick: 'jack' }
 */
export const changeObjKey = (data: ObjectType | ArrayType, oldKey: string, newKey: string) => {
  return JSON.parse(JSON.stringify(data).replaceAll(oldKey, newKey))
}
