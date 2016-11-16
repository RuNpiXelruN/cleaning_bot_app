// var _ = require('ramda')
import React, { PropTypes, Component } from 'react'
import { User } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userListActions from 'redux/modules/usersList'

class UsersContainer extends Component {
  componentWillMount () {
    this.props.fetchUsersList()
  }

  render () {
    const usersList = this.props.usersList
    const users = _.values(usersList)
    const renderUsers = users.map((user, index) => {
      return <User key={`user-${index}`} user={user} />
    })

    return (
      <div>
        {renderUsers}
      </div>
    )
  }
}

UsersContainer.propTypes = {
  fetchUsersList: PropTypes.func.isRequired,
  usersList: PropTypes.object.isRequired,
}

function mapStateToProps ({usersList}) {
  return {
    usersList: usersList.users
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userListActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
