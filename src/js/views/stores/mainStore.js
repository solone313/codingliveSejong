import { createStore, combineReducers } from 'redux';
const joinedUsersReducers = require('../reducers/joinedUsersReducer');
const connectionStateReducer = require('../reducers/connectionStateReducer');
const selectedLanguageReducer = require('../reducers/selectedLanguageReducer');
const generalReducer = require('../reducers/generalReducer');
const chatReducer = require('../reducers/chatReducer');

const mainStore = createStore(combineReducers({
    joinedUsers: joinedUsersReducers,
    connectionState: connectionStateReducer,
    selectedLanguage: selectedLanguageReducer,
    general: generalReducer,
    chatReducer: chatReducer,
}));

module.exports = mainStore;