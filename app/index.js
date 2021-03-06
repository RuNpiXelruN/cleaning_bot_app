import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import checkRoutes from 'config/routes'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'
import { checkIfAuthed } from 'helpers/auth'

const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension() ? window.devToolsExtension() : (f) => f
))

function checkAuth (nextState, replace) {
  if (store.getState().users.isFetching === true) {
    return
  }

  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname

  if (nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/dashboard')
    }
  } else {
    if (isAuthed !== true) {
      replace('/auth')
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    {checkRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app')
)
