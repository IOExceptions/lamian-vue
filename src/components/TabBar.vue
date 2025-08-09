<template>
  <nav class="tabbar">
    <router-link to="/home" :class="{active: is('/home')}">🏠<span>{{ dict.navHome }}</span></router-link>
    <router-link to="/menu" :class="{active: is('/menu')}">🛍️<span>{{ dict.navMenu }}</span></router-link>
    <router-link to="/me"   :class="{active: is('/me')}">👤<span>{{ dict.navProfile }}</span></router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useI18nStore } from '../stores/i18n'
import { storeToRefs } from 'pinia'
const route = useRoute()
const is = (path) => route.path.startsWith(path)
const i18n = useI18nStore()
const { dict } = storeToRefs(i18n)
</script>