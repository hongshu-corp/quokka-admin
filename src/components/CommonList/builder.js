export function buildModel(schema) {
  var ret = {}
  for (var key in schema) {
    if (schema[key].default) {
      ret[key] = schema[key].default
    }
  }

  return ret
}

export function buildRules(schema) {
  var ret = {}
  for (var key in schema) {
    if (schema[key]['rules']) {
      ret[key] = schema[key]['rules']
    }
  }
  return ret
}
