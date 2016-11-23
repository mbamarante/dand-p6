/**
 * Created by Maicon on 17/11/2016.
 */

function draw(error, data) {
    data = data.sort(function (a, b) {
        return d3.ascending(a.Sex, b.Sex);
    });

    var color = []
    var hint = []

    // color by gender
    for (var i = 0; i < d3.keys(data).length; i++) {
        if (d3.values(data)[i].Sex == "male") {
            color.push("578399");
            hint.push("Male");
        } else {
            color.push("E892C4");
            hint.push("Female");
        }
    }

    // white to empty hexagon
    for (var j = i; j < 900; j++) {
        color.push("white")
    }

    // initiate SVG and create hexagon centers

    //svg sizes and margins
    var margin = {
        top: 15,
        right: 0,
        bottom: 0,
        left: 15
    };

    var width = 850;
    var height = 300;

    // the number of columns and rows
    var MapColumns = 45,
        MapRows = 20;

    // the maximum radius the hexagons can have to still fit the screen
    var hexRadius = d3.min([width / ((MapColumns + 0.5) * Math.sqrt(3)),
        height / ((MapRows + 1 / 3) * 1.5)]);

    // set the new height and width of the SVG based on the max possible
    width = MapColumns * hexRadius * Math.sqrt(3);
    heigth = MapRows * 1.5 * hexRadius + 0.5 * hexRadius;

    // set the hexagon radius
    var hexbin = d3.hexbin()
        .radius(hexRadius);

    // calculate the center positions of each hexagon
    var points = [];
    for (var i = 0; i < MapRows; i++) {
        for (var j = 0; j < MapColumns; j++) {
            points.push([hexRadius * j * 1.75, hexRadius * i * 1.5]);
        }
    }

    // create SVG element
    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // draw hexagons and color them

    //Start drawing the hexagons
    svg.append("g")
        .selectAll(".hexagon")
        .data(hexbin(points))
        .enter().append("path")
        .attr("class", "hexagon")
        .attr("d", function (d) {
            return "M" + d.x + "," + d.y + hexbin.hexagon();
        })
        .attr("stroke", function (d, i) {
            return "#fff";
        })
        .attr("stroke-width", "1px")
        .style("fill", function (d, i) {
            return color[i];
        })
        .on("mouseover", function mover(d, i) {
            var el = d3.select("#legend")
                .html(hint[i]);
        })
    ;

    function key_func(d) {
        return d['key'];
    }

    // refresh the screen as the user selects the options
    function update(field) {
        // sort values
        if (field == 'Sex+Survived') {
            // http://jsfiddle.net/RFontana/bZX7Q/
            function compareValues(a, b) {
                return a.Survived - b.Survived;
            }

            var nested = d3.nest()
                .key(function (d) {
                    return d.Sex;
                })
                .sortKeys(d3.ascending)
                .sortValues(compareValues)
                .entries(data);
            var filtered = nested.reduce(function (a, b) {
                return a.concat(b.values);
            }, []);
        } else {
            var filtered = data.sort(function (a, b) {
                return d3.ascending(eval("a." + field), eval("b." + field));
            });
        }

        // creates hexagons according to the data
        // each data point is correlated to one hexagon
        var hexagons = svg.selectAll('hexagon')
            .data(filtered, key_func);

        // remove hexagons from earlier visualization
        hexagons.exit().remove();

        // fill color, hint to each hexagon according to select option
        // create an infobox with data overview
        color = [];
        hint = [];
        for (var i = 0; i < d3.keys(filtered).length; i++) {
            if (field == 'Sex+Survived') {
                if (d3.values(filtered)[i].Sex == "male") {
                    if (d3.values(filtered)[i].Survived == "1") {
                        color.push("578399");
                        hint.push("Survivor Male");
                    } else {
                        color.push("93C7DE");
                        hint.push("Perished Male");
                    }
                } else {
                    if (d3.values(filtered)[i].Survived == "1") {
                        hint.push("Survivor Female");
                        color.push("E892C4");
                    } else {
                        color.push("FFCBE0");
                        hint.push("Perished Female");
                    }
                }

                d3.select("#panel_infobox")
                    .html("<br><table class=\"w3-table-all w3-tiny\">" +
                        "<tr><th></th><th>Male</th><th>Female</th></tr>" +
                        "<tr><td>Count</td><td>577</td><td>314</td></tr>" +
                        "<tr><td>Survivor</td><td>109</td><td>233</td></tr>" +
                        "<tr><td>Casual.</td><td>468</td><td>81</td></tr>" +
                        "<tr><td>Surv. %</td><td>18.9%</td><td>74.2%</td></tr>" +
                        "</table>");

            } else if (field == 'Sex') {
                if (d3.values(filtered)[i].Sex == "male") {
                    color.push("6A9AB1");
                    hint.push("Male");
                } else {
                    color.push("F099CC");
                    hint.push("Female");
                }

                d3.select("#panel_infobox")
                    .html("<br><table class=\"w3-table-all w3-tiny\">" +
                        "<tr><th></th><th>Male</th><th>Female</th></tr>" +
                        "<tr><td>Count</td><td>577</td><td>314</td></tr>" +
                        "<tr><td>%</td><td>64.76%</td><td>35.24%</td></tr>" +
                        "</table>");

            } else if (field == 'Survived') {
                if (d3.values(filtered)[i].Survived == "1") {
                    color.push("#b2b2b2");
                    hint.push("Survivor");
                } else {
                    color.push("#DFDFDF");
                    hint.push("Perished");
                }

                d3.select("#panel_infobox")
                    .html("<br><table class=\"w3-table-all w3-tiny\">" +
                        "<tr><th></th><th>Survivor</th><th>Casual.</th></tr>" +
                        "<tr><td>Count</td><td>342</td><td>548</td></tr>" +
                        "<tr><td>%</td><td>38.38%</td><td>61.62%</td></tr>" +
                        "</table>");
            }
        }

        // set no color to remaining hexagons (with no data)
        for (var j = i; j < 900; j++) {
            color.push("white")
        }

        // start drawing the hexagons
        hexagons.enter()
            .append("hexagon")
            .data(hexbin(points))
            .enter().append("path")
            .attr("class", "hexagon")
            .attr("d", function (d) {
                return "M" + d.x + "," + d.y + hexbin.hexagon();
            })
            .attr("stroke", function (d, i) {
                return "#fff";
            })
            .attr("stroke-width", "1px")
            .style("fill", function (d, i) {
                return color[i];
            })
            .on("mouseover", function mover(d, i) {
                var el = d3.select("#legend")
                    .html(hint[i]);
            })
    }


    // users options to filter data: by sex, survived or
    // mixing sex and survived
    var user_options = ['Sex', 'Survived', 'Sex+Survived'];
    var user_options_idx = 0;

    // create buttons to users options
    var show_user_options = setInterval(function () {
        user_options_idx++;

        if (user_options_idx >= user_options.length) {
            clearInterval(show_user_options);

            var buttons = d3.select("#panel_button")
                .append("div")
                .selectAll("div")
                .data(user_options)
                .enter()
                .append("button")
                .attr("class", "w3-btn w3-round w3-dark-grey")
                .style("width", "100%")
                .style("margin", "1px")
                .attr("id", function (d) {
                    return "Button" + d;
                })
                .text(function (d) {
                    return d;
                });

            d3.select("#ButtonSex")
                .style("font-weight", "bold");

            if (user_options_idx == 1) {
                buttons.style("font-weight", "bold");
            }

            // add onclick event to change appearance and call update to refresh screen
            // set bold to selected button label
            buttons.on("click", function (d) {
                d3.select("#panel_button")
                    .selectAll("button")
                    .transition()
                    .duration(500)
                    .style("color", "white")
                    .style("font-weight", "normal")
                    .style("background", "#000");

                d3.select(this)
                    .transition()
                    .duration(500)
                    .style("background", "lightBlue")
                    .style("color", "white")
                    .style("font-weight", "bold");

                update(d);
            });
        }
    }, 1);
}