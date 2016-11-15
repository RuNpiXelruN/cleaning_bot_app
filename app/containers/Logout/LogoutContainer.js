import React, { PropTypes } from 'react'
import { Logout } from 'components'
import { connect } from 'react-redux'
import { handleUnauthUser } from 'redux/modules/users'

const LogoutContainer = React.createClass({
  componentDidMount () {
    this.props.dispatch(handleUnauthUser())
  },

  render () {
    return (
      <Logout />
    )
  }
})

export default connect()(LogoutContainer)
