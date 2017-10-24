import {ObjUtl, CacheUtl} from 'com@'
const USER_INFO = "_-USER_INFO-_";

const loadUserInfoFromCache = () => {
    let userInfo = {};
    if (CacheUtl.exists(USER_INFO)) {
        userInfo = CacheUtl.get(USER_INFO);
    }
    return userInfo;
};

export default {
    state: {
        userInfo: loadUserInfoFromCache()
    },
    mutations: {
        setUserInfo (state, userInfo) {
            for (let key of Object.keys(userInfo)) {
                state.userInfo[key] = userInfo[key];
            }
            CacheUtl.set(USER_INFO, state.userInfo);
        },
        rmUserInfo (state){
            ObjUtl.protoClearObject(state.userInfo);
            CacheUtl.del(USER_INFO);
        }
    },
    actions: {}
};
