import {LangUtl, CacheUtl } from 'com@'
const MENU_SHRINK = "_-_MENU_SHRINK_-_";
const MENU_SHRINK_TRUE = "yes";
const MENU_SHRINK_FALSE = "no";

const loadShrinkFromCache = () => {
    let shrink = false;
    if (CacheUtl.exists(MENU_SHRINK)) {
        shrink = CacheUtl.get(MENU_SHRINK) === MENU_SHRINK_TRUE;
    }
    return shrink;
};

export default {
    state: {
        menuList: [],
        shrink: loadShrinkFromCache(),
    },
    mutations: {
        setMenuList (state, {menuList}) {
            state.menuList.splice(0, state.menuList.length);
            menuList.forEach((menu)=>state.menuList.push(menu));
        },
        setShrink (state, shrink){
            state.shrink = shrink;
            CacheUtl.set(MENU_SHRINK, shrink ? MENU_SHRINK_TRUE : MENU_SHRINK_FALSE);
        }
    },
    actions: {
        loadMenuFromService ({commit}) {
            /**
             *
             * 菜单结构:
             * 对于叶子节点(没有子节点)的目录,选项(*号代表必须有):
             *  text      显示文本        *
             *  router    对应的路由      *
             *  icon      显示图标
             * 对于父节点,选项有:
             *  text      显示文本        *
             *  child     子节点列表      *
             *  icon      显示图标(一级目录必须有)
             */
            LangUtl.delay(()=> {
                let menuList = [];
                let indexMenu = {
                    text: '首页概览',
                    icon: 'home',
                    router: '/'
                };
                menuList.push(indexMenu);
                commit('setMenuList', {menuList});
            }, 300);
        }
    }
};
