import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../services/prisma";
import z from "zod";
import { randomUUID } from "crypto";

export async function createEvent(app: FastifyInstance){
    app.post('/events', async (request: FastifyRequest, reply: FastifyReply) =>{
        
        const createEventSchema = z.object({             
            title : z.string().min(4),     
            details: z.string().nullable(),                    
            maximumAttendees: z.number().int().positive().nullable(),
        })

        const {title,details,maximumAttendees}  = createEventSchema.parse(request.body);
        
        const createEvent = await prisma.event.create({
            data:{
                id: randomUUID(),
                title,
                slug: new Date().toString(),
                details,
                maximumAttendees
            }
        })

        if(createEvent){
            return await reply.status(201).send(createEvent)
        }
    })
}