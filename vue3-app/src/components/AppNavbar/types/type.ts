export interface MenuData{
    title:string,
    index:string,
    icon:string,
    isPublic?:string,
    children?:MenuChildrenData
}
export interface MenuChildrenData{
    title:string,
    index:string,
    iocn:string
}