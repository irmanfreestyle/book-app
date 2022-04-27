import axios from 'axios'
const baseUrl = 'https://asia-southeast2-sejutacita-app.cloudfunctions.net'

export default async function handler(req, res) {
  try {
    const { data } = await axios.get(`${baseUrl}/fee-assessment-categories`)
    return res.json(data)
  } catch (error) {
    return res.status(500).json({ status: false })
  }
}
