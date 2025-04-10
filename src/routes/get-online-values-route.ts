import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getOnlineValues } from '../functions/get-online-values'

export const getOnlineValuesRoute: FastifyPluginAsyncZod = async app => {
  const paramsSchema = z.object({
    companySlug: z.string(),
    regionalSlug: z.string(),
    installationSlug: z.string(),
    assetSlug: z.string(),
  })

  app.get(
    '/onlineValues/:companySlug/:regionalSlug/:installationSlug/:assetSlug',
    {
      schema: {
        tags: ['Online Values'],
        summary: 'Consulta as variáveis online.',
        params: paramsSchema,
        response: {
          200: z.any(),
        },
      },
    },
    async (request, reply) => {
      const { companySlug, regionalSlug, installationSlug, assetSlug } = paramsSchema.parse(request.params)
      const response = await getOnlineValues(
        companySlug.toLowerCase(),
        regionalSlug.toLowerCase(),
        installationSlug.toLowerCase(),
        assetSlug.toLowerCase(),
      )
      return reply.status(200).send(response)
    }
  )
}
