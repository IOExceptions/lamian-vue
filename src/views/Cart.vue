<template>
  <header class="topbar">
    <div class="brand">结算</div>
  </header>

  <div class="cart">
    <div class="cart-card">
      <div v-for="(i,idx) in items" :key="idx" class="cart-row">
        <div>
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
        <div>优惠券</div><button style="border:1px solid var(--border); background:#fff; border-radius:10px; padding:6px 10px;">选择</button>
      </div>
      <div class="hr"></div>
      <div class="cart-row"><div>小计</div><b>￥{{ subtotal.toFixed(0) }}</b></div>
      <div class="cart-row"><div>总计</div><b style="color:var(--brand);">￥{{ total.toFixed(0) }}</b></div>
    </div>
  </div>

  <div style="position:fixed; left:0; right:0; bottom:62px; padding: 12px; background:#fff; border-top:1px solid var(--border);">
    <button class="btn-round button primary" style="width:100%; height:48px;" @click="pay">提交订单 ￥{{ total.toFixed(0) }}</button>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
const { items, subtotal, total } = storeToRefs(cart)
const { removeAt } = cart

function pay(){
  alert('模拟支付成功！')
  cart.clear()
}
</script>