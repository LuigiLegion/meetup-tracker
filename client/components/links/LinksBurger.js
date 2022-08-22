// Imports
import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {slide as Menu} from 'react-burger-menu'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Hello} from '..'
import {logout} from '../../store'
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
            <>
              {/* The burger will show these links after you log in */}
              <div>
                <Hello color="white" />
              </div>

              <div>
                <NavLink
                  className="burger-link burger-text-color"
                  to="/"
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </div>

              <div>
                <a
                  className="burger-link burger-text-color"
                  href="https://github.com/LuigiLegion/meetup-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source
                </a>
              </div>

              <div>
                <a
                  className="burger-link burger-text-color"
                  href="#"
                  onClick={handleClick}
                >
                  Logout
                </a>
              </div>
            </>
          ) : (
            <>
              {/* The burger will show these links before you log in */}
              <div>
                <Hello color="white" />
              </div>

              <div>
                <NavLink
                  className="burger-link burger-text-color"
                  to="/"
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </div>

              <div>
                <a
                  className="burger-link burger-text-color"
                  href="https://github.com/LuigiLegion/meetup-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source
                </a>
              </div>

              <div>
                <a
                  className="burger-link burger-text-color"
                  href="/auth/meetup"
                >
                  Login
                </a>
              </div>

              <div>
                <a
                  className="burger-link burger-text-color"
                  href="/auth/meetup"
                >
                  Signup
                </a>
              </div>
            </>
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
