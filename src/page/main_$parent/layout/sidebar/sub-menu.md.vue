<template>
    <el-submenu :index="menu.text">
        <template slot="title">
            <jx-icon :type="menu.icon ? menu.icon : 'menu'"></jx-icon>
            <span :class="menuTextClassName">{{menu.text}}</span>
        </template>
        <template v-for="subMenu in menu.child">
            <LayoutSubMenu :menu="subMenu" v-if="subMenu.child"></LayoutSubMenu>
            <el-menu-item :index="subMenu.router" v-else>
                <jx-icon :type="subMenu.icon ? subMenu.icon : 'menu'"></jx-icon>
                <span :class="menuTextClassName">{{subMenu.text}}</span>
            </el-menu-item>
        </template>
    </el-submenu>
</template>
<script>
    import {Menu, MenuItem, Submenu} from 'element-ui'
    import {JxIcon} from 'comp@'
    export default {
        name: 'LayoutSubMenu',
        components: {JxIcon, [Menu.name]: Menu, [MenuItem.name]: MenuItem, [Submenu.name]: Submenu},
        props: {
            menu: {
                type: Object,
                required: true
            },
            menuTextClassName:String
        }
    };
</script>


