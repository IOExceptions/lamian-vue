<template>
  <header class="topbar">
    <div class="brand">拉 · 一兰拉面</div>
    <div class="lang">中文</div>
    <div class="icons">🔔 👤</div>
  </header>

  <div class="search-wrap">
    <div class="search">🔍<input class="input" placeholder="搜索拉面、套餐、配菜" /></div>
  </div>

  <div class="scroll-x">
    <div class="chip">🍰 甜品站</div>
    <div class="chip">🧋 茶饮</div>
    <div class="chip">🎫 领劵马上省</div>
    <div class="chip">🎠 亲子乐园</div>
    <div class="chip">🚗 车道取餐</div>
  </div>

  <div class="section">
    <h3>🍱 套餐特惠 <small style="color:#7a8796;">查看更多</small></h3>
  </div>
  <div class="card-grid">
    <div v-for="p in best" :key="p.id" class="card">
      <img class="img" :src="p.img" alt="" />
      <div class="body">
        <b>{{ p.title }}</b>
        <small style="color:#7a8796;">⭐ {{ p.rate }} 月销{{ p.sales }}</small>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <div class="price">￥{{ p.specs[0].price.toFixed(1) }}</div>
          <button class="btn-round button primary" @click="$router.push('/menu')">加入</button>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h3>🔥 热销推荐 <small style="color:#7a8796;">查看更多</small></h3>
  </div>
  <div class="card-grid" style="padding-bottom: 90px;">
    <div v-for="p in hot" :key="p.id" class="card">
      <img class="img" :src="p.img" alt="" />
      <div class="body">
        <b>{{ p.title }}</b>
        <small style="color:#7a8796;">⭐ {{ p.rate }} 月销{{ p.sales }}</small>
        <div class="price">￥{{ p.specs[0].price.toFixed(1) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/products'
const p = useProductStore()
const { products } = storeToRefs(p)
const best = products.value.slice(0,2)
const hot = products.value.slice(2,6)
</script>