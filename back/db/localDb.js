const localDb = {
    user:[],
    player:[],
    plays:[]
};

module.exports= function repository(table){
    return {
        create(model){
            if(model != undefined && model != null){
                model = {...model, id:localDb[table].length}
                localDb[table].push(model);
                return true;
            }
            return false;
        },
        delete(id){
            if(localDb[table][id] != undefined && localDb[table][id] != null){
                var newArray = localDb[table].reduce((ac, cu)=>{
                    if(cu.id != id){
                        cu.id=ac.length;
                        ac.push(cu);
                    }
                    localDb[table]=newArray??[];
                }, []);
                return true;
            }
            return false;
        },
        filter(){
            return localDb[table];
        },
        update(model){
            if(model != undefined && model != null){
                localDb[table][model.id] = model;
                return true;
            }
            return false;
        }
    }
}

