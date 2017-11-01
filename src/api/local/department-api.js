import {CacheUtl} from 'com@';
import Shaco from '@hasaki-ui/hsk-shaco';
import Common from './common';

const DepartmentApi = {};

const departmentDB = CacheUtl.dbFactory().instances('department');

/**
 * 查询部门列表
 */
DepartmentApi.list = (queryObj) => {
    return Common.loadDepartmentList();
};

export default DepartmentApi;