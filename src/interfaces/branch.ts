import { Location } from "./location"

export interface Branch {
  site_id: number
  site_desc: string
  site_address: string
  site_tel: string
  location: BranchLocation
  site_close_time: string
  site_open_time: string
  acerola_cherry_1000mg: number
  salmon_fish_1000mg: number
  distance: number
}

export interface BranchLocation {
  type: string
  coordinates: number[]
}

export interface BranchState {
  branches: Branch[]
}

export interface ParamsFetchBranchNearBy {
  location: Location
  page: number
  size: number
}