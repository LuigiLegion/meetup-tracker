// Imports
import axios from 'axios'

import {toggledPreloaderActionCreator} from './layoutReducer'
import {toastNotification} from '../../utils'

// Initial State
const initialState = {
  curatedMeetups: [],
  fetchedMeetups: false,
  meetupsFetchingError: null
}

// Actions Types
const GOT_CURATED_MEETUPS_SUCCESS = 'GOT_CURATED_MEETUPS_SUCCESS'
const GOT_CURATED_MEETUPS_ERROR = 'GOT_CURATED_MEETUPS_ERROR'

// Action Creators
const gotCuratedMeetupsSuccessActionCreator = meetups => ({
  type: GOT_CURATED_MEETUPS_SUCCESS,
  meetups
})

const gotCuratedMeetupsErrorActionCreator = error => ({
  type: GOT_CURATED_MEETUPS_ERROR,
  error
})

// Thunk Creators
export const getCuratedMeetupsThunkCreator = () => {
  return async dispatch => {
    try {
      dispatch(toggledPreloaderActionCreator(true))

      const {data} = await axios.get('/api/meetups/curated')

      dispatch(gotCuratedMeetupsSuccessActionCreator(data))
    } catch (error) {
      console.error(error)
      dispatch(gotCuratedMeetupsErrorActionCreator(error))
      toastNotification('Error! Unable To Fetch Meetups', 'red')
    } finally {
      dispatch(toggledPreloaderActionCreator(false))
    }
  }
}

// Reducer
const meetupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CURATED_MEETUPS_SUCCESS:
      return {
        ...state,
        curatedMeetups: action.meetups,
        fetchedMeetups: true,
        meetupsFetchingError: null
      }

    case GOT_CURATED_MEETUPS_ERROR:
      console.error('Meetups fetching error!', action.error.message)

      return {
        ...state,
        fetchedMeetups: true,
        meetupsFetchingError: action.error.message
      }

    default:
      return state
  }
}

// Exports
export default meetupsReducer
