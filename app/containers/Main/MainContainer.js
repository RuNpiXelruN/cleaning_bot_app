import React, { PropTypes } from 'react'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from 'redux/modules/users'
import { formatUserData } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

const MainContainer = React.createClass({
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserData(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        if (this.props.location.pathname === '/') {
          this.context.router.replace('dashboard')
        }
      } else {
        this.props.removeFetchingUser()
        this.context.router.replace('/')
      }
    })
  },

  render () {
    return this.props.isFetching === true
      ? <div>{'Loading......'}</div>
      : <div>
          <Navigation isAuthed={this.props.isAuthed}/>
          {this.props.children}
        </div>
  }
})

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  removeFetchingUser: PropTypes.func.isRequired
}

MainContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps ({users}) {
  return {
    isAuthed: users.isAuthed,
    isFetching: users.isFetching
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
