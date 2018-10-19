<template>
  <user-form :is-edit="false"/>
</template>

<script>
import UserForm from './components/form'

export default {
  name: 'CreateForm',
  components: { UserForm }
}
</script>
