<template>
  <nav class="tabbar">
    <router-link to="/home" :class="{active: is('/home')}">🏠<span>首页</span></router-link>
    <router-link to="/menu" :class="{active: is('/menu')}">🧾<span>点餐</span></router-link>
    <router-link to="/cart" :class="{active: is('/cart')}">🛒<span>购物车</span></router-link>
    <router-link to="/me"   :class="{active: is('/me')}">👤<span>我的</span></router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const is = (path) => route.path.startsWith(path)
</script>