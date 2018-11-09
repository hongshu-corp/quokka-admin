export function powerT(table, prop) {
  const key = `attributes.common.${prop}`
  return this.$t(key) === key ? this.$t(`attributes.${table}.${key}`) : this.$t(key)
}
