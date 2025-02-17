import type { RouteRecordRaw } from "vue-router"

export const gaoDeRouter: RouteRecordRaw[] = [
	{
		path: "/gaoDe",
		name: "高德地图",
		redirect: "/gaoDe/base/map",
		children: [
			{
				path: "/gaoDe/base/map",
				name: "地图-gaoDe",
				component: () => import("@/views/gaoDe/base/Map.vue")
			},
			{
				path: "/gaoDe/base/control",
				name: "地图控件-gaoDe",
				component: () => import("@/views/gaoDe/base/Control.vue")
			},
			{
				path: "/gaoDe/layer/building",
				name: "自定义地图-gaoDe",
				component: () => import("@/views/gaoDe/layer/BuildingLayer.vue")
			},
			{
				path: "/gaoDe/layer/areaMasking",
				name: "区域遮掩-gaoDe",
				component: () => import("@/views/gaoDe/layer/AreaMasking.vue")
			},
			{
				path: "/gaoDe/layer/regionsOfChina",
				name: "简易行政区图-中国-gaoDe",
				component: () => import("@/views/gaoDe/layer/RegionsOfChina.vue")
			},
			{
				path: "/gaoDe/layer/regionsOfWorld",
				name: "简易行政区图-世界-gaoDe",
				component: () => import("@/views/gaoDe/layer/RegionsOfWorld.vue")
			},
			{
				path: "/gaoDe/layer/WMTS",
				name: "WMTS-gaoDe",
				component: () => import("@/views/gaoDe/layer/WMTS.vue")
			},
			{
				path: "/gaoDe/layer/WMS",
				name: "WMS-gaoDe",
				component: () => import("@/views/gaoDe/layer/WMS.vue")
			},
			{
				path: "/gaoDe/layer/xyzTileLayer",
				name: "xyz栅格图层-gaoDe",
				component: () => import("@/views/gaoDe/layer/XyzTileLayer.vue")
			},
			{
				path: "/gaoDe/layer/imageLayer",
				name: "图片图层-gaoDe",
				component: () => import("@/views/gaoDe/layer/ImageLayer.vue")
			},
			{
				path: "/gaoDe/layer/canvasLayer",
				name: "Canvas图层-gaoDe",
				component: () => import("@/views/gaoDe/layer/CanvasLayer.vue")
			},
			{
				path: "/gaoDe/layer/heatmap",
				name: "高德热力图-gaoDe",
				component: () => import("@/views/gaoDe/layer/Heatmap.vue")
			},
			{
				path: "/gaoDe/layer/customLayerCanvas",
				name: "自定义图层-Canvas-gaoDe",
				component: () => import("@/views/gaoDe/layer/CustomLayerCanvas.vue")
			},
			{
				path: "/gaoDe/layer/indoorMap",
				name: "室内地图-gaoDe",
				component: () => import("@/views/gaoDe/layer/IndoorMap.vue")
			},
			{
				path: "/gaoDe/layer/labelsLayer",
				name: "标注图层-gaoDe",
				component: () => import("@/views/gaoDe/layer/LabelsLayer.vue")
			},
			{
				path: "/gaoDe/covering/marker",
				name: "点标记-gaoDe",
				component: () => import("@/views/gaoDe/covering/Marker.vue")
			},
			{
				path: "/gaoDe/covering/text",
				name: "文本标记-gaoDe",
				component: () => import("@/views/gaoDe/covering/Text.vue")
			},
			{
				path: "/gaoDe/covering/icon",
				name: "Icon-gaoDe",
				component: () => import("@/views/gaoDe/covering/Icon.vue")
			},
			{
				path: "/gaoDe/covering/labelMarker",
				name: "标注-gaoDe",
				component: () => import("@/views/gaoDe/covering/LabelMarker.vue")
			},
			{
				path: "/gaoDe/covering/circleMarker",
				name: "圆点标记-gaoDe",
				component: () => import("@/views/gaoDe/covering/CircleMarker.vue")
			},
			{
				path: "/gaoDe/covering/moveAnimation",
				name: "轨迹回放-gaoDe",
				component: () => import("@/views/gaoDe/covering/MoveAnimation.vue")
			},
			{
				path: "/gaoDe/covering/elasticMarker",
				name: "灵活点标记-gaoDe",
				component: () => import("@/views/gaoDe/covering/ElasticMarker.vue")
			},
			{
				path: "/gaoDe/covering/massMarks",
				name: "海量点标记-gaoDe",
				component: () => import("@/views/gaoDe/covering/MassMarks.vue")
			},
			{
				path: "/gaoDe/covering/markerCluster",
				name: "点聚合-gaoDe",
				component: () => import("@/views/gaoDe/covering/MarkerCluster.vue")
			},
			{
				path: "/gaoDe/covering/markerClusterWeight",
				name: "点聚合(索引)-gaoDe",
				component: () => import("@/views/gaoDe/covering/MarkerClusterWeight.vue")
			},
			{
				path: "/gaoDe/covering/polyline",
				name: "折线-gaoDe",
				component: () => import("@/views/gaoDe/covering/Polyline.vue")
			},
			{
				path: "/gaoDe/covering/bezierCurve",
				name: "弧线-gaoDe",
				component: () => import("@/views/gaoDe/covering/BezierCurve.vue")
			},
			{
				path: "/gaoDe/covering/polygon",
				name: "多边形-gaoDe",
				component: () => import("@/views/gaoDe/covering/Polygon.vue")
			},
			{
				path: "/gaoDe/covering/rectangle",
				name: "矩形-gaoDe",
				component: () => import("@/views/gaoDe/covering/Rectangle.vue")
			},
			{
				path: "/gaoDe/covering/circle",
				name: "圆-gaoDe",
				component: () => import("@/views/gaoDe/covering/Circle.vue")
			},
			{
				path: "/gaoDe/covering/ellipse",
				name: "椭圆-gaoDe",
				component: () => import("@/views/gaoDe/covering/Ellipse.vue")
			},
			{
				path: "/gaoDe/covering/draw",
				name: "绘制-gaoDe",
				component: () => import("@/views/gaoDe/covering/Draw.vue")
			},
			{
				path: "/gaoDe/covering/geoJSON",
				name: "GeoJSON-gaoDe",
				component: () => import("@/views/gaoDe/covering/GeoJSON.vue")
			},
			{
				path: "/gaoDe/covering/adsorb",
				name: "吸附-gaoDe",
				component: () => import("@/views/gaoDe/covering/Adsorb.vue")
			},
			{
				path: "/gaoDe/covering/contextMenu",
				name: "右键菜单-gaoDe",
				component: () => import("@/views/gaoDe/covering/ContextMenu.vue")
			},
			{
				path: "/gaoDe/search/tips",
				name: "输入提示-gaoDe",
				component: () => import("@/views/gaoDe/search/Tips.vue")
			},
			{
				path: "/gaoDe/search/keyword",
				name: "关键字搜索-gaoDe",
				component: () => import("@/views/gaoDe/search/Keyword.vue")
			},
			{
				path: "/gaoDe/search/rim",
				name: "周边搜索-gaoDe",
				component: () => import("@/views/gaoDe/search/Rim.vue")
			},
			{
				path: "/gaoDe/search/polygon",
				name: "多边形搜索-gaoDe",
				component: () => import("@/views/gaoDe/search/Polygon.vue")
			},
			{
				path: "/gaoDe/search/detail",
				name: "详情-gaoDe",
				component: () => import("@/views/gaoDe/search/Detail.vue")
			},
			{
				path: "/gaoDe/planning/routePlanning",
				name: "驾车路线规划-gaoDe",
				component: () => import("@/views/gaoDe/planning/RoutePlanning.vue")
			},
			{
				path: "/gaoDe/planning/dragRoute",
				name: "可拖拽驾车路线规划-gaoDe",
				component: () => import("@/views/gaoDe/planning/DragRoute.vue")
			},
			{
				path: "/gaoDe/lbs/transcoding",
				name: "编码转换-gaoDe",
				component: () => import("@/views/gaoDe/lbs/Transcoding.vue")
			},
			{
				path: "/gaoDe/lbs/trajectory",
				name: "轨迹纠偏-gaoDe",
				component: () => import("@/views/gaoDe/lbs/Trajectory.vue")
			},
			{
				path: "/gaoDe/lbs/weather",
				name: "天气-gaoDe",
				component: () => import("@/views/gaoDe/lbs/Weather.vue")
			},
			{
				path: "/gaoDe/lbs/busStop",
				name: "公交站点-gaoDe",
				component: () => import("@/views/gaoDe/lbs/BusStop.vue")
			},
			{
				path: "/gaoDe/lbs/busLine",
				name: "公交线路-gaoDe",
				component: () => import("@/views/gaoDe/lbs/BusLine.vue")
			},
			{
				path: "/gaoDe/lbs/geocoding",
				name: "行政区边界-gaoDe",
				component: () => import("@/views/gaoDe/lbs/Geocoding.vue")
			},
			{
				path: "/gaoDe/lbs/arrivalRange",
				name: "公交到达圈-gaoDe",
				component: () => import("@/views/gaoDe/lbs/ArrivalRange.vue")
			},
			{
				path: "/gaoDe/other/zoom",
				name: "拉框缩放-gaoDe",
				component: () => import("@/views/gaoDe/other/Zoom.vue")
			},
			{
				path: "/gaoDe/other/measure",
				name: "距离面积测量-gaoDe",
				component: () => import("@/views/gaoDe/other/Measure.vue")
			},
			{
				path: "/gaoDe/other/pointCalculate",
				name: "两点间距离-gaoDe",
				component: () => import("@/views/gaoDe/other/PointCalculate.vue")
			},
			{
				path: "/gaoDe/other/lineCalculate",
				name: "点到直线距离-gaoDe",
				component: () => import("@/views/gaoDe/other/LineCalculate.vue")
			},
			{
				path: "/gaoDe/other/areaOfLength",
				name: "距离面积-gaoDe",
				component: () => import("@/views/gaoDe/other/AreaOfLength.vue")
			},
			{
				path: "/gaoDe/other/isOnLine",
				name: "点是否在线上-gaoDe",
				component: () => import("@/views/gaoDe/other/IsOnLine.vue")
			},
			{
				path: "/gaoDe/other/isOnPolygon",
				name: "点是否在多边形内-gaoDe",
				component: () => import("@/views/gaoDe/other/IsOnPolygon.vue")
			},
			{
				path: "/gaoDe/other/geometricRelationship",
				name: "几何关系-gaoDe",
				component: () => import("@/views/gaoDe/other/GeometricRelationship.vue")
			},
			{
				path: "/gaoDe/loca/cellularHeatmap",
				name: "蜂窝热力图-gaoDe",
				component: () => import("@/views/gaoDe/loca/CellularHeatmap.vue")
			},
			{
				path: "/gaoDe/loca/gridHeatmap",
				name: "网格热力图-gaoDe",
				component: () => import("@/views/gaoDe/loca/GridHeatmap.vue")
			},
			{
				path: "/gaoDe/loca/heatmap",
				name: "热力图-gaoDe",
				component: () => import("@/views/gaoDe/loca/Heatmap.vue")
			},
			{
				path: "/gaoDe/loca/pulseLine",
				name: "脉冲线-gaoDe",
				component: () => import("@/views/gaoDe/loca/PulseLine.vue")
			},
			{
				path: "/gaoDe/loca/flyingLine",
				name: "飞线-gaoDe",
				component: () => import("@/views/gaoDe/loca/FlyingLine.vue")
			},
			{
				path: "/gaoDe/loca/iconLayer",
				name: "图标图层-gaoDe",
				component: () => import("@/views/gaoDe/loca/IconLayer.vue")
			},
			{
				path: "/gaoDe/loca/postLocation",
				name: "贴地点-gaoDe",
				component: () => import("@/views/gaoDe/loca/PostLocation.vue")
			},
			{
				path: "/gaoDe/loca/prismLayer",
				name: "棱柱图层-gaoDe",
				component: () => import("@/views/gaoDe/loca/PrismLayer.vue")
			},
			{
				path: "/gaoDe/loca/dotLayer",
				name: "圆点图层-gaoDe",
				component: () => import("@/views/gaoDe/loca/DotLayer.vue")
			},
			{
				path: "/gaoDe/loca/signagePoint",
				name: "标牌点-gaoDe",
				component: () => import("@/views/gaoDe/loca/SignagePoint.vue")
			},
			{
				path: "/gaoDe/loca/labelsLayer",
				name: "标注图层-gaoDe",
				component: () => import("@/views/gaoDe/loca/LabelsLayer.vue")
			},
			{
				path: "/gaoDe/loca/laserLayer",
				name: "激光图层-gaoDe",
				component: () => import("@/views/gaoDe/loca/LaserLayer.vue")
			},
			{
				path: "/gaoDe/loca/shotAnimation",
				name: "镜头动画-gaoDe",
				component: () => import("@/views/gaoDe/loca/ShotAnimation.vue")
			},
			{
				path: "/gaoDe/loca/illuminant",
				name: "光源-gaoDe",
				component: () => import("@/views/gaoDe/loca/Illuminant.vue")
			}
		]
	}
]
