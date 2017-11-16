import { call, put, select } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

export const selectAuthToken = (state) => state.login.authToken
// attempts to login
export function * login (api, { email, password }) {
  const authObj = {
    email: email,
    password: password,
    rememberMe: true
  }

  const response = yield call(api.login, authObj)
  // success?
  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data.token))
    // yield put(AccountActions.accountRequest())
    yield put({ type: 'RELOGIN_OK' })
  } else {
    yield put(LoginActions.loginFailure(response.data))
  }
}

// attempts to logout
// export function * logout (api) {
//   yield call(api.removeAuthToken)
//   // yield put(AccountActions.accountRequest())
//   yield put(LoginActions.logoutSuccess())
//   yield put({ type: 'RELOGIN_ABORT' })
// }
// loads the login
export function * loginLoad (api) {
  const authToken = yield select(selectAuthToken)
  // only set the token if we have it
  if (authToken) {
    yield call(api.setAuthToken, authToken)
  }
  yield put(LoginActions.loginLoadSuccess())
}
