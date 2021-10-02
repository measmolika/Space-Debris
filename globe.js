Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODFjY2I4YS00OGUxLTQ2NjAtYjNlOS04YWJhM2RmOTY2YjYiLCJpZCI6NjkwODcsImlhdCI6MTYzMzE0MzA0NX0.gtLs34ZHlJuc8GCaSQqB5qes6jAclX4joW90Gqb4PBI";

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(),
  shouldAnimate: true,
});    

Cesium.IonResource.fromAssetId(617556)
  .then(function (resource) {
    viewer.dataSources.add(Cesium.CzmlDataSource.load(resource));
});
