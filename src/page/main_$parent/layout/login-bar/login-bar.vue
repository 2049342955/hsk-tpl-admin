<style lang="scss" rel="stylesheet/scss" module>
    $layout-login-bar__background-color: #fff !default;
    $layout-login-bar__height: 50px !default;
    $layout-login-bar__z-index: 100 !default;
    $layout-login-bar__transition: all $base__transition-time !default;

    .bar {
        @include m_single-row-text($layout-login-bar__height);
        color: $base__text-color--darken;
        background-color: $layout-login-bar__background-color;
        display: flex;
        font-size: $base__font-size--sm;
        padding-right: $menu__padding-left;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
        z-index: $layout-login-bar__z-index;
    }

    .logo {
        font-size: 20px;
        position: relative;
        width: $menu__width;
        padding-left: $menu__padding-left;
        transition: $layout-login-bar__transition;
        overflow: hidden;

        &.shrink {
            width: $menu__width--shrink;
            padding-left: $menu__padding-left--shrink;
        }
    }

    .logo-img {
        overflow: hidden;
        float: left;
        margin-top: 5px;
        img {
            height: 40px;
        }
    }

    .title {
        color: $base__color--primary;
        font-size: 25px;
        letter-spacing: -1px;
        text-decoration: inherit;
        text-transform: uppercase;
        display: inline-block;
    }

    .sub-title {
        background: none repeat scroll 0 0 rgba($base__color--primary, 0.2);
        border-radius: 3px;
        font-size: 10px;
        margin-left: 15px;
        padding: 2px 5px;
        position: relative;
        top: 6px;
    }

    .left {
        flex-grow: 1;
    }

    .right {
    }

    .head-img {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        vertical-align: middle;
    }

    .bar-item {
        display: inline;
        padding: 8px 12px;
        transition: background-color 1s;
        cursor: pointer;
        font-size: $base__font-size--sm;
        i:before {
            font-size: $base__font-size--sm;
        }
        &:hover {
            background-color: rgba($base__color--primary, .08);
        }
        &[class*='el-badge'] {
            display: inline;
        }
    }
</style>
<template>
    <nav :class="$style.bar">
        <div :class="[$style.logo,{shrink:shrink}]">
            <!-- 文字作为图标 -->
            <!--<span class="title" v-if="!shrink">Candy UI</span>-->
            <!-- 图片作为图标 -->
            <div :class="$style['logo-img']" v-if="!shrink">
                <img src="./logo.png">
            </div>
            <!-- TODO 小logo图片所有缩放的时候的图标 -->
            <jx-icon :class="$style.title" type="candy" v-if="shrink"></jx-icon>
            <span :class="$style['sub-title']" v-if="!shrink">V1.0.0</span>
        </div>
        <div :class="$style.left">
            <div :class="$style['bar-item']" @click="toggle">
                <el-tooltip effect="dark" :content="shrink ? '展开目录':'收起目录'" placement="bottom">
                    <jx-icon :type="shrink ? 'menu-unfold':'menu-shrink'"></jx-icon>
                </el-tooltip>
            </div>
            <div :class="$style['bar-item']">
                <el-tooltip class="item" effect="dark" content="账户信息" placement="bottom">
                    <jx-icon type="personal"></jx-icon>
                </el-tooltip>
            </div>
            <el-dropdown>
                <div :class="$style['bar-item']">
                    设计
                    <jx-icon type="dropdown"></jx-icon>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>element</el-dropdown-item>
                    <el-dropdown-item>element-Axure</el-dropdown-item>
                    <el-dropdown-item>element-Sketch</el-dropdown-item>
                    <el-dropdown-item>candy-Axure</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
                <div :class="$style['bar-item']">
                    文档
                    <jx-icon type="dropdown"></jx-icon>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>candyUI</el-dropdown-item>
                    <el-dropdown-item>taki</el-dropdown-item>
                    <el-dropdown-item>前端学习资源</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div :class="$style['bar-item']">指南</div>
        </div>
        <div :class="$style.right">
            <el-badge is-dot :class="$style['bar-item']">
                <jx-icon type="msg"></jx-icon>
            </el-badge>
            <el-dropdown>
                <div :class="$style['bar-item']">
                    {{userName}}
                    <jx-icon type="dropdown"></jx-icon>
                </div>
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
            <img :class="$style['head-img']" src="./dft_head.jpg" alt="" width="30px" height="30px">
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
