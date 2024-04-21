const service= require("../services/userService");

class userController{
    getAll(req, res){
        return res.json(service.filter());
    }

    create(req, res){
        return res.json(service.create(req.body));
    }
    
    delete(req, res){
        return res.json(service.delete(req.query.id));
    }

    update(req, res){
        return res.json(service.update(req.body));
    }
}

module.exports = new userController();