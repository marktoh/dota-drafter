import { useState } from "react";
import HeroPreview from "../components/HeroPreview";
import HEROES from "../mock/heroes.json";
import "./HeroesView.css";

/**
 * Formats the name of a given hero name.
 * Removes hyphens and transforms name to lowercase.
 *
 * @param {String} name Name of  a Hero
 * @returns A formatted hero name
 */
function formatName(name) {
  return name?.toLowerCase();
}

/**
 *
 * @param {Array} heroes A list of heroes from the OpenDota API
 * @param {*} searchInput A search query from the user
 * @returns
 */
function filter(heroes, searchInput) {
  if (searchInput?.length > 0) {
    heroes = heroes.filter((hero) =>
      formatName(hero?.localized_name)?.includes(formatName(searchInput)),
    );
  }
  return heroes;
}

/**
 *
 * @returns A message indicating that no results have been found.
 */
function EmptyResultMessage() {
  return <p className="empty-result-message">No heroes found</p>;
}
function Heroes({ heroes, searchInput, onClickFn }) {
  heroes = filter(heroes, searchInput);
  console.log(heroes);
  return heroes?.length > 0 ? (
    <div className="heroes-list">
      {heroes?.map((hero) => (
        <HeroPreview
          key={hero?.id}
          heroId={hero?.id}
          img={hero?.img}
          name={hero?.localized_name}
          onClickFn={onClickFn}
        />
      ))}
    </div>
  ) : (
    <EmptyResultMessage />
  );
}
function SearchBar({ value, onChange, handleSubmit }) {
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Look for a hero by name"
        autoFocus
      />
    </form>
  );
}
function HeroesView({ onClickFn }) {
  const [searchInput, setSearchInput] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const heroes = filter(HEROES, searchInput);
    if (heroes.length === 1) {
      onClickFn(heroes[0]?.id);
    }
  }
  return (
    <div className="heroes-view">
      <SearchBar
        value={searchInput}
        onChange={setSearchInput}
        handleSubmit={handleSubmit}
      />
      <Heroes heroes={HEROES} searchInput={searchInput} onClickFn={onClickFn} />
    </div>
  );
}

export default HeroesView;
