import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { postAsset } from '../functions/post-asset'
import { postAssetRequestSchema } from '../types'

export const postAssetRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/asset',
    {
      schema: {
        tags: ['Hierarquia'],
        summary: 'Adiciona um novo ativo.',
        body: postAssetRequestSchema,
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { id, assetName, assetSlug, installationOwnerId } = request.body
      await postAsset({
        id,
        assetName,
        assetSlug,
        installationOwnerId,
      })
      return reply.status(201).send()
    }
  )
}
