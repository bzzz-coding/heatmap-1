const Assignment = require('../models/Heatmap')

module.exports = {
    getHeatmap: async (req, res) => {
        // console.log(req.user)
        try {
            let today = new Date()
            
            let thisYear = today.getFullYear()
            let thisMonth = today.getMonth() + 1
            let thisDate = today.getDate()

            if (thisDate < 10) {
                thisDate = '0' + thisDate;
             }
             
             if (thisMonth < 10) {
                thisMonth = '0' + thisMonth;
             } 
            
           
            let todayDate = `${thisYear}-${thisMonth}-${thisDate}`
            // console.log(`today: ${today}; thisYear: ${thisYear}; thisMonth: ${thisMonth}`)
            
            // let thisMonthName = today.toLocaleString('default', { month: 'long' })
            // let todayDate = today.getDate()

            // changed weekdays to const, and wrote out the array
            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

            // today's day (weekday e.g. "Tuesday")
            // let todayDay = weekdays[today.getDay()]

            // variables for start and end of year
            let startYear = thisYear
            let startMonth = thisMonth - 9

            if (thisMonth < 9) {
                startMonth = 3 + thisMonth
                startYear = thisYear - 1
            }

            let firstDay = new Date(startYear, startMonth - 1, 0)
            if (firstDay.getDay() !== 0) {
                firstDay.setDate(firstDay.getDate() - firstDay.getDay())
            }
            // console.log(`firstDay: ${firstDay}`)
            
        
            // let nextMonth = thisMonth + 1
            // let endYear = thisYear
            // if (thisMonth == 11) {
            //     nextMonth = 0
            //     endYear = thisYear + 1
            // }
            // let lastDay = new Date(endYear, nextMonth, 6)
            // if (lastDay.getDay() !== 6) {
            //     lastDay = new Date(endYear, nextMonth, 12 - lastDay.getDay())
            // }
            // // console.log(`lastDay: ${lastDay}`)


            // Loop for all days in the year for diplay on boxes, format short month name and date
            // Loop for all days in the year for id name, formatted YYYY - MM - DD
            let allDatesInYear = []
            let dayObjectsInYear = {}
            let dayCounter = 1

        // format days and months to match calendar values
        for (let d = firstDay; d <= today; d.setDate(d.getDate() + 1)) {

            let year = d.getFullYear()

            let month = d.getMonth() + 1
            if (month < 10) {
                month = '0' + month;
            }

            let date = d.getDate()
            if (date < 10) {
                date = '0' + date;
            }

            
            let weekday = weekdays[d.getDay()]

            // push into arrays
            allDatesInYear.push(`${year}-${month}-${date}`)
            dayObjectsInYear[`${year}-${month}-${date}`] = {
                // full_date: `${year}-${month}-${date}`,
                tasks: [],
                total: 0,
                month_long: `${d.toLocaleString('default', { month: 'long' })}`,
                month_short: `${d.toLocaleString('default', { month: 'short' })}`,
                // date: `${new Date(d).getDate()}`, 
                date: date,
                year: year,
                day: weekday,
                day_of_year: dayCounter,
            }
            // console.log(dayObjectsInYear)

            dayCounter++
        }
            console.log(req.user.id)
            // sort from most recent to older data
            const assignments = await Assignment.find({ 
              userId: req.user.id, 
              // createdAt: {
              // $gte: allDatesInYear[0],
              // $lte: allDatesInYear[allDatesInYear.length - 1]
              // } 
            })
            // console.log(`assignments: ${assignments}`)
            for (let element of assignments) {
                let date = JSON.stringify(element.date).slice(1, 11)
                // console.log(date)

                if (dayObjectsInYear[date]) {
                    dayObjectsInYear[date].tasks = element.completed
                    dayObjectsInYear[date].total = dayObjectsInYear[date].tasks.length
                    // console.log(dayObjectsInYear[date])
                }   
            }
            console.log(`array length: ${allDatesInYear.length}; obj length: ${Object.keys(dayObjectsInYear).length}; today's date: ${todayDate}`)
            res.render('heatmap.ejs', {allDatesInYear: allDatesInYear, dayObjectsInYear: dayObjectsInYear, user: req.user, today: todayDate})
        } catch (err) {
            console.log(err)
        }
    },

    getEdit: async (req, res) => {
        let today = new Date()
            
            let thisYear = today.getFullYear()
            let thisMonth = today.getMonth() + 1
            let thisDate = today.getDate()

            if (thisDate < 10) {
                thisDate = '0' + thisDate;
             }
             
             if (thisMonth < 10) {
                thisMonth = '0' + thisMonth;
             } 
            
           
            let todayDate = `${thisYear}-${thisMonth}-${thisDate}`

        const date = req.params.date
        // const today = new Date().toJSON().slice(0,10)
        console.log(date)
        console.log(todayDate)
        try {
            const assignment = await Assignment.findOne({ 
                userId: req.user.id, 
                date: date
            })
            console.log(assignment)
            res.render('edit.ejs', {assignment: assignment, user: req.user, date: date, today: todayDate})
        } catch (err) {
            console.log(err)
        }
    },

    postAssignment: async (req, res) => {
        let date
        if (req.body.date) {
            date = req.body.date
        } else {
            let today = new Date()
            
            let thisYear = today.getFullYear()
            let thisMonth = today.getMonth() == 11 ? 1 : today.getMonth() + 1
       
            let thisDate = today.getDate()

            if (thisDate < 10) {
                thisDate = '0' + thisDate;
             }
             
             if (thisMonth < 10) {
                thisMonth = '0' + thisMonth;
             } 
            let todayDate = `${thisYear}-${thisMonth}-${thisDate}`
            date = todayDate
            
        }
     
        let checked = []
        for (let value of [req.body.anki, req.body.bank, req.body.codingChallenge]) {
            if (value) checked.push(value)
        }
        console.log(`date: ${date}, checked: ${checked}`)
        try {
            // using the Assignment model based on the schema, create a new todo item
            await Assignment.findOneAndUpdate({
              userId: req.user.id,
              date: date
            }, 
            {
                completed: checked
            }, 
            {
                // new: true,
                upsert: true
            })
            console.log('Assignment has been added!')
            res.redirect('/heatmap')
        } catch (err) {
            console.log(err)
        }
    },

    deleteEntry: async (req, res) => {
        console.log(req.body.idToDelete)
        try {
            await Assignment.findOneAndDelete({
                _id: req.body.idToDelete
            })
            console.log('Deleted.')
            res.json('Deleted entry.')
        } catch (err) {
            console.log(err)
        }
    }
}    