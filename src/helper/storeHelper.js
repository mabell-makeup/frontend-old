/* 
  handlersのフォーマット

  const handlers = ({
    [UPDATE_TMP_CONDITIONS_USER_INFO]: (state, {payload}) => ({tmpConditions: {...state.tmpConditions, userInfo: {...state.tmpConditions.userInfo, ...payload}}}),
    [UPDATE_TMP_CONDITIONS]: (state, {payload}) => ({tmpConditions: {...state.tmpConditions, color: payload}}),
  })
*/

export const createReducer = (initialState={}, handlers={}) =>
  (state = initialState, action) =>
    handlers[action.type] && handlers[action.type]({...state}, action) || {...state}


/* オブジェクトの比較を行うヘルパー */
/* オブジェクトをソート済み配列に変換する */
const objToSortedArray = obj => Object.entries(obj).sort()
/* ソート済み配列を文字列に変換して比較する */
const isEqualOneDimentionalArray = (obj1, obj2) => JSON.stringify(objToSortedArray(obj1)) === JSON.stringify(objToSortedArray(obj2))

/* 再帰処理を行い、ネストされたオブジェクトまで比較する */
export const isEqual = (obj1, obj2) => isEqualOneDimentionalArray(obj1, obj2)
  && objToSortedArray(obj1).map(([key, val]) => typeof val === "object" ? isEqual(val, obj2[key]) : true)

/* masterDataのキーとバリューを入れ替える */
export const formatMasterData = masterData => Object.fromEntries(Object.entries(masterData).map(([key, data]) => [key, Object.fromEntries(Object.entries(data).map(([label, value]) => [value, label]))]))