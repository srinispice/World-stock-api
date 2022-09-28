const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = new express.Router();
var finalJson = [];
const pageUrl = 'https://www.investing.com';
router.get('/news/latest_news', (req, response) => {
    axios.get('https://www.investing.com/news/latest-news')
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
            const getNameTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'title');
            const getHrefTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'href');
            const getPostedByTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(1)');
            const getPostedDateTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(2)');
            const getDescTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv p');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ newsTitle: getNameTagArr[i], newsUrl: pageUrl + getHrefTagArr[i], postedBy: getPostedByTagArr[i], postedOn: getPostedDateTagArr[i], shotDesc: getDescTagArr[i] });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});
router.get('/news/most_popular_news', (req, response) => {
    axios.get('https://www.investing.com/news/most-popular-news')
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
            const getNameTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'title');
            const getHrefTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'href');
            const getPostedByTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(1)');
            const getPostedDateTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(2)');
            const getDescTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv p');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ newsTitle: getNameTagArr[i], newsUrl: pageUrl + getHrefTagArr[i], postedBy: getPostedByTagArr[i], postedOn: getPostedDateTagArr[i], shotDesc: getDescTagArr[i] });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});
router.get('/news/cryptocurrency_news/:pageNo?', (req, response) => {
    const pageNo = (req.params.pageNo) ? req.params.pageNo : '';
    console.log('pageno', pageNo);
    axios.get('https://www.investing.com/news/cryptocurrency-news/' + pageNo)
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
            const getNameTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'title');
            const getHrefTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'href');
            const getPostedByTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(1)');
            const getPostedDateTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(2)');
            const getDescTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv p');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ newsTitle: getNameTagArr[i], newsUrl: pageUrl + getHrefTagArr[i], postedBy: getPostedByTagArr[i], postedOn: getPostedDateTagArr[i], shotDesc: getDescTagArr[i] });
            }
            console.log(finalJson.length);
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});
router.get('/news/stock_market_news/:pageNo?', (req, response) => {
    const pageNo = (req.params.pageNo) ? req.params.pageNo : '';
    console.log('pageno', pageNo);
    axios.get('https://www.investing.com/news/stock-market-news/' + pageNo)
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
            const getNameTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'title');
            const getHrefTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'href');
            const getPostedByTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(1)');
            const getPostedDateTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(2)');
            const getDescTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv p');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ newsTitle: getNameTagArr[i], newsUrl: pageUrl + getHrefTagArr[i], postedBy: getPostedByTagArr[i], postedOn: getPostedDateTagArr[i], shotDesc: getDescTagArr[i] });
            }
            console.log(finalJson.length);
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});
router.get('/news/commodities_news/:pageNo?', (req, response) => {
    const pageNo = (req.params.pageNo) ? req.params.pageNo : '';
    console.log('pageno', pageNo);
    axios.get('https://www.investing.com/news/commodities-news/' + pageNo)
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
            const getNameTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'title');
            const getHrefTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'href');
            const getPostedByTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(1)');
            const getPostedDateTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(2)');
            const getDescTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv p');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ newsTitle: getNameTagArr[i], newsUrl: pageUrl + getHrefTagArr[i], postedBy: getPostedByTagArr[i], postedOn: getPostedDateTagArr[i], shotDesc: getDescTagArr[i] });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});
router.get('/news/forex_news/:pageNo?', (req, response) => {
    const pageNo = (req.params.pageNo) ? req.params.pageNo : '';
    console.log('pageno', pageNo);
    axios.get('https://www.investing.com/news/forex-news/' + pageNo)
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
            const getNameTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'title');
            const getHrefTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'href');
            const getPostedByTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(1)');
            const getPostedDateTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(2)');
            const getDescTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv p');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ newsTitle: getNameTagArr[i], newsUrl: pageUrl + getHrefTagArr[i], postedBy: getPostedByTagArr[i], postedOn: getPostedDateTagArr[i], shotDesc: getDescTagArr[i] });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});
router.get('/news/economy_news/:pageNo?', (req, response) => {
    const pageNo = (req.params.pageNo) ? req.params.pageNo : '';
    console.log('pageno', pageNo);
    axios.get('https://www.investing.com/news/economy/' + pageNo)
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
            const getNameTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'title');
            const getHrefTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'href');
            const getPostedByTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(1)');
            const getPostedDateTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(2)');
            const getDescTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv p');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ newsTitle: getNameTagArr[i], newsUrl: pageUrl + getHrefTagArr[i], postedBy: getPostedByTagArr[i], postedOn: getPostedDateTagArr[i], shotDesc: getDescTagArr[i] });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});
router.get('/news/economy_indicators_news/:pageNo?', (req, response) => {
    const pageNo = (req.params.pageNo) ? req.params.pageNo : '';
    console.log('pageno', pageNo);
    axios.get('https://www.investing.com/news/economic-indicators/' + pageNo)
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
            const getNameTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'title');
            const getHrefTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .title', 'href');
            const getPostedByTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(1)');
            const getPostedDateTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv .articleDetails span:nth-child(2)');
            const getDescTagArr = getTagDataArr('#leftColumn .largeTitle article .textDiv p');
            finalJson = [];
            for (let i = 0; i < getNameTagArr.length; i++) {
                finalJson.push({ newsTitle: getNameTagArr[i], newsUrl: pageUrl + getHrefTagArr[i], postedBy: getPostedByTagArr[i], postedOn: getPostedDateTagArr[i], shotDesc: getDescTagArr[i] });
            }
            response.json(finalJson);
        }).catch((err) => {
            response.json({ error: 'Some error occurred' })
        });
});
module.exports = router;