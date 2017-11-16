import { call, put, select } from 'redux-saga/effects'
import HomeActions from '../Redux/HomeRedux'

// export const selectAuthToken = (state) => state.login.authToken
// attempts to login
export function * home (api) {
  const response = yield call(api.home)
  // success?

  if (response.ok) {
    yield put(HomeActions.homeSuccess(response.data))
    // yield put(AccountActions.accountRequest())
    // yield put({ type: 'RELOGIN_OK' })
  } else {
    yield put(HomeActions.homeFailure(response.data))
  }
}

// attempts to logout
// export function * logout (api) {
//   yield call(api.removeAuthToken)
//   // yield put(AccountActions.accountRequest())
//   yield put(HomeActions.logoutSuccess())
//   yield put({ type: 'RELOGIN_ABORT' })
// }
// loads the login
// export function * loginLoad (api) {
//   const authToken = yield select(selectAuthToken)
//   // only set the token if we have it
//   if (authToken) {
//     yield call(api.setAuthToken, authToken)
//   }
//   yield put(HomeActions.loginLoadSuccess())
// }
