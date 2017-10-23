<style lang="scss" rel="stylesheet/scss" scoped>
    .main {
        color: $base__text-color;
    }
</style>

<template>
    <div class="main">
        I am a blank template!
        <jx-icon type="logout"></jx-icon>
    </div>
</template>
<script>
    import { JxIcon } from 'comp@';
    export default {
        name: 'Main',
        components: {
            JxIcon
        },
        mounted () {
        }
    }
</script>
