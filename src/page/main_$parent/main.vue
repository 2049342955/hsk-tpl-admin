<style lang="scss" rel="stylesheet/scss">
    .tpl-main {
        .wrap {
            margin-top: 150px;
            display: flex;
            align-items: stretch;
            .box {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 25px;
                img {
                    width: 200px;
                    height: 200px;
                    border-radius: 100px;
                }
            }
        }
    }
</style>

<template>
    <Page cont-class="tpl-main"
             title="主页"
             icon="home"
             :breadcrumb="true"
             info="我是主页,我是主页,我是主页,重要的事情说三遍。">
        <div class="wrap">
            <div class="box">
                <img src="./logo.jpg">
                <div style="margin-top: 20px;">这是一个使用vue2 + webpack2 + elementUI搭建的一个用于后台管理的单页面应用模版。</div>
                <div>作者:joyer,邮箱:972325584@qq.com 。</div>
            </div>
        </div>
    </Page>
</template>
<script>
    import {Page} from 'comp@'
    export default {
        name: 'Main',
        components: {Page}
    }
</script>
