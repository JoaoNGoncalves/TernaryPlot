TernaryUtils = function() {

    function chart(){};

    chart.addData = function(newData, Dataset, color_opt) {
        var datalength = newData.values.length;
        var aux = Dataset.length;
        var sum = 0;
        var aux_a=[];
        var aux_b=[];
        var aux_c=[];

        for (var aux2 = 0; aux2 < datalength; aux2++) {
            sum = newData.values[aux2][0] + newData.values[aux2][1]+ newData.values[aux2][2];
            aux_a[aux2]= newData.values[aux2][0] * (100/sum);
            aux_b[aux2]= newData.values[aux2][1] * (100/sum);
            aux_c[aux2]= newData.values[aux2][2] * (100/sum);
        }
        if (newData.mode!='markers'){
            aux_a[datalength]=aux_a[0];
            aux_b[datalength]=aux_b[0];
            aux_c[datalength]=aux_c[0];
        }

        Dataset[aux] =  {
            a: aux_a,
            b: aux_b,
            c: aux_c,
            showlegend: newData.userChoice,
            line: {color: '#444'}, //always this
            name: newData.Name,
            text: newData.text,
            type: 'scatterternary' //always this
        }
        if (newData.mode=='area'){
            Dataset[aux].fill = 'toself';
            Dataset[aux].mode = 'lines';
            Dataset[aux].fillcolor= (color_opt===undefined) ? chart.getRandomColor() : color_opt; //choice or random
        }
        if (newData.mode=='markers'){
            Dataset[aux].mode = 'markers';
            Dataset[aux].fill = 'none';
            Dataset[aux].marker = {
                    color: (color_opt===undefined) ? chart.getRandomColor() : color_opt,
                    line: {width: 1},
                    size: 10,
                    symbol: [Math.floor(Math.random() * 26)] //to change "circle", "square", "diamond", "cross", "x", "triangle-up", "triangle-down", "triangle-left",
                // "triangle-right", "hexagon", "hexagon2", "octagon", "star", "hexagram", "star-triangle-up", "star-square"
                // "star-diamond", "hourglass", "bowtie"
            };
        }
        if (newData.mode=='lines'){
            Dataset[aux].fill = 'none';
            Dataset[aux].mode = 'lines';
            Dataset[aux].line = {color: (color_opt===undefined) ? chart.getRandomColor() : color_opt}

        }
        if (newData.disabled){
            Dataset[aux].visible = 'legendonly';
        }else {
            Dataset[aux].visible = true;
        }

        return;
    }

    chart.updateChart= function(SVG, data, layout, options){
        Plotly.plot(SVG,data, layout, options);
        //Plotly.newPlot(SVG, data, layout, options);
        return;
    }

    chart.layout= function(axis) {
        var layout = {
            //title: 'Simple Ternary Contour Plot with Python',
            autosize: true,
            //height: 300,
            margin: {
                r: 10,
                t: 40,
                b: 50,
                l: 50
            },
            font: {
                family: 'sans-serif',
                size: 12,
                color: 'black'
            },
            showlegend: true,
            /*legend: {"orientation": "h",
                    x:0,
                    y:100
            }, */
            //font: "sans-serif",
            ternary: {
                aaxis: {
                    linewidth: 1, //2
                    min: 0.01, //hide 0 and 100
                    //nticks:11 ,   // 10 in 10
                    //tickvals: [0,10,20,30,40,50,60,70,80,90,100], //just a test
                    //tickmode: "array",                            //just a test
                    ticks: 'outside',
                    ticksuffix: '%',
                    title:  axis[0],
                    titlefont: {size: 12}
                },
                baxis: {
                    linewidth: 1,
                    min: 0.01,
                    ticks: 'outside',
                    ticksuffix: '%',
                    title: axis[1], //'<br>' +
                    titlefont: {size: 12}
                },
                caxis: {
                    linewidth: 1,
                    min: 0.01,
                    ticks: 'outside',
                    ticksuffix: '%',
                    title: axis[2],
                    titlefont: {size: 12}
                },
                sum: 100
            }
        }
        return layout;
    };
    chart.options= function() {
        var options ={
            displayModeBar: false,
        }
        return options;
    };

    var colorIndex =-1;
    chart.getRandomColor = function () { /* function () {return d3.scale.category20().range()};
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color; */

        var color = d3.scale.category10().range();  //mais que 10 cores? //bookmark
        //var aux = Math.floor(Math.random() * 20);
        colorIndex++;
        if(colorIndex>=10){
            colorIndex =0;
        }
        return color[colorIndex];

    }

    return chart;
};
