const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = new express.Router();

const finalJson = [];

router.get('/forex_rates/major_pairs_by_price', (req, response) => {
    axios.get('https://in.investing.com/currencies/streaming-forex-rates-majors')
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
            const getBidTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-bid span');
            const getAskTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-ask span');
            const getHighTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-high span');
            const getLowTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-low span');
            const getChgTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-chg span');
            const getChgPerTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-chg_pct span');
            const getTimeTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-time time');

            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ name: getNameTagArr[i], bid: getBidTagArr[i], ask: getAskTagArr[i], high: getHighTagArr[i], low: getLowTagArr[i], change: getChgTagArr[i], changePercentage: getChgPerTagArr[i], time: getTimeTagArr[i] });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

router.get('/forex_rates/major_pairs_by_performance', (req, response) => {
    axios.get('https://in.investing.com/currencies/streaming-forex-rates-majors/performance')
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
            const getDailyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_day span');
            const getOneWeekTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_week span');
            const getOneMonthTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_month span');
            const getYearToDateTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_ytd span');
            const getOneYearTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-performance_year span');

            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ name: getNameTagArr[i], last: getLastTagArr[i], daily: getDailyTagArr[i], oneWeek: getOneWeekTagArr[i], oneMonth: getOneMonthTagArr[i], yearToDate: getYearToDateTagArr[i], oneYear: getOneYearTagArr[i] });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

router.get('/major_global_indices_by_technical', (req, response) => {

    axios.get('https://in.investing.com/currencies/streaming-forex-rates-majors/technical')
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
            const getHourlyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_hour span');
            const getDailyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_day span');
            const getWeeklyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_week span');
            const getMonthlyTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-technical_month span');

            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    last: getLastTagArr[i],
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



module.exports = router;