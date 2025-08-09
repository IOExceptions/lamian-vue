<template>
  <div v-if="count" class="float-cart">
    <div class="cart-bubble" @click="goCheckout">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
        <circle cx="8" cy="21" r="1"></circle>
        <circle cx="19" cy="21" r="1"></circle>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
      </svg>
      <span class="badge">{{ count }}</span>
    </div>
    <button class="price-pill" @click="toggleList">¥{{ total }}</button>

    <div v-if="showList" class="cart-panel" @click.self="toggleList">
      <div class="cart-panel-card">
        <div class="cart-panel-collapse" @click.stop="toggleList"><span class="chev">⌄</span></div>
        <div class="cart-panel-header">
          <span>{{ dict.currentCart }}</span>
          <button class="button" style="height:32px; padding:0 10px;" @click.stop="clear">{{ dict.btnClear }}</button>
        </div>
        <div class="cart-panel-list">
          <div v-for="(i,idx) in items" :key="idx" class="row">
            <div style="display:flex; align-items:center; gap:10px;">
              <img :src="i.img || '/menu/placeholder-bowl.svg'" alt="" class="cart-thumb" />
              <div style="display:flex; flex-direction:column;">
                <b class="line-clamp-1">{{ i.title }}</b>
                <small style="color:#64748b;">{{ i.spec?.title }} × {{ i.qty }}</small>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <b>¥{{ (i.qty*i.price + (i.addons?.reduce((a,b)=>a + b.qty*b.price,0)||0)).toFixed(0) }}</b>
              <button class="button" style="height:32px; padding:0 10px;" @click.stop="remove(idx)">{{ dict.btnDelete }}</button>
            </div>
          </div>
        </div>
        <div class="cart-panel-cta">
          <button class="button primary" style="width:100%; height:44px;" @click="goCheckout">{{ dict.btnGoCheckout }} ¥{{ total }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18nStore } from '../stores/i18n'
const cart = useCartStore()
const { count, total, items } = storeToRefs(cart)
const { removeAt, clear } = cart
const router = useRouter()
const i18n = useI18nStore()
const { dict } = storeToRefs(i18n)

const showList = ref(false)
function toggleList(){ showList.value = !showList.value }
function remove(idx){ removeAt(idx) }
function goCheckout(){ router.push('/cart') }
</script>