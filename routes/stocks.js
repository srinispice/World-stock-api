const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = new express.Router();
var finalJson = [];

router.get('/countryList', (req, response) => {
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
            const getNameTagArr = getTagDataArr('.js-simple-country-selection-popup .common-list .common-list-item .text');
            const getUrlTagArr = getTagDataArr('.js-simple-country-selection-popup .common-list .common-list-item .common-list-link', 'href');
            console.log(getUrlTagArr);
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    value: getUrlTagArr[i].replace('?country=', '')
                });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

//Trending stocks countrywise
router.get('/stocks_countrywise_by_price/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/trending-stocks?country=' + req.params.countryCode;
    axios.get(pageUrl)
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
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

router.get('/stocks_countrywise_by_performance/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/trending-stocks/performance?country=' + req.params.countryCode;
    axios.get(pageUrl)
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

router.get('/stocks_countrywise_by_technical/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/trending-stocks/technical?country=' + req.params.countryCode;
    axios.get(pageUrl)
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

router.get('/stocks_countrywise_by_fundamental/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/trending-stocks/fundamental?country=' + req.params.countryCode;
    axios.get(pageUrl)
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
            const getMarketCapTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_market_cap span');
            const getRevenueTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_revenue span');
            const getRatioTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_ratio span');
            const getBetaTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_beta span');
            const getEpsTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_eps span');
            const getDividendTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_dividend span');
            const getNextEarningDateTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_next_earnings span');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    marketCap: getMarketCapTagArr[i],
                    revenue: getRevenueTagArr[i],
                    ratio: getRatioTagArr[i],
                    beta: getBetaTagArr[i],
                    EPS: getEpsTagArr[i],
                    dividend: getDividendTagArr[i],
                    nextEarningDate: getNextEarningDateTagArr[i],
                });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

//52 week high countrywise
router.get('/week_high_countrywise_by_price/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/52-week-high?country=' + req.params.countryCode;
    axios.get(pageUrl)
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
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

router.get('/week_high_countrywise_by_performance/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/52-week-high/performance?country=' + req.params.countryCode;
    axios.get(pageUrl)
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

router.get('/week_high_countrywise_by_technical/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/52-week-high/technical?country=' + req.params.countryCode;
    axios.get(pageUrl)
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

router.get('/week_high_countrywise_by_fundamental/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/52-week-high/fundamental?country=' + req.params.countryCode;
    axios.get(pageUrl)
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
            const getMarketCapTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_market_cap span');
            const getRevenueTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_revenue span');
            const getRatioTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_ratio span');
            const getBetaTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_beta span');
            const getEpsTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_eps span');
            const getDividendTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_dividend span');
            const getNextEarningDateTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_next_earnings span');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    marketCap: getMarketCapTagArr[i],
                    revenue: getRevenueTagArr[i],
                    ratio: getRatioTagArr[i],
                    beta: getBetaTagArr[i],
                    EPS: getEpsTagArr[i],
                    dividend: getDividendTagArr[i],
                    nextEarningDate: getNextEarningDateTagArr[i],
                });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

//52 week low countrywise
router.get('/week_low_countrywise_by_price/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/52-week-low?country=' + req.params.countryCode;
    axios.get(pageUrl)
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
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

router.get('/week_low_countrywise_by_performance/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/52-week-low/performance?country=' + req.params.countryCode;
    axios.get(pageUrl)
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

router.get('/week_low_countrywise_by_technical/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/52-week-low/technical?country=' + req.params.countryCode;
    axios.get(pageUrl)
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

router.get('/week_low_countrywise_by_fundamental/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/52-week-low/fundamental?country=' + req.params.countryCode;
    axios.get(pageUrl)
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
            const getMarketCapTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_market_cap span');
            const getRevenueTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_revenue span');
            const getRatioTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_ratio span');
            const getBetaTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_beta span');
            const getEpsTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_eps span');
            const getDividendTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_dividend span');
            const getNextEarningDateTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_next_earnings span');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    marketCap: getMarketCapTagArr[i],
                    revenue: getRevenueTagArr[i],
                    ratio: getRatioTagArr[i],
                    beta: getBetaTagArr[i],
                    EPS: getEpsTagArr[i],
                    dividend: getDividendTagArr[i],
                    nextEarningDate: getNextEarningDateTagArr[i],
                });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

//most active countrywise
router.get('/most_active_countrywise_by_price/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/most-active-stocks?country=' + req.params.countryCode;
    axios.get(pageUrl)
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
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

router.get('/most_active_countrywise_by_performance/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/most-active-stocks/performance?country=' + req.params.countryCode;
    axios.get(pageUrl)
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

router.get('/most_active_countrywise_by_technical/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/most-active-stocks/technical?country=' + req.params.countryCode;
    axios.get(pageUrl)
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

router.get('/most_active_countrywise_by_fundamental/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/most-active-stocks/fundamental?country=' + req.params.countryCode;
    axios.get(pageUrl)
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
            const getMarketCapTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_market_cap span');
            const getRevenueTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_revenue span');
            const getRatioTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_ratio span');
            const getBetaTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_beta span');
            const getEpsTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_eps span');
            const getDividendTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_dividend span');
            const getNextEarningDateTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_next_earnings span');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    marketCap: getMarketCapTagArr[i],
                    revenue: getRevenueTagArr[i],
                    ratio: getRatioTagArr[i],
                    beta: getBetaTagArr[i],
                    EPS: getEpsTagArr[i],
                    dividend: getDividendTagArr[i],
                    nextEarningDate: getNextEarningDateTagArr[i],
                });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

//top gainers countrywise
router.get('/top_gainers_countrywise_by_price/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/top-stock-gainers?country=' + req.params.countryCode;
    axios.get(pageUrl)
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
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

router.get('/top_gainers_countrywise_by_performance/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/top-stock-gainers/performance?country=' + req.params.countryCode;
    axios.get(pageUrl)
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

router.get('/top_gainers_countrywise_by_technical/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/top-stock-gainers/technical?country=' + req.params.countryCode;
    axios.get(pageUrl)
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

router.get('/top_gainers_countrywise_by_fundamental/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/top-stock-gainers/fundamental?country=' + req.params.countryCode;
    axios.get(pageUrl)
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
            const getMarketCapTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_market_cap span');
            const getRevenueTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_revenue span');
            const getRatioTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_ratio span');
            const getBetaTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_beta span');
            const getEpsTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_eps span');
            const getDividendTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_dividend span');
            const getNextEarningDateTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_next_earnings span');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    marketCap: getMarketCapTagArr[i],
                    revenue: getRevenueTagArr[i],
                    ratio: getRatioTagArr[i],
                    beta: getBetaTagArr[i],
                    EPS: getEpsTagArr[i],
                    dividend: getDividendTagArr[i],
                    nextEarningDate: getNextEarningDateTagArr[i],
                });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

//top losers countrywise
router.get('/top_losers_countrywise_by_price/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/top-stock-losers?country=' + req.params.countryCode;
    axios.get(pageUrl)
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
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

router.get('/top_losers_countrywise_by_performance/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/top-stock-losers/performance?country=' + req.params.countryCode;
    axios.get(pageUrl)
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

router.get('/top_losers_countrywise_by_technical/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/top-stock-losers/technical?country=' + req.params.countryCode;
    axios.get(pageUrl)
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

router.get('/top_losers_countrywise_by_fundamental/:countryCode', (req, response) => {
    const pageUrl = 'https://in.investing.com/equities/top-stock-losers/fundamental?country=' + req.params.countryCode;
    axios.get(pageUrl)
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
            const getMarketCapTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_market_cap span');
            const getRevenueTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_revenue span');
            const getRatioTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_ratio span');
            const getBetaTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_beta span');
            const getEpsTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_eps span');
            const getDividendTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_dividend span');
            const getNextEarningDateTagArr = getTagDataArr('.js-section-content .js-table-wrapper .common-table-wrapper .common-table-scroller table tbody tr .col-fundamental_next_earnings span');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({
                    name: getNameTagArr[i],
                    marketCap: getMarketCapTagArr[i],
                    revenue: getRevenueTagArr[i],
                    ratio: getRatioTagArr[i],
                    beta: getBetaTagArr[i],
                    EPS: getEpsTagArr[i],
                    dividend: getDividendTagArr[i],
                    nextEarningDate: getNextEarningDateTagArr[i],
                });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});

module.exports = router;