import { randomUUID } from 'node:crypto'
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
  await db.delete(schema.onlineValues)
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
      id: 'DBDF1F02-DE9F-4551-9233-C45B5BCB92BE',
      sensorName: 'TM1 - Monitor de Temperatura do Óleo e Enrolamentos',
      sensorSlug: 'tm',
      sensorShowName: 'TM',
    },
    {
      id: '78b5f19a-c1e2-4087-aa1d-08c21ea9ed0d',
      sensorName: 'AVR - Relé Regulador de Tensão',
      sensorSlug: 'avr',
      sensorShowName: 'AVR',
    },
    {
      id: '1A61A477-AAEF-45E7-A4C2-25FB10744AC7',
      sensorName: 'GMP - Sensor Gás e Umidade Dissolvidos no Óleo Isolante',
      sensorSlug: 'gmp',
      sensorShowName: 'GMP',
    },
    {
      id: '72EC3B40-6252-4BE4-AD25-338F9FC944F6',
      sensorName: 'IDM - Monitor para Torque Comutador',
      sensorSlug: 'idm',
      sensorShowName: 'IDM',
    },
    {
      id: 'E250F3C8-3E26-4CA8-80B6-2624AFEB2C63',
      sensorName: 'DM1 - Módulo de Aquisição de Dados',
      sensorSlug: 'dm1',
      sensorShowName: 'DM1',
    },
    {
      id: '7711B6EB-34AC-4D01-86C1-0164197C18BE',
      sensorName: 'DM2 - Módulo de Aquisição de Dados',
      sensorSlug: 'dm2',
      sensorShowName: 'DM2',
    },
    {
      id: 'D8DCE90E-FEC0-48B5-850A-70075616565B',
      sensorName: 'MO - Monitor de Umidade',
      sensorSlug: 'mo',
      sensorShowName: 'MO',
    },
    {
      id: '4A6912FE-9B6D-4107-8878-36B2B4CD83CC',
      sensorName: 'PI - Indicador de Posição',
      sensorSlug: 'pi',
      sensorShowName: 'PI',
    },
    {
      id: '715EDC30-DD80-4A7E-9771-AD419DF8782E',
      sensorName: 'SPS - Supervisor de Paralelismo',
      sensorSlug: 'sps',
      sensorShowName: 'SPS',
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

  await db.insert(schema.variables).values([
    // TM
    {
      id: '1d4a92cc5e3946a691f6a39c56497399',
      sensorRegistriesId: 'DBDF1F02-DE9F-4551-9233-C45B5BCB92BE',
      variableName: 'Parâmetro de alarme por temperatura do óleo',
      unit: '°C',
      component: 'oil',
      function: 'high-alarm',
    },
    {
      id: 'f8e3fe965f764be2a8bfc08352f114da',
      sensorRegistriesId: 'DBDF1F02-DE9F-4551-9233-C45B5BCB92BE',
      variableName: 'Indicação de temperatura do óleo',
      unit: '°C',
      component: 'oil',
      function: 'indication',
    },
    {
      id: 'c118a2b845f743318976bb6a8328993d',
      sensorRegistriesId: 'DBDF1F02-DE9F-4551-9233-C45B5BCB92BE',
      variableName: 'Parâmetro de alarme por temperatura do enrolamento 1',
      unit: '°C',
      component: 'winding',
      function: 'high-alarm',
    },
    {
      id: 'cf29c51f4eee4d4985c858e614f2622b',
      sensorRegistriesId: 'DBDF1F02-DE9F-4551-9233-C45B5BCB92BE',
      variableName: 'Indicação de temperatura do enrolamento 1',
      unit: '°C',
      component: 'winding',
      function: 'indication',
    },
    {
      id: 'fe2db1ff278b4005bc6a36922822572a',
      sensorRegistriesId: 'DBDF1F02-DE9F-4551-9233-C45B5BCB92BE',
      variableName: 'Indicação de estado do relé do grupo de resfriamento 1',
      component: 'forced-cooling-1',
      function: 'indication',
    },
    {
      id: 'ec0df536567d47c9a783897ddb7e8855',
      sensorRegistriesId: 'DBDF1F02-DE9F-4551-9233-C45B5BCB92BE',
      variableName: 'Indicação de estado do relé do grupo de resfriamento 2',
      component: 'forced-cooling-2',
      function: 'indication',
    },
    {
      id: '859d2a2ab8cd43f08dd23c73c217d80d',
      sensorRegistriesId: 'DBDF1F02-DE9F-4551-9233-C45B5BCB92BE',
      variableName: 'Indicação de percentual de carga do enrolamento 1',
      component: 'load',
      function: 'indication',
    },

    // AVR
    {
      id: '6ffe866d25204965bef648060cb3d608',
      sensorRegistriesId: '78b5f19a-c1e2-4087-aa1d-08c21ea9ed0d',
      variableName: 'Indicação de tensão de linha',
      unit: 'kV',
      component: 'voltage',
      function: 'indication',
    },

    // BM
    {
      id: 'f9769e503c16487cb2161514d0772166',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName: 'Indicação de capacitância - Conjunto 1 - Fase A',
      unit: 'pF',
      component: 'capacitance-phase-a',
      function: 'indication',
    },
    {
      id: 'ec004a8d19534df28850a7da6d590ef2',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName: 'Indicação de tangente delta - Conjunto 1 - Fase A',
      unit: '%',
      component: 'delta-tangent-phase-a',
      function: 'indication',
    },
    {
      id: '36e188cbb3784f909dc69e16374f93c0',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName: 'Indicação de corrente de fuga - Conjunto 1 - Fase A',
      unit: 'mA',
      component: 'leak-current-phase-a',
      function: 'indication',
    },
    {
      id: '01d1e0cadd59414aa95dd9787ea595f9',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName: 'Indicação de capacitância - Conjunto 1 - Fase B',
      unit: 'pF',
      component: 'capacitance-phase-b',
      function: 'indication',
    },
    {
      id: 'a244216e0f244ac7afc5e19d0669a436',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName: 'Indicação de tangente delta - Conjunto 1 - Fase B',
      unit: '%',
      component: 'delta-tangent-phase-b',
      function: 'indication',
    },
    {
      id: '6299f1aa1b6e4016ba1020ff38821c78',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName: 'Indicação de corrente de fuga - Conjunto 1 - Fase B',
      unit: 'mA',
      component: 'leak-current-phase-b',
      function: 'indication',
    },
    {
      id: '1f8f9f18eb5a4605bb061178e8e9b687',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName: 'Indicação de capacitância - Conjunto 1 - Fase C',
      unit: 'pF',
      component: 'capacitance-phase-c',
      function: 'indication',
    },
    {
      id: '6f9101e8c2de48e1811d9eee740ec037',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName: 'Indicação de tangente delta - Conjunto 1 - Fase C',
      unit: '%',
      component: 'delta-tangent-phase-c',
      function: 'indication',
    },
    {
      id: '85be58b0b5b647d4ba9191235de0553f',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName: 'Indicação de corrente de fuga - Conjunto 1 - Fase C',
      unit: 'mA',
      component: 'leak-current-phase-c',
      function: 'indication',
    },
    {
      id: 'd5e889823b27445a8003abcf89632ce6',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de alarme por capacitância - Alta - Conjunto 1 - Fase A',
      unit: 'pF',
      component: 'capacitance-phase-a',
      function: 'high-alarm',
    },
    {
      id: 'fcf9e286820a4c22a403223f920a14ae',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de alarme por tangente delta - Alta - Conjunto 1 - Fase A',
      unit: '%',
      component: 'delta-tangent-phase-a',
      function: 'high-alarm',
    },
    {
      id: 'd6cac577e4d447dc8ea223e0fed485eb',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de alarme por corrente de fuga - Alta - Conjunto 1 - Fase A',
      unit: 'mA',
      component: 'leak-current-phase-a',
      function: 'high-alarm',
    },
    {
      id: 'fad973b4f7094dd191c1384fdd129847',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de alarme por capacitância - Alta - Conjunto 1 - Fase B',
      unit: 'pF',
      component: 'capacitance-phase-b',
      function: 'high-alarm',
    },
    {
      id: 'bae4f28b5b0e4c4da3b4cd149dcd20ef',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de alarme por tangente delta - Alta - Conjunto 1 - Fase B',
      unit: '%',
      component: 'delta-tangent-phase-b',
      function: 'high-alarm',
    },
    {
      id: 'bbfd972029fc46ee923669c45c671fc0',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de alarme por corrente de fuga - Alta - Conjunto 1 - Fase B',
      unit: 'mA',
      component: 'leak-current-phase-b',
      function: 'high-alarm',
    },
    {
      id: '25391e8535754989b572a9c504435883',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de alarme por capacitância - Alta - Conjunto 1 - Fase C',
      unit: 'pF',
      component: 'capacitance-phase-c',
      function: 'high-alarm',
    },
    {
      id: '12e7d300ba0447228b13a35483d1a980',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de alarme por tangente delta - Alta - Conjunto 1 - Fase C',
      unit: '%',
      component: 'delta-tangent-phase-c',
      function: 'high-alarm',
    },
    {
      id: '1f5f76165f684ad98e34d842fab4a44e',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de alarme por corrente de fuga - Alta - Conjunto 1 - Fase C',
      unit: 'mA',
      component: 'leak-current-phase-c',
      function: 'high-alarm',
    },
    {
      id: 'd147bafd04fe476190cbeb91d4a81fec',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de valor inicial de capacitância - Conjunto 1 - Fase A',
      unit: 'pF',
      component: 'capacitance-phase-a',
      function: 'initial',
    },
    {
      id: '128e647453234842af4089d389c2a95f',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de valor inicial de tangente delta - Conjunto 1 - Fase A',
      unit: '%',
      component: 'delta-tangent-phase-a',
      function: 'initial',
    },
    {
      id: '6e5ec546f0b54182932608ec1b54081c',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de valor inicial de capacitância - Conjunto 1 - Fase B',
      unit: 'pF',
      component: 'capacitance-phase-b',
      function: 'initial',
    },
    {
      id: 'f68030da69ff44a8b8b58260205486d9',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de valor inicial de tangente delta - Conjunto 1 - Fase B',
      unit: '%',
      component: 'delta-tangent-phase-b',
      function: 'initial',
    },
    {
      id: 'd48052e2b04f4b138fe32b1e86ac5e30',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de valor inicial de capacitância - Conjunto 1 - Fase C',
      unit: 'pF',
      component: 'capacitance-phase-c',
      function: 'initial',
    },
    {
      id: '1ee4380ce4494aafad065819e92b6d84',
      sensorRegistriesId: '33841bdc-5858-4820-baf4-b0209815be0b',
      variableName:
        'Parâmetro de valor inicial de tangente delta - Conjunto 1 - Fase C',
      unit: '%',
      component: 'delta-tangent-phase-c',
      function: 'initial',
    },

    // GMP
    {
      id: 'e6f6208a761a49c3b9587651f1f6fdde',
      sensorRegistriesId: '1A61A477-AAEF-45E7-A4C2-25FB10744AC7',
      variableName: 'Indicação de concentração de H2',
      unit: 'ppm',
      component: 'hydrogen',
      function: 'indication',
    },
    {
      id: '8181366ce73d4aa9a144b7f5db6d6076',
      sensorRegistriesId: '1A61A477-AAEF-45E7-A4C2-25FB10744AC7',
      variableName: 'Parâmetro de alarme por concentração de H2 - Alta',
      unit: 'ppm',
      component: 'hydrogen',
      function: 'high-alarm',
    },
    {
      id: '09c4f48051ed4da0bd5415ce145f74bd',
      sensorRegistriesId: '1A61A477-AAEF-45E7-A4C2-25FB10744AC7',
      variableName: 'Indicação de teor de H2O',
      unit: 'ppm',
      component: 'moisture',
      function: 'indication',
    },
    {
      id: '7c83cd8a08cc4a609e24a46ab7a0a94f',
      sensorRegistriesId: '1A61A477-AAEF-45E7-A4C2-25FB10744AC7',
      variableName: 'Parâmetro de alarme por teor de H2O - Alto',
      unit: 'ppm',
      component: 'moisture',
      function: 'high-alarm',
    },
    {
      id: 'aac7aa182b6541098e7f4373adc93103',
      sensorRegistriesId: '1A61A477-AAEF-45E7-A4C2-25FB10744AC7',
      variableName: 'Indicação de saturação relativa',
      unit: '%',
      component: 'relative-saturation',
      function: 'indication',
    },
    {
      id: '8be705c3d8a94a27a94da560bcbdc0b0',
      sensorRegistriesId: '1A61A477-AAEF-45E7-A4C2-25FB10744AC7',
      variableName: 'Parâmetro de alarme por saturação relativa - Alta',
      unit: '%',
      component: 'relative-saturation',
      function: 'high-alarm',
    },

    // IDM
    {
      id: '201355ad584146b4b3183e9304b3d4e0',
      sensorRegistriesId: '72EC3B40-6252-4BE4-AD25-338F9FC944F6',
      variableName: 'Indicação de tensão do motor - Fase A',
      unit: 'V',
      component: 'voltage-phase-a',
      function: 'indication',
    },
    {
      id: '32da8924fa7d4646801f3e9130a7bf7b',
      sensorRegistriesId: '72EC3B40-6252-4BE4-AD25-338F9FC944F6',
      variableName: 'Indicação de tensão do motor - Fase B',
      unit: 'V',
      component: 'voltage-phase-b',
      function: 'indication',
    },
    {
      id: '5d197b61fc8e414397555b3f52b878da',
      sensorRegistriesId: '72EC3B40-6252-4BE4-AD25-338F9FC944F6',
      variableName: 'Indicação de tensão do motor - Fase C',
      unit: 'V',
      component: 'voltage-phase-c',
      function: 'indication',
    },
    {
      id: '7f0cd6033c9443769c8fbc005168c9d6',
      sensorRegistriesId: '72EC3B40-6252-4BE4-AD25-338F9FC944F6',
      variableName: 'Parâmetro manual de alarme por tensão do motor - Baixa',
      unit: 'V',
      component: 'voltage',
      function: 'low-alarm',
    },
    {
      id: 'f9e2113c7bda426084033c9bcbe34fda',
      sensorRegistriesId: '72EC3B40-6252-4BE4-AD25-338F9FC944F6',
      variableName: 'Parâmetro manual de alarme por tensão do motor - Alta',
      unit: 'V',
      component: 'voltage',
      function: 'high-alarm',
    },

    // MO
    {
      id: 'ae07405d759643c9a1a0c3f06fd8948a',
      sensorRegistriesId: '72EC3B40-6252-4BE4-AD25-338F9FC944F6',
      variableName: 'Indicação de teor de água',
      unit: 'ppm',
      component: 'moisture',
      function: 'indication',
    },
    {
      id: '2157aa58c3724d3b852f5ca484b447c5',
      sensorRegistriesId: '72EC3B40-6252-4BE4-AD25-338F9FC944F6',
      variableName: 'Indicação de saturação relativa',
      unit: '%',
      component: 'relative-saturation',
      function: 'indication',
    },

    // SPS
    {
      id: 'c467a4b06a4f44b2808b89312927577f',
      sensorRegistriesId: '715EDC30-DD80-4A7E-9771-AD419DF8782E',
      variableName: 'SPS3 : Indicação de posição de tap',
      component: 'tap',
      function: 'indication',
    },
  ])

  await db.insert(schema.onlineValues).values([
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '1d4a92cc5e3946a691f6a39c56497399',
      valueMax: '95',
      valueAverage: '95',
      valueMin: '95',
      valueRecent: '95',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'f8e3fe965f764be2a8bfc08352f114da',
      valueMax: '87',
      valueAverage: '67',
      valueMin: '20',
      valueRecent: '58',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'c118a2b845f743318976bb6a8328993d',
      valueMax: '110',
      valueAverage: '110',
      valueMin: '110',
      valueRecent: '110',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'cf29c51f4eee4d4985c858e614f2622b',
      valueMax: '100',
      valueAverage: '80',
      valueMin: '20',
      valueRecent: '76',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'fe2db1ff278b4005bc6a36922822572a',
      valueMax: '1',
      valueAverage: '1',
      valueMin: '0',
      valueRecent: '1',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'ec0df536567d47c9a783897ddb7e8855',
      valueMax: '1',
      valueAverage: '1',
      valueMin: '0',
      valueRecent: '1',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '859d2a2ab8cd43f08dd23c73c217d80d',
      valueMax: '103',
      valueAverage: '87',
      valueMin: '0',
      valueRecent: '75',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '6ffe866d25204965bef648060cb3d608',
      valueMax: '36700',
      valueAverage: '34500',
      valueMin: '33800',
      valueRecent: '34500',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'f9769e503c16487cb2161514d0772166',
      valueMax: '500',
      valueAverage: '500',
      valueMin: '500',
      valueRecent: '500',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'ec004a8d19534df28850a7da6d590ef2',
      valueMax: '0,3',
      valueAverage: '0,3',
      valueMin: '0,3',
      valueRecent: '0,3',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '36e188cbb3784f909dc69e16374f93c0',
      valueMax: '24,3',
      valueAverage: '24,1',
      valueMin: '23,9',
      valueRecent: '24',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '01d1e0cadd59414aa95dd9787ea595f9',
      valueMax: '560',
      valueAverage: '560',
      valueMin: '560',
      valueRecent: '560',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'a244216e0f244ac7afc5e19d0669a436',
      valueMax: '0,33',
      valueAverage: '0,33',
      valueMin: '0,33',
      valueRecent: '0,33',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '6299f1aa1b6e4016ba1020ff38821c78',
      valueMax: '26,7',
      valueAverage: '26,2',
      valueMin: '25,7',
      valueRecent: '26',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '1f8f9f18eb5a4605bb061178e8e9b687',
      valueMax: '490',
      valueAverage: '490',
      valueMin: '490',
      valueRecent: '490',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '6f9101e8c2de48e1811d9eee740ec037',
      valueMax: '0,28',
      valueAverage: '0,28',
      valueMin: '0,28',
      valueRecent: '0,28',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '85be58b0b5b647d4ba9191235de0553f',
      valueMax: '22,9',
      valueAverage: '22,6',
      valueMin: '22,3',
      valueRecent: '22,4',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'd5e889823b27445a8003abcf89632ce6',
      valueMax: '520',
      valueAverage: '520',
      valueMin: '520',
      valueRecent: '520',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'fcf9e286820a4c22a403223f920a14ae',
      valueMax: '0,7',
      valueAverage: '0,7',
      valueMin: '0,7',
      valueRecent: '0,7',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'd6cac577e4d447dc8ea223e0fed485eb',
      valueMax: '25',
      valueAverage: '25',
      valueMin: '25',
      valueRecent: '25',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'fad973b4f7094dd191c1384fdd129847',
      valueMax: '590',
      valueAverage: '590',
      valueMin: '590',
      valueRecent: '590',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'bae4f28b5b0e4c4da3b4cd149dcd20ef',
      valueMax: '0,7',
      valueAverage: '0,7',
      valueMin: '0,7',
      valueRecent: '0,7',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'bbfd972029fc46ee923669c45c671fc0',
      valueMax: '25',
      valueAverage: '25',
      valueMin: '25',
      valueRecent: '25',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '25391e8535754989b572a9c504435883',
      valueMax: '510',
      valueAverage: '510',
      valueMin: '510',
      valueRecent: '510',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '12e7d300ba0447228b13a35483d1a980',
      valueMax: '0,7',
      valueAverage: '0,7',
      valueMin: '0,7',
      valueRecent: '0,7',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '1f5f76165f684ad98e34d842fab4a44e',
      valueMax: '25',
      valueAverage: '25',
      valueMin: '25',
      valueRecent: '25',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'd147bafd04fe476190cbeb91d4a81fec',
      valueMax: '500',
      valueAverage: '500',
      valueMin: '500',
      valueRecent: '500',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '128e647453234842af4089d389c2a95f',
      valueMax: '0,3',
      valueAverage: '0,3',
      valueMin: '0,3',
      valueRecent: '0,3',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '6e5ec546f0b54182932608ec1b54081c',
      valueMax: '560',
      valueAverage: '560',
      valueMin: '560',
      valueRecent: '560',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'f68030da69ff44a8b8b58260205486d9',
      valueMax: '0,33',
      valueAverage: '0,33',
      valueMin: '0,33',
      valueRecent: '0,33',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'd48052e2b04f4b138fe32b1e86ac5e30',
      valueMax: '490',
      valueAverage: '490',
      valueMin: '490',
      valueRecent: '490',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '1ee4380ce4494aafad065819e92b6d84',
      valueMax: '0,28',
      valueAverage: '0,28',
      valueMin: '0,28',
      valueRecent: '0,28',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'e6f6208a761a49c3b9587651f1f6fdde',
      valueMax: '30',
      valueAverage: '30',
      valueMin: '30',
      valueRecent: '30',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '8181366ce73d4aa9a144b7f5db6d6076',
      valueMax: '200',
      valueAverage: '200',
      valueMin: '200',
      valueRecent: '200',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '09c4f48051ed4da0bd5415ce145f74bd',
      valueMax: '18',
      valueAverage: '10',
      valueMin: '3',
      valueRecent: '9',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '7c83cd8a08cc4a609e24a46ab7a0a94f',
      valueMax: '25',
      valueAverage: '25',
      valueMin: '25',
      valueRecent: '25',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'aac7aa182b6541098e7f4373adc93103',
      valueMax: '18',
      valueAverage: '10',
      valueMin: '3',
      valueRecent: '9',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '8be705c3d8a94a27a94da560bcbdc0b0',
      valueMax: '20',
      valueAverage: '20',
      valueMin: '20',
      valueRecent: '20',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '201355ad584146b4b3183e9304b3d4e0',
      valueMax: '222',
      valueAverage: '220',
      valueMin: '219',
      valueRecent: '220',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '32da8924fa7d4646801f3e9130a7bf7b',
      valueMax: '223',
      valueAverage: '221',
      valueMin: '220',
      valueRecent: '221',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '5d197b61fc8e414397555b3f52b878da',
      valueMax: '224',
      valueAverage: '222',
      valueMin: '221',
      valueRecent: '222',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '7f0cd6033c9443769c8fbc005168c9d6',
      valueMax: '210',
      valueAverage: '210',
      valueMin: '210',
      valueRecent: '210',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'f9e2113c7bda426084033c9bcbe34fda',
      valueMax: '230',
      valueAverage: '230',
      valueMin: '230',
      valueRecent: '230',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'ae07405d759643c9a1a0c3f06fd8948a',
      valueMax: '18',
      valueAverage: '10',
      valueMin: '3',
      valueRecent: '9',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: '2157aa58c3724d3b852f5ca484b447c5',
      valueMax: '18',
      valueAverage: '10',
      valueMin: '3',
      valueRecent: '9',
    },
    {
      id: randomUUID(),
      assetOwnerId: '64febbd7-e23b-4226-ae8d-e7f4f2c5067f',
      variableId: 'c467a4b06a4f44b2808b89312927577f',
      valueMax: '10',
      valueAverage: '8',
      valueMin: '6',
      valueRecent: '7',
    },
  ])

  console.log('✅ Seed finalizado com sucesso.')
}

main().catch(err => {
  console.error('❌ Erro ao rodar o seed:', err)
  process.exit(1)
})
