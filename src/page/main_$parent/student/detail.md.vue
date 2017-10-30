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
                :visible="dialogVisible"
                :custom-class="$style.modal"
                :title="data.number+'('+data.name+')'"
                :hasEditIcon="!isEdit"
                size="large"
                @edit="handleEdit"
                @close="handleClose">
            <tm-editable :model="data" :rules="rules" ref="editable" label-width="100px" v-model="isEdit">
                <el-row :gutter="16" style="width: calc(100% - 16px)">
                    <el-col :span="12">
                        <tm-editable-item label="名字" prop="name">
                            <el-input v-model="data.name" placeholder="名字"></el-input>
                        </tm-editable-item>
                    </el-col>

                    <el-col :span="12">
                        <tm-editable-item label="性别" prop="sex">
                            <template slot="text">
                                <el-tag type="gray" :close-transition="true" v-if="data.sex === 'W'">女</el-tag>
                                <el-tag type="primary" :close-transition="true" v-else>男</el-tag>
                            </template>
                            <el-select v-model="data.sex" placeholder="请选择">
                                <el-option value="M" label="男"></el-option>
                                <el-option value="W" label="女"></el-option>
                            </el-select>
                        </tm-editable-item>
                    </el-col>
                    <el-col :span="12">
                        <tm-editable-item label="出生日期" prop="birthday" text-type="date" type="onlyText">
                            <el-date-picker type="date" placeholder="有效期" v-model="data.birthday">
                            </el-date-picker>
                        </tm-editable-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <tm-affix>
                            <el-form-item v-show="isEdit">
                                <jx-button type="primary" @click.native="handleUpdate">修改</jx-button>
                                <jx-button @click.native="handleCancel">取消</jx-button>
                            </el-form-item>
                        </tm-affix>
                    </el-col>
                </el-row>
            </tm-editable>
        </tm-modal>
    </div>
</template>
<script>
    import {TmEditable, TmEditableItem, TmModal, JxText, TmAffix, JxButton} from 'comp@';
    import {Dialog, Select, Option, Slider, DatePicker, Input, Tag, FormItem, Button, Row, Col} from 'element-ui';
    import {StudentApi} from 'api@';
    import _ from 'lodash';

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
            [Select.name]: Select,
            [Option.name]: Option,
            [Slider.name]: Slider,
            [DatePicker.name]: DatePicker,
            [Input.name]: Input,
            [Tag.name]: Tag,
            [FormItem.name]: FormItem,
            [Button.name]: Button,
            [Row.name]: Row,
            [Col.name]: Col
        },
        props: {
            visible: Boolean,
            student: Object
        },
        data() {
            return {
                dialogVisible: false,
                data: {},
                rules: {},
                isEdit: false,
                isCteate: false,
            };
        },
        watch: {
            visible(val) {
                this.dialogVisible = val;
                this.isEdit = false;
                if (val) {
                    for (let key of Object.keys(this.student)) {
                        this.$set(this.data, key, this.student[key]);
                    }
                }
            },
            dialogVisible(val) {
                this.$emit("input:visible",val);
            }
        },
        computed: {},
        methods: {
            handleClose() {
                this.$emit("close");
            },
            handleEdit() {
                this.isEdit = true;
            },
            async handleUpdate() {
                try {
                    const updateStudent = _.cloneDeep(this.data);
                    await StudentApi.update(updateStudent);
                    this.$emit("update", _data);
                    this.isEdit = false;
                }catch(error) {
                    this._$handleError(error);
                }
            },
            handleCancel() {
                this.$emit("close");
            }
        },
        created() {
            this.dialogVisible = false;
        },
        mounted() {
        }
    };
</script>


