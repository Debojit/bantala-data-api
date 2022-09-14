'use strict'

function mapModelToResponse(data) {
    if(!data) {
        return undefined;
    }
    
    if('_id' in data) {// Rename '_id' property
        data = {id: data._id, ...data};
        delete data._id;
    }

    if('__v' in data) {
        delete data.__v; //Remove Mongo document version field
    }

    return data;
}

function mapCreateRequestToModel(data) {
    if('bengaliDate' in data) {
        data._id = +data.bengaliDate.split('-').reverse().join('');
    }

    if('englishDate' in data) {
        if(data.englishDate.constructor.name === 'String') {
            let isoRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
            if(isoRegex.test(data.englishDate)) {
                data.englishDate = new Date(data.englishDate);
            }
            else {
                data.englishDate = new Date(data.englishDate.split('-').reverse().join('-'));
            }
        }
    }

    return data;
}

module.exports = {
    mapModelToResponse,
    mapCreateRequestToModel
}