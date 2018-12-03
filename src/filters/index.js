
import {formatNumber} from '@/utils'
// 格式化千位符并保留2位小数
export function toThousandFilter (num) {
  return formatNumber(num, 2)
}
// 日期格式化
export function dateFilter (str) {
  return str
}
