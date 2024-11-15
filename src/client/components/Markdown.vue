<script lang='ts' setup>
import { marked } from '../Model/marked'
import { computed, onMounted } from 'vue';
import 'github-markdown-css/github-markdown.css'; // 引入 GitHub 样式


let prop = defineProps<{
    md: string
}>()

let html = computed(() => marked(prop.md))


onMounted(() => {
    // 将markdown-body下的 a 标签的 target 属性设置为 _blank
    document.querySelectorAll('.markdown-body a').forEach((item: any) => {
        item.target = '_blank'
    })
})

</script>
<template>
    <div class="markdown-body" v-html="html"></div>
</template>
<script lang='ts'>

export default {
    name: 'Markdown',
}
</script>
<style lang='less' scoped>
.markdown-body {
    background-color: transparent;
}
</style>