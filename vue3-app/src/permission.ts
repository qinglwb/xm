import router from "./router"
import pinia from "./store"
import useUserStore from "./store/modules/user"

let useStore=useUserStore(pinia);

//路由的前置守卫
//防止没有进行登录,就进入登录之后才能进入的页面
router.beforeEach((to,from,next)=>{
    const user=useStore.user;
    console.log(user);
    //判断是否处于登录状态
    if(user&&user._id){
        //如果目标路由是login
        if(to.path==="/login"){
            next({path:"/"})
        }else{
            next()
        }
    }else{
        if(to.path==="/login"){
            next();
        }else{
            next({path:"/login"})
        }
    }
})