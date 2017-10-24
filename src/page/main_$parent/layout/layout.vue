<style lang="scss" rel="stylesheet/scss" scoped>
    .layout {
        width: 100vw;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        &__cont {
            flex-grow: 1;
            display: flex;
            .page-wrap {
                width: calc(100% - 260px);
                display: flex;
                flex-grow: 1;
                flex-direction: column;
                position: relative;
            }
            .page-enter-active, .page-leave-active {
                transition: all 1s;
            }
            .page-enter, .page-leave-active {
                opacity: 0;
                transform: translateY(30px);
            }
        }
    }
</style>

<template>
    <div class="layout">
        <LoginBar></LoginBar>
        <div class="layout__cont">
            <SideBar></SideBar>
            <div class="page-wrap">
                <keep-alive>
                    <transition
                        mode="out-in"
                        name="page">
                        <router-view></router-view>
                    </transition>
                </keep-alive>
                <LFooter></LFooter>
            </div>
        </div>
    </div>
</template>
<script>
    import Footer from './footer'
    import LoginBar from './login-bar'
    import SideBar from './sidebar'
    export default {
        name: 'Layout',
        components: {
            LFooter: Footer, LoginBar, SideBar
        }
    }
</script>
