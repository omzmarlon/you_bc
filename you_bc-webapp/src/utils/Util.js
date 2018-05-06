const _ = require('lodash');
import {ExceedMaxItemsError} from './Errors';

// TODO: refactor on the usage of this function
export function isIOS() {

    const iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ];

    if (!!navigator.platform) {
        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()){ return true; }
        }
    }

    return false;
}

/***
 * Logic for selecting tags
 * 1. append new tag into existing tags
 * 2. remove selected tag from existing tags
 *
 * @param newTag - the new tag user just selected
 * @param oldTags - already chosen tags
 * @param maxTags - maximum number of tags a user can select(undefined if no such limit)
 *
 * @return Array - new processed tags
 *
 * @throws ExceedMaxItemsError when adding new tag would exceed maximum allowed tags
 */
export function chooseItems(newTag, oldTags, maxTags) {
    if (_.indexOf(oldTags, newTag) === -1) {
        if (!maxTags || oldTags.length < maxTags) {
            return [...oldTags, newTag];
        } else {
            throw new ExceedMaxItemsError();
        }
    } else {
        return _.filter(oldTags, t => t !== newTag);
    }
}