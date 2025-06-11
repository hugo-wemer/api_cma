import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { postSensor } from '../functions/post-sensor'
import { postSensorRequestSchema } from '../types'

export const postSensorRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/sensor',
    {
      schema: {
        tags: ['Hierarquia'],
        summary: 'Adiciona um sensor para um determinado ativo.',
        body: postSensorRequestSchema,
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { id, assetOwnerId, sensorRegistryId } = request.body
      await postSensor({
        id,
        assetOwnerId,
        sensorRegistryId,
      })
      return reply.status(201).send()
    }
  )
}
