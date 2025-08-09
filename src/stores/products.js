import { defineStore } from 'pinia'
import data from '../mock/menu.json'

export const useProductStore = defineStore('products', {
  state: () => ({
    shop: data.shop,
    categories: data.categories,
    products: data.products
  }),
  getters: {
    byCategory: (s) => (cid) => s.products.filter(p=>p.categoryId===cid)
  }
})