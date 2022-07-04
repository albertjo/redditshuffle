const clientId = "yhdXgHYV0AUeX58yOWpZYA"
const tokenUrl = "https://www.reddit.com/api/v1/access_token"

export async function get(request) {
  const code = request.url.searchParams.get('code')
  // Get access token
  const tokens = await getToken(code)
  const access_token = tokens.access_token
  const refresh_token = tokens.refresh_token

  // Get Reddit user
  const redditUser = await getRedditUser(access_token)

  request.locals.user = redditUser.name
  request.locals.access_token = access_token
  request.locals.refresh_token = refresh_token

  return {
    status: 302,
    headers: {
      location: '/'
    }
  }
}

function getRedditUser(access_token) {
  return fetch("https://oauth.reddit.com/api/v1/me", {
    method: 'GET',
    headers: {
      authorization: "bearer " + access_token,
      'user-agent': 'Test'
    }})
    .then(response => response.json())
    .then(data => data)
}

function getToken(code) {
  const authorization = "Basic " + btoa(unescape(encodeURIComponent(clientId + ":" + "")));
  const form_body = `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/callback`;
  return fetch("https://www.reddit.com/api/v1/access_token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authorization,
    },
    body: form_body})
    .then(response => response.json())
    .then(data => {
      return {access_token: data.access_token, refresh_token: data.refresh_token}
    })
}

export function refreshTokens(refresh_token) {
  if (refreshTokens === undefined) {
    return {}
  }
  const authorization = "Basic " + btoa(unescape(encodeURIComponent(clientId + ":" + "")));
  const form_body = `grant_type=refresh_token&refresh_token=${refresh_token}`;

  return fetch("https://www.reddit.com/api/v1/access_token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authorization,
    },
    body: form_body})
    .then(response => response.json())
    .then(data => {
      return {access_token: data.access_token, refresh_token: data.refresh_token}
    })

}