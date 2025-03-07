import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const subscribeNewTokenRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/token',
    {
      schema: {
        tags: ['Token'],
        summary:
          'Atualiza o token que pode ser usado em outras requisições para o Sigma ECM.',
        body: z.object({
          accessToken: z.string(),
        }),
        response: {
          201: z.object({
            accessToken: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { accessToken } = request.body
      return reply.status(201).send({
        accessToken,
      })
    }
  )
}
