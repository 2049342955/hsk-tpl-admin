export default {
    methods: {
        /**
         * 处理异常
         */
        _$handleError(error,errMessage) {
            console.error(error);
            this.$message(error.message || error);
        }
    }
}