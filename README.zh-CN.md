# Codex Pet Viewer

[English](README.md) | [简体中文](README.zh-CN.md)

一个轻量级的 Codex 宠物图集网页预览器。它可以加载 `pet.json` 和 `spritesheet.webp` 或 `spritesheet.png`，预览各行动画，并检查基础图集规范。项目内置 Noir、Manqu、弥希 Miki、悠亚 Yua、灰泽满 × 弥希双人版和弥希 × 灰泽满 CP 版六个预设宠物，默认显示 Noir。

## 使用方式

在浏览器中打开 `index.html`，或者访问[在线预览](https://noir-hedgehog.github.io/PetViewer/)。

- 粘贴 `pet.json` 链接即可在线加载；`spritesheetPath` 会相对于该 JSON 链接解析。
- 选择包含 `pet.json` 和精灵图的宠物文件夹。
- 也可以将独立的 `.json`、`.webp` 和 `.png` 文件拖入导入区域。
- 在预览区域移动鼠标，可以直接检查 v2 格式的全部 16 个朝向。
- 通过动作面板或数字键 `1` 至 `9` 手动触发 Codex 默认动作。
- 在页面右上角切换中英文界面；语言偏好会保存在本地。
- 通过页面右上角的 GitHub Star 入口打开项目仓库。
- 使用状态选择器、帧列表、逐行图集检查器、播放速度、缩放和棋盘格开关进行手动检查。
- 播放时会自动排除末尾透明空帧。如果远程主机阻止像素检查，预览器会改用 Codex 标准帧数。

## GitHub Pages

这是一个无需构建的静态应用。项目内置的 GitHub Actions 工作流会在 `main` 分支推送后，将仓库根目录部署到 GitHub Pages。

如果尚未启用 Pages，请打开仓库的 Settings -> Pages，并将发布来源设置为 GitHub Actions。

可以通过以下格式直接链接到指定宠物：

```text
https://<user>.github.io/PetViewer/?pet=https://raw.githubusercontent.com/<user>/<repo>/<branch>/<pet-dir>/pet.json
```

远程加载要求资源所在主机允许浏览器获取 JSON 和图像文件。

## Codex 宠物规范

预览器默认每个 Codex 单元格尺寸为 `192 x 208`。

- v1 图集：`8 x 9`，总尺寸 `1536 x 1872`
- v2 图集：`8 x 11`，总尺寸 `1536 x 2288`
- v2 的第 9、10 行保存从 `000` 到 `337.5` 的 16 个朝向

标准动作行使用 Codex 默认帧数和播放时序，包括帧数较少的挥手、跳跃、等待、工作和审查动作。导入的图集仍可在动作行中包含更多有效帧；只要浏览器安全策略允许像素检查，预览器就会自动识别。

本工具只负责预览和检查尺寸，不会生成、修复或打包宠物。

## 内置宠物

- Noir 来自 [noir-hedgehog/about-noir](https://github.com/noir-hedgehog/about-noir)，资源位于 `assets/noir/`。
- Manqu 来自本地 Codex 自定义宠物包，资源位于 `assets/manqu/`。
- 弥希 Miki 是以 VirtuaReal 角色弥希为原型制作的 Q 版宠物，资源位于 `assets/miki/`，包含全部标准动作与 v2 的 16 个朝向。
- 悠亚 Yua 是以 VirtuaReal 角色悠亚为原型制作的 Q 版宠物，资源位于 `assets/yua/`，包含全部标准动作与 v2 的 16 个朝向。
- 灰泽满 × 弥希双人版是最初的协作互动版本，资源位于 `assets/hazel-miki-duo/`，包含巡查、打气、工作、休息和失败互动。
- 弥希 × 灰泽满 CP 版是更亲密的前后辈版本，资源位于 `assets/miki-hazel-cp/`，包含九种场景互动和 16 个方向的 CP 姿势。

六个预设均保持标准 Codex v2 包结构，并通过与导入宠物相同的清单和图集路径加载。
