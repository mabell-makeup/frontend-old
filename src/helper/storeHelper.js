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