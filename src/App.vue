<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'
import { useDashboardStore } from '@/stores/dashboard'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { locale } = useI18n({})
const dashboardStore = useDashboardStore()

onMounted(() => {
    user.value
    locale.value = localStorage.getItem('vueml-lang') || 'ru'
    if (user.value !== null) {
        dashboardStore.getDashboardData()
        setInterval(() => dashboardStore.getDashboardData(), 10000)
    }
})
</script>

<template>
    <RouterView />
</template>

<style lang="scss" scoped></style>
