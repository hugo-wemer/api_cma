import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getToken } from '../functions/get-token'

export const getTokenRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/token',
    {
      schema: {
        tags: ['Token'],
        summary:
          'Consulta o token disponível para uso em requisições no Sigma ECM.',
        response: {
          200: z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
            updatedAt: z.date(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { accessToken, refreshToken, updatedAt } = await getToken()
      return reply.status(200).send({ accessToken, refreshToken, updatedAt })
    }
  )
}
