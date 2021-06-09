# three-minigame-adapter

本项目是一个小游戏环境浏览器API的[adapter](https://developers.weixin.qq.com/minigame/dev/guide/best-practice/adapter.html), 基于[weapp-adapter](https://github.com/finscn/weapp-adapter)。

专门针对 ThreeJS 以及ThreeJS一些扩展库(fairygui-three[UI框架]、cannon-es[物理引擎]等等)的底层原生接口适配或优化改良，使之在微信小游戏|淘宝互动|字节小游戏环境中正确运行。



## 适配&改良内容
- 客户端原生适配**TextDecoder**对象的**decode**方法
- 最小限度支持Blob对象和URL对象的createObjectURL方法
- 注入全局对象window.self
- 增加适配**AudioContext**对象的部分虚接口，因**AudioContext**适配实现不现实，暂时适配为不报错，建议使用**Audio**进行场景音频管理
- 增加 **HTMLInputElement**和**HTMLTextAreaElement**对象适配实现文本输入框
- DOM对象增加**ownerDocument**属性

## 开发环境一览

[微信开发者工具 稳定版 1.05.2105170](https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html)

调试基础库：Wechat Lib:2.10.4

[three.js r129](https://github.com/mrdoob/three.js/releases)

[fairygui-three-0.7.0](https://www.npmjs.com/package/fairygui-three)



## 注意事项
- threejs
  - [r117->r118](https://github.com/mrdoob/three.js/wiki/Migration-Guide#r117--r118)时，three启动默认启动 **WebGL2rendering**；目前IOS系统不支持WebGL 2.0, 可是 canvas.getContext("webgl2") 和 canvas.getContext("experimental-webgl2") 返回的却不是空. 导致某些通过类似代码判断webgl版本的程序出错。因此启动程序的时候需要判断系统的差异性进行启动。
  - 不支持GLTF扩展的Draco压缩，具体原因参考[此篇文章](https://juejin.cn/post/6931954784018628621)
- fairygui-three
  - 【微信小游戏】[微信小游戏限制读取本地文件格式](https://developers.weixin.qq.com/minigame/dev/guide/framework/code-package.html)，如果UI资源是存储在小游戏工程内的话，发布资源要设置后缀为支持的文件格式，同时加载资源前需要配置一下资源后缀：fgui.UIConfig.packageFileExtension = "支持的文件格式";
  - 【微信小游戏】文件资源问题，需要将资源存储在自己的资源服务器上，因为PC测试环境和真机测试环境的不同，加载方式有差异。当然你可以本地开启个小型资源服务器，然后在同一个局域网下进行测试。
  - 包引用关系,通过引入fairy-three后，fairy-three内部需要引用three库，因此fairy-three库需要跟three放置在同一目录下。
  - 【微信小游戏】开发者工具需要开启【es6转es5】和【增强编译】
  - 【微信小程序】关于音频播放，不支持AudioContext API，因此不能设置fgui.Stage.audioListener为new THREE.AudioListener,更不要添加到fgui.Stage.camera中。
  - 【微信小程序】开发者工具环境不支持文本框输入测试，因为开发者工具环境是使用原生的DOM对象，**Stage.domElement.parentNode.appendChild**插入的是扩展适配对象，因此会报错。

## 使用方法
可参考该案例工程[three-minigame-adapter-demo](https://github.com/krapnikkk/three-minigame-adapter-demo)

将src下的文件放入小游戏项目中(例如 放入 js/libs/adapter 目录内)

在入口文件game.js使用下列代码引入即可.
```
import './js/libs/adapter/index.js'
```


## 参考
- [weapp-adapter](https://github.com/finscn/weapp-adapter)
- [three-platformize](https://github.com/deepkolos/three-platformize)