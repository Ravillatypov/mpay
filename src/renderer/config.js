const BaseURL = process.env.NODE_ENV === 'development'
  ? `https://api.acquiring-sandbox.mercuryo.io`
  : `https://api.acquiring.mercuryo.io`

export default {
  BaseURL
}
