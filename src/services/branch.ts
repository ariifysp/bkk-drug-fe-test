import httpClient from '../config/http-client'
import { ParamsFetchBranchNearBy, ResponseBranch } from '../shared/interfaces'

export const fetchBranchNearBy = async (params: ParamsFetchBranchNearBy): Promise<ResponseBranch> => {
  const resp = await httpClient.post('/v1/branch/nearby', params)
  return resp.data.data
}