import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // {id, title, price, qty, spec, addons: [{id, title, price, qty}]}
    coupon: null
  }),
  getters: {
    count: (s) => s.items.reduce((a,b)=>a+b.qty,0),
    subtotal: (s) => s.items.reduce((a,b)=>a + b.qty * b.price + (b.addons?.reduce((x,y)=>x + (y.qty*y.price),0) || 0), 0),
    total: (s) => Math.max(0, (s.subtotal - (s.coupon?.discount || 0)))
  },
  actions: {
    clear(){ this.items = [] },
    add(item){
      // try merge same product + spec + addons signature
      const key = (i) => [i.id, i.spec?.id, JSON.stringify((i.addons||[]).map(a=>({id:a.id,qty:a.qty})).sort((x,y)=>x.id-y.id))].join('|')
      const idx = this.items.findIndex(i => key(i) === key(item))
      if (idx >= 0) this.items[idx].qty += item.qty
      else this.items.push(JSON.parse(JSON.stringify(item)))
    },
    removeAt(i){ this.items.splice(i,1) }
  }
})