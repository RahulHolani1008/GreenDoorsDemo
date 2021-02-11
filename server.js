const moment = require("moment");

let leaseStart = "2021-03-01";
let leaseEnd = "2021-05-01";
const monthlyRentAmount = 10000;
const YYYYMMDD = "YYYY-MM-DD";
const MMDDYYYY = "MM/DD/YYYY";
const invalidDate = "INVALID DATE";

const getMonthlyRent = () => {
    const responseData = [];
    const startDateFormat = validateDate(leaseStart);
    const endDateFormat = validateDate(leaseEnd);
    if(startDateFormat == invalidDate || endDateFormat == invalidDate) {
        return console.error("Please enter date in format 'YYYY-MM-DD' OR 'MM/DD/YYYY'")
    } else {
        leaseStart = moment(leaseStart, startDateFormat);
        leaseEnd = moment(leaseEnd, endDateFormat);
        leaseEnd = moment(new Date(leaseEnd).setDate(new Date(leaseEnd).getDate() - 1));
    };
    const lastDayOfStartMonth = moment(new Date(leaseStart).setDate(leaseStart.daysInMonth()));
    const duration = moment.duration(leaseEnd.diff(leaseStart)).asDays();
    const durationMonth = moment.duration(lastDayOfStartMonth.diff(moment(leaseStart))).asDays();
    if(durationMonth >= duration) {
        responseData.push({ periodStart: leaseStart.format('MM/DD/YYYY'), periodEnd: leaseEnd.format('MM/DD/YYYY'), amount: (monthlyRentAmount*duration/durationMonth) })
    } else {
        const durationInMonth = moment.duration(leaseEnd.diff(leaseStart)).asMonths();
        for(let index = 0; index < Math.ceil(durationInMonth); index += 1) {
            const startDate = moment(new Date(leaseStart).setMonth(new Date(leaseStart).getMonth()+index));
            const endDate = moment(new Date(startDate).setDate(startDate.daysInMonth()+1));
            const days =  moment.duration(endDate.diff(moment(startDate))).asDays();
            const daysInMonth = startDate.daysInMonth();
            responseData.push({ periodStart: startDate.format('MM/DD/YYYY'), periodEnd: endDate.format('MM/DD/YYYY'), amount: (monthlyRentAmount*days/daysInMonth) });
        }
    }
    console.log(responseData);
}

const validateDate = date => {
    const date1 = date.split("-");
    const date2 = date.split("/");
    if(date1[0] && date1[1] && date1[2] && date1[0].length == 4 && date1[1].length == 2 && date1[2].length == 2) {
        if(Number(date1[1]) > 12 || Number(date1[2]) > 31) 
            return invalidDate;
        else {
            return YYYYMMDD;
        }
    } else if(date2[0] && date2[1] && date2[2] && date2[0].length == 2 && date2[1].length == 2 && date2[2].length == 4) {
        if(Number(date1[0]) > 12 || Number(date1[1]) > 31) 
            return invalidDate;
        else {
            return MMDDYYYY;
        }
    } else {
        return invalidDate;
    }
}

getMonthlyRent();