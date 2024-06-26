function getChartColorsArray(e) {
  if (null !== document.getElementById(e)) {
    var r = document.getElementById(e).getAttribute("data-colors");
    if (r)
      return (r = JSON.parse(r)).map(function (e) {
        var r = e.replace(" ", "");
        if (-1 === r.indexOf(",")) {
          var o = getComputedStyle(document.documentElement).getPropertyValue(
            r
          );
          return o || r;
        }
        var a = e.split(",");
        return 2 != a.length
          ? r
          : "rgba(" +
              getComputedStyle(document.documentElement).getPropertyValue(
                a[0]
              ) +
              "," +
              a[1] +
              ")";
      });
    console.warn("data-colors Attribute not found on:", e);
  }
}
function ChartColorChange(r, o) {
  document.querySelectorAll(".theme-color").forEach(function (e) {
    e.addEventListener("click", function (e) {
      setTimeout(function () {
        var e = getChartColorsArray(o);
        r.options &&
          (r.options.colors
            ? (r.options.colors = e)
            : r.options.lineColors
            ? (r.options.lineColors = e)
            : r.options.barColors && (r.options.barColors = e),
          r.redraw());
      }, 0);
    });
  });
}
function ChartColorChangeSparkLine(r, o, a) {
  document.querySelectorAll(".theme-color").forEach(function (e) {
    e.addEventListener("click", function (e) {
      setTimeout(function () {
        var e = getChartColorsArray(a);
        (o.barColor = e), $("#" + a).sparkline(r, o);
      }, 0);
    });
  });
}
!(function (e) {
  "use strict";
  function r() {}
  (r.prototype.createAreaChart = function (e, r, o, a, t, n, i, l) {
    ChartColorChange(
      Morris.Area({
        element: e,
        pointSize: 0,
        lineWidth: 1,
        data: a,
        xkey: t,
        ykeys: n,
        labels: i,
        resize: !0,
        gridLineColor: "rgba(108, 120, 151, 0.1)",
        hideHover: "auto",
        lineColors: l,
        fillOpacity: 0.9,
        behaveLikeLine: !0,
      }),
      "morris-area-example"
    );
  }),
    (r.prototype.createDonutChart = function (e, r, o) {
      ChartColorChange(
        Morris.Donut({ element: e, data: r, resize: !0, colors: o }),
        "morris-donut-example"
      );
    }),
    (r.prototype.createStackedChart = function (e, r, o, a, t, n) {
      ChartColorChange(
        Morris.Bar({
          element: e,
          data: r,
          xkey: o,
          ykeys: a,
          stacked: !0,
          labels: t,
          hideHover: "auto",
          resize: !0,
          gridLineColor: "rgba(108, 120, 151, 0.1)",
          barColors: n,
        }),
        "morris-bar-stacked"
      );
    }),
    (r.prototype.init = function () {
      var e = getChartColorsArray("morris-area-example");
      e &&
        this.createAreaChart(
          "morris-area-example",
          0,
          0,
          [
            { y: "2011", a: 0, b: 0, c: 0 },
            { y: "2012", a: 150, b: 45, c: 15 },
            { y: "2013", a: 60, b: 150, c: 195 },
            { y: "2014", a: 180, b: 36, c: 21 },
            { y: "2015", a: 90, b: 60, c: 360 },
            { y: "2016", a: 75, b: 240, c: 120 },
            { y: "2017", a: 30, b: 30, c: 30 },
          ],
          "y",
          ["a", "b", "c"],
          ["Series A", "Series B", "Series C"],
          e
        );
      var r = getChartColorsArray("morris-donut-example");
      r &&
        this.createDonutChart(
          "morris-donut-example",
          [
            { label: "Download Sales", value: 12 },
            { label: "In-Store Sales", value: 30 },
            { label: "Mail-Order Sales", value: 20 },
          ],
          r
        );
      var o = getChartColorsArray("morris-bar-stacked");
      o &&
        this.createStackedChart(
          "morris-bar-stacked",
          [
            { y: "2005", a: 45, b: 180 },
            { y: "2006", a: 75, b: 65 },
            { y: "2007", a: 100, b: 90 },
            { y: "2008", a: 75, b: 65 },
            { y: "2009", a: 100, b: 90 },
            { y: "2010", a: 75, b: 65 },
            { y: "2011", a: 50, b: 40 },
            { y: "2012", a: 75, b: 65 },
            { y: "2013", a: 50, b: 40 },
            { y: "2014", a: 75, b: 65 },
            { y: "2015", a: 100, b: 90 },
            { y: "2016", a: 80, b: 65 },
          ],
          "y",
          ["a", "b"],
          ["Series A", "Series B"],
          o
        );
    }),
    (e.Dashboard = new r()),
    (e.Dashboard.Constructor = r);
})(window.jQuery),
  (function () {
    "use strict";
    window.jQuery.Dashboard.init();
  })();
var series,
  chartoption,
  demo,
  sparklineChart1Colors = getChartColorsArray("sparkline");
sparklineChart1Colors &&
  ((series = [8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12]),
  (chartoption = {
    type: "bar",
    height: "130",
    barWidth: "10",
    barSpacing: "7",
    barColor: "#7A6FBE",
  }),
  (demo = $("#sparkline").sparkline(series, chartoption)),
  ChartColorChangeSparkLine(series, chartoption, "sparkline"));
