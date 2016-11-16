import React, { PropTypes } from 'react'

export default function User ({user}) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.uid}</p>
      <br/>
    </div>
  )
}
