import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { getRegistries } from './functions/get-registries'
import { getRegistriesRoute } from './routes/get-registries-route'
import { getTokenRoute } from './routes/get-token-route'
import { subscribeNewTokenRoute } from './routes/subscribe-new-token-route'
import { getCommunicationStatus } from './functions/get-communication-status'
import { getCommunicationStatusRoute } from './routes/get-communication-status-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'SAM CMA API',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(getTokenRoute)
app.register(subscribeNewTokenRoute)
app.register(getRegistriesRoute)
app.register(getCommunicationStatusRoute)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running 🚀')
})
