import config from '../config'
import TokenService from './token-service';

const LanguageApiService = {
  getLanguageAndWords() {
    return fetch(`${config.REACT_APP_API_BASE}/language`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getFirstWord() {
    return fetch(`${config.REACT_APP_API_BASE}/language/head`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  guessAndReturnNext(guess) {
    return fetch(`${config.REACT_APP_API_BASE}/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ guess })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
};

export default LanguageApiService;