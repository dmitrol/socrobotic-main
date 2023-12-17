<script setup lang="ts">
import Textarea from '@/components/ui/Textarea.vue'
import InputSwitch from 'primevue/inputswitch'
import { useRegisterStore } from '@/stores/register'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({})
const registerStore = useRegisterStore()

// const bridesBay = ref<boolean>(false)
// const fillInfo = ref<boolean>(false)
// const fillIp = ref<boolean>(false)
// const education = ref<string>('')
// const job = ref<string>('')
</script>

<template>
	<div class="register">
		<div class="register__inner">
			<h3 class="register__subtitle">{{ t('filling') }}</h3>
			<div class="register__wrapper">
				<div class="register__item register__item_reverse">
					<InputSwitch v-model="registerStore.fields.brides_bay_photo" />
					<span class="register__text">{{ t('photo_from') }}</span>
				</div>
				<div class="register__item register__item_reverse">
					<InputSwitch v-model="registerStore.fields.fill_info" />
					<span class="register__text">{{ t('filling_inf') }}</span>
				</div>
				<div class="register__item register__item_reverse" v-if="registerStore.fields.fill_info === true">
					<InputSwitch v-model="registerStore.fields.fill_by_current_ip" />
					<span class="register__text">{{ t('fill_based_ip') }}</span>
				</div>
				<div class="register__item">
					<span class="register__text">{{ t('education') }}</span>
					<Textarea v-model:input="registerStore.fields.text_to_education" />
				</div>
				<div class="register__item">
					<span class="register__text">{{ t('work') }}</span>
					<Textarea v-model:input="registerStore.fields.text_to_work" />
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
		color: #091C31;
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
		font-family: "Inter", sans-serif;
		font-weight: 500;
		line-height: 21px;
		color: #091C31;
	}
}

.dark .register {
	&__inner {
		background-color: #091C31;
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
