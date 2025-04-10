import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getStatus } from '../functions/get-status'
import { getStatusParamsSchema, getStatusResponseSchema } from '../types'

export const getStatusRoute: FastifyPluginAsyncZod = async app => {
  

  app.get(
    '/status/:companySlug',
    {
      schema: {
        tags: ['Status'],
        summary: 'Consulta o estado da comunicação e alarme de cada sensor por empresa.',
        params: getStatusParamsSchema,
        response: {
          200: getStatusResponseSchema
          
        },
      },
    },
    async (request, reply) => {
      const { companySlug } = getStatusParamsSchema.parse(request.params)
      const response = await getStatus(companySlug.toLowerCase())

      return reply.status(200).send(response)
    }
  )
}
