<script setup lang="ts">
import InputSwitch from 'primevue/inputswitch'
import RadioButton from 'primevue/radiobutton'
import { useRegisterStore } from '@/stores/register'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({})

const registerStore = useRegisterStore()
</script>

<template>
    <div class="register">
        <div class="register__inner">
            <h3 class="register__subtitle">{{ t('gender_selection') }}</h3>
            <div class="register__wrapper">
                <div class="register__item register__item_reverse">
                    <InputSwitch v-model="registerStore.fields.gender_choose" />
                    <span class="register__text">{{ t('gender_selection') }}</span>
                </div>
                <div class="register__item" v-if="registerStore.fields.gender_choose === true">
                    <div class="register__radio">
                        <RadioButton
                            v-model="registerStore.fields.gender_type"
                            inputId="male"
                            name="sex"
                            value="male"
                        />
                        <label class="register__text" for="male">{{ t('male') }}</label>
                    </div>
                    <div class="register__radio">
                        <RadioButton
                            v-model="registerStore.fields.gender_type"
                            inputId="female"
                            name="sex"
                            value="female"
                        />
                        <label class="register__text" for="female">{{ t('female') }}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.register {
    &__inner {
        padding: 24px 32px 36px;
        border-radius: 24px;
        background-color: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);
    }

    &__subtitle {
        font-size: 17px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0.18px;
        color: #091c31;
        margin-bottom: 28px;
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
        gap: 24px;

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            gap: 20px;
        }
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 20px;

        @media only screen and (max-width: 429px) and (min-width: 320px) {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
        }

        &_reverse {
            @media only screen and (max-width: 429px) and (min-width: 320px) {
                flex-direction: column-reverse;
            }
        }
    }

    &__text {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        color: #091c31;
    }

    &__radio {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}

.dark .register {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__subtitle {
        color: #fff;
    }

    &__text {
        color: #fff;
    }
}
</style>
