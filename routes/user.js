import express from 'express'
import modelUser from '../models/UserSchema.js'
import bcrypt from 'bcrypt'

const routes = express.Router()

routes.post('/add', (req, res) => {
    const user = req.body;
    console.log(user)
    bcrypt.genSalt(5, (err, salt) => {
        if (!err) {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (!err) {
                    user.password = hash
                    modelUser.create(user)
                        .then((u) => {
                            res.status(201).json(u)
                        })
                        .catch((e) => {
                            res.status(510).send('Erreur insertion')
                        })

                }
            })
        }
    })


})

routes.get('/checklogin', (req, res) => {
    const user = req.body

    modelUser.findOne({login: user.login})
        .then((u) => {
            if(u){
                bcrypt.compare(user.password, u.password, (err, resultat) =>{
                    if(resultat)    
                        res.send('Authenfication Reussie')
                    else
                        res.send('Echec Authenfication')
                })
            }
        })


})

routes.get('/checkmail', (req, res) => {
    const user = req.body

    modelUser.findOne({email: user.email})
        .then((u) => {
            if(u){
                bcrypt.compare(user.password, u.password, (err, resultat) =>{
                    if(resultat)    
                        res.send('Authenfication Reussie')
                    else
                        res.send('Echec Authenfication')
                })
            }
        })
})

export default routes