import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getCommunicationStatus } from '../functions/get-communication-status'

export const getCommunicationStatusRoute: FastifyPluginAsyncZod = async app => {
  const paramsSchema = z.object({
    companySlug: z.string(),
  });

  app.get(
    '/communication-status/:companySlug',
    {
      schema: {
        tags: ['Comunicação'],
        summary: 'Consulta o estado da comunicação de cada sensor por empresa.',
        params: paramsSchema,
        response: {
          200: z.any(),
        },
      },
    },
    async (request, reply) => {
      const { companySlug } = paramsSchema.parse(request.params);
      const response = await getCommunicationStatus(companySlug.toLowerCase());
      
      return reply.status(200).send(response);
    }
  )
}
