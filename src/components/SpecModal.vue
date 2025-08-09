<template>
  <div class="modal" v-if="open" @click.self="close()">
    <div class="sheet">
      <div class="top">
        <img :src="product.img" alt="" />
        <div>
          <div class="title">{{ product.title }}</div>
          <div style="color:#f59e0b; font-size:13px;">⭐ {{ product.rate }} · {{ dict.salesPrefix }}{{ product.sales }}</div>
        </div>
      </div>

      <div class="sheet-content">
        <div class="selector">
          <div style="font-weight:700;">{{ dict.specSelectTitle }}</div>
        <div v-for="s in product.specs" :key="s.id" class="opt" :class="{active: s.id === selected?.id}" @click="selected=s">
          <span>{{ s.title }}</span>
          <b>￥{{ s.price.toFixed(1) }}</b>
        </div>
        </div>

        <div class="counter">
          <span>{{ dict.quantity }}</span>
          <div style="margin-left:auto; display:flex; gap:10px; align-items:center;">
            <button class='button' style='width:36px;height:36px' @click="qty=Math.max(1, qty-1)">-</button>
            <b>{{ qty }}</b>
            <button class='button' style='width:36px;height:36px' @click="qty+=1">+</button>
          </div>
        </div>

        <div class="selector">
          <div style="font-weight:700;">{{ dict.addOnsTitle }}</div>
        </div>
        <div class="addons">
          <div v-for="a in product.addons" :key="a.id" class="row">
            <div style="display:flex; flex-direction:column;">
              <b>{{ a.title }}</b>
              <small style="color:#8894a5;">￥{{ a.price.toFixed(1) }}</small>
            </div>
            <div style="display:flex; gap:10px; align-items:center;">
              <button class='button' style='width:32px;height:32px' @click="a.qty=Math.max(0,(a.qty||0)-1)">-</button>
              <b>{{ a.qty||0 }}</b>
              <button class='button' style='width:32px;height:32px' @click="a.qty=(a.qty||0)+1">+</button>
            </div>
          </div>
        </div>
      </div>

      <div class="cta">
        <button class="button primary" @click="confirm">{{ dict.btnAddToCart }} - ￥{{ sumPrice.toFixed(0) }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useCartStore } from '../stores/cart'
import { useI18nStore } from '../stores/i18n'
import { storeToRefs } from 'pinia'

const props = defineProps({ open: Boolean, product: Object })
const emit = defineEmits(['close','added'])
const cart = useCartStore()
const i18n = useI18nStore()
const { dict } = storeToRefs(i18n)

const selected = ref(null)
const qty = ref(1)

watch(() => props.open, (v) => {
  if (v) {
    selected.value = props.product?.specs?.[0] || null
    qty.value = 1
    props.product?.addons?.forEach(a => a.qty = 0)
  }
})

const sumPrice = computed(() => {
  const addons = (props.product?.addons||[]).reduce((a,b)=>a + (b.qty||0)*b.price,0)
  return (selected.value?.price || 0) * qty.value + addons
})

function close(){ emit('close') }

function confirm(){
  const addons = (props.product.addons||[]).filter(a=>(a.qty||0)>0).map(a=>({id:a.id,title:a.title,price:a.price,qty:a.qty}))
  cart.add({
    id: props.product.id,
    title: props.product.title,
    img: props.product.img,
    price: selected.value.price,
    qty: qty.value,
    spec: { id: selected.value.id, title: selected.value.title },
    addons
  })
  emit('added')
  close()
}
</script>