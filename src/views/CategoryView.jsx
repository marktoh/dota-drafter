import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import HeroPreview from '../components/HeroPreview';

import './CategoryView.css';

function CategoryView({ title, table_id, main_hero_id, getFn, onClick, isEditable }) {
    const [pairings, setPairings] = useState(null);
    async function getPairings() {
        const data = await getFn({ table_id, main_hero_id });
        setPairings(data);
    }
    useEffect(() => {
        getPairings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="category">
            <div className="title">
                <h2>{title}</h2>
                {isEditable ? <Link to={`edit/${table_id}`} className="edit-btn">Edit</Link> : null}
            </div>
            <div className="content">
                <div className="pairings">
                    {pairings?.length > 0 ? 
                    pairings?.map(pairing => <HeroPreview key={pairing?.secondary_hero_id} heroId={pairing?.secondary_hero_id} img={pairing?.secondary_hero_img} name={pairing?.secondary_hero_name} onClickFn={onClick} />)
                    :
                    <p className="empty-category-message">No heroes found</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryView;