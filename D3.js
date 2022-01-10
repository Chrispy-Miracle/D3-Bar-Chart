
const dataset = [[1981, 64], [1985, 54], [1992, 22], [1999, 42], [2002,34],  [2005, 108], [2013,38]];
const w = 1250;
const h= 700;

const padding = 75;


document.addEventListener('DOMContentLoaded', function(){
    const req = new XMLHttpRequest();
    req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
    req.send();
    req.onload = function(){
      const json = JSON.parse(req.responseText);
      // console.log(json.data[0]);

   //this is the start of the end of function   
   // }
  // this is just the end of what was the onclick function -->    };
//});
   //this is the end of the end of function   
const datas = json.data;
const xScale = d3.scaleTime(datas)
  .domain([new Date(d3.min(datas, (d)=>d[0])), new Date(d3.max(datas, (d)=> d[0]))])
  .range([padding, w-padding]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(datas, (d)=> d[1])])
  .range([h-padding, padding]);

d3.select("body")
  .append("h1")
  .text("GDP Visualized by D3")
  .style("border", "1px solid black")
  .style("border-radius", "10px");

const svg = d3.select("body")
  .append("svg")
  .attr("height", h)
  .attr("width", w)
  .attr("padding", padding)
  .style("border", "1px solid black")
  .style("border-radius", "10px");

d3.select("body")
  .append("p")
  .text("Created by Chris Patchett using D3, 2022");

const tooltip = 
d3.select("body")
    .data(datas)
    .enter()
    .append("div")
    .attr("id", "tooltip")
    .style("padding", " 15px")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "lightgrey")
    .style("border", "1px solid black")
    .style("border-radius", "10px");

svg.selectAll("rect")
  .data(datas)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("index", (d, i)=> i)
  .attr("x", (d)=> xScale(new Date(d[0])))
  .attr("y", (d)=> yScale(d[1]))
  .attr("height", (d)=> (h -padding)- yScale(d[1]))
  .attr("data-date", (d)=> d[0]) 
  .attr("data-gdp", (d)=> d[1])
  .on("mouseover", function(d, event){
    var date = this.getAttribute('data-date');
    var gdp = this.getAttribute("data-gdp");
    tooltip.style("visibility", "visible")
      .html("On " + date + "<br> The GDP was: <br> $" + gdp + " Billion")
      .attr("data-date", date) 
      .attr("data-gdp", gdp)})
  .on("mousemove", function(e, d){var index = this.getAttribute("index");
  return tooltip.style('left', (e.pageX+10) + "px").style('top', (e.pageY+10) + 'px')
    ;})
  .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

const xAxis = d3.axisBottom(xScale)
const yAxis = d3.axisLeft(yScale);

xAxis.ticks(7);

svg.append("g")
  .attr("transform", "translate(0," + (h-padding) + ")")
  .attr("id", "x-axis")
  .call(xAxis);
  
svg.append("g")
  .attr("transform", "translate(" + padding + ", 0)")
  .attr("id", "y-axis")
  .call(yAxis);

svg.append("text")
  .text("Gross Domestic Product")
  .attr("font-size", "2.5vh")
  .attr("y", "30px")
  .attr("x", "-500px")
  .attr("transform", "rotate(-90)");

svg.append("text")
  .text("Date of Record")
  .attr("font-size", "2.5vh")
  .attr("y", "680px")
  .attr("x", "325px")
  
  }
});
