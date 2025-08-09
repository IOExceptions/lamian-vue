<template>
  <header class="topbar" style="background:#dc2626;color:#fff;">
    <div style="display:flex;align-items:center;gap:8px;">
      <div style="width:32px;height:32px;border-radius:999px;background:#fff;color:#dc2626;display:flex;align-items:center;justify-content:center;font-weight:700;">拉</div>
      <div class="brand">{{ dict.brand }}</div>
    </div>
    <div class="lang" style="position:relative;">
      <button class="button" style="height:32px; border:0; background:rgba(255,255,255,.15); color:#fff;" @click="toggleLang">{{ dict.langLabel }} ▾</button>
      <div v-if="openLang" class="dropdown">
        <div class="dropdown-item" @click="changeLang('zh')">中文</div>
        <div class="dropdown-item" @click="changeLang('en')">English</div>
        <div class="dropdown-item" @click="changeLang('ja')">日本語</div>
      </div>
    </div>
    <div class="icons" style="display:flex;align-items:center;gap:10px;">
      <span class="notif">🔔<span class="notif-badge">3</span></span>
      <span>👤</span>
    </div>
  </header>

  <div class="search-wrap">
    <div class="search">🔍<input class="input" :placeholder="dict.searchPlaceholder" /></div>
  </div>

  <div class="quick" style="background:#fff; border-bottom:1px solid var(--border); padding:12px 16px;">
    <div style="display:flex; justify-content:space-between;">
      <a @click="$router.push('/menu?category=4')" style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <div style="width:48px;height:48px;border-radius:999px;background:#fdf2f8;display:grid;place-items:center;font-size:22px;">🍡</div>
        <span style="font-size:12px;color:#334155;">{{ dict.quickDessert }}</span>
      </a>
      <a @click="$router.push('/menu')" style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <div style="width:48px;height:48px;border-radius:999px;background:#fffbeb;display:grid;place-items:center;font-size:22px;">🍵</div>
        <span style="font-size:12px;color:#334155;">{{ dict.quickDrink }}</span>
      </a>
      <a @click="$router.push('/menu')" style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <div style="width:48px;height:48px;border-radius:999px;background:#fef2f2;display:grid;place-items:center;font-size:22px;">🎫</div>
        <span style="font-size:12px;color:#334155;">{{ dict.quickCoupon }}</span>
      </a>
      <a @click="$router.push('/menu')" style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <div style="width:48px;height:48px;border-radius:999px;background:#eff6ff;display:grid;place-items:center;font-size:22px;">🎠</div>
        <span style="font-size:12px;color:#334155;">{{ dict.quickFamily }}</span>
      </a>
      <a @click="$router.push('/menu')" style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <div style="width:48px;height:48px;border-radius:999px;background:#ecfdf5;display:grid;place-items:center;font-size:22px;">🚗</div>
        <span style="font-size:12px;color:#334155;">{{ dict.quickDrive }}</span>
      </a>
    </div>
  </div>

  <div class="section">
    <h3>🍱 {{ dict.sectionCombos }} <small style="color:#e11d48;cursor:pointer;" @click="$router.push('/menu?category=1')">{{ dict.sectionSeeMore }}</small></h3>
  </div>
  <div class="hscroll">
    <div v-for="p in combos" :key="p.id" class="combo-card">
      <div style="position:relative;">
        <img class="img" :src="p.img" alt="" />
        <div style="position:absolute; left:8px; top:8px;">
          <span class="badge orange">{{ dict.badgeCombo }}</span>
        </div>
      </div>
      <div class="body">
        <b style="font-size:14px;" class="line-clamp-2">{{ p.title }}</b>
        <small style="color:#7a8796;">⭐ {{ p.rate }} · {{ dict.salesPrefix }}{{ p.sales }}</small>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex;flex-direction:column;gap:2px;">
            <small style="color:#8894a5;">{{ dict.savingPrefix }}¥10</small>
            <div class="price">¥{{ p.specs[0].price.toFixed(1) }}</div>
          </div>
          <button class="btn-circle" @click="choose(p)">＋</button>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h3>{{ dict.sectionHot }} <small style="color:#e11d48;cursor:pointer;" @click="$router.push('/menu')">{{ dict.sectionSeeMore }}</small></h3>
  </div>
  <div class="card-grid">
    <div v-for="p in hot" :key="p.id" class="card">
      <img class="img" :src="p.img" alt="" />
    <div class="body">
        <b>{{ p.title }}</b>
      <small style="color:#7a8796;">⭐ {{ p.rate }} · {{ dict.salesPrefix }}{{ p.sales }}</small>
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <span class="price" style="color:#e11d48;">¥{{ p.specs[0].price.toFixed(1) }}</span>
          <button class="btn-circle sm" @click="choose(p)">🛒</button>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h3>{{ dict.sectionDeal }}</h3>
  </div>
  <div class="deal">
    <img src="/daily-special-combo.png" :alt="dict.sectionDeal" />
    <div class="deal-body">
      <b>{{ dict.dailySpecialTitle }}</b>
      <small style="color:#7a8796;">{{ dict.dailySpecialDesc }}</small>
      <div style="display:flex;align-items:center;gap:8px;">
        <div class="price" style="color:#dc2626;">¥29.9</div>
        <small style="text-decoration:line-through;color:#7a8796;">¥39.9</small>
        <span class="tag red">{{ dict.tagLimited }}</span>
      </div>
    </div>
    <button class="button primary" @click="$router.push('/menu')">{{ dict.btnBuyNow }}</button>
  </div>
  <div style="height:84px" />

  <FloatCart />
  <SpecModal :open="show" :product="current" @close="show=false" @added="toast()" />
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/products'
import FloatCart from '../components/FloatCart.vue'
import SpecModal from '../components/SpecModal.vue'
import { useI18nStore } from '../stores/i18n'
const p = useProductStore()
const { products } = storeToRefs(p)
const combos = products.value.filter(x=>x.categoryId===1).slice(0,3)
const hot = [products.value[0], products.value[1], products.value[6], products.value[7]].filter(Boolean)

const show = ref(false)
const current = ref(null)
function choose(prod){ current.value = JSON.parse(JSON.stringify(prod)); show.value = true }
function toast(){ /* TODO: 可加轻提示 */ }

const i18n = useI18nStore()
const { dict } = storeToRefs(i18n)
const openLang = ref(false)
function toggleLang(){ openLang.value = !openLang.value }
function changeLang(l){ i18n.setLang(l); openLang.value=false }
</script>