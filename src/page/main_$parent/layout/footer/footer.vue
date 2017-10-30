<style lang="scss" rel="stylesheet/scss" module>
    .footer {
        @include m_layout-middle;
        background: none repeat scroll 0 0 #f8f8f8;
        border-top: 1px solid #DDDDDD;
        height: 50px;
        width: 100%;
    }
    .copyright {
        margin: auto;
        color: #666666;
        float: right;
        font-size: 12px !important;
        padding: 5px 15px;
        position: relative;
    }
</style>
<template>
    <div :class="$style.footer">
        <div :class="$style.copyright">
            &copy; 1996 - 2017 Copyright Hand China Co.,Ltd. All Rights Reserved Powered by
            <a href="http://www.esudian.com/" title="深圳易速点有限公司" target="_blank">www.esudian.com.</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>

