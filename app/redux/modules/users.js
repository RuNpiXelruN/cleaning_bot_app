import auth, { saveUser, logout } from 'helpers/auth'
import { formatUserData } from 'helpers/utils'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'

export function authUser (uid) {
  return {
    type: AUTH_USER,
    uid
  }
}

function unauthUser () {
  return {
    type: UNAUTH_USER
  }
}

function fetchingUser () {
  return {
    type: FETCHING_USER
  }
}

export function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp
  }
}

function fetchingUserFailure (error) {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user..'
  }
}

export function removeFetchingUser () {
  return {
    type: REMOVE_FETCHING_USER
  }
}

export function fetchAndHandleAuthedUser () {
  return function (dispatch) {
    dispatch(fetchingUser())
    return auth().then(({user, credential}) => {
      const userData = user.providerData[0]
      const userInfo = formatUserData(userData.displayName, userData.photoURL, user.uid)
      return dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()))
    })
    .then(({user}) => saveUser(user))
    .then((user) => dispatch(authUser(user.uid)))
    .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

export function handleUnauthUser () {
  return function (dispatch) {
    logout()
    dispatch(unauthUser())
  }
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    uid: '',
    name: '',
    avatar: ''
  }
}

function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
  isAuthed: false,
  authedId: ''
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER :
      return {
        ...state,
        authedId: action.uid,
        isAuthed: true
      }
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: ''
      }
    case FETCHING_USER :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_USER_SUCCESS :
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          error: ''
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action)
        }
    case FETCHING_USER_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case REMOVE_FETCHING_USER :
      return {
        ...state,
        isFetching: false
      }
    default :
      return state
  }
}
