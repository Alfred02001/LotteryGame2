const service= require("../services/userService");

class userController{
    getAll(req, res){
        (async ()=>{
            const result = await service.filter();
            res.json(result);
        })();
    }

    create(req, res){
        res.json(service.create(req.body));
    }
    
    delete(req, res){
        res.json(service.delete(req.query.id));
    }

    update(req, res){
        res.json(service.update(req.body));
    }
}

module.exports = new userController();