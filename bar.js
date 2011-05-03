var drawBarCart = function() {
/* options (fold) */
var textColor = "rgb(0,0,0)";
/* options (end) */

/* get some data from html (fold) */
var height;
var width;
 $("canvas").each(function(i){  
  width = $(this).attr("width");
  height = $(this).attr("height");
 });
var title = $('#cart_data h1').text();
var values = $("#cart_data>ul>li>p[data-value]").map(function(){ 
   return parseInt($(this).attr("data-value"));
});
/* get some data from html (end) */

/* drawing values (fold) */
var yMargin = 25; //margin on top and bottom
var xMargin = 10; //margin left and right and beetween bars
var barMaxHeight = height - yMargin * 2; //maximum bar height depending on canvas height
var barWidth = (width - (values.length + 2) * xMargin) / values.length; //width of bar depending on canvas width
var yBarStartPoint = height - yMargin; //position where the bars start
var yLabelStartPoint = yBarStartPoint + 5; //middle of each bar for

if (barWidth < 100){
    headLineFont = '14px sans-serif'
    labelFont = '12px sans-serif';
    barLabelFont = '10px sans-serif'
} else {
    headLineFont = '18px sans-serif'
    labelFont = '14px sans-serif';
    barLabelFont = '12px sans-serif'
};
/* drawing values (end) */

/* calculate some intermediary values (fold) */
var xMiddleOfDiagram = (xMargin + xMargin * values.length + barWidth * values.length)/2
var biggestValue = values.sort()[values.length-1];
/* calculate some intermediary values (end) */

var context = canvas.getContext('2d');
    	
    /* draw headline (fold) */
    context.fillStyle = textColor;
    context.font = headLineFont; context.textBaseline = 'top'; context.textAlign = 'center'; context.fillText(title, xMiddleOfDiagram, 0);
    /*  draw headline (end) */
    
	/* add shadow for chart and labels (fold) */
	context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowBlur = 10;
	context.shadowColor = "rgba(64, 64, 64, 0.5)";
	/* add shadow for chart and labels (end) */
	
    /* iterate over values (fold) */
    $("#cart_data>ul>li>p").each(function(i){  
    
      /* get some data from html (fold) */
      var label = $(this).attr("data-name");
      var value = $(this).attr("data-value");
      var unit = $(this).attr("data-unit");
	  var color = $(this).attr("data-color");
      /* get some data from html (end) */
    
      /* calculate some intermediary values (fold) */
      var barHeight = (value / biggestValue) * barMaxHeight;
      var xMiddleOfBar = barWidth / 2 + xMargin + xMargin * i + barWidth * i;
      var yMiddleOfBar = yBarStartPoint - barHeight / 2;
      /* calculate some intermediary values (end) */
    
      /* draw labels (fold) */
      context.fillStyle = textColor;
      context.font = labelFont; context.textBaseline = 'top'; context.textAlign = 'center'; context.fillText(label, xMiddleOfBar , yLabelStartPoint);
      /* draw labels (end) */
    
      /* draw bars (fold) */
      context.fillStyle = color;
      context.fillRect (xMargin + xMargin * i + barWidth * i, yBarStartPoint, barWidth, barHeight * -1);
      /* draw bars (end) */
    
      /* draw values with units on the bars (fold) */
      context.fillStyle = textColor;
      context.font = barLabelFont; context.textBaseline = 'top'; context.textAlign = 'center'; context.fillText(value + " " + unit, xMiddleOfBar , yMiddleOfBar);
      /* draw values with units on the bars (fold) */
    });
    /* iterate over values (end) */
}