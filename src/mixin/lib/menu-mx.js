/**
 * Created by joyer on 17/10/24.
 * 目录
 */

import {mapState as MapState} from 'vuex';
const getMenuListByPath = (path, menuList) => {
    for (let menu of menuList) {
        if (menu.child) {
            let menuList = getMenuListByPath(path, menu.child);
            if (menuList && menuList.length > 0) {
                menuList.push(menu);
                return menuList;
            }
        }
        if (menu.router === path) return [menu];
    }
};
export default {
    computed: {
        ...MapState({
            shrink: state => state.menu.shrink,
            menuList: state => state.menu.menuList
        })
    },
    methods: {
        /**
         * 得到当前目录
         */
        $_currentMenu() {
            let menuList = this.$_currentMenuList();
            if (menuList && menuList.length > 0) {
                return menuList[menuList.length];
            }
        },
        /**
         * 得到当前目录列表,这个列表中前一个目录是后一个目录的父目录,最后一个目录是当前目录
         */
        $_currentMenuList(){
            let currentPath = this.$route.path;
            return getMenuListByPath(currentPath, this.menuList);
        }
    }
};
