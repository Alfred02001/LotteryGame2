const repository = require("../db/localDb");
const table = 'user';

class userService{

    create(model){
      if(repository(table).create(model)){
        return model;
      }
      return undefined;
    }

    delete(id){
        if(repository(table).delete(id)){
            return id;
        }
        return undefined;
    }

    update(model){
        if(repository(table).update(model)){
            return model;
        }
        return undefined;
    }

    filter(){
        return repository(table).filter();
    }
}

module.exports = new userService();
