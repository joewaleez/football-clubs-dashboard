let roots = [];

const COLORS = ["#1a6b2f","#e8c02a","#c0392b","#2980b9","#8e44ad","#e67e22","#16a085","#d35400","#2c3e50","#27ae60"];

fetch('/data').then(r => r.json()).then(fullData => {
    const years = [...new Set(fullData.map(d => d.Year))].sort();
    const sel = document.getElementById('yearSelect');
    years.forEach(y => { let o = document.createElement('option'); o.value = y; o.text = y; sel.add(o); });
    updateCharts(fullData, 'all');
    sel.onchange = () => updateCharts(fullData, sel.value);
});

function updateCharts(fullData, year) {
    roots.forEach(r => r.dispose()); roots = [];
    let data = year === 'all' ? averageData(fullData) : fullData.filter(d => d.Year == year);
    createBarChart("revenueChart",  data, "Revenue_M",        "{categoryX}: €{valueY}M");
    createBarChart("transferChart", data, "Transfer_Spend_M", "{categoryX}: €{valueY}M");
    createBarChart("salaryChart",   data, "Avg_Salary_K",     "{categoryX}: €{valueY}K/yr");
    createTrophiesPie(data);
}

function averageData(fullData) {
    const avg = {};
    fullData.forEach(r => {
        const c = r.Club;
        if (!avg[c]) avg[c] = {Club:c, Revenue_M:0, Squad_Size:0, Avg_Salary_K:0, Transfer_Spend_M:0, Trophies:0, Stadium_Cap:0, count:0};
        avg[c].Revenue_M += r.Revenue_M; avg[c].Squad_Size += r.Squad_Size;
        avg[c].Avg_Salary_K += r.Avg_Salary_K; avg[c].Transfer_Spend_M += r.Transfer_Spend_M;
        avg[c].Trophies += r.Trophies; avg[c].Stadium_Cap += r.Stadium_Cap;
        avg[c].count++;
    });
    return Object.values(avg).map(g => ({
        Club: g.Club,
        Revenue_M:        Math.round(g.Revenue_M / g.count),
        Squad_Size:       Math.round(g.Squad_Size / g.count),
        Avg_Salary_K:     Math.round(g.Avg_Salary_K / g.count),
        Transfer_Spend_M: Math.round(g.Transfer_Spend_M / g.count),
        Trophies:         Math.round(g.Trophies / g.count),
        Stadium_Cap:      Math.round(g.Stadium_Cap / g.count)
    }));
}

// ✅ FIX 1: use templateField for per-bar colors (dataItem.index is undefined in amCharts 5)
function addColorField(data) {
    return data.map((d, i) => ({
        ...d,
        columnSettings: {
            fill:   am5.color(COLORS[i % COLORS.length]),
            stroke: am5.color(COLORS[i % COLORS.length])
        }
    }));
}

// ✅ FIX 2: one shared createBarChart() — xAxis.data set BEFORE series.data
function createBarChart(id, data, valueField, tooltipText) {
    let root = am5.Root.new(id);
    root.setThemes([am5themes_Animated.new(root)]);
    root._logo.dispose();
    roots.push(root);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingLeft: 0
    }));

    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 15 });
    xRenderer.labels.template.setAll({ fontSize: 9, fill: am5.color("#888880") });
    xRenderer.grid.template.setAll({ stroke: am5.color("#e0dbd0"), strokeWidth: 1 });

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "Club",
        renderer: xRenderer
    }));

    let yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.labels.template.setAll({ fontSize: 9, fill: am5.color("#888880") });
    yRenderer.grid.template.setAll({ stroke: am5.color("#e0dbd0"), strokeWidth: 1 });

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: yRenderer
    }));

    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: valueField,
        categoryXField: "Club",
        tooltip: am5.Tooltip.new(root, { labelText: tooltipText })
    }));

    series.columns.template.setAll({
        cornerRadiusTL: 4,
        cornerRadiusTR: 4,
        strokeOpacity: 0,
        templateField: "columnSettings"  // ✅ key fix
    });

    const coloredData = addColorField(data);

    // ✅ xAxis data FIRST, then series data
    xAxis.data.setAll(coloredData);
    series.data.setAll(coloredData);

    chart.appear(1000, 100);
}

function createTrophiesPie(data) {
    let root = am5.Root.new("trophiesPie");
    root.setThemes([am5themes_Animated.new(root)]);
    root._logo.dispose();
    roots.push(root);

    let chart = root.container.children.push(am5percent.PieChart.new(root, {
        radius: am5.percent(85),
        innerRadius: am5.percent(40)
    }));

    let series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "Trophies",
        categoryField: "Club",
        tooltip: am5.Tooltip.new(root, { labelText: "{category}: {value} trophies" })
    }));

    series.labels.template.setAll({ fontSize: 10, fill: am5.color("#888880") });
    series.slices.template.setAll({ strokeWidth: 2, stroke: am5.color("#f5f3ee") });
    series.get("colors").set("colors", COLORS.map(c => am5.color(c)));
    series.data.setAll(data);
    series.appear(1000);
}