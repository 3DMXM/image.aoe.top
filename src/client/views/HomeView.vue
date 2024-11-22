<script lang='ts' setup>
import axios from 'axios'
import { ElMessage } from 'element-plus';

const imageUrl = ref('')

const upload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
        const image = input.files?.[0]
        if (!image) return
        const formData = new FormData()
        formData.append('image', image)
        const { data } = await axios.post('/uploadImg', formData)
        if (data.code == 0) {
            console.log(data);
            imageUrl.value = data.url
        } else {
            ElMessage.error(data.msg)
        }
    }
    input.click()
}

function copy() {
    try {
        let link = location.href + imageUrl.value
        navigator.clipboard.writeText(link).then(function () {
            ElMessage.success('复制成功')
        }).catch(function () {
            ElMessage.error('复制失败')
        })
    }
    catch (e) {
        ElMessage.error('复制失败')
    }
}
</script>
<template>
    <div class="home">
        <h1>小莫图床</h1>
        <div class="button">
            <el-button @click="upload">上传图片
                <el-icon>
                    <el-icon-upload />
                </el-icon>
            </el-button>
        </div>
        <div class="image" v-if="imageUrl">
            <el-button class="copy" @click="copy">复制图片地址</el-button>
            <el-image class="image-src" :src="imageUrl"></el-image>
        </div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'HomeView',
}
</script>
<style lang='less' scoped>
.home {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.image {
    display: flex;
    flex-direction: column;
    align-items: center;

    // 添加边框
    border: 1px solid #ebeef5;
    padding: 10px;

    .copy {
        position: relative;
        right: 0;
        text-align: right;
    }

    .image-src {
        min-width: 200px;
        min-height: 200px;
        max-width: 80%;
    }
}
</style>