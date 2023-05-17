import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import HeroPreview from '../components/HeroPreview';
import HeroAddView from './HeroAddView';
import HeroRemoveView from './HeroRemoveView';

import { getPairings as getPairingsFromDb, upsertPairings } from '../api/pairings';

import './HeroEditView.css';

function HeroEditView() {
    const [pairings, setPairings] = useState(null);
    const [isAddingHero, setIsAddingHero] = useState(false);
    const [isRemovingHero, setIsRemovingHero] = useState(false);
    const { heroId, category } = useParams();
    const navigate = useNavigate();
    async function getPairings() {
        const data = await getPairingsFromDb({ table_id: category, main_hero_id: heroId });
        setPairings(data);
    }
    function closeAll() {
        setIsAddingHero(false);
        setIsRemovingHero(false);
    }
    function openAddHero() {
        closeAll();
        setIsAddingHero(true);
    }
    function openRemoveHero() {
        closeAll();
        setIsRemovingHero(true);
    }
    useEffect(() => {
        getPairings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    function handleClick(secondaryHeroId) {
        navigate(`/heroes/${heroId}/${category}/${secondaryHeroId}`, { replace: true })
    }
    return (
        <div className="hero-edit-view">
            <div>
                <h2 className="category">{category.split('_').join(' ')}</h2>
                <div className="pairings">
                    {pairings?.length > 0 ? 
                    pairings?.map(pairing => <HeroPreview key={pairing?.secondary_hero_id} heroId={pairing?.secondary_hero_id} img={pairing?.secondary_hero_img} name={pairing?.secondary_hero_name} onClickFn={() => handleClick(pairing?.secondary_hero_id)} />)
                    :
                    <p className="empty-category-message">No heroes found</p>
                    }
                </div>
            </div>
            <div className="buttons">
                <button onClick={openAddHero}>Add a hero</button>
                <button onClick={openRemoveHero}>Remove a hero</button>
            </div>
            {isAddingHero && <HeroAddView table_id={category} main_hero_id={heroId} onSuccessCallbackFn={getPairings} onCloseCallbackFn={() => setIsAddingHero(false)} insertFn={upsertPairings} />}
            {isRemovingHero && <HeroRemoveView table_id={category} heroId={heroId} heroes={pairings} onSuccessCallbackFn={getPairings} onCloseCallbackFn={() => setIsRemovingHero(false)} />}
        </div>
    )
}

export default HeroEditView;