'use strict'

var apiConfig = {
    //Pagination
    defaultPageSize : 10,
    defaultPage : 1,
    //Reusable patterns
    regex : {
        bengaliDate: {
            spreadSheet: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[012])$/,
            createSales: /^(0[1-9]|[12][0-9]|3[012])-(0[1-9]|1[0-2])-\d{4}$/
        },
        englishDate: {
            createSales: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/
        },
        sales : {
            createSales: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/
        }
    }

};

module.exports = apiConfig;