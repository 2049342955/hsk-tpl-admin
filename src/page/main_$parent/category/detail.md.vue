<style lang="scss" rel="stylesheet/scss" module>
    .detail {
        [class*='el-form-item'] {
            margin-bottom: 10px;
        }
    }

    .modal {
        max-width: 1000px;
    }
</style>
<template>
    <div :class="$style.detail">
        <tm-modal
                :visible.sync="dialogVisible"
                :custom-class="$style.modal"
                :title="copyData.name || '请设置分类名'"
                :hasEditIcon="!isEdit"
                v-loading="loadding"
                size="large"
                @edit="handleEdit">
            <tm-editable :model="copyData" :rules="rules" ref="editable" label-width="100px" v-model="isEdit">
                <el-row :gutter="16" style="width: calc(100% - 16px)">
                    <el-col :span="12">
                        <tm-editable-item label="编码" prop="code">
                            {{copyData.code}}
                        </tm-editable-item>
                    </el-col>

                    <el-col :span="12">
                        <tm-editable-item label="分类名" prop="name">
                            <el-input v-model="copyData.name" placeholder="分类名"></el-input>
                        </tm-editable-item>
                    </el-col>

                    <el-col :span="12">
                        <tm-editable-item label="所属门店" prop="storeId">
                            <span slot="text">{{copyData.storeName}}</span>
                            <span v-if="storeList.length === 0">加载中...</span>
                            <el-select v-else
                                       v-model="copyData.storeId"
                                       filterable
                                       @change="handleSelectStoreChange"
                                       placeholder="请选择">
                                <el-option
                                        v-for="store in storeList"
                                        :key="store.id"
                                        :value="store.id"
                                        :label="store.name"></el-option>
                            </el-select>
                        </tm-editable-item>
                    </el-col>

                    <el-col :span="12">
                        <tm-editable-item label="烹饪部门" prop="departmentId">
                            <span slot="text">{{copyData.departmentName}}</span>
                            <span v-if="departmentEmptyText">{{departmentEmptyText}}</span>
                            <el-select v-else
                                       v-model="copyData.departmentId"
                                       filterable
                                       placeholder="请选择">
                                <el-option
                                        v-for="department in departmentList"
                                        :key="department.id"
                                        :value="department.id"
                                        :label="department.name"></el-option>
                            </el-select>
                        </tm-editable-item>
                    </el-col>

                    <el-col :span="12">
                        <tm-editable-item label="是否启用" prop="enable">
                            <template slot="text">
                                <el-tag type="gray" :close-transition="true" v-if="copyData.enable">
                                    启用
                                </el-tag>
                                <el-tag type="primary" :close-transition="true" v-else>失效</el-tag>
                            </template>
                            <el-switch active-text="启用" inactive-text="失效" v-model="copyData.enable"></el-switch>
                        </tm-editable-item>
                    </el-col>

                    <el-col :span="12">
                        <tm-editable-item label="排序权重" prop="sortWeight">
                            <el-slider v-model="copyData.sortWeight" :min="0" :max="100"></el-slider>
                        </tm-editable-item>
                    </el-col>

                    <el-col :span="12">
                        <tm-editable-item label="生效时间" prop="startDate" text-type="date">
                            <el-date-picker type="date" placeholder="选择日期"
                                            value-format="yyyy-MM-dd"
                                            format="yyyy 年 MM 月 dd 日"
                                            v-model="copyData.startDate"></el-date-picker>
                        </tm-editable-item>
                    </el-col>

                    <el-col :span="12">
                        <tm-editable-item label="失效时间" prop="endDate" text-type="date">
                            <el-date-picker type="date" placeholder="选择日期"
                                            value-format="yyyy-MM-dd"
                                            format="yyyy 年 MM 月 dd 日"
                                            v-model="copyData.endDate"></el-date-picker>
                        </tm-editable-item>
                    </el-col>

                    <el-col :span="24">
                        <tm-editable-item label="描述" prop="description">
                            <el-input type="textarea"
                                      v-model="copyData.description" placeholder="描述"
                                      :autosize="{ minRows: 3, maxRows: 6}"></el-input>
                        </tm-editable-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item v-show="isEdit">
                            <jx-button type="primary" @click.native="handleUpdate">修改</jx-button>
                            <jx-button @click.native="handleCancel">取消</jx-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </tm-editable>
        </tm-modal>
    </div>
</template>
<script>
    import {TmEditable, TmEditableItem, TmModal, JxText, TmAffix, JxButton} from 'comp@';
    import {
        Dialog, RadioGroup, RadioButton, Slider, DatePicker, Input, Tag, FormItem, Button, Row, Col, Select, Option,
        Switch
    } from 'element-ui';
    import {CategoryApi, StoreApi, DepartmentApi} from 'api@';
    import _ from 'lodash';
    import Rule from './rule.config';
    import Common from './common';

    export default {
        name: 'name',
        components: {
            TmEditable,
            TmEditableItem,
            TmModal,
            JxText,
            TmAffix,
            JxButton,
            [Dialog.name]: Dialog,
            [Slider.name]: Slider,
            [DatePicker.name]: DatePicker,
            [Input.name]: Input,
            [Tag.name]: Tag,
            [FormItem.name]: FormItem,
            [Button.name]: Button,
            [Row.name]: Row,
            [Col.name]: Col,
            [RadioGroup.name]: RadioGroup,
            [RadioButton.name]: RadioButton,
            [Select.name]: Select,
            [Option.name]: Option,
            [Switch.name]: Switch
        },
        props: {
            visible: Boolean,
            data: Object
        },
        data() {
            const vm = this;
            return {
                dialogVisible: false,
                copyData: {},
                rules:Rule.call(vm,'copyData'),
                isEdit: false,
                isCteate: false,
                storeList: [],
                departmentEmptyText: '加载中...',
                departmentList: [],
                loadding: false
            };
        },
        watch: {
            visible(val) {
                this.dialogVisible = val;
                this.isEdit = false;
                if (val) {
                    this.copyData = _.cloneDeep(this.data);
                    this.$nextTick(() => {
                        this.$refs.editable.$_clearValidate();
                    });
                }
            },
            dialogVisible(val) {
                this.$emit("update:visible", val);
            },
            async isEdit(val) {
                try {
                    if (!val) return;
                    if (_.isEmpty(this.storeList)) {
                        this.storeList = await StoreApi.list();
                    }
                    Common._$loadDepartmentList.call(this, this.copyData.storeId);
                } catch (error) {
                    this._$handleError(error)
                }
            }
        },
        computed: {},
        methods: {
            async handleEdit() {
                this.isEdit = true;
            },
            async handleUpdate() {
                this.loadding = true;
                try {
                    const valid = await this.$refs.editable.$_validate();
                    if (!valid) {
                        this.$message("数据格式非法!");
                        return;
                    }
                    this.copyData = await CategoryApi.update(this.copyData);
                    this.$emit("update", this.copyData);
                    this.isEdit = false;
                } catch (error) {
                    this._$handleError(error);
                } finally {
                    this.loadding = false;
                }
            },
            handleCancel() {
                this.dialogVisible = false;
            },
            handleSelectStoreChange() {
                this.departmentEmptyText = '加载中...';
                this.copyData.departmentId = '';
                Common._$loadDepartmentList.call(this, this.copyData.storeId);
            }
        },
        created() {
            this.dialogVisible = false;
        },
        mounted() {
        }
    };
</script>


