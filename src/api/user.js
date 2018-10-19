import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/users',
    method: 'get',
    params: query
  })
}

export function fetchUser(query) {
  return request({
    url: '/users',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/users',
    method: 'put',
    data
  })
}

export function deleteUser(id, data) {
  return request({
    url: `/users/${id}`,
    method: 'delete',
    data
  })
}
