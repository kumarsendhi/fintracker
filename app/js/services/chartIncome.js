"use strict";

app.factory('chartIncome',function(){
	
	function drawPieChart(jsonData){
    	
if(d3.select("svg")!=null){
  d3.select("svg").remove();
}
var m = [70, 40, 40, 70],
    w = 500 - m[1] - m[3],
    h = 430 - m[0] - m[2],
    modData =jsonData.slice();
    var data=[];
    
    for(var d in modData){
      var alreadyExisting = false
      if(data.length == 0){
        data.push({"type":modData[d].type,"Amount":modData[d].Amount})
      }
      else{
        for(var i in data){
          if(data[i].type === modData[d].type){
                  data[i].Amount += modData[d].Amount;        
           alreadyExisting = true
          }
        }
        if(!alreadyExisting){
          data.push({"type":modData[d].type,"Amount":modData[d].Amount})
        }
      }
    }
    
    if(modData.length!==0){
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
  y.domain(data.map(function(d) { return d.type; }));

  var bar = svg.selectAll("g.bar")
      .data(data)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(0," + y(d.type) + ")"; });

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

	}
	
	return{
		drawPieChart:drawPieChart
	}
})