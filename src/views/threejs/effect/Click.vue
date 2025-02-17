<template>
	<div ref="webgl" class="webgl"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three"
import WebGl from "@utils/three/webGl"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js"

let webgl = ref()
let webGl: WebGl
const params = {
	edgeStrength: 3.0,
	edgeGlow: 0.0,
	edgeThickness: 1.0,
	pulsePeriod: 0,
	rotate: false,
	usePatternTexture: false,
	visibleEdgeColor: "#ffffff",
	hiddenEdgeColor: "#190a05"
}
let outLinePass

onMounted(() => {
	if (!webgl.value) {
		return
	}
	webGl = new WebGl(webgl.value, {
		effect: true
	})
	webGl.camera.position.set(0, 0, 20)
	webGl.addAmbientLight(0xaaaaaa, 0.2)
	webGl.addDirectionalLight(1, 1, 1, 0xddffdd, 0.6)

	// 创建一个正方体
	const geometry2 = new THREE.BoxGeometry(1, 1, 1)
	const material2 = new THREE.MeshPhongMaterial({ color: 0xffaaff })
	const cube = new THREE.Mesh(geometry2, material2)
	cube.position.set(5, 0, 0)
	webGl.scene.add(cube)

	// 创建一个纽结体
	const geometry3 = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
	const material3 = new THREE.MeshPhongMaterial({ color: 0xffaaff })
	const torusKnot = new THREE.Mesh(geometry3, material3)
	torusKnot.position.set(0, 0, 0)
	webGl.scene.add(torusKnot)

	// 创建一个金属球添加到场景中
	const geometry = new THREE.SphereGeometry(1, 32, 32)
	const material1 = new THREE.MeshPhongMaterial({ color: 0xffaaff })
	const sphere = new THREE.Mesh(geometry, material1)
	sphere.position.set(-5, 0, 0)
	webGl.scene.add(sphere)

	outLinePass = new OutlinePass(
		new THREE.Vector2(webGl.domElement.offsetWidth, webGl.domElement.offsetHeight),
		webGl.scene,
		webGl.camera
	)
	const textureLoader = new THREE.TextureLoader()
	textureLoader.load("./threejs/effect/tri_pattern.jpg", function (texture) {
		outLinePass.patternTexture = texture
		texture.wrapS = THREE.RepeatWrapping
		texture.wrapT = THREE.RepeatWrapping
	})

	if (!webGl.composer) return
	webGl.composer.addPass(outLinePass)

	const mouse = new THREE.Vector2()
	const raycaster = new THREE.Raycaster()
	// 事件监听
	window.addEventListener("click", event => {
		if (!mouse) return
		mouse.x = (event.clientX / webGl.domElement.offsetWidth) * 2 - 1
		mouse.y = -((event.clientY / webGl.domElement.offsetHeight) * 2 - 1)
		raycaster?.setFromCamera(mouse, webGl.camera)
		const intersects = raycaster?.intersectObject(webGl.scene)

		if (intersects && intersects.length > 0) {
			outLinePass.selectedObjects = [intersects[0].object]
		}
	})

	addGUI()

	render()
})

const addGUI = () => {
	const gui = webGl.addGUI()
	gui.add(params, "edgeStrength", 0.01, 10).onChange(function (value) {
		outLinePass.edgeStrength = Number(value)
	})
	gui.add(params, "edgeGlow", 0.0, 1).onChange(function (value) {
		outLinePass.edgeGlow = Number(value)
	})
	gui.add(params, "edgeThickness", 1, 4).onChange(function (value) {
		outLinePass.edgeThickness = Number(value)
	})
	gui.add(params, "pulsePeriod", 0.0, 5).onChange(function (value) {
		outLinePass.pulsePeriod = Number(value)
	})
	gui.add(params, "usePatternTexture").onChange(function (value) {
		outLinePass.usePatternTexture = value
	})
	gui.addColor(params, "visibleEdgeColor").onChange(function (value) {
		outLinePass.visibleEdgeColor.set(value)
	})
	gui.addColor(params, "hiddenEdgeColor").onChange(function (value) {
		outLinePass.hiddenEdgeColor.set(value)
	})
}

onUnmounted(() => {
	webGl.destroy()
})

const render = () => {
	webGl.update()
	requestAnimationFrame(render)
}
</script>

<style lang="scss" scoped>
.webgl {
	position: relative;
	top: 0;
	left: 0;
	z-index: 100;
	display: flex;
	width: 100vw;
	height: 100vh;
}
</style>
