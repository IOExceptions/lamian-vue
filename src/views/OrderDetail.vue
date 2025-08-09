<template>
  <header class="topbar">
    <div class="brand">{{ dict.titleOrderConfirm }}</div>
  </header>

  <div class="cart" style="padding-bottom:120px;">
    <!-- 成功与取餐信息 -->
    <div class="cart-card" style="display:grid; gap:12px;">
      <div class="cart-row" style="align-items:flex-start; gap:12px;">
        <div style="width:44px;height:44px;border-radius:999px;background:#ecfdf5;color:#16a34a;display:grid;place-items:center;">✅</div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <b>{{ dict.successTitle }}</b>
          <div class="badge-soft">{{ dict.tagPickup }}</div>
        </div>
      </div>

      <div style="background:#ecfdf5; border:1px solid #bbf7d0; border-radius:12px; padding:14px; text-align:center;">
        <div style="color:#6b7280; font-size:13px; margin-bottom:6px;">{{ dict.pickupHint }}</div>
        <div style="font-size:28px; font-weight:800; color:#16a34a;">{{ pickupCode }}</div>
        <div style="color:#94a3b8; font-size:12px;">{{ dict.pickupNote }}</div>
      </div>

      <div class="cart-row" style="justify-content:center; gap:8px;">
        <span style="color:#f59e0b;">⏱</span>
        <span style="font-size:16px; font-weight:600;">{{ dict.waitTime }}：{{ order?.eta }}</span>
      </div>

      <div class="cart-row"><div>{{ dict.fieldShop }}</div><b>{{ order?.shopName }}</b></div>
      <div class="cart-row"><div>{{ dict.fieldAddress }}</div><b style="font-weight:500; color:#475569;">{{ shopAddress }}</b></div>
      <div class="cart-row"><div>{{ dict.fieldOrderTime }}</div><b>{{ time }}</b></div>
    </div>

    <!-- 订单商品清单 -->
    <div class="cart-card">
      <div class="cart-row" style="font-weight:700;">{{ dict.sectionOrderItems }}</div>
      <div class="hr"></div>
      <div v-for="(i,idx) in order?.items || []" :key="idx" class="cart-row">
        <div style="display:flex; gap:10px; align-items:center;">
          <img :src="i.img" alt="" style="width:56px; height:56px; border-radius:10px; object-fit:cover;" />
          <div>
            <b class="line-clamp-1">{{ i.title }}</b>
            <div style="color:#7a8796; font-size:13px;">{{ i.spec?.title }} × {{ i.qty }}</div>
          </div>
        </div>
        <b>￥{{ (i.qty*i.price + (i.addons?.reduce((a,b)=>a + b.qty*b.price,0)||0)).toFixed(0) }}</b>
      </div>
    </div>

    <!-- 价格汇总 -->
    <div class="cart-card">
      <div class="cart-row"><div>{{ dict.priceSubtotal }}</div><b>￥{{ order?.subtotal?.toFixed(0) }}</b></div>
      <div class="cart-row" v-if="(order?.discount||0) > 0"><div>{{ dict.priceDiscount }}</div><b style="color:#16a34a;">-￥{{ order?.discount?.toFixed(0) }}</b></div>
      <div class="cart-row"><div>{{ dict.priceTotal }}</div><b style="color:var(--brand);">￥{{ order?.total?.toFixed(0) }}</b></div>
    </div>

    <!-- 联系方式 -->
    <div class="cart-card">
      <div class="cart-row"><div>{{ dict.contactShop }}</div><a class="button" :href="tel">📞</a></div>
    </div>
  </div>

  <!-- 底部操作 -->
  <div style="position:fixed; left:0; right:0; bottom:62px; padding: 12px; background:#fff; border-top:1px solid var(--border);">
    <div style="display:flex; gap:10px;">
      <router-link to="/home" class="btn-round button primary" style="flex:1; height:44px; display:inline-flex; align-items:center; justify-content:center;">{{ dict.btnBackHome }}</router-link>
      <router-link :to="`/order/${route.params.id}`" class="button" style="height:44px; min-width:140px; display:inline-flex; align-items:center; justify-content:center; border-color: var(--brand); color: var(--brand);">{{ dict.btnViewOrder }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '../stores/orders'
import { useI18nStore } from '../stores/i18n'

const route = useRoute()
const os = useOrderStore()
const { byId } = os
const order = computed(() => byId(route.params.id))
const time = computed(() => new Date(order.value?.createdAt || Date.now()).toLocaleString())
const tel = computed(() => `tel:${order.value?.shopPhone || '400-000-0000'}`)
const pickupCode = computed(() => `P${String(order.value?.number||'0000').slice(-4)}`)
const shopAddress = computed(() => order.value?.shopAddress || '东京都涩谷区道玄坂1-2-3')
const i18n = useI18nStore()
const { dict } = storeToRefs(i18n)
</script>


