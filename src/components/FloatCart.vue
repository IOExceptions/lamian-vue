<template>
  <button v-if="count" class="float-cart" @click="$router.push('/cart')">
    ￥{{ total }}
    <span class="badge">{{ count }}</span>
  </button>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
const { count, total } = storeToRefs(cart)
</script>