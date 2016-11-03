import React, { PropTypes } from 'react'
import { FacebookAuthButton } from 'components'

export default function Authenticate ({isFetching, error, onAuth}) {
  return (
    <div>
      <h1>{'Mentally Cleanliness'}</h1>
      <p>{'Get your clean on...'}</p>
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
      {error ? <p>{error}</p> : null}
    </div>
  )
}

Authenticate.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired,
}
