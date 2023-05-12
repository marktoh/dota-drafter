import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroesView from './HeroesView';

function HeroesBrowseView() {
    const navigate = useNavigate();
    function navigateToHeroView(id) {
        navigate(`/heroes/${id}`)
    }
    useEffect(() => {
        console.log(window.location.pathname, window.location.search);
    }, []);
    return (
        <HeroesView onClickFn={navigateToHeroView} />
    )
}

export default HeroesBrowseView;