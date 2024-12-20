import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue'],
            resolvers: [
                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),
            ],

        }),
        Components({
            dirs: ['src/client/components'],
            resolvers: [
                ElementPlusResolver(),
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
            ],
        }),
        Icons({
            autoInstall: true,
        }),
    ],
    // 隐射 @ 到 /src
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
