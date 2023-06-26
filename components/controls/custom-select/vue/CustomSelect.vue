<template lang="pug">
select.custom-select(:value="value" @input="$emit('input', $event.target.value)")
  option(selected disabled :value="null") Выберите значение
  option(v-for="{ value, text } in options" :key="value" :value="value") {{ text }}
</template>

<script>
export default {
  name: "CustomSelect",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    options: {
      type: Array,
      required: true
    }
  },
  emits: ["input"],
}
</script>

<style lang="scss" scoped>
@import "../styles/custom-select.scss";
</style>
