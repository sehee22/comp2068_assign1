'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')


router.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
});

router.get('/:page', function (req, res) {
    if (req.params.page == 'index') {
        res.render('index', { title: 'Home' });
    }  
    else if (req.params.page == 'about') {
        res.render('about', { title: 'About Me' });
    }      
    else if (req.params.page == 'projects') {
        res.render('projects', { title: 'Projects' });
    }    
    else if (req.params.page == 'services') {
        res.render('services', { title: 'Services' });
    }  
    else if (req.params.page == 'contact') {
        res.render('contact', { title: 'Contact Me' });
    }
    else if (req.params.page == 'sent') {
        var name = req.query.name;
        var email = req.query.email;
        var message = req.query.message;


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'comp2068.mail@gmail.com',
                pass: 'P@$$w0rd200389459.'
            }
        });

        var mailOption = {
            to: 'comp2068.mail@gmail.com',
            subject: 'Email from Express Portfolio Site',
            html: '<h3>' + name + '(' +  email + ')</h3><br /><p>' + message + '</p>'

        };

        transporter.sendMail(mailOption, function (err, info) {
            if (err) {
                console.error('Send Mail error : ', err);
            }
            else {
                console.log('Message sent : ', info);
            }
        });

        res.render('sent', { title: 'Mail Sent'});
    }
});

module.exports = router;
