import { z } from 'zod'

export const postCompanyRequestSchema = z.object({
  id: z.string().uuid(),
  companyName: z.string(),
  companySlug: z.string(),
})

export const postRegionalRequestSchema = z.object({
  id: z.string().uuid(),
  regionalName: z.string(),
  companyOwnerId: z.string().uuid(),
})

export const postInstallationRequestSchema = z.object({
  id: z.string().uuid(),
  installationName: z.string(),
  installationSlug: z.string(),
  companyOwnerId: z.string().uuid(),
})

export const postAssetRequestSchema = z.object({
  id: z.string().uuid(),
  assetName: z.string(),
  assetSlug: z.string(),
  installationOwnerId: z.string().uuid(),
})

export const postSensorRequestSchema = z.object({
  id: z.string().uuid(),
  assetOwnerId: z.string().uuid(),
  sensorRegistryId: z.string().uuid(),
})

export const postSensorRegistryRequestSchema = z.object({
  id: z.string().uuid(),
  sensorName: z.string(),
  sensorSlug: z.string(),
  sensorShowName: z.string(),
})

export const postVariableRequestSchema = z.object({
  id: z.string(),
  sensorRegistryId: z.string().uuid(),
  variableName: z.string(),
  unit: z.string(),
  component: z.string(),
  fx: z.string(),
})

export const subscribeNewTokenRequestSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export const getTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  updatedAt: z.date(),
})

export const getStatusResponseSchema = z.object({
  status: z.array(
    z.object({
      installationName: z.string().nullable(),
      installationSlug: z.string().nullable(),
      assets: z.array(
        z.object({
          assetName: z.string().nullable(),
          assetSlug: z.string().nullable(),
          sensors: z.array(
            z.object({
              sensorShowName: z.string().nullable(),
              sensorAlarmCondition: z.string().nullable(),
              sensorAlarmRecognition: z.string().nullable(),
              sensorCommunicationStatus: z.string().nullable(),
              sensorMuted: z.boolean().nullable(),
            })
          ),
        })
      ),
    })
  ),
})

export const getStatusParamsSchema = z.object({
  companySlug: z.string(),
})

export const getOnlineValuesParamsSchema = z.object({
  companySlug: z.string(),
  installationSlug: z.string(),
  assetSlug: z.string(),
})

export const getOnlineValuesResponseSchema = z.object({
  onlineValues: z.array(
    z.object({
      assetName: z.string().nullable(),
      installationName: z.string().nullable(),
      regionalName: z.string().nullable(),
      companyName: z.string().nullable(),
      sensors: z.array(
        z.object({
          sensorName: z.string().nullable(),
          onlineValues: z.array(
            z.object({
              variableName: z.string().nullable(),
              unit: z.string().nullable(),
              component: z.string().nullable(),
              function: z.string().nullable(),
              valueMax: z.string().nullable(),
              valueAverage: z.string().nullable(),
              valueMin: z.string().nullable(),
              valueRecent: z.string().nullable(),
            })
          ),
        })
      ),
    })
  ),
})

export const getRegistriesResponseSchema = z.object({
  companyWithRelations: z.array(
    z.object({
      id: z.string(),
      companyName: z.string(),
      companySlug: z.string(),

      installations: z.array(
        z.object({
          id: z.string(),
          installationName: z.string(),
          installationSlug: z.string(),
          assets: z.array(
            z.object({
              id: z.string(),
              assetName: z.string(),
              assetSlug: z.string(),
              sensors: z.array(
                z.object({
                  id: z.string(),
                  sensorRegistry: z
                    .object({
                      sensorName: z.string(),
                      sensorSlug: z.string(),
                      sensorShowName: z.string(),
                    })
                    .nullable()
                    .nullish(),
                })
              ),
            })
          ),
        })
      ),
    })
  ),
})

export const getVariablesSchema = z.object({
  variables: z.array(
    z.object({
      id: z.string(),
      sensorRegistriesId: z.string(),
      variableName: z.string(),
      unit: z.string().nullable(),
      component: z.string(),
      function: z.string(),
    })
  ),
})

export type subscribeNewTokenRequestType = z.infer<
  typeof subscribeNewTokenRequestSchema
>

export type postCompanyRequestType = z.infer<typeof postCompanyRequestSchema>
export type postRegionalRequestType = z.infer<typeof postRegionalRequestSchema>
export type postInstallationRequestType = z.infer<
  typeof postInstallationRequestSchema
>
export type postAssetRequestType = z.infer<typeof postAssetRequestSchema>
export type postSensorRequestType = z.infer<typeof postSensorRequestSchema>
export type postSensorRegistryRequestType = z.infer<
  typeof postSensorRegistryRequestSchema
>
export type postVariableRequestType = z.infer<typeof postVariableRequestSchema>
