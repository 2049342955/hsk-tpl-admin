<style lang="scss" rel="stylesheet/scss">
    // 侧边栏配置
    $layout-sidebar__z-index: 50 !default;
    $layout-sidebar__color--primary: $base__color--primary !default;
    $layout-sidebar__transition: all $base__transition-time !default;

    // 目录配置
    $layout-sidebar__menu__color: $base__text-color !default;
    $layout-sidebar__menu__color--active: $base__text-color--darken !default;
    $layout-sidebar__menu__background-color: #F0F1F3 !default;
    $layout-sidebar__menu__background-color--active: #E9ECEE !default;
    $layout-sidebar__menu__border: none !default;
    $layout-sidebar__menu__width: $menu__width !default;
    $layout-sidebar__menu__width--shrink: $menu__width--shrink !default;
    $layout-sidebar__menu__padding-left: $menu__padding-left !default;
    $layout-sidebar__menu__padding-left--shrink: $menu__padding-left--shrink !default;

    // 跟目录配置
    $layout-sidebar__root-menu__color: #fff !default;
    $layout-sidebar__root-menu__color--is-opened: #F5F7F8 !default;
    // 字体颜色
    .layout-sidebar {
        box-shadow: 0 0 3px 2px rgba(0, 0, 0, .16);
        z-index: $layout-sidebar__z-index;
        &__placeholder {
            height: 40px;
        }
        .layout-sidebar__menu {
            @mixin active-class {
                background-color: $layout-sidebar__menu__background-color--active;
                border-left-color: $layout-sidebar__color--primary;
                &:after {
                    border-bottom: 6px solid $layout-sidebar__color--primary;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    width: 0;
                    height: 0;
                    position: absolute;
                    top: calc(50% - 4px);
                    left: -5px;
                    content: "";
                    display: block;
                    transform: rotate(90deg);
                }
            }
            transition: $layout-sidebar__transition;
            width: $layout-sidebar__menu__width;
            background-color: $layout-sidebar__root-menu__color;
            // 重置目录样式
            .el-menu-item, .el-submenu__title {
                color: $layout-sidebar__menu__color;
                border-left: 3px solid transparent;
                transition: $layout-sidebar__transition;
                padding-right: 0;
                &:hover {
                    @include active-class;
                }
            }
            .el-submenu.is-opened > .el-submenu__title {
                color: $layout-sidebar__menu__color--active;
                i {
                    color: $layout-sidebar__color--primary;
                }
            }
            .el-menu-item.is-active {
                //        @include active-class;
                color: $layout-sidebar__menu__color--active;
                i {
                    color: $layout-sidebar__color--primary;
                }
            }

            // 设置第一层目录样式
            > .el-submenu > .el-submenu__title, > .el-menu-item {
                padding-left: $layout-sidebar__menu__padding-left !important;
                background-color: $layout-sidebar__root-menu__color;
                border-top: $layout-sidebar__menu__border;
                &:hover {
                    background-color: $layout-sidebar__menu__background-color--active;
                }
            }
            > .el-submenu:last-of-type, > .el-menu-item:last-of-type {
                border-bottom: $layout-sidebar__menu__border;
            }
            > .el-submenu.is-opened > .el-submenu__title {
                background-color: $layout-sidebar__root-menu__color--is-opened;
            }

            // 设置非第一级目录样式
            .el-submenu .el-menu {
                background-color: $layout-sidebar__menu__background-color;
            }
        }
        .layout-sidebar__menu.shrink {
            @mixin shrink-active-class {
                border-right-color: $layout-sidebar__color--primary;
                background-color: transparent;
                &:after {
                    left: auto;
                    right: -5px;
                    transform: rotate(270deg);
                }
            }
            width: $layout-sidebar__menu__width--shrink;
            // 重置目录样式
            .el-menu-item, .el-submenu__title {
                padding-left: $layout-sidebar__menu__padding-left--shrink !important;
                border-left: none;
                border-right: 3px solid transparent;
                position: relative;
                &:hover {
                    @include shrink-active-class;
                    .menu-text {
                        left: 50px;
                    }
                }
            }
            .el-submenu.is-opened > .el-submenu__title {
                i {
                    color: $layout-sidebar__menu__color;
                }
            }
            .el-menu-item.is-active {
                @include shrink-active-class;
                i {
                    color: $layout-sidebar__color--primary;
                }
            }
            .el-menu {
                background-color: rgba(141, 153, 165, .08);
            }
            // 设置第一层目录样式
            > .el-submenu.is-opened > .el-submenu__title {
                background-color: transparent;
            }
            // 隐藏所有的文字和子目录开关图标
            .el-submenu__icon-arrow {
                display: none;
            }
            .menu-text {
                position: absolute;
                top: 0;
                left: -200px;
                background-color: $layout-sidebar__color--primary;
                color: #fff;
                transition: left .3s cubic-bezier(0.175, 0.885, 0.320, 1.15);
                padding-left: 10px;
                padding-right: 10px;
            }
        }
    }
</style>
<template>
    <div class="layout-sidebar">
        <div class="layout-sidebar__placeholder"></div>
        <el-menu :default-active="currentPath" :router="true" class="layout-sidebar__menu" :unique-opened="true"
                 :class="{shrink:shrink}" ref="menu">
            <template v-for="menu in menuList">
                <Layout-Sub-Menu :menu="menu" v-if="menu.child" type="menu"></Layout-Sub-Menu>
                <el-menu-item :index="menu.router" v-else>
                    <jx-icon :type="menu.icon ? menu.icon : 'menu'"></jx-icon>
                    <span class="menu-text">{{menu.text}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {Menu, MenuItem, Submenu} from 'element-ui';
    import {JxIcon} from 'comp@';
    import LayoutSubMenu from './sub-menu.md.vue';
    import {mapState as MapState} from 'vuex';
    import {MenuMx} from 'mixin@'
    export default {
        name: 'SideBar',
        components: {
            LayoutSubMenu, JxIcon,
            [Menu.name]: Menu, [MenuItem.name]: MenuItem, [Submenu.name]: Submenu
        },
        mixins: [MenuMx],
        data: function () {
            return {
                currentPath: ''
            }
        },
        methods: {},
        created () {
            this.$store.dispatch("loadMenuFromService");
        },
        watch: {
            menuList(val){
                this.$nextTick(()=> {
                    this.currentPath = this.$route.path;
                    let $menu = this.$refs.menu;
                    $menu.initOpenedMenu();
                });
            }
        },
        mounted(){
        }
    }
</script>
