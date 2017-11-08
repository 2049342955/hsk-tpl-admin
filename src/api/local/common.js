import {CacheUtl,ObjUtl} from 'com@';
import Shaco from '@hasaki-ui/hsk-shaco';
import Moment from 'moment';
import _ from 'lodash';

const Common = {};

const categoryDB = CacheUtl.dbFactory().instances('category');
const departmentDB = CacheUtl.dbFactory().instances('department');
const storeDB = CacheUtl.dbFactory().instances('store');

Common.loadDepartmentList = () => {
    const departmentList = departmentDB.get("list");
    if(!_.isEmpty(departmentList)) return departmentList;

    const size = Shaco.number(20, 40);
    const list = Shaco.list(size, () => {
        return {
            id: Shaco.uuid(),
            name: Shaco.text(3, 10) + "部门"
        }
    });
    departmentDB.put("list", list);
    return list;
};

Common.loadStoreList = () => {
    const storeList = storeDB.get("list");
    if(!_.isEmpty(storeList)) return storeList;

    const size = Shaco.number(20,40);
    const list = Shaco.list(size,()=>{
        return {
            id:Shaco.uuid(),
            name:Shaco.text(3,10)+"店"
        }
    });
    storeDB.put("list", list);
    return list;
};

Common.loadCategoryList = () => {
    const categoryList = categoryDB.get("list");
    if(!_.isEmpty(categoryList)) return categoryList;

    const list = [];
    const size = Shaco.number(200, 300);

    const nameList = (() => {
        const list = [];
        for (let i = 0; i < 100; i++) {
            list.push(Shaco.text(15, 20) + "分类");
        }
        return list;
    })();

    const departmentList = Common.loadDepartmentList();
    const storeList = Common.loadStoreList();

    for (let i = 0; i < size; i++) {
        let category = {};
        category.id = Shaco.uuid();
        category.code = Shaco.uppercaseLetter(4);
        category.name = Shaco.item(nameList);
        const store = Shaco.item(storeList);
        category.storeId = store.id;
        category.storeName = store.name;
        const department = Shaco.item(departmentList);
        category.departmentId = department.id;
        category.departmentName = department.name;
        category.sortWeight = Shaco.number(1, 100);
        category.startDate = Shaco.date(new Date(2016, 1, 11), new Date(2016, 11, 11));
        category.endDate = Moment(category.startDate).add(6, 'M');
        category.enable = Shaco.boolean();
        category.description = Shaco.text(80, 230);
        category = ObjUtl.stringifyDateInObject(category, ['startDate', 'endDate'], 'YYYY-MM-DD');
        list.push(category);
    }

    categoryDB.put("list", list);
    return list;
};



export default Common;