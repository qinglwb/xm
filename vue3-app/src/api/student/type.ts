export interface studentInfoData{
    _id?:string|null,
  name: string,
  //性别
  gender: string,
  school?: string,
  major?: string,
  grade?:string,
  education?:string,
    // 学习方向
  direction: string,
  id_number?:string,
  phone?: string,
  parent?: string,
  parent_phone?: string,
  address?:string ,
  qq?: string,
  //班级
  class: string,
    //入学时间
  admission_date:string,
  teacher_id: string,
  manager_id: string,
  pictures?:string[],
  note?:string ,
  __v?:number  
}
//列表 
export interface studentListFormData{
    page:number,
    size:number,
    searchMap:searchMapData
}
interface searchMapData{
    name:string,
    direction:string,
    teacher_id?:string,
    manager_id?:string,
    class:string
}
export interface studentResponseData{
    status:number,
    data?:studentInfoData,
    msg?:string
}
export interface studentAllResponseData{
    status:number,
    data?:studentInfoData[],
    msg?:string
}
export interface studentListResponseData{
    status:number,
    data?:studentListData,
    msg?:string
}
interface studentListData{
    data:studentInfoData[],
    total:number
}

//学生数量
interface monthData{
  _id:string,
  count:number
}
export interface studentYearResponseData{
  status:number,
  data:monthData[]
}