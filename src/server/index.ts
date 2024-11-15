import express from "express";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs'

import { OneDrive } from "./OneDrive.js";

const app = express();
const port = 3000
const upload = multer({ dest: 'uploads/' });

dotenv.config();

// 使用中间件解析 JSON 请求体
app.use(express.json());
// 解析 application/x-www-form-urlencoded 类型的请求体

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/hello", (_, res) => {
    res.send("Hello Vite + Vue + TypeScript!");
});

app.post("/uploadImg", upload.single('image'), async (req, res) => {
    // 读取 req.file.path
    if (!req.file) {
        res.json({ code: 400, msg: '请上传图片' });
        return
    }

    // 判断是否是图片
    if (req.file.mimetype.indexOf('image') === -1) {
        res.json({ code: 400, msg: '请上传图片' });
        return;
    }

    // 判断图片大小 是否在 10MB 以内
    if (req.file.size > 1024 * 1024 * 10) {
        res.json({ code: 400, msg: '图片大小不能超过 10MB' });
        return;
    }

    let image = fs.readFileSync(req.file.path);

    // console.log(image);

    // 保存图片
    // 路径为 images/年/月/日/随机字符串.后缀
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let randomStr = Math.random().toString(36).slice(2);
    let ext = req.file.originalname.split('.').pop();
    let path = `images/${year}/${month}/${day}/`;
    let image_name = `${randomStr}.${ext}`;

    // 上传到 onedrive 
    let refresh_token = process.env.refresh_token || '';

    // 获取 access_token
    let access_token = await OneDrive.getAccessToken(refresh_token);

    if (access_token) {
        let data = await OneDrive.uploadImage(image, access_token, path, image_name);

        // 删除本地图片
        fs.unlinkSync(req.file.path)

        res.json({ code: 0, url: path + image_name });
    } else {
        res.json({ code: 400, msg: '获取 access_token 失败' });
    }

})


app.get("/auth/init", async (_, res) => {
    let response = await OneDrive.getAuthCodeUrl()
    res.redirect(response);
})

app.get("/auth/redirect", async (req, res) => {
    // 解析 code
    let code = req.query.code as string;
    const data = await OneDrive.getRefreshToken(code);

    res.json(data);
})


app.get("/images/*", async (req, res) => {
    let path = req.path

    let refresh_token = process.env.refresh_token || '';

    // 获取 access_token
    let access_token = await OneDrive.getAccessToken(refresh_token);

    if (access_token) {
        let data = await OneDrive.getImage(access_token, path);
        res.redirect(data['@microsoft.graph.downloadUrl']);
    } else {
        res.json({ code: 400, msg: '获取 access_token 失败' });
    }
})

ViteExpress.listen(app, port, () =>
    console.log(`Server listening at http://localhost:${port}`),
);
