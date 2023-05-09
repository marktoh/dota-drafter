import HeroesView from './HeroesView';

import './HeroAddView.css';

/**
 * Inserts a hero, countered by hero pairing to the database
 * @param {Integer} secondary_hero_id The number representing the identity of the hero
 * @param {Integer} hero_id The number representing the identity of the hero
 */
async function insertHeroPair(table_id, secondary_hero_id, main_hero_id, insertFn) {
    function announceStatus(error) {
        if (error) {
            // eslint-disable-next-line eqeqeq
            if (error.code == 23505) {
                alert('This hero pairing already exists.')
            } else {
                alert(`Running into:\n${JSON.stringify(error, null, 2)}`);
            }
        } else {
            alert(`Hero ${secondary_hero_id} added to the database!`)
        }
    }
    const error = await insertFn({
        table_id,
        main_hero_id,
        secondary_hero_id
    })
    announceStatus(error);
}

function HeroAddView({ table_id, main_hero_id, onSuccessCallbackFn, onCloseCallbackFn, insertFn }) {
    async function insertHero(secondary_hero_id) {
        await insertHeroPair(table_id, secondary_hero_id, main_hero_id, insertFn);
        await onSuccessCallbackFn();
    }
    return (
        <div className="hero-add-view">
            <div className="hero-add-view-header">
                <h3>Add Hero</h3>
                <button onClick={onCloseCallbackFn}>Close View</button>
            </div>
            <HeroesView onClickFn={insertHero} />
        </div>
    )
}

export default HeroAddView;