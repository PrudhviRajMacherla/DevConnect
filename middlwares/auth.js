
// middlware
const auth = (req,res,next)=>{
    console.log('in auth middleware')
    const {sn}= req.params;
    if(sn!=123){
        res.send('unauthorrize')
    }
    else{
        next();
    }
}

const isadmin= (req,res,next)=>{
    console.log('in isadmin midllware')
    const {role}= req.params;
    if(role!='admin'){
        res.send('not admin')
    }
    else{

        next();
    }
}
module.exports = {auth,isadmin};