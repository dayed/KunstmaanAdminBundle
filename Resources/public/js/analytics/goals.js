
    // get goal data for a specific goal
    function getGoalData(goalOverview) {
        // get goal id
        var id = goalOverview.attr('data-goal-id');

        // set active button
        $('.active').attr('class', '');
        $('#goal'+id).attr('class', 'active');

        // get data
        $.get('analytics/getGoalGraphData/'+id, function(data) {
            // render chart
            setGoalChartData(data, data.graphData.length <= 31);

            // set title in chart overview
            $('#goal_title').html(data.name);
        });
    }

    // create a list of all goals
    function setGoals(data) {
        // reset the overview list
        $('#goalOverview').html('');
        var html = '';

        // create HTML for each goal
        for(var i = 0; i < data.extra.goals.length; i++) {
            html    +=
                     '<li id="goal'+data.extra.goals[i]['id']+'" data-goal-id="'+data.extra.goals[i]['id']+'" onClick="getGoalData($(this))">'
                    +    '<div>'
                    +        data.extra.goals[i]['name']
                    +    '</div>'
                    +    '<span>'
                    +        data.extra.goals[i]['visits']
                    +    '</span>'
                    +'</li>';
        }

        // add the HTML to the list
        $('#goalOverview').html(html);
    }

    var goalChartData = [];
    var goalChartLabels = [];

    // reset the chart
    function resetGoalChart() {
        goalChartData = [];
        goalChartLabels = [];
        initGoalChart();
        $('#goal_title').html('');
    }

    // sets the chart data
    function setGoalChartData(data, showLabels, isDayData) {
        goalChartData = [];
        goalChartLabels = [];
        if (data != null) {
            for (var i = 0; i < data.graphData.length; i++) {
                goalChartData.push(parseInt(data.graphData[i].visits));
                if (showLabels == true || i % 5 == 0) {
                    goalChartLabels.push(data.graphData[i].timestamp);
                } else {
                    goalChartLabels.push("");
                }
            }
        }
        initGoalChart();
    }

    // sets chart width and height
    function resizeGoalChart() {
        var chartWidth = $('#js-goal-dashboard-chart').parent().width();
        var chartHeight = $('#js-goal-dashboard-chart').height();
        $('#js-goal-dashboard-chart').attr('width', chartWidth );
        $('#js-goal-dashboard-chart').attr('height', chartHeight );
    }

    // inits the chart
    initGoalChart = function() {
        var barGoalChartData = {
            labels : goalChartLabels,
            datasets : [
                {
                    fillColor : "rgba(41, 151, 206, 0.3)",
                    strokeColor : "rgb(41, 151, 206)",
                    pointColor : "rgb(41, 151, 206)",
                    pointStrokeColor : "#fff",
                    data : goalChartData,
                    scaleShowLabels : true
                }
            ]
        };

        resizeGoalChart();
        var chart = new Chart(document.getElementById("js-goal-dashboard-chart").getContext("2d")).Line(barGoalChartData, {animation:false});
    };