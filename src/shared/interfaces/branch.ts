import { Location } from "./location"

export interface Branch {
  siteId: string
  address: string
  description: string
  openTime: string
  closeTime: string
  tel: string
  distance: number
}

export interface ResponseBranch {
  page: number
  totalPage: number
  branches: Branch[]
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
  distance: number
  acerolaCherry1000mg?: number
  salmonFish1000mg?: number
  page: number
  size: number
}