<style lang="scss" rel="stylesheet/scss" module>
    // 侧边栏配置
    $layout-sidebar__z-index: 50 !default;

    // 目录配置
    $layout-sidebar__menu__background-color: #F0F1F3 !default;
    $layout-sidebar__menu__background-color--active: #E9ECEE !default;
    $layout-sidebar__menu__border: none !default;

    // 跟目录配置
    $layout-sidebar__root-menu__color: #fff !default;
    $layout-sidebar__root-menu__color--is-opened: #F5F7F8 !default;

    @mixin active-class {
        background-color: $layout-sidebar__menu__background-color--active;
        border-left-color: $base__color--primary;
        &:after {
            border-bottom: 6px solid $base__color--primary;
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

    @mixin shrink-active-class {
        border-right-color: $base__color--primary;
        background-color: transparent;
        &:after {
            left: auto;
            right: -5px;
            transform: rotate(270deg);
        }
    }

    .sidebar {
        box-shadow: 0 0 3px 2px rgba(0, 0, 0, .16);
        z-index: $layout-sidebar__z-index;
    }

    .placeholder {
        height: 40px;
    }

    .menu {
        transition: $base__transition-time;
        width: $menu__width;
        background-color: $layout-sidebar__root-menu__color;

        // 重置目录样式
        [class*='el-menu-item'],[class*='el-submenu__title'] {
            color: $base__text-color;
            border-left: 3px solid transparent;
            transition: $base__transition-time;
            padding-right: 0;
            &:hover {
                @include active-class;
            }
            &:focus {
                outline: none;
            }
        }
        [class*='el-submenu'][class*='is-opened'] > [class*='el-submenu__title'] {
            color: $base__text-color--darken;
            i {
                color: $base__color--primary;
            }
        }
        [class*='el-menu-item'][class*='is-active'] {
            color: $base__text-color--darken;
            i {
                color: $base__color--primary;
            }
        }

        // 设置第一层目录样式
        > [class*='el-submenu'] > [class*='el-submenu__title'],
        > [class*='el-menu-item'] {
            padding-left: $menu__padding-left !important;
            background-color: $layout-sidebar__root-menu__color;
            border-top: $layout-sidebar__menu__border;
            &:hover {
                background-color: $layout-sidebar__menu__background-color--active;
            }
        }
        > [class*='el-submenu']:last-of-type,
        > [class*='el-menu-item']:last-of-type {
            border-bottom: $layout-sidebar__menu__border;
        }
        > [class*='el-submenu'][class*='is-opened'] > [class*='el-submenu__title'] {
            background-color: $layout-sidebar__root-menu__color--is-opened;
        }
        [class*='el-submenu'] [class*='el-menu'] {
            background-color: $layout-sidebar__menu__background-color;
        }

        &.shrink {
            width: $menu__width--shrink;

            // 重置目录样式
            [class*='el-menu-item'],
            [class*='el-submenu__title'] {
                padding-left: $menu__padding-left--shrink !important;
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
            [class*='el-submenu'][class*='is-opened'] > [class*='el-submenu__title'] {
                i {
                    color: $base__text-color;
                }
            }
            [class*='el-menu-item'][class*='is-active'] {
                @include shrink-active-class;
                i {
                    color: $base__color--primary;
                }
            }
            [class*='el-menu'] {
                background-color: rgba(141, 153, 165, .08);
            }

            // 设置第一层目录样式
            > [class*='el-submenu'][class*='is-opened'] > [class*='el-submenu__title'] {
                background-color: transparent;
            }
            // 隐藏所有的文字和子目录开关图标
            [class*='el-submenu__icon-arrow'] {
                display: none;
            }

            .menu-text {
                position: absolute;
                top: 0;
                left: -200px;
                background-color: $base__color--primary;
                color: #fff;
                transition: left .3s cubic-bezier(0.175, 0.885, 0.320, 1.15);
                padding-left: 10px;
                padding-right: 10px;
            }
        }
    }

    .menu-text {
    }
</style>
<template>
    <div :class="$style.sidebar">
        <div :class="$style.placeholder"></div>
        <el-menu :default-active="currentPath" :router="true" :class="[$style.menu,{[$style.shrink]:shrink}]"
                 :unique-opened="true" ref="menu">
            <template v-for="menu in menuList">
                <My-Sub-Menu :menu="menu" v-if="menu.child" :menu-text-class-name="$style['menu-text']"
                             type="menu"></My-Sub-Menu>
                <el-menu-item :index="menu.router" v-else>
                    <jx-icon :type="menu.icon ? menu.icon : 'menu'"></jx-icon>
                    <span :class="$style['menu-text']">{{menu.text}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {LangUtl} from 'com@'
    import {Menu, MenuItem, Submenu} from 'element-ui';
    import {JxIcon} from 'comp@';
    import MySubMenu from './sub-menu.md.vue';
    import {mapState as MapState} from 'vuex';
    import {MenuMx} from 'mixin@'
    import {MenuApi} from 'api@';
    export default {
        name: 'SideBar',
        components: {
            MySubMenu, JxIcon,
            [Menu.name]: Menu, [MenuItem.name]: MenuItem, [Submenu.name]: Submenu
        },
        mixins: [MenuMx],
        data: function () {
            return {
                currentPath: ''
            }
        },
        methods: {},
        async created () {
            try {
                const menuList = await MenuApi.getMenuList();
                this.$store.commit('setMenuList', menuList);
            } catch (err) {
                this._$handleError(err);
            }
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
