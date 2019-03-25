import fetch from 'isomorphic-fetch'

function buildUrl(baseUrl: string, path: string, params: {}) {
  let url
  if (path.match(/\/.*/)) {
    url = new URL(baseUrl + path)
  } else {
    url = new URL(baseUrl + '/' + path)
  }

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return url.href
}

function build(url: string) {
  return {
    async get(path, params = {}) {
      const requestUrl = buildUrl(url, path, params)
      const resp = await fetch(requestUrl, params)
      return resp.json()
    },
  }
}

export default build
