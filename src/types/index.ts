import { z } from 'zod'

export const subscribeNewTokenRequestSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string()
})

export const getTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  updatedAt: z.date(),
})

export const getStatusResponseSchema = z.object({
  companyStatus: z.array(
    z.object({
      companyName: z.string(),
      companySlug: z.string(),
      regionals: z.array(
        z.object({
          regionalName: z.string(),
          regionalSlug: z.string(),
          installations: z.array(
            z.object({
              installationName: z.string(),
              installationSlug: z.string(),
              assets: z.array(
                z.object({
                  assetName: z.string(),
                  assetSlug: z.string(),
                  sensors: z.array(
                    z.object({
                      sensorRegistry: z
                      .object({
                        sensorName: z.string(),
                        sensorSlug: z.string(),
                        sensorShowName: z.string(),
                      }).nullish(),
                      sensorCommunication: z
                      .object({
                        status: z.enum(["Ativo" , "Inativo" , "Desabilitado" , "EstabelecendoComunicacao" , "Simulacao" , "EmManutencao" , "Indeterminado" , "ComunicacaoParcial"]),
                        updatedAt: z.date(),
                      }),
                      sensorAlarm: z
                      .object({
                        condition: z.string(),
                        recognition: z.string(),
                        muted: z.boolean().nullable(),
                        mutedAt: z.date().nullable(),
                      })
                    })
                  )
                })
              )
            })
          )
        })
      )
    })
  )
})

export const getStatusParamsSchema = z.object({
  companySlug: z.string(),
})

export const getOnlineValuesParamsSchema = z.object({
  companySlug: z.string(),
  regionalSlug: z.string(),
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
          )
        })
      )
    })
  )
})



export type subscribeNewTokenRequestType = z.infer<typeof subscribeNewTokenRequestSchema>
