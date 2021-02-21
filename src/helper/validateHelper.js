// バリデーションの実行
// 戻り値はエラーメッセージの配列
// e.g.) ["必須項目です", "特殊文字を含む必要があります"]
export const validate = (text, rules=[{testFunc: text=>text, message: ""}]) => rules.map(rule => rule(text) ? rule.message : false).filter(message => message)

// バリデーションルール
export const require = {testFunc: text => text.length > 0, message: "必須項目です"}
export const includeSpecialChar = {testFunc: text => /[=+-^$*.[\]{}()?"!@#%&/\\,><':;|_~`]/.test(text), message: "特殊文字を含む必要があります"}
export const includeUppercase = {testFunc: text => /[A-Z]/.test(text), message: "大文字を含む必要があります"}
export const includeLowercase = {testFunc: text => /[a-z]/.test(text), message: "小文字を含む必要があります"}
export const includeNumber = {testFunc: text => /[0-9]/.test(text), message: "数字を含む必要があります"}
