/**
 * Created by joyer on 17/10/24.
 *
 * 路由钩子配置
 *
 */

module.exports = {
    beforeLoad () {
    },
    afterLoad () {
    },
    loadRouter (router) {
        router.path = router.path.replace(/main/g, '');
    }
};