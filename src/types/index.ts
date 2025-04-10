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


export type subscribeNewTokenRequestType = z.infer<typeof subscribeNewTokenRequestSchema>
