import {CacheUtl} from 'com@';
import Shaco from '@hasaki-ui/hsk-shaco';
import Common from './common';

const StoreApi = {};

const storeDB = CacheUtl.dbFactory().instances('store');

/**
 * 查询当前用户的门店列表
 */
StoreApi.list = (queryObj) => {
    return Common.loadStoreList();
};

export default StoreApi;