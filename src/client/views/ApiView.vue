<script lang='ts' setup>

const readme = ref('')

async function getReadme() {
    let response = await fetch('https://raw.githubusercontent.com/3DMXM/image.aoe.top/refs/heads/main/README.md')
    readme.value = await response.text()
}

getReadme()

</script>
<template>
    <v-container>
        <Markdown :md="readme"></Markdown>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'ApiView',
}
</script>
<style lang='less' scoped></style>