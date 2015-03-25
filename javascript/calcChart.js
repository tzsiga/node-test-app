function reDrawChart() {
	var chart = AmCharts.makeChart("chartdiv", {
	    "type": "pie",
		"theme": "light",
		"labelText": "[[title]]: [[value]]",
		"labelRadius": -35,
		"fontSize": 13,
		"radius": 130,
	    "dataProvider": [
	{
	        "type": "Protein",
	        "amount": Math.round((0.4 * parseInt(document.getElementById("bmrIndex").innerHTML))/4)
	    },
	{
	        "type": "Carbohydrate",
	        "amount": Math.round((0.4 * parseInt(document.getElementById("bmrIndex").innerHTML))/4)
	    }, {
	        "type": "Fat",
	        "amount": Math.round((0.2 * parseInt(document.getElementById("bmrIndex").innerHTML))/9)
	    }],
	    "valueField": "amount",
	    "titleField": "type",
		"exportConfig":{	
	      menuItems: [{
	      icon: '/lib/3/images/export.png',
	      format: 'png'	  
	      }]  
		}
	});
}

