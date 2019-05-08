const { wrapAsync, givesError } = require('../helpers')
const { Articles } = require('../models')

const functions = {
    addTodo: wrapAsync(async (req, res) => {
        user = req.user;        
        let todo = new Articles({ ...req.body })
        todo.creator = user._id
        await todo.save()
        res.status(201).json(todo)
    }),
    getAllTodo: wrapAsync((req, res) => { }),
    getATodo: wrapAsync((req, res) => { }),
    addFriend: wrapAsync((req, res) => { }),

}




