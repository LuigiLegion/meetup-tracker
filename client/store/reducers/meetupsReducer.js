// Imports
import axios from 'axios'

import {toggledPreloaderActionCreator} from './layoutReducer'
import {toastNotificationGenerator} from '../../helpers'

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
const gotCuratedMeetupsSuccessActionCreator = curatedMeetups => ({
  type: GOT_CURATED_MEETUPS_SUCCESS,
  curatedMeetups
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

      const nycCoders = await axios.get('/api/meetups/31377401')
      const nycBootcampersAnonymous = await axios.get('/api/meetups/19344391')
      const reactNyc = await axios.get('/api/meetups/22884788')
      const useReactNyc = await axios.get('/api/meetups/31543338')
      const vueNyc = await axios.get('/api/meetups/23275212')
      const graphqlNyc = await axios.get('/api/meetups/24714233')
      const apolloMeteorNyc = await axios.get('/api/meetups/6597512')
      const jamStackNyc = await axios.get('/api/meetups/18584762')
      const pythonNyc = await axios.get('/api/meetups/263790')
      const learnPythonNyc = await axios.get('/api/meetups/18360269')
      const sqlNyc = await axios.get('/api/meetups/107592')
      const mongodbNyc = await axios.get('/api/meetups/1629296')

      const curatedMeetups = [
        {
          name: 'NYC Coders',
          meetups: nycCoders.data.results
        },
        {
          name: 'NYC Bootcampers Anonymous',
          meetups: nycBootcampersAnonymous.data.results
        },
        {
          name: 'React NYC',
          meetups: reactNyc.data.results
        },
        {
          name: 'useReactNYC',
          meetups: useReactNyc.data.results
        },
        {
          name: 'VueNYC',
          meetups: vueNyc.data.results
        },
        {
          name: 'GraphQL NYC',
          meetups: graphqlNyc.data.results
        },
        {
          name: 'ApolloMeteorNYC',
          meetups: apolloMeteorNyc.data.results
        },
        {
          name: 'JAMstack NYC',
          meetups: jamStackNyc.data.results
        },
        {
          name: 'The New York Python Meetup Group',
          meetups: pythonNyc.data.results
        },
        {
          name: 'Learn Python NYC',
          meetups: learnPythonNyc.data.results
        },
        {
          name: 'SQL NYC, The NoSQL & NewSQL Database Big Data Meetup',
          meetups: sqlNyc.data.results
        },
        {
          name: 'New York MongoDB User Group',
          meetups: mongodbNyc.data.results
        }
      ]

      dispatch(gotCuratedMeetupsSuccessActionCreator(curatedMeetups))
      dispatch(toggledPreloaderActionCreator(false))
    } catch (error) {
      console.error(error)
      dispatch(gotCuratedMeetupsErrorActionCreator(error))
      dispatch(toggledPreloaderActionCreator(false))
      toastNotificationGenerator('Error! Unable To Fetch Meetups', 'red')
    }
  }
}

// Reducer
const meetupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CURATED_MEETUPS_SUCCESS:
      return {
        ...state,
        curatedMeetups: action.curatedMeetups,
        fetchedMeetups: true,
        meetupsFetchingError: null
      }

    case GOT_CURATED_MEETUPS_ERROR:
      console.log('Meetups fetching error!', action.error.message)
      return {
        ...state,
        fetchedMeetups: true,
        meetupsFetchingError: action.error.message
      }

    default:
      return state
  }
}

export default meetupsReducer
