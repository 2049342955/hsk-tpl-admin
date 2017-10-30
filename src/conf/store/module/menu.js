import { CacheUtl } from 'com@'
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
        setMenuList (state, menuList) {
            state.menuList.splice(0, state.menuList.length);
            menuList.forEach((menu)=>state.menuList.push(menu));
        },
        setShrink (state, shrink){
            state.shrink = shrink;
            CacheUtl.set(MENU_SHRINK, shrink ? MENU_SHRINK_TRUE : MENU_SHRINK_FALSE);
        }
    },
    actions: {
    }
};
