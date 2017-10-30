<style lang="scss" rel="stylesheet/scss" module>
    .lock {
        @include m_init-box;
        @include m_layout-core;
        width: 100vw;
        height: 100vh;
        position: relative;
        color: #fff;
    }

    .content {
        width: 1000px;
        height: 300px;
        margin-top: -50px;
        font-family: "Times New Roman", Times, serif;
    }

    .title {
        font-size: 80px;
        letter-spacing: 60px;
        text-align: center;
        margin-left: 40px;
    }

    .sub-title {
        font-size: 35px;
        letter-spacing: 4px;
        text-align: center;
        span:first-of-type {
            margin-right: 25px;
        }
    }

    .input-wrapper {
        text-align: center;
    }

    .input-inner {
        display: inline-block;
        position: relative;
        margin-top: 80px;
        input {
            background: transparent;
            border: 2px solid #fff;
            border-radius: 2px;
            padding: 10px 35px;
            width: 280px;
            color: #fff;
        }
    }

    .icon {
        position: absolute;
        top: 8px;
        font-size: 20px;
        font-weight: bold;
        &.left {
            left: 10px;
        }
        &.right {
            right: 10px;
        }
    }

    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        background: $base__color--primary center center / cover no-repeat fixed;
        filter: grayscale(75%);
        z-index: -1;
    }

</style>
<template>
    <div :class="$style.lock">
        <div :class="$style.bg" :style="bgStyle"></div>
        <div :class="$style.content">
            <p :class="$style.title">易速点</p>
            <p :class="$style['sub-title']"><span>BETTER</span><span>SERVICE</span></p>
            <div :class="$style['input-wrapper']">
                <div :class="$style['input-inner']">
                    <jx-icon type="lock" :class="[$style.icon,$style.left]"></jx-icon>
                    <input type="password" autocomplete="false" v-model="password" @change="checkPsw"
                           @keyup.enter="checkPsw"/>
                    <jx-icon type="right-arrow" :class="[$style.icon,$style.right]"></jx-icon>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {JxIcon} from 'comp@';
    import config from 'config@';
    export default {
        name: 'Lock',
        components: {
            JxIcon
        },
        data(){
            return {
                bgUrl: `${config.LOGIN_BG_URL}`,
                password:''
            };
        },
        computed: {
            bgStyle(){
                if (this.bgUrl) return {backgroundImage: `url(${this.bgUrl})`}
            }
        },
        methods: {
            checkPsw(){

            }
        },
        mounted () {
        }
    }
</script>
