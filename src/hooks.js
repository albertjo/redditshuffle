import cookie from 'cookie'
import { refreshTokens } from './routes/callback'

export async function handle({ event, resolve }) {
  console.log("first", event.locals)

  // 1. check for refresh token in cookie header
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  let refresh_token = cookies.refresh_token


  // 2. refresh both refresh and access token
  const new_tokens = await refreshTokens(refresh_token)
  let new_access_token = new_tokens.access_token
  let new_refresh_token = new_tokens.refresh_token
  event.locals.refresh_token = new_refresh_token
  event.locals.access_token = new_access_token

  const response = await resolve(event)
  console.log("second", event.locals)
  // 3. save new_refresh_token in cookie

  response.headers.set('set-cookie', `refresh_token=${event.locals.refresh_token || ''}; path=/; HttpOnly`)
  return response
}

export async function getSession(event) {
  console.log("getSession", event.locals)
  return {
    access_token: event.locals.access_token,
  }
}