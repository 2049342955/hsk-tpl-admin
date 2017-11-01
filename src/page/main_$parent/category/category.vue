c
<style lang="scss" rel="stylesheet/scss" module>
    .wrapper {
    }

    .query-box {
        margin-bottom: $base__margin--sm;
    }
    .query {
        float: left;
    }

    .add-btn {
        float: right;
    }
</style>
<template>
    <page :cont-class="$style.wrapper"
             title="菜品分类"
             icon="menu"
             :breadcrumb="true"
             info="所有的菜品分类信息">
        <tm-panel title="菜品分类" v-loading="loadding">
            <span slot="suffix">
                <el-button type="primary" size="small" @click="handleAdd">创建</el-button>
            </span>
            <div :class="$style['query-box']">
                <tm-query :model="query" :render-condition-rule="queryRule">
                    <el-form-item label="名称" prop="user">
                        <el-input v-model="query.name" placeholder="分类名称"></el-input>
                    </el-form-item>
                </tm-query>
            </div>
            <md-table ref="table" :query="query"
                      @loadding="handleLoadding" @loadded="handleLoadded" @detail="handleDetail"></md-table>
            <md-detail :visible.sync="visible" @update="handleUpdate" :data="data"></md-detail>
            <md-create :visible.sync="createVisible" @create="handleCreate"></md-create>
        </tm-panel>
    </page>
</template>
<script>
    import {Page, TmPanel, JxButton,TmQuery} from 'comp@';
    import MdTable from './table.md.vue';
    import MdDetail from './detail.md.vue';
    import MdCreate from './create.md.vue'
    import {Form, FormItem, Input,Button} from 'element-ui'

    export default {
        name: 'CategoryPage',
        componentName: 'CategoryPage',
        components: {
            Page, TmPanel,JxButton,TmQuery,
            MdTable,MdDetail,MdCreate,
            [Form.name]: Form, [FormItem.name]: FormItem, [Input.name]: Input,[Button.name]:Button
        },
        data() {
            return {
                query: {
                    name: ''
                },
                queryRule: {
                    name: 'text'
                },
                data: {},
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
            handleDetail(data) {
                this.data = data;
                this.visible = true;
            },
            handleAdd() {
                this.createVisible = true;
            },
            handleCreate(data) {
                this.$refs.table.$_add(data);
            },
            handleUpdate(data) {
                this.$refs.table.$_update(data);
            }
        },
        mounted() {
        }
    }
</script>
