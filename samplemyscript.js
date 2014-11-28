﻿function buttonClick()
{
	if (document.getElementById('theButton').classList.contains('button')) {
		counter = counter+1;
		
		var frequency = parseFloat(document.getElementById("freqChoice").options[document.getElementById("freqChoice").selectedIndex].value);
		var txpower = parseFloat(document.getElementById("txPowerChoice").options[document.getElementById("txPowerChoice").selectedIndex].value);
		var txantenna = parseFloat(document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].value);
		var rxantenna = parseFloat(document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].value);

		var txpowerdb = 10*log10(txpower);
		var fsl = 85+txantenna+txpowerdb+rxantenna+polarityMismatchLoss();	
		var kmrange = superRound(Math.pow(10,((fsl-20*log10(frequency)-32.45)/20)),2);
		var milerange = superRound(kmrange*0.6213,2);

		document.getElementById('answerinkm').innerHTML = kmrange + "km / " + milerange + "miles";
		document.getElementById('answerinfunny').innerHTML = getFunnyAnswer(kmrange);
		
		document.getElementById('answerinkm').className = 'answerkm';
		document.getElementById('answerinfunny').className = 'answerfunny';
		document.getElementById('andnow').className = 'andnow';
		document.getElementById('sources').className = 'sources';
		
		
		document.getElementById('buttonHolder').className = 'hidden';
		
		galabel = frequency + ';' + txpower + ';' + document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text + ';' + document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text+';'+counter;
		ga('send', 'event', 'letsfly', 'click', galabel);
		
		_kmq.push(['record', 'LetsFlyButton', {'Settings':galabel}]);
	}
}

function dropSelect()
{
	document.getElementById('answerinkm').className = 'hidden';
	document.getElementById('answerinfunny').className = 'hidden';
	document.getElementById('andnow').className = 'hidden';
	document.getElementById('sources').className = 'hidden';
	
	
	var frequency = document.getElementById("freqChoice").options[document.getElementById("freqChoice").selectedIndex].value;
	var txpower = document.getElementById("txPowerChoice").options[document.getElementById("txPowerChoice").selectedIndex].value;
	var txantenna = document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].value;
	var rxantenna = document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].value;
	
	if ((frequency!="unselected")&&(txpower!="unselected")&&(txantenna!="unselected")&&(rxantenna!="unselected")) {
		document.getElementById('theButton').classList.add('button'); 
		document.getElementById('buttonHolder').classList.add('positionbutton');	
		document.getElementById('buttonHolder').classList.remove('hidden');	
		
	}	
}

function infoClick()
{
  var win = window.open("info.html", '_blank');
  win.focus();	
}

function twitterMouseOn()
{
	document.getElementById('tweetlink').innerHTML = "Share &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp range";
}

function twitterMouseOut()
{
	document.getElementById('tweetlink').innerHTML = "Share your range";
}

function polarityMismatchLoss()
{
	var txPolarity = "circular";
	var rxPolarity = "circular";
	
	if (document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Rubber ducky") > -1) txPolarity="linear";
	if (document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Moxon") > -1) txPolarity="linear";
	if (document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Inverted V") > -1) txPolarity="linear";
	if (document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Diamond SRH771") > -1) txPolarity="linear";
	
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Rubber ducky") > -1) rxPolarity="linear";
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Patch (8dbi linear)") > -1) rxPolarity="linear";
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Patch (11dbi linear)") > -1) rxPolarity="linear";
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Patch (14dbi linear)") > -1) rxPolarity="linear";
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Yagi") > -1) rxPolarity="linear";		
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("1/2wave dipole") > -1) rxPolarity="linear";		
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Turnstyle)") > -1) rxPolarity="linear";		
	
	if (txPolarity==rxPolarity) return 0; else return -3;
}

function randomNum(x, y)
{
	return Math.floor(Math.random() * ((y-x)+1) + x);
}

function log10(x)
{
	return Math.log(x) / Math.LN10;
}

function getFunnyAnswer(kmrange)
{
	var answerType = randomNum(1,3);
	if (answerType==1) { //Answers relating to range
		var subAnswerType = randomNum(1,5);
		if (subAnswerType==1) return "Argh matey, that's " + convertRange(kmrange,89) + " the distance from skull cove to treasure island";
		if (subAnswerType==2) return "That's " + convertRange(kmrange,384400) + " the distance from earth to the moon";
		if (subAnswerType==3) return "That's " + convertRange(kmrange,1.6) + " the distance from the Champs Elysée to the Eiffel Tower";
		if (subAnswerType==4) return "That's " + convertRange(kmrange,2.9) + " the height of Mount Olympus";
		if (subAnswerType==5) return "That's " + convertRange(kmrange,0.82) + " the height of the Burj Khalifa in Dubai"; 
	}
	if (answerType==2) { //Answers relating in units
		var subAnswerType = randomNum(1,6);
		if (subAnswerType==1) return "That's as much as " + rangeInFunnyUnits(kmrange,0.0012192) + " two-by-fours placed next to each other";
		if (subAnswerType==2) return "That's as much as " + rangeInFunnyUnits(kmrange,0.07) + " pythons placed head to tail";
		if (subAnswerType==3) return "That's as much as " + rangeInFunnyUnits(kmrange,0.046) + " motorcycle jumps by Evel Knievel"; 
		if (subAnswerType==4) return "That's as much as " + rangeInFunnyUnits(kmrange,0.11) + " of the world longest baguettes";
		if (subAnswerType==5) return "That's as much as " + rangeInFunnyUnits(kmrange,0.02) + " tall men standing on each other's shoulders";
		if (subAnswerType==6) return "That's as much as " + rangeInFunnyUnits(kmrange,0.0091) + " kangaroo hops in a row";
	}
	if (answerType==3) { //Answers relating to speed/time
		var subAnswerType = randomNum(1,8);
		if (subAnswerType==1) return "That's how far a man being chased by a bear runs in " + rangeInTimeMins(kmrange,20) + " minutes";
		if (subAnswerType==2) return "That's how far a Porsche 944 drives in " + rangeInTimeMins(kmrange,200) + " minutes";
		if (subAnswerType==3) return "That's just " + rangeInTimeSecs(kmrange,1224) + " seconds at the speed of sound";
		if (subAnswerType==4) return "That's just " + rangeInTimeSecs(kmrange,2448) + " seconds at the speed of love";
		if (subAnswerType==5) return "That's how far an F16 flies in " + rangeInTimeSecs(kmrange,3060) + " seconds";
		if (subAnswerType==6) return "That's how far a cheetah runs in " + rangeInTimeMins(kmrange,120) + " minutes";
		if (subAnswerType==7) return "That's how far a pigeon flies in " + rangeInTimeMins(kmrange,80) + " minutes";
		if (subAnswerType==8) return "That's how far Usain Bolt sprints in " + rangeInTimeMins(kmrange,36) + " minutes";
	}
}

//TODO Need to make all these answer at most two decimals
function convertRange(kmrange, maxrange) 
{
	if (kmrange<maxrange) return "1/" + superRound(maxrange/kmrange,2) + "th";
	if (kmrange==maxrange) return "exactly";
	if (kmrange>maxrange) return superRound(kmrange/maxrange,2) + " times";
}

function rangeInFunnyUnits(kmrange, unitInKm)
{
	return superRound(kmrange/unitInKm,2);
}

function rangeInTimeMins(kmrange, kmPerHour)
{
	return superRound(kmrange/(kmPerHour/60),2);
}
function rangeInTimeSecs(kmrange, kmPerHour)
{
	return superRound(kmrange/(kmPerHour/60/60),2);
}
function superRound(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp  = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

function labClick()
{
ga('send', 'event', 'lablink', 'click');
_kmq.push(['record', 'Lablink']);
}

function guideClick()
{
ga('send', 'event', 'guidelink', 'click');
_kmq.push(['record', 'Guidelink',]);
}
function twitterClick()
{
ga('send', 'event', 'tweet', 'click');
_kmq.push(['record', 'Twitterlink']);
}
