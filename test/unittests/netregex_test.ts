import { assert } from 'chai';

import NetRegexes from '../../resources/netregexes';
import regexCaptureTest, { RegexUtilParams } from '../helper/regex_util';

// TODO: add tests for the other (missing) netregexes

describe('netregex tests', () => {
  it('startsUsing', () => {
    const lines = [
      '20|2020-03-18T09:39:40.5230000-07:00|106E0DB3|Potato Chippy|1D3F|Midare Setsugekka|40000284|Green Dragon|1.53|-389.807|224.858|238.695|-3.132169||ff0eb93ae3714f3e520b871c3d72cfee',
      '20|2018-09-18T20:40:06.9110000-07:00|400069FE|The Manipulator|F5C|Mortal Revolution|400069FE|The Manipulator|5.70|120.789|-90.37|0|1.872||a1e83a963cea8bb7f1dff1bbae7d6fd6',
      '20|2020-03-18T09:35:50.6220000-07:00|103D4280|Tini Poutini|8B|Holy|103D4280|Tini Poutini|2.28|-80|92.3|0.01|-2.7113||a0117bf7bdb350d53ad3dfae117caca9',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.startsUsing(params), lines);

    const matches = lines[0].match(NetRegexes.startsUsing())?.groups;
    assert.equal(matches?.type, '20');
    assert.equal(matches?.sourceId, '106E0DB3');
    assert.equal(matches?.source, 'Potato Chippy');
    assert.equal(matches?.id, '1D3F');
    assert.equal(matches?.ability, 'Midare Setsugekka');
    assert.equal(matches?.targetId, '40000284');
    assert.equal(matches?.target, 'Green Dragon');
    assert.equal(matches?.castTime, '1.53');
    assert.equal(matches?.x, '-389.807');
    assert.equal(matches?.y, '224.858');
    assert.equal(matches?.z, '238.695');
    assert.equal(matches?.heading, '-3.132169');
  });
  it('ability', () => {
    const lines = [
      '21|2020-02-25T01:47:57.4860000-08:00|105D4D8B|Potato Chippy|4095|Glare|4000DA74|Shiva|750003|50960000|1B|40958000|0|0|0|0|0|0|0|0|0|0|0|0|28583118|72360160|10000|0|0|1000|98.83264|99.83972|0|2.967196|101344|103650|5788|0|0|1000|99.19885|104.4785|0|-3.057414|0001073F|0|1|5b77b8e553b0ee5797caa1ab87b5a910',
      '22|2020-02-25T01:48:08.2910000-08:00|1067CDB0|Tiny Poutini|3F40|Double Standard Finish|1067CDB0|Tiny Poutini|50E|71D0000|E|7370000|0|0|0|0|0|0|0|0|0|0|0|0|111584|111584|6400|0|0|1000|99.59558|93.36987|0|0.005704641|111584|111584|6400|0|0|1000|99.59558|93.36987|0|0.005704641|000107FF|1|2|008aa08c35da1e426c6a06b366f40eb6',
      '21|2020-02-25T01:48:16.8170000-08:00|4000DA82|Shiva|4D9A|Akh Rhai|E0000000||0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|||||||||||44|44|0|0|0|1000|100.6942|95.20997|0|0.01299095|00010877|0|0|1ea68a0cb73843c7bb51808eeb8e80f8',
    ] as const;

    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.ability(params), lines);

    const matches = lines[0].match(NetRegexes.ability())?.groups;
    assert.equal(matches?.type, '21');
    assert.equal(matches?.sourceId, '105D4D8B');
    assert.equal(matches?.source, 'Potato Chippy');
    assert.equal(matches?.id, '4095');
    assert.equal(matches?.ability, 'Glare');
    assert.equal(matches?.targetId, '4000DA74');
    assert.equal(matches?.target, 'Shiva');
    assert.equal(matches?.flags, '750003');
    assert.equal(matches?.x, '99.19885');
    assert.equal(matches?.y, '104.4785');
    assert.equal(matches?.z, '0');
    assert.equal(matches?.heading, '-3.057414');

    /* eslint-disable-next-line deprecation/deprecation */
    assert.equal(NetRegexes.ability().source, NetRegexes.abilityFull().source);
  });
  it('networkDoT', () => {
    const lines = [
      '24|2022-07-07T21:59:30.6210000-07:00|105C4F8B|Tini Poutini|DoT|3C0|9920|32134|63300|10000|10000|||90.44|87.60|0.00|-3.07|4000F123|Shikigami of the Pyre|5|7328307|7439000|10000|10000|||99.78|104.81|0.00|2.95|549a72f2e53a9dea',
      '24|2023-07-05T20:05:54.6070000-07:00|10FF0006|French Fry|HoT|0|2824|91002|91002|10000|10000|||97.46|101.98|0.00|3.13|10FF0007|Mimite Mite|0|81541|81541|9600|10000|||100.04|110.55|0.00|-3.08|1ea68a0cb73843c7bb51808eeb8e80f8',
      '24|2023-07-05T20:05:55.9400000-07:00|4001AAAF|Pandæmonium|DoT|0|1D1B|43502881|43656896|10000|10000|||100.00|65.00|0.00|0.00|10FF0003|Papas Fritas|FFFFFFFF|77094|77094|9200|10000|||100.16|99.85|0.00|-2.84|5b77b8e553b0ee5797caa1ab87b5a910',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.networkDoT(params), lines);

    const matches = lines[0].match(NetRegexes.networkDoT())?.groups;
    assert.equal(matches?.id, '105C4F8B');
    assert.equal(matches?.name, 'Tini Poutini');
    assert.equal(matches?.which, 'DoT');
    assert.equal(matches?.effectId, '3C0');
    assert.equal(matches?.damage, '9920');
    assert.equal(matches?.currentHp, '32134');
    assert.equal(matches?.maxHp, '63300');
    assert.equal(matches?.x, '90.44');
    assert.equal(matches?.y, '87.60');
    assert.equal(matches?.z, '0.00');
    assert.equal(matches?.heading, '-3.07');
    assert.equal(matches?.sourceId, '4000F123');
    assert.equal(matches?.source, 'Shikigami of the Pyre');
    assert.equal(matches?.damageType, '5');
    assert.equal(matches?.sourceCurrentHp, '7328307');
    assert.equal(matches?.sourceMaxHp, '7439000');
    assert.equal(matches?.sourceCurrentMp, '10000');
    assert.equal(matches?.sourceMaxMp, '10000');
    assert.equal(matches?.sourceX, '99.78');
    assert.equal(matches?.sourceY, '104.81');
    assert.equal(matches?.sourceZ, '0.00');
    assert.equal(matches?.sourceHeading, '2.95');
  });
  it('headMarker', () => {
    const lines = [
      '27|2020-02-24T21:51:06.0270000-08:00|107C73B8|Aloo Gobi|0000|5DC3|00C0|0000|0000|0000||fc68ff4de5f5779534fa44927c0c124f',
      '27|2020-02-25T12:14:44.0480000-08:00|10595B8B|Baked Potato|0000|0000|0017|0000|0000|0000||2cf15f84ff6e9050b97e40660eefe35f',
      '27|2020-02-25T12:14:44.0480000-08:00|102D9908|Au Gratin|0000|0000|0005|0000|0000|0000||2cf15f84ff6e9050b97e40660eefe35f',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.headMarker(params), lines);

    const matches = lines[0].match(NetRegexes.headMarker())?.groups;
    assert.equal(matches?.type, '27');
    assert.equal(matches?.targetId, '107C73B8');
    assert.equal(matches?.target, 'Aloo Gobi');
    assert.equal(matches?.id, '00C0');
  });
  it('addedCombatant', () => {
    // NOTE: these lines don't capitalize hex, like other lines??
    const lines = [
      '03|2020-02-25T01:49:03.2240000-08:00|1059c805|Potato Chippy|1b|50|0|49|Balmung|0|0|91234|98567|10000|0|0|0|-103.6335|13.72225|18.00033|2.118315||7341f2b67a2032c70483078501ec8dc5',
      '03|2020-02-24T10:01:07.4190000-08:00|400264f6|Earthen Aether|0|50|0|0||9321|11632|148000|148000|10000|0|0|0|90.73911|97.41268|7.152557E-07|-4.792213E-05||9460a4497276aeab140b6c36de87ebbd',
      '03|2020-02-25T00:56:34.2610000-08:00|4000d2dc|Eos|0|50|10696f5f|0||1398|1008|96534|96534|10000|0|0|0|101.266|114.659|0|-4.792213E-05||b7fe3042f22622325af486c0f9c7438b',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.addedCombatant(params), lines);
    /* eslint-disable-next-line deprecation/deprecation */
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.addedCombatantFull(params), lines);

    /* eslint-disable-next-line deprecation/deprecation */
    assert.equal(NetRegexes.addedCombatant().source, NetRegexes.addedCombatantFull().source);

    let matches = lines[0].match(NetRegexes.addedCombatant())?.groups;
    assert.equal(matches?.type, '03');
    assert.equal(matches?.id, '1059c805');
    assert.equal(matches?.name, 'Potato Chippy');

    matches = lines[0].match(NetRegexes.addedCombatant())?.groups;
    assert.equal(matches?.type, '03');
    assert.equal(matches?.id, '1059c805');
    assert.equal(matches?.name, 'Potato Chippy');
    assert.equal(matches?.job, '1b');
    assert.equal(matches?.level, '50');
    assert.equal(matches?.world, 'Balmung');
    assert.equal(matches?.npcNameId, '0');
    assert.equal(matches?.npcBaseId, '0');
    assert.equal(matches?.hp, '98567');
    assert.equal(matches?.x, '-103.6335');
    assert.equal(matches?.y, '13.72225');
    assert.equal(matches?.z, '18.00033');
    assert.equal(matches?.heading, '2.118315');

    matches = lines[1].match(NetRegexes.addedCombatant())?.groups;
    assert.equal(matches?.type, '03');
    assert.equal(matches?.name, 'Earthen Aether');
    assert.equal(matches?.npcNameId, '9321');
    assert.equal(matches?.npcBaseId, '11632');
  });
  it('removingCombatant', () => {
    // NOTE: these lines don't capitalize hex, like other lines??
    const lines = [
      '04|2020-02-24T17:43:13.2330000-08:00|106da5c0|Tini Poutini|16|50|0|49|Balmung|0|0|81234|85349|10000|0|0|0|-47.33836|30.6029|84.19505|-0.4369516||2bf363ca9ba965e27326e4d7a19dd496',
      '04|2020-02-24T09:54:18.4450000-08:00|400263e6|Eos|0|50|10696f5f|0||1398|1008|0|0|0|0|0|0|99.71765|100.2975|0|2.712743||1adce9f3da74fab90640fde2184b6d21',
      '04|2020-02-24T17:49:24.6160000-08:00|e0000000|Shiva|0|0|0|0||9353|11627|0|0|0|0|0|0|99.99231|99.6261|-2.384186E-07|-0.009347916||46581fd9755c874575841f46b746a1c2',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.removingCombatant(params), lines);

    const matches = lines[0].match(NetRegexes.removingCombatant())?.groups;
    assert.equal(matches?.type, '04');
    assert.equal(matches?.id, '106da5c0');
    assert.equal(matches?.name, 'Tini Poutini');
    assert.equal(matches?.hp, '85349');
  });
  it('gainsEffect', () => {
    const lines = [
      '26|2020-02-24T10:07:55.6600000-08:00|312|Battle Litany|20.00|10679611|Papas Fritas|105D3F8B|Potato Casserole|00|103650|110101||9b404456c822ce3ce25e61ea838a9c4c',
      '26|2020-04-24T10:00:03.1370000-08:00|8d1|Lightsteeped|39.95|E0000000||105C4F8B|Tini Poutini|01|103650|||ba7a8b1ffce9f0f57974de250e9da307',
      '26|2019-09-12T13:00:25.1660000-08:00|130|Aetherflow|9999.00|10697A5F|Potato Chippy|10697A5F|Potato Chippy|02|101484|101484||5fe5a884cb777a95b14f5faf713d3e28',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.gainsEffect(params), lines);

    let matches = lines[0].match(NetRegexes.gainsEffect())?.groups;
    assert.equal(matches?.type, '26');
    assert.equal(matches?.effectId, '312');
    assert.equal(matches?.effect, 'Battle Litany');
    assert.equal(matches?.duration, '20.00');
    assert.equal(matches?.sourceId, '10679611');
    assert.equal(matches?.source, 'Papas Fritas');
    assert.equal(matches?.targetId, '105D3F8B');
    assert.equal(matches?.target, 'Potato Casserole');
    assert.equal(matches?.count, '00');

    matches = lines[1].match(NetRegexes.gainsEffect())?.groups;
    assert.equal(matches?.effectId, '8d1');
    assert.equal(matches?.effect, 'Lightsteeped');
    assert.equal(matches?.count, '01');
  });
  it('statusEffectExplicit', () => {
    const lines = [
      '38|2020-02-24T10:07:55.6600000-08:00|1065DD71|Potato Chippy|50505025|151776|158307|10000|10000|0|0|100.0197|97.94747|-0.002214196|3.082437|1|2|3|0A016D|41F00000|E0000000|0729|0|1064DE71|28C30030|449440B2|1064DE71|0312|419E9168|1065DD71|9E|412C24DE|105D4D8B|0778|409D26E9|105D4D8B||f99cf2ffd5dcb87b8506fad2e878eb41',
      '38|2020-02-24T10:07:55.9290000-08:00|40026539|Emerald Carbuncle|00505000|96490|96490|10000|10000|0|0|100.0839|102.2507|2.384186E-07|3.141401|10|0|0|28E50030|44C150A0|1059B805|02D7|41868504|10636895|0312|419FA3D7|10668611||ce23c777d53cf84e18bedda4aaa062f3',
      '38|2020-02-24T10:07:56.7780000-08:00|40026521|Shiva|00505000|72017170|72360160|10000|10000|0|0|100.0839|99.25989|0|-3.12817|0|0|0|04BE|41D41EB1|1059B806|04BF|41D41EB1|1059B806|074F|41DB9DAC|105C4E8B|0767|41E26A7A|10696F5F|F6|41837CE9|105C4E8B||8d5c910018f649981eda9a256fc5f028',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.statusEffectExplicit(params), lines);

    const matches = lines[0].match(NetRegexes.statusEffectExplicit())?.groups;
    assert.equal(matches?.type, '38');
    assert.equal(matches?.targetId, '1065DD71');
    assert.equal(matches?.target, 'Potato Chippy');
    assert.equal(matches?.hp, '151776');
    assert.equal(matches?.maxHp, '158307');
    assert.equal(matches?.x, '100.0197');
    assert.equal(matches?.y, '97.94747');
    assert.equal(matches?.z, '-0.002214196');
    assert.equal(matches?.heading, '3.082437');
    assert.equal(matches?.data0, '1');
    assert.equal(matches?.data1, '2');
    assert.equal(matches?.data2, '3');
  });
  it('losesEffect', () => {
    const lines = [
      '30|2020-02-24T10:08:00.8850000-08:00|323|Enhanced Wheeling Thrust|0.00|106AF611|Tini Poutini|106AF611|Tini Poutini|00|110101|110101||881aea4c3b845c7441536958ea92c421',
      '30|2020-02-24T10:21:51.8200000-08:00|8d1|Lightsteeped|0.00|E0000000||106AF612|Potato Chippy|01|101418|||6cac396c3ac1e144d5d2b1270dd5198e',
      '30|2020-02-24T10:23:40.2610000-08:00|49e|Meditative Brotherhood|0.00|106AF612|Potato Chippy|106AF611|Tini Poutini|00|110191|113284||f8668b58ee7442746a5d131eff6df27f',
      '30|2020-02-24T10:11:47.6170000-08:00|8d7|Shock Spikes|0.00|4002666E|Electric Aether|4002666E|Electric Aether|64|81400|81400||3e66ff368998f3a3f365fc85ff9e449a',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.losesEffect(params), lines);

    let matches = lines[0].match(NetRegexes.losesEffect())?.groups;
    assert.equal(matches?.type, '30');
    assert.equal(matches?.effectId, '323');
    assert.equal(matches?.effect, 'Enhanced Wheeling Thrust');
    assert.equal(matches?.sourceId, '106AF611');
    assert.equal(matches?.source, 'Tini Poutini');
    assert.equal(matches?.targetId, '106AF611');
    assert.equal(matches?.target, 'Tini Poutini');
    assert.equal(matches?.count, '00');

    matches = lines[1].match(NetRegexes.losesEffect())?.groups;
    assert.equal(matches?.type, '30');
    assert.equal(matches?.effectId, '8d1');
    assert.equal(matches?.effect, 'Lightsteeped');
    assert.equal(matches?.count, '01');

    matches = lines[2].match(NetRegexes.losesEffect())?.groups;
    assert.equal(matches?.type, '30');
    assert.equal(matches?.effectId, '49e');
    assert.equal(matches?.effect, 'Meditative Brotherhood');
    assert.equal(matches?.sourceId, '106AF612');
    assert.equal(matches?.source, 'Potato Chippy');
    assert.equal(matches?.targetId, '106AF611');
    assert.equal(matches?.target, 'Tini Poutini');
  });
  it('tether', () => {
    const lines = [
      '35|2020-02-24T10:23:44.5060000-08:00|40026738|Luminous Aether|400266A5|Mothercrystal|0000|0000|0054|400266A5|000F|7F20||da2cc1778e3fe34deeec4d5f681fd7cd',
      '35|2020-02-24T10:28:12.7280000-08:00|106AF612|Potato Chippy|106AF611|Tini Poutini|0000|0000|006E|10657611|000F|0000||28cffed1da761d34d8a5436784cbf49b',
      '35|2020-03-18T09:41:49.8700000-07:00|400002A9|Clockwork Wright|101BC93E|Potato Casserole|70DF|0000|0016|101B283E|000F|7FE4||6a73d966fcbee31cd3afcec426de25a6',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.tether(params), lines);

    const matches = lines[0].match(NetRegexes.tether())?.groups;
    assert.equal(matches?.type, '35');
    assert.equal(matches?.sourceId, '40026738');
    assert.equal(matches?.source, 'Luminous Aether');
    assert.equal(matches?.targetId, '400266A5');
    assert.equal(matches?.target, 'Mothercrystal');
    assert.equal(matches?.id, '0054');
  });
  it('wasDefeated', () => {
    const lines = [
      '25|2020-03-18T09:42:40.8350000-07:00|400002AB|Ovni|106AF612|Potato Chippy||15ea472b709b0f25b15a58f1bd36b990',
      '25|2020-03-18T09:45:03.4590000-07:00|400002D9|Ice Cage|E0000000|||1d1f7f83506abb48dd70fbcee8886b4e',
      '25|2020-03-18T20:40:15.6840000-07:00|106AF611|Tini Poutini|400069FE|The Manipulator||5b29fc75e96e9778bf74fdd4470e2a0c',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.wasDefeated(params), lines);

    const matches = lines[0].match(NetRegexes.wasDefeated())?.groups;
    assert.equal(matches?.type, '25');
    assert.equal(matches?.targetId, '400002AB');
    assert.equal(matches?.target, 'Ovni');
    assert.equal(matches?.sourceId, '106AF612');
    assert.equal(matches?.source, 'Potato Chippy');
  });
  it('gameLog', () => {
    const echoLines = [
      '00|2020-02-26T18:59:23.0000000-08:00|0038||cactbot wipe|77364412c17033eb8c87dafe7ce3c665',
      '00|2019-03-25T19:04:42.0000000-07:00|0038||end|8180b401b5e83eac9b8a29ed3c97068c',
      '00|2020-10-03T07:44:26.0000000-08:00|0038||<se.1>|edc9e1601137eee35ca158620fd3271a',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.echo(params), echoLines);

    let matches = echoLines[0].match(NetRegexes.echo())?.groups;
    assert.equal(matches?.line, 'cactbot wipe');

    const dialogLines = [
      '00|2020-04-10T21:23:23.0000000-07:00|0044|Rhitahtyn sas Arvina|My shields are impregnable! Join the countless challengers who have dashed themselves against them!|a3db6d5ca3dac3d2eb06bced34c9f587',
      '00|2020-03-18T19:32:22.0000000-07:00|0044|2P|It\'s too quiet.|a21773420eb4d16ad73f0f56f8b24b7c',
      '00|2020-03-29T15:44:53.0000000-07:00|0044|Lamebrix Strikebocks|Pssshkoh... Lamebrix will flatten uplanders like crawlybug!|bf9a20b3704b1bf29543735ace02fbd',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.dialog(params), dialogLines);

    matches = dialogLines[0].match(NetRegexes.dialog())?.groups;
    assert.equal(matches?.type, '00');
    assert.equal(matches?.name, 'Rhitahtyn sas Arvina');
    assert.equal(
      matches?.line,
      'My shields are impregnable! Join the countless challengers who have dashed themselves against them!',
    );

    const namedLines = [
      '00|2020-03-10T18:29:02.0000000-07:00|001d|Tini Poutini|Tini Poutini straightens her spectacles for you.|05ca458b4d400d1f878d3c420f962b99',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.gameNameLog(params), namedLines);
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.gameNameLog(params), dialogLines);

    matches = namedLines[0].match(NetRegexes.gameNameLog())?.groups;
    assert.equal(matches?.type, '00');
    assert.equal(matches?.code, '001d');
    assert.equal(matches?.name, 'Tini Poutini');
    assert.equal(matches?.line, 'Tini Poutini straightens her spectacles for you.');

    const messageLines = [
      '00|2020-03-27T18:50:50.0000000-07:00|0839||The Cranial Plate is no longer sealed!|66d37b7d4a64272e607993ba33bfbe10',
      '00|2020-04-10T18:47:10.0000000-07:00|0839||One or more party members completed this duty for the first time. A bonus has been awarded to all members.|d3f328d72cbd12a78b631f886acfb1bf',
      '00|2020-03-27T17:25:30.0000000-07:00|0839||The rook autoturret withdraws from the battlefield.|be06a6321601981c48c7299bcf6029a7',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.message(params), messageLines);

    matches = messageLines[0].match(NetRegexes.message())?.groups;
    assert.equal(matches?.type, '00');
    assert.equal(matches?.line, 'The Cranial Plate is no longer sealed!');

    const allLines = [
      ...echoLines,
      ...dialogLines,
      ...messageLines,
      ...namedLines,
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.gameLog(params), allLines);
  });
  it('statchange', () => {
    const lines = [
      '12|2020-03-18T20:40:30.0380000-07:00|19|3888|324|4292|207|343|340|3888|1600|3158|206|341|1868|902|380|0|853|400023BCF31276|45c4bb87c4e26bb1f1e85c0df980fca6',
      '12|2020-02-25T01:43:47.6620000-08:00|27|321|360|4720|5108|284|340|321|2832|3556|5108|284|1158|380|1990|0|380|400023BCF31276|9da93db71ca9bf64c28c912d112e7907',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.statChange(params), lines);

    const matches = lines[0].match(NetRegexes.statChange())?.groups;
    assert.equal(matches?.type, '12');
    assert.equal(matches?.job, '19');
    assert.equal(matches?.strength, '3888');
    assert.equal(matches?.dexterity, '324');
    assert.equal(matches?.vitality, '4292');
    assert.equal(matches?.intelligence, '207');
    assert.equal(matches?.mind, '343');
    assert.equal(matches?.piety, '340');
    assert.equal(matches?.attackPower, '3888');
    assert.equal(matches?.directHit, '1600');
    assert.equal(matches?.criticalHit, '3158');
    assert.equal(matches?.attackMagicPotency, '206');
    assert.equal(matches?.healMagicPotency, '341');
    assert.equal(matches?.determination, '1868');
    assert.equal(matches?.skillSpeed, '902');
    assert.equal(matches?.spellSpeed, '380');
    assert.equal(matches?.tenacity, '853');
    assert.equal(matches?.localContentId, '400023BCF31276');
  });
  it('changeZone', () => {
    const lines = [
      '01|2020-03-18T09:34:12.6510000-07:00|174|Syrcus Tower|083c096742072c6d958763461f9d7e56',
      '01|2020-03-18T10:58:29.5420000-07:00|153|Mist|63f727bd97d0a7e75ad169e570b34cf8',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.changeZone(params), lines);

    const matches = lines[0].match(NetRegexes.changeZone())?.groups;
    assert.equal(matches?.type, '01');
    assert.equal(matches?.id, '174');
    assert.equal(matches?.name, 'Syrcus Tower');
  });
  it('network6D', () => {
    const lines = [
      '33|2020-05-13T19:57:07.1320000-07:00|80034E37|4000000F|A91|01|02|03|2f54812b15aac21ba1c2f22b477023a9',
      '33|2020-03-10T18:19:59.4560000-07:00|80030049|80000001|2EC|00|00|00|1d4cd6ed286bc0a563c2508d4488dc75',
      '33|2020-03-10T23:57:06.1520000-04:00|8003758C|40000001|1518|00|00|00|b0a350a0c04f38c03cb040655e901705',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.network6d(params), lines);

    const matches = lines[0].match(NetRegexes.network6d())?.groups;
    assert.equal(matches?.type, '33');
    assert.equal(matches?.instance, '80034E37');
    assert.equal(matches?.command, '4000000F');
    assert.equal(matches?.data0, 'A91');
    assert.equal(matches?.data1, '01');
    assert.equal(matches?.data2, '02');
    assert.equal(matches?.data3, '03');
  });
  it('nameToggle', () => {
    const lines = [
      '34|2021-04-07T17:08:58.8340000-07:00|40003C60|Elemental Converter|40003C60|Elemental Converter|01|aa4fe93dfa73e9ca1716c02315be9d61',
      '34|2021-04-07T17:09:05.3710000-07:00|40003CC6|Leviathan|40003CC6|Leviathan|00|167af73afc1917048b80c604f41613ea',
      '34|2021-04-07T17:29:34.7710000-07:00|106AF611|Tini Poutini|106AF611|Tini Poutini|00|3cc6808d5c196c8421d9d8bf5329bc71',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.nameToggle(params), lines);

    const matches = lines[0].match(NetRegexes.nameToggle())?.groups;
    assert.equal(matches?.type, '34');
    assert.equal(matches?.id, '40003C60');
    assert.equal(matches?.name, 'Elemental Converter');
    assert.equal(matches?.toggle, '01');
  });
  it('map', () => {
    const lines = [
      '40|2021-07-30T19:43:08.6270000-07:00|578|Norvrandt|The Copied Factory|Upper Stratum|ee5b5fc06ab4610ef6b4f030fc95c90c',
      '40|2021-07-30T19:46:49.3830000-07:00|575|Norvrandt|Excavation Tunnels||41e6dae1ab1a3fe18ce3754d7c45a5d0',
      '40|2021-07-30T19:49:19.8180000-07:00|192|La Noscea|Mist|Mist Subdivision|f3506f063945500b5e7df2172e2ca4d3',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.map(params), lines);

    const matches = lines[0].match(NetRegexes.map())?.groups;
    assert.equal(matches?.type, '40');
    assert.equal(matches?.id, '578');
    assert.equal(matches?.regionName, 'Norvrandt');
    assert.equal(matches?.placeName, 'The Copied Factory');
    assert.equal(matches?.placeNameSub, 'Upper Stratum');
  });
  it('systemLogMessage', () => {
    const lines = [
      '41|2021-11-21T10:38:40.0660000-08:00|00|901|619A9200|00|3C|c6fcd8a8b198a5da28b9cfe6a3f544f4',
      '41|2021-11-21T10:50:13.5650000-08:00|8004001E|7DD|FF5FDA02|E1B|00|4eeb89399fce54820eb19e06b4d6d95a',
      '41|2021-11-21T10:55:06.7070000-08:00|8004001E|B3A|00|00|E0000000|1f600f85ec8d36d2b04d233e19f93d39',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.systemLogMessage(params), lines);

    const matches = lines[1].match(NetRegexes.systemLogMessage())?.groups;
    assert.equal(matches?.type, '41');
    assert.equal(matches?.instance, '8004001E');
    assert.equal(matches?.id, '7DD');
    assert.equal(matches?.param0, 'FF5FDA02');
    assert.equal(matches?.param1, 'E1B');
    assert.equal(matches?.param2, '00');
  });
  it('combatantMemory', () => {
    const lines = [
      '261|2023-05-26T21:37:40.5600000-04:00|Add|40008953|BNpcID|3F5A|BNpcNameID|304E|CastTargetID|E0000000|CurrentMP|10000|CurrentWorldID|65535|Heading|-3.1416|Level|90|MaxHP|69200|MaxMP|10000|ModelStatus|18432|Name|Golbez\'s Shadow|NPCTargetID|E0000000|PosX|100.0000|PosY|100.0000|PosZ|0.0300|Radius|7.5000|Type|2|WorldID|65535|9d9028a8e087e4c3',
      '261|2023-05-26T21:39:41.2920000-04:00|Change|10001234|CurrentMP|2400|Heading|-2.3613|2f5ff0a91385050a',
      '261|2023-05-26T21:39:42.7380000-04:00|Remove|40008AA0|f4b30f181245b5da',
    ] as const;
    // TODO: regexCaptureTest doesn't handle the repeating fields well,
    // so don't run it for this test
    const matches = lines[0].match(NetRegexes.combatantMemory())?.groups;
    assert.equal(matches?.pairBNpcID, '3F5A');
    assert.equal(matches?.pairBNpcNameID, '304E');
    assert.equal(matches?.pairCastTargetID, 'E0000000');
    assert.equal(matches?.pairCurrentMP, '10000');
    assert.equal(matches?.pairCurrentWorldID, '65535');
    assert.equal(matches?.pairHeading, '-3.1416');
    assert.equal(matches?.pairLevel, '90');
    assert.equal(matches?.pairMaxHP, '69200');
    assert.equal(matches?.pairMaxMP, '10000');
    assert.equal(matches?.pairModelStatus, '18432');
    assert.equal(matches?.pairName, 'Golbez\'s Shadow');
    assert.equal(matches?.pairNPCTargetID, 'E0000000');
    assert.equal(matches?.pairPosX, '100.0000');
    assert.equal(matches?.pairPosY, '100.0000');
    assert.equal(matches?.pairPosZ, '0.0300');
    assert.equal(matches?.pairRadius, '7.5000');
    assert.equal(matches?.pairType, '2');
    assert.equal(matches?.pairWorldID, '65535');
  });
  it('npcYell', () => {
    const lines = [
      '266|2024-02-29T15:15:40.5850000-08:00|4001F001|02D2|07AF|8f731e1760bdcfc9',
      '266|2024-02-29T15:15:54.5570000-08:00|4001F002|02D4|07BE|ae0674ec1e496642',
      '266|2024-02-25T16:02:15.0300000-05:00|E0000000|6B10|2B29|65aa9c0faa3d0e16',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.npcYell(params), lines);

    const matches = lines[0].match(NetRegexes.npcYell())?.groups;
    assert.equal(matches?.type, '266');
    assert.equal(matches?.npcId, '4001F001');
    assert.equal(matches?.npcNameId, '02D2');
    assert.equal(matches?.npcYellId, '07AF');
  });
  it('battleTalk2', () => {
    const lines = [
      '267|2024-02-29T16:22:41.4210000-08:00|00000000|80034E2B|02CE|840C|5000|0|2|0|0|6f6ccb784c36e978',
      '267|2024-02-29T16:22:17.9230000-08:00|00000000|80034E2B|02D2|8411|7000|0|2|0|0|be1dee98cdcd67a4',
      '267|2024-02-29T16:23:00.6680000-08:00|4001FFC4|80034E2B|02D5|840F|3000|0|2|0|0|cffef89907b5345b',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.battleTalk2(params), lines);

    const matches = lines[0].match(NetRegexes.battleTalk2())?.groups;
    assert.equal(matches?.type, '267');
    assert.equal(matches?.npcId, '00000000');
    assert.equal(matches?.instance, '80034E2B');
    assert.equal(matches?.npcNameId, '02CE');
    assert.equal(matches?.instanceContentTextId, '840C');
    assert.equal(matches?.displayMs, '5000');
  });
  it('countdown', () => {
    const lines = [
      '268|2024-02-29T15:19:48.6250000-08:00|10FF0001|0036|13|00|Tini Poutini|0ab734bdbcb55902',
      '268|2024-02-29T15:34:16.4280000-08:00|10FF0002|0036|20|00|Potato Chippy|0ab734bdbcb55902',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.countdown(params), lines);

    const matches = lines[0].match(NetRegexes.countdown())?.groups;
    assert.equal(matches?.type, '268');
    assert.equal(matches?.id, '10FF0001');
    assert.equal(matches?.worldId, '0036');
    assert.equal(matches?.countdownTime, '13');
    assert.equal(matches?.result, '00');
    assert.equal(matches?.name, 'Tini Poutini');
  });
  it('countdownCancel', () => {
    const lines = [
      '269|2024-02-29T15:19:55.3490000-08:00|10FF0001|0036|Tini Poutini|e17efb9d120adea0',
      '269|2024-02-29T15:34:22.8940000-08:00|10FF0002|0036|Potato Chippy|e17efb9d120adea0',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.countdownCancel(params), lines);

    const matches = lines[0].match(NetRegexes.countdownCancel())?.groups;
    assert.equal(matches?.type, '269');
    assert.equal(matches?.id, '10FF0001');
    assert.equal(matches?.worldId, '0036');
    assert.equal(matches?.name, 'Tini Poutini');
  });
  it('actorMove', () => {
    const lines = [
      '270|2024-03-02T13:14:37.0430000-08:00|4000F1D3|-2.2034|0002|0014|102.0539|118.1982|0.2136|4601ae28c0b481d8',
      '270|2024-03-02T13:18:30.2960000-08:00|4000F44E|2.8366|0002|0014|98.2391|101.9623|0.2136|2eed500a1505cb03',
      '270|2024-03-02T13:18:30.6070000-08:00|4000F44E|-2.5710|0002|0014|98.2391|101.9318|0.2136|51bc63077eb489f3',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.actorMove(params), lines);

    const matches = lines[0].match(NetRegexes.actorMove())?.groups;
    assert.equal(matches?.type, '270');
    assert.equal(matches?.id, '4000F1D3');
    assert.equal(matches?.heading, '-2.2034');
    assert.equal(matches?.x, '102.0539');
    assert.equal(matches?.y, '118.1982');
    assert.equal(matches?.z, '0.2136');
  });
  it('actorSetPos', () => {
    const lines = [
      '271|2024-03-02T13:20:50.9620000-08:00|4000F3B7|-2.3563|00|00|116.2635|116.2635|0.0000|e3fa606a5d0b5d57',
      '271|2024-03-02T13:20:50.9620000-08:00|4000F3B5|-1.5709|00|00|107.0000|100.0000|0.0000|5630c8f4e2ffac77',
      '271|2024-03-02T13:20:50.9620000-08:00|4000F3BB|0.2617|00|00|97.4118|90.3407|0.0000|01d53a3800c6238f',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.actorSetPos(params), lines);

    const matches = lines[0].match(NetRegexes.actorSetPos())?.groups;
    assert.equal(matches?.type, '271');
    assert.equal(matches?.id, '4000F3B7');
    assert.equal(matches?.heading, '-2.3563');
    assert.equal(matches?.x, '116.2635');
    assert.equal(matches?.y, '116.2635');
    assert.equal(matches?.z, '0.0000');
  });
  it('spawnNpcExtra', () => {
    const lines = [
      '272|2024-03-02T15:45:44.2260000-05:00|4000226B|E0000000|0000|01|89d2d9b95839548f',
      '272|2024-03-02T15:45:44.2260000-05:00|4000226D|E0000000|0000|01|b5e6a59cc0b2c1f3',
      '272|2024-03-03T01:44:39.5570000-08:00|400838F4|E0000000|0000|00|32d8c0e768aeb0e7',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.spawnNpcExtra(params), lines);

    const matches = lines[0].match(NetRegexes.spawnNpcExtra())?.groups;
    assert.equal(matches?.type, '272');
    assert.equal(matches?.id, '4000226B');
    assert.equal(matches?.parentId, 'E0000000');
    assert.equal(matches?.tetherId, '0000');
    assert.equal(matches?.animationState, '01');
  });
  it('actorControlExtra', () => {
    const lines = [
      '273|2023-12-05T10:57:43.4770000-08:00|4000A145|003E|1|0|0|0|06e7eff4a949812c',
      '273|2023-12-05T10:58:00.3460000-08:00|4000A144|003E|1|1|0|0|a4af9f90928636a3',
      '273|2024-03-18T20:33:22.7130000-04:00|400058CA|0834|0|848|FA0|0|c862c35712ed4122',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.actorControlExtra(params), lines);

    const matches = lines[0].match(NetRegexes.actorControlExtra())?.groups;
    assert.equal(matches?.type, '273');
    assert.equal(matches?.id, '4000A145');
    assert.equal(matches?.category, '003E');
    assert.equal(matches?.param1, '1');
    assert.equal(matches?.param2, '0');
    assert.equal(matches?.param3, '0');
    assert.equal(matches?.param4, '0');
  });
  it('actorControlSelfExtra', () => {
    const lines = [
      '274|2024-01-10T19:28:37.5000000-05:00|10001234|020F|04D0|0|93E0|0|0|0|d274429622d0c27e',
      '274|2024-02-15T19:35:41.9950000-05:00|10001234|020F|236D|0|669|0|0|0|d274429622d0c27e',
      '274|2024-03-21T20:45:41.3680000-04:00|10001234|0210|129D|10001234|F|0|0|0|d274429622d0c27e',
    ] as const;
    regexCaptureTest((params?: RegexUtilParams) => NetRegexes.actorControlSelfExtra(params), lines);

    const matches = lines[0].match(NetRegexes.actorControlSelfExtra())?.groups;
    assert.equal(matches?.type, '274');
    assert.equal(matches?.id, '10001234');
    assert.equal(matches?.category, '020F');
    assert.equal(matches?.param1, '04D0');
    assert.equal(matches?.param2, '0');
    assert.equal(matches?.param3, '93E0');
    assert.equal(matches?.param4, '0');
    assert.equal(matches?.param5, '0');
    assert.equal(matches?.param6, '0');
  });
});
