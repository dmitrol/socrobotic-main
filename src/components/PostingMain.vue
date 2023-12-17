<script setup lang="ts">
import Textarea from '@/components/ui/Textarea.vue'
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import { usePostingStore } from '@/stores/posting'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({})

const postingStore = usePostingStore()
</script>

<template>
    <div class="posting__inner">
        <div class="posting__item posting__item_reverse">
            <InputSwitch v-model="postingStore.fields.posting" />
            <span class="posting__text">{{ t('posting') }}</span>
        </div>
        <div class="posting__item" v-if="postingStore.fields.posting === true">
            <span class="posting__text">{{ t('friends_number_to_start') }}</span>
            <Slider v-model="postingStore.fields.frends_for_posting_start" :min="100" :max="1000" />
        </div>
        <div class="posting__item" v-if="postingStore.fields.posting === true">
            <span class="posting__text">{{ t('wall_posts_text') }}</span>
            <Textarea v-model:input="postingStore.fields.text_to_posting" />
        </div>
        <div class="posting__item posting__item_reverse">
            <InputSwitch v-model="postingStore.fields.post_link_and_text_to_profile" />
            <span class="posting__text">{{ t('post_link_text') }}</span>
        </div>
        <div class="posting__item" v-if="postingStore.fields.post_link_and_text_to_profile === true">
            <span class="posting__text">{{ t('biography_text') }}</span>
            <Textarea v-model:input="postingStore.fields.text_to_bio" />
        </div>
        <div class="posting__item">
            <span class="posting__text">{{ t('start_day') }}</span>
            <Slider v-model="postingStore.fields.reposting_day_start" :min="0" :max="30" />
        </div>
        <div class="posting__item">
            <span class="posting__text">{{ t('links_groups_publics') }}</span>
            <Textarea v-model:input="postingStore.fields.links_to_repost" />
        </div>
        <div class="posting__item">
            <span class="posting__text">{{ t('rss_posts') }}</span>
            <Textarea v-model:input="postingStore.fields.rss_links" />
        </div>
        <div class="posting__item">
            <span class="posting__text">{{ t('rss_with_comments') }}</span>
            <Textarea v-model:input="postingStore.fields.rss_with_comments" />
        </div>
        <div class="posting__item posting__item_reverse">
            <InputSwitch v-model="postingStore.fields.posting_like" />
            <span class="posting__text">{{ t('like_posts') }}</span>
        </div>
        <div class="posting__item posting__item_reverse">
            <InputSwitch v-model="postingStore.fields.posting_share" />
            <span class="posting__text">{{ t('share_posts') }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.posting {
    &__inner {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px 32px 36px;
        border-radius: 24px;
        background-color: #fff;
        box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.05);

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
}

.dark .posting {
    &__inner {
        background-color: #091c31;
        box-shadow: none;
    }

    &__text {
        color: #fff;
    }
}
</style>
