<style lang="scss" rel="stylesheet/scss" module>
    .modal {
        max-width: 1000px;
    }
</style>
<template>
    <div>
        <tm-modal
                :visible.sync="dialogVisible"
                :custom-class="$style.modal"
                title="创建菜品分类"
                :hasEditIcon="false">
            <el-form :model="data" :rules="rules" status-icon ref="form" label-width="100px">
                <el-form-item label="分类名" prop="name">
                    <el-input v-model="data.name" placeholder="分类名"></el-input>
                </el-form-item>

                <el-form-item label="所属门店" prop="storeId">
                    <span v-if="storeList.length === 0">加载中...</span>
                    <el-select v-else
                               v-model="data.storeId"
                               filterable
                               @change="handleSelectStoreChange"
                               placeholder="请选择">
                        <el-option
                                v-for="store in storeList"
                                :key="store.id"
                                :value="store.id"
                                :label="store.name"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="烹饪部门" prop="storeId">
                    <span v-if="departmentEmptyText">{{departmentEmptyText}}</span>
                    <el-select v-else
                               v-model="data.departmentId"
                               filterable
                               placeholder="请选择">
                        <el-option
                                v-for="department in departmentList"
                                :key="department.id"
                                :value="department.id"
                                :label="department.name"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="是否启用" prop="enable">
                    <el-switch active-text="启用" inactive-text="失效" v-model="data.enable"></el-switch>
                </el-form-item>

                <el-form-item label="排序权重" prop="sortWeight">
                    <el-slider v-model="data.sortWeight" :min="0" :max="100"></el-slider>
                </el-form-item>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="生效时间" prop="startDate">
                            <el-date-picker type="date" placeholder="选择日期"
                                            value-format="yyyy-MM-dd"
                                            format="yyyy 年 MM 月 dd 日"
                                            v-model="data.startDate"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="失效时间" prop="endDate">
                            <el-date-picker type="date" placeholder="选择日期"
                                            value-format="yyyy-MM-dd"
                                            format="yyyy 年 MM 月 dd 日"
                                            v-model="data.endDate"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="data.description" placeholder="描述"
                              :autosize="{ minRows: 3, maxRows: 6}"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <jx-button type="primary" @click.native="handleCreate">创建</jx-button>
                            <jx-button @click.native="handleCancel">取消</jx-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </tm-modal>
    </div>
</template>
<script>
    import {TmModal, JxButton, TmAffix} from 'comp@';
    import {
        Alert, Form, FormItem, Input, Col, Row, DatePicker,
        Switch,Slider,Select,Option
    } from 'element-ui';
    import {CategoryApi,StoreApi,DepartmentApi} from 'api@';
    import {LangUtl} from 'com@';
    import _ from 'lodash';
    import Rule from './rule.config';
    import Common from './common';
    
    function initData() {
        return LangUtl.initObjectByPropList([
            'name','storeId','departmentId','startDate','endDate','description',
            ['enable',false],['sortWeight',0]
        ],'');
    }
    
    export default {
        name: 'name',
        components: {
            JxButton, TmAffix, TmModal,
            [Form.name]: Form, [FormItem.name]: FormItem, [Input.name]: Input, [Col.name]: Col, [Row.name]: Row,
            [DatePicker.name]: DatePicker,[Switch.name]:Switch,[Slider.name]:Slider,[Select.name]:Select,
            [Option.name]:Option
        },
        props: {
            visible: Boolean
        },
        data() {
            const vm = this;
            return {
                dialogVisible: false,
                data: initData(),
                rules:Rule.call(vm,'data'),
                storeList: [],
                departmentEmptyText: '请先选择门店',
                departmentList: [],
                loadding:false
            };
        },
        watch: {
            async visible(val) {
                try {
                    this.dialogVisible = val;
                    if(val){
                        await this.$nextTick();
                        this.$refs.form.resetFields();
                        if (_.isEmpty(this.storeList)) {
                            this.storeList = await StoreApi.list();
                        }
                    }
                } catch (error) {
                    this._$handleError(error)
                }
            },
            dialogVisible (val) {
                this.$emit("update:visible", val);
            }
        },
        computed: {},
        methods: {
            async handleCreate() {
                try {
                    await new Promise((res,rej)=>{
                        this.$refs.form.validate((valid) => {
                            if (valid) {
                                res();
                            } else {
                                rej('亲,您输入数据不符合要求,请核对提示验证一下,拜托了!!');
                            }
                        });
                    });
                    const addData = await CategoryApi.add(this.data);
                    this.$emit("create", addData);
                    this.dialogVisible = false;
                } catch (error) {
                    this._$handleError(error);
                }
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSelectStoreChange () {
                this.departmentEmptyText = '加载中...';
                this.data.departmentId = '';
                Common._$loadDepartmentList.call(this,this.data.storeId);
            }
        },
        created() {
        },
        mounted() {

        }
    };
</script>


