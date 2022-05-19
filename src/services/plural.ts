const EXCEPTIONS = new Map([
    ['fish', 'fish'],
    ['sheep', 'sheep'],
    ['barracks', 'barracks'],
    ['foot', 'feet'],
    ['tooth', 'teeth'],
    ['goose', 'geese'],
    ['child', 'children'],
    ['man', 'men'],
    ['woman', 'women'],
    ['person', 'people'],
    ['mouse', 'mice'],
    ['addendum', 'addenda'],
    ['aircraft', 'aircraft'],
    ['alga', 'algae'],
    ['alumna', 'alumnae'],
    ['alumnus', 'alumni'],
    ['amoeba', 'amoebae'],
    ['analysis', 'analyses'],
    ['antenna', 'antennae'],
    ['antithesis', 'antitheses'],
    ['apex', 'apices'],
    ['appendix', 'appendices'],
    ['axis', 'axes'],
    ['bacillus', 'bacilli'],
    ['bacterium', 'bacteria'],
    ['basis', 'bases'],
    ['beau', 'beaux'],
    ['bison', 'bison'],
    ['bureau', 'bureaus'],
    ['cactus', 'cacti'],
    ['calf', 'calves'],
    ['chateau', 'chateaus'],
    ['cherub', 'cherubim'],
    ['codex', 'codices'],
    ['concerto', 'concerti'],
    ['corpus', 'corpora'],
    ['crisis', 'crises'],
    ['criterion', 'criteria'],
    ['curriculum', 'curricula'],
    ['datum', 'data'],
    ['deer', 'deer'],
    ['diagnosis', 'diagnoses'],
    ['die', 'dice'],
    ['dwarf', 'dwarfs'],
    ['echo', 'echoes'],
    ['elf', 'elves'],
    ['elk', 'elk'],
    ['ellipsis', 'ellipses'],
    ['embargo', 'embargoes'],
    ['emphasis', 'emphases'],
    ['erratum', 'errata'],
    ['faux pas', 'faux pas'],
    ['fez', 'fezes'],
    ['firmware', 'firmware'],
    ['focus', 'foci'],
    ['formula', 'formulae'],
    ['fungus', 'fungi'],
    ['gallows', 'gallows'],
    ['genus', 'genera'],
    ['graffito', 'graffiti'],
    ['grouse', 'grouse'],
    ['half', 'halves'],
    ['hero', 'heroes'],
    ['hoof', 'hooves'],
    ['hypothesis', 'hypotheses'],
    ['index', 'indices'],
    ['knife', 'knives'],
    ['larva', 'larvae'],
    ['leaf', 'leaves'],
    ['libretto', 'libretti'],
    ['life', 'lives'],
    ['loaf', 'loaves'],
    ['locus', 'loci'],
    ['louse', 'lice'],
    ['matrix', 'matrices'],
    ['means', 'means'],
    ['medium', 'media'],
    ['memorandum', 'memoranda'],
    ['minutia', 'minutiae'],
    ['moose', 'moose'],
    ['nebula', 'nebulae'],
    ['neurosis', 'neuroses'],
    ['news', 'news'],
    ['nucleus', 'nuclei'],
    ['oasis', 'oases'],
    ['offspring', 'offspring'],
    ['opus', 'opera'],
    ['ovum', 'ova'],
    ['ox', 'oxen'],
    ['paralysis', 'paralyses'],
    ['parenthesis', 'parentheses'],
    ['phenomenon', 'phenomena'],
    ['phylum', 'phyla'],
    ['potato', 'potatoes'],
    ['prognosis', 'prognoses'],
    ['quiz', 'quizzes'],
    ['radius', 'radii'],
    ['referendum', 'referenda'],
    ['salmon', 'salmon'],
    ['scarf', 'scarves'],
    ['self', 'selves'],
    ['series', 'series'],
    ['shelf', 'shelves'],
    ['shrimp', 'shrimp'],
    ['species', 'species'],
    ['stimulus', 'stimuli'],
    ['stratum', 'strata'],
    ['swine', 'swine'],
    ['syllabus', 'syllabi'],
    ['symposium', 'symposia'],
    ['synopsis', 'synopses'],
    ['synthesis', 'syntheses'],
    ['tableau', 'tableaus'],
    ['that', 'those'],
    ['thesis', 'theses'],
    ['this', 'these'],
    ['thief', 'thieves'],
    ['tomato', 'tomatoes'],
    ['trout', 'trout'],
    ['tuna', 'tuna'],
    ['vertebra', 'vertebrae'],
    ['vertex', 'vertices'],
    ['veto', 'vetoes'],
    ['vita', 'vitae'],
    ['vortex', 'vortices'],
    ['wharf', 'wharves'],
    ['wife', 'wives'],
    ['wolf', 'wolves'],
    // ['luggage', 'luggage'],
    // ['baggage', 'baggage'],
    // ['furniture', 'furniture'],
    // ['information', 'information'],
    // ['info', 'info'],
    // ['statistics', 'statistics'],
    // ['mathematics', 'mathematics'],
    // ['economics', 'economics'],
    // ['gymnastics', 'gymnastics'],
]);

export default function (string: string, num: number) {
    if (num === 1) {
        return string;
    }

    const e = EXCEPTIONS.get(string.toLowerCase());
    if (e) {
        if (string.substring(0, 1) < 'A') {
            // keep capitalization of the first letter
            return e.substring(0, 1) + e.substring(1);
        } else {
            return e;
        }
    }

    if (string.endsWith('s')) {
        return string;
    }

    if (string.endsWith('ch') || string.endsWith('x') || string.endsWith('s') || string.endsWith('z')) {
        return string + 'es';
    }

    if (string.endsWith('f')) {
        return string.substring(0, string.length - 1) + 'ves';
    }

    if (string.endsWith('fe')) {
        return string.substring(0, string.length - 2) + 'ves';
    }

    if (
        [
            'auto',
            'kangaroo',
            'kilo',
            'memo',
            'photo',
            'piano',
            'pimento',
            'pro',
            'solo',
            'soprano',
            'studio',
            'tattoo',
            'video',
            'zoo',
        ].indexOf(string) > -1
    ) {
        return string + 's';
    }

    if (string.endsWith('o')) {
        return string + 'es';
    }

    if (string.endsWith('ey') || string.endsWith('ay') || string.endsWith('oy') || string.endsWith('iy')) {
        return string + 's';
    }

    if (string.endsWith('y')) {
        return string.substring(0, string.length - 1) + 'ies';
    }

    return string + 's';
}
