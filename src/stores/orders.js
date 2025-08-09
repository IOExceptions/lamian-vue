import { defineStore } from 'pinia'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [] // { id, number, shopName, eta, createdAt, total, discount, subtotal, items: [{title, img, qty, price, addons:[]}] }
  }),
  getters: {
    byId: (s) => (id) => s.orders.find(o => String(o.id) === String(id))
  },
  actions: {
    add(order) {
      const id = Date.now().toString()
      const createdAt = new Date().toISOString()
      const number = Math.floor(100000 + Math.random()*900000).toString()
      const rec = { id, number, createdAt, ...order }
      this.orders.unshift(rec)
      return rec
    }
  }
})


