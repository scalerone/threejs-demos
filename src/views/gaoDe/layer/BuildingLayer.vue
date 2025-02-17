<template>
	<div class="main">
		<div class="map" id="map"></div>
	</div>
</template>

<script lang="ts" setup>
import { AMAP_KEY } from "@/config/global"
import AMapLoader from "@amap/amap-jsapi-loader"
import "@amap/amap-jsapi-types"

const map = shallowRef<AMap.Map>()
onMounted(() => {
	initMap()
})

const initMap = () => {
	AMapLoader.load({
		key: AMAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
		version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: ["AMap.HawkEye"] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
	})
		.then(AMap => {
			let buildingLayer = new AMap.Buildings({
				zIndex: 130,
				zooms: [16, 20],
				visible: true, //图层是否可见
				opacity: 1, //图层透明度
				heightFactor: 1, //楼块的高度系数因子
				roofColor: "", // 楼块顶面颜色
				wallColor: "" //楼块侧面颜色
			})
			let options = {
				hideWithoutStyle: false, //是否隐藏设定区域外的楼块
				areas: [
					{
						//围栏1
						//visible:false,//是否可见
						rejectTexture: true, //是否屏蔽自定义地图的纹理
						color1: "ffffff00", //楼顶颜色
						color2: "ffffcc00", //楼面颜色
						path: [
							[116.473606, 39.995997],
							[116.473005, 39.995482],
							[116.472442, 39.994971],
							[116.472267, 39.994801],
							[116.471307, 39.995442],
							[116.471242, 39.995446],
							[116.471163, 39.995403],
							[116.4703, 39.994639],
							[116.469916, 39.994315],
							[116.469194, 39.993719],
							[116.469032, 39.993863],
							[116.468815, 39.994108],
							[116.468625, 39.994355],
							[116.468471, 39.99466],
							[116.468421, 39.994811],
							[116.468366, 39.995156],
							[116.468306, 39.996157],
							[116.468308, 39.996557],
							[116.468483, 39.996884],
							[116.468834, 39.997188],
							[116.469481, 39.997764],
							[116.470511, 39.998708],
							[116.471404, 39.999517],
							[116.471553, 39.999568],
							[116.471713, 39.999563],
							[116.471929, 39.999463],
							[116.473228, 39.998584],
							[116.474008, 39.998046],
							[116.474541, 39.997674],
							[116.474541, 39.997576],
							[116.474604, 39.997049],
							[116.474586, 39.996895],
							[116.474179, 39.996516],
							[116.473585, 39.995997],
							[116.473606, 39.995997]
						]
					},
					{
						//围栏2
						color1: "ff99ff00",
						color2: "ff999900",
						path: [
							[116.474609, 39.993478],
							[116.474489, 39.993495],
							[116.473693, 39.994009],
							[116.472898, 39.994546],
							[116.472837, 39.9946],
							[116.4728, 39.994653],
							[116.472779, 39.994745],
							[116.47282, 39.994815],
							[116.47491, 39.99655],
							[116.475041, 39.996607],
							[116.47525, 39.996643],
							[116.475715, 39.996686],
							[116.475947, 39.996688],
							[116.476103, 39.996658],
							[116.477228, 39.995932],
							[116.477261, 39.995833],
							[116.477264, 39.995729],
							[116.477205, 39.995625],
							[116.47642, 39.994899],
							[116.474854, 39.993558],
							[116.47469, 39.99348],
							[116.474609, 39.993478]
						]
					}
				]
			}
			buildingLayer.setStyle(options) //此配色优先级高于自定义mapStyle

			const mapOptions: AMap.MapOptions = {
				zoom: 17,
				pitch: 50,
				showBuildingBlock: true,
				showIndoorMap: false,
				showLabel: false,
				mapStyle: "amap://styles/light",
				center: [116.472268, 39.995693],
				features: ["bg", "point", "road"],
				viewMode: "3D",
				layers: [AMap.createDefaultLayer(), buildingLayer]
			}
			//设置地图容器id
			map.value = new AMap.Map("map", mapOptions)

			new AMap.Polygon({
				bubble: true,
				fillOpacity: 0.4,
				strokeWeight: 1,
				path: options.areas[0].path,
				map: map.value
			})
			new AMap.Polygon({
				bubble: true,
				fillColor: "green",
				fillOpacity: 0.2,
				strokeWeight: 1,
				path: options.areas[1].path,
				map: map.value
			})
		})
		.catch(e => {
			console.log(e)
		})
}
</script>

<style lang="scss" scoped>
.main {
	display: flex;
	width: 100%;
	height: 100vh;

	.btnList {
		display: flex;
		width: 255px;
		overflow: auto;
		flex-wrap: wrap;
		align-content: flex-start;
	}

	#map {
		flex: 1;
	}
}

.el-button {
	margin: 5px;
}
</style>
