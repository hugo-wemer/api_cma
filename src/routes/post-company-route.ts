import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { postCompany } from '../functions/post-company'
import { postCompanyRequestSchema } from '../types'

export const postCompanyRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/company',
    {
      schema: {
        tags: ['Hierarquia'],
        summary: 'Adiciona uma nova empresa.',
        body: postCompanyRequestSchema,
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { id, companyName, companySlug } = request.body
      await postCompany({
        id,
        companyName,
        companySlug,
      })
      return reply.status(201).send()
    }
  )
}
