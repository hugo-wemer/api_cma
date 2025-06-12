import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getOnlineValues } from '../functions/get-online-values'
import {
  getOnlineValuesParamsSchema,
  getOnlineValuesResponseSchema,
} from '../types'

export const getOnlineValuesRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/onlineValues/:companySlug/:installationSlug/:assetSlug',
    {
      schema: {
        tags: ['Online Values'],
        summary: 'Consulta as variáveis online de um ativo específico.',
        params: getOnlineValuesParamsSchema,
        response: {
          200: getOnlineValuesResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { companySlug, installationSlug, assetSlug } =
        getOnlineValuesParamsSchema.parse(request.params)
      const response = await getOnlineValues(
        companySlug.toLowerCase(),
        installationSlug.toLowerCase(),
        assetSlug.toLowerCase()
      )
      return reply.status(200).send(response)
    }
  )
}
