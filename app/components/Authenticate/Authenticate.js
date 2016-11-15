import React, { PropTypes } from 'react'
import { FacebookAuthButton } from 'components'

export default function Authenticate ({isFetching, error, onAuth}) {
  return (
    <div>
      <h1>{'Welcome to Mentally Cleanly'}</h1>
      <p>{'Get shit done...'}</p>
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
      {error ? <p>{error}</p> : null}
    </div>
  )
}

Authenticate.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired
}
