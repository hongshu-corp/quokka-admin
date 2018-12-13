import request from '@/utils/request'

export function loginByUsername(username, password, authCode, random) {
  const data = {
    username,
    password,
    authCode,
    random
  }

  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getSchemas(token) {
  return request({
    url: '/schemas',
    method: 'get',
    params: { token }
  })
}
