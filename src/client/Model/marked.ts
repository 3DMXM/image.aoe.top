import { marked } from 'marked';

marked.setOptions({
    gfm: true, // 启用 GitHub 风格的 Markdown
    breaks: true, // 启用换行符
    // sanitize: true // 防止 XSS 攻击，转义 HTML 标签
})

// 暴露 marked 
export { marked }