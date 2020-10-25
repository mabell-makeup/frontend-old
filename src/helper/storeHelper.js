/* 
  handlersのフォーマット

  const handlers = ({
    [UPDATE_CONDITIONS_USER_INFO]: (state, {payload}) => ({conditions: {...state.conditions, userInfo: {...state.conditions.userInfo, ...payload}}}),
    [UPDATE_CONDITIONS_COLOR]: (state, {payload}) => ({conditions: {...state.conditions, color: payload}}),
  })
*/

export const createReducer = (initialState={}, handlers={}) =>
  (state = initialState, action) =>
    handlers[action.type] && handlers[action.type]({...state}, action) || {...state}