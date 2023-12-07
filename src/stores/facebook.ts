import type { Datum, Facebook } from '@/types/facebook'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useFacebookStore = defineStore('facebook', () => {
    const facebookData = ref<Facebook | null>(null)
    const filterBy = ref({
        eaab_token: false,
        fp: false,
        avatar: false,
        mail: false,
        no_mail: false,
        cookies: false,
        launched: false,
        launched_count: 0,
        search_by_login: false,
        search_by_login_query: '',
    })
    const page = ref(1)
    const selectedRegister = ref<{ name: string; value: string }>({ name: 'по 20', value: 'days' })
    const sortRegister = ref([
        { name: 'Статус', value: 'status' },
        { name: 'Друзья', value: 'friends' },
        { name: 'Тип аккаунта', value: 'account_type' },
        { name: 'Город', value: 'city' },
        { name: 'Дней с регистрации', value: 'days' }
    ])
    const selectedSort = ref<{ name: string; value: number }>({ name: 'по 20', value: 20 })
    const sortSort = ref([
        { name: 'по 10', value: 10 },
        { name: 'по 20', value: 20 },
        { name: 'по 30', value: 30 },
        { name: 'по 50', value: 50 },
    ])

    const getFacebookData = async () => {
        const data = {
            page: page.value,
            per_page: selectedSort.value.value,
            filterBy: filterBy.value,
            sort: selectedRegister.value.value,
        }
        try {
            const res = await axios.post('facebook/list', data)
            facebookData.value = res.data
        } catch (error) {
            console.log(error)
        }
    }

    const removeProfile = async (d: Datum) => {
        const data = {
            profile_id: d.id,
        }
        await axios.post('facebook/remove', data)
        await getFacebookData()
    }

    const toggleStatus = async (d: Datum, status: number) => {
        const data = {
            profile_id: d.id,
            status,
        }
        await axios.post('facebook/set-activity', data)
        d.status = status
    }

    const toggleHandMode = async (d: Datum) => {
        const data = {
            profile_id: d.id,
            hand_mode: !d.hand_mode,
        }
        const res = await axios.post('facebook/set-hand-mode', data)
        d.hand_mode = res.data.hand_mode
    }

    const downloadFile = async (id: number | number[]) => {
        let fileName = 'profiles-fb.xlsx'
        const route = useRoute()
        const data = {
            section: route.params.section,
            url: route.params.table,
        }

        if (id) {
            if (id instanceof Array) {
                id.join()
                fileName = 'profiles-selected.xlsx'
            } else {
                fileName = 'profiles-' + id + '.xlsx'
            }
        }

        const res = await axios.post('facebook/download', data, {
            responseType: 'blob',
        })
        var fileURL = window.URL.createObjectURL(new Blob([res.data]))
        var fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', fileName)
        document.body.appendChild(fileLink)
        fileLink.click()
    }

    return {
        facebookData,
        getFacebookData,
        removeProfile,
        toggleStatus,
        toggleHandMode,
        page,
        filterBy,
        selectedRegister,
        sortRegister,
        selectedSort,
        sortSort,
        // downloadFile,
    }
})
