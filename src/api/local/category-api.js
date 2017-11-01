import {CacheUtl} from 'com@';
import Shaco from '@hasaki-ui/hsk-shaco';
import Common from './common';
import _ from 'lodash';

const CategoryApi = {};

const categoryDB = CacheUtl.dbFactory().instances('category');
const departmentDB = CacheUtl.dbFactory().instances('department');
const storeDB = CacheUtl.dbFactory().instances('store');

CategoryApi.query = (query, pageIndex = 1, pageSize = 10) => {
    const categoryAllList = Common.loadCategoryList();

    let categoryList = categoryAllList;
    if(query && query.name)
        categoryList = categoryAllList.filter(category=>{
            return category.name.indexOf(query.name) !== -1;
        });

    const pageTotal = categoryList.length;


    categoryList = categoryList.slice((pageIndex - 1) * pageSize,pageIndex * pageSize) || [];

    return {
        list:categoryList,
        pageTotal
    };
};

CategoryApi.update = (category) => {
    const categoryList = categoryDB.get("list");
    const departmentList = departmentDB.get("list");
    const storeList = storeDB.get("list");

    categoryList.forEach(oldCategory => {
        if(oldCategory.id === category.id){
            oldCategory.name = category.name;
            oldCategory.storeId = category.storeId;
            oldCategory.storeName = _.find(storeList,{id:category.storeId}).name;
            oldCategory.departmentId = category.departmentId;
            oldCategory.departmentName = _.find(departmentList,{id:category.departmentId}).name;
            oldCategory.sortWeight = category.sortWeight;
            oldCategory.startDate = category.startDate;
            oldCategory.endDate = category.endDate;
            oldCategory.enable = category.enable;
            oldCategory.description = category.description;
        }
    });

    categoryDB.put("list", categoryList);

    return _.find(categoryList,{id:category.id}) || '';
};

CategoryApi.add = (category) => {
    const categoryList = categoryDB.get("list");
    const departmentList = departmentDB.get("list");
    const storeList = storeDB.get("list");

    const newCategory = {};
    newCategory.id = Shaco.uuid();
    newCategory.code = Shaco.uppercaseLetter(4);
    newCategory.name = category.name;
    newCategory.storeId = category.storeId;
    newCategory.storeName = _.find(storeList,{id:category.storeId}).name;
    newCategory.departmentId = category.departmentId;
    newCategory.departmentName = _.find(departmentList,{id:category.departmentId}).name;
    newCategory.sortWeight = category.sortWeight;
    newCategory.startDate = category.startDate;
    newCategory.endDate = category.endDate;
    newCategory.enable = category.enable;
    newCategory.description = category.description;

    categoryList.unshift(newCategory);

    categoryDB.put("list", categoryList);

    return newCategory;
};

CategoryApi.del = (categoryId) => {
    const categoryList = categoryDB.get("list");

    _.remove(categoryList,category => {
        return category.id === categoryId;
    });

    categoryDB.put("list", categoryList);

    return true;
};

export default CategoryApi;