const nodemailer = require('nodemailer')
const hbs = require('nodemailer')
const path = require('path')
const mail = require('../config/mail.json')

const transport = nodemailer.createTransport({
  host: mail.host,
  port: mail.port,
  auth: {
    user: mail.user,
    pass: mail.pass
  }
});

transport.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/resources/mail'),
  extName: '.html'
}))

module.exports = transport
