import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getRegistries } from '../functions/get-registries'

export const getRegistriesRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/registries',
    {
      schema: {
        tags: ['Registros'],
        summary: 'Consulta a hierarquia do Sigma.',
        response: {
          200: z.any(),
        },
      },
    },
    async (request, reply) => {
      const response = await getRegistries()
      return reply.status(200).send(response)
    }
  )
}
