// Imports
import React from 'react'
import {NavLink} from 'react-router-dom'

// Component
const About = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m12 l12 xl12">
          <div className="section">
            <div className="card">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">
                  <span className="text-style-bold">About</span>
                </span>

                <div className="divider" />

                <div className="card-content">
                  <div className="section">
                    Meetup Tracker allows users to explore a curated list of
                    upcoming tech meetups in NYC.
                  </div>

                  <div>I hope you like it, enjoy!</div>
                </div>

                <NavLink className="text-style-bold" to="/">
                  ← Back To Main Page
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Exports
export default About
