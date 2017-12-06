'use strict';

export const PRIMARY_RED = 'PRIMARY_RED';
export const PRIMARY_BLUE = 'PRIMARY_BLUE';
export const PRIMARY_YELLOW = 'PRIMARY_YELLOW';
export const PRIMARY_GREEN = 'PRIMARY_GREEN';

export const getColorClass = (color) => ({
    'background-red': color === PRIMARY_RED,
    'background-blue': color === PRIMARY_BLUE,
    'background-yellow': color === PRIMARY_YELLOW,
    'background-green': color === PRIMARY_GREEN
});