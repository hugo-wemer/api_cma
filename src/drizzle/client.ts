import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env'
import * as schema from './schema'

export const pg = postgres(env.DATABASE_URL)
export const db = drizzle(pg, {
  schema,
})

async function main() {
  console.log('🔄 Resetando tabelas...')
  // Reset na ordem reversa para respeitar FK
  await db.delete(schema.sensorsCommunication)
  await db.delete(schema.sensorsAlarms)
  await db.delete(schema.sensors)
  await db.delete(schema.assets)
  await db.delete(schema.installations)
  await db.delete(schema.regionals)
  await db.delete(schema.companies)
  await db.delete(schema.sensorsRegistries)
  await db.delete(schema.token)

  console.log('🚀 Inserindo dados fixos...')

  await db.insert(schema.companies).values([
    {
      id: '7e0dd2de-3cb1-4f27-980a-055e025b409e',
      companyName: 'Auren',
      companySlug: 'auren',
    },
    {
      id: '72a92769-86e4-447a-8550-f383e285e70f',
      companyName: 'CPFL Renováveis - EOLs',
      companySlug: 'cpfl-renovaveis-eols',
    },
  ])

  await db.insert(schema.regionals).values([
    {
      id: '49a2487e-dab6-4894-8d9b-65922ba91ffa',
      companyOwnerId: '7e0dd2de-3cb1-4f27-980a-055e025b409e',
      regionalName: 'Auren',
      regionalSlug: 'auren',
    },
    {
      id: '051e6b6a-1270-48ff-982c-d40f1c7fcba3',
      companyOwnerId: '72a92769-86e4-447a-8550-f383e285e70f',
      regionalName: 'Icaraizinho',
      regionalSlug: 'icaraizinho',
    },
  ])

  await db.insert(schema.installations).values([
    {
      id: '7cb97dcf-e94b-46d8-a5c6-6a9321412194',
      regionalOwnerId: '49a2487e-dab6-4894-8d9b-65922ba91ffa',
      installationName: 'Ventos do Araripe 3',
      installationSlug: 'ventos-do-araripe-3',
    },
    {
      id: 'b3dfdef2-28a2-4009-8faa-53cddbebfe82',
      regionalOwnerId: '051e6b6a-1270-48ff-982c-d40f1c7fcba3',
      installationName: 'Icaraizinho - SE',
      installationSlug: 'icaraizinho-se',
    },
  ])

  await db.insert(schema.assets).values([
    {
      id: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      installationOwnerId: '7cb97dcf-e94b-46d8-a5c6-6a9321412194',
      assetName: 'TR 04T1',
      assetSlug: 'tr-04t1',
    },
    {
      id: 'b954bd1d-880e-4483-a16b-1b0dc57ecd22',
      installationOwnerId: 'b3dfdef2-28a2-4009-8faa-53cddbebfe82',
      assetName: '04T1',
      assetSlug: '04t1',
    },
  ])

  await db.insert(schema.sensorsRegistries).values([
    {
      id: '33841bdc-5858-4820-baf4-b0209815be0b',
      sensorName: 'BM - Monitor de Bucha',
      sensorSlug: 'bm',
      sensorShowName: 'BM',
    },
    {
      id: '78b5f19a-c1e2-4087-aa1d-08c21ea9ed0d',
      sensorName: 'AVR - Relé Regulador de Tensão',
      sensorSlug: 'avr',
      sensorShowName: 'AVR',
    },
  ])

  await db.insert(schema.sensors).values([
    {
      id: 'ac732d76-ef4b-4ff7-8ebb-015bf9867551',
      sensorRegistryId: '33841bdc-5858-4820-baf4-b0209815be0b',
      assetOwnerId: 'b954bd1d-880e-4483-a16b-1b0dc57ecd22',
    },
    {
      id: '61d38ce6-79b8-4a81-a22e-5496b3919460',
      sensorRegistryId: '78b5f19a-c1e2-4087-aa1d-08c21ea9ed0d',
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
    },
  ])

  await db.insert(schema.sensorsCommunication).values([
    {
      status: 'Ativo',
      sensorOwnerId: 'ac732d76-ef4b-4ff7-8ebb-015bf9867551',
    },
    {
      status: 'Ativo',
      sensorOwnerId: '61d38ce6-79b8-4a81-a22e-5496b3919460',
    },
  ])

  await db.insert(schema.sensorsAlarms).values([
    {
      condition: 'Inativo',
      recognition: 'Reconhecido',
      sensorOwnerId: 'ac732d76-ef4b-4ff7-8ebb-015bf9867551',
    },
    {
      condition: 'Ativo',
      recognition: 'NaoReconhecido',
      sensorOwnerId: '61d38ce6-79b8-4a81-a22e-5496b3919460',
    },
  ])

  await db.insert(schema.token).values([
    {
      accessToken: 'kkkEaeMen',
      refreshToken: 'kkkEaeMennnn',
    },
  ])

  console.log('✅ Seed finalizado com sucesso.')
}

main().catch(err => {
  console.error('❌ Erro ao rodar o seed:', err)
  process.exit(1)
})
