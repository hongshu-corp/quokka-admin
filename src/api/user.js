import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/users',
    method: 'get',
    params: query
  })
}

export function detail(query) {
  return request({
    url: '/users',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/users',
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}
