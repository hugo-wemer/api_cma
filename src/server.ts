import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider
} from 'fastify-type-provider-zod'
import {z} from 'zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.post('/token', {
  schema: {
    body: z.object({
      accessToken: z.string(),
      refreshToken: z.string()
    })
  }
},  (request, reply) => { 
  const {  } = request.body
})

app.listen({port: 3333, host: '0.0.0.0'}).then(() => {
  console.log('HTTP server running 🚀')
})