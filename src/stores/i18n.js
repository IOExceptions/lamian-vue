import { defineStore } from 'pinia'

const DICT = {
  zh: {
    langLabel: '中文',
    brand: '一兰拉面',
    searchPlaceholder: '搜索拉面、套餐、配菜',
    quickDessert: '甜品站',
    quickDrink: '茶饮',
    quickCoupon: '领券马上省',
    quickFamily: '亲子乐园',
    quickDrive: '车道取餐',
    sectionCombos: '套餐特惠',
    sectionSeeMore: '查看更多',
    sectionHot: '热销推荐',
    sectionDeal: '今日特惠',
    btnBuyNow: '立即购买',
    badgeCombo: '套餐',
    priceFrom: '起',
    dailySpecialTitle: '超值午餐套餐',
    dailySpecialDesc: '汉堡+薯条+饮料组合套餐',
    tagLimited: '限时',
    savingPrefix: '立省',
    couponOff10: '立减10元',
    couponFull99_20: '满99减20',
    // Nav
    navHome: '首页', navMenu: '点餐', navProfile: '我的',
    // Menu & product
    menuAll: '全部', btnChooseSpec: '选择规格', salesPrefix: '月销',
    // Spec modal
    specSelectTitle: '规格选择', quantity: '数量', addOnsTitle: '添加小食', btnAddToCart: '加入购物车',
    // Cart/Checkout
    titleCheckout: '结算', sectionOrderItems: '订单商品', coupon: '优惠券', couponNone: '不使用',
    priceOriginal: '原始价格', priceDiscount: '优惠价格', pricePayable: '支付价格',
    btnBackToMenu: '返回点餐', btnSubmit: '提交订单',
    // Float cart
    currentCart: '当前购物车', btnClear: '清空', btnDelete: '删除', btnGoCheckout: '去结算',
    // Order detail
    titleOrderConfirm: '订单确认', successTitle: '订单确认成功！', tagPickup: '自取', pickupHint: '您的取餐号', pickupNote: '取餐时请出示此号码',
    waitTime: '预计等待时间', fieldShop: '店铺', fieldAddress: '地址', fieldOrderTime: '下单时间',
    priceSubtotal: '小计', priceTotal: '总计', contactShop: '联系店家', btnBackHome: '返回首页', btnViewOrder: '查看订单详情'
  },
  en: {
    langLabel: 'English',
    brand: 'Ichiran Ramen',
    searchPlaceholder: 'Search ramen, combos, sides',
    quickDessert: 'Desserts',
    quickDrink: 'Drinks',
    quickCoupon: 'Coupons',
    quickFamily: 'Family',
    quickDrive: 'Drive-thru',
    sectionCombos: 'Combo Deals',
    sectionSeeMore: 'View more',
    sectionHot: 'Hot Picks',
    sectionDeal: 'Today’s Special',
    btnBuyNow: 'Buy Now',
    badgeCombo: 'Combo',
    priceFrom: 'from',
    dailySpecialTitle: 'Value Lunch Combo',
    dailySpecialDesc: 'Burger + Fries + Drink',
    tagLimited: 'Limited',
    savingPrefix: 'Save',
    couponOff10: '¥10 off',
    couponFull99_20: '¥20 off over 99',
    navHome: 'Home', navMenu: 'Order', navProfile: 'Profile',
    menuAll: 'All', btnChooseSpec: 'Choose', salesPrefix: 'Sold ',
    specSelectTitle: 'Choose Spec', quantity: 'Quantity', addOnsTitle: 'Add-ons', btnAddToCart: 'Add to Cart',
    titleCheckout: 'Checkout', sectionOrderItems: 'Order Items', coupon: 'Coupon', couponNone: 'None',
    priceOriginal: 'Original', priceDiscount: 'Discount', pricePayable: 'Payable',
    btnBackToMenu: 'Back to Menu', btnSubmit: 'Submit Order',
    currentCart: 'Your Cart', btnClear: 'Clear', btnDelete: 'Remove', btnGoCheckout: 'Checkout',
    titleOrderConfirm: 'Order Confirmation', successTitle: 'Order submitted!', tagPickup: 'Pickup', pickupHint: 'Pickup Code', pickupNote: 'Show this code at pickup',
    waitTime: 'ETA', fieldShop: 'Shop', fieldAddress: 'Address', fieldOrderTime: 'Order Time',
    priceSubtotal: 'Subtotal', priceTotal: 'Total', contactShop: 'Contact Shop', btnBackHome: 'Back Home', btnViewOrder: 'View Order'
  },
  ja: {
    langLabel: '日本語',
    brand: '一蘭ラーメン',
    searchPlaceholder: 'ラーメン・セット・サイドを検索',
    quickDessert: 'デザート',
    quickDrink: 'ドリンク',
    quickCoupon: 'クーポン',
    quickFamily: 'ファミリー',
    quickDrive: 'ドライブスルー',
    sectionCombos: 'セット特価',
    sectionSeeMore: 'もっと見る',
    sectionHot: '人気おすすめ',
    sectionDeal: '本日のお得',
    btnBuyNow: '今すぐ購入',
    badgeCombo: 'セット',
    priceFrom: 'から',
    dailySpecialTitle: 'お得なランチセット',
    dailySpecialDesc: 'バーガー+ポテト+ドリンク',
    tagLimited: '期間限定',
    savingPrefix: 'お得',
    couponOff10: '10円引き',
    couponFull99_20: '99以上で20円引き',
    navHome: 'ホーム', navMenu: '注文', navProfile: 'マイ',
    menuAll: 'すべて', btnChooseSpec: '選択', salesPrefix: '月間販売',
    specSelectTitle: '仕様を選択', quantity: '数量', addOnsTitle: 'トッピング', btnAddToCart: 'カートに入れる',
    titleCheckout: 'お会計', sectionOrderItems: '注文商品', coupon: 'クーポン', couponNone: '未使用',
    priceOriginal: '元の価格', priceDiscount: '割引', pricePayable: '支払金額',
    btnBackToMenu: 'メニューへ戻る', btnSubmit: '注文する',
    currentCart: '現在のカート', btnClear: 'クリア', btnDelete: '削除', btnGoCheckout: 'お会計',
    titleOrderConfirm: '注文確認', successTitle: '注文が送信されました！', tagPickup: 'お持ち帰り', pickupHint: '受取コード', pickupNote: '受取時に提示してください',
    waitTime: '予想待ち時間', fieldShop: '店舗', fieldAddress: '住所', fieldOrderTime: '注文時間',
    priceSubtotal: '小計', priceTotal: '合計', contactShop: '店舗に連絡', btnBackHome: 'ホームへ', btnViewOrder: '注文を見る'
  }
}

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    lang: (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || 'zh'
  }),
  getters: {
    dict: (s) => DICT[s.lang] || DICT.zh
  },
  actions: {
    setLang(l){
      this.lang = ['zh','en','ja'].includes(l) ? l : 'zh'
      if (typeof localStorage !== 'undefined') localStorage.setItem('lang', this.lang)
    }
  }
})


