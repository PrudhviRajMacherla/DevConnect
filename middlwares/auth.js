
// middlware
const auth = (req,res,next)=>{
    
    const {sn}= req.query;
    console.log(req.query);
    if(sn!=123){
        res.send('unauthorrize')
    }
    else{
        next();
    }
}

const isadmin= (req,res,next)=>{
    console.log(req.query);
    const {role}= req.query;
    if(role!='admin'){
        res.send('not admin')
    }
    else{

        next();
    }
}
module.exports = {auth,isadmin};