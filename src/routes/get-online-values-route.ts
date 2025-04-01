import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getOnlineValues } from '../functions/get-online-values'

export const getOnlineValuesRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/onlineValues',
    {
      schema: {
        tags: ['Nhé'],
        summary: 'Consulta as variáveis.',
        response: {
          200: z.any(),
        },
      },
    },
    async (request, reply) => {
      const response = await getOnlineValues()
      return reply.status(200).send(response)
    }
  )
}
