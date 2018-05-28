import React from 'react';
import "./UseMobile.less";
import PokeEgg from "../../../public/images/poke_egg.png";

const UseMobile = () => {
    return (
        <div className={'use-mobile-container'}>
            <img className={'use-mobile-image'} src={PokeEgg} />
            <h2>Please use your mobile device for better user experience</h2>
        </div>
    );
};

export default UseMobile;