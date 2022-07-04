const login_url = "https://www.reddit.com/api/v1/authorize?client_id=yhdXgHYV0AUeX58yOWpZYA&response_type=code&state=yolo&redirect_uri=http://localhost:3000/callback&duration=permanent&scope=identity,history";

export async function get(request) {
  return {
    status: 302,
    headers: {
      location: login_url
    }
  }
}