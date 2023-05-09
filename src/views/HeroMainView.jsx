import { useParams, useNavigate } from "react-router-dom";

import CategoryView from './CategoryView';

import { getPairings } from '../api/pairings';

import './HeroMainView.css';

function HeroMainView() {
    const { heroId } = useParams();
    const navigate = useNavigate();
    function handleClick(table_id, id) {
        navigate(`${table_id}/${id}`)
    }
    return (
        <div className="hero-main-view">
            <CategoryView title="Countered By" table_id="countered_by" main_hero_id={heroId} getFn={getPairings} onClick={(id) => { handleClick('countered_by', id)}} />
            <CategoryView title="Soft Countered By" table_id="soft_countered_by" main_hero_id={heroId} getFn={getPairings} onClick={(id) => { handleClick('soft_countered_by', id)}} />
            <CategoryView title="Good With" table_id="good_with" main_hero_id={heroId} getFn={getPairings} onClick={(id) => { handleClick('good_with', id)}} />
            <CategoryView title="Good Against" table_id="good_against" main_hero_id={heroId} getFn={getPairings} onClick={(id) => { handleClick('good_against', id)}} />
        </div>
    )
}

export default HeroMainView;