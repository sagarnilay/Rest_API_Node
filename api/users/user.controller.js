const { create, getUserByUserId, getUsers, getUserByUserName } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { json } = require("express");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        create(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        });
    },
    getUserByUserId: (req, res) => {
        const id=req.params.id;
        getUserByUserId(id, (err, results)=>{
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success:0, 
                    message: "Record not found"
                });
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results)=>{
            if (err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserName(body.username, (err, results)=>{
            if (err){
                console.log(err);
            }
            if (!results){
                return res.json({
                    success:0,
                    data:"Invalid username or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result){
                results.password = undefined;
                const jsontoken = sign({result: results}, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success:1,
                    message: "Login successful",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success:0,
                    data:"Invalid username or password"
                });
            }
        });
    }
}