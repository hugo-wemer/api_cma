import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { postInstallation } from '../functions/post-installation'
import { postInstallationRequestSchema } from '../types'

export const postInstallationRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/installation',
    {
      schema: {
        tags: ['Hierarquia'],
        summary: 'Adiciona uma nova instalação.',
        body: postInstallationRequestSchema,
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { id, installationName, installationSlug, companyOwnerId } =
        request.body
      await postInstallation({
        id,
        installationName,
        installationSlug,
        companyOwnerId,
      })
      return reply.status(201).send()
    }
  )
}
