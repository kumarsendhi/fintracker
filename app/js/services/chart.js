"use strict";

app.factory('chart',function(){
	
	function drawPieChart(jsonData){
    	/**	
		var w=300;
		var h = 100;
    var data = jsonData.slice();

	    var padding =2;
		var dataset =[5,10,14,20,35];
		
		var svg = d3.select("#chart").append("svg")
		.attr("width",w)
		.attr("height",h)
		
		svg.selectAll("rect")
		.data(modData)
		.enter()
		.append("rect")
		.attr("x",function(d,i){
			return i*(w/modData.length);
		})
		.attr("y",function(d,i){
			return h-(d.Amount);
		})
		.attr("width",w/modData.length-padding)
		.attr("height",function(d){
			return d;
		})
		
	
 
 var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    data = jsonData.slice();

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




  x.domain(data.map(function(d) { return d.expenditures; }));
  y.domain([0, d3.max(data, function(d) { return d.Amount; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Amount");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.expenditures); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Amount); })
      .attr("height", function(d) { return height - y(d.Amount); });
      
      w960
      h930

**/

if(d3.select("svg")!=null){
  d3.select("svg").remove();
}
var m = [70, 40, 40, 70],
    w = 460 - m[1] - m[3],
    h = 430 - m[0] - m[2],
    modData =jsonData.slice();
    var data=[];
    
    for(var d in modData){
      var alreadyExisting = false
      if(data.length == 0){
        data.push({"expenditures":modData[d].expenditures,"Amount":modData[d].Amount})
      }
      else{
        for(var i in data){
          if(data[i].expenditures === modData[d].expenditures){
            data[i].Amount += modData[d].Amount;
           alreadyExisting = true
          }
        }
        if(!alreadyExisting){
          data.push({"expenditures":modData[d].expenditures,"Amount":modData[d].Amount})
        }
      }
    }

var format = d3.format(",.0f");

var x = d3.scale.linear().range([0, w]),
    y = d3.scale.ordinal().rangeRoundBands([0, h], .1);

var xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-h),
    yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

var svg = d3.select("#chart").append("svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
  .append("g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");


  // Parse numbers, and sort by value.
  data.forEach(function(d) { d.Amount = +d.Amount; });
  data.sort(function(a, b) { return b.Amount - a.Amount; });

  // Set the scale domain.
  x.domain([0, d3.max(data, function(d) { return d.Amount; })]);
  y.domain(data.map(function(d) { return d.expenditures; }));

  var bar = svg.selectAll("g.bar")
      .data(data)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(0," + y(d.expenditures) + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(d.Amount); })
      .attr("height", y.rangeBand());

  bar.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return x(d.Amount); })
      .attr("y", y.rangeBand() / 2.5)
      .attr("dx", -3)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return format(d.Amount); });

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);


  

	}
	
	return{
		drawPieChart:drawPieChart
	}
})