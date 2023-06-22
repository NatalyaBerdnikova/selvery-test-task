<template lang="pug">
.main
  .container
    Wizard
</template>

<script>
import Vue from 'vue';

import Wizard from '@/components/wizard/vue/Wizard.vue';

export default Vue.extend({
  name: 'IndexPage',
  components: { Wizard }
})
