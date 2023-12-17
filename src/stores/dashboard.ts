import type { Dashboard } from '@/types/dashboard'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useDashboardStore = defineStore(
    'dashboard',
    () => {
        const dashboard = ref<Dashboard | null>(null)

        const getDashboardData = async () => {
            try {
                const res = await axios.post('stats/info')
                dashboard.value = res.data
            } catch (error) {
                console.log(error)
            }
        }

        const initInterval = () => {
            setInterval(() => getDashboardData(), 10000)
        }

        return { dashboard, getDashboardData, initInterval }
    },
    { persist: true },
)
