const model = require('../models/category.js')


// create new calendar category
exports.newCategory = async (req, res) => {
    const { user, title, color } = req.body
    const category = new model({
        user,
        title,
        color
    })
    try {
        await category.save()
        res.json({ 
            message: 'Category created',
            // get all categories from the user
            category: await model.find({ user })
        
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
} 

// get all categories from the user
exports.getCategory = async (req, res) => {
    try {
        res.json(await model.find({ user: req.params.user }))
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

// delete category
exports.deleteCategory = async (req, res) => {
    try {
        await model.findByIdAndDelete(req.params.id)
        res.json({ 
            message: 'Category deleted',
            // get all categories from the user
            categories: await model.find({ user: req.params.user })
        
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}