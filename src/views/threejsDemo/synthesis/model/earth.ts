import * as THREE from "three"
import WebGlScene from "@utils/three/webGlScene"
import fragmentShader from "../shaders/earth/fragment.glsl?raw"
import vertexShader from "../shaders/earth/vertex.glsl?raw"
import { createAnimateLine, flyArc, getCirclePoints, lon2xyz } from "@/utils/three/utils"
import data from "../data/data"
import { gsap } from "gsap"
import LightPillar from "@/utils/three/mesh/lightPillar/lightPillar"

export interface IConfig {
	controls?: {
		type: "OrbitControls" | "FlyControls" | false
	}
	camera?: {
		type: "PerspectiveCamera" | "OrthographicCamera"
	}
	css3DRender?: boolean
	css2DRender?: boolean
	effect?: boolean
	loading?: {
		show?: boolean
		html?: boolean
		loadingId?: string
		callback?: Function
	}
}

export default class Earth extends WebGlScene {
	isLoad: false
	group: THREE.Group
	earthGroup: THREE.Group
	satelliteGroup: THREE.Group
	starGroup: THREE.Group
	labelGroup: THREE.Group
	flyLineGroup: THREE.Group
	markerGroup: THREE.Group
	radius = 50
	timeValue = 100
	earchUniforms = {
		map: {
			value: null
		}
	}
	circleList = []
	flyLineList = []

	constructor(domElement: HTMLDivElement, webGlRenderer: THREE.WebGLRenderer, config: IConfig = {}) {
		super(domElement, webGlRenderer, config)
	}

	load(callback?) {
		this.loadSource(
			{
				texture: [
					"/earth/gradient.png",
					"/earth/earth.jpg",
					"/earth/glow.png",
					"/map/lightColumn.png",
					"/map/markingAperture.png",
					"/map/label.png"
				]
			},
			{
				html: true,
				callback: callback
			}
		)
	}

	create() {
		this.createPerspectiveCamera(5, -20, 200, 45, "earchCamera")
		this.switchCamera("earchCamera")
		this.scene.background = new THREE.Color(0x020924)
		this.scene.fog = new THREE.Fog(0x020924, 200, 1000)
		this.orbitControls.enabled = false

		this.group = this.createGroup("group")
		this.group.scale.set(0, 0, 0)
		this.scene.add(this.group)
		this.starGroup = this.createGroup("starGroup")
		this.scene.add(this.starGroup)
		this.satelliteGroup = this.createGroup("satellite")
		this.group.add(this.satelliteGroup)
		this.earthGroup = this.createGroup("earthGroup")
		this.group.add(this.earthGroup)
		this.labelGroup = this.createGroup("labelGroup")
		this.group.add(this.labelGroup)
		this.flyLineGroup = this.createGroup("flyLineGroup")
		this.group.add(this.flyLineGroup)
		this.markerGroup = this.createGroup("markerGroup")
		this.group.add(this.markerGroup)

		this.addLight() // 添加灯光
		this.createStars() // 创建星星
		this.createEarth() // 创建地球
		this.createAnimateCircle() // 创建环绕卫星

		this.createDemo()
	}

	show() {
		this.camera.position.set(5, -20, 200)
		this.group.position.set(0, 0, 0)
		this.group.scale.set(0, 0, 0)
		gsap.to(this.group.scale, {
			x: 1,
			y: 1,
			z: 1,
			duration: 2,
			ease: "Quadratic"
		})
		this.group.visible = true
		this.starGroup.visible = true
		this.orbitControls.enabled = true
	}

	hide(callBack?) {
		this.orbitControls.enabled = false
		this.camera.position.set(5, -20, 200)
		gsap.to(this.group.position, {
			z: 200,
			duration: 1,
			ease: "Quadratic",
			onComplete: () => {
				this.group.visible = false
				this.starGroup.visible = false
				callBack && callBack()
			}
		})
	}

	addLight() {
		this.addAmbientLight(0xcccccc, 1.1)
		this.addDirectionalLight(1, 0.1, 0, 0xffffff, 0.2)
		this.addDirectionalLight(1, 0.1, 0.1, 0xff2ffff, 0.2)
		const hemiLight = this.addHemisphereLight(0xffffff, 0x444444, 0.2)
		hemiLight.position.set(0, 1, 0)
		const directionalLight = this.addDirectionalLight(1, 500, -20, 0xffffff)
		directionalLight.shadow.camera.top = 18
		directionalLight.shadow.camera.bottom = -10
		directionalLight.shadow.camera.left = -52
		directionalLight.shadow.camera.right = 12
	}

	async createStars() {
		const vertices = []
		const colors = []
		for (let i = 0; i < 1000; i++) {
			const vertex = new THREE.Vector3()
			vertex.x = 700 * Math.random() - 300
			vertex.y = 700 * Math.random() - 300
			vertex.z = 700 * Math.random() - 300
			vertices.push(vertex.x, vertex.y, vertex.z)
			colors.push(new THREE.Color(1, 1, 1))
		}
		const around = new THREE.BufferGeometry()
		around.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3))
		around.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3))

		const aroundMaterial = new THREE.PointsMaterial({
			size: 2,
			sizeAttenuation: true, // 尺寸衰减
			color: 0x4d76cf,
			transparent: true,
			opacity: 1,
			map: await this.source["gradientTexture"]
		})
		const aroundPoints = new THREE.Points(around, aroundMaterial)
		aroundPoints.name = "星空"
		aroundPoints.scale.set(1, 1, 1)
		this.starGroup.add(aroundPoints)
	}

	async createEarth() {
		this.earchUniforms.map.value = await this.source["earthTexture"]

		// 创建地球
		const earth_material = new THREE.ShaderMaterial({
			uniforms: this.earchUniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		})
		earth_material.needsUpdate = true
		const earth_geometry = new THREE.SphereGeometry(this.radius, 50, 50)
		const earth = new THREE.Mesh(earth_geometry, earth_material)
		earth.name = "earth"
		this.earthGroup.add(earth)

		// 创建点
		const earth_border = new THREE.SphereGeometry(this.radius + 10, 60, 60)
		const pointMaterial = new THREE.PointsMaterial({
			color: 0x81ffff,
			transparent: true,
			sizeAttenuation: true,
			opacity: 0.1,
			vertexColors: false, //定义材料是否使用顶点颜色，默认false ---如果该选项设置为true，则color属性失效
			size: 0.01
		})
		const points = new THREE.Points(earth_border, pointMaterial)
		this.earthGroup.add(points)

		// 创建辉光
		const spriteMaterial = new THREE.SpriteMaterial({
			map: await this.source["glowTexture"],
			color: 0x4390d1,
			transparent: true,
			opacity: 0.7,
			depthWrite: false
		})
		const sprite = new THREE.Sprite(spriteMaterial)
		sprite.scale.set(this.radius * 3.0, this.radius * 3.0, 1)
		this.earthGroup.add(sprite)
	}

	createAnimateCircle() {
		// 创建 圆环 点
		const list = getCirclePoints({
			radius: this.radius + 15,
			number: 150, //切割数
			closed: true // 闭合
		})
		const mat = new THREE.MeshBasicMaterial({
			color: "#0c3172",
			transparent: true,
			opacity: 0.4,
			side: THREE.DoubleSide
		})
		const l1 = createAnimateLine({
			pointList: list,
			material: mat,
			number: 100,
			radius: 0.1
		})
		this.satelliteGroup.add(l1)

		// 在clone两条线出来
		const l2 = l1.clone()
		l2.scale.set(1.2, 1.2, 1.2)
		l2.rotateZ(Math.PI / 6)
		this.satelliteGroup.add(l2)

		const l3 = l1.clone()
		l3.scale.set(0.8, 0.8, 0.8)
		l3.rotateZ(-Math.PI / 6)
		this.satelliteGroup.add(l3)

		// 球
		const ball = new THREE.Mesh(
			new THREE.SphereGeometry(2, 32, 32),
			new THREE.MeshBasicMaterial({
				color: "#e0b187"
			})
		)
		const ball2 = new THREE.Mesh(
			new THREE.SphereGeometry(1, 32, 32),
			new THREE.MeshBasicMaterial({
				color: "#628fbb"
			})
		)
		const ball3 = new THREE.Mesh(
			new THREE.SphereGeometry(1, 32, 32),
			new THREE.MeshBasicMaterial({
				color: "#806bdf"
			})
		)

		this.circleList.push(l1, l2, l3)
		ball.name = ball2.name = ball3.name = "卫星"

		const ball01 = ball.clone()
		const num = Math.floor(list.length / 2)
		ball01.position.set(list[num][0] * 1, list[num][1] * 1, list[num][2] * 1)
		l1.add(ball01)

		const ball02 = ball2.clone()
		const num02 = Math.floor(list.length / 2)
		ball02.position.set(list[num02][0] * 1, list[num02][1] * 1, list[num02][2] * 1)
		l2.add(ball02)

		const ball03 = ball2.clone()
		const num03 = Math.floor(list.length / 2)
		ball03.position.set(list[num03][0] * 1, list[num03][1] * 1, list[num03][2] * 1)
		l3.add(ball03)
	}

	createDemo() {
		data.map(item => {
			let cityArry = []
			cityArry.push(item.startArray)
			cityArry = cityArry.concat(...item.endArray)
			cityArry.forEach(city => {
				this.createSpriteLabel(city)
				this.createMarkupPoint(city)
			})

			item.endArray.forEach(city => {
				this.createFlyLine(item.startArray, city)
			})
		})
	}

	// 创建城市名称
	createSpriteLabel(city) {
		const canvas = document.createElement("canvas")
		canvas.width = 1080
		canvas.height = 1080
		canvas.style.zIndex = "1"
		const context = canvas.getContext("2d")

		context.textAlign = "center"
		context.textBaseline = "middle"
		context.font = "bold 100px Arial"
		context.fillStyle = "rgba(0,255,255,1)"
		context.clearRect(0, 0, canvas.width, canvas.height)
		context.fillText(city.name, canvas.width / 2, canvas.height / 2)
		const texture = new THREE.CanvasTexture(canvas)
		const material = new THREE.SpriteMaterial({
			map: texture,
			transparent: true,
			depthWrite: false
		})
		const p = lon2xyz(this.radius * 1.05, city.E, city.N)
		const sprite = new THREE.Sprite(material)
		sprite.position.set(p.x, p.y, p.z)
		sprite.scale.set(20, 20, 20)
		this.labelGroup.add(sprite)
	}

	// 创建飞线
	createFlyLine(start, end) {
		// 调用函数flyArc绘制球面上任意两点之间飞线圆弧轨迹
		const arcline = flyArc(this.radius, start.E, start.N, end.E, end.N, {
			color: 0xf3ae76, // 飞线的颜色
			flyLineColor: 0xff7714, // 飞行线的颜色
			speed: 0.004 // 拖尾飞线的速度
		})
		this.flyLineGroup.add(arcline) // 飞线插入flyArcGroup中
		this.flyLineList.push(arcline.userData["flyLine"])
	}

	// 创建光柱
	async createMarkupPoint(city) {
		const lon = city.E //经度
		const lat = city.N //纬度
		const point = lon2xyz(this.radius + 0.2, lon, lat)

		const lightPiller = new LightPillar({
			point: {
				x: point.x,
				y: point.y,
				z: point.z
			},
			lightColumn: {
				map: await this.source["lightColumnTexture"]
			},
			lightHalo: {
				map: await this.source["markingApertureTexture"]
			},
			lightPoint: {
				map: await this.source["labelTexture"]
			}
		})
		const meshNormal = new THREE.Vector3(0, 0, 1)
		const coordVec3 = new THREE.Vector3(point.x, point.y, point.z).normalize()
		lightPiller.group.quaternion.setFromUnitVectors(meshNormal, coordVec3)
		this.markerGroup.add(lightPiller.group)
	}

	updateEarth() {
		this.circleList.forEach(e => {
			e.rotateY(-0.01)
		})
		this.flyLineList.forEach(fly => {
			fly.rotation.z += 0.004 // 调节飞线速度
			if (fly.rotation.z >= fly.flyEndAngle) fly.rotation.z = 0
		})
		if (this.group) {
			this.group.rotation.y += 0.001
		}
		this.update()
	}
}
