module.exports = (err, req, res, next) => {
  let { status, message } = err
  if (status !== undefined) {
    console.log({err, dari: 'error status'})
    res.status(status).json({ error: message })
  } else {
    console.log({err, dari: 'error uncatched'})
    err = err.toString()
    res.status(500).json({ error: err })
  }
}
