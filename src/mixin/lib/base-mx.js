import _ from 'lodash';

export default {
    methods: {
        /**
         * 处理异常
         */
        _$handleError(error,errMessage = "系统出现异常") {
            console.error(error);
            this.$message(error.message || error);
        },
        /**
         * 合并属性
         * @param source
         * @param target
         * @private
         */
        _$merge(source,target) {
            const targetKeyList = Object.keys(target);
            targetKeyList.forEach(targetKey => {
                this.$set(source,targetKey,target[targetKey]);
            });
        },
        /**
         * 合并属性,支持深度
         * @param source
         * @param target
         * @private
         */
        _$mergeDeep(source,target) {
            const targetKeyList = Object.keys(target);
            targetKeyList.forEach(targetKey => {
                const value = target[targetKey];
                if(_.isPlainObject(value)){
                    this.$set(source,targetKey,{});
                    this._$mergeDeep(source.targetKey,value);
                    return;
                }
                this.$set(source,targetKey,value);
            });
        }
    }
}