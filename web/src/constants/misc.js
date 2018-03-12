import React from 'react';
import BasketballIcon from "../components/common/svg/BasketballIcon";
import ChickenIcon from "../components/common/svg/ChickenIcon";
import CatIcon from "../components/common/svg/CatIcon";
import WaveIcon from "../components/common/svg/WaveIcon";
import FoodIcon from "../components/common/svg/FoodIcon";
import {PRIMARY_WHITE} from "../styles/constants/colors";

const rollingIconStyle = {
    color: PRIMARY_WHITE
};

export const friendRollingIcon = size => ([
    <BasketballIcon style={{...rollingIconStyle, width: size, height: size}}/>,
    <ChickenIcon style={{...rollingIconStyle, width: size, height: size}}/>,
    <CatIcon style={{...rollingIconStyle, width: size, height: size}}/>,
    <WaveIcon style={{...rollingIconStyle, width: size, height: size}}/>,
    <FoodIcon style={{...rollingIconStyle, width: size, height: size}}/>
]);

export const VerificationCodes = [
    "poke",
    "1234"
];