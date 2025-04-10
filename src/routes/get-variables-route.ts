import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getVariables } from '../functions/get-variables'
import { getVariablesSchema } from '../types'

export const getVariablesRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/variables',
    {
      schema: {
        tags: ['Registros'],
        summary: 'Consulta as variáveis definidas para cada sensor.',
        response: {
          200: getVariablesSchema
        },
      },
    },
    async (request, reply) => {
      const response = await getVariables()
      return reply.status(200).send(response)
    }
  )
}
