import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
// import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { HomeTypes } from '../Redux/HomeRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, loginLoad } from './LoginSagas'
import { home } from './HomeSagas'
// import { getUserAvatar } from './GithubSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(HomeTypes.HOME_REQUEST, home, api),

    // takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    // takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),

    // takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    // takeLatest(PasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    // takeLatest(PasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    // takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    // takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api)
  ])
}
