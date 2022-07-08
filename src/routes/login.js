const clientId = import.meta.env.VITE_CLIENT_ID
const callback_uri = import.meta.env.VITE_REDIRECT_URI
const login_url = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=yolo&redirect_uri=${callback_uri}&duration=permanent&scope=identity,history`

export async function get(request) {
  return {
    status: 302,
    headers: {
      location: login_url
    }
  }
}