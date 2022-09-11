const Assignment = require('../models/Heatmap')

module.exports = {
    getHeatmap: async (req, res) => {
        // console.log(req.user)
        try {
            let today = new Date()
            let thisYear = today.getFullYear()
            let thisMonth = today.getMonth()
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

            if (thisMonth <= 9) {
                startMonth = 2 + thisMonth
                startYear = thisYear - 1
            }

            let firstDay = new Date(startYear, startMonth, 0)
            if (firstDay.getDay() !== 0) {
                firstDay.setDate(firstDay.getDate() - 6 + firstDay.getDay())
            }
            // console.log(`firstDay: ${firstDay}`)
            
        
            let nextMonth = thisMonth + 1
            let endYear = thisYear
            if (thisMonth == 11) {
                nextMonth = 0
                endYear = thisYear + 1
            }
            let lastDay = new Date(endYear, nextMonth, 6)
            if (lastDay.getDay() !== 6) {
                lastDay = new Date(endYear, nextMonth, 12 - lastDay.getDay())
            }
            // console.log(`lastDay: ${lastDay}`)


            // Loop for all days in the year for diplay on boxes, format short month name and date
            // Loop for all days in the year for id name, formatted YYYY - MM - DD
            let allDatesInYear = []
            let dayObjectsInYear = {}
            let dayCounter = 1

        // format days and months to match calendar values
        for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {

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
            console.log(`array length: ${allDatesInYear.length}; obj length: ${Object.keys(dayObjectsInYear).length}`)
            res.render('heatmap.ejs', {allDatesInYear: allDatesInYear, dayObjectsInYear: dayObjectsInYear})
        } catch (err) {
            console.log(err)
        }
    },

    addAssignment: async (req, res) => {
        const date = req.body.date
        console.log(date)
        let checked = []
        for (let value of [req.body.anki, req.body.bank, req.body.codingChallenge]) {
            if (value) checked.push(value)
        }
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

    // getTodos: async (req, res) => {
    //     console.log(req.user)
    //     try {
    //         const todoItems = await Todo.find({ userId: req.user.id }).sort({ "completed": 1, "priority": -1, "date": 1 })
    //         const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false })
    //         res.render('todos.ejs', { todos: todoItems, left: itemsLeft, user: req.user })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },

    // createTodo: async (req, res) => {
    //     try {
    //         // using the Todo model based on the schema, create a new todo item
    //         await Todo.create({
    //             todo: req.body.todoItem,
    //             completed: false,
    //             priority: req.body.priority,
    //             userId: req.user.id
    //         })
    //         console.log('Todo has been added!')
    //         res.redirect('/todos')
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },

    // getEdit: async (req, res) => {
    //     const id = req.params.id;
    //     console.log(id)
    //     console.log(req.user)
    //     try {
    //         const todoItems = await Todo.find({ userId: req.user.id })
    //         const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false })
    //         res.render('edit.ejs', { todos: todoItems, left: itemsLeft, user: req.user, idOfItem: id })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },

    // updateTodo: async (req, res) => {
    //     const id = req.params.id
    //     try {
    //         await Todo.findByIdAndUpdate(id, {
    //             todo: req.body.todoItem,
    //             priority: req.body.priority
    //         })
    //         console.log(`todo item updated, id: ${id}`)
    //         res.redirect('/todos')
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },

    // markComplete: async (req, res) => {
    //     try {
    //         await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res) => {
    //     try {
    //         await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },
    // deleteTodo: async (req, res) => {
    //     console.log(req.body.todoIdFromJSFile)
    //     try {
    //         await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile })
    //         console.log('Deleted Todo')
    //         res.json('Deleted It')
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
}    