export async function get(request) {
  request.locals.access_token = null
  request.locals.refresh_token = null

  return {
    status: 302,
    headers: {
      location: '/'
    }
  }
}