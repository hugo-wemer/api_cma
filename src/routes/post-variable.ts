import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { postVariable } from '../functions/post-variable'
import { postVariableRequestSchema } from '../types'

export const postVariableRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/variable',
    {
      schema: {
        tags: ['Hierarquia'],
        summary: 'Adiciona um variável para um determinado sensor.',
        body: postVariableRequestSchema,
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { id, sensorRegistryId, variableName, unit, fx, component } =
        request.body
      await postVariable({
        id,
        sensorRegistryId,
        variableName,
        unit,
        fx,
        component,
      })
      return reply.status(201).send()
    }
  )
}
