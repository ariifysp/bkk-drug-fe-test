import branchesData from '../data/site-list-with-stock.json'
import { Branch, Location, ParamsFetchBranchNearBy } from '../interfaces'

export const fetchBranchNearBy = async (params: ParamsFetchBranchNearBy): Promise<Branch[]> => {
  const { location, page, size } = params
  const data = await Promise.resolve(branchesData)
  const branches: Branch[] = []
  for (const item of data) {
    const pickup: Location = {
      lat: item.location.coordinates[1],
      lng: item.location.coordinates[0],
    }
    const distance = await calculateDistance(pickup, location)
    branches.push({
      ...item,
      distance: +distance.toFixed(1),
    })
  }
  branches.sort((a, b) => a.distance - b.distance)
  return branches.slice(page - 1, size)
}

const calculateDistance = (pickup: Location, dropoff: Location): number => {
  const toRadians = (degree: number): number => (degree * Math.PI) / 180

  const radius = 6371
  const dLat = toRadians(dropoff.lat - pickup.lat)
  const dLon = toRadians(dropoff.lng - pickup.lng)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(pickup.lat)) * Math.cos(toRadians(dropoff.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return radius * c
}