var totalImageCount=4;
var imageNumber = 2; 
var flipCount = 1;
var imageCaptions = [
	"0This is a lovely view of a phantom",
	"1This is another photo",
	"2This is a front blurry one",
	"3This is a bill - why is it even here"
]; 

function setup() {
	document.getElementById('caption').innerHTML=imageCaptions[0];
}

function clickNext() {
	if (imageNumber!=totalImageCount) {
		imageNumber = imageNumber +1;
	} else imageNumber = 1;
	if (flipCount!=3) {
		flipCount = flipCount +1;
	} else flipCount=1;

	if (imageNumber>1) {
		document.getElementById('caption').innerHTML=imageCaptions[imageNumber-2];
	} else document.getElementById('caption').innerHTML=imageCaptions[totalImageCount-1];
	
	if (flipCount==2) {
		document.getElementById('image1').classList.remove('opaque');	
		document.getElementById('image2').classList.add('opaque');
		document.getElementById('image3').src="./images/"+imageNumber+".jpg";
	} else if (flipCount==3) {
		document.getElementById('image2').classList.remove('opaque');	
		document.getElementById('image3').classList.add('opaque');	
		document.getElementById('image1').src="./images/"+imageNumber+".jpg";
	} else {
		document.getElementById('image3').classList.remove('opaque');	
		document.getElementById('image1').classList.add('opaque');	
		document.getElementById('image2').src="./images/"+imageNumber+".jpg";
	}
}