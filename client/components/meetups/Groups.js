// Imports
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Group} from '..'
import {getCuratedMeetupsThunkCreator} from '../../store'

// Component
const Groups = ({curatedMeetups, fetchedMeetups, getCuratedMeetupsThunk}) => {
  useEffect(
    () => {
      if (!fetchedMeetups) {
        getCuratedMeetupsThunk()
      }
    },
    [fetchedMeetups, getCuratedMeetupsThunk]
  )

  return (
    <div className="dashboard container">
      {!curatedMeetups.length && !fetchedMeetups ? (
        <div className="section center">
          <div className="card">
            <div className="card-content grey-text text-darken-3">
              Loading meetups...
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {!curatedMeetups.length ? (
            <div className="section center">
              <div className="card">
                <div className="card-content grey-text text-darken-3">
                  No upcoming meetups were found.
                </div>
              </div>
            </div>
          ) : (
            curatedMeetups
              .sort((groupOne, groupTwo) => {
                if (groupOne.meetups.length > groupTwo.meetups.length) {
                  return -1
                } else if (groupTwo.meetups.length < groupOne.meetups.length) {
                  return 1
                } else {
                  return 0
                }
              })
              .map(curGroup => (
                <div key={curGroup.id} className="col s12 m6 l4">
                  <Group name={curGroup.name} meetups={curGroup.meetups} />
                </div>
              ))
          )}
        </div>
      )}
    </div>
  )
}

// Container
const mapStateToProps = state => ({
  curatedMeetups: state.meetups.curatedMeetups,
  fetchedMeetups: state.meetups.fetchedMeetups
})

const mapDispatchToProps = dispatch => ({
  getCuratedMeetupsThunk: () => dispatch(getCuratedMeetupsThunkCreator())
})

// Prop Types
Groups.propTypes = {
  curatedMeetups: PropTypes.arrayOf(PropTypes.object),
  fetchedMeetups: PropTypes.bool,
  getCuratedMeetupsThunk: PropTypes.func
}

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Groups)
