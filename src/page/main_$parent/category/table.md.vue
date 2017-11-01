<style lang="scss" rel="stylesheet/scss" module>
    .footer {
        margin-top: 10px;
        display: flex;
    }

    .btns {
        flex-grow: 1;
    }
</style>
<template>
    <div>
        <el-table
                @selection-change="handleSelectionChange"
                :data="dataList">
            <el-table-column
                    type="selection"
                    fixed
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="code"
                    label="编码"
                    :show-overflow-tooltip="true"
                    width="150">
            </el-table-column>
            <tm-table-column
                    prop="name"
                    label="名称"
                    :show-overflow-tooltip="true"
                    min-width="150">
            </tm-table-column>
            <tm-table-column
                    prop="storeName"
                    label="所属门店"
                    :show-overflow-tooltip="true"
                    width="200">
                <template slot="edit" slot-scope="scope">
                    <span v-if="storeList.length === 0">加载中...</span>
                    <el-select v-else
                               v-model="scope.row.storeId"
                               filterable
                               @change="handleSelectStoreChange(scope.row)"
                               placeholder="请选择">
                        <el-option
                                v-for="store in storeList"
                                :key="store.id"
                                :value="store.id"
                                :label="store.name"></el-option>
                    </el-select>
                </template>
            </tm-table-column>
            <tm-table-column
                    prop="departmentName"
                    label="默认烹饪部门"
                    :show-overflow-tooltip="true"
                    width="200">
                <template slot="edit" slot-scope="scope">
                    <span v-if="departmentEmptyText">{{departmentEmptyText}}</span>
                    <el-select v-else
                               v-model="scope.row.departmentId"
                               filterable
                               placeholder="请选择">
                        <el-option
                                v-for="department in departmentList"
                                :key="department.id"
                                :value="department.id"
                                :label="department.name"></el-option>
                    </el-select>
                </template>
            </tm-table-column>
            <tm-table-column
                    prop="sortWeight"
                    label="排序权重"
                    align="center"
                    width="150">
                <template slot="edit" slot-scope="scope">
                    <el-input-number v-model="scope.row.sortWeight" size="small"></el-input-number>
                </template>
            </tm-table-column>
            <tm-table-column
                    prop="startDate"
                    label="生效时间"
                    type="date"
                    width="220">
            </tm-table-column>
            <tm-table-column
                    prop="endDate"
                    label="失效时间"
                    type="date"
                    width="220">
            </tm-table-column>
            <tm-table-column
                    prop="enable"
                    label="是否启用"
                    width="130">
                <template slot-scope="scope">
                    <el-tag type="primary" :disable-transitions="true" v-if="scope.row.enable">启用</el-tag>
                    <el-tag type="warning" :disable-transitions="true" v-else>失效</el-tag>
                </template>
                <template slot="edit" slot-scope="scope">
                    <el-radio v-model="scope.row.enable" label="Y">男</el-radio>
                    <el-radio v-model="scope.row.enable" label="N">女</el-radio>
                </template>
            </tm-table-column>
            <el-table-column
                    label="操作"
                    fixed="right"
                    align="center"
                    width="220">
                <template slot-scope="scope">
                    <jx-button type="text" size="mini"
                               @click.native.prevent="editRow(scope.row)"
                               v-if="!scope.row.$isEdit">编辑
                    </jx-button>
                    <jx-button type="text" size="mini"
                               @click.native.prevent="cancelRow(scope.row)"
                               v-if="scope.row.$isEdit">取消
                    </jx-button>
                    <jx-button type="text" size="mini"
                               @click.native.prevent="saveRow(scope.row)"
                               :loading="scope.row.saveLoading"
                               v-if="scope.row.$isEdit">保存
                    </jx-button>
                    <jx-button @click.native.prevent="detailRow(scope.row)"
                               type="text" size="mini">详情
                    </jx-button>
                    <jx-button @click.native.prevent="deleteRow(scope.row)"
                               :loading="scope.row.deleteLoading"
                               type="text" size="mini">删除
                    </jx-button>
                </template>
            </el-table-column>
        </el-table>
        <div :class="$style.footer">
            <div :class="$style.btns">
                <jx-button size="small" :disabled="selectRow.length === 0" :loading="deletingCount !== 0"
                           @click.native="handleDeleteBatch">删除
                </jx-button>
                <jx-button size="small" :disabled="selectRow.length === 0"
                           @click.native="handleEditBatch">编辑
                </jx-button>
                <jx-button size="small" :disabled="editCount === 0"
                           @click.native="handleCancelBatch">取消
                </jx-button>
                <jx-button size="small" :disabled="editCount === 0" :loading="savingCount !== 0"
                           @click.native="handleSaveBatch">保存
                </jx-button>
            </div>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {TmTableColumn, JxButton} from 'comp@';
    import {
        Table, TableColumn, Tag, Pagination, Radio, InputNumber, Select, Option
    } from 'element-ui';
    import {ObjUtl, ArrayUtl} from 'com@';
    import _ from 'lodash';
    import Common from './common';
    import {CategoryApi, StoreApi, DepartmentApi} from 'api@';

    export default {
        name: 'CategoryMdTable',
        componentName: 'CategoryMdTable',
        components: {
            TmTableColumn, JxButton, [Table.name]: Table, [TableColumn.name]: TableColumn, [Tag.name]: Tag,
            [Pagination.name]: Pagination, [Radio.name]: Radio, [InputNumber.name]: InputNumber,
            [Select.name]: Select, [Option.name]: Option
        },
        props: {
            query: Object
        },
        data() {
            return {
                dataList: [],
                pageIndex: 1,
                pageSize: 10,
                pageTotal: 0,
                deletingCount: 0,
                savingCount: 0,
                editCount: 0,
                selectRow: [],
                storeList: [],
                departmentEmptyText: '加载中...',
                departmentList: [],
            };
        },
        watch: {
            query: {
                handler: function (val, oldVal) {
                    this.debounceLoadData();
                },
                deep: true
            }
        },
        computed: {},
        methods: {
            $_add(data) {
                this.dataList.unshift(data);
            },
            $_update(data) {
                let _data = _.find(this.dataList, {id: data.id});
                if (_data) {
                    this._$merge(_data, data);
                }
            },
            handleSelectStoreChange(row) {
                this.departmentEmptyText = '加载中...';
                row.departmentId = '';
                Common._$loadDepartmentList.call(this, row.storeId);
            },
            async loadData() {
                try {
                    this.$emit("loadding");

                    const {list, pageTotal} = await CategoryApi.query(
                        this.query, this.pageIndex, this.pageSize
                    );

                    this.dataList = list;
                    this.pageTotal = pageTotal;

                    this.$emit("loadded");
                } catch (error) {
                    this._$handleError(error);
                }
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.loadData();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.loadData();
            },
            async editRow(row) {
                try {
                    this.editCount++;
                    this.$set(row, "$isEdit", true);
                    row.$old = _.cloneDeep(row);
                    if (_.isEmpty(this.storeList)) {
                        this.storeList = await StoreApi.list();
                    }
                    Common._$loadDepartmentList.call(this, row.storeId);
                } catch (error) {
                    this._$handleError(error);
                }
            },
            cancelRow(row) {
                if (row.$old) {
                    let old = row.$old;
                    delete row.$old;
                    this._$merge(row, old);
                    this.editCount--;
                }
                this.$set(row, "$isEdit", false);
            },
            async saveRow(row) {
                try {
                    this.$set(row, "saveLoading", true);
                    this.savingCount++;
                    await CategoryApi.update(row);
                    this.$set(row, "saveLoading", false);
                    this.$set(row, "$isEdit", false);
                    this.savingCount--;
                    this.editCount--;
                    this.pageTotal++;
                } catch (error) {
                    this._$handleError(error);
                }
            },
            detailRow(row) {
                this.$emit("detail", row);
            },
            async deleteRow(row) {
                try {
                    this.$set(row, "deleteLoading", true);
                    this.deletingCount++;
                    await CategoryApi.del(row.id);
                    ArrayUtl.protoRemove(this.dataList, item => item.id === row.id);
                    this.deletingCount--;
                    this.pageTotal--;
                } catch (error) {
                    this._$handleError(error);
                }
            },
            handleSelectionChange(selection) {
                this.selectRow = selection;
            },
            handleDeleteBatch() {
                for (let row of this.selectRow) {
                    this.deleteRow(row);
                }
            },
            handleEditBatch() {
                for (let row of this.selectRow) {
                    this.editRow(row);
                }
            },
            handleCancelBatch() {
                for (let row of this.dataList) {
                    if (row.$isEdit)
                        this.cancelRow(row);
                }
            },
            handleSaveBatch() {
                for (let row of this.dataList) {
                    if (row.$isEdit)
                        this.saveRow(row);
                }
            }
        },
        created() {
            this.loadData();
            this.debounceLoadData = _.debounce(() => {
                this.loadData();
            }, 300, {
                'leading': false,
                'trailing': true
            });
        },
        mounted() {
        }
    };
</script>


