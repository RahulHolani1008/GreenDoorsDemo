const moment = require("moment");

const YYYYMMDD = "YYYY-MM-DD";
const MMDDYYYY = "MM/DD/YYYY";
const invalidDate = "INVALID DATE";

exports.getMonthlyRent = (req, res, next) => {
    let leaseStart = req.body.leaseStart;
    let leaseEnd = req.body.leaseEnd;
    let monthlyRentAmount = req.body.monthlyRentAmount;

    if(!leaseStart) return res.status(400).send({message : 'Expected argument \'leaseStart\' in payload'});
    if(!leaseEnd) return res.status(400).send({message : 'Expected argument \'leaseEnd\' in payload'});
    if(!monthlyRentAmount) return res.status(400).send({message : 'Expected argument \'monthlyRentAmount\' in payload'});

    const responseData = [];
    const startDateFormat = validateDate(leaseStart);
    const endDateFormat = validateDate(leaseEnd);

    if(startDateFormat == invalidDate || endDateFormat == invalidDate) {
        return res.status(400).send({message : "Please enter date in format 'YYYY-MM-DD' OR 'MM/DD/YYYY'"});
    } else {
        leaseStart = moment(leaseStart, startDateFormat);
        leaseEnd = moment(leaseEnd, endDateFormat);
        leaseEnd = moment(new Date(leaseEnd).setDate(new Date(leaseEnd).getDate() - 1));
    };

    let duration = moment.duration(leaseEnd.diff(leaseStart)).asDays();
    const durationInMonth = moment.duration(leaseEnd.diff(leaseStart)).asMonths();

    for(let index = 0; index <= Math.floor(durationInMonth); index += 1) {
        const startDate = moment(new Date(new Date(leaseStart).setMonth(new Date(leaseStart).getMonth()+index)).setDate(index > 0 ? 01 : new Date(leaseStart).getDate()));
        const isFullMonth = duration >= (startDate.daysInMonth() - new Date(startDate).getDate() + 1) ? true : false;
        
        if(isFullMonth) {
            duration -= (startDate.daysInMonth() - new Date(startDate).getDate() + 1);
        }

        const endDate = moment(new Date(startDate).setDate(isFullMonth ? startDate.daysInMonth()+1 : new Date(startDate).getDate()+duration+1));
        const days =  moment.duration(endDate.diff(moment(startDate))).asDays();
        const daysInMonth = startDate.daysInMonth();
        
        if(days)
            responseData.push({ periodStart: startDate.format('MM/DD/YYYY'), periodEnd: endDate.format('MM/DD/YYYY'), amount: Math.round(monthlyRentAmount*days/daysInMonth) });
    }
    res.send(responseData);
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