<template>
  <header class="topbar"><div class="brand">{{ dict.navProfile }}</div></header>

  <div class="profile">
    <div class="profile-card">
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="width:52px; height:52px; border-radius:50%; background:#fff; color:#e33933; display:grid; place-items:center; font-weight:700;">🙂</div>
        <div>
          <b>{{ dictProfile.nickname }}</b>
          <div style="opacity:.9;">{{ dictProfile.tier }}</div>
          <div>⭐⭐⭐⭐☆</div>
        </div>
      </div>
      <div style="height:8px; background: rgba(255,255,255,.35); border-radius:999px; margin-top:10px;">
        <div style="height:100%; width:60%; background:#fff; border-radius:999px;"></div>
      </div>
       <div style="text-align:right; opacity:.9;">{{ dictProfile.upgradeHint }}</div>
    </div>

    <div class="panel">
      <div class="row"><div>{{ dictProfile.myOrders }}</div><div>{{ dictProfile.orderHistory }}</div></div>
      <div class="row"><div>{{ dictProfile.profile }}</div><div>{{ dictProfile.viewEdit }}</div></div>
      <div class="row"><div>{{ dictProfile.langSetting }}</div><div>{{ dict.langLabel }}</div></div>
    </div>

    <button class="btn-round" style="width:100%;">{{ dictProfile.logout }}</button>
  </div>
</template>

<script setup>
import { useI18nStore } from '../stores/i18n'
import { storeToRefs } from 'pinia'
const i18n = useI18nStore()
const { dict } = storeToRefs(i18n)
const dictProfile = {
  zh: {
    nickname: '拉面爱好者', tier: '黄金会员 · 1,280 积分', upgradeHint: '还需 720 积分升级',
    myOrders: '我的订单', orderHistory: '历史订单 · 3', profile: '个人信息', viewEdit: '查看/修改', langSetting: '语言设置', logout: '退出登录'
  },
  en: {
    nickname: 'Ramen Lover', tier: 'Gold Member · 1,280 pts', upgradeHint: '720 pts to next tier',
    myOrders: 'My Orders', orderHistory: 'Order History · 3', profile: 'Profile', viewEdit: 'View/Edit', langSetting: 'Language', logout: 'Sign out'
  },
  ja: {
    nickname: 'ラーメン好き', tier: 'ゴールド会員 · 1,280 ポイント', upgradeHint: 'あと720ポイントでアップグレード',
    myOrders: '注文履歴', orderHistory: '履歴 · 3', profile: '個人情報', viewEdit: '表示/編集', langSetting: '言語設定', logout: 'ログアウト'
  }
}[i18n.lang]
</script>