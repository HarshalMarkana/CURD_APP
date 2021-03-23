var Userdb=require('../model/mode');

exports.create=(req,res)=>{
    //validation
    if(!req.body)
    {
        res.status(400).send({message:"Content cant be empty!"});
        return;
           
    }
    const user=new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status,
    })

    //save user to database
    user
        .save(user)
        .then(data=>{
            res.redirect('/add-user')
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "error at create user"
            });
        }); 
}

exports.find=(req,res)=>{
    if(req.query.id)
    {
        const id=req.query.id;
        Userdb.findById(id)
            .then(data=>{
                if(!data)
                {
                    res.status(404).send({message:`not found user ${id}`})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error Update user information"})
            })
    }
    else{
     Userdb.find()
     .then(user=>{
         res.send(user)
     }) 
     .catch(err=>{
         res.status(500).send({message:err.message ||"Error while find"});
     })
    }

}


exports.update=(req,res)=>{
    if(!req.body)
    {
        res.status(400).send({message:"Data to update cant be empty!"});
        return;
           
    }

    const id =req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data)
            {
                res.status(404).send({message:`cannot update user ${id}`})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error Update user information"})
        })
}


exports.delete=(req,res)=>{
    const id =req.params.id;
    Userdb.findByIdAndDelete(id)
    .then((result) => {
        if(!result)
        {
            res.status(404).send({message:`cannot delete user ${id}`})
        }
        else{
            res.send({message:"user deleted succefullyq"})
        }
    }).catch((err) => {
        res.status(500).send({
            message:`Could not delete user ${id}`
        })
    });
}

 