<style lang="scss" rel="stylesheet/scss">

</style>

<template>
    <div>I am a blank template!</div>
</template>
<script>
    import { ObjUtl } from 'com@';
    export default {
        name: 'Main',
        components: {},
        mounted () {
            console.log(ObjUtl.stringifyDateInObject({
                birthday:new Date()
            },['birthday']));
        }
    }
</script>
