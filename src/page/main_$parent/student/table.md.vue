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
                :data="studentList">
            <el-table-column
                    type="selection"
                    fixed
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="number"
                    label="学好"
                    :show-overflow-tooltip="true"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    :show-overflow-tooltip="true"
                    width="150">
            </el-table-column>
            <tm-table-column
                    prop="sex"
                    label="性别"
                    width="100">
                <template slot-scope="scope">
                    <el-tag type="gray" :close-transition="true" v-if="scope.row.sex === 'W'">女</el-tag>
                    <el-tag type="primary" :close-transition="true" v-else>男</el-tag>
                </template>
                <template slot="edit" slot-scope="scope">
                    <el-radio v-model="scope.row.sex" label="M">男</el-radio>
                    <el-radio v-model="scope.row.sex" label="W">女</el-radio>
                </template>
            </tm-table-column>
            <tm-table-column
                    prop="birthday"
                    label="出生日期"
                    type="date"
                    width="220">
            </tm-table-column>
            <tm-table-column
                    prop="nation"
                    label="民族">
            </tm-table-column>
            <tm-table-column
                    prop="college"
                    label="学院">
            </tm-table-column>
            <tm-table-column
                    prop="subject"
                    label="专业">
            </tm-table-column>
            <tm-table-column
                    prop="clazz"
                    label="班级">
            </tm-table-column>
            <el-table-column
                    label="操作"
                    width="260">
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
                               v-if="scope.row.$isEdit">保存
                    </jx-button>
                    <jx-button @click.native.prevent="detailRow(scope.row)"
                               type="text" size="mini">详情
                    </jx-button>
                    <jx-button @click.native.prevent="deleteRow(scope.row)"
                               type="text" size="mini">删除
                    </jx-button>
                </template>
            </el-table-column>
        </el-table>
        <div :class="$style.footer">
            <div :class="$style.btns">
                <jx-button size="small" :disabled="selectRow.length === 0" :loading="deletingCount !== 0"
                           @click.native="handleDeleteBatch">删除</jx-button>
                <jx-button size="small" :disabled="selectRow.length === 0"
                           @click.native="handleEditBatch">编辑</jx-button>
                <jx-button size="small" :disabled="editCount === 0"
                           @click.native="handleCancelBatch">取消</jx-button>
                <jx-button size="small" :disabled="editCount === 0" :loading="savingCount !== 0"
                           @click.native="handleSaveBatch">保存</jx-button>
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
    import {Table, TableColumn, Tag, Pagination, Radio} from 'element-ui'
    import {StudentApi} from 'api@'
    import {ObjUtl, ArrayUtl} from 'com@'
    import _ from 'lodash'

    export default {
        name: 'FinancingApplicationDemoTable',
        components: {
            TmTableColumn, JxButton, [Table.name]: Table, [TableColumn.name]: TableColumn, [Tag.name]: Tag,
            [Pagination.name]: Pagination, [Radio.name]: Radio
        },
        props: {
            query: Object
        },
        data() {
            return {
                studentList: [],
                pageIndex: 1,
                pageSize: 10,
                pageTotal: 0,
                deletingCount: 0,
                savingCount: 0,
                editCount: 0,
                selectRow: []
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
            $add(student) {
                this.studentList.push(student);
            },
            $update(student) {
                let _student = this.studentList.find(item => {
                    return item.id === student.id;
                });
                if (_student) {
                    Object.assign(_student, student);
                }
            },
            async loadData() {
                try {
                    this.$emit("loadding");

                    const {studentList,pageTotal} = await StudentApi.list(
                        this.query.name, this.pageIndex, this.pageSize
                    );

                    this.studentList = studentList;
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
            editRow(row) {
                this.editCount++;
                this.$set(row, "$isEdit", true);
                row.$old = Object.assign({}, row);
            },
            cancelRow(row) {
                if (row.$old) {
                    let old = row.$old;
                    delete row.$old;
                    Object.assign(row, old);
                    this.editCount--;
                }
                this.$set(row, "$isEdit", false);
            },
            saveRow(row) {
                this.$set(row, "saveLoading", true);
                this.savingCount++;
                StudentApi.update(row).then(() => {
                    this.$set(row, "saveLoading", false);
                    this.$set(row, "$isEdit", false);
                    this.savingCount--;
                    this.editCount--;
                });
            },
            detailRow(row) {
                this.$emit("detail", row);
            },
            deleteRow(row) {
                this.$set(row, "deleteLoading", true);
                this.deletingCount++;
                StudentApi.del(row.id).then(() => {
                    ArrayUtl.protoRemove(this.studentList, item => item.id === row.id);
                    this.deletingCount--;
                });
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
                for (let row of this.studentList) {
                    if (row.$isEdit)
                        this.cancelRow(row);
                }
            },
            handleSaveBatch() {
                for (let row of this.studentList) {
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


