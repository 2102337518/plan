function DrawPath(points)
{
    // console.log("This is a test.");
    let points_one_dim = new Array();
    for(let i=0; i<points[0].length; i++)
    {
        let j = 2*i;
        points_one_dim[j] = points[0][i];
        points_one_dim[j+1] = points[1][i];
    }

    var polyline = viewer.entities.add({
        polyline : {
            name: "测试线",
            positions : Cesium.Cartesian3.fromDegreesArray(points_one_dim),
            width: 5.0,
            material: Cesium.Color.RED,				// 线宽度
            // material: new Cesium.PolylineGlowMaterialProperty({
            //     color: new Cesium.Color.fromCssColorString('#ff0000'),
            // }),						// 颜色
            // depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
            //     color: new Cesium.Color.fromCssColorString('#ff0000'),
            // }),						// 被地形覆盖的虚线颜色
            clampToGround: true,	// 是否贴和地型
        }
    });
    viewer.zoomTo(viewer.entities);
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
        e.cancel = true;
        viewer.zoomTo(viewer.entities);
    });
}