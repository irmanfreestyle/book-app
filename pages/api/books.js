import axios from 'axios'
const baseUrl = 'https://asia-southeast2-sejutacita-app.cloudfunctions.net'

export default async function handler(req, res) {
  const { categoryId, page, size } = req.query
  const path = `/fee-assessment-books?categoryId=${categoryId}&page=${page}&size=${size}`

  try {
    const { data } = await axios.get(`${baseUrl}${path}`)
    return res.json(data)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
    })
  }
}
