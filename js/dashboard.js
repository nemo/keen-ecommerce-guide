$(document).ready(function() {
    showRevenue();
    showAOV();
    showAddToCartRate();
});

function showAddToCartRate() {
    var query = new Keen.Query("funnel", {
        steps: [
            {
                event_collection: 'product_views',
                actor_property: 'user.uuid'
            },
            {
                event_collection: 'add_to_carts',
                actor_property: 'user.uuid'
            }
        ]
    });


    var chart = new Keen.Dataviz();

    chart
      .el(document.getElementById("add-to-cart"))
      .chartType('columnchart')
      .height(200)
      .prepare();

    var req = window._keenClient.run(query, function(err, res){
      if (err) {
        chart.error(err.message);
      }
      else {
        chart
          .parseRequest(this)
          .title(" ")
          .render();
      }
    });

    setInterval(function(){
      chart.prepare(); // restart the spinner
      req.refresh();
    }, 60*1000);
}

function showRevenue() {
    var query = new Keen.Query("sum", {
        eventCollection: "purchases",
        timeframe: "this_30_days",
        target_property: 'total',
        interval: 'daily',
        maxAge: 300 // activate query caching by assigning maxAge (an integer representing seconds)
    });


    var chart = new Keen.Dataviz();

    chart
      .el(document.getElementById("chart-revenue"))
      .prepare();

    var req = window._keenClient.run(query, function(err, res){
      if (err) {
        chart.error(err.message);
      }
      else {
        chart
          .parseRequest(this)
          .title(" ")
          .render();
      }
    });

    setInterval(function(){
      chart.prepare(); // restart the spinner
      req.refresh();
    }, 60*1000);
}

function showAOV() {
    var query = new Keen.Query("average", {
        eventCollection: "purchases",
        timeframe: "this_30_days",
        target_property: 'total',
        interval: 'daily',
        maxAge: 300 // activate query caching by assigning maxAge (an integer representing seconds)
    });

    var chart = new Keen.Dataviz();

    chart
      .el(document.getElementById("chart-aov"))
      .prepare();

    var req = window._keenClient.run(query, function(err, res){
      if (err) {
        chart.error(err.message);
      }
      else {
        chart
          .parseRequest(this)
          .title(" ")
          .render();
      }
    });

    setInterval(function(){
      chart.prepare(); // restart the spinner
      req.refresh();
    }, 60*1000);
}