const {users,sequelize}=require('../models');
const bycryptjs = require("bcryptjs");
const checklogin = async (req, res) => {
    try {
        const {userName,password} = req.body;
        const checkAccount = await users.findOne({
            attributes: {
                exclude: ["birthday","image","desc", "createdAt", "updatedAt"],
              },
            where: {userName}
        });
        if(checkAccount){
            const isAuth = bycryptjs.compareSync(password, checkAccount.password);
            const userLogin = await users.findOne({
                attributes: {
                    exclude: ["birthday","image","desc","password", "createdAt", "updatedAt"],
                  },
                where: {userName}
            });
            if(isAuth){
                res.status(200).send({userLogin,message:"login successfully"});
            }else{
                res.status(404).send({message:"User name or password isn't correct!!!"});
            }
        }       
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports ={
    checklogin
}