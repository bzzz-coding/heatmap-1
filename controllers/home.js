module.exports = {
    getIndex: (req,res)=>{
        if (req.user) {
            return res.redirect('/heatmap')
        }
        res.render('index.ejs')
    },
    getTest: (req, res) => {
        res.render('test2.ejs')
    },
    getCalendar: (req, res) => {
        res.render('heatmapCalendar.ejs')
    }
}