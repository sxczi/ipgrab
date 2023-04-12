const express = require('express');
const app = express();
const requestIp = require('request-ip')

app.use(express.static('public'))
app.use(requestIp.mw())

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://lara:ELtwK0WAYabVakGo@cluster0.6z7o1.mongodb.net/?retryWrites=true&w=majority`)

const entrySchema = new mongoose.Schema({
    ip: String
})

const Entry = mongoose.model('Entry', entrySchema);


app.use((req, res) => {
  const entry = new Entry({ip: req.clientIp})
  entry.save().then(() => console.log('entry saved'))
})

app.get('/', (req, res) => res.send('uwu'))

app.listen(process.env.PORT, () => console.log(`server is live`));
