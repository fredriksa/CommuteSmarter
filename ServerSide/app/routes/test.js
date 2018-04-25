const express = require('express');
const app = express();

app.use(express.json());

const noteRoutes = require('./twitter_accounts');

module.exports = function(app, db) {
  noteRoutes(app, db);
  // Other route groups could go here, in the future
};

const events = [
    {id: 1, type:'Critical', location: 'Torsgatan'},
    {id: 2, type:'Critical', location: 'Kungsgatan'},
    {id: 3, type:'Be Cautious', location: 'Odengatan'},
];

app.get('/', (req, res) => {
    res.send('Current events:');
});

app.get('/api/events', (req, res) => {
    res.send(events);
});

app.get('/api/events/:id', (req, res) => {
    //res.send(req.query);
    const event = events.find(c => c.id === parseInt(req.params.id));
    if (!event) res.status(404).send('The event with given ID was not found.');
    res.send(event);
});

app.post('/api/events',(req, res) => {
    const event = {
        id: events.length + 1,
        type: req.body.type,
        location: req.body.location
    };
    events.push(event);
    res.send(event);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));