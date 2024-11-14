import express from "express";
import ViteExpress from "vite-express";
import dotenv from "dotenv";


const app = express();
const port = 5631
dotenv.config();

// 使用中间件解析 JSON 请求体
app.use(express.json());

app.get("/hello", (_, res) => {
    res.send("Hello Vite + Vue + TypeScript!");
});

app.post("/uploadImg", (req, res) => {
    // 读取 form-data 的 image
    let image: File = req.body.image;

    // 判断是否是图片
    if (image.type.indexOf('image') === -1) {
        res.json({ code: 400, msg: '请上传图片' });
        return;
    }

    // 判断图片大小 是否在 10MB 以内
    if (image.size > 1024 * 1024 * 10) {
        res.json({ code: 400, msg: '图片大小不能超过 10MB' });
        return;
    }

    // 保存图片

})

ViteExpress.listen(app, port, () =>
    console.log(`Server listening at http://localhost:${port}`),
);
