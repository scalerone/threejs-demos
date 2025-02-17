<template>
	<div id="map"></div>
</template>

<script lang="ts" setup>
import GeoJSON from "ol/format/GeoJSON.js"
import Map from "ol/Map.js"
import View from "ol/View.js"
import { OSM, Vector as VectorSource } from "ol/source.js"
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js"
import { fromLonLat } from "ol/proj.js"
import * as turf from "@turf/turf"

const json = {
	type: "FeatureCollection",
	generator: "overpass-turbo",
	copyright: "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL.",
	timestamp: "2015-09-19T01:26:02Z",
	features: [
		{
			type: "Feature",
			id: "way/33803251",
			properties: {
				"@id": "way/33803251",
				highway: "residential",
				name: "X Corps Boulevard"
			},
			geometry: {
				type: "LineString",
				coordinates: [
					[126.991594, 37.5272773],
					[126.990271, 37.5271954],
					[126.9896898, 37.5271383],
					[126.9884334, 37.5270726],
					[126.9881561, 37.5270408],
					[126.9878154, 37.5269587],
					[126.9870299, 37.5267266],
					[126.9869436, 37.526707],
					[126.9861981, 37.5265093],
					[126.9853379, 37.5262743],
					[126.985257, 37.5262477],
					[126.9850127, 37.5261798],
					[126.9846085, 37.5260924],
					[126.9842276, 37.5260473],
					[126.984073, 37.5260544],
					[126.9834486, 37.5260829],
					[126.9815485, 37.5261698],
					[126.9812511, 37.5261739],
					[126.9800453, 37.5261904],
					[126.978552, 37.5262275],
					[126.9784144, 37.5262574],
					[126.9782714, 37.5262884],
					[126.9779173, 37.5264103],
					[126.9775499, 37.5265481],
					[126.9774604, 37.5265786],
					[126.9773413, 37.5266194],
					[126.9773275, 37.5266241],
					[126.9770187, 37.5266991],
					[126.9766345, 37.5267732],
					[126.9759497, 37.5269031],
					[126.9742686, 37.527135],
					[126.9737761, 37.5271869],
					[126.9734752, 37.5272186],
					[126.9726221, 37.5273085],
					[126.9722279, 37.5273499],
					[126.9721949, 37.5273534],
					[126.9715703, 37.527425],
					[126.9712329, 37.5275071],
					[126.9710191, 37.5275945],
					[126.970812, 37.5277111],
					[126.9706516, 37.5278303],
					[126.9705247, 37.5279442],
					[126.9704512, 37.5280211],
					[126.9704315, 37.5280517],
					[126.9702442, 37.5283407]
				]
			}
		}
	]
}

const source = new VectorSource()
const format = new GeoJSON()
const features = format.readFeatures(json)
const street = features[0]
const turfLine: any = format.writeFeatureObject(street)
const distance = 0.2
const length = turf.lineDistance(turfLine, "kilometers" as any)
for (let i = 1; i <= length / distance; i++) {
	const turfPoint = turf.along(turfLine, i * distance, "kilometers" as any)

	const marker = format.readFeature(turfPoint)
	marker.getGeometry().transform("EPSG:4326", "EPSG:3857")
	source.addFeature(marker)
}

street.getGeometry().transform("EPSG:4326", "EPSG:3857")
source.addFeature(street)

const vectorLayer = new VectorLayer({
	source: source
})

const rasterLayer = new TileLayer({
	source: new OSM()
})

onMounted(() => {
	const map = new Map({
		layers: [rasterLayer, vectorLayer],
		target: document.getElementById("map"),
		view: new View({
			center: fromLonLat([126.980366, 37.52654]),
			zoom: 15
		})
	})
})
</script>

<style lang="scss" scoped>
#map {
	width: 100%;
	height: 100%;
}
</style>
