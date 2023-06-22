<template lang="pug">
ul.tabs
  li.tabs__item(
    v-for="{ id, text } in items"
    :key="id"
  )
    button.tabs__button(
      :class="{ '_active': id === activeIndex }"
      @click="$emit('change', id)"
      ) {{ text }}
</template>

<script>
export default {
  name: "Tabs",
  props: {
    activeIndex: {
      type: Number,
      required: true,
    }
  },
  computed: {
    items() {
      return [
        { id: 0, text: 'Вводимые значения' },
        { id: 1, text: 'Вычисляемые значения' },
        { id: 2, text: 'Проверка расчетов' }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/tabs.scss";
</style>
