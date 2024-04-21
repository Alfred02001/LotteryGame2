const repository = require("../db/localDb");
const table = 'plays';

class playSerivice{

    create(model){
        if(repository(table).create(model)){
            return model;
        }
        return undefined;
    }

}
module.exports = new playSerivice();