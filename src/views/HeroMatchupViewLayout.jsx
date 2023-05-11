import { useState, useEffect } from 'react';
import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import HEROES from '../mock/heroes.json';
import HeroPreview from '../components/HeroPreview';

import { getMatchup } from '../api/pairings';

import './HeroMatchupViewLayout.css';

function Description({ category, heroId, secondaryHeroId, description, isEditable }) {
    return (
        <div className="description">
            <div className="title">
                <h3>Advantages</h3>
                {isEditable ? <Link to={`/heroes/${heroId}/${category}/${secondaryHeroId}/edit`}>Edit</Link> : null}
            </div>
            <Outlet context={{ description }} />
        </div>
    )
}

function HeroMatchupViewLayout({ user }) {
    const { category, heroId, secondaryHeroId } = useParams();
    const [matchup, setMatchup] = useState(null);
    const location = useLocation();
    useEffect(() => {
        async function getHeroes() {
            const matchup = await getMatchup({ table_id: category, main_hero_id: heroId, secondary_hero_id: secondaryHeroId });
            setMatchup(matchup);
        }
        getHeroes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])
    // eslint-disable-next-line eqeqeq 
    const hero = HEROES.find(hero => hero.id == secondaryHeroId);
    function formatCategoryId(category) {
        return category.split('_').join(' ')
    }
    return (
        <div className="hero-matchup-view-layout">
            <h2>{formatCategoryId(category)}</h2>
            <div className="preview">
                <HeroPreview heroId={hero.id} img={hero.img} name={hero.localized_name} />
            </div>
            <Description category={category} heroId={heroId} secondaryHeroId={secondaryHeroId} description={matchup?.description} isEditable={user} />
        </div>
    )
}

export default HeroMatchupViewLayout;