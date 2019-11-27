import React from 'react'

export const Error = ({ mensaje }) => (
  <article className="message is-danger is-large">
    <div className="message-header" style={{ justifyContent: 'center' }}>
      <p role="img" aria-label="emoji">
        {mensaje} 🤦‍♀️
      </p>
    </div>
  </article>
)
