const MenuApi = {};

MenuApi.getMenuList = () => {

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
    return  [{
        text:     '首页概览',
        icon:     'home',
        router:   '/'
    },{
        text:     '学生列表',
        icon:     'menu',
        router:   '/student'
    }];
};

export default MenuApi;