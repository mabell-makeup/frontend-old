// バリデーションの実行
// 戻り値はエラーメッセージの配列
// e.g.) ["必須項目です", "特殊文字を含む必要があります"]
export const validate = (text, rules=[{testFunc: text=>text, message: ""}]) => rules.map(rule => rule.testFunc(text) ? "" : rule.message).filter(message => message !== "")

// バリデーションルール
export const rules = {
  require: {testFunc: text => text.length > 0, message: "必須項目です"},
  includeSpecialChar: {testFunc: text => /[!"#$%&'()*+-.,/:;<=>?@[\]^_`{|}~]/.test(text), message: "記号を含む必要があります"},
  includeUppercase: {testFunc: text => /[A-Z]/.test(text), message: "大文字を含む必要があります"},
  includeLowercase: {testFunc: text => /[a-z]/.test(text), message: "小文字を含む必要があります"},
  includeNumber: {testFunc: text => /[0-9]/.test(text), message: "数字を含む必要があります"},
  onlyWordChar: {testFunc: text => /^\w*$/.test(text), message: "英数字と'_'(アンダーバー)が使えます"},
  mail: {testFunc: text => /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(text), message: "有効なメールアドレスを入力してください"}
}
