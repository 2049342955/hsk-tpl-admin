<style lang="scss" rel="stylesheet/scss" >

    $not-found__color: $base__color--primary;
    $not-found__transition: $base__transition;

    .not-found {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: stretch;
        color: $not-found__color;
        &__text-wrapper {
            width: 20%;
            text-align: center;
            .text-wrapper__text {
                @include m_layout-core;
                height: 70%;
                font-size: 20px;
            }
            .text-wrapper__btn-box {
                height: 30%;
                &__inner {
                    display: inline-block;
                    a {
                        display: block;
                        padding: 10px 70px;
                        background-color: #fff;
                        border: 1px solid $not-found__color;
                        border-radius: 100px;
                        transition: $not-found__transition;
                        color: $not-found__color;
                        &:first-of-type {
                            margin-bottom: 30px;
                        }
                        &:hover, &:active, &:focus {
                            background-color: $not-found__color;
                            color: #fff;
                            outline: none;
                        }
                    }
                }
            }
        }
        &__img-wrapper {
            flex-grow: 1;
            flex-shrink: 1;
            background: url(404.png) center center / cover no-repeat;
        }
    }
</style>
<template>
    <div class="not-found">
        <div class="not-found__text-wrapper">
            <div class="text-wrapper__text">正<br/>在<br/>修<br/>复<br/>,<br/>马<br/>上<br/>回<br/>来</div>
            <div class="text-wrapper__btn-box">
                <div class="text-wrapper__btn-box__inner">
                    <a @click="goIndex">跳转主页</a>
                    <a @click="back">返回上页</a>
                </div>

            </div>
        </div>
        <div class="not-found__img-wrapper">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'NotFound',
        components: {},
        methods: {
            goIndex(){
                this.$router.push({path: '/'});
            },
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>
