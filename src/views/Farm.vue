<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import InputSwitch from 'primevue/inputswitch'
import Slider from 'primevue/slider'
import InputText from '@/components/ui/InputText.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Dropdown from 'primevue/dropdown'
import type { Fields } from '@/types/farm'
import axios from 'axios'
import { onBeforeMount, ref, reactive, watch } from 'vue'
import { startWatch, setFields } from '@/helpers'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({})

onBeforeMount(async () => {
    try {
        const res = await axios.post('setting/get', { code: 'general' })
        setFields(fields, res.data.fields)
    } catch (error) {
        console.log(error)
    }
    startWatch(fields, 'general')
})

const selectedCaptcha = ref<{ name: string }>({ name: 'Anti-Captcha.dll' })
const captchaItems = ref([
    { name: 'Anti-Captcha.dll' },
    { name: 'CapMonsterCloud' },
    { name: 'CapMonster2' },
    { name: 'RuCaptcha' },
])

const fields: Fields = reactive({
    accept_friends_count: [2, 20],
    accept_friends_on_farm: true,
    action_interval: [13, 31],
    ads_friends_count: 100,
    ads_invite_friends_day_start: 1,
    ads_refriend_friends: true,
    capmonster_api_key: 0,
    capthca_type: 'Anti-Captcha.dll',
    change_proxy_on_invalid: false,
    change_proxy_on_invalid_checkpoint: true,
    chat_bot: false,
    chat_bot_threads: 0,
    chat_bot_web: false,
    chat_bot_web_threads: 0,
    check_black_list_names: true,
    check_white_list_names: false,
    checkpoint_status: true,
    checkpoint_threads_count: 5,
    day_to_create_fan_page: 2,
    day_to_start_inviter: 3,
    emulate_mouse: false,
    fakes_count: [1, 3],
    fan_page: true,
    fan_page_fill_from_lifehacker: false,
    fan_page_lifehacker_postcount: 1,
    fan_page_names:
        '{Smile|Love|Eternity|Fantastic|Destiny|Freedom|Liberty|Tranquillity|Peace|Blossom|Sunshine|Sweetheart|Gorgeous|Cherish|Enthusiasm|Hope|Grace|Rainbow|Blue|Sunflower|Twinkle|Serendipity|Bliss|Lullaby|Sophisticated|Renaissance|Cute|Cosy|Butterfly|Galaxy|Hilarious|Moment|Extravaganza|Aqua|Sentiment|Cosmopolitan|Bubble|Pumpkin|Banana|Lollipop|Bumblebee|Giggle|Paradox|Delicacy|Peekaboo|Umbrella|Kangaroo} {Day||Planet|Morning|Home|Box|Z|A|B|C|D|E|F|G|H|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|ZZ|QQ|GQ|BB}',
    farm_status: true,
    farm_threads_count: 53,
    fb_authorization: false,
    fb_authorization_threads: 1,
    fb_feed_autoposting: true,
    fb_feed_autoposting_threads: 0,
    fb_friends_aproove_requests: false,
    fb_friends_aproove_requests_threads: 0,
    fb_worm_bm: false,
    fb_worm_bm_threads: 0,
    friends_aproove: false,
    friends_aproove_threads: 0,
    friends_count_to_donar: 51,
    groups_for_parsing_target_audience: '',
    invite_man: false,
    invite_woman: false,
    inviter: false,
    inviter_geo: 'geo',
    links_to_invite: '',
    login_to_sites: true,
    lts_count: 6,
    lts_sites: '',
    lts_start_day: 22,
    often_to_run: [15, 50],
    often_to_run_worm: [15, 50],
    post_from_sites: true,
    relink_to_desktop_ua: true,
    relink_to_desktop_ua_day_start: 3,
    remove_phone: false,
    spam_bot_enable: false,
    spam_bot_how_often_run: 15,
    spam_bot_treads: 3,
    turn_off_profile: true,
    turn_off_profile_after_days: 1,
    visit_sites_status: true,
    visited_sites_count: [4, 20],
    worm_status: true,
    worm_threads_count: 10,
})

watch(selectedCaptcha, async () => {
    fields.capthca_type = selectedCaptcha.value.name
})

// const del = ref<boolean>(false)
// const off = ref<boolean>(false)
// const slider = ref<number>(0)
// const text = ref<string>('')
// const message_interval = ref([1, 10])

// const fields = ref<Fields>()
</script>

<template>
    <AppLayout>
        <div class="farm">
            <h2 class="farm__title title">{{ t('farm_settings') }}</h2>
            <div>
                <div class="farm__inner">
                    <div class="farm__item">
                        <span class="farm__text">{{ t('del_phone') }}</span>
                        <InputSwitch v-model="fields.remove_phone" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('disable') }} {{ t('account') }}</span>
                        <InputSwitch v-model="fields.turn_off_profile" />
                    </div>
                    <div class="farm__item" v-if="fields.turn_off_profile === true">
                        <span class="farm__text">{{ t('dis_acc') }}</span>
                        <Slider v-model="fields.turn_off_profile_after_days" :min="0" :max="100" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('change_proxy_inv') }} (Worm)</span>
                        <InputSwitch v-model="fields.change_proxy_on_invalid" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('change_proxy_inv') }} (Checkpoint)</span>
                        <InputSwitch v-model="fields.change_proxy_on_invalid_checkpoint" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('appr_friends') }}</span>
                        <InputSwitch v-model="fields.accept_friends_on_farm" />
                    </div>
                    <div class="farm__item" v-if="fields.accept_friends_on_farm === true">
                        <span class="farm__text">{{ t('count_appr_friends') }}</span>
                        <Slider v-model="fields.accept_friends_count" :min="0" :max="100" :range="true" />
                    </div>
                </div>

                <div class="farm__inner">
                    <div class="farm__item">
                        <span class="farm__text">Worm</span>
                        <InputSwitch v-model="fields.worm_status" />
                    </div>
                    <div class="farm__item" v-if="fields.worm_status === true">
                        <span class="farm__text"> {{ t('streams') }} Warm</span>
                        <Slider v-model="fields.worm_threads_count" :min="0" :max="100" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text"> {{ t('checkpoint') }}</span>
                        <InputSwitch v-model="fields.checkpoint_status" />
                    </div>
                    <div class="farm__item" v-if="fields.checkpoint_status === true">
                        <span class="farm__text">{{ t('streams') }} {{ t('checkpoint') }}</span>
                        <Slider v-model="fields.checkpoint_threads_count" :min="0" :max="100" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text"> {{ t('chat_bot') }}</span>
                        <InputSwitch v-model="fields.chat_bot" />
                    </div>
                    <div class="farm__item" v-if="fields.chat_bot === true">
                        <span class="farm__text">{{ t('streams') }}</span>
                        <Slider v-model="fields.chat_bot_threads" :min="0" :max="100" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text"> {{ t('chat_bot_web') }}</span>
                        <InputSwitch v-model="fields.chat_bot_web" />
                    </div>
                    <div class="farm__item" v-if="fields.chat_bot_web === true">
                        <span class="farm__text">{{ t('streams') }}</span>
                        <Slider v-model="fields.chat_bot_web_threads" :min="0" :max="100" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('fb_authorization') }}</span>
                        <InputSwitch v-model="fields.fb_authorization" />
                    </div>
                    <div class="farm__item" v-if="fields.fb_authorization === true">
                        <span class="farm__text">{{ t('streams') }}</span>
                        <Slider v-model="fields.fb_authorization_threads" :min="0" :max="100" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text"> {{ t('friends_aproove') }}</span>
                        <InputSwitch v-model="fields.friends_aproove" />
                    </div>
                    <div class="farm__item" v-if="fields.friends_aproove === true">
                        <span class="farm__text">{{ t('streams') }}</span>
                        <Slider v-model="fields.friends_aproove_threads" :min="0" :max="100" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">FB Friends Aproove Requests</span>
                        <InputSwitch v-model="fields.fb_friends_aproove_requests" />
                    </div>
                    <div class="farm__item" v-if="fields.fb_friends_aproove_requests === true">
                        <span class="farm__text">FB Friends Aproove Requests {{ t('threads') }}</span>
                        <Slider v-model="fields.fb_friends_aproove_requests_threads" :min="0" :max="100" />
                    </div>

                    <div class="farm__item">
                        <span class="farm__text">FB Feed Autoposting</span>
                        <InputSwitch v-model="fields.fb_feed_autoposting" />
                    </div>

                    <div class="farm__item" v-if="fields.fb_feed_autoposting === true">
                        <span class="farm__text">FB Feed Autoposting потоки</span>
                        <Slider v-model="fields.fb_feed_autoposting_threads" :min="0" :max="100" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">FB Worm BM</span>
                        <InputSwitch v-model="fields.fb_worm_bm" />
                    </div>
                    <div class="farm__item" v-if="fields.fb_worm_bm === true">
                        <span class="farm__text">FB Worm BM {{ t('threads') }}</span>
                        <Slider v-model="fields.fb_worm_bm_threads" :min="0" :max="100" />
                    </div>
                </div>

                <div class="farm__inner">
                    <div class="farm__item">
                        <span class="farm__text">{{ t('interval_betw_act') }}</span>
                        <Slider v-model="fields.action_interval" :min="1" :max="48" :range="true" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('launch_accounts') }} checkpoint?</span>
                        <Slider v-model="fields.often_to_run" :min="1" :max="50" :range="true" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('launch_accounts') }} warm?</span>
                        <Slider v-model="fields.often_to_run_worm" :min="1" :max="50" :range="true" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('emulate_mouse') }}</span>
                        <InputSwitch v-model="fields.emulate_mouse" />
                    </div>
                </div>

                <div class="farm__inner">
                    <h3 class="farm__subtitle">Fan Page</h3>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('create') }} Fan Page</span>
                        <InputSwitch v-model="fields.fan_page" />
                    </div>
                    <div class="farm__item" v-if="fields.fan_page === true">
                        <span class="farm__text">{{ t('names') }} Fan Pages</span>
                        <Textarea v-model:input="fields.fan_page_names" />
                    </div>
                    <div class="farm__item" v-if="fields.fan_page === true">
                        <span class="farm__text">{{ t('create_date') }}</span>
                        <Slider v-model="fields.day_to_create_fan_page" :min="0" :max="20" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('fill_posts') }} LifeHacker</span>
                        <InputSwitch v-model="fields.fan_page_fill_from_lifehacker" />
                    </div>
                    <div class="farm__item" v-if="fields.fan_page_fill_from_lifehacker === true">
                        <span class="farm__text"> {{ t('posts_count') }}</span>
                        <Slider v-model="fields.day_to_create_fan_page" :min="0" :max="30" />
                    </div>

                    <div class="farm__item">
                        <div class="farm__dropdown">
                            <span class="farm__text-span">{{ t('how_solve_captcha') }}</span>
                            <Dropdown
                                v-model="selectedCaptcha"
                                icon="none"
                                :options="captchaItems"
                                optionLabel="name"
                                placeholder="Anti-Captcha.dll"
                                unstyled
                                :pt="{
                                    root: { class: 'captcha__root' },
                                    trigger: { class: 'captcha__trigger' },
                                    panel: { class: 'captcha__panel' },
                                    item: { class: 'captcha__item' },
                                    input: { class: 'captcha__input' },
                                }"
                            />
                        </div>
                    </div>
                    <data value=""> </data>

                    <div class="farm__item">
                        <span class="farm__text">Capmonster API Key</span>
                        <InputText v-model:input="fields.capmonster_api_key" type="text" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('sites_posts') + '(Google Trneds, Fishki, Pikabu)' }}</span>
                        <InputSwitch v-model="fields.post_from_sites" />
                    </div>
                </div>

                <div class="farm__inner">
                    <h3 class="farm__subtitle">{{ t('walking_cookies') }}</h3>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('browse_sites') }}</span>
                        <InputSwitch v-model="fields.visit_sites_status" />
                    </div>
                    <div class="farm__item" v-if="fields.visit_sites_status === true">
                        <span class="farm__text">{{ t('count_browse_sites') }}</span>
                        <Slider v-model="fields.visited_sites_count" :min="0" :max="48" :range="true" />
                    </div>
                </div>
                <div class="farm__inner">
                    <h3 class="farm__subtitle">{{ t('additionally') }}</h3>

                    <div class="farm__item">
                        <span class="farm__text">{{ t('rebind_desktop_ua') }}</span>
                        <InputSwitch v-model="fields.relink_to_desktop_ua" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('rebinding_day') }}</span>
                        <Slider v-model="fields.relink_to_desktop_ua_day_start" :min="0" :max="48" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('accs_to_friend') }}</span>
                        <Textarea v-model:input="fields.links_to_invite" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('renew_friends') }}</span>
                        <InputSwitch v-model="fields.ads_refriend_friends" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('friendship_day') }}</span>
                        <Slider v-model="fields.ads_invite_friends_day_start" :min="0" :max="30" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('friends_number') }}</span>
                        <Slider v-model="fields.ads_friends_count" :min="0" :max="2000" />
                    </div>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('fakes_number') }}</span>
                        <Slider v-model="fields.fakes_count" :min="0" :max="48" :range="true" />
                    </div>
                </div>

                <div class="farm__inner">
                    <h3 class="farm__subtitle">{{ t('login_to_sites') }}</h3>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('login_to_sites') }}</span>
                        <InputSwitch v-model="fields.login_to_sites" />
                    </div>
                    <div class="farm__item" v-if="fields.login_to_sites === true">
                        <span class="farm__text">{{ t('authorization_sites') }}</span>
                        <Textarea v-model:input="fields.lts_sites" />
                    </div>
                    <div class="farm__item" v-if="fields.login_to_sites === true">
                        <span class="farm__text">{{ t('start_day') }}</span>
                        <Slider v-model="fields.lts_start_day" :min="0" :max="30" />
                    </div>
                    <div class="farm__item" v-if="fields.login_to_sites === true">
                        <span class="farm__text">{{ t('logins_number') }}</span>
                        <Slider v-model="fields.lts_count" :min="0" :max="30" />
                    </div>
                </div>

                <div class="farm__inner">
                    <h3 class="farm__subtitle">{{ t('spam_bot') }}</h3>
                    <div class="farm__item">
                        <span class="farm__text">{{ t('enable_spam_bot') }}</span>
                        <InputSwitch v-model="fields.spam_bot_enable" />
                    </div>
                    <div class="farm__item" v-if="fields.spam_bot_enable === true">
                        <span class="farm__text">{{ t('threads_number') }}</span>
                        <Slider v-model="fields.spam_bot_treads" :min="1" :max="300" />
                    </div>
                    <div class="farm__item" v-if="fields.spam_bot_enable === true">
                        <span class="farm__text">{{ t('spam_bot_runs') }}</span>
                        <Slider v-model="fields.spam_bot_how_often_run" :min="1" :max="300" />
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss">
.farm {
    &__title {
        margin-bottom: 24px;

        @media only screen and (max-width: 743px) and (min-width: 320px) {
            margin-bottom: 20px;
        }
    }
    &__inner {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px 32px 36px;
        margin-bottom: 32px;
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
    &__subtitle {
        font-size: 17px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0.18px;
        color: #091c31;
        margin-bottom: 28px;
    }
    &__dropdown {
        position: relative;
        width: 100%;
    }

    &__text-span {
        position: absolute;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        line-height: 21px;
        top: 50%;
        transform: translateY(-50%);
        left: 16px;
        color: #091c31;

        @media only screen and (max-width: 1439px) and (min-width: 320px) {
            display: none;
        }
    }
}

.dark .farm {
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
    &__text-span {
        color: #fff;
    }
}
</style>
