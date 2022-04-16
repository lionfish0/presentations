$(function() {
    function getrgb_logistic(params,x,y) {
        val = params[0]*x + params[1]*y + params[2];
        logival = 1/(1+Math.exp(-val));
        
        red = 2-logival*2;
        if (red<0) {red=0;}
        blue = logival*2;
        if (red>1) {red=1;}
        if (blue>1) {blue=1;}
        green = 1-2*Math.abs(logival-0.5)
        return [red*255,green*255,blue*255];
    }
    
    var width = 700;
    var height = 450;
    var gridres = 20;
    r = Raphael("chart", width, height);
    txt = {"font": '10px Fontin-Sans, Arial', stroke: "none", fill: "#fff"};
    //r.rect(0,0,width,height).attr({fill: "0-#fff-#f00:20-#000", stroke: "none"});
    
    data = [[10,20,1],[20,10,1],[20,20,1],[20,30,0],[30,10,0],[30,30,0]];

    
    
    
  
    rects = []
    for (var x = 0; x<width; x+=gridres) {
        for (var y = 0; y<height; y+=gridres) {    
            rgb = getrgb_logistic([0,0,0],x/width,y/height);
            rec = r.rect(x,y,x+gridres,y+gridres).attr({fill: "white", stroke:"none"});
            rects.push(rec);
        }
    }

    for (var i = 0; i<data.length; i++) {
        if (data[i][2]==0) {fill="#f00"}
        if (data[i][2]==1) {fill="#00f"}
        r.circle(data[i][0],height-data[i][1],5).attr({fill: fill});
    }
    r.path("M"+width+" "+height+"L0 "+height+"L0 0").attr({"stroke-width": 10, stroke: "#000"});

    function redraw(){
        params = []
        for (var i = 0;i<3;i++) {
            params.push($('#w'+i).val()/100);
        }
        i = 0;
        for (var x = 0; x<width; x+=gridres) {
            for (var y = 0; y<height; y+=gridres) {    
                rgb = getrgb_logistic(params,x/width,y/height);
                rec = rects[i];
                i+=1;
                rec.attr({fill: "rgb(" + rgb.join(",") + ")", stroke:"none"});
            }
        }
    }

    $('.weight').on('change', function(){   
        redraw();
    });
    
    
    redraw();
    
    rnetwork = Raphael("network", width, height);
    /*rnetwork.rect(0,0,width,height).attr({fill: "0-#fff-#f00:20-#000", stroke: "none"});*/
    rnetwork.path("M10 100L100 50L200 100M10 200L100 150L200 100");
    
    
    $("#w1").parent().css({position: 'relative'});  
    $("#w1").css({top: 50, left: 50, position:'absolute'});

    
    

});
