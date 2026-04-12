import fastify from "fastify";

export async function Authentication(req: any, reply: any) {

    const token = req.headers['authorization']


    if (!token) {
        reply.status(401).send({
            message: 'Access Denied"',
        });

    }


    try {
        const decoded = req.server.jwt.verify(token);
        req.log.info(`Token verified. Foo is ${JSON.stringify(decoded)}`);

    } catch (error) {
        return reply.status(401).send({
            message: 'Invalid token',
            err: error
        });
    }




}