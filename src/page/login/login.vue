<style lang="scss" rel="stylesheet/scss" module>
    .login {
        @include m_init-box;
        width: 100vw;
        height: 100vh;
    }

    .bg {
        background: $base__color--primary center center / cover no-repeat fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .cont {
        width: 100%;
        height: 100%;
        position: absolute;
        @include m_layout-middle;
        justify-content: center;
    }

    .form-box {
        width: 450px;
        height: 380px;
        max-width: 500px;
        position: relative;
        z-index: 10;
        overflow: hidden;
        background-color: rgba(255, 255, 255, .9);
        border-radius: 5px;
        box-shadow: $base__shadow--10dp;
    }

    .logo {
        height: 80px;
        line-height: 80px;
        font-size: 20px;
        position: relative;
        text-align: center;
        background: #1f4f82 fixed;
        > img {
            width: 180px;
            height: 45px;
        }
        > h1 {
            margin-top: 0;
            font-size: 30px;
            font-weight: 200;
            letter-spacing: -1px;
            text-decoration: inherit;
            text-transform: uppercase;
            color: #fff;
            display: inline-block;
        }
        > span {
            background: none repeat scroll 0 0 rgba(0, 0, 0, 0.2);
            border-radius: 3px;
            font-size: 11px;
            margin-left: 0;
            padding: 2px 5px;
            position: relative;
            top: -3px;
            color: #fff;
        }
    }

    .login-form {
        height: 300px;
        .row {
            @include m_layout-row;
            height: 82px;
            align-items: flex-end;
            padding-bottom: 10px;
            margin: 0 20px;
            border-bottom: 1px solid #8AADBE;
            font-size: 20px;
            color: #485D6D;
            &-icon {
                font-size: 30px;
            }
            input {
                display: inline-block;
                background-color: transparent;
                padding-bottom: 5px;
                border: none;
                flex-grow: 1;
                margin: 0 10px;
                color: #485D6D;
                text-align: center;
            }
            &-btn {
                border-bottom: none;
                button {
                    width: 100%;
                    background: #1f4f82;
                    padding: 16px;
                    margin: 0;
                    border: none;
                    text-align: center;
                    font-weight: bold;
                    color: #FFF;
                    transition: background .2s linear;
                    cursor: pointer;
                    -webkit-appearance: none;
                    -webkit-border-radius: 0;
                    outline: 0;
                    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.18);
                    &:hover {
                        background: #007cba;
                        outline: 1px solid #FFF;
                    }
                }
            }
        }
        .tip {
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: $base__color--error;
        }
    }


</style>
<template>
    <div :class="$style.login">
        <div :class="$style.bg" :style="bgStyle"></div>
        <div :class="$style.cont">
            <div :class="$style['form-box']">
                <div :class="$style.logo" :style="bgStyle">
                    <!-- 文字作为图标 -->
                    <h1>系统名</h1>
                    <!-- 图片作为图标 -->
                    <!--<img src="./logo.png">-->
                    <span>环境/版本</span>
                </div>
                <form :class="$style['login-form']">
                    <div :class="$style.row">
                        <jx-icon type="setting" :class="$style['row-icon']"></jx-icon>
                        <input type="text" placeholder="账户名" v-model="account" @change="showTip = false"
                               autocomplete="off"/>
                    </div>
                    <div :class="$style.row">
                        <jx-icon type="setting" :class="$style['row-icon']"></jx-icon>
                        <input type="password" placeholder="密码" v-model="psw" @change="showTip = false"
                               autocomplete="off"/>
                    </div>
                    <div :class="$style.tip">
                        <span v-if="showTip">{{errMsg}}</span>
                    </div>
                    <div :class="[$style.row,$style['row-btn']]">
                        <button type="button" @click="login">登录</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import config from 'config@';
    import {JxIcon} from 'comp@'

    export default {
        name: 'Login',
        data () {
            return {
                bgUrl: `${config.LOGIN_BG_URL}`,
                showTip: false,
                account: '',
                psw: '',
                oldErrorMsg: '账号的长度应为3-15位和,密码的长度应为6-15位',
                errMsg: '',
            };
        },
        computed: {
            bgStyle(){
                if (this.bgUrl) return {backgroundImage: `url(${this.bgUrl})`}
            }
        },
        methods: {
            login(){
                this.$message("正在登录");
            }
        },
        components: {
            JxIcon
        },
        created(){
            this.errMsg = this.oldErrorMsg;
        }
    }
</script>
