<script setup lang="ts">
import ButtonMain from '@/components/ui/ButtonMain.vue'
import InputText from '@/components/ui/InputText.vue'
import { useDark, useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({})

const isDark = useDark()

const { width } = useWindowSize()

const safety = ref({
    password: '',
    confirmPassword: '',
})

// savePassword() {
//       if (!this.$refs.formPassword.validate()) {
//         return
//       }

//       this.formPasswordLoading = true

//       this.axios.post('profile/set-password', { password: this.user.password, password_confirmation: this.user.passwordConfirmation }).then(() => {
//         this.formPasswordLoading = false
//         this.$toast.success(this.$ml.get('userProfileEdit_saved'))
//       }).catch(() => {
//         this.formPasswordLoading = false
//       })
</script>

<template>
    <form class="profile__form">
        <h3 class="profile__form-title">Безопасность</h3>
        <div class="profile__form-inner" v-if="width > 743">
            <div class="profile__form-item">
                <span class="profile__form-text">{{ t('userProfileEdit_pass') }}</span>
                <span class="profile__form-text">{{ t('userProfileEdit_passConfirm') }}</span>
            </div>
            <div class="profile__form-info">
                <fieldset class="profile__form-fieldset">
                    <InputText
                        v-model:input="safety.password"
                        type="text"
                        placeholder="sfaslfklaskf34234re"
                        src="/icons/password.svg"
                        pic="/icons/eye.svg"
                        alt="Пароль"
                        v-if="!isDark"
                    />
                    <InputText
                        v-model:input="safety.password"
                        type="text"
                        placeholder="sfaslfklaskf34234re"
                        src="/icons/password-dark.svg"
                        pic="/icons/eye-dark.svg"
                        alt="Пароль"
                        v-else
                    />
                    <InputText
                        v-model:input="safety.confirmPassword"
                        type="password"
                        placeholder="•••••••••••••••••••••"
                        src="/icons/password.svg"
                        pic="/icons/eye-off.svg"
                        alt="Пароль"
                        v-if="!isDark"
                    />
                    <InputText
                        v-model:input="safety.confirmPassword"
                        type="password"
                        placeholder="•••••••••••••••••••••"
                        src="/icons/password-dark.svg"
                        pic="/icons/eye-off-dark.svg"
                        alt="Пароль"
                        v-else
                    />
                </fieldset>
                <ButtonMain :text="t('userProfileEdit_save')" />
            </div>
        </div>
        <div class="profile__form-info" v-else>
            <fieldset class="profile__form-fieldset">
                <div class="profile__form-label">
                    <span class="profile__form-text">Пароль</span>
                    <InputText
                        v-model:input="safety.password"
                        type="text"
                        placeholder="sfaslfklaskf34234re"
                        src="/icons/password.svg"
                        pic="/icons/eye.svg"
                        alt="Пароль"
                        v-if="!isDark"
                    />
                    <InputText
                        v-model:input="safety.password"
                        type="text"
                        placeholder="sfaslfklaskf34234re"
                        src="/icons/password-dark.svg"
                        pic="/icons/eye-dark.svg"
                        alt="Пароль"
                        v-else
                    />
                </div>
                <div class="profile__form-label">
                    <span class="profile__form-text">Подтверждение пароля</span>
                    <InputText
                        v-model:input="safety.confirmPassword"
                        type="password"
                        placeholder="•••••••••••••••••••••"
                        src="/icons/password.svg"
                        pic="/icons/eye-off.svg"
                        alt="Пароль"
                        v-if="!isDark"
                    />
                    <InputText
                        v-model:input="safety.confirmPassword"
                        type="password"
                        placeholder="•••••••••••••••••••••"
                        src="/icons/password-dark.svg"
                        pic="/icons/eye-off-dark.svg"
                        alt="Пароль"
                        v-else
                    />
                </div>
                <ButtonMain :text="t('userProfileEdit_save')" />
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
