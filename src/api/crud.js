import request from '@/utils/request'

// Table value format should be pluralize
export function list(table, query) {
  return request({
    url: `/${table}`,
    method: 'get',
    params: query
  })
}

export function detail(table, id, query = {}) {
  return request({
    url: `/${table}/${id}`,
    method: 'get',
    params: query
  })
}

export function create(table, data) {
  return request({
    url: `/${table}`,
    method: 'post',
    data
  })
}

export function update(table, data) {
  return request({
    url: `/${table}`,
    method: 'put',
    data
  })
}

export function destroy(table, id) {
  return request({
    url: `/${table}/${id}`,
    method: 'delete'
  })
}

export function nested_list(based, id, table, query) {
  return request({
    url: `/${based}/${id}/${table}`,
    method: 'get',
    params: query
  })
}
