import { useState, useEffect } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';

import { upsertPairings } from '../api/pairings';

import './HeroMatchupEditView.css';

function TextInput({ category, heroId, secondaryHeroId, description }) {
    const [textInput, setTextInput] = useState(description);
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        await upsertPairings({ 
            table_id: category, 
            main_hero_id: heroId, 
            secondary_hero_id: secondaryHeroId, 
            description: textInput
        })
        navigate('..');
    }
    function handleKeyPress(e) {
        if (e.keyCode == 13 && e.ctrlKey || e.keyCode == 13 && e.metaKey) {
            handleSubmit(e);
        } else {
           setTextInput(e.target.value)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <textarea name="postContent" defaultValue={textInput} autoFocus onKeyDown={handleKeyPress} />
            <div className="action">
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

function HeroMatchupEditView() {
    const { category, heroId, secondaryHeroId } = useParams();
    const { description } = useOutletContext();
    return (
        <div className="hero-matchup-edit-view">
            <TextInput category={category} heroId={heroId} secondaryHeroId={secondaryHeroId} description={description} />
        </div>
    )
}

export default HeroMatchupEditView;