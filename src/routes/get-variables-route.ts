import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getVariables } from '../functions/get-variables'

export const getVariablesRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/variables',
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
      const response = await getVariables()
      return reply.status(200).send(response)
    }
  )
}
