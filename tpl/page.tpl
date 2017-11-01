<style lang="scss" rel="stylesheet/scss" module>
    .wrapper {

    }
</style>

<template>
    <div :class="$style.wrapper">


    </div>
</template>
<script>
    import {} from 'comp@';

    export default {
        name: '<%= _.upperFirst(_.camelCase(name)) +'Page' %>',
        componentName: '<%= _.upperFirst(_.camelCase(name)) +'Page' %>',
        components: {
            Comp
        },
        data(){
            return {
                _pageTitle:'${name}演示',
            };
        }
    }
</script>
