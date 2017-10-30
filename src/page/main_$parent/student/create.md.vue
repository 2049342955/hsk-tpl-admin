<style lang="scss" rel="stylesheet/scss" module>
    .modal {
        max-width: 1000px;
    }
</style>
<template>
    <div>
        <tm-modal
                :visible="dialogVisible"
                :custom-class="$style.modal"
                title="创建合同"
                size="large"
                :hasEditIcon="false"
                @close="handleClose">
            <el-form :model="data" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="名字" prop="contractName">
                    <el-input v-model="data.contractName" placeholder="名字"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="contractType">
                    <el-input v-model="data.contractType" placeholder="类型"></el-input>
                </el-form-item>
                <el-form-item label="保理公司" prop="factorOrgName">
                    <el-input v-model="data.factorOrgName" placeholder="保理公司"></el-input>
                </el-form-item>
                <el-form-item label="核心企业" prop="guaranteeOrgName">
                    <el-input v-model="data.guaranteeOrgName" placeholder="核心企业"></el-input>
                </el-form-item>
                <el-form-item label="融资企业" prop="requestOrgName">
                    <el-input v-model="data.requestOrgName" placeholder="融资企业"></el-input>
                </el-form-item>
                <el-form-item label="有效期" prop="validPeriod">
                    <el-date-picker type="datetimerange" placeholder="有效期" v-model="data.validPeriod">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="comment">
                    <el-input type="textarea" v-model="data.comment"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="24">
                        <tm-affix>
                            <el-form-item>
                                <jx-button type="primary" @click.native="handleCreate">创建</jx-button>
                                <jx-button @click.native="handleCancel">取消</jx-button>
                            </el-form-item>
                        </tm-affix>
                    </el-col>
                </el-row>
            </el-form>
        </tm-modal>
    </div>
</template>
<script>
    import {TmModal, JxButton, TmAffix} from 'comp@';
    import {Alert, Form, FormItem, Input, Col, Row, DatePicker} from 'element-ui';
    import {ContractApi} from 'api@';
    import _ from 'lodash';

    export default {
        name: 'name',
        components: {
            JxButton, TmAffix, TmModal,
            [Form.name]: Form, [FormItem.name]: FormItem, [Input.name]: Input, [Col.name]: Col, [Row.name]: Row,
            [DatePicker.name]: DatePicker
        },
        props: {
            visible: Boolean
        },
        data() {
            let restBaseRule = name => {
                return [
                    {required: true, message: '请输入' + name, trigger: 'blur'},
                    {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
                ];
            };
            let validateValidPeriod = (rule, value, callback) => {
                if (!value || value.length < 1) {
                    callback(new Error('请输入有效期'));
                } else {
                    callback();
                }
            };
            return {
                dialogVisible: false,
                data: {
                    contractName: '',
                    contractType: '',
                    factorOrgName: '',
                    guaranteeOrgName: '',
                    requestOrgName: '',
                    validPeriod: [],
                    comment: ''
                },
                rules: {
                    contractName: restBaseRule('名字'),
                    contractType: restBaseRule('类型'),
                    factorOrgName: restBaseRule('保理公司'),
                    guaranteeOrgName: restBaseRule('核心企业'),
                    requestOrgName: restBaseRule('核心企业'),
                    validPeriod: [
                        {validator: validateValidPeriod, trigger: 'blur'}
                    ],
                },
            };
        },
        watch: {
            visible(val) {
                this.dialogVisible = val;
                this.data.contractName = '';
                this.data.contractType = '';
                this.data.factorOrgName = '';
                this.data.guaranteeOrgName = '';
                this.data.requestOrgName = '';
                this.data.validPeriod = [];
                this.data.comment = '';
            }
        },
        computed: {},
        methods: {
            handleClose() {
                this.$emit("close");
            },
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

                    const newData = _.cloneDeep(this.data);
                    newData.startDate = newData.validPeriod[0];
                    newData.endDate = newData.validPeriod[1];
                    newData.contractNumber = "合同" + new Date().getTime();
                    delete newData.validPeriod;
                    const addContract = await ContractApi.add(newData);

                    this.$emit("create", data);
                    this.$emit("close");

                } catch (error) {
                    this._$handleError(error);
                }
            },
            handleCancel() {
                this.$emit("close");
            },

        },
        created() {
            this.dialogVisible = false;
        },
        mounted() {

        }
    };
</script>


