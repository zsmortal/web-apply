import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import VitePluginRestart from 'vite-plugin-restart'
import vitePluginCompression from 'vite-plugin-compression'
import unpluginIcons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import vitePluginEslint from 'vite-plugin-eslint'
import unpluginAutoImport from 'unplugin-auto-import/vite'
import unpluginComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: env.VITE_PUBLIC_PATH, // 配置路径
    resolve: {
      // 配置别名
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        // 引入 css 全局变量
        scss: {
          additionalData: `@use './src/styles/variable.scss' as *;`
        }
      }
    },
    clearScreen: false, // 避免 Vite 清屏而错过在终端中打印某些关键信息
    envPrefix: ['VITE_'], // 以 VITE_ 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中
    server: {
      host: '0.0.0.0', // 默认是 localhost
      port: 8000, // 设置开发端口（默认是 5173 端口）
      strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      open: true, // 浏览器自动打开，设为字符串时，会被用作 URL 的路径名
      cors: true, // 为开发服务器配置 CORS，默认启用并允许任何源
      proxy: {
        // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        [env.VITE_APP_PROXY_API]: {
          target: env.VITE_APP_BASE_URL, // 设置代理地址
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_PROXY_API}`), ''), // 重写请求路径
          bypass: (req, res, options) => {
            res.setHeader('proxy-url', new URL(options.rewrite(req.url), options.target as string).href) // 设置 header，查看请求全路径
          }
        }
      }
    },
    build: {
      target: ['es2021', 'chrome105', 'safari13'], // 浏览器兼容性
      outDir: 'dist', // 打包构建输出路径，默认 dist，如果路径存在，构建之前会被删除
      cssCodeSplit: true, // 启用代码拆分，如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      sourcemap: false, // 构建后是否生成 source map 文件，禁用加快构建速度
      minify: 'terser', // 混淆器，terser 构建后文件体积更小；默认为 esbuild，比 terser 快 20-40 倍，压缩率只差 1%-2%
      terserOptions: {
        // 生产环境移除
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          // 静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: (id) => {
            // 静态资源拆分打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    plugins: [
      vue(), // 挂载 vue
      Unocss(), // 即时原子 CSS 引擎
      visualizer(), // 打包分析插件，会在根目录下生成一个 stats.html 文件
      // 自动重启 vite 服务
      VitePluginRestart({
        restart: ['vite.config.ts', '.env', '.env.development', '.env.production', '.env.test']
      }),
      // 使用 gzip 或者 brotli 来压缩资源
      vitePluginCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      unpluginIcons({
        compiler: 'vue3',
        autoInstall: true, // 自动下载使用的图标集
        customCollections: {
          svg: FileSystemIconLoader('./src/assets/svg') // 存放 svg 图标的文件地址
        }
      }),
      vitePluginEslint({ cache: false }), // 关闭 eslint 缓存
      // 自动导入
      unpluginAutoImport({
        eslintrc: {
          enabled: true,
          filepath: '.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        resolvers: [IconsResolver({ prefix: 'icon' }), ElementPlusResolver()],
        imports: ['vue', 'vue-router', 'pinia'], // 预设插件
        dts: './src/typings/auto-imports.d.ts' // 指定生成全局指令的文件目录
      }),
      // 自动注册
      unpluginComponents({
        resolvers: [
          IconsResolver({
            prefix: 'icon', // 自动引入的 Icon 组件统一前缀
            customCollections: ['svg'], // 自定义图标组件名称
            enabledCollections: ['ep'] // 自动注册图标组件（element-plus）
          }),
          ElementPlusResolver() // element-plus
        ],
        deep: true, // 搜索子目录
        dirs: ['./src/components', './src/layouts'], // 按需加载的文件夹
        dts: './src/typings/components.d.ts' // 指定生成全局指令的文件目录
      })
    ]
  })
}
