//get token access
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODFjY2I4YS00OGUxLTQ2NjAtYjNlOS04YWJhM2RmOTY2YjYiLCJpZCI6NjkwODcsImlhdCI6MTYzMzE0MzA0NX0.gtLs34ZHlJuc8GCaSQqB5qes6jAclX4joW90Gqb4PBI";

//////////////////////////////////////////////////////////
/// GET VARIABLES ///
//////////////////////////////////////////////////////////

// czml satellite data
test_czml = allSats;
test_czml[0].clock.multiplier = 1;

// lookup data
satcat_lookup = satcat;


//////////////////////////////////////////////////////////
/// DATA MODIFICATIONS ///
//////////////////////////////////////////////////////////


for (var i=1; i<test_czml.length; i++) 
{

	// test_czml[i].availability = "2010-01-01T00:00:00+00:00/2031-01-01T00:00:00+00:00"
	// change images
	if(test_czml[i].id.includes(" DEB ")){
		test_czml[i].billboard.image = "images/grey-dot.svg"
	}
	else{
		test_czml[i].billboard.image = "images/green-dot.svg"
	}
    
    // change scale and remove orbits
    test_czml[i].billboard.scale = 0.05
    test_czml[i].path.width = 1.5
    test_czml[i].path.material.solidColor.color.rgba = "[0, 0 223, 0.73]"


    test_czml[i].label.show = false
    test_czml[i].path.show = false

} 


//////////////////////////////////////////////////////////
/// DISPLAY ///
//////////////////////////////////////////////////////////


// initialize new globe viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(),
  shouldAnimate: true
});

// initialize new scene
var scene = viewer.scene;
if (!scene.pickPositionSupported) {
  window.alert("This browser does not support pickPosition.");
}

// initialize new czml data loader
var dataSource = new Cesium.CzmlDataSource()


// add data to viewer
dataSource.load(test_czml);
viewer.dataSources.add(dataSource);



//////////////////////////////////////////////////////////
/// EVENT HNADLERS ///
//////////////////////////////////////////////////////////


var handler;
var picked;
handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
handler.setInputAction(function (movement) {
	var pickedObject = scene.pick(movement.position);
	if (Cesium.defined(pickedObject)) {
		if (picked!=undefined){
			picked.path.show = false;
			picked.label.show = false;
		}
		pickedObject.id.path.show = true;
		pickedObject.id.label.show = true;
		picked = pickedObject.id;
	}
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

var hoveredList = [];
// Mouse over the globe to see the cartographic position
handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
handler.setInputAction(function (movement) {
	var hoveredObject = scene.pick(movement.endPosition);
	if (Cesium.defined(hoveredObject)) {
		hoveredObject.id.path.show = true;
		hoveredObject.id.label.show = true;
		// hoveredObject.path.material.solidColor.color.rgba = "[255, 50 78, 0.73]"
		hoveredList.push(hoveredObject.id);
	}else{
		for (var i = 0; i < hoveredList.length; i++) {
			if (picked != hoveredList[i]) {
				hoveredList[i].path.show = false;
				hoveredList[i].label.show = false;
				hoveredList.shift();
			}	
		}
	}
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


//////////////////////////////////////////////////////////
function filtername(name) {
	// select from the lookup data where name matches
	var res = satcat_lookup.filter(function(arr){
		return arr.OBJECT_NAME == name;         
	});
	// get list of NORAD_CAT_ID from the lookup result
	var res1 = res.map(a => a.NORAD_CAT_ID);
	
	// get list of czml objects where NORAD_CAD_ID matches the ID from the lookup result
	var result = [];
	for (var t=0; t<test_czml.length; t++) {
		var obj_norad_cat_id = test_czml[t].id.split(" ").at(-1);
		if (res1.includes(parseInt(obj_norad_cat_id))) {
			result.push(test_czml[t]);
		}
	}
	return result;
}
////////////////////////////////////////////////////////////
 

/////////////////////////////////////////////////////////////
function filterbyname(){
	var name = document.getElementById("satname").text;
	var result = filtername(name); // get list of czml objects where name match selected 
	// make all the objs inactive then, make active only the selected czml objects
	for (var t=1; t<test_czml.length; t++) {
		test_czml[t].billboard.show = false;
	}

	// TODO: clear data source

	// TODO: Add new data source with only the filtered objects
	for (var r=0; r<result.length; r++) {
		result[r].billboard.show = true;
	}
	dataSource.load(test_czml);
	viewer.dataSources.add(dataSource);
}
/////////////////////////////////////////////////////////////

