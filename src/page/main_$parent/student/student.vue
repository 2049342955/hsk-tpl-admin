c
<style lang="scss" rel="stylesheet/scss" module>
    .contract {
    }

    .query-box {
        &::after {
            display: table;
            content: '';
            clear: both;
        }
    }
    .query {
        float: left;
    }

    .add-btn {
        float: right;
    }
</style>
<template>
    <page :cont-class="$style.contract"
             title="学生列表"
             icon="menu"
             :breadcrumb="true"
             info="所有的学生信息">
        <tm-panel title="学生列表" v-loading="loadding">
            <div :class="$style['query-box']">
                <el-form :inline="true" :model="query" :class="$style.query">
                    <el-form-item label="姓名">
                        <el-input v-model="query.name" placeholder="审批人"></el-input>
                    </el-form-item>
                </el-form>
                <jx-button :class="$style['add-btn']" @click.native="handleAdd">创建</jx-button>
            </div>
            <md-table ref="table" :query="query"
                      @loadding="handleLoadding" @loadded="handleLoadded" @detail="handleDetail"></md-table>
            <md-detail :visible.sync="visible" @update="handleUpdate" :student="student"></md-detail>
            <!--<md-create :visible="createVisible" @create="handleCreate" @close="handleCreateClose"></md-create>-->
        </tm-panel>
    </page>
</template>
<script>
    import {Page, TmPanel, JxButton} from 'comp@';
    import MdTable from './table.md.vue';
//    import MdDetail from './detail.md.vue';
//    import MdCreate from './create.md.vue'
    import {Form, FormItem, Input} from 'element-ui'

    export default {
        name: 'StudentPage',
        components: {
            Page, TmPanel,JxButton,
            MdTable,
//            MdDetail, MdCreate,
            [Form.name]: Form, [FormItem.name]: FormItem, [Input.name]: Input
        },
        data() {
            return {
                query: {
                    name: ''
                },
                student: {},
                loadding: true,
                visible: false,
                createVisible: false
            };
        },
        methods: {
            handleLoadding() {
                this.loadding = true;
            },
            handleLoadded() {
                this.loadding = false;
            },
            handleDetail(student) {
                this.student = student;
                this.visible = true;
            },
            handleAdd() {
                this.createVisible = true;
            },
            handleCreateClose() {
                this.createVisible = false;
            },
            handleCreate(newContract) {
                this.$refs.table.addContract(newContract);
            },
            handleUpdate(contract) {
                this.$refs.table.updateContract(studnet);
            }
        },
        mounted() {
        }
    }
</script>
