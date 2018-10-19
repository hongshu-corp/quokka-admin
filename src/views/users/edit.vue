<template>
  <user-form :is-edit="true"/>
</template>

<script>
import UserForm from './components/form'

export default {
  name: 'UpdateForm',
  components: { UserForm }
}
</script>
