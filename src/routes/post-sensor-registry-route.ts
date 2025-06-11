import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { postSensorRegistry } from '../functions/post-sensor-registry'
import { postSensorRegistryRequestSchema } from '../types'

export const postSensorRegistryRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/sensorRegistry',
    {
      schema: {
        tags: ['Hierarquia'],
        summary: 'Cadastra um novo sensor.',
        body: postSensorRegistryRequestSchema,
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { id, sensorName, sensorSlug, sensorShowName } = request.body
      await postSensorRegistry({
        id,
        sensorName,
        sensorSlug,
        sensorShowName,
      })
      return reply.status(201).send()
    }
  )
}
