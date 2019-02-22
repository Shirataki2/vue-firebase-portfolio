const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const cors = require('cors')({origin: true})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.isAdmin = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.body.email === functions.config().googleauth.email) {
      res.status(202).send('Accepted')
    } else {
      res.status(403).send('Forbidden')
    }
  })
})
