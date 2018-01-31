import Vue from 'vue'
import { ToastPlugin, LoadingPlugin } from 'vux'

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

export const Loading = {
    methods: {
        showLoading(text = '加载中') {
            this.$vux.loading.show({
                text
            })
        },
        hideLoading() {
            this.$vux.loading.hide()
        }
    }
}

export const Toast = {
    methods: {
        showToast(config) {
            if (typeof (config) === 'string') {
                this.$vux.toast.text(config, 'bottom')
            } else {
                const { text = 'Loading', type = 'text', time = '2000', position = 'bottom', width = 'auto', isShowMask = false } = config
                this.$vux.toast.show({
                    text,
                    type,
                    time,
                    position,
                    width,
                    'is-show-mask': isShowMask
                })
            }
        },
        hideToast() {
            this.$vux.toast.hide()
        }
    }
}