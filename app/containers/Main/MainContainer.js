import React from 'react'
import { Navigation } from 'components'

const MainContainer = React.createClass({
  render () {
    return (
      <div>
        <Navigation isAuthed={true}/>
        {this.props.children}
      </div>
    )
  }
})

export default MainContainer
