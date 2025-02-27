import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Planet {
  id: number
  name: string
  pictures: {
    icon: string
    header: string
  }
  mass: string
  diameter: string
  orbitalPeriod: string
  moons: number
  description: string
}

// Define a service using a base URL and expected endpoints
export const planetsApi = createApi({
  reducerPath: 'planetApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://galileo-server-s3ir.onrender.com/'
  }),
  endpoints: builder => ({
    getPlanets: builder.query<Planet[], void>({
      query: () => 'planets'
    }),
    getPlanetById: builder.query<Planet, string>({
      query: id => `planets/${id}`
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPlanetByIdQuery, useGetPlanetsQuery } = planetsApi
