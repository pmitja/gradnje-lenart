/* eslint-disable consistent-return */

'use client'

import 'ol/ol.css'

import { Feature, Map, View } from 'ol'
import { Point } from 'ol/geom'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { Icon as OlIcon, Style } from 'ol/style'
import React, { useEffect, useRef } from 'react'

interface PropertyMapProps {
  address: string
  city: string
}

const PropertyMap: React.FC<PropertyMapProps> = ({ address, city }) => {
  const mapRef = useRef<HTMLDivElement>(null)

  const mapInstanceRef = useRef<Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [ 0, 0 ],
        zoom: 1,
      }),
    })

    mapInstanceRef.current = map

    return () => {
      map.setTarget(undefined)
      mapInstanceRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    const getCoordinates = async (address: string, city: string) => {
      const fullAddress = `${address}, ${city}`

      const encodedAddress = encodeURIComponent(fullAddress)

      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json`)

      const data = await response.json()

      if (data && data.length > 0) {
        return [ parseFloat(data[0].lon), parseFloat(data[0].lat) ]
      }
      return [ 14.5058, 46.0569 ] // Fallback coordinates
    }

    const updateMap = async () => {
      const coordinates = await getCoordinates(address, city)

      const transformedCoordinates = fromLonLat(coordinates)

      mapInstanceRef.current!.getView().setCenter(transformedCoordinates)
      mapInstanceRef.current!.getView().setZoom(15)

      const marker = new Feature({
        geometry: new Point(transformedCoordinates),
      })

      marker.setStyle(
        new Style({
          image: new OlIcon({
            anchor: [ 0.5, 1 ],
            src: '/marker.svg',
            scale: 0.06,
          }),
        }),
      )

      const vectorSource = new VectorSource({
        features: [ marker ],
      })

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      })

      mapInstanceRef.current!.getLayers().getArray()
        .filter((layer) => layer instanceof VectorLayer)
        .forEach((layer) => mapInstanceRef.current!.removeLayer(layer))

      mapInstanceRef.current!.addLayer(vectorLayer)
    }

    updateMap()
  }, [ address, city ])

  return <div ref={mapRef} className="h-64 w-full overflow-hidden rounded-2xl shadow-md lg:h-[446px]" />
}

export default PropertyMap
