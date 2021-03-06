// Imports
const router = require('express').Router()
const axios = require('axios')

const {sleep} = require('../../utils')

// Routes
router.get('/curated', async (_, res, next) => {
  try {
    const groups = [
      {id: '263790', name: 'The New York Python Meetup Group'},
      {id: '18360269', name: 'Learn Python NYC'},
      {
        id: '107592',
        name: 'SQL NYC, The NoSQL & NewSQL Database Big Data Meetup'
      },
      {id: '29368983', name: 'Kaggle NYC'},
      {id: '1569423', name: 'NoSQL NYC'},
      {id: '1629296', name: 'New York MongoDB User Group'},
      {id: '24714233', name: 'GraphQL NYC'},
      {id: '6597512', name: 'ApolloMeteorNYC'},
      {id: '8841422', name: 'Elastic New York City User Group'},
      {id: '22884788', name: 'React NYC'},
      {id: '31543338', name: 'useReactNYC'},
      {id: '23275212', name: 'VueNYC'},
      {id: '18584762', name: 'JAMstack NYC'},
      {id: '19344391', name: 'NYC Bootcampers Anonymous'},
      {id: '31377401', name: 'NYC Coders'}
    ]

    const urls = groups.map(
      group =>
        `https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=${
          group.id
        }&page=3`
    )

    for (let i = 0; i < urls.length; i++) {
      const {data} = await axios.get(urls[i])
      // Empty array is a fallback in case Meetup API bugs out and responds
      // with undefined for meetup groups that have no upcoming meetups
      groups[i].meetups = data.results || []

      await sleep(0.2)
    }

    res.json(groups)
  } catch (error) {
    next(error)
  }
})

router.get('/:groupId', async (req, res, next) => {
  const {groupId} = req.params

  try {
    const {data} = await axios.get(
      `https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=${groupId}&page=3`
    )

    res.json(data)
  } catch (error) {
    next(error)
  }
})

// Exports
module.exports = router
