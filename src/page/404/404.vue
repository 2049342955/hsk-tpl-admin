<style lang="scss" rel="stylesheet/scss" module>
    .not-found {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: stretch;
        color: $base__color--primary;
    }

    .left {
        width: 20%;
        text-align: center;
    }

    .text {
        @include m_layout-core;
        height: 70%;
        font-size: 20px;
    }

    .href-list {
        height: 30%;
        &-inner {
            display: inline-block;
            a {
                display: block;
                padding: 10px 70px;
                background-color: #fff;
                border: 1px solid $base__color--primary;
                border-radius: 100px;
                transition: $base__transition;
                color: $base__color--primary;
                &:first-of-type {
                    margin-bottom: 30px;
                }
                &:hover, &:active, &:focus {
                    background-color: $base__color--primary;
                    color: #fff;
                    outline: none;
                }
            }
        }
    }

    .right {
        flex-grow: 1;
        flex-shrink: 1;
        background: url(./404.png) center center / cover no-repeat;
    }
</style>
<template>
    <div :class="$style['not-found']">
        <div :class="$style.left">
            <div :class="$style.text">正<br/>在<br/>修<br/>复<br/>,<br/>马<br/>上<br/>回<br/>来</div>
            <div :class="$style['href-list']">
                <div :class="$style['href-list-inner']">
                    <a @click="goIndex">跳转主页</a>
                    <a @click="back">返回上页</a>
                </div>
            </div>
        </div>
        <div :class="$style.right">
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
