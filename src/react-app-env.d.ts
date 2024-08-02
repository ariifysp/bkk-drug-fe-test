/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      PUBLIC_URL: string
      GOOGLE_MAP_API_KEY: string
      GOOGLE_MAPS_MAP_ID: string
      API_URL: string
  }
}