import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { postRegional } from '../functions/post-regional'
import { postRegionalRequestSchema } from '../types'

export const postRegionalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/regional',
    {
      schema: {
        tags: ['Hierarquia'],
        summary: 'Adiciona uma nova regional.',
        body: postRegionalRequestSchema,
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { id, regionalName, regionalSlug, companyOwnerId } = request.body
      await postRegional({
        id,
        regionalName,
        regionalSlug,
        companyOwnerId,
      })
      return reply.status(201).send()
    }
  )
}
