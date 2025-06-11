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
import { getOnlineValuesRoute } from './routes/get-online-values-route'
import { getRegistriesRoute } from './routes/get-registries-route'
import { getStatusRoute } from './routes/get-status-route'
import { getTokenRoute } from './routes/get-token-route'
import { getVariablesRoute } from './routes/get-variables-route'
import { postAssetRoute } from './routes/post-asset-route'
import { postCompanyRoute } from './routes/post-company-route'
import { postInstallationRoute } from './routes/post-installation-route'
import { postRegionalRoute } from './routes/post-regional-route'
import { postSensorRegistryRoute } from './routes/post-sensor-registry-route'
import { postSensorRoute } from './routes/post-sensor-route'
import { postVariableRoute } from './routes/post-variable'
import { subscribeNewTokenRoute } from './routes/subscribe-new-token-route'

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
app.register(getStatusRoute)
app.register(getVariablesRoute)
app.register(getOnlineValuesRoute)
app.register(postCompanyRoute)
app.register(postRegionalRoute)
app.register(postInstallationRoute)
app.register(postAssetRoute)
app.register(postSensorRoute)
app.register(postSensorRegistryRoute)
app.register(postVariableRoute)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running 🚀')
})
