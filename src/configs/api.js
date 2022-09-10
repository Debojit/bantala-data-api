'use strict'

var apiConfig = {};

//Pagination
apiConfig.defaultPageSize = 10;
apiConfig.defaultPage = 1;

//Reusable patterns
apiConfig.bengaliDateRegex = {
    spreadSheet: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[012])$/,
    createSales: /^(0[1-9]|[12][0-9]|3[012])-(0[1-9]|1[0-2])-\d{4}-$/
};

module.exports = apiConfig;