import {DepartmentApi} from 'api@';

export default {
    /**
     * 加载烹饪部门列表
     * @returns {Promise.<void>}
     * @private
     */
    async _$loadDepartmentList(storeId) {
        try {
            if (storeId) {
                this.departmentList = await DepartmentApi.list({storeId});
                this.departmentEmptyText = '';
                return;
            }
            this.departmentEmptyText = "请先选择部门";
        } catch (error) {
            this._$handleError(error)
        }
    },
}