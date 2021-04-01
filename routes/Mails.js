const express = require('express')
const mails = express.Router()
const mongoose = require('mongoose')
const protectRoute = require('../securityToken/verifyToken')
const mailSchema = require('../models/Mail')
const clientSchema = require('../models/Clients')
const promotionSchema = require('../models/Promotions')
const productSchema = require('../models/Products')
const uploadS3 = require('../common-midleware/index')

const endpointMail = require('../private/endpointMail')
const email = require('../modelsMail/Mails')
const mailCredentials = require('../private/mail-credentials')
const Mails = new email(mailCredentials)
const cors = require('cors')
const { json } = require('express')
mails.use(cors())

mails.get('/mailPromotions/:id', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Mail = conn.model('mails', mailSchema)
    const Client = conn.model('clients', clientSchema)
    const Promotion = conn.model('promotions', promotionSchema)
    Mail.find()
    .then(MailData => {
        if (MailData.length > 0) {
          Client.find()
          .then(client => {
              var sendMails = ''
              for (let index = 0; index < client.length; index++) {
                  const element = client[index];
                  if (index > 0) {
                      sendMails = sendMails+', '+element.mail
                  }else{
                      sendMails = element.mail
                  }
              }
              Promotion.findById(req.params.id)
              .then(promotion => {
                  const mail = {
                      from: 'carlos.gomes349@gmail.com',
                      bcc: sendMails,
                      subject: 'Nueva promoción de '+MailData[0].website,
                      html: `
                      <!doctype html>
                      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                        <head>
                          <title>
                            
                          </title>
                          <!--[if !mso]><!-- -->
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <!--<![endif]-->
                          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <style type="text/css">
                            #outlook a { padding:0; }
                            .ReadMsgBody { width:100%; }
                            .ExternalClass { width:100%; }
                            .ExternalClass * { line-height:100%; }
                            body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
                            table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
                            img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
                            p { display:block;margin:13px 0; }
                          </style>
                          <!--[if !mso]><!-->
                          <style type="text/css">
                            @media only screen and (max-width:480px) {
                              @-ms-viewport { width:320px; }
                              @viewport { width:320px; }
                            }
                          </style>
                          <!--<![endif]-->
                          <!--[if mso]>
                          <xml>
                          <o:OfficeDocumentSettings>
                            <o:AllowPNG/>
                            <o:PixelsPerInch>96</o:PixelsPerInch>
                          </o:OfficeDocumentSettings>
                          </xml>
                          <![endif]-->
                          <!--[if lte mso 11]>
                          <style type="text/css">
                            .outlook-group-fix { width:100% !important; }
                          </style>
                          <![endif]-->
                          
                        <!--[if !mso]><!-->
                          <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css">
                  <link href="https://fonts.googleapis.com/css?family=Helvetica" rel="stylesheet" type="text/css">
                          <style type="text/css">
                            @import url(https://fonts.googleapis.com/css?family=Bitter);
                  @import url(https://fonts.googleapis.com/css?family=Helvetica);
                          </style>
                        <!--<![endif]-->
                      <style type="text/css">
                        @media only screen and (min-width:480px) {
                          .mj-column-per-50 { width:50% !important; max-width: 50%; }
                  .mj-column-per-100 { width:100% !important; max-width: 100%; }
                        }
                      </style>
                          <style type="text/css">
                      @media only screen and (max-width:480px) {
                        table.full-width-mobile { width: 100% !important; }
                        td.full-width-mobile { width: auto !important; }
                      }
                    
                          </style>
                          <style type="text/css">.hide_on_mobile { display: none !important;} 
                          @media only screen and (min-width: 480px) { .hide_on_mobile { display: block !important;} }
                          .hide_section_on_mobile { display: none !important;} 
                          @media only screen and (min-width: 480px) { .hide_section_on_mobile { display: table !important;} }
                          .hide_on_desktop { display: block !important;} 
                          @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
                          .hide_section_on_desktop { display: table !important;} 
                          @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
                          [owa] .mj-column-per-100 {
                              width: 100%!important;
                            }
                            [owa] .mj-column-per-50 {
                              width: 50%!important;
                            }
                            [owa] .mj-column-per-33 {
                              width: 33.333333333333336%!important;
                            }
                            p {
                                margin: 0px;
                            }
                            @media only print and (min-width:480px) {
                              .mj-column-per-100 { width:100%!important; }
                              .mj-column-per-40 { width:40%!important; }
                              .mj-column-per-60 { width:60%!important; }
                              .mj-column-per-50 { width: 50%!important; }
                              mj-column-per-33 { width: 33.333333333333336%!important; }
                              }</style>
                          
                        </head>
                        <body style="background-color:#3E3E3E;">
                        <div style="background-color:#3E3E3E;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#515151;background-color:#515151;width:100%;">
                          <tbody>
                            <tr>
                              <td>
                                
                          
                        <!--[if mso | IE]>
                        <table
                            align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                        >
                          <tr>
                            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                        <![endif]-->
                      
                          
                        <div style="Margin:0px auto;max-width:600px;">
                          
                          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                            <tbody>
                              <tr>
                                <td style="direction:ltr;font-size:0px;padding:3px 0px 3px 0px;text-align:center;vertical-align:top;">
                                  <!--[if mso | IE]>
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                  
                          <tr>
                        
                              <td
                                  class="" style="vertical-align:top;width:300px;"
                              >
                            <![endif]-->
                              
                        <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                          
                              <tr>
                                <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                                  
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:90px;">
                                
                        <img height="auto" src="${MailData[0].img[0].url}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="90">
                      
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      
                                </td>
                              </tr>
                            
                        </table>
                      
                        </div>
                      
                            <!--[if mso | IE]>
                              </td>
                            
                              <td
                                  class="" style="vertical-align:top;width:300px;"
                              >
                            <![endif]-->
                              
                        <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                          
                              <tr>
                                <td align="right" style="font-size:0px;padding:16px 9px 0px 0px;word-break:break-word;">
                                  
                        
                        <!--[if mso | IE]>
                        <table
                            align="right" border="0" cellpadding="0" cellspacing="0" role="presentation"
                        >
                          <tr>
                        
                                <td>
                              <![endif]-->
                                <table align="right" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  
                        <tr>
                          <td style="padding:4px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:35px;">
                              <tr>
                                <td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
                                  <a href="${MailData[0].instagram}" target="_blank">
                                      <img height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/rounded/instagram.png" style="border-radius:3px;display:block;" width="35">
                                    </a>
                                  </td>
                                </tr>
                            </table>
                          </td>
                          
                        </tr>
                      
                                </table>
                              <!--[if mso | IE]>
                                </td>
                              
                                <td>
                              <![endif]-->
                                <table align="right" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  
                        <tr>
                          <td style="padding:4px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:35px;">
                              <tr>
                                <td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
                                  <a href="${MailData[0].facebook}" target="_blank">
                                      <img height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/rounded/facebook.png" style="border-radius:3px;display:block;" width="35">
                                    </a>
                                  </td>
                                </tr>
                            </table>
                          </td>
                          
                        </tr>
                      
                                </table>
                              <!--[if mso | IE]>
                                </td>
                              
                                <td>
                              <![endif]-->
                                <table align="right" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                  
                        <tr>
                          <td style="padding:4px;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:35px;">
                              <tr>
                                <td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
                                  <a href="${MailData[0].twitter}" target="_blank">
                                      <img height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/rounded/twitter.png" style="border-radius:3px;display:block;" width="35">
                                    </a>
                                  </td>
                                </tr>
                            </table>
                          </td>
                          
                        </tr>
                      
                                </table>
                              <!--[if mso | IE]>
                                </td>
                              
                            </tr>
                          </table>
                        <![endif]-->
                      
                      
                                </td>
                              </tr>
                            
                        </table>
                      
                        </div>
                      
                            <!--[if mso | IE]>
                              </td>
                            
                          </tr>
                        
                                    </table>
                                  <![endif]-->
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                      
                        
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#515151;background-color:#515151;width:100%;">
                          <tbody>
                            <tr>
                              <td>
                        <!--[if mso | IE]>
                        <table
                            align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                        >
                          <tr>
                            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                        <![endif]-->
                        <div style="Margin:0px auto;max-width:600px;">
                          
                          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                            <tbody>
                              <tr>
                                <td style="direction:ltr;font-size:0px;padding:3px 0px 3px 0px;text-align:center;vertical-align:top;">
                                  <!--[if mso | IE]>
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                  
                          <tr>
                        
                              <td
                                  class="" style="vertical-align:top;width:600px;"
                              >
                            <![endif]-->
                              
                        <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                          
                              <tr>
                                <td align="center" style="font-size:0px;padding:3px 3px 3px 3px;word-break:break-word;">
                                  
                        <div style="font-family:Bitter, Georgia, serif;font-size:11px;line-height:1.5;text-align:center;color:#000000;">
                          <p style="font-family: Bitter, Georgia, serif;"><span style="font-size: 36px;"><strong>${promotion.name}</strong></span></p>
                        </div>
                      
                                </td>
                              </tr>
                            
                              <tr>
                                <td align="center" style="font-size:0px;padding:3px 3px 3px 3px;word-break:break-word;">
                                  
                        <div style="font-family:Bitter, Georgia, serif;font-size:11px;line-height:1.5;text-align:center;color:#000000;">
                          <p style="font-family: Bitter, Georgia, serif;"><span style="font-size:14px;">${promotion.description}.</span></p>
                        </div>
                      
                                </td>
                              </tr>
                            
                              <tr>
                                <td align="center" vertical-align="middle" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                  
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                          <tr>
                            <td align="center" bgcolor="#A7A7A7" role="presentation" style="border:0px #000 solid;border-radius:25px;cursor:auto;mso-padding-alt:10px 30px;background:#A7A7A7;" valign="middle">
                              <a href="${MailData[0].website}" style="display:inline-block;background:#A7A7A7;color:#1F1F1F;font-family:Bitter, Georgia, serif;font-size:15px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:10px 30px;mso-padding-alt:0px;border-radius:25px;" target="_blank">
                                VER MÁS
                              </a>
                            </td>
                          </tr>
                        </table>
                      
                                </td>
                              </tr>
                            
                        </table>
                      
                        </div>
                      
                            <!--[if mso | IE]>
                              </td>
                            
                          </tr>
                        
                                    </table>
                                  <![endif]-->
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div>
                        <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#515151;background-color:#515151;width:100%;">
                          <tbody>
                            <tr>
                              <td>
                                
                          
                        <!--[if mso | IE]>
                        <table
                            align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                        >
                          <tr>
                            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                        <![endif]-->
                        <div style="Margin:0px auto;max-width:600px;">
                          
                          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                            <tbody>
                              <tr>
                                <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                  <!--[if mso | IE]>
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                  
                          <tr>
                        
                              <td
                                  class="" style="vertical-align:top;width:600px;"
                              >
                            <![endif]-->
                              
                        <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                          
                              <tr>
                                <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                                  
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:600px;">
                                
                        <img height="auto" src="${promotion.image[0].url}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="600">
                      
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      
                                </td>
                              </tr>
                            
                        </table>
                      
                        </div>
                      
                            <!--[if mso | IE]>
                              </td>
                            
                          </tr>
                        
                                    </table>
                                  <![endif]-->
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div> 
                        <!--[if mso | IE]>
                            </td>
                          </tr>
                        </table>
                        <![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        </div>
                        </body>
                      </html>
                      `
                  }
                  Mails.sendMail(mail)
                  .then(send => {
                      console.log(send)
                      res.json({status: send})
                  }).catch(err => {
                      res.send(err)
                  })
              }).catch(err => {
                  res.send(err)
              })
          }).catch(err => {
              res.send(err)
          })
        }else{
            res.json({status: 'register mail'})
        }
    }).catch(err => {
        res.send(err)
    })
})

mails.get('/mailRegister/:id', (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Mail = conn.model('mails', mailSchema)
    const Client = conn.model('clients', clientSchema)
    const Product = conn.model('products', productSchema)
    Mail.find()
    .then(Mail => {
        if (Mail > 0) {
            Client.findById(req.params.id)
            .then(client => {
                Product.find().sort({createdAt: -1}).limit(4)
                .then(products => {
                    const mailObject = {
                        from: 'carlos.gomes349@gmail.com',
                        to: client.mail,
                        subject: 'Bienvenido a '+Mail[0].website,
                        html: `
                            <!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
                                <title>
                                
                                </title>
                                <!--[if !mso]><!-- -->
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <!--<![endif]-->
                                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                <style type="text/css">
                                #outlook a { padding:0; }
                                .ReadMsgBody { width:100%; }
                                .ExternalClass { width:100%; }
                                .ExternalClass * { line-height:100%; }
                                body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
                                table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
                                img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
                                p { display:block;margin:13px 0; }
                                </style>
                                <!--[if !mso]><!-->
                                <style type="text/css">
                                @media only screen and (max-width:480px) {
                                    @-ms-viewport { width:320px; }
                                    @viewport { width:320px; }
                                }
                                </style>
                                <!--<![endif]-->
                                <!--[if mso]>
                                <xml>
                                <o:OfficeDocumentSettings>
                                <o:AllowPNG/>
                                <o:PixelsPerInch>96</o:PixelsPerInch>
                                </o:OfficeDocumentSettings>
                                </xml>
                                <![endif]-->
                                <!--[if lte mso 11]>
                                <style type="text/css">
                                .outlook-group-fix { width:100% !important; }
                                </style>
                                <![endif]-->
                                
                            <!--[if !mso]><!-->
                                <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
                        <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
                                <style type="text/css">
                                @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
                        @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
                                </style>
                            <!--<![endif]-->
                        
                            
                                
                            <style type="text/css">
                            @media only screen and (min-width:480px) {
                                .mj-column-per-100 { width:100% !important; max-width: 100%; }
                        .mj-column-per-50 { width:50% !important; max-width: 50%; }
                            }
                            </style>
                            
                        
                                <style type="text/css">
                                
                                
                        
                            @media only screen and (max-width:480px) {
                            table.full-width-mobile { width: 100% !important; }
                            td.full-width-mobile { width: auto !important; }
                            }
                        
                                </style>
                                <style type="text/css">.hide_on_mobile { display: none !important;} 
                                @media only screen and (min-width: 480px) { .hide_on_mobile { display: block !important;} }
                                .hide_section_on_mobile { display: none !important;} 
                                @media only screen and (min-width: 480px) { .hide_section_on_mobile { display: table !important;} }
                                .hide_on_desktop { display: block !important;} 
                                @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
                                .hide_section_on_desktop { display: table !important;} 
                                @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
                                [owa] .mj-column-per-100 {
                                    width: 100%!important;
                                }
                                [owa] .mj-column-per-50 {
                                    width: 50%!important;
                                }
                                [owa] .mj-column-per-33 {
                                    width: 33.333333333333336%!important;
                                }
                                p {
                                    margin: 0px;
                                }
                                @media only print and (min-width:480px) {
                                    .mj-column-per-100 { width:100%!important; }
                                    .mj-column-per-40 { width:40%!important; }
                                    .mj-column-per-60 { width:60%!important; }
                                    .mj-column-per-50 { width: 50%!important; }
                                    mj-column-per-33 { width: 33.333333333333336%!important; }
                                    }</style>
                                
                            </head>
                            <body style="background-color:#E0E0E0;">
                            <div style="background-color:#E0E0E0;">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#4F4F4F;background-color:#4F4F4F;width:100%;">
                                <tbody>
                                <tr>
                                    <td>
                            <!--[if mso | IE]>
                            <table
                                align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                            >
                                <tr>
                                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                            <![endif]-->
                            <div style="Margin:0px auto;max-width:600px;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                <tbody>
                                    <tr>
                                    <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0"> 
                                <tr>
                                    <td
                                    class="" style="vertical-align:top;width:600px;"
                                    >
                                <![endif]-->
                                    
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                
                                    <tbody><tr>
                                    <td align="center" style="font-size:0px;padding:25px 25px 25px 25px;word-break:break-word;">
                                        
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                <tbody>
                                <tr>
                                    <td style="width:72px;">
                            <img height="auto" src="${Mail[0].img[0].url}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="72">
                            
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">    
                            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                                <h2 style="color: #32C1E9; text-align: center; line-height: 100%;"><span style="color: #ecf0f1;">Hola &#xA1;${client.name} ${client.lastName}! Bienvenido a nuestra tienda en linea.</span></h2>
                            </div>
                                    </td>
                                    </tr>
                            </tbody></table>
                            </div>
                                <!--[if mso | IE]>
                                    </td>
                                
                                </tr>
                                        </table>
                                        <![endif]-->
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div> 
                            <!--[if mso | IE]>
                                </td>
                                </tr>
                            </table>
                            <![endif]-->
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!--[if mso | IE]>
                            <table
                                align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                            >
                                <tr>
                                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                            <![endif]-->
                            <div style="background:#FFFFFF;background-color:#FFFFFF;Margin:0px auto;max-width:600px;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                                <tbody>
                                    <tr>
                                    <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">  
                                <tr>
                                    <td
                                    class="" style="vertical-align:top;width:600px;"
                                    >
                                <![endif]--> 
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                    <tbody><tr>
                                    <td align="center" style="font-size:0px;padding:0px 20px 0px 20px;word-break:break-word;">
                                        
                            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:center;color:#000000;">
                                <h3 style="font-family: &apos;Cabin&apos;, sans-serif; font-size: 20px; color: #555555; line-height: 100%;">Alguno de nuestros productos.</h3>
                            </div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td style="font-size:0px;padding:10px 25px;padding-top:10px;padding-right:10px;word-break:break-word;">
                                        
                            <p style="border-top:solid 1px #000000;font-size:1;margin:0px auto;width:100%;">
                            </p>
                            <!--[if mso | IE]>
                                <table
                                align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #000000;font-size:1;margin:0px auto;width:565px;" role="presentation" width="565px"
                                >
                                <tr>
                                    <td style="height:0;line-height:0;">
                                    &nbsp;
                                    </td>
                                </tr>
                                </table>
                            <![endif]-->
                                    </td>
                                    </tr>
                            </tbody></table>
                            </div>
                                <!--[if mso | IE]>
                                    </td>
                                </tr>
                                        </table>
                                        <![endif]-->
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            <!--[if mso | IE]>
                                </td>
                                </tr>
                            </table>
                            
                            <table
                                align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                            >
                                <tr>
                                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                            <![endif]-->
                            <div style="background:#FFFFFF;background-color:#FFFFFF;Margin:0px auto;max-width:600px;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                                <tbody>
                                    <tr>
                                    <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">    
                                <tr>
                                    <td
                                    class="" style="vertical-align:top;width:300px;"
                                    >
                                <![endif]-->
                            <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                
                                    <tbody><tr>
                                    <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                                        
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                <tbody>
                                <tr>
                                    <td style="width:255px;">
                                    
                            <img height="auto" src="${endpointMail}/static/products/${products[0].images[0]}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="255">
                            
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            
                                    </td>
                                    </tr>
                                
                                    <tr>
                                    <td align="left" style="font-size:0px;padding:13px 13px 13px 13px;word-break:break-word;">
                                        
                            <div style="font-family:Cabin, sans-serif;font-size:15px;line-height:1.5;text-align:left;color:#676767;">
                                <h2 style="color: #32C1E9; line-height: 100%;"><span style="color: #000000;">${products[0].name}</span></h2>
                        <p>${products[0].description}.</p>
                            </div>
                            
                                    </td>
                                    </tr>
                                
                                    <tr>
                                    <td align="left" vertical-align="middle" style="font-size:0px;padding:12px 20px 12px 20px;word-break:break-word;">
                                        
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                <tbody><tr>
                                <td align="center" bgcolor="#232323" role="presentation" style="border:none;border-radius:24px;cursor:auto;mso-padding-alt:10px 25px;background:#232323;" valign="middle">
                                    <a href="${Mail[0].website}?productId=${products[0]._id}" style="display:inline-block;background:#232323;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:24px;" target="_blank">
                                    <div>Ver m&#xE1;s</div>
                                    </a>
                                </td>
                                </tr>
                            </tbody></table>
                            
                                    </td>
                                    </tr>
                                
                            </tbody></table>
                            
                            </div>
                            
                                <!--[if mso | IE]>
                                    </td>
                                
                                    <td
                                    class="" style="vertical-align:top;width:300px;"
                                    >
                                <![endif]-->
                                    
                            <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                
                                    <tbody><tr>
                                    <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                                        
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                <tbody>
                                <tr>
                                    <td style="width:255px;">
                                    
                            <img height="auto" src="${endpointMail}/static/products/${products[1].images[0]}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="255">
                            
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            
                                    </td>
                                    </tr>
                                
                                    <tr>
                                    <td align="left" style="font-size:0px;padding:13px 13px 13px 13px;word-break:break-word;">
                                        
                            <div style="font-family:Cabin, sans-serif;font-size:15px;line-height:1.5;text-align:left;color:#676767;">
                                <h2 style="color: #32C1E9; line-height: 100%;"><span style="color: #000000;">${products[1].name}</span></h2>
                        <p>${products[1].description}.</p>
                            </div>
                            
                                    </td>
                                    </tr>
                                
                                    <tr>
                                    <td align="left" vertical-align="middle" style="font-size:0px;padding:12px 20px 12px 20px;word-break:break-word;">
                                        
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                <tbody><tr>
                                <td align="center" bgcolor="#232323" role="presentation" style="border:none;border-radius:24px;cursor:auto;mso-padding-alt:10px 25px;background:#232323;" valign="middle">
                                    <a href="${Mail[0].website}?productId=${products[1]._id}" style="display:inline-block;background:#232323;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:24px;" target="_blank">
                                    <div>Ver m&#xE1;s</div>
                                    </a>
                                </td>
                                </tr>
                            </tbody></table>
                            
                                    </td>
                                    </tr>
                                
                            </tbody></table>
                            
                            </div>
                            
                                <!--[if mso | IE]>
                                    </td>
                                
                                </tr>
                            
                                        </table>
                                        <![endif]-->
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                                
                            </div>
                            
                            
                            <!--[if mso | IE]>
                                </td>
                                </tr>
                            </table>
                            
                            <table
                                align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                            >
                                <tr>
                                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                            <![endif]-->
                            
                            
                            <div style="background:#FFFFFF;background-color:#FFFFFF;Margin:0px auto;max-width:600px;">
                                
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                                <tbody>
                                    <tr>
                                    <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        
                                <tr>
                            
                                    <td
                                    class="" style="vertical-align:top;width:300px;"
                                    >
                                <![endif]-->
                                    
                            <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                
                                    <tbody><tr>
                                    <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                                        
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                <tbody>
                                <tr>
                                    <td style="width:255px;">
                                    
                            <img height="auto" src="${endpointMail}/static/products/${products[2].images[0]}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="255">
                            
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            
                                    </td>
                                    </tr>
                                
                                    <tr>
                                    <td align="left" style="font-size:0px;padding:13px 13px 13px 13px;word-break:break-word;">
                                        
                            <div style="font-family:Cabin, sans-serif;font-size:15px;line-height:1.5;text-align:left;color:#676767;">
                                <h2 style="color: #32C1E9; line-height: 100%;"><span style="color: #000000;">${products[2].name}</span></h2>
                        <p>${products[2].description}.</p>
                            </div>
                            
                                    </td>
                                    </tr>
                                
                                    <tr>
                                    <td align="left" vertical-align="middle" style="font-size:0px;padding:12px 20px 12px 20px;word-break:break-word;">
                                        
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                <tbody><tr>
                                <td align="center" bgcolor="#232323" role="presentation" style="border:none;border-radius:24px;cursor:auto;mso-padding-alt:10px 25px;background:#232323;" valign="middle">
                                    <a href="${Mail[0].website}?productId=${products[2]._id}" style="display:inline-block;background:#232323;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:24px;" target="_blank">
                                    <div>Ver m&#xE1;s</div>
                                    </a>
                                </td>
                                </tr>
                            </tbody></table>
                            
                                    </td>
                                    </tr>
                                
                            </tbody></table>
                            
                            </div>
                            
                                <!--[if mso | IE]>
                                    </td>
                                
                                    <td
                                    class="" style="vertical-align:top;width:300px;"
                                    >
                                <![endif]-->
                                    
                            <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                
                                    <tbody><tr>
                                    <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                                        
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                <tbody>
                                <tr>
                                    <td style="width:255px;">
                                    
                            <img height="auto" src="${endpointMail}/static/products/${products[3].images[0]}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="255">
                            
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            
                                    </td>
                                    </tr>
                                
                                    <tr>
                                    <td align="left" style="font-size:0px;padding:13px 13px 13px 13px;word-break:break-word;">
                                        
                            <div style="font-family:Cabin, sans-serif;font-size:15px;line-height:1.5;text-align:left;color:#676767;">
                                <h2 style="color: #32C1E9; line-height: 100%;"><span style="color: #000000;">${products[3].name}</span></h2>
                        <p>${products[3].description}.</p>
                            </div>
                            
                                    </td>
                                    </tr>
                                
                                    <tr>
                                    <td align="left" vertical-align="middle" style="font-size:0px;padding:12px 20px 12px 20px;word-break:break-word;">
                                        
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                <tbody><tr>
                                <td align="center" bgcolor="#232323" role="presentation" style="border:none;border-radius:24px;cursor:auto;mso-padding-alt:10px 25px;background:#232323;" valign="middle">
                                    <a href="${Mail[0].website}?productId=${products[3]._id}" style="display:inline-block;background:#232323;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:24px;" target="_blank">
                                    <div>Ver m&#xE1;s</div>
                                    </a>
                                </td>
                                </tr>
                            </tbody></table>
                            
                                    </td>
                                    </tr>
                                
                            </tbody></table>
                            
                            </div>
                            
                                <!--[if mso | IE]>
                                    </td>
                                
                                </tr>
                            
                                        </table>
                                        <![endif]-->
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                                
                            </div>
                            
                            
                            <!--[if mso | IE]>
                                </td>
                                </tr>
                            </table>
                            <![endif]-->
                            
                            
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                <tbody>
                                <tr>
                                    <td>
                                    
                                
                            <!--[if mso | IE]>
                            <table
                                align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                            >
                                <tr>
                                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                            <![endif]-->
                            
                                
                            <div style="Margin:0px auto;max-width:600px;">
                                
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                <tbody>
                                    <tr>
                                    <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        
                                <tr>
                            
                                    <td
                                    class="" style="vertical-align:top;width:600px;"
                                    >
                                <![endif]-->
                                    
                            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                
                                    <tbody><tr>
                                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                        
                            
                            <!--[if mso | IE]>
                            <table
                                align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                            >
                                <tr>
                            
                                    <td>
                                    <![endif]-->
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                        
                            <tbody><tr>
                                <td style="padding:4px;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:35px;">
                                    <tbody><tr>
                                    <td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
                                        <a href="${Mail[0].facebook}" target="_blank">
                                            <img height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/outlined/facebook.png" style="border-radius:3px;display:block;" width="35">
                                        </a>
                                        </td>
                                    </tr>
                                </tbody></table>
                                </td>
                                
                            </tr>
                            
                                    </tbody></table>
                                    <!--[if mso | IE]>
                                    </td>
                                    
                                    <td>
                                    <![endif]-->
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                        
                            <tbody><tr>
                                <td style="padding:4px;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:35px;">
                                    <tbody><tr>
                                    <td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
                                        <a href="${Mail[0].twitter}" target="_blank">
                                            <img height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/outlined/twitter.png" style="border-radius:3px;display:block;" width="35">
                                        </a>
                                        </td>
                                    </tr>
                                </tbody></table>
                                </td>
                                
                            </tr>
                            
                                    </tbody></table>
                                    <!--[if mso | IE]>
                                    </td>
                                    
                                    <td>
                                    <![endif]-->
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                        
                            <tbody><tr>
                                <td style="padding:4px;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:35px;">
                                    <tbody><tr>
                                    <td style="font-size:0;height:35px;vertical-align:middle;width:35px;">
                                        <a href="${Mail[0].instagram}" target="_blank">
                                            <img height="35" src="https://s3-eu-west-1.amazonaws.com/ecomail-assets/editor/social-icos/outlined/instagram.png" style="border-radius:3px;display:block;" width="35">
                                        </a>
                                        </td>
                                    </tr>
                                </tbody></table>
                                </td>
                                
                            </tr>
                            
                                    </tbody></table>
                                    <!--[if mso | IE]>
                                    </td>
                                    
                                </tr>
                                </table>
                            <![endif]-->
                            
                            
                                    </td>
                                    </tr>
                                
                                    <tr>
                                    <td style="font-size:0px;padding:10px 25px;padding-top:10px;padding-right:100px;padding-bottom:10px;padding-left:100px;word-break:break-word;">
                                        
                            <p style="border-top:solid 1px #CCCCCC;font-size:1;margin:0px auto;width:100%;">
                            </p>
                            
                            <!--[if mso | IE]>
                                <table
                                align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #CCCCCC;font-size:1;margin:0px auto;width:400px;" role="presentation" width="400px"
                                >
                                <tr>
                                    <td style="height:0;line-height:0;">
                                    &nbsp;
                                    </td>
                                </tr>
                                </table>
                            <![endif]-->
                            
                            
                                    </td>
                                    </tr>
                                
                            </tbody></table>
                            
                            </div>
                            
                                <!--[if mso | IE]>
                                    </td>
                                
                                </tr>
                            
                                        </table>
                                        <![endif]-->
                                    </td>
                                    </tr>
                                </tbody>
                                </table>     
                            </div>     
                            <!--[if mso | IE]>
                                </td>
                                </tr>
                            </table>
                            <![endif]-->
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                        </body></html>
                        `
                    }
                    Mails.sendMail(mailObject)
                    .then(send => {
                        console.log(send)
                        res.json({status: send})
                    }).catch(err => {
                        res.send(err)
                    })
                }).catch(err => {
                    res.send(err)
                })
            }).catch(err => {
                res.send(err)
            })
        }else{
            res.json({status: 'register mail'})
        }
    }).catch(err => {
        res.send(err)
    })
})

mails.post('/', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Mail = conn.model('mails', mailSchema)
    const data = {
        mail: req.body.mail,
        website: req.body.website,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        whatsapp: req.body.whatsapp,
        location: req.body.location,
        companyName: req.body.companyname,
        img: req.body.img
    }
    Mail.create(data)
    .then(registerMail => {
        if (registerMail) {
            res.json({status: 'mail register', token: req.requestToken})
        }
    }).catch(err => {
        res.send(err)
    })
})

mails.get('/ifMail', (req, res) => {
  const database = req.headers['x-database-connect'];
  const conn = mongoose.createConnection('mongodb://localhost/'+database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  const Mail = conn.model('mails', mailSchema)

  Mail.find()
  .then(getMails => {
    if (getMails.length > 0) {
      res.json({status: 'mail exist', mailData: getMails[0]})
    }else{
      res.json({status: 'mail does exist'})
    }
  }).catch(err => {
    res.send(err)
  })
})

mails.post('/uploadImage', uploadS3.single("file"), (req, res) => {
  res.json({status:"done", name:req.file.location, url:req.file.location, thumbUrl:req.file.location})
})

mails.get

mails.put('/:id', protectRoute, (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Mail = conn.model('mails', mailSchema)
    Mail.findByIdAndUpdate(req.params.id, {
        $set: {
            mail: req.body.mail,
            website: req.body.website,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            twitter: req.body.twitter,
            whatsapp: req.body.whatsapp,
            location: req.body.location,
            companyName: req.body.companyname,
            img: req.body.img
        }
    }).then(mailEdit => {
        if (mailEdit) {
            res.json({status: 'mail edit', token: req.requestToken})
        }
    }).catch(err => {
        res.send(err)
    })
})

mails.post('/contacMail', (req, res) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Mail = conn.model('mails', mailSchema)
    Mail.find()
    .then(mailData =>{
        if (mailData.length > 0) {
            const mail = {
                from: mailData[0].companyName,
                to: req.body.email,
                subject: mailData[0].companyName + ' - '+ 'Información a cliente',
                html: `
                <!doctype html>
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                    <title>
                    
                    </title>
                    <!--[if !mso]><!-- -->
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <!--<![endif]-->
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style type="text/css">
                    #outlook a { padding:0; }
                    .ReadMsgBody { width:100%; }
                    .ExternalClass { width:100%; }
                    .ExternalClass * { line-height:100%; }
                    body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
                    table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
                    img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
                    p { display:block;margin:13px 0; }
                    </style>
                    <!--[if !mso]><!-->
                    <style type="text/css">
                    @media only screen and (max-width:480px) {
                        @-ms-viewport { width:320px; }
                        @viewport { width:320px; }
                    }
                    </style>
                    <!--<![endif]-->
                    <!--[if mso]>
                    <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                    <!--[if lte mso 11]>
                    <style type="text/css">
                    .outlook-group-fix { width:100% !important; }
                    </style>
                    <![endif]-->
                    
                <!--[if !mso]><!-->
                    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
                    <style type="text/css">
                    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
            @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
                    </style>
                <!--<![endif]-->

                
                    
                <style type="text/css">
                @media only screen and (min-width:480px) {
                    .mj-column-per-100 { width:100% !important; max-width: 100%; }
                }
                </style>
                
            
                    <style type="text/css">
                    
                    

                @media only screen and (max-width:480px) {
                table.full-width-mobile { width: 100% !important; }
                td.full-width-mobile { width: auto !important; }
                }
            
                    </style>
                    <style type="text/css">.hide_on_mobile { display: none !important;} 
                    @media only screen and (min-width: 480px) { .hide_on_mobile { display: block !important;} }
                    .hide_section_on_mobile { display: none !important;} 
                    @media only screen and (min-width: 480px) { .hide_section_on_mobile { display: table !important;} }
                    .hide_on_desktop { display: block !important;} 
                    @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
                    .hide_section_on_desktop { display: table !important;} 
                    @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
                    [owa] .mj-column-per-100 {
                        width: 100%!important;
                    }
                    [owa] .mj-column-per-50 {
                        width: 50%!important;
                    }
                    [owa] .mj-column-per-33 {
                        width: 33.333333333333336%!important;
                    }
                    p {
                        margin: 0px;
                    }
                    @media only print and (min-width:480px) {
                        .mj-column-per-100 { width:100%!important; }
                        .mj-column-per-40 { width:40%!important; }
                        .mj-column-per-60 { width:60%!important; }
                        .mj-column-per-50 { width: 50%!important; }
                        mj-column-per-33 { width: 33.333333333333336%!important; }
                        }</style>
                    
                </head>
                <body style="background-color:#FFFFFF;">
                    
                    
                <div style="background-color:#FFFFFF;">
                    
                <table align="center" class="hide_section_on_mobile" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffcb05;background-color:#ffcb05;width:100%;">
                    <tbody>
                    <tr>
                        <td>
                        
                    
                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="hide_section_on_mobile-outlook" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                
                    
                <div style="Margin:0px auto;max-width:600px;">
                    
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                        <tr>
                        <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        
                <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    
                        <tr>
                        <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                            
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                    <tbody>
                    <tr>
                        <td style="width:180px;">
                        
                <img height="auto" src="${mailData[0].img[0].url}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="180">
                
                        </td>
                    </tr>
                    </tbody>
                </table>
                
                        </td>
                        </tr>
                    
                </table>
                
                </div>
                
                    <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    
                </div>
                
                    
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                <![endif]-->
                
                
                        </td>
                    </tr>
                    </tbody>
                </table>
                
                <table align="center" class="hide_section_on_desktop" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffcb05;background-color:#ffcb05;width:100%;">
                    <tbody>
                    <tr>
                        <td>
                        
                    
                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="hide_section_on_desktop-outlook" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                
                    
                <div style="Margin:0px auto;max-width:600px;">
                    
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                        <tr>
                        <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        
                <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    
                        <tr>
                        <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                            
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                    <tbody>
                    <tr>
                        <td style="width:114px;">
                        
                <img height="auto" src="${mailData[0].img[0].url}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="114">
                
                        </td>
                    </tr>
                    </tbody>
                </table>
                
                        </td>
                        </tr>
                    
                </table>
                
                </div>
                
                    <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    
                </div>
                
                    
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                <![endif]-->
                
                
                        </td>
                    </tr>
                    </tbody>
                </table>
                
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                    <tr>
                        <td>
                        
                    
                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                
                    
                <div style="Margin:0px auto;max-width:600px;">
                    
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                        <tr>
                        <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        
                <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    
                        <tr>
                        <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                            
                <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                    <h1 style="font-family: 'Cabin', sans-serif; text-align: center;">&iexcl;Hola! ${req.body.name}</h1>
            <h3 style="text-align: center;color:black">Hemos recibido tu solicitud de contacto, a la brevedad nos comunicaremos para responder tus dudas o consultas.</h3>
            <p style="text-align: center;">Detalle del mensaje: ${req.body.message}</p>
                </div>
                
                        </td>
                        </tr>
                    
                </table>
                
                </div>
                
                    <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    
                </div>
                
                    
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                <![endif]-->
                
                
                        </td>
                    </tr>
                    </tbody>
                </table>
                
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                    <tr>
                        <td>
                        
                    
                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                
                    
                <div style="Margin:0px auto;max-width:600px;">
                    
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                        <tr>
                        <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        
                <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    
                        <tr>
                        <td align="center" style="font-size:0px;padding:10px 10px 10px 10px;word-break:break-word;">
                            
                
                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                >
                    <tr>
                
                        <td>
                        <![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            
                <tr>
                    <td style="padding:4px;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                        <tr>
                        <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                            <a href="${mailData[0].facebook}" target="_blank">
                                <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664348.jpg" style="border-radius:3px;display:block;" width="32">
                            </a>
                            </td>
                        </tr>
                    </table>
                    </td>
                    
                </tr>
                
                        </table>
                        <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            
                <tr>
                    <td style="padding:4px;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                        <tr>
                        <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                            <a href="${mailData[0].instagram}" target="_blank">
                                <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664357.jpg" style="border-radius:3px;display:block;" width="32">
                            </a>
                            </td>
                        </tr>
                    </table>
                    </td>
                    
                </tr>
                
                        </table>
                        <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            
                <tr>
                    <td style="padding:4px;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                        <tr>
                        <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                            <a href="${mailData[0].location}" target="_blank">
                                <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664364.jpg" style="border-radius:3px;display:block;" width="32">
                            </a>
                            </td>
                        </tr>
                    </table>
                    </td>
                    
                </tr>
                
                        </table>
                        <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            
                <tr>
                    <td style="padding:4px;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                        <tr>
                        <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                            <a href="${mailData[0].whatsapp}" target="_blank">
                                <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664370.jpg" style="border-radius:3px;display:block;" width="32">
                            </a>
                            </td>
                        </tr>
                    </table>
                    </td>
                    
                </tr>
                
                        </table>
                        <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            
                <tr>
                    <td style="padding:4px;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                        <tr>
                        <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                            <a href="mailto:${mailData[0].mail}" target="_blank">
                                <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664419.jpg" style="border-radius:3px;display:block;" width="32">
                            </a>
                            </td>
                        </tr>
                    </table>
                    </td>
                    
                </tr>
                
                        </table>
                        <!--[if mso | IE]>
                        </td>
                        
                    </tr>
                    </table>
                <![endif]-->
                
                
                        </td>
                        </tr>
                    
                </table>
                
                </div>
                
                    <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    
                </div>
                
                    
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                <![endif]-->
                
                
                        </td>
                    </tr>
                    </tbody>
                </table>
                
                </div>
                
                </body>
                </html>

                `
            }
            const mailTwo = {
                from: mailData[0].companyName,
                to: mailData[0].mail,
                subject: req.body.subject,
                html: `
                    <div style="width: 100%; padding:0;text-align:center;">
                        <div style="width: 60%;height: 8vh;margin: auto;background-color: #ffcb05;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 20px;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                            <div style="width: 100px;margin:auto;border-radius:55%;background-color:#42210b;padding: 10px;">     
                                <img style="width: 100%;margin-bot:20px;" src="${mailData[0].img[0].url}" alt="Logo apicolasaleo">
                            </div>
                        </div>
                        <div style="width: 100%;margin: auto;padding-top: 5%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#172b4d;padding-bottom: 40px;">
                            <center>
                                <div style="width:60%;text-align: center;">
                                    
                                    <p style="text-align:center;margin-top:10px;font-size:30px;"> Solicitud de contacto</p>
                                    <p style="text-align:center;font-weight: 300;margin:auto;font-size:13px;">
                                    <strong> 
                                    nombre: ${req.body.name} <br>
                                    correo: ${req.body.email} <br>
                                    </strong> <br><br>
                                    Mensaje: ${req.body.message}
                                    </p>
                                <div>
                            </center>
                        </div>
                    </div>
                `
            }
            Mails.sendMail(mail)
            Mails.sendMail(mailTwo)
            res.json({status: 'ok'})
        }
    })
})

mails.post('/subs', async (req, res, next) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Mail = conn.model('mails', mailSchema)
    Mail.find()
    .then(mailData =>{
        if (mailData.length > 0) {
            var array = {}
            let mail = {}
            array = {
                to: req.body.to
            }
            mail = {
                from: mailData[0].companyName,
                to: array.to,
                subject: mailData[0].companyName+' '+'te da la bienvenida',
                html: `
                <!doctype html>
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
                <title>
                
                </title>
                <!--[if !mso]><!-- -->
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <!--<![endif]-->
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style type="text/css">
                #outlook a { padding:0; }
                .ReadMsgBody { width:100%; }
                .ExternalClass { width:100%; }
                .ExternalClass * { line-height:100%; }
                body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
                table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
                img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
                p { display:block;margin:13px 0; }
                </style>
                <!--[if !mso]><!-->
                <style type="text/css">
                @media only screen and (max-width:480px) {
                    @-ms-viewport { width:320px; }
                    @viewport { width:320px; }
                }
                </style>
                <!--<![endif]-->
                <!--[if mso]>
                <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
                <!--[if lte mso 11]>
                <style type="text/css">
                .outlook-group-fix { width:100% !important; }
                </style>
                <![endif]-->
                
            <!--[if !mso]><!-->
                <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
                <style type="text/css">
                @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
        @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
                </style>
            <!--<![endif]-->

            
                
            <style type="text/css">
            @media only screen and (min-width:480px) {
                .mj-column-per-100 { width:100% !important; max-width: 100%; }
            }
            </style>
            
        
                <style type="text/css">
                
                

            @media only screen and (max-width:480px) {
            table.full-width-mobile { width: 100% !important; }
            td.full-width-mobile { width: auto !important; }
            }
        
                </style>
                <style type="text/css">.hide_on_mobile { display: none !important;} 
                @media only screen and (min-width: 480px) { .hide_on_mobile { display: block !important;} }
                .hide_section_on_mobile { display: none !important;} 
                @media only screen and (min-width: 480px) { .hide_section_on_mobile { display: table !important;} }
                .hide_on_desktop { display: block !important;} 
                @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
                .hide_section_on_desktop { display: table !important;} 
                @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
                [owa] .mj-column-per-100 {
                    width: 100%!important;
                }
                [owa] .mj-column-per-50 {
                    width: 50%!important;
                }
                [owa] .mj-column-per-33 {
                    width: 33.333333333333336%!important;
                }
                p {
                    margin: 0px;
                }
                @media only print and (min-width:480px) {
                    .mj-column-per-100 { width:100%!important; }
                    .mj-column-per-40 { width:40%!important; }
                    .mj-column-per-60 { width:60%!important; }
                    .mj-column-per-50 { width: 50%!important; }
                    mj-column-per-33 { width: 33.333333333333336%!important; }
                    }</style>
                
            </head>
            <body style="background-color:#FFFFFF;">
                
                
            <div style="background-color:#FFFFFF;">
                
            <table align="center" class="hide_section_on_mobile" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffcb05;background-color:#ffcb05;width:100%;">
                <tbody>
                <tr>
                    <td>
                    
                
            <!--[if mso | IE]>
            <table
                align="center" border="0" cellpadding="0" cellspacing="0" class="hide_section_on_mobile-outlook" style="width:600px;" width="600"
            >
                <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
            
                
            <div style="Margin:0px auto;max-width:600px;">
                
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                    <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
            
                    <td
                    class="" style="vertical-align:top;width:600px;"
                    >
                <![endif]-->
                    
            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                
                    <tr>
                    <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                        
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                <tbody>
                <tr>
                    <td style="width:180px;">
                    
            <img height="auto" src="${mailData[0].img[0].url}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="180">
            
                    </td>
                </tr>
                </tbody>
            </table>
            
                    </td>
                    </tr>
                
            </table>
            
            </div>
            
                <!--[if mso | IE]>
                    </td>
                
                </tr>
            
                        </table>
                        <![endif]-->
                    </td>
                    </tr>
                </tbody>
                </table>
                
            </div>
            
                
            <!--[if mso | IE]>
                </td>
                </tr>
            </table>
            <![endif]-->
            
            
                    </td>
                </tr>
                </tbody>
            </table>
            
            <table align="center" class="hide_section_on_desktop" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffcb05;background-color:#ffcb05;width:100%;">
                <tbody>
                <tr>
                    <td>
                    
                
            <!--[if mso | IE]>
            <table
                align="center" border="0" cellpadding="0" cellspacing="0" class="hide_section_on_desktop-outlook" style="width:600px;" width="600"
            >
                <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
            
                
            <div style="Margin:0px auto;max-width:600px;">
                
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                    <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
            
                    <td
                    class="" style="vertical-align:top;width:600px;"
                    >
                <![endif]-->
                    
            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                
                    <tr>
                    <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                        
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                <tbody>
                <tr>
                    <td style="width:114px;">
                    
            <img height="auto" src="${mailData[0].img[0].url}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="114">
            
                    </td>
                </tr>
                </tbody>
            </table>
            
                    </td>
                    </tr>
                
            </table>
            
            </div>
            
                <!--[if mso | IE]>
                    </td>
                
                </tr>
            
                        </table>
                        <![endif]-->
                    </td>
                    </tr>
                </tbody>
                </table>
                
            </div>
            
                
            <!--[if mso | IE]>
                </td>
                </tr>
            </table>
            <![endif]-->
            
            
                    </td>
                </tr>
                </tbody>
            </table>
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                <tr>
                    <td>
                    
                
            <!--[if mso | IE]>
            <table
                align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
            >
                <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
            
                
            <div style="Margin:0px auto;max-width:600px;">
                
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                    <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
            
                    <td
                    class="" style="vertical-align:top;width:600px;"
                    >
                <![endif]-->
                    
            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                
                    <tr>
                    <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                        
            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                <h1 style="font-family: 'Cabin', sans-serif; text-align: center;">${mailData[0].companyName} te da la bienvenida</h1>
        <h3 style="text-align: center;">&iexcl;Hola! </h3>
        <h3 style="text-align: center;color:black">Nos alegra que te hayas suscrito en nuestro sitio web, por este medio te enviaremos todas las novedades de nuestros servicios.</h3>
            </div>
            
                    </td>
                    </tr>
                
            </table>
            
            </div>
            
                <!--[if mso | IE]>
                    </td>
                
                </tr>
            
                        </table>
                        <![endif]-->
                    </td>
                    </tr>
                </tbody>
                </table>
                
            </div>
            
                
            <!--[if mso | IE]>
                </td>
                </tr>
            </table>
            <![endif]-->
            
            
                    </td>
                </tr>
                </tbody>
            </table>
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                <tr>
                    <td>
                    
                
            <!--[if mso | IE]>
            <table
                align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
            >
                <tr>
                <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
            <![endif]-->
            
                
            <div style="Margin:0px auto;max-width:600px;">
                
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                    <tr>
                    <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                        <!--[if mso | IE]>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
            
                    <td
                    class="" style="vertical-align:top;width:600px;"
                    >
                <![endif]-->
                    
            <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                
                    <tr>
                    <td align="center" style="font-size:0px;padding:10px 10px 10px 10px;word-break:break-word;">
                        
            
            <!--[if mso | IE]>
            <table
                align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
            >
                <tr>
            
                    <td>
                    <![endif]-->
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                        
            <tr>
                <td style="padding:4px;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                    <tr>
                    <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                        <a href="${mailData[0].facebook}" target="_blank">
                            <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664348.jpg" style="border-radius:3px;display:block;" width="32">
                        </a>
                        </td>
                    </tr>
                </table>
                </td>
                
            </tr>
            
                    </table>
                    <!--[if mso | IE]>
                    </td>
                    
                    <td>
                    <![endif]-->
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                        
            <tr>
                <td style="padding:4px;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                    <tr>
                    <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                        <a href="${mailData[0].instagram}" target="_blank">
                            <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664357.jpg" style="border-radius:3px;display:block;" width="32">
                        </a>
                        </td>
                    </tr>
                </table>
                </td>
                
            </tr>
            
                    </table>
                    <!--[if mso | IE]>
                    </td>
                    
                    <td>
                    <![endif]-->
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                        
            <tr>
                <td style="padding:4px;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                    <tr>
                    <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                        <a href="${mailData[0].location}" target="_blank">
                            <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664364.jpg" style="border-radius:3px;display:block;" width="32">
                        </a>
                        </td>
                    </tr>
                </table>
                </td>
                
            </tr>
            
                    </table>
                    <!--[if mso | IE]>
                    </td>
                    
                    <td>
                    <![endif]-->
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                        
            <tr>
                <td style="padding:4px;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                    <tr>
                    <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                        <a href="${mailData[0].whatsapp}" target="_blank">
                            <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664370.jpg" style="border-radius:3px;display:block;" width="32">
                        </a>
                        </td>
                    </tr>
                </table>
                </td>
                
            </tr>
            
                    </table>
                    <!--[if mso | IE]>
                    </td>
                    
                    <td>
                    <![endif]-->
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                        
            <tr>
                <td style="padding:4px;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                    <tr>
                    <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                        <a href="mailto:${mailData[0].mail}" target="_blank">
                            <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664419.jpg" style="border-radius:3px;display:block;" width="32">
                        </a>
                        </td>
                    </tr>
                </table>
                </td>
                
            </tr>
            
                    </table>
                    <!--[if mso | IE]>
                    </td>
                    
                </tr>
                </table>
            <![endif]-->
            
            
                    </td>
                    </tr>
                
            </table>
            
            </div>
            
                <!--[if mso | IE]>
                    </td>
                
                </tr>
            
                        </table>
                        <![endif]-->
                    </td>
                    </tr>
                </tbody>
                </table>
                
            </div>
            
                
            <!--[if mso | IE]>
                </td>
                </tr>
            </table>
            <![endif]-->
            
            
                    </td>
                </tr>
                </tbody>
            </table>
            
            </div>
            
            </body>
            </html>
                `
            }
            mailTwo = {
                from: mailData[0].companyName,
                to: mailData[0].mail,
                subject: 'Nueva suscripción de cliente',
                html: `
                <div style="width: 80%;max-width:1000px;margin:auto;padding:0;text-align:center;">
                    <div style="width: 100%;height: 10vh;margin: auto;background-color: #ffcb05;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                        <div style="width: 100px;margin:auto;border-radius:55%;background-color:#42210b;padding: 10px;">     
                            <img style="width: 100%;margin-bot:20px;" src="${mailData[0].img[0].url}" alt="Logo syswa">
                        </div>
                    </div>
                    <div style="width: 100%;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom: 20px;">
                        <center>
                            <div style="width:90%;text-align: center;">
                                <h1 style="text-align: center;color:#181d81;">Actualización de clientes</h1>
                                <p style="text-align:left;font-size:14px;font-weight: 300;text-align: center;width: 80%;margin:auto;">
                                <strong> Se ha suscrito un nuevo cliente con el correo ${array.to}</strong>
                                </p>
                            <div>
                        </center>
                    </div>
                </div>
                `
            }
            
            Mails.sendMail(mail)
            Mails.sendMail(mailTwo)
            res.json({status: 'ok'})
            
        }
    })
})

mails.post('/quotation', async (req, res, next) => {
    const database = req.headers['x-database-connect'];
    const conn = mongoose.createConnection('mongodb://localhost/'+database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const Mail = conn.model('mails', mailSchema)
    Mail.find()
    .then(mailData =>{
        if (mailData.length > 0) {
            var array = {}
            let mail = {}
            array = {
                to: req.body.to
            }
            mail = {
                from: mailData[0].companyName,
                to: array.to,
                subject: mailData[0].companyName + ' - '+'Solicitud de cotización',
                html: `<!doctype html>
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                    <head>
                    <title>
                        
                    </title>
                    <!--[if !mso]><!-- -->
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <!--<![endif]-->
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style type="text/css">
                        #outlook a { padding:0; }
                        .ReadMsgBody { width:100%; }
                        .ExternalClass { width:100%; }
                        .ExternalClass * { line-height:100%; }
                        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
                        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
                        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
                        p { display:block;margin:13px 0; }
                    </style>
                    <!--[if !mso]><!-->
                    <style type="text/css">
                        @media only screen and (max-width:480px) {
                        @-ms-viewport { width:320px; }
                        @viewport { width:320px; }
                        }
                    </style>
                    <!--<![endif]-->
                    <!--[if mso]>
                    <xml>
                    <o:OfficeDocumentSettings>
                        <o:AllowPNG/>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                    <!--[if lte mso 11]>
                    <style type="text/css">
                        .outlook-group-fix { width:100% !important; }
                    </style>
                    <![endif]-->
                    
                    <!--[if !mso]><!-->
                    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
                    <style type="text/css">
                        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
            @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
                    </style>
                    <!--<![endif]-->
            
                
                    
                <style type="text/css">
                    @media only screen and (min-width:480px) {
                    .mj-column-per-100 { width:100% !important; max-width: 100%; }
                    }
                </style>
                
                
                    <style type="text/css">
                    
                    
            
                @media only screen and (max-width:480px) {
                    table.full-width-mobile { width: 100% !important; }
                    td.full-width-mobile { width: auto !important; }
                }
                
                    </style>
                    <style type="text/css">.hide_on_mobile { display: none !important;} 
                    @media only screen and (min-width: 480px) { .hide_on_mobile { display: block !important;} }
                    .hide_section_on_mobile { display: none !important;} 
                    @media only screen and (min-width: 480px) { .hide_section_on_mobile { display: table !important;} }
                    .hide_on_desktop { display: block !important;} 
                    @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
                    .hide_section_on_desktop { display: table !important;} 
                    @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
                    [owa] .mj-column-per-100 {
                        width: 100%!important;
                        }
                        [owa] .mj-column-per-50 {
                        width: 50%!important;
                        }
                        [owa] .mj-column-per-33 {
                        width: 33.333333333333336%!important;
                        }
                        p {
                            margin: 0px;
                        }
                        @media only print and (min-width:480px) {
                        .mj-column-per-100 { width:100%!important; }
                        .mj-column-per-40 { width:40%!important; }
                        .mj-column-per-60 { width:60%!important; }
                        .mj-column-per-50 { width: 50%!important; }
                        mj-column-per-33 { width: 33.333333333333336%!important; }
                        }</style>
                    
                    </head>
                    <body style="background-color:#FFFFFF;">
                    
                    
                    <div style="background-color:#FFFFFF;">
                    
                    <table align="center" class="hide_section_on_mobile" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffcb05;background-color:#ffcb05;width:100%;">
                    <tbody>
                        <tr>
                        <td>
                            
                    
                    <!--[if mso | IE]>
                    <table
                        align="center" border="0" cellpadding="0" cellspacing="0" class="hide_section_on_mobile-outlook" style="width:600px;" width="600"
                    >
                    <tr>
                        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                    <![endif]-->
                
                    
                    <div style="Margin:0px auto;max-width:600px;">
                    
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                        <tr>
                            <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                    
                        <td
                            class="" style="vertical-align:top;width:600px;"
                        >
                        <![endif]-->
                        
                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    
                        <tr>
                            <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                            
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                    <tbody>
                        <tr>
                        <td style="width:180px;">
                            
                    <img height="auto" src="${mailData[0].img[0].url}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="180">
                
                        </td>
                        </tr>
                    </tbody>
                    </table>
                
                            </td>
                        </tr>
                        
                    </table>
                
                    </div>
                
                        <!--[if mso | IE]>
                        </td>
                        
                    </tr>
                    
                                </table>
                            <![endif]-->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    
                    </div>
                
                    
                    <!--[if mso | IE]>
                        </td>
                    </tr>
                    </table>
                    <![endif]-->
                
                    
                        </td>
                        </tr>
                    </tbody>
                    </table>
                
                    <table align="center" class="hide_section_on_desktop" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffcb05;background-color:#ffcb05;width:100%;">
                    <tbody>
                        <tr>
                        <td>
                            
                    
                    <!--[if mso | IE]>
                    <table
                        align="center" border="0" cellpadding="0" cellspacing="0" class="hide_section_on_desktop-outlook" style="width:600px;" width="600"
                    >
                    <tr>
                        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                    <![endif]-->
                
                    
                    <div style="Margin:0px auto;max-width:600px;">
                    
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                        <tr>
                            <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                    
                        <td
                            class="" style="vertical-align:top;width:600px;"
                        >
                        <![endif]-->
                        
                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    
                        <tr>
                            <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                            
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                    <tbody>
                        <tr>
                        <td style="width:114px;">
                            
                    <img height="auto" src="${mailData[0].img[0].url}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="114">
                
                        </td>
                        </tr>
                    </tbody>
                    </table>
                
                            </td>
                        </tr>
                        
                    </table>
                
                    </div>
                
                        <!--[if mso | IE]>
                        </td>
                        
                    </tr>
                    
                                </table>
                            <![endif]-->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    
                    </div>
                
                    
                    <!--[if mso | IE]>
                        </td>
                    </tr>
                    </table>
                    <![endif]-->
                
                    
                        </td>
                        </tr>
                    </tbody>
                    </table>
                
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                        <tr>
                        <td>
                            
                    
                    <!--[if mso | IE]>
                    <table
                        align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                    >
                    <tr>
                        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                    <![endif]-->
                
                    
                    <div style="Margin:0px auto;max-width:600px;">
                    
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                        <tr>
                            <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                    
                        <td
                            class="" style="vertical-align:top;width:600px;"
                        >
                        <![endif]-->
                        
                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    
                        <tr>
                            <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                            
                    <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                    <h1 style="font-family: 'Cabin', sans-serif; text-align: center;">&iexcl;Enhorabuena! </h1>
            <h3 style="text-align: center;color:black">Hemos recibido tu solicitud de pedido, por lo que a la brevedad nos pondremos en contacto para indicarte los detalles de entrega en las pr&oacute;ximas 24 horas.</h3>
            <p style="text-align: center;">Para mayor informaci&oacute;n o dudas por favor comun&iacute;cate con nosotros a nuestros n&uacute;meros de contacto.</p>
                    </div>
                
                            </td>
                        </tr>
                        
                    </table>
                
                    </div>
                
                        <!--[if mso | IE]>
                        </td>
                        
                    </tr>
                    
                                </table>
                            <![endif]-->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    
                    </div>
                
                    
                    <!--[if mso | IE]>
                        </td>
                    </tr>
                    </table>
                    <![endif]-->
                
                    
                        </td>
                        </tr>
                    </tbody>
                    </table>
                
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                        <tr>
                        <td>
                            
                    
                    <!--[if mso | IE]>
                    <table
                        align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                    >
                    <tr>
                        <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                    <![endif]-->
                
                    
                    <div style="Margin:0px auto;max-width:600px;">
                    
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                        <tr>
                            <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                            <!--[if mso | IE]>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                    
                        <td
                            class="" style="vertical-align:top;width:600px;"
                        >
                        <![endif]-->
                        
                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    
                        <tr>
                            <td align="center" style="font-size:0px;padding:10px 10px 10px 10px;word-break:break-word;">
                            
                    
                    <!--[if mso | IE]>
                    <table
                        align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    >
                    <tr>
                    
                            <td>
                        <![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            
                    <tr>
                    <td style="padding:4px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                        <tr>
                            <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                            <a href="${mailData[0].facebook}" target="_blank">
                                <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664348.jpg" style="border-radius:3px;display:block;" width="32">
                                </a>
                            </td>
                            </tr>
                        </table>
                    </td>
                    
                    </tr>
                
                            </table>
                        <!--[if mso | IE]>
                            </td>
                        
                            <td>
                        <![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            
                    <tr>
                    <td style="padding:4px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                        <tr>
                            <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                            <a href="${mailData[0].instagram}" target="_blank">
                                <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664357.jpg" style="border-radius:3px;display:block;" width="32">
                                </a>
                            </td>
                            </tr>
                        </table>
                    </td>
                    
                    </tr>
                
                            </table>
                        <!--[if mso | IE]>
                            </td>
                        
                            <td>
                        <![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            
                    <tr>
                    <td style="padding:4px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                        <tr>
                            <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                            <a href="${mailData[0].location}" target="_blank">
                                <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664364.jpg" style="border-radius:3px;display:block;" width="32">
                                </a>
                            </td>
                            </tr>
                        </table>
                    </td>
                    
                    </tr>
                
                            </table>
                        <!--[if mso | IE]>
                            </td>
                        
                            <td>
                        <![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            
                    <tr>
                    <td style="padding:4px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                        <tr>
                            <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                            <a href="${mailData[0].whatsapp}" target="_blank">
                                <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664370.jpg" style="border-radius:3px;display:block;" width="32">
                                </a>
                            </td>
                            </tr>
                        </table>
                    </td>
                    
                    </tr>
                
                            </table>
                        <!--[if mso | IE]>
                            </td>
                        
                            <td>
                        <![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            
                    <tr>
                    <td style="padding:4px;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                        <tr>
                            <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                            <a href="mailto:${mailData[0].mail}" target="_blank">
                                <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664419.jpg" style="border-radius:3px;display:block;" width="32">
                                </a>
                            </td>
                            </tr>
                        </table>
                    </td>
                    
                    </tr>
                
                            </table>
                        <!--[if mso | IE]>
                            </td>
                        
                        </tr>
                    </table>
                    <![endif]-->
                
                
                            </td>
                        </tr>
                        
                    </table>
                
                    </div>
                
                        <!--[if mso | IE]>
                        </td>
                        
                    </tr>
                    
                                </table>
                            <![endif]-->
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    
                    </div>
                
                    
                    <!--[if mso | IE]>
                        </td>
                    </tr>
                    </table>
                    <![endif]-->
                
                    
                        </td>
                        </tr>
                    </tbody>
                    </table>
                
                    </div>
                
                    </body>
                </html>`
            }
            mailTwo = {
                from: mailData[0].companyName,
                to: mailData[0].mail,
                subject: 'Nueva suscripción de cliente',
                html: `
                <div style="width: 80%;max-width:1000px;margin:auto;padding:0;text-align:center;">
                    <div style="width: 100%;height: 10vh;margin: auto;background-color: #ffcb05;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);padding: 10px;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;text-align:justify;-webkit-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);-moz-box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);box-shadow: 0px 6px 8px -8px rgba(0,0,0,0.73);">
                        <div style="width: 100px;margin:auto;border-radius:55%;background-color:#42210b;padding: 10px;">     
                            <img style="width: 100%;margin-bot:20px;" src="${mailData[0].img[0].url}" alt="Logo syswa">
                        </div>
                    </div>
                    <div style="width: 100%;margin: auto;padding-top: 5%;font-family: 'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:#181d81;padding-bottom: 20px;">
                        <center>
                            <div style="width:90%;text-align: center;">
                                <h1 style="text-align: center;color:#181d81;">Actualización de clientes</h1>
                                <p style="text-align:left;font-size:14px;font-weight: 300;text-align: center;width: 80%;margin:auto;">
                                <strong> Un cliente con correo ${array.to} ha hecho una cotizacion</strong>
                                </p>
                            <div>
                        </center>
                    </div>
                </div>
                `
            }
            
            Mails.sendMail(mail)
            Mails.sendMail(mailTwo)
            res.json({status: 'ok'})
            
        }
    })
  
})

mails.post('/rescuePass/', async (req, res, next) => { 
  const database = req.headers['x-database-connect'];
  const conn = mongoose.createConnection('mongodb://localhost/'+database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  const Client = conn.model('clients', clientSchema)
  try {
      const findClient = await Client.findOne({
          mail:req.body.mail
      })
      
      if (!findClient) {
          res.json({status: 'No existe'})   
      }else{
        const Mail = conn.model('mails', mailSchema)
        try {
            const mailData = await Mail.find()
            if (mailData.length > 0) {
                try {
                    const date = new Date()
                    const code = date.getTime()+'?'+Math.floor(Math.random() * (9999 - 1000)) + 1000
                    const updateClient = await Client.findOneAndUpdate({mail:req.body.mail}, {
                        $set: {
                            codigoRescue:code,
                        }
                    })
                    if (updateClient) {
                        const mail = {
                            from: mailData[0].companyName,
                            to: req.body.mail,
                            subject: mailData[0].companyName+' - '+'Recuperación de contraseña',
                            html: `
                            <!doctype html>
                            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                                <head>
                                <title>
                                    
                                </title>
                                <!--[if !mso]><!-- -->
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <!--<![endif]-->
                                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                <style type="text/css">
                                    #outlook a { padding:0; }
                                    .ReadMsgBody { width:100%; }
                                    .ExternalClass { width:100%; }
                                    .ExternalClass * { line-height:100%; }
                                    body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
                                    table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
                                    img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
                                    p { display:block;margin:13px 0; }
                                </style>
                                <!--[if !mso]><!-->
                                <style type="text/css">
                                    @media only screen and (max-width:480px) {
                                    @-ms-viewport { width:320px; }
                                    @viewport { width:320px; }
                                    }
                                </style>
                                <!--<![endif]-->
                                <!--[if mso]>
                                <xml>
                                <o:OfficeDocumentSettings>
                                    <o:AllowPNG/>
                                    <o:PixelsPerInch>96</o:PixelsPerInch>
                                </o:OfficeDocumentSettings>
                                </xml>
                                <![endif]-->
                                <!--[if lte mso 11]>
                                <style type="text/css">
                                    .outlook-group-fix { width:100% !important; }
                                </style>
                                <![endif]-->
                                
                                <!--[if !mso]><!-->
                                <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
                        <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
                                <style type="text/css">
                                    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
                        @import url(https://fonts.googleapis.com/css?family=Cabin:400,700);
                                </style>
                                <!--<![endif]-->
                        
                            
                                
                            <style type="text/css">
                                @media only screen and (min-width:480px) {
                                .mj-column-per-100 { width:100% !important; max-width: 100%; }
                                }
                            </style>
                            
                            
                                <style type="text/css">
                                
                                
                        
                            @media only screen and (max-width:480px) {
                                table.full-width-mobile { width: 100% !important; }
                                td.full-width-mobile { width: auto !important; }
                            }
                            
                                </style>
                                <style type="text/css">.hide_on_mobile { display: none !important;} 
                                @media only screen and (min-width: 480px) { .hide_on_mobile { display: block !important;} }
                                .hide_section_on_mobile { display: none !important;} 
                                @media only screen and (min-width: 480px) { .hide_section_on_mobile { display: table !important;} }
                                .hide_on_desktop { display: block !important;} 
                                @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
                                .hide_section_on_desktop { display: table !important;} 
                                @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
                                [owa] .mj-column-per-100 {
                                    width: 100%!important;
                                    }
                                    [owa] .mj-column-per-50 {
                                    width: 50%!important;
                                    }
                                    [owa] .mj-column-per-33 {
                                    width: 33.333333333333336%!important;
                                    }
                                    p {
                                        margin: 0px;
                                    }
                                    @media only print and (min-width:480px) {
                                    .mj-column-per-100 { width:100%!important; }
                                    .mj-column-per-40 { width:40%!important; }
                                    .mj-column-per-60 { width:60%!important; }
                                    .mj-column-per-50 { width: 50%!important; }
                                    mj-column-per-33 { width: 33.333333333333336%!important; }
                                    }</style>
                                
                                </head>
                                <body style="background-color:#FFFFFF;">
                                
                                
                                <div style="background-color:#FFFFFF;">
                                
                                <table align="center" class="hide_section_on_mobile" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffcb05;background-color:#ffcb05;width:100%;">
                                <tbody>
                                    <tr>
                                    <td>
                                        
                                
                                <!--[if mso | IE]>
                                <table
                                align="center" border="0" cellpadding="0" cellspacing="0" class="hide_section_on_mobile-outlook" style="width:600px;" width="600"
                                >
                                <tr>
                                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                                <![endif]-->
                            
                                
                                <div style="Margin:0px auto;max-width:600px;">
                                
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                    <tbody>
                                    <tr>
                                        <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        
                                <tr>
                                
                                    <td
                                        class="" style="vertical-align:top;width:600px;"
                                    >
                                    <![endif]-->
                                    
                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                                        
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                <tbody>
                                    <tr>
                                    <td style="width:180px;">
                                        
                                <img height="auto" src="${mailData[0].img[0].url}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="180">
                            
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            
                                        </td>
                                    </tr>
                                    
                                </table>
                            
                                </div>
                            
                                    <!--[if mso | IE]>
                                    </td>
                                    
                                </tr>
                                
                                            </table>
                                        <![endif]-->
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                
                                </div>
                            
                                
                                <!--[if mso | IE]>
                                    </td>
                                </tr>
                                </table>
                                <![endif]-->
                            
                                
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            
                                <table align="center" class="hide_section_on_desktop" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffcb05;background-color:#ffcb05;width:100%;">
                                <tbody>
                                    <tr>
                                    <td>
                                        
                                
                                <!--[if mso | IE]>
                                <table
                                align="center" border="0" cellpadding="0" cellspacing="0" class="hide_section_on_desktop-outlook" style="width:600px;" width="600"
                                >
                                <tr>
                                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                                <![endif]-->
                            
                                
                                <div style="Margin:0px auto;max-width:600px;">
                                
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                    <tbody>
                                    <tr>
                                        <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        
                                <tr>
                                
                                    <td
                                        class="" style="vertical-align:top;width:600px;"
                                    >
                                    <![endif]-->
                                    
                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
                                        
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                <tbody>
                                    <tr>
                                    <td style="width:114px;">
                                        
                                <img height="auto" src="${mailData[0].img[0].url}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="114">
                            
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            
                                        </td>
                                    </tr>
                                    
                                </table>
                            
                                </div>
                            
                                    <!--[if mso | IE]>
                                    </td>
                                    
                                </tr>
                                
                                            </table>
                                        <![endif]-->
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                
                                </div>
                            
                                
                                <!--[if mso | IE]>
                                    </td>
                                </tr>
                                </table>
                                <![endif]-->
                            
                                
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                <tbody>
                                    <tr>
                                    <td>
                                        
                                
                                <!--[if mso | IE]>
                                <table
                                align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                                >
                                <tr>
                                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                                <![endif]-->
                            
                                
                                <div style="Margin:0px auto;max-width:600px;">
                                
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                    <tbody>
                                    <tr>
                                        <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        
                                <tr>
                                
                                    <td
                                        class="" style="vertical-align:top;width:600px;"
                                    >
                                    <![endif]-->
                                    
                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                                        
                                <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;color:#000000;">
                                <h1 style="font-family: 'Cabin', sans-serif; text-align: center;">Bienvenid@</h1>
                        <h3 style="text-align: center;">Estimado(a) ${findClient.name} ${findClient.lastName}</h3>
                        <h3 style="text-align: center;color:black">Puedes recuperar tu contrase&ntilde;a por medio de este <a style="cursor: pointer;" href="http://creacionesapicolasaleo.com/#/ingreso?code=${code}" class="text-center accLog">ENLACE</a> o por medio del siguiente boton: </h3>
                                </div>
                            
                                        </td>
                                    </tr>
                                    
                                </table>
                            
                                </div>
                            
                                    <!--[if mso | IE]>
                                    </td>
                                    
                                </tr>
                                
                                            </table>
                                        <![endif]-->
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                
                                </div>
                            
                                
                                <!--[if mso | IE]>
                                    </td>
                                </tr>
                                </table>
                                <![endif]-->
                            
                                
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                <tbody>
                                    <tr>
                                    <td>
                                        
                                
                                <!--[if mso | IE]>
                                <table
                                align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                                >
                                <tr>
                                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                                <![endif]-->
                            
                                
                                <div style="Margin:0px auto;max-width:600px;">
                                
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                    <tbody>
                                    <tr>
                                        <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        
                                <tr>
                                
                                    <td
                                        class="" style="vertical-align:top;width:600px;"
                                    >
                                    <![endif]-->
                                    
                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                
                                    <tr>
                                        <td align="center" vertical-align="middle" style="font-size:0px;padding:20px 20px 20px 20px;word-break:break-word;">
                                        
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;width:auto;line-height:100%;">
                                <tr>
                                    <td align="center" bgcolor="#42210b" role="presentation" style="border:0px solid #000;border-radius:5px;cursor:auto;mso-padding-alt:9px 26px 9px 26px;background:#42210b;" valign="middle">
                                    <a href="http://creacionesapicolasaleo.com/#/ingreso?code=${code}" style="display:inline-block;background:#42210b;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:100%;Margin:0;text-decoration:none;text-transform:none;padding:9px 26px 9px 26px;mso-padding-alt:0px;border-radius:5px;" target="_blank">
                                        <div><strong><span style="font-size: 14px;">Cambiar contrase&ntilde;a</span></strong></div>
                                    </a>
                                    </td>
                                </tr>
                                </table>
                            
                                        </td>
                                    </tr>
                                    
                                </table>
                            
                                </div>
                            
                                    <!--[if mso | IE]>
                                    </td>
                                    
                                </tr>
                                
                                            </table>
                                        <![endif]-->
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                
                                </div>
                            
                                
                                <!--[if mso | IE]>
                                    </td>
                                </tr>
                                </table>
                                <![endif]-->
                            
                                
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                <tbody>
                                    <tr>
                                    <td>
                                        
                                
                                <!--[if mso | IE]>
                                <table
                                align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                                >
                                <tr>
                                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                                <![endif]-->
                            
                                
                                <div style="Margin:0px auto;max-width:600px;">
                                
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                    <tbody>
                                    <tr>
                                        <td style="direction:ltr;font-size:0px;padding:9px 0px 9px 0px;text-align:center;vertical-align:top;">
                                        <!--[if mso | IE]>
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        
                                <tr>
                                
                                    <td
                                        class="" style="vertical-align:top;width:600px;"
                                    >
                                    <![endif]-->
                                    
                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                
                                    <tr>
                                        <td align="center" style="font-size:0px;padding:10px 10px 10px 10px;word-break:break-word;">
                                        
                                
                            <!--[if mso | IE]>
                                <table
                                align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                >
                                <tr>
                                
                                        <td>
                                    <![endif]-->
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                        
                                <tr>
                                <td style="padding:4px;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                                    <tr>
                                        <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                                        <a href="${mailData[0].facebook}" target="_blank">
                                            <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664348.jpg" style="border-radius:3px;display:block;" width="32">
                                            </a>
                                        </td>
                                        </tr>
                                    </table>
                                </td>
                                
                                </tr>
                            
                                        </table>
                                    <!--[if mso | IE]>
                                        </td>
                                    
                                        <td>
                                    <![endif]-->
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                        
                                <tr>
                                <td style="padding:4px;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                                    <tr>
                                        <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                                        <a href="${mailData[0].instagram}" target="_blank">
                                            <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664357.jpg" style="border-radius:3px;display:block;" width="32">
                                            </a>
                                        </td>
                                        </tr>
                                    </table>
                                </td>
                                
                                </tr>
                            
                                        </table>
                                    <!--[if mso | IE]>
                                        </td>
                                    
                                        <td>
                                    <![endif]-->
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                        
                                <tr>
                                <td style="padding:4px;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                                    <tr>
                                        <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                                        <a href="${mailData[0].location}" target="_blank">
                                            <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664364.jpg" style="border-radius:3px;display:block;" width="32">
                                            </a>
                                        </td>
                                        </tr>
                                    </table>
                                </td>
                                
                                </tr>
                            
                                        </table>
                                    <!--[if mso | IE]>
                                        </td>
                                    
                                        <td>
                                    <![endif]-->
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                        
                                <tr>
                                <td style="padding:4px;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                                    <tr>
                                        <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                                        <a href="${mailData[0].whatsapp}" target="_blank">
                                            <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664370.jpg" style="border-radius:3px;display:block;" width="32">
                                            </a>
                                        </td>
                                        </tr>
                                    </table>
                                </td>
                                
                                </tr>
                            
                                        </table>
                                    <!--[if mso | IE]>
                                        </td>
                                    
                                        <td>
                                    <![endif]-->
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                        
                                <tr>
                                <td style="padding:4px;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;border-radius:3px;width:32px;">
                                    <tr>
                                        <td style="padding:7px;font-size:0;height:32px;vertical-align:middle;width:32px;">
                                        <a href="mailto:${mailData[0].mail}" target="_blank">
                                            <img height="32" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/5fb4768577f50/1605664419.jpg" style="border-radius:3px;display:block;" width="32">
                                            </a>
                                        </td>
                                        </tr>
                                    </table>
                                </td>
                                
                                </tr>
                            
                                        </table>
                                    <!--[if mso | IE]>
                                        </td>
                                    
                                    </tr>
                                </table>
                                <![endif]-->
                            
                            
                                        </td>
                                    </tr>
                                    
                                </table>
                            
                                </div>
                            
                                    <!--[if mso | IE]>
                                    </td>
                                    
                                </tr>
                                
                                            </table>
                                        <![endif]-->
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                
                                </div>
                            
                                
                                <!--[if mso | IE]>
                                    </td>
                                </tr>
                                </table>
                                <![endif]-->
                            
                                
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            
                                </div>
                            
                                </body>
                            </html>`
                        }
                        try{
                            const send = await Mails.sendMail(mail)
                            res.json({status:'ok'})
                        }
                        catch(err){
                            console.log(err)
                        }
                        
                    }
                }catch(err) {
                    res.send('error: ' + err)
                }
            }
        }catch (err){
            res.send(err)
        }
      }
  } catch(err) {
      res.send('error: ' + err)
  }
  
})

module.exports = mails