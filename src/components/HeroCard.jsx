import OpenDotaImage from "./OpenDotaImage";

import "./HeroCard.css";

function Property({ label, value }) {
  return (
    <div className="property">
      <span>{label}: </span>
      <span>
        <span>{value}</span>
      </span>
    </div>
  );
}

function HeroCard({ hero }) {
  return (
    <div className="hero">
      <div className="portrait">
        <OpenDotaImage path={hero.img} />
      </div>
      <div className="intro">
        <div className="title">
          <div className="name">
            <img src={`https://api.opendota.com${hero.icon}`} alt={hero.icon} />
            <div>{hero.localized_name}</div>
          </div>
          <div className="attribute">
            <div className="attack-type">{hero.attack_type}</div>
            <div
              className={`primary-attribute ${hero?.primary_attr?.toLowerCase()}`}
            >
              {hero.primary_attr}
            </div>
          </div>
        </div>
        <div className="roles">
          {hero.roles.map((role) => (
            <span className="role" key={role}>
              {role}
            </span>
          ))}
        </div>
      </div>
      <div className="properties">
        <div>
          <Property label="Base Health" value={hero.base_health} />
          <Property label="Base Health Regen" value={hero.base_health_regen} />
          <Property label="Base Mana" value={hero.base_mana} />
          <Property label="Base Regen" value={hero.base_mana_regen} />
          <Property label="Base Armor" value={hero.base_armor} />
          <Property label="Base Magic Resistance" value={hero.base_mr} />
          <Property label="Base Attack Min" value={hero.base_attack_min} />
          <Property label="Base Attack Max" value={hero.base_attack_max} />
          <Property label="Base Str" value={hero.base_str} />
          <Property label="Base Agi" value={hero.base_agi} />
          <Property label="Base Int" value={hero.base_int} />
          <Property label="Str Gain" value={hero.str_gain} />
          <Property label="Agi Gain" value={hero.agi_gain} />
          <Property label="Int Gain" value={hero.int_gain} />
        </div>
        <div>
          <Property label="Attack Range" value={hero.attack_range} />
          <Property label="Projectile Speed" value={hero.projectile_speed} />
          <Property label="Attack Rate" value={hero.attack_rate} />
          <Property label="Base Attack Time" value={hero.base_attack_time} />
          <Property label="Attack Point" value={hero.attack_point} />
          <Property label="Move Speed" value={hero.move_speed} />
          <Property label="Turn Rate" value={hero.turn_rate} />
          <Property label="CM Enabled" value={hero.cm_enabled ? "Yes" : "No"} />
          <Property label="Legs" value={hero.legs} />
          <Property label="Day Vision" value={hero.day_vision} />
          <Property label="Night Vision" value={hero.night_vision} />
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
