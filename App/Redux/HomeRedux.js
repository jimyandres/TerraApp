import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  homeRequest: null,
  homeSuccess: ['data'],
  homeFailure: ['error'],
  // logoutRequest: null,
  // logoutSuccess: null,
  // loginLoad: [],
  // loginLoadSuccess: []
})

export const HomeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, { data }) => {
  return state.merge({ fetching: false, error: null, data })
}

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error, data: null })

// we're attempting to load token from startup sagas
// export const load = (state) => state.merge({ loading: true })

// export const loadSuccess = (state) => state.merge({ loading: false })
// we need to logout, meaning clear access tokens and account
// export const logoutRequest = state => state

// we've logged out
// export const logoutSuccess = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HOME_REQUEST]: request,
  [Types.HOME_SUCCESS]: success,
  [Types.HOME_FAILURE]: failure,
  // [Types.HOME_LOAD]: load,
  // [Types.HOME_LOAD_SUCCESS]: loadSuccess,
  // [Types.LOGOUT_REQUEST]: logoutRequest,
  // [Types.LOGOUT_SUCCESS]: logoutSuccess
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
// export const isLoggedIn = (loginState) => loginState.email !== null
