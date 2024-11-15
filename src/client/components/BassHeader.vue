<script lang='ts' setup>

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


</script>
<template>
    <v-app-bar :elevation="2">
        <v-toolbar-title>小莫图床</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="text" to="/">首页</v-btn>
        <v-btn variant="text" to="/api">API</v-btn>
    </v-app-bar>

</template>
<script lang='ts'>

export default {
    name: 'BassHeader',
}
</script>
<style lang='less' scoped></style>