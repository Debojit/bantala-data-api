'use strict'

function mapModelToFindResponse(data) {
    if(!data) {
        return undefined;
    }
    
    if(data._id) {// Rename '_id' property
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
        data._id = +data.bengaliDate.replaceAll('-','');
    }

    if('englishDate' in data) {
        data.englishDate = new Date(data.englishDate.split('-').reverse().join('-'));
    }

    return data;
}

module.exports = {
    mapModelToFindResponse,
    mapCreateRequestToModel
}