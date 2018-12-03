/**
 * reg: 校验规则
 * emptymsg: 无内容提示
 * errormsg: 校验提示
 * rule 校验规则
 * value 表单值
 * callback 回调
 */
let passwordValue

function common (rule, value, callback, reg, emptymsg, errormsg) {
  if (value === '' || value === undefined) {
    // defRequired 是自定义的属性，在表单必须填写但是label标签前面没有*（星号）
    if (rule.required || rule.defRequired) {
      callback(new Error(emptymsg))
    } else {
      callback()
    }
  } else if (reg.test(value)) {
    callback()
  } else {
    callback(new Error(errormsg))
  }
}

// 不验证
export function novalid (rule, value, callback) {
  const reg = /[\s\S]*/
  common(rule, value, callback, reg, '不能为空')
}
// 手机号
export function phone (rule, value, callback) {
  const reg = /^1([\d]{10})$/
  common(rule, value, callback, reg, '不能为空', '格式错误')
}
// 邮箱
export function email (rule, value, callback) {
  const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  common(rule, value, callback, reg, '不能为空', '格式错误')
}
// 纯数字
export function number (rule, value, callback) {
  const reg = /^[0-9]+$/
  common(rule, value, callback, reg, '不能为空', '格式错误')
}
// 支付数码
export function paynumber (rule, value, callback) {
  const reg = /^[0-9]{6}$/
  common(rule, value, callback, reg, '不能为空', '请输入6位数字支付密码')
}
// 纯字母
export function letter (rule, value, callback) {
  const reg = /[a-zA-Z]+/
  common(rule, value, callback, reg, '不能为空', '格式错误')
}
// 数字与字母
export function numletter (rule, value, callback) {
  const reg = /^[0-9A-Za-z]{6,20}$/
  common(rule, value, callback, reg, '不能为空', '格式错误')
}
// 密码
export function password (rule, value, callback) {
  passwordValue = value
  const reg = /^[0-9A-Za-z~!@#$%^&*]{6,16}$/
  common(rule, value, callback, reg, '不能为空', '格式错误')
}
// 再次密码确认
export function checkPassword (rule, value, callback) {
  const reg = new RegExp('^' + passwordValue + '$', 'g')
  common(rule, value, callback, reg, '不能为空', '两次密码不一致')
}
// 图形验证码
export function pricture (rule, value, callback) {
  const reg = /^[0-9A-Za-z]{4,6}$/
  common(rule, value, callback, reg, '不能为空', '格式错误')
}
// 英文和中文和数字 [\u4e00-\u9fa5]
export function LetterNumberWord (rule, value, callback) {
  const reg = /^[0-9A-Za-z\u4e00-\u9fa5]+$/
  common(rule, value, callback, reg, '不能为空', '格式错误')
}
