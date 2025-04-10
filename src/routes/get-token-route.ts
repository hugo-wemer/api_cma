import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getToken } from '../functions/get-token'
import { getTokenResponseSchema } from '../types'

export const getTokenRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/token',
    {
      schema: {
        tags: ['Token'],
        summary:
          'Consulta o token disponível para uso em requisições no Sigma ECM.',
        response: {
          200: getTokenResponseSchema
        },
      },
    },
    async (request, reply) => {
      const { accessToken, refreshToken, updatedAt } = await getToken()
      return reply.status(200).send({ accessToken, refreshToken, updatedAt })
    }
  )
}
