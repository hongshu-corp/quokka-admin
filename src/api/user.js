import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/users',
    method: 'get',
    params: query
  })
}
