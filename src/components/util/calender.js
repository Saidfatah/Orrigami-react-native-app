const monthNames    = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
let currentDay             = new Date().getDate() 
let currentYear            = new Date().getFullYear()
const currentMonthFixed    = new Date().getMonth() 
const currentYearFixed     = new Date().getFullYear() 
let selectedDate           = ''
let selectedDateRef        =null
let prevSelectedDateRefId  =''
let prevMotnhDaysCount     = 0
let currrentMotnhDaysCount = 0

const isLeapYear        = ()=>(currentYear % 100 === 0) ? (currentYear % 400 === 0) : (currentYear % 4 === 0)
const monthNumberOfDays = (month)=>{
    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11)
       return 31
    if (month == 1)
       return isLeapYear() ? 29 : 28
    return 30
}

//get the days
  const currrentMotnhDays = (month)=>{
    let days = []
    currrentMotnhDaysCount = monthNumberOfDays(month)
    for (let index = 0; index < currrentMotnhDaysCount ; index++) days.push(index +1)
    return days
 }  
  const prevMotnhDays     = (month)=>{
    let days = []
    let prev_month_lenght = parseInt(new Date(currentYear, month, 0).getDate());
    const day_of_week_where_currentMonth_starts = parseInt(new Date(currentYear, month, 1).getDay());
    for (let index = prev_month_lenght - day_of_week_where_currentMonth_starts ; index < prev_month_lenght ; index++) days.push(index +1)
    return days
 }  
  const nextMotnhDays     = ()=>{
    const next_Month_left_over_days = 42-(currrentMotnhDaysCount + prevMotnhDaysCount)
    let   days = []
    for (let index = 0; index < next_Month_left_over_days ; index++) days.push(index +1)
    return days
 } 

 export const getMonthDaysTotal=(month)=>{
     let days = [...prevMotnhDays(month),...currrentMotnhDays(month),...nextMotnhDays()]
     days=days.map(d=>({day:d,date:new Date(currentYear,month, d)}))
     return days
 }

 export const getMonth=(index)=>monthNames[index]
 
