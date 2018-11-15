import _ from 'lodash'

export function buildModel(schema) {
  var ret = {}
  for (var key in schema.props) {
    if (schema.props[key].default) {
      ret[key] = schema.props[key].default
    }
  }

  return ret
}

export function buildRules(schema) {
  var ret = {}
  for (var key in schema.props) {
    if (schema.props[key].form && schema.props[key].form.rules) {
      ret[key] = schema.props[key].form.rules
    }
  }
  return ret
}

export function buildColumns(schema, t) {
  const filter = _.pickBy(schema.props, (x) => _.has(x, 'column'))
  var ret = {}

  for (var key in filter) {
    ret[key] = filter[key].column
    ret[key].label = t(schema.name, key)
    ret[key].columnType = (ret[key].type || filter[key].type) + 'Column'
    ret[key].options = ret[key].options || filter[key].options
  }

  return ret
}

export function buildFormElements(schema, t) {
  const filter = _.pickBy(schema.props, (x) => _.has(x, 'form'))
  var ret = {}

  for (var key in filter) {
    ret[key] = filter[key].form
    ret[key].label = t(schema.name, key)
    ret[key].type = ret[key].type || filter[key].type
    ret[key].options = ret[key].options || filter[key].options
    ret[key].prop = key
  }

  return ret
}

export function buildDetailElements(schema, t) {
  const filter = _.pickBy(schema.props, (x) => _.has(x, 'detail'))
  var ret = {}

  for (var key in filter) {
    ret[key] = {}
    ret[key].label = t(schema.name, key)
    ret[key].prop = key
    ret[key].columnType = (ret[key].type || filter[key].type) + 'Column'
    ret[key].options = ret[key].options || filter[key].options
  }

  return ret
}

export function buildSearchForm(schema, t) {
  return null
}
