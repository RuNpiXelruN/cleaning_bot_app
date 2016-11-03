import React, { PropTypes } from 'react'

export default function FacebookAuthButton ({isFetching, onAuth}) {
  return (
    <button onClick={onAuth}>
      {isFetching === true ? 'Loading...' : 'Login with Facebook'}
    </button>
  )
}

FacebookAuthButton.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}
