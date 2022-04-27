// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const https = require('https');

export default function handler(req, res) {
  https.get('https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories', (result) => {
    result.on('data', (d) => {
      res.status(200).json(d)
    });
  }).on('error', (e) => {
    console.error(e);
  });
}
