<script setup lang="ts">
import FacebookAccounts from '@/components/FacebookAccounts.vue'
import FacebookAdd from '@/components/FacebookAdd.vue'
import FacebookFilter from '@/components/FacebookFilter.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import ButtonIcon from '@/components/ui/ButtonIcon.vue'
import { useFacebookStore } from '@/stores/facebook'
import { useDark, useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown'
import Paginator from 'primevue/paginator'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({})

const facebookStore = useFacebookStore()
const { facebookData, selectedRegister, sortRegister, selectedSort, sortSort, page } = storeToRefs(facebookStore)

const isDark = useDark()

const { width } = useWindowSize()

// const selectedSort = ref<string>('')
// const sortSort = ref([{ name: 'по 10' }, { name: 'по 25' }])

onMounted(facebookStore.getFacebookData)

function changePage(e: any) {
    page.value = e?.page + 1
    facebookStore.getFacebookData()
}

watch(
    () => facebookStore.sortOrder,
    async () => {
        await facebookStore.getFacebookDataBySort()
    },
)
</script>

<template>
    <AppLayout>
        <div class="facebook">
            <h2 class="facebook__title title">{{ t('accounts') }} ({{ facebookStore.facebookData?.total }})</h2>
            <div class="facebook__nav" v-if="width > 429">
                <div class="facebook__nav-left">
                    <div class="facebook__nav-register">
                        <div class="facebook__nav-register_item">
                            <Dropdown
                                v-model="selectedRegister"
                                icon="none"
                                :options="sortRegister"
                                optionLabel="name"
                                placeholder="день регистрации"
                                unstyled
                                :pt="{
                                    root: { class: 'reg__root' },
                                    trigger: { class: 'reg__trigger' },
                                    panel: { class: 'reg__panel' },
                                    item: { class: 'reg__item' },
                                    input: { class: 'reg__input' },
                                }"
                                @change="facebookStore.getFacebookDataBySort"
                            />
                            <span class="facebook__nav-span">Сортировать по:</span>
                        </div>
                        <ButtonIcon
                            border="1px solid #BFC5CD"
                            :backgroundColor="facebookStore.sortOrder === 'asc' ? '#0067D5' : 'transparent'"
                            src="/icons/arrow-up.svg"
                            alt="Вверх"
                            v-if="!isDark"
                            @click="facebookStore.sortOrder = 'asc'"
                        />
                        <ButtonIcon
                            border="1px solid #3C5A7B"
                            :backgroundColor="facebookStore.sortOrder === 'asc' ? '#0067D5' : 'transparent'"
                            src="/icons/arrow-up-dark.svg"
                            alt="Вверх"
                            v-else
                            @click="facebookStore.sortOrder = 'asc'"
                        />
                        <ButtonIcon
                            border="1px solid #BFC5CD"
                            :backgroundColor="facebookStore.sortOrder === 'desc' ? '#0067D5' : 'transparent'"
                            src="/icons/arrow-down-sort.svg"
                            alt="Вниз"
                            v-if="!isDark"
                            @click="facebookStore.sortOrder = 'desc'"
                        />
                        <ButtonIcon
                            border="1px solid #3C5A7B"
                            :backgroundColor="facebookStore.sortOrder === 'desc' ? '#0067D5' : 'transparent'"
                            src="/icons/arrow-down-sort-dark.svg"
                            alt="Вниз"
                            v-else
                            @click="facebookStore.sortOrder = 'desc'"
                        />
                    </div>
                    <div class="facebook__nav-register_sort">
                        <Dropdown
                            v-model="selectedSort"
                            icon="none"
                            :options="sortSort"
                            optionLabel="name"
                            unstyled
                            :pt="{
                                root: { class: 'sort__root' },
                                trigger: { class: 'sort__trigger' },
                                panel: { class: 'sort__panel' },
                                item: { class: 'sort__item' },
                                input: { class: 'sort__input' },
                            }"
                            @change="facebookStore.getFacebookData"
                        />
                        <span class="facebook__nav-span">На странице:</span>
                    </div>
                </div>
                <div class="facebook__nav-right">
                    <ButtonIcon
                        src="/icons/play.svg"
                        alt="Начать"
                        border="none"
                        backgroundColor="#0067D5"
                        @click="facebookStore.setActivityAll(1)"
                    />
                    <ButtonIcon
                        src="/icons/stop.svg"
                        alt="Остановить"
                        border="none"
                        backgroundColor="#0067D5"
                        @click="facebookStore.setActivityAll(0)"
                    />
                    <ButtonIcon src="/icons/download.svg" alt="Скачать" border="none" backgroundColor="#0067D5" />
                    <ButtonIcon src="/icons/upload.svg" alt="Загрузить" border="none" backgroundColor="#0067D5" />
                </div>
            </div>
            <div class="facebook__adaptive" v-if="width < 430">
                <div class="facebook__nav-left">
                    <div class="facebook__adaptive-register">
                        <div class="facebook__nav-register_item">
                            <Dropdown
                                v-model="selectedRegister"
                                icon="none"
                                :options="sortRegister"
                                optionLabel="name"
                                placeholder="день регистрации"
                                unstyled
                                :pt="{
                                    root: { class: 'register__root' },
                                    trigger: { class: 'register__trigger' },
                                    panel: { class: 'register__panel' },
                                    item: { class: 'register__item' },
                                    input: { class: 'register__input' },
                                }"
                            />
                            <span class="facebook__nav-span">Сортировать по:</span>
                        </div>
                        <ButtonIcon
                            border="1px solid #BFC5CD"
                            backgroundColor="transparent"
                            src="/icons/arrow-up.svg"
                            alt="Вверх"
                            v-if="!isDark"
                        />
                        <ButtonIcon
                            border="1px solid #3C5A7B"
                            backgroundColor="transparent"
                            src="/icons/arrow-up-dark.svg"
                            alt="Вверх"
                            v-else
                        />
                        <ButtonIcon
                            border="1px solid #BFC5CD"
                            backgroundColor="transparent"
                            src="/icons/arrow-down-sort.svg"
                            alt="Вниз"
                            v-if="!isDark"
                        />
                        <ButtonIcon
                            border="1px solid #3C5A7B"
                            backgroundColor="transparent"
                            src="/icons/arrow-down-sort-dark.svg"
                            alt="Вниз"
                            v-else
                        />
                    </div>
                </div>
                <div class="facebook__nav-right">
                    <div class="facebook__nav-register_sort">
                        <Dropdown
                            v-model="selectedSort"
                            icon="none"
                            :options="sortSort"
                            optionLabel="name"
                            unstyled
                            :pt="{
                                root: { class: 'sort__root' },
                                trigger: { class: 'sort__trigger' },
                                panel: { class: 'sort__panel' },
                                item: { class: 'sort__item' },
                                input: { class: 'sort__input' },
                            }"
                        />
                        <span class="facebook__nav-span">На странице:</span>
                    </div>
                    <ButtonIcon src="/icons/play.svg" alt="Начать" border="none" backgroundColor="#0067D5" />
                    <ButtonIcon src="/icons/stop.svg" alt="Остановить" border="none" backgroundColor="#0067D5" />
                    <ButtonIcon src="/icons/download.svg" alt="Скачать" border="none" backgroundColor="#0067D5" />
                    <ButtonIcon src="/icons/upload.svg" alt="Загрузить" border="none" backgroundColor="#0067D5" />
                </div>
            </div>
            <div class="facebook__wrapper">
                <FacebookFilter />
                <FacebookAdd />
                <FacebookAccounts v-if="facebookData?.data" :data="facebookData?.data" />
                <div class="facebook__paginator">
                    <Paginator
                        :rows="selectedSort?.value"
                        :totalRecords="facebookData?.total"
                        @page="changePage"
                        :pt="{
                            root: { class: 'paginator__root' },
                        }"
                    ></Paginator>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
.facebook {
    &__title {
        margin-bottom: 16px;
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        gap: 24px;

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            gap: 20px;
        }
    }

    &__nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;

        @media only screen and (max-width: 743px) and (min-width: 430px) {
            margin-bottom: 20px;
            flex-direction: column;
            gap: 20px;
        }
    }

    &__nav-left {
        display: flex;
        align-items: center;
        gap: 24px;

        @media only screen and (max-width: 743px) and (min-width: 430px) {
            gap: 8px;
        }

        @media only screen and (max-width: 429px) and (min-width: 320px) {
            display: block;
        }
    }

    &__nav-register {
        display: flex;
        align-items: center;
        gap: 8px;

        &_item {
            position: relative;
        }

        &_sort {
            position: relative;
        }

        @media only screen and (max-width: 429px) and (min-width: 320px) {
            justify-content: space-between;
            gap: 0;
        }
    }

    &__nav-span {
        position: absolute;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        top: 50%;
        transform: translateY(-50%);
        left: 16px;
        color: #091c31;

        @media only screen and (max-width: 1023px) and (min-width: 320px) {
            display: none;
        }
    }

    &__nav-right {
        display: flex;
        align-items: center;
        gap: 9px;

        @media only screen and (max-width: 429px) and (min-width: 320px) {
            gap: 0;
            justify-content: space-between;
        }
    }

    &__adaptive {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 20px;
    }

    &__adaptive-register {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

.dark .facebook {
    &__nav-span {
        color: #eee;
    }
}
</style>
