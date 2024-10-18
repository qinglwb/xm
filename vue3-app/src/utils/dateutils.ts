//年月日时分秒
export function formateTime(time:number){
    if(!time)  return ""
    let num=new Date(time)

    // console.log(num);
    let year:string|number=num.getFullYear()
    let month:string|number=num.getMonth()+1
    let date:string|number=num.getDate()
    let h:string|number=num.getHours()
    let m:string|number=num.getMinutes()
    let s:string|number=num.getSeconds()

    month=month<10?"0"+month:month
    date=date<10?"0"+date:date
    h=h<10?"0"+h:h
    m=m<10?"0"+m:m
    s=s<10?"0"+s:s
    return `${year}-${month}-${date} ${h}:${m}:${s}`
}
//年月日
export function formateDate(time:number){
    if(!time)  return ""
    let num=new Date(time)

    // console.log(num);
    let year:string|number=num.getFullYear()
    let month:string|number=num.getMonth()+1
    let date:string|number=num.getDate()


    month=month<10?"0"+month:month
    date=date<10?"0"+date:date
    return `${year}-${month}-${date}`

}