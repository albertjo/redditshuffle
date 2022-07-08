export function getRedditUser(access_token) {
  return fetch("https://oauth.reddit.com/api/v1/me", {
    method: 'GET',
    headers: {
      authorization: "bearer " + access_token,
    }})
    .then(response => response.json())
    .then(data => data)
}

export function getAllSavedPosts(access_token, username) {
  return fetch(`https://oauth.reddit.com/user/${username}/saved?limit=1000`, {
    method: 'GET',
    headers: {
      authorization: "bearer " + access_token,
    }})
    .then(response => response.json())
    .then(data => data)
}