const session = require('express-session')

app.use(session({
    secret: 'SECRETO',
    resave: true,
    saveUninitialized: true
}))