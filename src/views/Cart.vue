<template>
  <header class="topbar">
    <div class="brand">{{ dict.titleCheckout }}</div>
  </header>

  <div class="cart">
    <div class="cart-card">
      <div class="cart-row" style="font-weight:700;">{{ dict.sectionOrderItems }}</div>
      <div class="hr"></div>
      <div v-for="(i,idx) in items" :key="idx" class="cart-row">
        <div style="display:flex; gap:10px; align-items:center;">
          <img :src="i.img" alt="" style="width:56px; height:56px; border-radius:10px; object-fit:cover;" />
          <b>{{ i.title }}</b>
          <div style="color:#7a8796; font-size:13px;">{{ i.spec?.title }} × {{ i.qty }}
            <template v-if="i.addons?.length">
              · 附加：
              <span v-for="(a,ax) in i.addons" :key="ax">{{ a.title }}×{{ a.qty }}</span>
            </template>
          </div>
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
          <b>￥{{ (i.qty*i.price + (i.addons?.reduce((a,b)=>a + b.qty*b.price,0)||0)).toFixed(0) }}</b>
          <button @click="removeAt(idx)" style="border:0; background:#ffecec; color:#e33933; border-radius:10px; padding:6px 10px;">🗑</button>
        </div>
      </div>
    </div>

    <div class="cart-card">
      <div class="cart-row">
        <div>{{ dict.coupon }}</div>
        <select v-model="couponCode" class="input" style="max-width:200px;">
          <option value="">{{ dict.couponNone }}</option>
          <option v-for="c in coupons" :key="c.code" :value="c.code">{{ c.title }}</option>
        </select>
      </div>
      <div class="hr"></div>
      <div class="cart-row"><div>{{ dict.priceOriginal }}</div><b>￥{{ subtotal.toFixed(0) }}</b></div>
      <div class="cart-row"><div>{{ dict.priceDiscount }}</div><b style="color:#16a34a;">-￥{{ discount.toFixed(0) }}</b></div>
      <div class="cart-row"><div>{{ dict.pricePayable }}</div><b style="color:var(--brand);">￥{{ total.toFixed(0) }}</b></div>
    </div>
  </div>

  <div style="position:fixed; left:0; right:0; bottom:62px; padding: 12px; background:#fff; border-top:1px solid var(--border);">
    <div style="display:flex; gap:10px;">
      <button class="button" style="height:48px; min-width:120px;" @click="goMenu">{{ dict.btnBackToMenu }}</button>
      <button class="btn-round button primary" style="flex:1; height:48px;" @click="pay">{{ dict.btnSubmit }} ￥{{ total.toFixed(0) }}</button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'
import { useOrderStore } from '../stores/orders'
import { useRouter } from 'vue-router'
import { useI18nStore } from '../stores/i18n'
const i18n = useI18nStore()
const { dict } = storeToRefs(i18n)
const cart = useCartStore()
const os = useOrderStore()
const router = useRouter()
const { items, subtotal, total, discount } = storeToRefs(cart)
const { removeAt } = cart

// 优惠券示例：满减/直接减免
const coupons = [
  { code: 'OFF10', title: dict.value.couponOff10, discount: 10 },
  { code: 'FULL99-20', title: dict.value.couponFull99_20, discount: 20, minSpend: 99 },
]
import { computed, ref, watch } from 'vue'
const couponCode = ref('')
const selectedCoupon = computed(() => coupons.find(c=>c.code===couponCode.value) || null)
watch(selectedCoupon, (c) => cart.setCoupon(c))

function pay(){
  const order = os.add({
    shopName: '一兰拉面(涩谷店)',
    shopPhone: '400-000-0000',
    eta: '15-20分钟',
    subtotal: subtotal.value,
    discount: discount.value,
    total: total.value,
    items: JSON.parse(JSON.stringify(items.value))
  })
  cart.clear()
  router.replace(`/order/${order.id}`)
}

function goMenu(){
  router.replace('/menu')
}
</script>