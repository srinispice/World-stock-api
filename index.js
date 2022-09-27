const PORT = process.env.PORT || 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const currencyRoutes = require('./routes/currencies');
const newsRoutes = require('./routes/news');

const app = express();
var finalJson = [];

app.use(currencyRoutes);
app.use(newsRoutes);

app.get('/', (req, res) => {
    res.json('Welcome to Global Stocks API');
});

app.get('/countryList', (req, response) => {

    axios.get(' https://in.investing.com/equities/trending-stocks')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName, attr = '') => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push((attr) ? $(e).attr(attr) : $(e).text());
                    }
                });
                return tempArr;
            };
            // const getNameTagArr = commonFunctions.getTagDataArr('.js-simple-country-selection-popup .common-list .common-list-item .text');
            const getUrlTagArr = getTagDataArr('.js-simple-country-selection-popup .common-list .common-list-item .common-list-link', 'href');
            console.log(getUrlTagArr);


            // for (let i = 0; i < getNameTagArr.length; i++) {
            //     finalJson.push({ name: getNameTagArr[i], last: getLastTagArr[i], high: getHighTagArr[i], low: getLowTagArr[i], change: getChgTagArr[i], changePercentage: getChgPerTagArr[i], volume: getVolTagArr[i], time: getTimeTagArr[i] });
            // }
            console.log(finalJson.length);
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });

});


app.get('/major_global_indices_by_price', (req, response) => {

    axios.get('https://in.investing.com/indices/major-indices')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getLastTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-last span');
            const getHighTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-high span');
            const getLowTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-low span');
            const getChgTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-chg span');
            const getChgPerTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-chg_pct span');
            const getVolTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-volume span');
            const getTimeTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-time time');


            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ name: getNameTagArr[i], last: getLastTagArr[i], high: getHighTagArr[i], low: getLowTagArr[i], change: getChgTagArr[i], changePercentage: getChgPerTagArr[i], volume: getVolTagArr[i], time: getTimeTagArr[i] });
            }
            console.log(finalJson.length);
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});


app.get('/major_global_indices_by_performance', (req, response) => {

    axios.get('https://in.investing.com/indices/major-indices/performance')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getDailyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_day span');
            const getOneWeekTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_week span');
            const getOneMonthTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_month span');
            const getYearToDateTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_ytd span');
            const getOneYearTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_year span');
            const getThreeYearTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_3year span');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ name: getNameTagArr[i], daily: getDailyTagArr[i], oneWeek: getOneWeekTagArr[i], oneMonth: getOneMonthTagArr[i], yearToDate: getYearToDateTagArr[i], oneYear: getOneYearTagArr[i], threeYear: getThreeYearTagArr[i] });
            }

            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});


app.get('/major_global_indices_by_technical', (req, response) => {

    axios.get('https://in.investing.com/indices/major-indices/technical')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getHourlyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_hour span');
            const getDailyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_day span');
            const getWeeklyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_week span');
            const getMonthlyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_month span');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    hourly: getHourlyTagArr[i],
                    daily: getDailyTagArr[i],
                    weekly: getWeeklyTagArr[i],
                    monthly: getMonthlyTagArr[i],
                });
            }

            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

app.get('/global_indices_by_price', (req, response) => {

    axios.get('https://in.investing.com/indices/global-indices?c_id[]=all&majorIndices=on&r_id[]=1&r_id[]=2&r_id[]=3&r_id[]=4&r_id[]=5')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getLastTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-last span');
            const getHighTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-high span');
            const getLowTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-low span');
            const getChgTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-chg span');
            const getChgPerTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-chg_pct span');
            const getVolTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-volume span');
            const getTimeTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-time time');


            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ name: getNameTagArr[i], last: getLastTagArr[i], high: getHighTagArr[i], low: getLowTagArr[i], change: getChgTagArr[i], changePercentage: getChgPerTagArr[i], volume: getVolTagArr[i], time: getTimeTagArr[i] });
            }
            console.log(finalJson.length);
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

app.get('/global_indices_by_performance', (req, response) => {

    axios.get('https://in.investing.com/indices/global-indices/performance?c_id[]=all&majorIndices=on&r_id[]=1&r_id[]=2&r_id[]=3&r_id[]=4&r_id[]=5')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getDailyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_day span');
            const getOneWeekTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_week span');
            const getOneMonthTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_month span');
            const getYearToDateTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_ytd span');
            const getOneYearTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_year span');
            const getThreeYearTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_3year span');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ name: getNameTagArr[i], daily: getDailyTagArr[i], oneWeek: getOneWeekTagArr[i], oneMonth: getOneMonthTagArr[i], yearToDate: getYearToDateTagArr[i], oneYear: getOneYearTagArr[i], threeYear: getThreeYearTagArr[i] });
            }

            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

app.get('/global_indices_by_technical', (req, response) => {

    axios.get('https://in.investing.com/indices/global-indices/technical?c_id[]=all&majorIndices=on&r_id[]=1&r_id[]=2&r_id[]=3&r_id[]=4&r_id[]=5')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getHourlyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_hour span');
            const getDailyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_day span');
            const getWeeklyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_week span');
            const getMonthlyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_month span');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    hourly: getHourlyTagArr[i],
                    daily: getDailyTagArr[i],
                    weekly: getWeeklyTagArr[i],
                    monthly: getMonthlyTagArr[i],
                });
            }

            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

app.get('/major_commodity_by_price', (req, response) => {

    axios.get('https://in.investing.com/commodities/real-time-futures')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getLastTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-last span');
            const getHighTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-high span');
            const getLowTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-low span');
            const getChgTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-chg span');
            const getChgPerTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-chg_pct span');
            const getVolTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-volume span');
            const getTimeTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-time time');


            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ name: getNameTagArr[i], last: getLastTagArr[i], high: getHighTagArr[i], low: getLowTagArr[i], change: getChgTagArr[i], changePercentage: getChgPerTagArr[i], volume: getVolTagArr[i], time: getTimeTagArr[i] });
            }
            console.log(finalJson.length);
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

app.get('/major_commodity_by_performance', (req, response) => {

    axios.get('https://in.investing.com/commodities/real-time-futures/performance')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getDailyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_day span');
            const getOneWeekTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_week span');
            const getOneMonthTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_month span');
            const getYearToDateTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_ytd span');
            const getOneYearTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_year span');
            const getThreeYearTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_3year span');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ name: getNameTagArr[i], daily: getDailyTagArr[i], oneWeek: getOneWeekTagArr[i], oneMonth: getOneMonthTagArr[i], yearToDate: getYearToDateTagArr[i], oneYear: getOneYearTagArr[i], threeYear: getThreeYearTagArr[i] });
            }

            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

app.get('/major_commodity_by_technical', (req, response) => {

    axios.get('https://in.investing.com/commodities/real-time-futures/technical')
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);

            const getTagDataArr = (tagName) => {
                const tempArr = [];
                $(tagName).each((i, e) => {
                    if ($(e).text()) {
                        tempArr.push($(e).text());
                    }
                });
                return tempArr;
            };
            const getNameTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-name a');
            const getHourlyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_hour span');
            const getDailyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_day span');
            const getWeeklyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_week span');
            const getMonthlyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_month span');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    hourly: getHourlyTagArr[i],
                    daily: getDailyTagArr[i],
                    weekly: getWeeklyTagArr[i],
                    monthly: getMonthlyTagArr[i],
                });
            }

            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

app.listen(PORT, () => console.log(`server running o port ${PORT}`));