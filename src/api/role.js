import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/roles',
    method: 'get',
    params: query
  })
}

export function detail(query) {
  return request({
    url: '/roles',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/roles',
    method: 'put',
    data
  })
}

export function destroy(id) {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}
