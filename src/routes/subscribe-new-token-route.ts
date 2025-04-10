import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { updateToken } from '../functions/update-token'
import { subscribeNewTokenRequestSchema } from '../types'

export const subscribeNewTokenRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/token',
    {
      schema: {
        tags: ['Token'],
        summary:
          'Atualiza o token que pode ser usado em outras requisições para o Sigma ECM.',
        body: subscribeNewTokenRequestSchema,
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { accessToken, refreshToken } = request.body
      await updateToken({
        accessToken,
        refreshToken
      })
      return reply.status(201).send()
    }
  )
}
