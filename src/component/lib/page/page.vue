<style lang="scss" rel="stylesheet/scss">
    $layout-page__color: $base__text-color !default;
    $layout-page__padding: 30px !default;
    $layout-page__z-index: 40 !default;
    $layout-page__border-bottom: 1px solid $base__border-color !default;
    $layout-page__title__font-size: $base__font-size--lg !default;
    $layout-page__title__color: $base__text-color--darken !default;
    $layout-page__loading__color: $base__color--primary !default;

    .layout-page {
        color: $layout-page__color;
        @include m_layout-colum;
        flex-grow: 1;
        position: relative;
        &__loading {
            @include m_layout-core;
            flex-direction: column;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: $layout-page__z-index;
            color: $layout-page__loading__color;
            background-color: #fff;
            p {
                margin-top: 20px;
                font-size: 30px;
                letter-spacing: 10px;
            }
            .bottom {
                position: absolute;
                width: 100%;
                bottom: 20px;
            }
        }
        &__top {
            border-bottom: $layout-page__border-bottom;
            padding-left: $layout-page__padding;
            padding-right: $layout-page__padding;
            @include m_layout-row;
            .title {
                @include m_layout-middle;
                height: 50px;
                font-size: $layout-page__title__font-size;
                @include m_text-ellipsis;
                color: $layout-page__title__color;
                margin-right: 70px;
                i {
                    margin-right: 10px;
                }
            }
            .info {
                @include m_layout-middle;
                align-items: center;
                flex-grow: 1;
                i {
                    color: $layout-page__loading__color;
                    margin-right: 10px;
                }
            }
            .btns {
                @include m_layout-middle;
                height: 50px;
            }
        }
        &__cont {
            padding: $layout-page__padding/2 $layout-page__padding;
            flex-grow: 1;
            background-color: #F7F7F7;
            > .breadcrumb-wrap {
                margin-bottom: 20px;
            }
        }
    }
</style>
<template>
    <div class="layout-page">
        <div class="layout-page__loading" v-show="loading">
            <img src="./loading.png">
            <p>页面正在生成...</p>
            <img class="bottom" src="./loading-bottom.png">
        </div>
        <div class="layout-page__top">
            <div class="title">
                <Icon v-if="icon" :type="icon"></Icon>
                {{ title }}
            </div>
            <div class="info">
                <Icon v-if="icon" type="speaker"></Icon>
                {{info}}
            </div>
            <div class="btns">
                <slot name="btnList">
                </slot>
            </div>
        </div>
        <div class="layout-page__cont" :class="contClass">
            <div class="breadcrumb-wrap" v-if="breadcrumb">
                <slot name="breadcrumb">
                    <el-breadcrumb separator=" > ">
                        <el-breadcrumb-item v-for="menu in currentMenuList"
                                            :key="menu.router ? menu.router : menu.text">
                            {{menu.text}}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </slot>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import Icon from '../jx-icon';
    import {Breadcrumb, BreadcrumbItem} from 'element-ui';
    import {MenuMx} from 'mixin@';
    import {ArrayUtl} from 'com@';
    import {mapState} from 'vuex';

    export default {
        name: 'Page',
        componentName: 'Page',
        components: {Icon, [Breadcrumb.name]: Breadcrumb, [BreadcrumbItem.name]: BreadcrumbItem},
        mixins: [MenuMx],
        props: {
            info: String,
            title: {
                type: String,
                default: '标题'
            },
            icon: String,
            breadcrumb: {
                type: Boolean,
                default: true
            },
            contClass: {
                type: String,
                default: 'page-cont'
            },
            autoClosePageLoading: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                currentMenuList: []
            }
        },
        watch: {
            menuList(){
                this.initBreadcrumb();
            }
        },
        computed: {
            ...mapState({
                loading: state => state.pageLoading
            })
        },
        methods: {
            initBreadcrumb(){
                let menuList = this.$_currentMenuList();
                this.currentMenuList.length = 0;
                if (menuList) {
                    ArrayUtl.protoCombine(this.currentMenuList, menuList.reverse());
                }
            }
        },
        created(){
            this.initBreadcrumb();
            if (this.autoClosePageLoading) this.$store.commit("setPageLoading", false);
        },
        activated(){
            if (this.autoClosePageLoading) this.$store.commit("setPageLoading", false);
        },
        mounted(){
        }
    };
</script>


