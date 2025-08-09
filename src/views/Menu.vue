<template>
  <header class="topbar" style="background:#fff; color:var(--text); border-bottom:1px solid var(--border);">
    <div style="display:flex; align-items:center; gap:8px;">🏠 一兰拉面(涩谷店)</div>
    <div class="lang" style="color:var(--green);">⏱️ 15-20分钟</div>
  </header>

  <div class="search-wrap">
    <div class="search">🔍<input class="input" placeholder="搜索商品、口味、配菜" /></div>
  </div>

  <div class="scroll-x">
    <div class="chip" :style="tabStyle(null)" @click="active=null">🧰 全部</div>
    <div v-for="c in categories" :key="c.id" class="chip" :style="tabStyle(c.id)" @click="active=c.id">{{ c.icon }} {{ c.title }}</div>
  </div>

  <div class="list">
    <div v-for="p in filtered" :key="p.id" class="list-item">
      <img :src="p.img" alt="" />
      <div style="flex:1; display:flex; flex-direction:column; gap:6px;">
        <b>{{ p.title }}</b>
        <div class="tags">
          <span v-for="t in p.tags" :key="t.text" class="tag" :class="t.type">{{ t.text }}</span>
        </div>
        <small style="color:#7a8796;">⭐ {{ p.rate }} · 月销{{ p.sales }}</small>
        <div style="display:flex; align-items:center; gap:8px;">
          <b class="price">起 ￥{{ p.specs[0].price.toFixed(0) }}</b>
          <button class="btn-spec button" @click="choose(p)">选择规格</button>
        </div>
      </div>
    </div>
  </div>

  <FloatCart />
  <SpecModal :open="show" :product="current" @close="show=false" @added="toast()" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/products'
import FloatCart from '../components/FloatCart.vue'
import SpecModal from '../components/SpecModal.vue'

const ps = useProductStore()
const { products, categories } = storeToRefs(ps)

const active = ref(null)
const filtered = computed(() => active.value ? products.value.filter(p=>p.categoryId===active.value) : products.value)
function tabStyle(id){ return { background: (active.value===id)?'var(--brand-weak)':'#fff', color:(active.value===id)?'var(--brand)':'inherit' } }

const show = ref(false)
const current = ref(null)
function choose(p){ current.value = JSON.parse(JSON.stringify(p)); show.value = true }
function toast(){ /* placeholder */ }
</script>