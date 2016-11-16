import { fetchUsers } from 'helpers/api'
const FETCHING_USERS = 'FETCHING_USERS'
const FETCHING_USERS_ERROR = 'FETCHING_USERS_ERROR'
const FETCHING_USERS_SUCCESS = 'FETCHING_USERS_SUCCESS'

function fetchingUsers () {
  return {
    type: FETCHING_USERS,
  }
}

function fetchingUsersError () {
  return {
    type: FETCHING_USERS_ERROR,
    error: 'Error fetching users list'
  }
}

function fetchingUsersSuccess (users, lastUpdated) {
  return {
    type: FETCHING_USERS_SUCCESS,
    users,
    lastUpdated,
  }
}

export function fetchUsersList () {
  return function (dispatch) {
    dispatch(fetchingUsers())
    fetchUsers()
      .then((users) => {
        // console.log(users)
        dispatch(fetchingUsersSuccess(users, Date.now()))
      })
      .catch((error) => dispatch(fetchingUsersError(error)))
  }
}

const initialState = {
  isFetching: false,
  error: '',
  lastUpdated: 0,
  users: {},
}

export default function usersList (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_USERS_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USERS_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        users: action.users,
      }
    default :
      return state
  }
}
