/* Externals */
const router = require("express").Router()

module.exports = ({ api }) => {
    
    router.post('/groups/:id/subscribers', async (req, res) => {
        
        var creation = await api.groups.subscribers.add(req.params.id, {
            "email": req.body.email,
            "name": req.body.name
        })
        
        res.json(creation)
    })
    
    return router;
}