function createUserList(){
    return{
        status:0,
        data:[
            {
                "token":"Admin Token",
                "_id":"641280fdc5ff3cb994002003",
                "username":"test1",
                "name":"测试用户",
                "password":"123456",
                "phone":"131112345678",
                "role_id":"640ec59a9f6e3402f8edd4ec",
                "create_time":1678934269969,
                "__v":0,
                "role":{
                  "_id": "640ec59a9f6e3402f8edd4ec",
                  "name": "管理员",
                  "menus": [
                    "/home",
                    "/user",
                    "/role",
                    "/school",
                    "/majors",
                    "/student",
                    "/class"
                  ],
                  "create_time": 1678689690752,
                  "__v": 0,
                  "auth_time": 1678952409061,
                  "auth_name": "test1"
        
                }
              },
              {
                "token": 'System Token',
                "_id": "64098cc6984047a6c854b303",
                "username": "admin",
                "password": "admin",
                "create_time": 1678347462193,
                "__v": 0,
                "role": {
                  "menus": []
                }
              },
        ]
    }
}
export default [
    //获取登录接口
    {
        url:"/mock/login",
        mehtod:"post",
        //用于处理接受到的请求并返回响应
        //body接收的数据
        response:({body})=>{
            const {username,password}=body
            const chekUser=createUserList().data.find(
                (item)=>item.username===username&&item.password===password
            )
            if(!chekUser){
                return {status:1,msg:"用户名或密码错误"}
            }
            const {token}=chekUser
            return{
                status:0,
                data:{token}
            }
        }
    },
    //获取用户信息
    {
        url:"/mock/user/info",
        method:"get",
        response:(request)=>{
            const token=request.headers.token
            const chekUser=createUserList().data.find(
                (item)=>item.token===token
            )
            if(!chekUser){
                return {status:1,data:{message:"获取用户信息失败"}}
            }
            return {status:0,data:{...chekUser}}
        }
    }
]