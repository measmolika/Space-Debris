//get token access
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODFjY2I4YS00OGUxLTQ2NjAtYjNlOS04YWJhM2RmOTY2YjYiLCJpZCI6NjkwODcsImlhdCI6MTYzMzE0MzA0NX0.gtLs34ZHlJuc8GCaSQqB5qes6jAclX4joW90Gqb4PBI";

// czml satellite data
test_czml = iridiumCzml;

// initialize new globe viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(),
  shouldAnimate: true
});

// initialize new czml data loader
var dataSource = new Cesium.CzmlDataSource()

// change all iridium debris icons to grey dots 
// change all iridium satellite icos to yellow dots
for (var i=1; i<test_czml.length; i++) 
{

	if(test_czml[i].id.includes(" DEB ")){
		test_czml[i].billboard.image = "images/grey-dot.png"
	}
	else{
		test_czml[i].billboard.image = "images/yellow-dot.png"
	}
    
    test_czml[i].billboard.scale = 0.005
    test_czml[i].label.show = false
    test_czml[i].path.show = false

} 

dataSource.load(test_czml);
viewer.dataSources.add(dataSource);



function showPath(elem){
	test_czml[elem].path.show = true
	test_czml[elem].label.show = true
	dataSource.load(test_czml);
	viewer.dataSources.add(dataSource);
}


for (var i=1; i<test_czml.length; i++) 
{
	test_czml[i].billboard.image.addEventListener("mouseover", showPath(i));
}



