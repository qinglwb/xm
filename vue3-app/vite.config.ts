//导入
//loadEnv（开发模式，从哪去拿环境变量）
import { defineConfig,UserConfigExport,ConfigEnv,loadEnv } from 'vite'
import {viteMockServe} from "vite-plugin-mock"

import vue from '@vitejs/plugin-vue'
//node
import path from "path"

export default (({command,mode}:ConfigEnv):UserConfigExport=>{
  let env=loadEnv(mode,process.cwd())
  return{
    plugins: [
      vue(),
      //有了虚拟数据需要通过mock来操作这些数据
      viteMockServe({
        localEnabled:command==="serve"
      })
    ],
    resolve:{
      alias:{
        "@":path.resolve("./src")
      }
    },
    //代理跨域
      //替换成真实的接口
    server:{
      proxy:{
        [env.VITE_APP_BASE_API]:{
          target:env.VITE_APP_SERVICE_URL,
          changeOrigin:true,
          rewrite:(path)=>path.replace(/^\/dev-api/,"")
        }
      }
    }
  }
 
})
