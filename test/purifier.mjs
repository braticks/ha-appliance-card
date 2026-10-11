import { loadCard, markup } from './harness.mjs';
import assert from 'node:assert/strict';
const registry = await loadCard(new URL('../dist/ha-appliance-card.js', import.meta.url).pathname);
const Card = registry.get('ha-appliance-card');
for (const state of ['on', 'off', 'unavailable']) {
  const card = new Card();
  card.setConfig({type:'custom:ha-appliance-card',appliance_type:'air_purifier',state_entity:'fan.purifier',state_map:{on:'running',off:'idle'}});
  card.hass = {states:{'fan.purifier':{state,attributes:{friendly_name:'Purifier'}}},language:'en',config:{},callService:async()=>{}};
  const html = markup(card);
  assert.ok(html.includes('ap-body'));
  assert.ok(html.includes('ap-screen'));
  assert.equal(html.includes('class="machine spinning"'),state === 'on');
  card.disconnectedCallback();
}
console.log('Purifier on/off/unavailable renders pass');
