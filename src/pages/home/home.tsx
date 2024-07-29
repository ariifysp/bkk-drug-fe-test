import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GoogleMap, LoadScriptNext, Autocomplete } from '@react-google-maps/api'

import {
  Container,
  InputBase,
  Typography,
  Grid,
  IconButton,
  Button,
} from '@mui/material'
import { FmdGood, MyLocation } from '@mui/icons-material'
import CustomCard from '../../components/card/card'

import config from '../../config'
import { Location } from '../../interfaces'
import { setAddress, setLocation } from '../../store/reducers/location-slice'
import { RootState } from '../../store'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useSelector((state: RootState) => state.location.location)
  const address = useSelector((state: RootState) => state.location.address)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onMapLoad = useCallback(async (map: google.maps.Map) => {
    await setMap(map)
    mapRef.current = map
  }, [])

  const fetchAddress = useCallback(async (location: Location) => {
    const geocoder = new google.maps.Geocoder()
    await geocoder.geocode({ location: location }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        dispatch(setAddress(results[0].formatted_address))
      }
    })
  }, [dispatch])

  const setMarker = useCallback(async (location: Location) => {
    await dispatch(setLocation(location))
    await fetchAddress(location)
    if (mapRef.current) {
      if (!markerRef.current) {
        markerRef.current = new google.maps.marker.AdvancedMarkerElement({
          position: location,
          map: mapRef.current,
        });
      } else {
        markerRef.current.position = location;
      }
      map?.panTo(location)
    }
  }, [dispatch, fetchAddress, map])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      const location: Location = {
        lat: latitude,
        lng: longitude,
      }
      setMarker(location)
    })
  }, [location, dispatch, fetchAddress, setMarker])
  
  const onPlaceChanged = async () => {
    const place = await autocompleteRef.current?.getPlace()
    if (place?.geometry?.location) {
      const location: Location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
      setMarker(location)
    }
  }

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const location: Location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      setMarker(location)
    }
  }

  const getCurrentLocation = async () => {
    await navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      const location: Location = {
        lat: latitude,
        lng: longitude,
      }
      setMarker(location)
    })
  }

  return (
    <Container fixed>
      <Grid className='my-5' container>
        <Grid item columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
          <Typography>เลือกที่อยู่ส่งด่วน</Typography>
        </Grid>
      </Grid>

      <LoadScriptNext
        googleMapsApiKey={config.GOOGLE_MAP_API_KEY}
        libraries={['places', 'marker']}
      >
        <GoogleMap
          mapContainerStyle={{width: '100%', height: '50vh'}}
          center={location}
          zoom={15}
          onLoad={onMapLoad}
          onClick={onMapClick}
          options={{
            mapId: config.GOOGLE_MAPS_MAP_ID,
          }}
        >
          <Autocomplete
            onLoad={ref => (autocompleteRef.current = ref)}
            onPlaceChanged={onPlaceChanged}
          >
            <InputBase
              className='border-1 bg-white rounded-full px-5 w-1/2 h-10 shadow-lg absolute left-1/2 top-5 transform -translate-x-1/2'
              ref={inputRef}
              placeholder="Search for places"              
            />
          </Autocomplete>
        </GoogleMap>
      </LoadScriptNext>

      <Grid className='mt-5 justify-center' container>
        <Grid item columns={{xs: 12, sm: 12, md: 8, lg: 6}}>
          <CustomCard>
            <Typography>ที่อยู่* (ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์)</Typography>
            <Grid className='mt-3'>
              <CustomCard>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <FmdGood className='text-red-600 mr-5'/>
                    <Typography>{address}</Typography>
                  </div>
                  <IconButton onClick={getCurrentLocation}>
                    <MyLocation className='text-cyan-500'/>
                  </IconButton>
                </div>
              </CustomCard>
            </Grid>
          </CustomCard>
        </Grid>
      </Grid>

      <Grid className='mt-5' container justifyContent='center'>
        <Grid item>
          <Button variant="contained" onClick={() => navigate('/cart')}>ยืนยันตำแหน่ง</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home