<script setup lang="ts">
import ButtonMain from '@/components/ui/ButtonMain.vue'
import InputText from '@/components/ui/InputText.vue'
import { useDark, useWindowSize } from '@vueuse/core'
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({})
// import { onMounted } from '@vue'

const isDark = useDark()

const { width } = useWindowSize()

const dataLogin = ref({
    login: '',
    email: '',
})

const buttonLoading = ref(true)

// this.formLoading = true

function save() {
    buttonLoading.value = true
    axios
        .post('profile/set', { name: dataLogin.value.login, email: dataLogin.value.email })
        .then((response) => {
            dataLogin.value.login = response.data.name
            dataLogin.value.email = response.data.email

            // this.formLoading = false
            // this.$toast.success(this.$ml.get('userProfileEdit_saved'))
            // this.$store.dispatch('setUserName', this.user.name)
        })
        .catch(() => {})
        .finally(() => {
            buttonLoading.value = false
        })
}

onBeforeMount(async () => {
    await axios.post('profile/get').then((response) => {
        dataLogin.value.login = response.data.name
        dataLogin.value.email = response.data.email
    })
})
</script>

<template>
    <form class="profile__form">
        <h3 class="profile__form-title">Данные для входа</h3>
        <div class="profile__form-inner" v-if="width > 743">
            <div class="profile__form-item">
                <span class="profile__form-text">{{ t('userProfileEdit_name') }}</span>
                <span class="profile__form-text">E-mail</span>
            </div>
            <div class="profile__form-info">
                <fieldset class="profile__form-fieldset">
                    <InputText
                        v-model:input="dataLogin.login"
                        type="text"
                        placeholder="alexeyafonin"
                        src="/icons/user.svg"
                        alt="Логин"
                        v-if="!isDark"
                    />
                    <InputText
                        v-model:input="dataLogin.login"
                        type="text"
                        placeholder="alexeyafonin"
                        src="/icons/user-dark.svg"
                        alt="Логин"
                        v-else
                    />
                    <InputText
                        v-model:input="dataLogin.email"
                        type="text"
                        placeholder="afonin.design@gmail.com"
                        src="/icons/email.svg"
                        alt="Email"
                        v-if="!isDark"
                    />
                    <InputText
                        v-model:input="dataLogin.email"
                        type="text"
                        placeholder="afonin.design@gmail.com"
                        src="/icons/email-dark.svg"
                        alt="Email"
                        v-else
                    />
                </fieldset>
                <ButtonMain
                    :text="t('userProfileEdit_save')"
                    label="Search"
                    icon="pi pi-search"
                    :loading="'buttonLoading'"
                    :pt="{
                        root: { class: 'button-loading__root' },
                    }"
                    @click.prevent="save"
                />
            </div>
        </div>
        <div class="profile__form-info" v-else>
            <fieldset class="profile__form-fieldset">
                <div class="profile__form-label">
                    <span class="profile__form-text">Логин</span>
                    <InputText
                        v-model:input="dataLogin.login"
                        type="text"
                        placeholder="alexeyafonin"
                        src="/icons/user.svg"
                        alt="Логин"
                        v-if="!isDark"
                    />
                    <InputText
                        v-model:input="dataLogin.login"
                        type="text"
                        placeholder="alexeyafonin"
                        src="/icons/user-dark.svg"
                        alt="Логин"
                        v-else
                    />
                </div>
                <div class="profile__form-label">
                    <span class="profile__form-text">E-mail</span>
                    <InputText
                        v-model:input="dataLogin.email"
                        type="text"
                        placeholder="afonin.design@gmail.com"
                        src="/icons/email.svg"
                        alt="Email"
                        v-if="!isDark"
                    />
                    <InputText
                        v-model:input="dataLogin.email"
                        type="text"
                        placeholder="afonin.design@gmail.com"
                        src="/icons/email-dark.svg"
                        alt="Email"
                        v-else
                    />
                </div>
                <ButtonMain
                    :text="t('userProfileEdit_save')"
                    label="Search"
                    icon="pi pi-search"
                    :loading="'buttonLoading'"
                    :pt="{
                        root: { class: 'button-loading__root' },
                    }"
                    @click.prevent="save"
                />
            </fieldset>
        </div>
    </form>
</template>

<style lang="scss" scoped>
.profile {
    &__form {
        padding: 24px 32px 36px;
        border-radius: 24px;
        background-color: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);

        @media only screen and (max-width: 743px) and (min-width: 430px) {
            padding: 24px 32px 32px;
        }

        @media only screen and (max-width: 429px) and (min-width: 320px) {
            padding: 24px 24px 32px;
        }
    }

    &__form-inner {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    &__form-item {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &__form-title {
        font-size: 17px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0.18px;
        color: #091c31;
        margin-bottom: 28px;
    }

    &__form-info {
        max-width: 718px;
        width: 100%;

        @media only screen and (max-width: 1279px) and (min-width: 744px) {
            max-width: 542px;
        }
    }

    &__form-fieldset {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 20px;

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            margin-bottom: 0;
        }
    }

    &__form-text {
        height: 44px;
        display: flex;
        align-items: center;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        color: #091c31;

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            height: auto;
        }
    }

    &__form-label {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
}

.dark {
    & .profile {
        &__form {
            background-color: #091c31;
            box-shadow: none;
        }

        &__form-title {
            color: #fff;
        }

        &__form-text {
            color: #fff;
        }
    }
}
</style>
