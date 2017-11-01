import Moment from 'moment';

export default function (dateFiledName) {
    const that = this;
    return {
        name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur'}
        ],
        storeId: [
            {required: true, message: '请选择店铺', trigger: 'change'}
        ],
        departmentId: [
            {required: true, message: '请选择默认烹饪部门', trigger: 'change'}
        ],
        enable: [
            {type: 'boolean', required: true, message: '请设置是否启用', trigger: 'change'}
        ],
        sortWeight: [
            {type: 'integer', required: true, message: '请设置排序权重', trigger: 'change'}
        ],
        startDate: [
            {required: true, message: '请设置生效时间', trigger: 'change'}
        ],
        endDate: [
            {
                validator(ignore, value, callback) {
                    try {
                        console.log("=========1=====");
                        const startDate = that[dateFiledName].startDate;
                        console.log("=========2=====",startDate,"value:",value,"!value:",!value);
                        if (!value){
                            callback();
                            return;
                        }
                        if (!!startDate) {
                            const isAfter = Moment(value).isAfter(startDate);
                            if (isAfter) callback();
                            else callback(new Error("失效时间必须大于生效时间"));
                            return;
                        }
                        callback(new Error("请先设置生效时间"));
                    } catch (error) {
                        callback(error);
                    }
                },trigger: 'change'
            }
        ],
        description: [
            {min: 1, max: 240, message: '长度在 1 到 240 个字符', trigger: 'blur'}
        ]
    };
};