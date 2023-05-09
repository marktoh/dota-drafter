import HeroPreview from '../components/HeroPreview';

import { removePairings } from "../api/pairings";
import './HeroRemoveView.css';

/**
 * Removes a hero, countered by hero pairing from the database
 * @param {String} table_id The name representing the table to be used
 * @param {Integer} secondary_hero_id The number representing the identity of the hero
 * @param {Integer} main_hero_id The number representing the identity of the hero
 */
async function removeHeroPair(table_id, secondary_hero_id, main_hero_id) {
    function announceStatus(error) {
        if (error) {
            alert(`Running into:\n${JSON.stringify(error, null, 2)}`);
        } else {
            alert(`Hero ${secondary_hero_id} removed from the database!`)
        }
    }
    const error = await removePairings({
        table_id,
        main_hero_id,
        secondary_hero_id,
    })
    announceStatus(error);
}

function HeroRemoveView({ table_id, heroId, heroes, onSuccessCallbackFn, onCloseCallbackFn }) {
    async function removeHero(secondary_hero_id) {
        await removeHeroPair(table_id, secondary_hero_id, heroId);
        await onSuccessCallbackFn();
    }
    return (
        <div className="hero-remove-view">
            <div className="hero-remove-view-header">
                <h3>Remove Hero</h3>
                <button onClick={onCloseCallbackFn}>Close View</button>
            </div>
            <div className="pairings">
                {heroes?.length > 0 ? 
                    heroes?.map(pairing => <HeroPreview key={pairing?.secondary_hero_id} heroId={pairing?.secondary_hero_id} img={pairing?.secondary_hero_img} name={pairing?.secondary_hero_name} onClickFn={removeHero} />)
                    : 
                    <p>No heroes found</p>
                }
            </div>
        </div>
    )
}

export default HeroRemoveView;