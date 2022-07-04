import cookie from 'cookie'

export async function handle({ event, resolve }) {
  //console.log(event.request.headers)
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  console.log(cookies)
  event.locals.user = cookies.user

  const response = await resolve(event);
  //console.log("event", event.locals)
  //console.log(`user=${event.locals.user || ''};access_token=${event.locals.access_token || ''};path=/; HttpOnly`)
  response.headers.set('set-cookie', `user=${event.locals.user || ''}; path=/; HttpOnly`)

  return response;
}

export async function getSession(event) {
  //console.log("getSession", event.locals)
  return {
    user: event.locals.user,

  }
}