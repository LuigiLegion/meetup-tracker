// Imports
import React, {Fragment, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {slide as Menu} from 'react-burger-menu'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Hello} from '..'
import {logout} from '../../store/reducers/userReducer'
import {burgerStyles} from '../../styles'

// Component
const LinksBurger = ({isLoggedIn, handleClick}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleStateChange = state => {
    setMenuOpen(state.isOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <Menu
      styles={burgerStyles}
      isOpen={menuOpen}
      right
      width="50%"
      onStateChange={state => handleStateChange(state)}
    >
      {menuOpen && (
        <div className="remove-outline">
          {isLoggedIn ? (
            <Fragment>
              {/* The burger will show these links after you log in */}
              <div>
                <Hello color="white" />
              </div>

              <div>
                <NavLink to="/" className="burger-link" onClick={closeMenu}>
                  <span className="burger-text-color">Home</span>
                </NavLink>
              </div>

              <div>
                <a
                  className="burger-link"
                  href="https://github.com/LuigiLegion/meetup-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="burger-text-color">Source</span>
                </a>
              </div>

              <div>
                <a className="burger-link" href="#" onClick={handleClick}>
                  <span className="burger-text-color">Logout</span>
                </a>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {/* The burger will show these links before you log in */}
              <div>
                <Hello color="white" />
              </div>

              <div>
                <NavLink to="/" className="burger-link" onClick={closeMenu}>
                  <span className="burger-text-color">Home</span>
                </NavLink>
              </div>

              <div>
                <a
                  className="burger-link"
                  href="https://github.com/LuigiLegion/meetup-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="burger-text-color">Source</span>
                </a>
              </div>

              <div>
                <a className="burger-link" href="/auth/meetup">
                  <span className="burger-text-color">Login</span>
                </a>
              </div>

              <div>
                <a className="burger-link" href="/auth/meetup">
                  <span className="burger-text-color">Signup</span>
                </a>
              </div>
            </Fragment>
          )}
        </div>
      )}
    </Menu>
  )
}

// Container
const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  handleClick: () => dispatch(logout())
})

// Prop Types
LinksBurger.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(LinksBurger)
