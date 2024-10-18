import type {userInfoData} from "@/api/user/type"
import type {roleInfoData} from "@/api/role/type"

import type { schoolInfoData } from "@/api/school/type"
import type {majorData} from "@/api/major/type"

import type {classInfoData} from "@/api/class/type"
import type {studentInfoData} from "@/api/student/type"
export interface UserState{
    // token:string|null
    //限定用户的类型
    user:userInfoData|null,

    users:userInfoData[]
}
//角色
export interface RoleState{
    roles:roleInfoData[]|undefined
}

export interface SchoolState{
    schools:schoolInfoData[]|undefined
}

export interface MajorState{
    maj:majorData[]|undefined
}
export interface ClassState{
    classes:classInfoData[]|undefined
}
export interface StudentState{
    students:studentInfoData[]|undefined
}