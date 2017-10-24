<style lang="scss" rel="stylesheet/scss">
    $layout-login-bar__color: $base__text-color--darken !default;
    $layout-login-bar__background-color: #fff !default;
    $layout-login-bar__height: 50px !default;
    $layout-login-bar__font-size: $base__font-size--sm !default;
    $layout-login-bar__z-index: 100 !default;
    $layout-login-bar__padding-right: $menu__padding-left !default;
    $layout-login-bar__transition: all $base__transition-time !default;
    $layout-login-bar__logo__width: $menu__width !default;
    $layout-login-bar__logo__width--shrink: $menu__width--shrink !default;
    $layout-login-bar__logo__padding-left: $menu__padding-left !default;
    $layout-login-bar__logo__padding-left--shrink: $menu__padding-left--shrink !default;
    $layout-login-bar__title__color: $base__color--primary !default;

    .layout-login-bar {
        color: $layout-login-bar__color;
        background-color: $layout-login-bar__background-color;
        @include m_single-row-text($layout-login-bar__height);
        display: flex;
        font-size: $layout-login-bar__font-size;
        padding-right: $layout-login-bar__padding-right;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
        z-index: $layout-login-bar__z-index;
        &__logo {
            font-size: 20px;
            position: relative;
            width: $layout-login-bar__logo__width;
            padding-left: $layout-login-bar__logo__padding-left;
            transition: $layout-login-bar__transition;
            overflow: hidden;
            &.shrink {
                width: $layout-login-bar__logo__width--shrink;
                padding-left: $layout-login-bar__logo__padding-left--shrink;
            }
            > .img-box {
                width: 130px;
                height: 30px;
                overflow: hidden;
                display: inline-block;
                margin-top: 10px;
                img {
                    margin-left: -10px;
                    height: 40px;
                    margin-top: -10px;
                }
            }
            > .title {
                color: $layout-login-bar__title__color;
                font-size: 25px;
                letter-spacing: -1px;
                text-decoration: inherit;
                text-transform: uppercase;
                display: inline-block;
            }
            > .sub-title {
                background: none repeat scroll 0 0 rgba($layout-login-bar__title__color, 0.2);
                border-radius: 3px;
                font-size: 10px;
                margin-left: 0;
                padding: 2px 5px;
                position: relative;
                top: -3px;
            }
        }
        &__bar--left {
            flex-grow: 1;
        }
        &__head {
            width: 30px;
            height: 30px;
            border-radius: 15px;
            vertical-align: middle;
        }
        &__bar-span {
            display: inline;
            padding: 8px 12px;
            transition: background-color 1s;
            cursor: pointer;
            font-size: $layout-login-bar__font-size;
            i:before {
                font-size: $layout-login-bar__font-size;
            }
            &:hover {
                background-color: rgba($layout-login-bar__title__color, .08);
            }
            &.el-badge {
                display: inline;
            }
        }
    }
</style>
<template>
    <nav class="layout-login-bar">
        <div class="layout-login-bar__logo" :class="{shrink:shrink}">
            <!-- 文字作为图标 -->
            <!--<span class="title" v-if="!shrink">Candy UI</span>-->
            <!-- 图片作为图标 -->
            <div class="img-box" v-if="!shrink">
                <img src="./logo.png">
            </div>
            <jx-icon class="title" type="candy" v-if="shrink"></jx-icon>
            <span class="sub-title" v-if="!shrink">V1.0.0</span>
        </div>
        <div class="layout-login-bar__bar--left">
      <span class="layout-login-bar__bar-span" @click="toggle">
        <el-tooltip class="item" effect="dark" :content="shrink ? '展开目录':'收起目录'" placement="bottom">
          <jx-icon :type="shrink ? 'menu-unfold':'menu-shrink'"></jx-icon>
        </el-tooltip>
      </span>
            <span class="layout-login-bar__bar-span">
        <el-tooltip class="item" effect="dark" content="账户信息" placement="bottom">
          <jx-icon type="personal"></jx-icon>
        </el-tooltip>
      </span>
            <el-dropdown>
          <span class="layout-login-bar__bar-span">
            设计<jx-icon type="dropdown"></jx-icon>
          </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>element</el-dropdown-item>
                    <el-dropdown-item>element-Axure</el-dropdown-item>
                    <el-dropdown-item>element-Sketch</el-dropdown-item>
                    <el-dropdown-item>candy-Axure</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
          <span class="layout-login-bar__bar-span">
            文档<jx-icon type="dropdown"></jx-icon>
          </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>candyUI</el-dropdown-item>
                    <el-dropdown-item>taki</el-dropdown-item>
                    <el-dropdown-item>前端学习资源</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span class="layout-login-bar__bar-span">指南</span>
        </div>
        <div class="layout-login-bar__bar--right">
            <el-badge is-dot class="layout-login-bar__bar-span">
                <jx-icon type="msg"></jx-icon>
            </el-badge>
            <el-dropdown>
          <span class="layout-login-bar__bar-span">
            {{userName}}<jx-icon type="dropdown"></jx-icon>
          </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <jx-icon type="logout"></jx-icon>
                        注销
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <jx-icon type="logout"></jx-icon>
                        切换用户
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <img class="layout-login-bar__head" src="./dft_head.jpg" alt="" width="30px" height="30px">
        </div>
    </nav>
</template>

<script>
    import {JxIcon} from 'comp@';
    import {Tooltip, Dropdown, DropdownItem, DropdownMenu, Badge} from 'element-ui';
    import {MenuMx} from 'mixin@'
    export default {
        name: 'LoginBar',
        components: {
            JxIcon,
            [Tooltip.name]: Tooltip, [Dropdown.name]: Dropdown, [DropdownItem.name]: DropdownItem,
            [DropdownMenu.name]: DropdownMenu, [Badge.name]: Badge
        },
        mixins: [MenuMx],
        data: function () {
            return {
                userName: '熊大力'
            }
        },
        computed: {},
        methods: {
            toggle(){
                this.$store.commit("setShrink", !this.shrink);
            }
        }
    }
</script>
