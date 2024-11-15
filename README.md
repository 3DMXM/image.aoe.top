# 小莫图床

这是一个我自用的图床, 用于一些需要图片的存放.

### API

post: `/uploadImg` 上传图片
参数:
- `image`: 图片文件

示例 (ts):
```ts
const image = ... // 图片文件
const formData = new FormData()
formData.append('image', image)
const { data } = await axios.post('/uploadImg', formData)
if (data.code == 0) {
   console.log(data.url);
} else {
   ElMessage.error(data.msg)
}
```