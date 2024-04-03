import fastify from 'fastify'
import { createEvent } from './http/routes/create-event';

const app = fastify();


app.register(createEvent)

app.listen({
    host: '0.0.0.0',
    port: 3333,
}).then(() => {
    console.log('listening on port 3333')
})