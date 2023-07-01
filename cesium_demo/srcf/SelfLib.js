

//下面是通过鼠标点击选取划线的点，程序将按照点连接成线。

        let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        const positions = [] // 用于存储点的位置数据数组
        handler.setInputAction(function (movement) {
            let ray = viewer.camera.getPickRay(movement.position);
            let cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let lng = Cesium.Math.toDegrees(cartographic.longitude); // 经度
            let lat = Cesium.Math.toDegrees(cartographic.latitude); // 纬度
            let alt = cartographic.height; // 高度

            positions.push(Cesium.Cartesian3.fromDegrees(lng, lat, alt))
            
            if (positions.length < 1) return;
            viewer.entities.add({
                name: "线",
                polyline: {
                    positions: positions,  // 点位置数组
                    width: 5.0,				// 线宽度
                    material: new Cesium.PolylineGlowMaterialProperty({
                        color: new Cesium.Color.fromCssColorString('#000'),
                    }),						// 颜色
                    depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
                        color: new Cesium.Color.fromCssColorString('#ccc'),
                    }),						// 被地形覆盖的虚线颜色
                    clampToGround: true,	// 是否贴和地型
                }
        });
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);