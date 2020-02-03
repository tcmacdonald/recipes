import React from "react"
import PropTypes from "prop-types"

const Container = ({ children }) => {
  return (
    <div style={{
      margin: `1rem auto`,
      maxWidth: 960,
      padding: `0 1.0875rem 1.45rem`,
    }}
    >{children}</div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Container
