<style lang="scss" rel="stylesheet/scss">

    $lock__background-color: $base__color--primary;

    .lock {
        @include m_init-box;
        @include m_layout-core;
        width: 100vw;
        height: 100vh;
        position: relative;
        color: #fff;
        &__bg {
            width: 100%;
            height: 100%;
            position: absolute;
            background: $lock__background-color center center / cover no-repeat fixed;
            filter: grayscale(75%);
            z-index: -1;
        }
        &__wrapper {
            width: 500px;
            height: 300px;
            margin-top: -50px;
            font-family: "Times New Roman", Times, serif;
            &__title {
                font-size: 80px;
                letter-spacing: 60px;
                text-align: center;
                margin-left: 40px;
            }
            &__sub-title {
                font-size: 35px;
                letter-spacing: 4px;
                text-align: center;
                span:first-of-type {
                    margin-right: 25px;
                }
            }
            &__input-box {
                text-align: center;
                .inner {
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
                    &__icon {
                        position: absolute;
                        top: 8px;
                        font-size: 20px;
                        font-weight: bold;
                        &--left {
                            left: 10px;
                        }
                        &--right {
                            right: 10px;
                        }
                    }
                }
            }

        }
    }
</style>
<template>
    <div class="lock">
        <div class="lock__bg" :style="bgStyle"></div>
        <div class="lock__wrapper">
            <p class="lock__wrapper__title">HAND</p>
            <p class="lock__wrapper__sub-title"><span>BETTER</span><span>SERVICE</span></p>
            <div class="lock__wrapper__input-box">
                <div class="inner">
                    <jx-icon type="lock" class="inner__icon inner__icon--left"></jx-icon>
                    <input type="password" autocomplete="false" v-model="password" @change="checkPsw"
                           @keyup.enter="checkPsw"/>
                    <jx-icon type="right-arrow" class="inner__icon inner__icon--right"></jx-icon>
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
            CdIcon
        },
        data(){
            return {
                bgUrl: `${config.LOGIN_BG_URL}`,
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
