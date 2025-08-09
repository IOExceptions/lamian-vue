<template>
  <header class="topbar" style="background:#fff; color:var(--text); border-bottom:1px solid var(--border);">
    <div style="display:flex; align-items:center; gap:8px;">🏠 {{ dict.brand }}(涩谷店)</div>
    <div class="lang" style="color:var(--green);">⏱️ 15-20分钟</div>
  </header>

  <div class="search-wrap">
    <div class="search">🔍<input class="input" :placeholder="dict.searchPlaceholder" /></div>
  </div>

  <div class="sticky-tabs">
    <div class="tabs-scroll">
      <div class="tabs">
        <div class="tab" :class="{active: active===null}" @click="goTab(null)"><span class="tab-icon">🧰</span>{{ dict.menuAll }}</div>
        <div v-for="c in categories" :key="c.id" class="tab" :class="{active: active===c.id}" @click="goTab(c.id)"><span class="tab-icon">{{ c.icon }}</span>{{ catTitle(c) }}</div>
      </div>
    </div>
  </div>

  <div class="list">
    <div v-for="p in filtered" :key="p.id" class="list-item">
      <img :src="p.img" alt="" style="aspect-ratio:1/1; width:88px; height:auto;" />
      <div style="flex:1; display:flex; flex-direction:column; gap:6px;">
        <b class="line-clamp-1">{{ p.title }}</b>
        <div class="tags">
          <span v-for="t in p.tags" :key="t.text" class="tag" :class="t.type">{{ t.text }}</span>
        </div>
        <small style="color:#7a8796;">⭐ {{ p.rate }} · {{ dict.salesPrefix }}{{ p.sales }}</small>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <b class="price">起 ¥{{ p.specs[0].price.toFixed(1) }}</b>
          <button class="btn-spec button" style="height:36px; padding:0 12px;" @click="choose(p)">{{ dict.btnChooseSpec }}</button>
        </div>
      </div>
    </div>
  </div>

  <FloatCart />
  <SpecModal :open="show" :product="current" @close="show=false" @added="toast()" />
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/products'
import FloatCart from '../components/FloatCart.vue'
import SpecModal from '../components/SpecModal.vue'
import { useI18nStore } from '../stores/i18n'

const ps = useProductStore()
const { products, categories } = storeToRefs(ps)
const i18n = useI18nStore()
const { dict } = storeToRefs(i18n)

const active = ref(null)
const filtered = computed(() => active.value ? products.value.filter(p=>p.categoryId===active.value) : products.value)

// 支持 ?category=xx 通过路由 query 切换分类
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();

function syncFromQuery(){
  const q = route.query.category
  if (q == null || q === 'all') active.value = null
  else {
    const num = Number(q)
    active.value = Number.isFinite(num) ? num : null
  }
}
syncFromQuery()
// 监听路由变化，支持浏览器前进/后退保持选中态
watch(() => route.query.category, () => syncFromQuery())

function goTab(id){
  active.value = id
  const q = id==null ? { category: 'all' } : { category: String(id) }
  router.replace({ query: q })
}

function catTitle(c){
  if (i18n.lang === 'en') return c.title_en || c.title
  if (i18n.lang === 'ja') return c.title_ja || c.title
  return c.title
}

const show = ref(false)
const current = ref(null)
function choose(p){ current.value = JSON.parse(JSON.stringify(p)); show.value = true }
function toast(){ /* placeholder */ }
</script>