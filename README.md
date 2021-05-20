# X-Planet
苍蝇有复眼，狗狗是色盲，鹰眼堪比高倍镜……在这一颗蓝色星球上，你可曾想过，其他物种看到的世界会是如何不同？

在X-Planet中，玩家可以操控多种动态角色，并以此为第一视角在星球上自由探索。

# Demo
### [星球入口](https://jujiex.github.io/XPlanet/)

# 探索指南

角色切换： 数字键 1 2 3 ...

前进、后退： WASD/上下左右

跳跃：空格键

视线：鼠标


# 功能实现

### 场景搭建
使用React + Three.js搭建三维场景，对场景元素（lights, planet, hero等）进行模块化拆分，理解ref和虚拟dom渲染并构造组件(Scene)

### 第一人称控件
使用射线检测（Raycaster）模拟重力制作第一人称控件（playerControls）。进入游戏界面后Pointer Lock API锁定指针，通过键盘鼠标事件模拟角色在球体表面移动、跳跃、视线变化，并绑定相机继承该父节点位置和朝向

### 星球地形
构造buffergeometry，使用柏林噪声（perlin noise / Three.js中称为ImprovedNoise）生成随机地形，以数组材质方式赋以同一几何体多种材质。

搭建树木模型并在星球上随机分布。

### 角色动画
实现人类、兔子、小鱼等多种角色模型及相应effectComposer，并用Tween.js添加动画效果

### 兼容性监测
在页面初始状态下进行WebGL兼容性判断，若不兼容则弹窗提示



