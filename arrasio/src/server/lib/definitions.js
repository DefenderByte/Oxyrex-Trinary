// GUN DEFINITIONS
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        }
    });
    return {
        reload:     data[0],
        recoil:     data[1],
        shudder:    data[2], 
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
    
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here
    trap:               [39,    1,     0.25,   0.65,   1.05,   0.325,  1.05,   4.9,    1,      1.175,  1,      15,     3], // Used by Trapper Branch
    swarm:              [27,    0.25,  0.05,   0.4,    0.9,    0.235,  0.65,   3.5,    1,      1,      1.25,   5,      1.25], // Used by Cruiser Branch
    drone:              [68,    0.25,  0.1,    0.6,    5,      0.295,  0.96,   2.305,  1,      1,      1,      1,      1.1], // Used by Director Branch
    factory:            [72,    1,     0.1,    0.7,    2,      0.2,    1,      3,      1,      1,      1,      0.1,    1], // Used by Spawner Branch
    basic:              [18.25, 1.4,   0.1,    1,      2,      0.2,    1,      4.5,    1,      1,      1,      15,     1], // Default settings
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
        command:        [3,     1.5,   0.1,    1.25,   1,      0.75,   0.85,   1,      1,      1,      1,      1,      1],
        spam:           [1.1,   1,     1,      1,      1.1,    1,      0.9,    0.785,  1,      1,      1,      1,      1],      
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1],      
        single:         [1.1,   1,     1,      1,      1.05,   1.05,   1,      1.05,   1,      1,      1,      1,      1],  
    sniper:             [1.295, 1,     0.25,   1,      1,      1.05,   1,      1.2,    1.2,    1,      1.1,    0.25,   1.1],
        assassin:       [1.4,   1,     0.25,   1,      1,      1,      1,      1.1,    1.1,    1,      1.05,   0.5,    1.05],
            ranger:     [1.1,   1.1,   0.5,    1,      1.1,    1,      1,      1.075,  1.075,  1.05,   1,      5,      1],
            warden:     [1.1,   1.05,  0.5,    1,      1.05,   1,      1,      1.05,   1.05,   1,      1,      0.5,    1],
        rifle:          [0.85,  0.8,   1.5,    0.95,   0.9,    0.785,  0.9,    1.05,   1.05,   1,      0.9,    2.5,    0.9],
            pistol:     [0.8,   0.7,   1.75,   1,      0.95,   1,      0.95,   0.95,   0.95,   1,      0.9,    2.5,    0.9],
        snake:          [0.4,   1,     4,      1,      1.5,    0.9,    1.2,    0.2,    0.35,   1,      3,      6,      0.5],
            sidewind:   [1.5,   2,     1,      1,      1.6,    1,      1,      0.2,    0.6,    1,      1,      1,      1],  
            snake_skin: [0.6,   1,     2,      1,      0.5,    0.5,    1,      1,      0.2,    0.4,    1,      5,      1],
        hunter:         [1.5,   0.7,   1,      0.8,    0.9,    0.8,    1,      1.05,   0.8,    1,      1.2,    1,      1.15], 
            hunter2:    [1,     1,     1,      0.9,    0.85,   0.9,    1,      1,      1,      1,      0.9,    1,      1], 
            preda:      [1.3,   1,     1,      0.9,    1.35,   0.9,    1.2,    0.9,    0.9,    1,      1,      1,      1],   
    mach:               [0.45,  0.8,   1.7,    1,      0.75,   0.75,   0.95,   1,      0.82,   1,      1,      2.5,    1],
        blast:          [0.88,  1.25,  1.25,   1.05,   0.93,   1.07,   1.07,   0.8,    0.465,  0.65,   0.5,    1.5,    0.8], 
        chain:          [1.25,  1.33,  0.8,    1,      0.8,    1,      1,      1.25,   1.25,   1.1,    1.25,   0.5,    1.1], 
        mini:           [1.2,   0.6,   1,      0.8,    0.55,   0.55,   1,      1.315,  1,      1,      1,      0.6,    1.1], 
            stream:     [1.1,   0.6,   1,      1,      1,      0.65,   1,      1.24,   1,      1,      1,      1,      1],     
            smother:    [1.2,   1,     1.1,    1,      0.95,   0.95,   1,      1,      1,      1,      1,      0.9,    1],
            x_smother:  [1.325, 1,     0.9,    1,      0.95,   0.95,   1,      1.05,   1.1,    0.95,   1,      0.9,    1],
            barricade:  [0.475, 1,     1,      1,      0.9,    1.15,   0.9,    1.1,    1,      0.5,    1,      1,      1],
        sgun:           [9.2,   0.35,  1.1,    1.5,    1,      0.75,   0.72,   1.675,  0.62,   1,      1.2,    1.2,    1], 
    flank:              [1.04,  1.2,   1,      1,      1,      0.95,   0.9,    1,      0.875,  1,      1.2,    1,      1],
        tri:            [1,     0.9,   1,      1,      1,      0.95,   0.95,   0.8,    0.8,    0.6,    1,      1,      1],  
            tri_front:  [1,     0.2,   1,      1,      1,      1,      1.03,   1.3,    1.1,    1.5,    1,      1,      1],  
            thruster:   [1,     1.33,  2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
        auto: /*pure*/  [1.8,   0.75,  0.5,    0.8,    0.9,    0.725,  1.2,    1.1,    1,      0.8,    1.25,   1,      1.25],
            five:       [1.15,  1,     1,      1,      1,      0.9,    0.8,    1.05,   1.05,   1.1,    1.45,   1,      1],   
            seven:      [1.25,  0.9,   1,      1,      1,      1,      0.95,   1,      1,      1.05,   1.75,   1.1,    1],
            snipe3:     [1.85,  1,     0.25,   1.4,    1,      0.95,   0.95,   1,      1,      1,      2,      0.5,    1.3],   
            heavy3:     [0.95,  1,     1,      1,      1.1,    1,      1.1,    1,      1,      1,      1,      1,      1],
            giga3:      [1.25,  1.3,   1,      1.1,    0.9,    0.9,    0.9,    1,      0.95,   1,      1,      1,      1],
            boomer3:    [1.1,   1,     1,      1.25,   0.95,   0.95,   0.95,   1,      0.95,   1,      1,      1,      1],
        auto_turret:    [2.2,   0.3,   0.9,    1.125,  0.6,    0.255,  0.94,   1.6,    1.2,    1,      0.3,    0.75,   1.75],
            swarmdrive: [1.65,  1,     1,      1,      0.5,    0.4,    0.9,    1,      1,      1,      1,      1,      1],
            super_auto: [3.5,   0,     0.65,   0.9,    0.85,   0.75,   1.15,   1.1,    1.1,    0.875,  1.3,    1.1,    1.25],
            defend_auto:[1.25,  1,     1.1,    1,      1,      1,      1,      1.2,    1,      1.1,    1,      1.1,    1], // Used by Defender
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    pound:              [2.1,   1.75,  1,      1,      1.4,    1.6,    1.1,    0.85,   0.8,    1.15,   1.6,    1,      1.15], 
        destroy:        [2.25,  1.85,  0.5,    1,      1.72,   1.62,   1.2,    0.75,   0.575,  1,      1.6,    1,      3],
            anni:       [1,     1.2,   1,      1,      1,      1.2,    1,      1,      1,      1,      1,      1,      1],    
            steam:      [1.125, 1,     0.85,   1,      1,      1,      1,      1.25,   1.1,    1,      1,      0.85,   1],
            decimate:   [1.24,  1.3,   1.1,    1.25,   1.1,    1,      1.1,    1.05,   1,      1,      1,      1,      1],
            intercept:  [1.375, 1,     1,      1,      1,      0.975,  1,      1,      1,      0.925,  1,      1,      1],
            wreck:      [1.25,  0.7,   1,      1,      0.9,    0.9,    0.9,    1,      1,      1,      0.9,    1,      0.9],
            op_anni:    [0.5,   0,     0.25,   1,      1,      1,      1,      2,      1,      1,      1,      1,      1],
        mini_hive:      [1.05,  0.25,  1,      0.9,    0.85,   0.9,    1,      1,      0.6,    0.925,  0.95,   1,      0.95],
            hive:       [0.75,  0.3,   1,      0.8,    0.85,   0.65,   1,      1.05,   0.65,   1,      1,      1,      1],
        arty:           [1.2,   0.75,  1,      0.9,    1,      0.95,   1,      1.15,   1.1,    1,      1.5,    1,      1], 
            mortar:     [1.2,   1,     1,      1,      1.1,    1,      1,      0.8,    0.8,    1,      1,      1,      1],   
            spreadmain: [0.75,  0.25,  0.5,    1,      0.63,   1,      0.9,    1.92,   1.154,  1,      1,      1,      1], 
            spread:     [1.5,   1,     0.25,   1,      1.1,    1.16,   1,      0.7,    0.7,    1,      1,      0.25,   1],   
            spread1:    [2.2,   0.4375,0.125,  1,      0.65,   1.7,    0.95,   1.05,   0.75,   1,      1.5,    0.25,   1.15],
            spread2:    [1,     0.1,   0.345,  1,      0.835,  0.495,  1.2,    0.825,  0.775,  1,      0.9,    0.5,    0.8],
            skim:       [1.3,   0.8,   0.8,    0.9,    1.35,   0.9,    2,      0.375,  0.375,  1.175,  1,      1,      1.1],   
    twin:               [1.09,  0.5,   0.9,    1,      0.8,    0.885,  0.925,  1,      1,      1,      1,      1.2,    1],
        bent:           [1,     1,     0.8,    1,      0.85,   1,      0.85,   1,      1,      1,      0.8,    0.5,    1],    
        triplet:        [1.2,   2/3,   0.9,    1,      0.85,   0.95,   0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            quint:      [1.385, 2/3,   1,      1,      1,      0.95,   0.95,   1,      0.975,  1,      1.1,    0.9,    0.9], 
            dual:       [2.85,  1,     0.8,    0.98,   1.32,   1,      1.1,    1.3,    1.1,    1,      1,      1,      1.25], 
            dual2:      [1,     1,     0.8,    1,      0.5,    0.55,   0.7,    1,      1,      1,      1,      1,      0.75],
        double:         [1,     1,     1,      1,      0.9,    0.9,    0.9,    1,      0.975,  1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.95,   0.9,    1,      1,      0.95,   1,      1,      1,      1],
        pure_gunner:    [1,     0.25,  1.5,    1.1,    1.4,    0.27,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
            machgun:    [0.66,  0.8,   2,      1,      0.95,   0.75,   0.9,    1.125,  0.8,    1,      1,      2.5,    1], 
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.35,   1.25,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5], 
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.7,    1.1,    1,      1,      1,      2,      1,      1],       
            pebble:     [1,     1,     1,      1.21,   1,      1,      1,      1.125,  1.1,    1,      0.5,    1,      0.5],
            nano:       [1.3,   1,     1,      1.5,    1,      1.25,   1.5,    1.25,   1.15,   1,      0.4,    1,      0.4],
            staple:     [1.25,  1,     1.1,    1,      0.95,   0.65,   1,      1,      1,      1,      1,      0.9,    1],
    turret:             [2,     1,     1,      0.85,   0.6,    0.6,    0.6,    0.9,    0.85,   1,      0.1,    1,      1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    bees:               [1.8,   1,     1,      1.4,    1.3,    0.9,    0.65,   3,      1.5,    1,      0.25,   1,      1],
    battle:             [1,     1,     1,      1,      0.12,   1.1,    1,      1,      0.9,    1,      1,      1,      1.1],
        carrier:        [1.1,   1,     1,      1,      1,      0.9,    1,      1.18,   1.18,   1.1,    1,      1,      1],
    hexatrap:           [1.25,  1,     1.2,    1,      1,      1,      1,      0.8,    1,      0.575,  1,      1,      1],     
        octog:          [1.25,  0,     0.25,   1.45,   1,      1,      1,      0.16,   1,      1.1,    1,      1,      1],
        defend:         [1.24,  1,     0.25,   0.85,   1.1,    1.2,    1.1,    0.85,   1,      2.3,    1,      1,      1], // Used by Defender
    block:              [1.2,   2,     0.1,    1.5,    2,      0.98,   0.91,   1.465,  2.475,  1.215,  1.1,    1,      1.5],
        construct:      [1.3,   1,     1,      0.9,    1,      1.45,   1,      0.87,   0.95,   1,      1,      1,      1], 
        boomerang:      [0.8,   1,     1,      1,      1.1,    0.7,    1.5,    0.8,    0.75,   1.35,   1,      1,      1], 
        decalibrate:    [1.45,  1,     1,      1,      1.1,    1.15,   1.1,    0.95,   0.925,  1,      1,      1,      1], // Not Decarite
    over:               [1.15,  1,     1,      0.85,   0.7,    0.75,   1,      1,      0.9,    1,      2,      1,      1], 
        meta:           [1.25,  1,     1,      1,      0.85,   0.8,    1,      1,      1,      1,      1,      1,      1], // Used by Over-X series i.e. Over-Angle
        weak:           [2,     1,     1,      1,      0.6,    0.6,    0.8,    0.5,    0.7,    0.25,   0.3,    1,      1],   
        master:         [2.5,   1,     1,      0.7,    0.7,    0.55,   0.7,    1,      1,      1,      0.7,    1,      1], 
        sunchip:        [3.3,   1,     1,      1.35,   0.4,    0.55,   0.55,   0.875,  1,      1,      0.6,    1,      1],     
            pentachip:  [1.05,  1,     1,      0.95,   1.1,    1.05,   1,      0.925,  0.925,  1,      1.2,    1,      1],
            dorito:     [1,     1,     1,      0.75,   1,      1.1,    1,      0.95,   0.95,   1,      1.1,    1,      1],
            malefict:   [1,     1,     1,      1.05,   1.1,    1.1,    1.1,    0.8,    0.8,    1,      1.15,   1,      1],
            summon:     [0.35,  1,     1,      1.125,  0.25,   0.25,   0.15,   1,      1,      1,      0.8,    1,      1], // AH HAW HAW HAWWWWW!
    baby_factory:       [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1], 
    no_recoil:          [1,     0,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    half_recoil:        [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    less_recoil:        [1,     0.65,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    bit_less_recoil:    [1,     0.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    more_recoil:        [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    much_more_recoil:   [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lots_more_recoil:   [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    tons_more_recoil:   [1,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    triple_reload:      [1/3,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    quintuple_reload:   [0.2,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    double_reload:      [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],  
    more_reload:        [0.85,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    bit_more_reload:    [0.9,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    bit_less_reload:    [1.1,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    one_fifth_reload:   [1.2,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    one_fourth_reload:  [1.25,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    one_third_reload:   [1.333, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    less_reload:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    half_reload:        [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    destroy_dominator:  [6.5,   0,     1,      0.975,  6,      6,      6,      0.575,  0.475,  1,      1,      0.5,    1],
    gun_dominator:      [1.1,   0,     1.1,    0.5,    0.5,    0.5,    1,      1.1,    1,      1,      0.9,    1.2,    0.8],
    trap_dominator:     [1.26,  0,     0.25,   1,      1.25,   1.45,   1.6,    0.5,    2,      0.7,    1,      1.5,    1],
    drone_dominator:    [1.5,   0,     1,      1,      1,      0.8,    1.3,    1,      0.9,    1,      1.25,   1,      1],
    auto_dominator:     [2.3,   0,     0.75,   0.85,   0.8,    0.525,  1,      1.1,    1,      0.9,    1.15,   1,      0.11],
    dem_trap:           [1.35,  0,     0.5,    1.25,   1.05,   1,      1.25,   0.5,    1.5,    1,      1,      0.5,    1],
    dem_mach:           [2.85,  0,     1.25,   0.55,   0.75,   0.25,   0.75,   1,      0.85,   1,      1,      1.25,   1],
    dem_factory:        [175,   0,     0.25,   0.315,  0.5,    0.5,    0.5,    2.45,   1,      1,      1,      0.5,    1],
    dem_minion:         [1.35,  0.95,  1.85,   0.9,    0.4,    0.35,   0.4,    0.5,    1,      0.75,   1,      1.85,   1],
    more_speed:         [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1], 
    double_speed:       [1,     1,     1,      1,      1,      1,      1,      2,      2,      1,      1,      1,      1],
    fast:               [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1],
    faster:             [1,     1,     1,      1,      1,      1,      1,      1.1,    1.1,    1,      1,      1,      1],
    very_bit_slow:      [1,     1,     1,      1,      1,      1,      1,      0.95,   0.95,   1,      1,      1,      1],
    bit_slow:           [1,     1,     1,      1,      1,      1,      1,      0.9,    0.9,    1,      1,      1,      1],
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1],
    charge:             [1,     1,     0.5,    1,      1,      0.9,    1,      0.75,   0.75,   1,      1,      1.15,   1], // Used by Charger Branch
    not_dense:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
    half_range:         [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1],
    less_range:         [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.85,   1,      1,      1],
    more_range:         [1,     1,     1,      1,      1,      1,      1,      1,      1,      1.15,   1,      1,      1],
    double_range:       [1,     1,     1,      1,      1,      1,      1,      1,      1,      2,      1,      1,      1],
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    testbed:            [1,     0.5,   1,      1,      1,      1.2,    1,      1.2,    1.15,   1,      1.25,   1,      1],
    closer:             [1.25,  0.25,  1,      1,      1000,   1000,   1000,   2.5,    2.25,   1.4,    4,      0.25,   1],
    closer_drone:       [1.5,   1,     1,      1,      1000,   1000,   1000,   2.5,    2.25,   1,      4,      0.25,   1],
    closer_ai:          [0.625, 1,     1,      1,      100000, 100000, 100000, 5,      4.85,   1.5,    10,     0.25,   10],
    closer_ai_drone:    [0.75,  1,     1,      1,      100000, 100000, 100000, 5.5,    5,      1,      10,     0.25,   10],
    protect_swarm:      [3.5,   0,     1,      1.6,    200,    5,      5,      1.2,    0.95,   0.615,  5,      1,      5],
    dread:              [0.855, 0.25,  0.75,   0.95,   1.2,    1.05,   1.05,   1,      0.9,    1,      1,      1.25,   1],
    dread_trap:         [1.15,  0.5,   0.25,   0.975,  1.05,   1.05,   1.05,   1.1,    1,      1,      1,      1,      3],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    half_speed:         [1,     0,     1,      1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1],
    bit_smaller:        [1,     1,     1,      0.84,   1,      1,      1,      1,      1,      1,      1,      1,      1],
    little_bit_smaller: [1,     1,     1,      0.93,   1,      1,      1,      1,      1,      1,      1,      1,      1],
    mach_smaller:       [1,     1,     1,      0.8,    1,      1,      1,      1,      1,      1,      1,      1,      1],
    smaller:            [1,     1,     1,      0.75,   1,      1,      1,      1,      1,      1,      1,      1,      1],
    even_smaller:       [1,     1,     1,      0.6,    1,      1,      1,      1,      1,      1,      1,      1,      1],
    half_size:          [1,     1,     1,      0.5,    1,      1,      1,      1,      1,      1,      1,      1,      1],
    pellet:             [0.8,   1,     0.75,   1,      1.2,    1.1,    1.03,   1.2,    1.175,  1.15,   1,      0.75,   1],
        bore:           [1.2,   1,     0.7,    1,      1,      1,      1,      1.375,  1.35,   1,      1,      0.7,    1],
        punt:           [1.25,  1,     1.5,    1,      0.8,    0.85,   0.8,    0.95,   0.925,  1,      1,      2,      1],
    bigger:             [1,     1,     1,      1.25,   1,      1,      1,      1,      1,      1,      1,      1,      1],
    bit_bigger:         [1,     1,     1,      1.16,   1,      1,      1,      1,      1,      1,      1,      1,      1],
    little_bit_bigger:  [1,     1,     1,      1.091,  1,      1,      1,      1,      1,      1,      1,      1,      1],
very_little_bit_bigger: [1,     1,     1,      1.067,  1,      1,      1,      1,      1,      1,      1,      1,      1],
    double_size:        [1,     1,     1,      2,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    near_double_size:   [1,     1,     1,      1.85,   1,      1,      1,      1,      1,      1,      1,      1,      1],
    low_power:          [1,     1,     2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7],
    lower_power:        [1,     1,     1.25,   1,      0.5,    0.5,    0.75,   1,      1,      1,      1,      1.25,   1],
    half_power:         [1,     1,     1,      1,      0.5,    0.5,    0.5,    1,      1,      1,      1,      1,      1],
    less_power:         [1,     1,     1,      1,      0.9,    0.9,    0.9,    1,      1,      1,      1,      1,      1],
    more_power:         [1,     1,     1,      1,      1.1,    1.1,    1.1,    1,      1,      1,      1,      1,      1],
    more_damage:        [1,     1,     1,      1,      1.15,   1.1,    1,      1,      1,      1,      1,      1,      1],
    bit_more_damage:    [1,     1,     1,      1,      1.05,   1.1,    1,      1,      1,      1,      1,      1,      1],
    bit_less_damage:    [1,     1,     1,      1,      0.95,   0.9,    1,      1,      1,      1,      1,      1,      1],
    less_damage:        [1,     1,     1,      1,      0.9,    0.85,   1,      1,      1,      1,      1,      1,      1],
    half_damage:        [1,     1,     1,      1,      0.6,    0.5,    1,      1,      1,      1,      1,      1,      1],
    vulc:               [1.25,  0.1,   0.0001, 0.8,    0.5,    0.25,   1,      1.3,    1,      1,      1.25,   0.001,  1.1],
    fallen_overlord:    [0.25,  1,     1,      0.35,   0.4,    0.3,    0.4,    0.76,   0.9,    1,      2,      1,      1],
    demoman:            [1.5,   1.25,  1.5,    1,      1,      0.75,   1,      1,      1,      1,      0.9,    1,      0.9],
    rocket:             [0.48,  2,     1.5,    0.85,   0.25,   0.25,   0.25,   0.75,   1,      0.5,    1,      1.25,   1],
    jump:               [11,    12,    1,      1,      0,      1,      1,      1,      1,      1,      1,      1,      1],
    guardian:           [0.45,  8,     1,      0.7,    2,      1,      1,      1,      1,      1.8,    0.25,   1,      0.25],
    flame:              [0.518, 1.25,  4.25,   1,      1.25,   1.25,   2,      0.8,    0.8,    1.85,   1,      3,      1.6],
    levi_five:          [1.15,  0,     1,      1,      0.95,   0.95,   0.95,   1.125,  1.1,    1.15,   2,      1.1,    1],
    levi:               [2,     0,     1.25,   1,      1,      1,      1,      0.65,   1,      0.75,   1,      1,      1],
    a_lotta_damage:     [0.8,   1,     1,      1.2,    1.5,    1.75,   1.25,   1,      1,      1,      1,      1,      1],
    trap_minion:        [1,     1,     1,      1.15,   0.7,    0.7,    1.15,   1,      1,      0.75,   1,      1.1,    1],
    very_fast_launch:   [1,     1,     1,      1,      1,      1,      1,      2.2,    1,      1,      1,      1,      1],
    fast_launch:        [1,     1,     1,      1,      1,      1,      1,      1.4,    1,      1,      1,      1,      1],
    less_spread:        [1,     1,     0.75,   1,      1,      1,      1,      1,      1,      1,      1,      0.75,   1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    click:              [1.25,  0.275, 0.5,    1,      0.58,   0.6,    0.53,   0.98,   0.975,  1,      1.875,  2,      0.9],
    socker:             [1.25,  1.2,   1,      0.9,    1.1,    1.15,   1.1,    0.875,  0.875,  0.95,   0.55,   1,      0.55],
    circle:             [1.575, 2,     1,      1.1,    1,      1.1,    1.1,    1,      1,      0.9,    1,      1,      1.1],
    mothership:         [1.25,  1,     1,      1,      1,      1,      1.1,    0.775,  0.8,    15,     1,      1,      1.15],
    skimboss:           [1,     0.5,   1,      0.9,    1.2,    1.2,    1.2,    1.1,    1,      0.7,    1,      1,      1],
    quadtrap:           [1.15,  1,     1,      1,      0.75,   0.8,    0.8,    1.4,    0.9,    0.75,   0.9,    1,      0.9],
    laser:              [0.355, 0.2,   1,      1,      0.6,    0.51,   0.6,    1.35,   1,      1,      0.25,   0.05,   0.5],
    basemaker:          [6.25,  1.4,   0.1,    1,      1,      0.75,   1,      0.5,    1,      1,      1,      15,     1],
    stronger:           [1,     1,     1,      1,      1.05,   1.05,   1,      1.1,    1,      1,      1,      1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ // WIP
    ceptionist:         [1.2,   1,     1,      1,      1,      1,      1,      0.95,   0.95,   0.95,   1,      1,      1],
    ceptionist_bullet:  [1.2,   1,     1,      1,      0.5,    0.475,  0.5,    0.7,    0.7,    1,      1,      1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ // My g.stats
    mega_pierce:        [1,     1,     1,      1,    10000,   0.1,   10000,    1,      1,      1,      1,      0,      1],
    mega_pen:           [1,     1,     1,      1,      1,      1,    10000,    1,      1,      1,      1,      1,      1], 
    ebh:                [1.125, 1,     1,      1,     0.8,    0.75,    2,     1.25,    1,     0.6,     1,     1.2,     1], 
    skim_max:           [0.8,   1,     1,      1,      1,      1,      1,      1,      3,      1,      1,      1,      1], 
    bit_less_range:     [1,     1,     1,      1,      1,      1,      1,      1,      1,     2/3,     1,      1,      1],
    much_more_damage:   [1,     1,     1,      1,      1.35,   1.3,    1,      1,      1,      1,      1,      1,      1],
even_much_more_damage:  [1,     1,     1,      1,      1.8,    1.5,    1,      1,      1,      1,      1,      1,      1],
    tons_more_damage:   [1,     1,     1,      1,      4,      3,      1,      1,      1,      1,      1,      1,      1],
};

const dfltskl = 9;

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
    autosmash: 7,
    minion: 8,
    jump: 9,
    block: 10,
    boomerang: 11,
    lance: 12,
    flail: 13,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};

// FOOD
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};

const basePolygonDamage = 1;
const basePolygonHealth = 2;
exports.orangepentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Orange Pentagon',
    VALUE: 19500,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 207,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 100,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.orangetriangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Orange Triangle',
    VALUE: 7500,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 207,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 30,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.orangesquare = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Orange Square',
    VALUE: 1500,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 207,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};

exports.greenbigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Green Beta Pentagon',
    VALUE: 25000,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 31,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 125 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.greenhexagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Green Hexagon',
    VALUE: 45000,
    SHAPE: 6,
    SIZE: 28,
    COLOR: 31,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 10,
        HEALTH: 400,
        RESIST: 1.45,
        PENETRATION: 1,
    },
    DRAW_HEALTH: true,
};
exports.greenpentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Green Pentagon',
    VALUE: 30000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 31,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Green Triangle',
    VALUE: 7000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 31,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.greensquare = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Green Square',
    VALUE: 2000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 31,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};

exports.gem = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage/4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: -5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.octagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 6,
    },
    LABEL: 'Octagon',
    VALUE: 1725,
    SHAPE: 8,
    SIZE: 40,
    COLOR: 229,
    BODY: {
        DAMAGE: 6 * basePolygonDamage,
        DENSITY: 14,
        HEALTH: 45 * basePolygonHealth,
        RESIST: 2,
        PENETRATION: 0.8,
    },
    DRAW_HEALTH: true,
};
exports.heptagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Heptagon',
    VALUE: 975,
    SHAPE: 7,
    SIZE: 32,
    COLOR: 219,
    BODY: {
        DAMAGE: 4.5 * basePolygonDamage,
        DENSITY: 12,
        HEALTH: 25 * basePolygonHealth,
        RESIST: 1.75,
        PENETRATION: 0.9,
    },
    DRAW_HEALTH: true,
};
exports.hexagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Hexagon',
    VALUE: 600,
    SHAPE: 6,
    SIZE: 24,
    COLOR: 21,
    BODY: {
        DAMAGE: 3 * basePolygonDamage,
        DENSITY: 10,
        HEALTH: 15 * basePolygonHealth,
        RESIST: 1.5,
        PENETRATION: 1,
    },
    DRAW_HEALTH: true,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};

exports.bigObstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Obstacle',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -11,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 75,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Obstacle',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 50,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: -7,
        LABEL: "Obstacle",
    };

    exports.mazeObstacle = {
        TYPE: 'wall',
        DAMAGE_CLASS: 1,
        LABEL: 'Maze Wall',
        FACING_TYPE: '',
        SHAPE: 4,
        BODY: {
            PUSHABILITY: 10000,
            HEALTH: 10000,
            SHIELD: 10000,
            REGEN: 10000,
            DAMAGE: 10000,
            RESIST: 10000,
            STEALTH: 10000,
            ACCELERATION: 10000,
        },
        VALUE: 0,
        SIZE: 100,
        COLOR: 16,
        VARIES_IN_SIZE: false,
        GIVE_KILL_MESSAGE: true,
        ACCEPTS_SCORE: false,
    };

// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };

exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Bee',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
    exports.autoswarm = {
        PARENT: [exports.swarm],
        LABEL: 'AI Swarm Drone',
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };

exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0.5,
    },
};
    exports.block = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
    };
    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };

exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.much_more_recoil, g.more_speed, g.more_speed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.much_more_recoil, g.more_speed, g.more_speed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};
    exports.rocket = {
        PARENT: [exports.bullet],
        LABEL: 'Rocket',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,   10.5,     1.5,    9,      0,     180,     1,    ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.rocket, g.double_reload, g.low_power, g.much_more_recoil, g.more_speed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, },
        ],
    };
    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'fastautospin',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,     108,     0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.mini_hive, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     180,    0.2,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.mini_hive, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     252,    0.4,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.mini_hive, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     324,    0.6,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.mini_hive, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,     36,     0.8,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.mini_hive, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, },
        ],
    };

// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
let gun = { };

exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.auto_turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
    exports.machineAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,     1.3,     8,      0,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto_turret, g.mach]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto_turret, g.twin]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto_turret, g.twin]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };

exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, },
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.machine3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,      1.3,    8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.mach, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.defendgun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.defend_auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.flank, g.auto]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.levigun = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [ 4.5,     14,     1,      10,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto_turret, g.heavy3, g.giga3, g.levi]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  11,     14,   -1.35,    0,      0,      0,      0,   ], 
                },
        ],
    };
    exports.octogturret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [ 4.5,     14,     1,      10,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto_turret, g.heavy3, g.giga3]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  11,     14,   -1.35,    0,      0,      0,      0,   ], 
                },
        ],
    };
    exports.turretSnipe = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto_turret, g.snipe3]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
            },
        ],
    };
    exports.custodiangun = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     15,     1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto_turret, g.heavy3, g.giga3]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.autoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  19,     6,      1,      0,     -5,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto_turret, g.twin]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  19,     6,      1,      0,      5,      0,     0.5,  ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto_turret, g.twin]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.sentryTurret = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto_turret, g.heavy3]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.low_power, g.fast, g.half_reload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
exports.turretTrap = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.low_power, g.fast, g.half_reload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
    exports.crasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
exports.octogtrap = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.octog]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
    exports.sniper3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,     9,      1,      0,      0,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flank, g.auto]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.flank, g.auto]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.flank, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,     0.5,  ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner, g.nail, g.flank, g.auto]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner, g.nail, g.flank, g.auto]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner, g.nail, g.flank, g.auto]),
                    TYPE: exports.bullet,
                }, },
        ],
    };

exports.tritrapgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.flank, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
exports.smasherBody = {
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.spikeBody = {
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
exports.megasmashBody = {
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.protectBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protect_swarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protect_swarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protect_swarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,
                }, },
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy, g.sniper, g.hunter, g.hunter2]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,    0.15,  ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy, g.sniper, g.hunter]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                },
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0],
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,    100,  0],
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0],
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0],
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0],
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ],
                    }, {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ],
                    }, {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ],
                    }, {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ],
                    }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ],
                    }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ],
                    }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ],
                    }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ],
                    },
            ],
        };

exports.minion = {
    PARENT: [exports.drone],
    LABEL: 'Minion', 
    TYPE: 'drone',
    SHAPE: 0,
    DAMAGE_CLASS: 0,
    MOTION_TYPE: 'motor',
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 3,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.not_dense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
            },
    ],
};
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.skimboss, g.double_reload, g.low_power, g.more_recoil, g.more_speed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.skimboss, g.double_reload, g.low_power, g.more_recoil, g.more_speed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.skimboss, g.double_reload, g.low_power, g.more_recoil, g.more_speed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.skimboss, g.double_reload, g.low_power, g.more_recoil, g.more_speed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.skimboss]),
                TYPE: exports.hypermissile,
            }, },
    ],
};

function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}

exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                        },
                ],
            };

        let smshskl = 12; //13;
        exports.pummeler = {
            PARENT: [exports.genericTank],
            LABEL: 'Pummeler',
            DANGER: 5,
            BODY: {
                DENSITY: base.DENSITY * 1.5,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  20,     0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
        exports.mauler = {
            PARENT: [exports.genericTank],
            LABEL: 'Mauler',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.95,
                DAMAGE: base.DAMAGE * 1.05,
                DENSITY: base.DENSITY * 1.5,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  19,     0,      0,      0,     360,  0,], 
                TYPE: exports.spikeBody,
                }, { 
                POSITION: [  19,     0,      0,     120,    360,  0,], 
                TYPE: exports.spikeBody,
                }, {
                POSITION: [  19,     0,      0,     240,    360,  0,], 
                TYPE: exports.spikeBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
            exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };
            exports.autopummeler = makeAuto(exports.pummeler, 'Auto-Pummeler', { type: exports.autoSmasherTurret, size: 11, });
            exports.autopummeler.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];
            exports.autopummeler.STAT_NAMES = statnames.autosmash;
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];
            exports.autosmash.STAT_NAMES = statnames.autosmash;

    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
        exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },
                ]
            };
            exports.autogunner = makeAuto(exports.gunner);            
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };

        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Double',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.autodouble = makeAuto(exports.double);
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 7,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 8,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };        
            exports.dual = {
                PARENT: [exports.genericTank],
                LABEL: 'Dual',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.dual2]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.dual2]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,    0.15,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,    0.65,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };

    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.autoass = makeAuto(exports.assassin);
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.ranger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                        },
                ],
            };
            
            exports.observer = {
                PARENT: [exports.genericTank],
                LABEL: 'Observer',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 5,
                },
            };

        exports.hunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     11,     1,      0,      0,      0,     0.15, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  20,     11,     1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  17,     15,     1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.rocketeer = {
                PARENT: [exports.genericTank],
                LABEL: 'Rocketeer',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,   12.5,   -0.5,    9.5,     0,      0,      0,  ], 
                        }, {
                    POSITION: [ 16.5,  11.5,   -1.5,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim]),
                            TYPE: exports.rocket,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: 'Master',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.15,
                },
                FACING_TYPE: 'autospin',
                MAX_CHILDREN: 6,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Over-Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  13,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.7,    13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: 'Banshee',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer);
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Over-Gunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  17,     2,      1,      0,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  17,     2,      1,      0,     -3,      0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [ 4.5,    8.5,    -1.6,   7.5,     0,      0,      0,   ], 
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, },
                ],
            };
        }
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, },
            ],
        };
            exports.autocruiser = makeAuto(exports.cruiser);
            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.autoswarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.autoswarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, },
                ],
            };
            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }
                ],
            };
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
            exports.autounderseer = makeAuto(exports.underseer);
            exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                FACING_TYPE: 'autospin',
                MAX_CHILDREN: 22,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, },
                    ],
            };

            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.minion,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,     1.01,    15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                        },
                ],
            };

    exports.machine = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
        exports.automachine = makeAuto(exports.machine);
            exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,    0.15,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  17,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.automini = makeAuto(exports.mini, 'Streamer');
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Streamliner',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  15,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.hybridmini = makeHybrid(exports.mini, "Cropduster");
            exports.minitrap = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Barricade',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
            exports.autodestroy = makeAuto(exports.destroy, 'Masher');
            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.hiveshooter = {
                PARENT: [exports.genericTank],
                LABEL: 'Swarmer',
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.mini_hive, g.hive]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
            exports.shotgun = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sgun, g.fake]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], 
                        },
                ],
            };

        exports.builder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Builder',
            STAT_NAMES: statnames.block,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },
            ],
        };
            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.block,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.intercept]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   5,    14,      1,      7,      0,      0,      0,   ]
                    }
                ],
            };
            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Constructor',
                STAT_NAMES: statnames.block,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };
            exports.autobuilder = makeAuto(exports.builder, 'Craftsman');
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.boomerang,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };

        exports.artillery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
            exports.autoarty = makeAuto(exports.artillery);
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.mortar]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.mortar]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.mortar]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.mortar]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.mortar]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.missile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.spread = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {                    
                    POSITION: [  13,     4,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,    10,     1.3,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Primary',
                        }, },
                ],
            };

    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'Hexa',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.autohexa = makeAuto(exports.hexa);
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.hexatrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Hexa-Trapper',
                SHAPE: 6,
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     60,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     60,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 
            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    DENSITY: base.DENSITY * 0.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.surfer = {
                PARENT: [exports.genericTank],
                LABEL: 'Surfer',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                STAT_NAMES: statnames.generic,
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: exports.autoswarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: exports.autoswarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                STAT_NAMES: statnames.generic,
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.tri, g.thruster]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };    
            exports.autotri = makeAuto(exports.tri);
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.flank, g.tri, g.tri_front]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {  
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };

        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Pounder-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
            exports.builder3 = {
                LABEL: 'Architect',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                PARENT: [exports.genericTank],
                DANGER: 6,
                FACING_TYPE: 'autospin',
                STAT_NAMES: statnames.block,
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.tritrapgun,
                            },
                ],
            };
            exports.sniper3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Sniper-3',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.25,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.sniper3gun,
                            },
                ],
            };
            exports.machine3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Machine-3',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.machine3gun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.machine3gun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.machine3gun,
                            },
                ],
            };
            exports.auto4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
            
        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  17,     2,      1,      0,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  17,     2,      1,      0,     -3,      0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [ 4.5,    8.5,    -1.6,   7.5,     0,      0,      0,   ], 
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Bushwhacker',
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flank]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,    8.5,     1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.twinbuilder = {
                PARENT: [exports.genericTank],
                LABEL: 'Twin Builder',
                STAT_NAMES: statnames.block,
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,     5.5,     0,      0,   ], 
                        }, {
                    POSITION: [   2,     8,      1.1,    18,    5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.twin]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,    -5.5,     0,      0,   ], 
                        }, {
                    POSITION: [   2,     8,      1.1,    18,   -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.twin]),
                            TYPE: exports.block,
                        }, },
                ],
            };

            exports.mothership = {
                PARENT: [exports.genericTank],
                LABEL: 'Mothership',
                SIZE: 64,
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                LEVEL: 110,
                ACCEPTS_SCORE: false,
                SKILL: skillSet({
                    rld: 1,
                    dam: 1, 
                    pen: 1,
                    str: 1,
                    spd: 1,
                    atk: 1,
                    hlt: 1,
                    shi: 1,
                    rgn: 1,
                    mob: 1,        
                }),
                FACING_TYPE: 'autospin',
                CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
                BODY: {
                    HEALTH: 350,
                    FOV: 1.3,
                    SPEED: base.SPEED * 0.25,
                    SHIELD: base.SHIELD * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0,   360/16,  1/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 2*360/16,  2/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 3*360/16,  3/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 4*360/16,  4/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 5*360/16,  5/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 6*360/16,  6/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 7*360/16,  7/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 8*360/16,  8/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 9*360/16,  9/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 10*360/16, 10/16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 11*360/16, 11/16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 12*360/16, 12/16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 13*360/16, 13/16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 14*360/16, 14/16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 15*360/16, 15/16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, },
                ],
            };
            exports.mothership2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Mothership',
                SIZE: 64,
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                LEVEL: 110,
                SKILL: skillSet({
                    rld: 1,
                    dam: 1, 
                    pen: 1,
                    str: 1,
                    spd: 1,
                    atk: 1,
                    hlt: 1,
                    shi: 1,
                    rgn: 1,
                    mob: 1,        
                }),
                FACING_TYPE: 'autospin',
                BODY: {
                    HEALTH: 350,
                    FOV: 1.3,
                    SPEED: base.SPEED * 0.25,
                    SHIELD: base.SHIELD * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0,   360/16,  1/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 2*360/16,  2/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 3*360/16,  3/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 4*360/16,  4/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 5*360/16,  5/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 6*360/16,  6/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 7*360/16,  7/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 8*360/16,  8/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 9*360/16,  9/16,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 10*360/16, 10/16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 11*360/16, 11/16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 12*360/16, 12/16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 13*360/16, 13/16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 14*360/16, 14/16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0, 15*360/16, 15/16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 4.3,    3.1,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.mothership]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, },
                ],
            };
            exports.acBase = {
                PARENT: [exports.genericTank],
                LABEL: 'Arena Closer',
                NAME: 'Arena Closer',
                SIZE: 64,
                COLOR: 3,
                ACCEPTS_SCORE: false,
                BODY: {
                    FOV: 3,
                    SPEED: base.SPEED * 5,
                    HEALTH: 10000,
                    SHIELD: 10000,
                    REGEN: 1000,
                    DAMAGE: 10000,
                },
                SKILL: skillSet({
                    rld: 1,
                    dam: 1, 
                    pen: 1,
                    str: 1,
                    spd: 1,
                    atk: 1,
                    hlt: 1,
                    shi: 1,
                    rgn: 1,
                    mob: 1,        
                }),
            };
            exports.arenaCloser = {
                PARENT: [exports.acBase],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.closer]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.arenaCloser2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Arena Closer',
                SIZE: 64,
                COLOR: 3,
                BODY: {
                    FOV: 3,
                    SPEED: base.SPEED * 5,
                },
                SKILL: skillSet({
                    rld: 1,
                    dam: 1, 
                    pen: 1,
                    str: 1,
                    spd: 1,
                    atk: 1,
                    hlt: 1,
                    shi: 1,
                    rgn: 1,
                    mob: 1,        
                }),
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.closer]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
        exports.dominator = {
            PARENT: [exports.genericTank],
            LABEL: 'Dominator',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 300, 
                FOV: 1.3,
                SHIELD: base.SHIELD * 1.25,
            },
            CONTROLLERS: ['nearestDifferentMaster'],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  22,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        },
            ],
        };
        exports.dominator2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Dominator',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 300, 
                FOV: 1.3,
                SHIELD: base.SHIELD * 1.25,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  22,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        },
            ],
        };
            exports.destroy_dominator = {
                PARENT: [exports.dominator],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [15.25,  6.75,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.destroy_dominator]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,   6.75,    -1.6,  6.75,     0,      0,      0,   ], 
                        },
                ],
            };
            exports.gun_dominator = {
                PARENT: [exports.dominator],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [14.25,    3,      1,      0,     -2,      0,     0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gun_dominator]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [14.25,    3,      1,      0,      2,      0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gun_dominator]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [15.85,    3,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gun_dominator]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,   6.75,     0,      0,      0,   ], 
                        },
                ],
            };
            exports.trap_dominator = {
                PARENT: [exports.dominator],
                FACING_TYPE: 'autospin',
                STAT_NAMES: statnames.trap,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   4,   3.75,     1,      8,      0,      0,      0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,      45,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,      45,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,      90,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,     135,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,     180,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,     225,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,     270,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,     315,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.drone_dominator = {
                PARENT: [exports.dominator],
                FACING_TYPE: 'autospin',
                STAT_NAMES: statnames.drone,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 3.75,    4,      1,     8.5,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 3.75,  4.45,     1,     7.2,     0,      0,      0,   ],
                        }, {
                    POSITION: [ 3.75,    4,      1,     8.5,     0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 3.75,  4.45,     1,     7.2,     0,      60,     0,   ],
                        }, {
                    POSITION: [ 3.75,    4,      1,     8.5,     0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 3.75,  4.45,     1,     7.2,     0,     120,     0,   ],
                        }, {
                    POSITION: [ 3.75,    4,      1,     8.5,     0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 3.75,  4.45,     1,     7.2,     0,     180,     0,   ],
                        }, {
                    POSITION: [ 3.75,    4,      1,     8.5,     0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 3.75,  4.45,     1,     7.2,     0,     240,     0,   ],
                        }, {
                    POSITION: [ 3.75,    4,      1,     8.5,     0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 3.75,  4.45,     1,     7.2,     0,     300,     0,   ],
                        },
                ],
            };
            exports.destroy_dominator2 = {
                PARENT: [exports.dominator2],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [15.25,  6.75,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.destroy_dominator]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,   6.75,    -1.6,  6.75,     0,      0,      0,   ], 
                        },
                ],
            };
            exports.gun_dominator2 = {
                PARENT: [exports.dominator2],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [14.25,    3,      1,      0,     -2,      0,     0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gun_dominator]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [14.25,    3,      1,      0,      2,      0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gun_dominator]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [15.85,    3,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gun_dominator]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,   6.75,     0,      0,      0,   ], 
                        },
                ],
            };
            exports.trap_dominator2 = {
                PARENT: [exports.dominator2],
                FACING_TYPE: 'autospin',
                STAT_NAMES: statnames.trap,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   4,   3.75,     1,      8,      0,      0,      0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,      45,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,      45,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,      90,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,     135,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,     180,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,     225,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,     270,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [   4,   3.75,     1,      8,      0,     315,     0,   ],
                        }, {
                    POSITION: [ 1.25,  3.75,    1.7,     12,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.trap_dominator]),
                            TYPE: exports.trap,
                            STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.drone_dominator2 = {
                PARENT: [exports.dominator2],
                FACING_TYPE: 'autospin',
                STAT_NAMES: statnames.drone,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 3.75,    4,      1,     8.5,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 3.75,  4.45,     1,     7.2,     0,      0,      0,   ],
                        }, {
                    POSITION: [ 3.75,    4,      1,     8.5,     0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 3.75,  4.45,     1,     7.2,     0,      60,     0,   ],
                        }, {
                    POSITION: [ 3.75,    4,      1,     8.5,     0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 3.75,  4.45,     1,     7.2,     0,     120,     0,   ],
                        }, {
                    POSITION: [ 3.75,    4,      1,     8.5,     0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 3.75,  4.45,     1,     7.2,     0,     180,     0,   ],
                        }, {
                    POSITION: [ 3.75,    4,      1,     8.5,     0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 3.75,  4.45,     1,     7.2,     0,     240,     0,   ],
                        }, {
                    POSITION: [ 3.75,    4,      1,     8.5,     0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
                            TYPE: [exports.drone, {INDEPENDENT: true}],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [ 3.75,  4.45,     1,     7.2,     0,     300,     0,   ],
                        },
                ],
            };

// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    VALUE: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.sentry2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.more_recoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.sentryTurret, size: 12, });
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.turretTrap, size: 12, });
exports.sentrySnipe = makeAuto(exports.sentry, 'Sentry', { type: exports.turretSnipe, size: 12, });
exports.sentrySwarm2 = {
    PARENT: [exports.sentry2],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.more_recoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        }, },
    ],
};
exports.sentryGun2 = makeAuto(exports.sentry2, 'Sentry', { type: exports.sentryTurret, size: 12, });
exports.sentryTrap2 = makeAuto(exports.sentry2, 'Sentry', { type: exports.turretTrap, size: 12, });
exports.sentrySnipe2 = makeAuto(exports.sentry2, 'Sentry', { type: exports.turretSnipe, size: 12, });

exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 60,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
};
exports.miniboss2 = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    FACING_TYPE: 'autospin',
};
    exports.elite = {
        PARENT: [exports.miniboss],
        LABEL: 'Harcadium Pig',
        COLOR: 5,
        SHAPE: 3,
        SIZE: 24,
        VALUE: 150000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: 25,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    };
    exports.elite2 = {
        PARENT: [exports.miniboss2],
        LABEL: 'Harcadium Pig',
        COLOR: 5,
        SHAPE: 3,
        SIZE: 24,
        VALUE: 150000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: 25,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    };
        exports.elite_sprayer = { 
            PARENT: [exports.elite],
            LABEL: 'Harcadium Sprayer',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], }],
                        },
            ],
        };
        exports.elite_sprayer_nonauto = { 
            PARENT: [exports.elite2],
            LABEL: 'Harcadium Sprayer',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], }],
                        },
            ],
        };
        exports.elite_destroyer = {
            PARENT: [exports.elite],
            LABEL: 'Harcadium Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { COLOR: 5, }]
                    },
            ],
        };
        exports.elite_destroyer2 = {
            PARENT: [exports.elite2],
            LABEL: 'Harcadium Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { COLOR: 5, }]
                    },
            ],
        };

        exports.palisade = {
            PARENT: [exports.miniboss],
            LABEL: 'Castle Cassowary',
            COLOR: 17,
            SHAPE: 6,
            SIZE: 12,
            VALUE: 250000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.1,
                HEALTH: 60,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.palisade2 = {
            PARENT: [exports.miniboss2],
            LABEL: 'Castle Cassowary',
            COLOR: 17,
            SHAPE: 6,
            SIZE: 12,
            VALUE: 250000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.1,
                HEALTH: 60,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };

        exports.elite_gunner = {
            PARENT: [exports.elite],
            LABEL: 'Harcadium Gunner',
            FACING_TYPE: 'looseToTarget',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: [exports.pillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
            }],
        };
        exports.elite_gunner2 = {
            PARENT: [exports.elite2],
            LABEL: 'Harcadium Gunner',
            FACING_TYPE: 'looseToTarget',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: [exports.pillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
            }],
        };

            exports.devAnni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.op]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.devBody = {
                PARENT: [exports.genericTank],
                SHAPE: -9,
                LABEL: '',
            };
            exports.dev = {
                PARENT: [exports.genericTank],
                LABEL: 'Developer (Senior Testers only)',
                RESET_UPGRADES: true,
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.eventDev = {
                PARENT: [exports.genericTank],
                LABEL: 'Event Developer',
                RESET_UPGRADES: true,
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devBosses = {
                PARENT: [exports.genericTank],
                LABEL: 'Bosses',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devBosses2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 2',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devBosses3 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 3',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devBosses4 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 4',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devBosses5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 5',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devBosses6 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 6',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devBosses7 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 7',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devBosses8 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 8',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devBosses9 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 9',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devBosses10 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 10',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };

            exports.devDominators = {
                PARENT: [exports.genericTank],
                LABEL: 'Dominators',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };

            exports.devSentries = {
                PARENT: [exports.genericTank],
                LABEL: 'Sentries',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devSentries2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 2',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };

            exports.devMisc = {
                PARENT: [exports.genericTank],
                LABEL: 'Miscellaneous',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devMisc2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 2',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devMisc3 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 3',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devMisc4 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 4',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devMisc5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 5',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devMisc6 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 6',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devMisc7 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 7',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devMisc8 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 8',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devMisc9 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 9',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devMisc10 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 10',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devMisc11 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 11',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };

            exports.devShapes = {
                PARENT: [exports.genericTank],
                LABEL: 'Custom Shapes',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devShapes2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 2',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devShapes3 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 3',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devShapes4 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 4',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devShapes5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 5',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };

        exports.testbedTanks = {
            PARENT: [exports.genericTank],
            LABEL: 'Beta Tanks',
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
        exports.testbedTanks2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Page 2',
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };

        exports.testbedRemoved = {
            PARENT: [exports.genericTank],
            LABEL: 'Removed Tanks',
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
        exports.testbedRemoved2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Page 2',
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
        exports.testbedRemoved3 = {
            PARENT: [exports.genericTank],
            LABEL: 'Page 3',
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
        exports.testbedRemoved4 = {
            PARENT: [exports.genericTank],
            LABEL: 'Page 4',
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
        exports.testbedRemoved5 = {
            PARENT: [exports.genericTank],
            LABEL: 'Page 5',
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
        exports.testbedRemoved6 = {
            PARENT: [exports.genericTank],
            LABEL: 'Page 6',
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
        exports.testbedRemoved7 = {
            PARENT: [exports.genericTank],
            LABEL: 'Page 7',
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
        exports.testbedRemoved8 = {
            PARENT: [exports.genericTank],
            LABEL: 'Page 8',
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };

            exports.devXK = {
                PARENT: [exports.genericTank],
                LABEL: 'X-K-X Bosses',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };

            exports.devOverdone = {
                PARENT: [exports.genericTank],
                LABEL: 'Overdone Tanks',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devOverdone2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 2',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devOverdone3 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 3',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };

            exports.devACs = {
                PARENT: [exports.genericTank],
                LABEL: 'Arena Closers',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };
            exports.devACs2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Page 2',
                SHAPE: 9,
                BODY: {
                    SHIELD: 1000,
                    REGEN: 10,
                    HEALTH: 100,
                    DAMAGE: 10,
                    DENSITY: 20,
                },
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.devAnni],
                        }, {
                    POSITION: [  23,     0,      0,      0,      0,    0, ], 
                        TYPE: [exports.devBody],
                        },
                ],
            };

        exports.testbed = {
            PARENT: [exports.genericTank],
            LABEL: 'TESTBED',
            RESET_UPGRADES: true,
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.testbed]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, },
            ],
        };

            exports.dread = {
                PARENT: [exports.miniboss],
                LABEL: 'Dreadnought',
                FACING_TYPE: 'looseToTarget',
                COLOR: 19,
                SHAPE: 3,
                SIZE: 12,
                VALUE: 100000,
                BODY: {
                    FOV: 1.3,
                    SPEED: base.SPEED * 0.25,
                    HEALTH: 25,
                    SHIELD: 1,
                    REGEN: 0.01,
                    DAMAGE: 3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     4,      1,      0,     -23,     15,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.dread]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      23,    -15,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.dread]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,     -18,     15,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.dread]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      18,    -15,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.dread]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  24,     6,      1,      1,      3,      75,     0,   ], 
                        }, {
                    POSITION: [  24,     6,      1,      1,     -3,     -75,     0,   ], 
                        }, {
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.dread_trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     0,      0,     180,    360,   1, ], 
                        TYPE: [exports.bigauto4gun],
                        },
                ],
            };
            exports.dread2 = {
                PARENT: [exports.miniboss2],
                LABEL: 'Dreadnought',
                FACING_TYPE: 'looseToTarget',
                COLOR: 19,
                SHAPE: 3,
                SIZE: 12,
                VALUE: 100000,
                BODY: {
                    FOV: 1.3,
                    SPEED: base.SPEED * 0.25,
                    HEALTH: 25,
                    SHIELD: 1,
                    REGEN: 0.01,
                    DAMAGE: 3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     4,      1,      0,     -23,     15,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.dread]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      23,    -15,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.dread]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,     -18,     15,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.dread]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      18,    -15,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.dread]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  24,     6,      1,      1,      3,      75,     0,   ], 
                        }, {
                    POSITION: [  24,     6,      1,      1,     -3,     -75,     0,   ], 
                        }, {
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.dread_trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     0,      0,     180,    360,   1, ], 
                        TYPE: [exports.bigauto4gun],
                        },
                ],
            };
            exports.defend = {
                PARENT: [exports.miniboss],
                LABEL: 'Defender',
                COLOR: 2,
                SHAPE: 3,
                SIZE: 24,
                VALUE: 300000,
                BODY: {
                    FOV: 1.3,
                    SPEED: base.SPEED * 0.25,
                    HEALTH: 25,
                    SHIELD: 1,
                    REGEN: 0.01,
                    DAMAGE: 3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,     -2,      0,      60,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     13,     0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,     -2,      0,     180,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     13,     0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,     -2,      0,     300,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     13,     0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 4.85,   6.7,     0,      0,     360,   1, ], 
                        TYPE: [exports.defendgun],
                        }, {
                    POSITION: [ 4.85,   6.7,     0,     120,    360,   1, ], 
                        TYPE: [exports.defendgun],
                        }, {
                    POSITION: [ 4.85,   6.7,     0,     240,    360,   1, ], 
                        TYPE: [exports.defendgun],
                        },
                ],
            };
            exports.defend2 = {
                PARENT: [exports.miniboss2],
                LABEL: 'Defender',
                COLOR: 2,
                SHAPE: 3,
                SIZE: 24,
                VALUE: 300000,
                BODY: {
                    FOV: 1.3,
                    SPEED: base.SPEED * 0.25,
                    HEALTH: 25,
                    SHIELD: 1,
                    REGEN: 0.01,
                    DAMAGE: 3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,     -2,      0,      60,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     13,     0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,     -2,      0,     180,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     13,     0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,     -2,      0,     300,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     13,     0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 4.85,   6.7,     0,      0,     360,   1, ], 
                        TYPE: [exports.defendgun],
                        }, {
                    POSITION: [ 4.85,   6.7,     0,     120,    360,   1, ], 
                        TYPE: [exports.defendgun],
                        }, {
                    POSITION: [ 4.85,   6.7,     0,     240,    360,   1, ], 
                        TYPE: [exports.defendgun],
                        },
                ],
            };
            exports.custodian = {
                PARENT: [exports.miniboss],
                LABEL: 'Custodian',
                FACING_TYPE: 'looseToTarget',
                COLOR: 2,
                SHAPE: 3,
                SIZE: 48,
                VALUE: 500000,
                BODY: {
                    FOV: 1.5,
                    SPEED: base.SPEED * 0.25,
                    HEALTH: 40,
                    SHIELD: 1,
                    REGEN: 0.05,
                    DAMAGE: 5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,     -5,      50,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,    -5,      50,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      5,      70,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,     5,      70,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,      60,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,     0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,     -5,     170,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,    -5,     170,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      5,     190,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,     5,     190,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,     0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,     -5,     290,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,    -5,     290,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      5,     310,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,     5,     310,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,     0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 4.85,    10,     0,     120,    360,   1, ], 
                        TYPE: [exports.defendgun],
                        }, {
                    POSITION: [ 4.85,    10,     0,     240,    360,   1, ], 
                        TYPE: [exports.defendgun],
                        }, {
                    POSITION: [  11,     0,      0,     180,    360,   1, ], 
                        TYPE: [exports.custodiangun],
                        },
                ],
            };
            exports.custodian2 = {
                PARENT: [exports.miniboss2],
                LABEL: 'Custodian',
                FACING_TYPE: 'looseToTarget',
                COLOR: 2,
                SHAPE: 3,
                SIZE: 48,
                VALUE: 500000,
                BODY: {
                    FOV: 1.5,
                    SPEED: base.SPEED * 0.25,
                    HEALTH: 40,
                    SHIELD: 1,
                    REGEN: 0.05,
                    DAMAGE: 5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,     -5,      50,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,    -5,      50,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      5,      70,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,     5,      70,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,      60,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,     0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,     -5,     170,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,    -5,     170,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      5,     190,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,     5,     190,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,     0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,     -5,     290,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,    -5,     290,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      5,     310,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,     5,     310,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     15,     0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 4.85,    10,     0,     120,    360,   1, ], 
                        TYPE: [exports.defendgun],
                        }, {
                    POSITION: [ 4.85,    10,     0,     240,    360,   1, ], 
                        TYPE: [exports.defendgun],
                        }, {
                    POSITION: [  11,     0,      0,     180,    360,   1, ], 
                        TYPE: [exports.custodiangun],
                        },
                ],
            };

            exports.hurricane = {
                PARENT: [exports.genericTank],
                LABEL: 'Hurricane',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,    3.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.flank, g.pure_gunner]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  15,    3.5,     1,      0,      0,      30,   0.25,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.flank, g.pure_gunner]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  15,    3.5,     1,      0,      0,      60,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.flank, g.pure_gunner]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  15,    3.5,     1,      0,      0,      90,   0.75,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.flank, g.pure_gunner]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  15,    3.5,     1,      0,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.flank, g.pure_gunner]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  15,    3.5,     1,      0,      0,     150,   0.25,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.flank, g.pure_gunner]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  15,    3.5,     1,      0,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.flank, g.pure_gunner]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  15,    3.5,     1,      0,      0,     210,   0.75,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.flank, g.pure_gunner]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  15,    3.5,     1,      0,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.flank, g.pure_gunner]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  15,    3.5,     1,      0,      0,     270,   0.25,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.flank, g.pure_gunner]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  15,    3.5,     1,      0,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.flank, g.pure_gunner]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  15,    3.5,     1,      0,      0,     330,   0.75,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.flank, g.pure_gunner]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.octog = {
                PARENT: [exports.miniboss],
                LABEL: 'Octogeddon',
                COLOR: 2,
                SHAPE: 8,
                SIZE: 22,
                VALUE: 150000,
                BODY: {
                    FOV: 1.3,
                    SPEED: base.SPEED * 0.25,
                    HEALTH: 90,
                    SHIELD: 1,
                    REGEN: 0.01,
                    DAMAGE: 3,
                },
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [   6,    4.7,     0,      0,     360,   1, ], 
                        TYPE: [exports.octogturret],
                        }, {
                    POSITION: [   6,    4.7,     0,     120,    360,   1, ], 
                        TYPE: [exports.octogturret],
                        }, {
                    POSITION: [   6,    4.7,     0,     240,    360,   1, ], 
                        TYPE: [exports.octogturret],
                        }, {
                    POSITION: [   6,    9.75,    0,      0,     180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,      45,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,      90,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,     135,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,     180,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,     225,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,     270,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,     315,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        },
                ],
            };
            exports.octog2 = {
                PARENT: [exports.miniboss2],
                LABEL: 'Octogeddon',
                COLOR: 2,
                SHAPE: 8,
                SIZE: 22,
                VALUE: 150000,
                BODY: {
                    FOV: 1.3,
                    SPEED: base.SPEED * 0.25,
                    HEALTH: 90,
                    SHIELD: 1,
                    REGEN: 0.01,
                    DAMAGE: 3,
                },
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [   6,    4.7,     0,      0,     360,   1, ], 
                        TYPE: [exports.octogturret],
                        }, {
                    POSITION: [   6,    4.7,     0,     120,    360,   1, ], 
                        TYPE: [exports.octogturret],
                        }, {
                    POSITION: [   6,    4.7,     0,     240,    360,   1, ], 
                        TYPE: [exports.octogturret],
                        }, {
                    POSITION: [   6,    9.75,    0,      0,     180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,      45,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,      90,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,     135,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,     180,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,     225,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,     270,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        }, {
                    POSITION: [   6,    9.75,    0,     315,    180,   0, ], 
                        TYPE: [exports.octogtrap],
                        },
                ],
            };

    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'Ninja Star',
                DANGER: 7,
                BODY: {
                    DAMAGE: base.DAMAGE * 1.15,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                        TYPE: exports.spikeBody1,
                        }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                        TYPE: exports.spikeBody2,
                    },
                ],
            };
            exports.quadtrapper = {
                PARENT: [exports.genericTank],
                DANGER: 8,
                LABEL: 'Steampunk',
                STAT_NAMES: statnames.block, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     45,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.quadtrap]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     135,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.quadtrap]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     225,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.quadtrap]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     315,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.quadtrap]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.bentboomer = {
                PARENT: [exports.genericTank],
                DANGER: 8,
                LABEL: 'Bent Boomer',
                STAT_NAMES: statnames.boomerang,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   8,    10,      1,      8,     -2,     -35,     0,   ],
                        }, {
                    POSITION: [   8,    10,      1,      8,      2,      35,     0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     16,    -2,     -35,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.bent]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   2,    10,     1.3,     16,     2,      35,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.bent]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };

            exports.ball = {
                PARENT: [exports.genericTank],
                LABEL: 'Ball',
                COLOR: 2,
                SIZE: 64,
                DANGER: 7,
            };

    exports.skimboss = {
        PARENT: [exports.miniboss],
        LABEL: 'Beer Cassowary',
        SIZE: 24,
        VALUE: 300000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: 15,
            SHIELD: 1,
            REGEN: 0.1,
            DAMAGE: 3,
        },
        SHAPE: 3, 
        COLOR: 2,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: [ exports.skimturret, { COLOR: 2 }, ],
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: [ exports.skimturret, { COLOR: 2 }, ],
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: [ exports.skimturret, { COLOR: 2 }, ],
                    },
        ],
    };
    exports.skimboss2 = {
        PARENT: [exports.miniboss2],
        LABEL: 'Beer Cassowary',
        SIZE: 24,
        VALUE: 300000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: 15,
            SHIELD: 1,
            REGEN: 0.1,
            DAMAGE: 3,
        },
        SHAPE: 3, 
        COLOR: 2,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     180, 0], 
                TYPE: [ exports.skimturret, { COLOR: 2 }, ],
                    }, {
            POSITION: [  15,     5,      0,     180,    180, 0], 
                TYPE: [ exports.skimturret, { COLOR: 2 }, ],
                    }, {
            POSITION: [  15,     5,      0,     300,    180, 0], 
                TYPE: [ exports.skimturret, { COLOR: 2 }, ],
                    },
        ],
    };

            exports.op_anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'OP Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [18.25,  19.5,     1,      0,      0,     -30,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.op_anni]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [18.25,  19.5,     1,      0,      0,      30,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.op_anni]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,   19.5,     1,      0,      0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.op_anni]),
                            TYPE: exports.bullet,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     0,      0,     180,    360,   1, ], 
                        TYPE: [exports.machine3gun],
                        },
                ],
            };

exports.guardian_lite = {
    PARENT: [exports.sentry],
    LABEL: 'Guardian Lite',
    SIZE: 15,
    DANGER: 3,
    BODY: {
        FOV: 0.65,
        HEALTH: 21.5,
    },
    GUNS: [{
        POSITION: [   6,     12,    1.25,    6,      0,     180,     0,    ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            }, },
    ],
};
exports.crasher_dasher = {
    PARENT: [exports.sentry],
    LABEL: 'Crasher Dasher',
    SIZE: 15,
    DANGER: 3,
    BODY: {
        FOV: 0.65,
        HEALTH: 20,
    },
    GUNS: [{
        POSITION: [   6,     12,    1.25,    6,      0,     180,     0,    ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            }, },
    ],
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  12,     0,      0,      0,     360,   1, ], 
            TYPE: [exports.autoTurret],
            },
    ],
};
exports.crash_fighter = {
    PARENT: [exports.sentry],
    LABEL: 'Crash Fighter',
    SIZE: 15,
    DANGER: 3,
    BODY: {
        FOV: 0.65,
        HEALTH: 21.5,
    },
    GUNS: [{
        POSITION: [  17,     4,      1,     -7,      7,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner, g.pound]),
                TYPE: exports.bullet,
            }, }, {
        POSITION: [  17,     4,      1,     -7,     -7,      0,     0.5,  ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner, g.pound]),
                TYPE: exports.bullet,
            }, }, {
        POSITION: [   6,     12,    1.25,    6,      0,     180,     0,    ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            }, },
    ],
};
exports.caltrop_fighter = {
    PARENT: [exports.sentry],
    LABEL: 'Caltrop Fighter',
    SIZE: 15,
    DANGER: 3,
    BODY: {
        FOV: 0.65,
        HEALTH: 25,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   6,     12,    1.25,    6,      0,      60,     0,    ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            }, }, {
        POSITION: [   6,     12,    1.25,    6,      0,     300,     0,    ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            }, }, {
        POSITION: [  15,     7,      1,     -2,      0,     180,     0,   ], 
            }, {
        POSITION: [   3,     7,     1.7,     13,     0,     180,     0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
exports.guardian_lite2 = {
    PARENT: [exports.sentry2],
    LABEL: 'Guardian Lite',
    SIZE: 15,
    DANGER: 3,
    BODY: {
        FOV: 0.65,
        HEALTH: 21.5,
    },
    GUNS: [{
        POSITION: [   6,     12,    1.25,    6,      0,     180,     0,    ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            }, },
    ],
};
exports.crasher_dasher2 = {
    PARENT: [exports.sentry2],
    LABEL: 'Crasher Dasher',
    SIZE: 15,
    DANGER: 3,
    BODY: {
        FOV: 0.65,
        HEALTH: 20,
    },
    GUNS: [{
        POSITION: [   6,     12,    1.25,    6,      0,     180,     0,    ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            }, },
    ],
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  12,     0,      0,      0,     360,   1, ], 
            TYPE: [exports.autoTurret],
            },
    ],
};
exports.crash_fighter2 = {
    PARENT: [exports.sentry2],
    LABEL: 'Crash Fighter',
    SIZE: 15,
    DANGER: 3,
    BODY: {
        FOV: 0.65,
        HEALTH: 21.5,
    },
    GUNS: [{
        POSITION: [  17,     4,      1,     -7,      7,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner, g.pound]),
                TYPE: exports.bullet,
            }, }, {
        POSITION: [  17,     4,      1,     -7,     -7,      0,     0.5,  ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner, g.pound]),
                TYPE: exports.bullet,
            }, }, {
        POSITION: [   6,     12,    1.25,    6,      0,     180,     0,    ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            }, },
    ],
};
exports.caltrop_fighter2 = {
    PARENT: [exports.sentry2],
    LABEL: 'Caltrop Fighter',
    SIZE: 15,
    DANGER: 3,
    BODY: {
        FOV: 0.65,
        HEALTH: 25,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   6,     12,    1.25,    6,      0,      60,     0,    ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            }, }, {
        POSITION: [   6,     12,    1.25,    6,      0,     300,     0,    ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            }, }, {
        POSITION: [  15,     7,      1,     -2,      0,     180,     0,   ], 
            }, {
        POSITION: [   3,     7,     1.7,     13,     0,     180,     0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};

    exports.babylevigun = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        SHAPE: 5,
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 27,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [ 4.5,     14,     1,      10,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto_turret, g.heavy3, g.giga3, g.levi]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
            exports.baby_leviathan = {
                PARENT: [exports.sentry],
                LABEL: 'Baby Leviathan',
                FACING_TYPE: 'autospin',
                COLOR: 14,
                SHAPE: 5,
                SIZE: 15,
                VALUE: 200000,
                AI: { NO_LEAD: false, },
                BODY: {
                    FOV: 0.75,
                    SPEED: base.SPEED * 1,
                    HEALTH: 20,
                    DAMAGE: 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   3,    8.9,    1.05,    8,      0,      36,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     108,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     180,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,    -108,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     -36,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, },
                ],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [   7,     0,      0,     180,    360, 1], 
                        TYPE: exports.babylevigun,
                            },
                ],
            };
            exports.baby_leviathan2 = {
                PARENT: [exports.sentry2],
                LABEL: 'Baby Leviathan',
                FACING_TYPE: 'autospin',
                COLOR: 14,
                SHAPE: 5,
                SIZE: 15,
                VALUE: 200000,
                AI: { NO_LEAD: false, },
                BODY: {
                    FOV: 0.75,
                    SPEED: base.SPEED * 1,
                    HEALTH: 20,
                    DAMAGE: 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   3,    8.9,    1.05,    8,      0,      36,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     108,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     180,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,    -108,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     -36,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, },
                ],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [   7,     0,      0,     180,    360, 1], 
                        TYPE: exports.babylevigun,
                            },
                ],
            };
exports.pentaSentryBody = {
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: 5,
    INDEPENDENT: true,
};
exports.penta_sentry = {
    PARENT: [exports.sentry],
    LABEL: 'Penta Sentry',
    COLOR: 14,
    SHAPE: 0,
    DANGER: 3,
    VALUE: 50000,
    BODY: {
        FOV: 0.65,
        HEALTH: 20,
    },
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,     180,    360,   1, ], 
            TYPE: [exports.autoTurret],
            }, {
        POSITION: [ 21.5,    0,      0,      0,     360,   0, ], 
            TYPE: [exports.pentaSentryBody],
            },
    ],
};
exports.penta_sentry2 = {
    PARENT: [exports.sentry2],
    LABEL: 'Penta Sentry',
    COLOR: 14,
    SHAPE: 0,
    DANGER: 3,
    VALUE: 50000,
    BODY: {
        FOV: 0.65,
        HEALTH: 20,
    },
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,     180,    360,   1, ], 
            TYPE: [exports.autoTurret],
            }, {
        POSITION: [ 21.5,    0,      0,      0,     360,   0, ], 
            TYPE: [exports.pentaSentryBody],
            },
    ],
};
exports.pentagonQuarsar = {
    PARENT: [exports.sentry],
    LABEL: 'Quintogen',
    COLOR: 14,
    SIZE: 16,
    SHAPE: 'M 1 0 L -0.1 0.8 L 0.1 0 L -0.1 -0.8 z M -0.1 0 L -0.25 0.3 L -1.2 0 L -0.25 -0.3 z',
    DANGER: 5,
    VALUE: 400,
    BODY: {
        FOV: base.FOV * 2,
        DAMAGE: 1.5,
        DENSITY: 8,
        HEALTH: 10 * 2,
        RESIST: 1.25,
        PENETRATION: 1.1,
        SPEED: 3,
    },
};

        exports.nest_defender = { 
            PARENT: [exports.sentry],
            TYPE: 'tank',
            FACING_TYPE: 'autospin',
            DANGER: 5,
            LABEL: 'Nest Defender',
            SHAPE: 7,
            SIZE: 24,
            BODY: {
                FOV: 1,
                SPEED: base.SPEED * 0.1,
                HEALTH: 1000,
            },
            VALUE: 100000,
        };
        exports.nest_defender2 = { 
            PARENT: [exports.sentry2],
            TYPE: 'tank',
            FACING_TYPE: 'autospin',
            DANGER: 5,
            LABEL: 'Nest Defender',
            SHAPE: 7,
            SIZE: 24,
            BODY: {
                FOV: 1,
                SPEED: base.SPEED * 0.1,
                HEALTH: 1000,
            },
            VALUE: 100000,
        };
exports.krimissile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 240,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,      0,     180,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.much_more_recoil, g.more_speed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, },
    ],
};
            exports.krigun = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.05,
                },
                LABEL: 'Launcher',
                DANGER: 6,
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    12,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    13,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim]),
                            TYPE: exports.krimissile,
                            LABEL: 'Launched',
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
    exports.kribody = {
        CONTROLLERS: ['reversespin'],
        DANGER: 5,
        COLOR: 14,
        SHAPE: 5,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [   9,     9,      0,      36,    190, 0], 
                TYPE: exports.krigun,
            }, {
            POSITION: [   9,     9,      0,     108,    180, 0], 
                TYPE: exports.krigun,
            }, {
            POSITION: [   9,     9,      0,     180,    180, 0], 
                TYPE: exports.krigun,
            }, {
            POSITION: [   9,     9,      0,    -108,    180, 0], 
                TYPE: exports.krigun,
            }, {
            POSITION: [   9,     9,      0,     -36,    180, 0], 
                TYPE: exports.krigun,
            },
        ],
    };
        exports.nestdefend_krios = { 
            PARENT: [exports.nest_defender],
            COLOR: 14,
            NAME: 'Krios',
            BODY: {
                SPEED: base.SPEED * 0.5,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.kribody,
                        }, {
                POSITION: [   6,     9,      0,    180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   -180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.nestdefend_krios2 = { 
            PARENT: [exports.nest_defender2],
            COLOR: 14,
            BODY: {
                SPEED: base.SPEED * 0.5,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.kribody,
                        }, {
                POSITION: [   6,     9,      0,    180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   -180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    exports.krisaucepart = {
        DANGER: 7,
        COLOR: 14,
        SHAPE: 5,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  11,     0,      0,      0,     360, 1], 
                TYPE: exports.levigun,
            },
        ],
    };
    exports.krisaucepart2 = {
        DANGER: 7,
        COLOR: 27,
        SHAPE: 5,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  11,     0,      0,      0,     360, 1], 
                TYPE: exports.krigun,
            },
        ],
    };
exports.krisaucemissile = {
    PARENT: [exports.missile],
    LABEL: 'Roto Missile',
    FACING_TYPE: 'fastautospin',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.more_speed, g.more_speed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
            }, }, {
        POSITION: [  14,     6,      1,      0,      0,     180,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.more_speed, g.more_speed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
            }, },
    ],
};
            exports.krisaucegun = {
                PARENT: [exports.genericTank],
                LABEL: 'Turret',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 5,
                },
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    12,     -0.5,   2.5,     0,      0,      0,  ], 
                        }, {
                    POSITION: [ 14.5,   14,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.arty, g.skim, g.fast_launch, g.levi]),
                            TYPE: exports.krisaucemissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, }, {
                    POSITION: [  11,    14,   -1.35,     0,      0,      0,      0,  ], 
                        },
                ],
            };
            exports.phase2saucegun = {
                PARENT: [exports.genericTank],
                LABEL: '(Pentavian) Polyvian Shredder',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 3,
                },
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 8.5,    16,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.mini_hive, g.hive, g.levi]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  14,    12,     -0.5,   2.5,     0,      0,      0,   ], 
                        }, {
                    POSITION: [ 14.5,   14,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.arty, g.skim, g.fast_launch, g.very_fast_launch, g.demoman, g.levi]),
                            TYPE: exports.krisaucemissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, }, {
                    POSITION: [  11,    14,   -1.35,     0,      0,      0,      0,  ], 
                        COLOR_SETTINGS: {
                            SKIN: 16,
                        }, },
                ],
            };
exports.pentaQuarsarDrone = {
    PARENT: [exports.drone],
    LABEL: 'Quarsar',
    COLOR: 14,
    SHAPE: 'M 1 0 L -0.1 0.8 L 0.1 0 L -0.1 -0.8 z M -0.1 0 L -0.25 0.3 L -1.2 0 L -0.25 -0.3 z',
    DANGER: 5,
    BODY: {
        FOV: base.FOV * 2,
        DAMAGE: 1.5 * wepDamageFactor,
        DENSITY: 8,
        HEALTH: 10 * wepHealthFactor,
        RESIST: 1.25,
        PENETRATION: 1.1,
        SPEED: 3,
    },
};
            exports.krisaucephase2 = {
                PARENT: [exports.miniboss2],
                LABEL: 'Pentatron',
                COLOR: 14,
                SHAPE: 5,
                SIZE: 30,
                VALUE: 150000,
                BODY: {
                    FOV: 1.3,
                    SPEED: base.SPEED * 0.5,
                    HEALTH: 25,
                    SHIELD: 1,
                    REGEN: 0.01,
                    DAMAGE: 3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    10,     0.01,    0,      0,      0,      0,  ],
                        COLOR_SETTINGS: {
                            COLOR: 14,
                        }, }, {
                    POSITION: [  18,    10,     0.01,    0,      0,      72,     0,  ],
                        COLOR_SETTINGS: {
                            COLOR: 14,
                        }, }, {
                    POSITION: [  18,    10,     0.01,    0,      0,     144,     0,  ],
                        COLOR_SETTINGS: {
                            COLOR: 14,
                        }, }, {
                    POSITION: [  18,    10,     0.01,    0,      0,    -144,     0,  ],
                        COLOR_SETTINGS: {
                            COLOR: 14,
                        }, }, {
                    POSITION: [  18,    10,     0.01,    0,      0,     -72,     0,  ],
                        COLOR_SETTINGS: {
                            COLOR: 14,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,      36,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                            TYPE: exports.pentaQuarsarDrone,
                            LABEL: '(Pentavian) Spawned',
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 3,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     108,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                            TYPE: exports.pentaQuarsarDrone,
                            LABEL: '(Pentavian) Spawned',
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 3,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     180,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                            TYPE: exports.pentaQuarsarDrone,
                            LABEL: '(Pentavian) Spawned',
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 3,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,    -108,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                            TYPE: exports.pentaQuarsarDrone,
                            LABEL: '(Pentavian) Spawned',
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 3,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     -36,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                            TYPE: exports.pentaQuarsarDrone,
                            LABEL: '(Pentavian) Spawned',
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 3,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.phase2saucegun],
                        },
                ],
            };
            exports.ai_krisaucephase2 = {
                PARENT: [exports.miniboss],
                LABEL: 'Pentatron',
                COLOR: 14,
                SHAPE: 5,
                SIZE: 30,
                VALUE: 150000,
                FRAG: [[exports.nestdefend_krios]],
                BODY: {
                    FOV: 1.3,
                    SPEED: base.SPEED * 0.5,
                    HEALTH: 25,
                    SHIELD: 1,
                    REGEN: 0.01,
                    DAMAGE: 3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    10,     0.01,    0,      0,      0,      0,  ],
                        COLOR_SETTINGS: {
                            COLOR: 14,
                        }, }, {
                    POSITION: [  18,    10,     0.01,    0,      0,      72,     0,  ],
                        COLOR_SETTINGS: {
                            COLOR: 14,
                        }, }, {
                    POSITION: [  18,    10,     0.01,    0,      0,     144,     0,  ],
                        COLOR_SETTINGS: {
                            COLOR: 14,
                        }, }, {
                    POSITION: [  18,    10,     0.01,    0,      0,    -144,     0,  ],
                        COLOR_SETTINGS: {
                            COLOR: 14,
                        }, }, {
                    POSITION: [  18,    10,     0.01,    0,      0,     -72,     0,  ],
                        COLOR_SETTINGS: {
                            COLOR: 14,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,      36,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                            TYPE: exports.pentaQuarsarDrone,
                            LABEL: '(Pentavian) Spawned',
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 3,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     108,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                            TYPE: exports.pentaQuarsarDrone,
                            LABEL: '(Pentavian) Spawned',
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 3,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     180,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                            TYPE: exports.pentaQuarsarDrone,
                            LABEL: '(Pentavian) Spawned',
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 3,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,    -108,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                            TYPE: exports.pentaQuarsarDrone,
                            LABEL: '(Pentavian) Spawned',
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 3,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     -36,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                            TYPE: exports.pentaQuarsarDrone,
                            LABEL: '(Pentavian) Spawned',
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 3,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.phase2saucegun],
                        },
                ],
                BROADCAST_MESSAGE: 'After all, (Krios) also hates you!',
            };
            exports.krios_saucer = {
                PARENT: [exports.miniboss],
                LABEL: 'Krios Saucer',
                COLOR: 14,
                SHAPE: 5,
                SIZE: 30,
                VALUE: 300000,
                BODY: {
                    FOV: 1.3,
                    SPEED: base.SPEED * 0.05,
                    HEALTH: 50,
                    SHIELD: 1,
                    REGEN: 0.01,
                    DAMAGE: 3,
                },
                FRAG: [[exports.ai_krisaucephase2, {NAME: 'Krios'}]],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   3,    8.9,    1.05,    8,      0,      36,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.fallen_overlord]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 6,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     108,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.fallen_overlord]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 6,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     180,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.fallen_overlord]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 6,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,    -108,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.fallen_overlord]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 6,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     -36,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.fallen_overlord]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 6,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  23,     35,     0,      0,      0,    1, ], 
                        TYPE: [exports.krisaucepart],
                        }, {
                    POSITION: [  23,     35,     0,      36,     0,    1, ], 
                        TYPE: [exports.krisaucepart2],
                        }, {
                    POSITION: [  23,     35,     0,      72,     0,    1, ], 
                        TYPE: [exports.krisaucepart],
                        }, {
                    POSITION: [  23,     35,     0,     108,     0,    1, ], 
                        TYPE: [exports.krisaucepart2],
                        }, {
                    POSITION: [  23,     35,     0,     144,     0,    1, ], 
                        TYPE: [exports.krisaucepart],
                        }, {
                    POSITION: [  23,     35,     0,     180,     0,    1, ], 
                        TYPE: [exports.krisaucepart2],
                        }, {
                    POSITION: [  23,     35,     0,    -144,     0,    1, ], 
                        TYPE: [exports.krisaucepart],
                        }, {
                    POSITION: [  23,     35,     0,    -108,     0,    1, ], 
                        TYPE: [exports.krisaucepart2],
                        }, {
                    POSITION: [  23,     35,     0,     -72,     0,    1, ], 
                        TYPE: [exports.krisaucepart],
                        }, {
                    POSITION: [  23,     35,     0,     -36,     0,    1, ], 
                        TYPE: [exports.krisaucepart2],
                        }, {
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.krisaucegun],
                        },
                ],
                BROADCAST_MESSAGE: 'Hee hee hee, attack these foolish tanks! Quarsars & Nest Defenders!',
            };
            exports.krios_saucer2 = {
                PARENT: [exports.miniboss2],
                LABEL: 'Krios Saucer',
                COLOR: 14,
                SHAPE: 5,
                SIZE: 30,
                VALUE: 300000,
                BODY: {
                    FOV: 1.3,
                    SPEED: base.SPEED * 0.05,
                    HEALTH: 50,
                    SHIELD: 1,
                    REGEN: 0.01,
                    DAMAGE: 3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   3,    8.9,    1.05,    8,      0,      36,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.fallen_overlord]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 6,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     108,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.fallen_overlord]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 6,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     180,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.fallen_overlord]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 6,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,    -108,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.fallen_overlord]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 6,
                        }, }, {
                    POSITION: [   3,    8.9,    1.05,    8,      0,     -36,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.fallen_overlord]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            MAX_CHILDREN: 6,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  23,     35,     0,      0,      0,    1, ], 
                        TYPE: [exports.krisaucepart],
                        }, {
                    POSITION: [  23,     35,     0,      36,     0,    1, ], 
                        TYPE: [exports.krisaucepart2],
                        }, {
                    POSITION: [  23,     35,     0,      72,     0,    1, ], 
                        TYPE: [exports.krisaucepart],
                        }, {
                    POSITION: [  23,     35,     0,     108,     0,    1, ], 
                        TYPE: [exports.krisaucepart2],
                        }, {
                    POSITION: [  23,     35,     0,     144,     0,    1, ], 
                        TYPE: [exports.krisaucepart],
                        }, {
                    POSITION: [  23,     35,     0,     180,     0,    1, ], 
                        TYPE: [exports.krisaucepart2],
                        }, {
                    POSITION: [  23,     35,     0,    -144,     0,    1, ], 
                        TYPE: [exports.krisaucepart],
                        }, {
                    POSITION: [  23,     35,     0,    -108,     0,    1, ], 
                        TYPE: [exports.krisaucepart2],
                        }, {
                    POSITION: [  23,     35,     0,     -72,     0,    1, ], 
                        TYPE: [exports.krisaucepart],
                        }, {
                    POSITION: [  23,     35,     0,     -36,     0,    1, ], 
                        TYPE: [exports.krisaucepart2],
                        }, {
                    POSITION: [  11,     0,      0,      0,     360,   1, ], 
                        TYPE: [exports.krisaucegun],
                        },
                ],
            };

exports.rareSentry = {
    PARENT: [exports.sentry],
    DANGER: 3,
    COLOR: 31,
    VALUE: 3000,
};
exports.rareSentry2 = {
    PARENT: [exports.sentry2],
    DANGER: 3,
    COLOR: 31,
    VALUE: 3000,
};
exports.rareSentrySwarm = {
    PARENT: [exports.rareSentry],
    LABEL: 'PS3_33 Lite',
    DANGER: 3,
    GUNS: [{
        POSITION: [    6,    12,    1.25,    6,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.more_recoil, g.double_reload]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.rareSentrySwarm2 = {
    PARENT: [exports.rareSentry2],
    LABEL: 'PS3_33 Lite',
    DANGER: 3,
    GUNS: [{
        POSITION: [    6,    12,    1.25,    6,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.more_recoil, g.double_reload]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
        exports.rareSentryTurret = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Turret',
            BODY: {
                FOV: 3,
            },
            CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
            COLOR: 16,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Primary',
                    }, },
            ],
        };
exports.rareSentryGun = makeAuto(exports.rareSentry, 'Sentry', { type: exports.rareSentryTurret, size: 12, });
exports.rareSentryGun2 = makeAuto(exports.rareSentry2, 'Sentry', { type: exports.rareSentryTurret, size: 12, });
            exports.rareSentryTrapTurret = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Turret',
                BODY: {
                    FOV: 4.15,
                },
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
                COLOR: 16,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.rareSentryTrap = makeAuto(exports.rareSentry, 'Sentry', { type: exports.rareSentryTrapTurret, size: 12, });
exports.rareSentryTrap2 = makeAuto(exports.rareSentry2, 'Sentry', { type: exports.rareSentryTrapTurret, size: 12, });

            exports.tetgun = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.2,
                },
                LABEL: 'Clicker',
                DANGER: 6,
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     4,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  23,     4,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  23,     4,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  23,     4,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  24,     4,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   8,    8.5,    -1.5,    5,      0,      0,      0,  ], 
                        },
                ],
            };
    exports.tetbody = {
        CONTROLLERS: ['reversespin'],
        DANGER: 5,
        COLOR: 31,
        SHAPE: 5,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [   9,     9,      0,      36,    190, 0], 
                TYPE: exports.tetgun,
            }, {
            POSITION: [   9,     9,      0,     108,    180, 0], 
                TYPE: exports.tetgun,
            }, {
            POSITION: [   9,     9,      0,     180,    180, 0], 
                TYPE: exports.tetgun,
            }, {
            POSITION: [   9,     9,      0,    -108,    180, 0],
                TYPE: exports.tetgun,
            }, {
            POSITION: [   9,     9,      0,     -36,    180, 0], 
                TYPE: exports.tetgun,
            },
        ],
    };
        exports.nestdefend_tethys = { 
            PARENT: [exports.nest_defender],
            COLOR: 31,
            NAME: 'Tethys',
            BODY: {
                SPEED: base.SPEED * 0.5,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [ 12.5,    0,      0,      0,     360, 1], 
                    TYPE: exports.tetbody,
                        }, {
                POSITION: [   6,     9,      0,    180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   -180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.namelessdefend_tethys = { 
            PARENT: [exports.nest_defender],
            COLOR: 31,
            BODY: {
                SPEED: base.SPEED * 0.5,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.tetbody,
                        }, {
                POSITION: [   6,     9,      0,    180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   -180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.nestdefend_tethys2 = { 
            PARENT: [exports.nest_defender2],
            COLOR: 31,
            BODY: {
                SPEED: base.SPEED * 0.5,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.tetbody,
                        }, {
                POSITION: [   6,     9,      0,    180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   -180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };

exports.defendOfShiniesMinPupil = {
    COLOR: 31,
    SHAPE: 0,
    INDEPENDENT: true,
};
exports.defendOfShiniesMinEye = {
    COLOR: 9,
    SHAPE: 0,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     4,      0,      0,      0,   1],
            TYPE: exports.defendOfShiniesMinPupil,
                },
    ],
};
            exports.defendOfShiniesMin = {
                PARENT: [exports.minion],
                LABEL: 'Shiny Hesperian Helper',
                COLOR: 31,
                SHAPE: 135,
                BODY: {
                    FOV: 1.25,
                    SPEED: base.SPEED * 0.5,
                    HEALTH: 15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [10.25,    0,      0,      0,     360,  1, ], 
                        TYPE: [exports.defendOfShiniesMinEye],
                        },
                ],
            };
            exports.defendOfShiniesMin2 = {
                PARENT: [exports.minion],
                LABEL: 'Shiny Hesperian Helper',
                COLOR: 31,
                SHAPE: 135,
                BODY: {
                    FOV: 1.25,
                    SPEED: base.SPEED * 0.5,
                    HEALTH: 15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [7.625,    6,      0,      90,    360,  1, ], 
                        TYPE: [exports.defendOfShiniesMinEye],
                        }, {
                    POSITION: [7.625,    6,      0,     270,    360,  1, ], 
                        TYPE: [exports.defendOfShiniesMinEye],
                        },
                ],
            };
            exports.defendOfShiniesMin3 = {
                PARENT: [exports.minion],
                LABEL: 'Shiny Hesperian Helper',
                COLOR: 31,
                SHAPE: 135,
                BODY: {
                    FOV: 1.25,
                    SPEED: base.SPEED * 0.5,
                    HEALTH: 15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.gunner]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [   5,     6,      0,      60,    360,  1, ], 
                        TYPE: [exports.defendOfShiniesMinEye],
                        }, {
                    POSITION: [   5,     6,      0,     180,    360,  1, ], 
                        TYPE: [exports.defendOfShiniesMinEye],
                        }, {
                    POSITION: [   5,     6,      0,     300,    360,  1, ], 
                        TYPE: [exports.defendOfShiniesMinEye],
                        },
                ],
            };
            exports.defendOfShiniesGun = {
                PARENT: [exports.genericTank],
                LABEL: 'Swarmer',
                BODY: {
                    FOV: 1.25,
                },
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.one_third_reload, g.five, g.five, g.five, g.hive, g.more_speed, g.more_speed, g.more_speed, g.double_range, g.no_recoil]),
                            TYPE: exports.hive,
                        }, },
                ],
            };
exports.defendOfShiniesP2Pupil = {
    COLOR: 21,
    SHAPE: 0,
    INDEPENDENT: true,
};
exports.defendOfShiniesP2Eye = {
    COLOR: 9,
    SHAPE: 0,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     4,      0,      0,      0,   1],
            TYPE: exports.defendOfShiniesP2Pupil,
                },
    ],
};
            exports.defendOfShiniesP2Gun = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.2,
                },
                LABEL: 'Void Knocker',
                DANGER: 6,
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mach, g.click, g.sgun]),
                            TYPE: exports.bullet,
                        },
                        COLOR_SETTINGS: {
                            SKIN: 15,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mach, g.click, g.sgun]),
                            TYPE: exports.casing,
                        },
                        COLOR_SETTINGS: {
                            SKIN: 15,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mach, g.click, g.sgun]),
                            TYPE: exports.casing,
                        },
                        COLOR_SETTINGS: {
                            SKIN: 15,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mach, g.click, g.sgun]),
                            TYPE: exports.casing,
                        },
                        COLOR_SETTINGS: {
                            SKIN: 15,
                        }, }, {
                    POSITION: [   8,    8.5,    -1.5,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mach, g.click, g.sgun, g.fake]),
                            TYPE: exports.casing,
                        }, },
                ],
            };
            exports.defendOfShiniesP2Hand = {
                PARENT: [exports.genericTank],
                LABEL: 'Swarmer',
                SHAPE: 135,
                COLOR: 21,
                BODY: {
                    FOV: 1.25,
                },
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.one_third_reload, g.five, g.five, g.five, g.hive, g.more_speed, g.more_speed, g.more_speed, g.double_range]),
                            TYPE: exports.hive,
                        }, },
                ],
            };
    exports.defendOfShiniesP2Ring1 = {
        LABEL: 'Base Nucleus',
        CONTROLLERS: ['spin'],
        COLOR: 21,
        SHAPE: 136,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [ 4.65,   9.85,    0,      0,     190, 1], 
                TYPE: exports.defendOfShiniesP2Hand,
                }, {
            POSITION: [ 4.65,   9.85,    0,     120,    190, 1], 
                TYPE: exports.defendOfShiniesP2Hand,
                }, {
            POSITION: [ 4.65,   9.85,    0,     240,    190, 1], 
                TYPE: exports.defendOfShiniesP2Hand,
                },
        ],
    };
    exports.defendOfShiniesP2Ring2 = {
        LABEL: 'Base Nucleus',
        CONTROLLERS: ['reversespin'],
        COLOR: 21,
        SHAPE: 136,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [ 4.65,   9.85,    0,      0,     190, 1], 
                TYPE: exports.defendOfShiniesP2Hand,
                }, {
            POSITION: [ 4.65,   9.85,    0,     120,    190, 1], 
                TYPE: exports.defendOfShiniesP2Hand,
                }, {
            POSITION: [ 4.65,   9.85,    0,     240,    190, 1], 
                TYPE: exports.defendOfShiniesP2Hand,
                },
        ],
    };
    exports.defendOfShiniesP2Chip = {
        PARENT: [exports.drone],
        SHAPE: 125,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 1.25,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: true,
    };
            exports.defendOfShiniesP2MinTurret = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                COLOR: 12,
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        },
                        COLOR_SETTINGS: {
                            COLOR: 12,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        },
                        COLOR_SETTINGS: {
                            COLOR: 12,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        },
                        COLOR_SETTINGS: {
                            COLOR: 12,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        },
                        COLOR_SETTINGS: {
                            COLOR: 12,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        },
                        COLOR_SETTINGS: {
                            COLOR: 12,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        },
                        COLOR_SETTINGS: {
                            COLOR: 12,
                        }, },
                ],
            };
    exports.defendOfShiniesP2Explosion = {
        PARENT: [exports.bullet],
        SHAPE: 125,
        FACING_TYPE: 'fastautospin',
    };
            exports.defendOfShiniesP2Min = {
                PARENT: [exports.minion],
                LABEL: 'Mini Sugar Cube',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.4,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 125,
                FACING_TYPE: 'autospin',
                INDEPEDENT: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   1,     10,    1.2,     5,      0,      45,     0    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                            TYPE: [exports.defendOfShiniesP2Explosion, {PERSISTS_AFTER_DEATH: true}],
                            SHOOT_ON_DEATH: true,
                        }, }, {
                    POSITION: [   1,     10,    1.2,     5,      0,     135,     0    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                            TYPE: [exports.defendOfShiniesP2Explosion, {PERSISTS_AFTER_DEATH: true}],
                            SHOOT_ON_DEATH: true,
                        }, }, {
                    POSITION: [   1,     10,    1.2,     5,      0,     225,     0    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                            TYPE: [exports.defendOfShiniesP2Explosion, {PERSISTS_AFTER_DEATH: true}],
                            SHOOT_ON_DEATH: true,
                        }, }, {
                    POSITION: [   1,     10,    1.2,     5,      0,     315,     0    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                            TYPE: [exports.defendOfShiniesP2Explosion, {PERSISTS_AFTER_DEATH: true}],
                            SHOOT_ON_DEATH: true,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.summon]),
                            TYPE: exports.defendOfShiniesP2Chip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            MAX_CHILDREN: 3,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.summon]),
                            TYPE: exports.defendOfShiniesP2Chip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            MAX_CHILDREN: 3,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.summon]),
                            TYPE: exports.defendOfShiniesP2Chip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            MAX_CHILDREN: 3,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.summon]),
                            TYPE: exports.defendOfShiniesP2Chip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            MAX_CHILDREN: 3,
                        }, },
                ],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     0,      0,     180,    360,  1],
                        TYPE: exports.defendOfShiniesP2MinTurret,
                            },
                ],
            };
        exports.defendOfShiniesPhase2 = {
            PARENT: [exports.miniboss2],
            LABEL: 'Defender of Shinies',
            COLOR: 21,
            SHAPE: 6,
            SIZE: 24,
            VALUE: 150000,
            BODY: {
                FOV: 1.5,
                SPEED: base.SPEED * 0.05,
                HEALTH: 30,
                SHIELD: base.SHIELD * 1.25,
                REGEN: base.REGEN,
                DAMAGE: 3,
                DENSITY: 10,
                PENETRATION: 1,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [ 4.5,     2,      1,     7.5,    -2,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [ 4.5,     2,      1,     7.5,     2,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   6,     2,      1,     7.5,     0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [ 4.5,     2,      1,     7.5,    -2,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [ 4.5,     2,      1,     7.5,     2,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   6,     2,      1,     7.5,     0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [ 4.5,     2,      1,     7.5,    -2,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [ 4.5,     2,      1,     7.5,     2,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   6,     2,      1,     7.5,     0,     300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   3,     4,      1.6,    8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.double_size]),
                        TYPE: exports.defendOfShiniesP2Min,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    },
                    COLOR_SETTINGS: {
                        SKIN: 2,
                    }, }, {
                POSITION: [   3,     4,      1.6,    8,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.double_size]),
                        TYPE: exports.defendOfShiniesP2Min,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    },
                    COLOR_SETTINGS: {
                        SKIN: 2,
                    }, }, {
                POSITION: [   3,     4,      1.6,    8,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.double_size]),
                        TYPE: exports.defendOfShiniesP2Min,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    },
                    COLOR_SETTINGS: {
                        SKIN: 2,
                    }, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,     7,      0,      30,    360,  1],
                    TYPE: exports.defendOfShiniesP2Gun,
                        }, {
                POSITION: [   5,     7,      0,      90,    360,  1],
                    TYPE: exports.defendOfShiniesP2Eye,
                        }, {
                POSITION: [   5,     7,      0,     150,    360,  1],
                    TYPE: exports.defendOfShiniesP2Gun,
                        }, {
                POSITION: [   5,     7,      0,     210,    360,  1],
                    TYPE: exports.defendOfShiniesP2Eye,
                        }, {
                POSITION: [   5,     7,      0,     270,    360,  1],
                    TYPE: exports.defendOfShiniesP2Gun,
                        }, {
                POSITION: [   5,     7,      0,     330,    360,  1],
                    TYPE: exports.defendOfShiniesP2Eye,
                        }, {
                POSITION: [  34,     0,      0,      0,     360,  0],
                    TYPE: exports.defendOfShiniesP2Ring1,
                        }, {
                POSITION: [  34,     0,      0,      0,     360,  0],
                    TYPE: exports.defendOfShiniesP2Ring2,
                        },
            ],
        };
        exports.ai_defendOfShiniesPhase2 = {
            PARENT: [exports.miniboss],
            LABEL: 'Defender of Shinies',
            COLOR: 21,
            SHAPE: 6,
            SIZE: 24,
            VALUE: 150000,
            BODY: {
                FOV: 1.5,
                SPEED: base.SPEED * 0.05,
                HEALTH: 30,
                SHIELD: base.SHIELD * 1.25,
                REGEN: base.REGEN,
                DAMAGE: 3,
                DENSITY: 10,
                PENETRATION: 1,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [ 4.5,     2,      1,     7.5,    -2,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [ 4.5,     2,      1,     7.5,     2,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   6,     2,      1,     7.5,     0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [ 4.5,     2,      1,     7.5,    -2,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [ 4.5,     2,      1,     7.5,     2,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   6,     2,      1,     7.5,     0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [ 4.5,     2,      1,     7.5,    -2,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [ 4.5,     2,      1,     7.5,     2,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   6,     2,      1,     7.5,     0,     300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.triplet, g.pound, g.destroy, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   3,     4,      1.6,    8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.double_size]),
                        TYPE: exports.defendOfShiniesP2Min,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 2,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    },
                    COLOR_SETTINGS: {
                        SKIN: 2,
                    }, }, {
                POSITION: [   3,     4,      1.6,    8,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.double_size]),
                        TYPE: exports.defendOfShiniesP2Min,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 2,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    },
                    COLOR_SETTINGS: {
                        SKIN: 2,
                    }, }, {
                POSITION: [   3,     4,      1.6,    8,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.double_size]),
                        TYPE: exports.defendOfShiniesP2Min,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 2,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    },
                    COLOR_SETTINGS: {
                        SKIN: 2,
                    }, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,     7,      0,      30,    360,  1],
                    TYPE: exports.defendOfShiniesP2Gun,
                        }, {
                POSITION: [   5,     7,      0,      90,    360,  1],
                    TYPE: exports.defendOfShiniesP2Eye,
                        }, {
                POSITION: [   5,     7,      0,     150,    360,  1],
                    TYPE: exports.defendOfShiniesP2Gun,
                        }, {
                POSITION: [   5,     7,      0,     210,    360,  1],
                    TYPE: exports.defendOfShiniesP2Eye,
                        }, {
                POSITION: [   5,     7,      0,     270,    360,  1],
                    TYPE: exports.defendOfShiniesP2Gun,
                        }, {
                POSITION: [   5,     7,      0,     330,    360,  1],
                    TYPE: exports.defendOfShiniesP2Eye,
                        }, {
                POSITION: [  34,     0,      0,      0,     360,  0],
                    TYPE: exports.defendOfShiniesP2Ring1,
                        }, {
                POSITION: [  34,     0,      0,      0,     360,  0],
                    TYPE: exports.defendOfShiniesP2Ring2,
                        },
            ],
        };
        exports.defendOfShinies = {
            PARENT: [exports.miniboss],
            LABEL: 'Defender of Shinies',
            COLOR: 31,
            SHAPE: 6,
            SIZE: 24,
            VALUE: 150000,
            FRAG: [[exports.ai_defendOfShiniesPhase2, {NAME: 'Tethys'}]],
            BODY: {
                FOV: 1.5,
                SPEED: base.SPEED * 0.05,
                HEALTH: 30,
                SHIELD: base.SHIELD * 1.25,
                REGEN: base.REGEN,
                DAMAGE: 3,
                DENSITY: 10,
                PENETRATION: 1,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,  11.5,    -1.3,    6,      0,      60,     0,   ], 
                    COLOR_SETTINGS: {
                        COLOR: 31,
                    }, }, {
                POSITION: [  4.5,  11.5,    -1.3,    6,      0,     180,     0,   ], 
                    COLOR_SETTINGS: {
                        COLOR: 31,
                    }, }, {
                POSITION: [  4.5,  11.5,    -1.3,    6,      0,     300,     0,   ], 
                    COLOR_SETTINGS: {
                        COLOR: 31,
                    }, }, {
                POSITION: [  4.5,   8.5,    -1.5,    7,      0,      60,     0,   ], 
                    COLOR_SETTINGS: {
                        COLOR: 31,
                    }, }, {
                POSITION: [  4.5,   8.5,    -1.5,    7,      0,     180,     0,   ], 
                    COLOR_SETTINGS: {
                        COLOR: 31,
                    }, }, {
                POSITION: [  4.5,   8.5,    -1.5,    7,      0,     300,     0,   ], 
                    COLOR_SETTINGS: {
                        COLOR: 31,
                    }, }, {
                POSITION: [   4,     6,     -1.6,    8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.defendOfShiniesMin,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 4,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,     6,     -1.6,    8,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.defendOfShiniesMin2,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 4,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,     6,     -1.6,    8,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.defendOfShiniesMin3,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 4,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,     300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,     7,      0,      30,    360,  1],
                    TYPE: exports.tetgun,
                        }, {
                POSITION: [   5,     7,      0,      90,    360,  1],
                    TYPE: exports.defendOfShiniesGun,
                        }, {
                POSITION: [   5,     7,      0,     150,    360,  1],
                    TYPE: exports.tetgun,
                        }, {
                POSITION: [   5,     7,      0,     210,    360,  1],
                    TYPE: exports.defendOfShiniesGun,
                        }, {
                POSITION: [   5,     7,      0,     270,    360,  1],
                    TYPE: exports.tetgun,
                        }, {
                POSITION: [   5,     7,      0,     330,    360,  1],
                    TYPE: exports.defendOfShiniesGun,
                        },
            ],
            BROADCAST_MESSAGE: 'Move away, he\'s calling out for a little surprise...',
        };
        exports.defendOfShinies2 = {
            PARENT: [exports.miniboss2],
            LABEL: 'Defender of Shinies',
            COLOR: 31,
            SHAPE: 6,
            SIZE: 24,
            VALUE: 150000,
            BODY: {
                FOV: 1.5,
                SPEED: base.SPEED * 0.05,
                HEALTH: 30,
                SHIELD: base.SHIELD * 1.25,
                REGEN: base.REGEN,
                DAMAGE: 3,
                DENSITY: 10,
                PENETRATION: 1,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,  11.5,    -1.3,    6,      0,      60,     0,   ], 
                    COLOR_SETTINGS: {
                        COLOR: 31,
                    }, }, {
                POSITION: [  4.5,  11.5,    -1.3,    6,      0,     180,     0,   ], 
                    COLOR_SETTINGS: {
                        COLOR: 31,
                    }, }, {
                POSITION: [  4.5,  11.5,    -1.3,    6,      0,     300,     0,   ], 
                    COLOR_SETTINGS: {
                        COLOR: 31,
                    }, }, {
                POSITION: [  4.5,   8.5,    -1.5,    7,      0,      60,     0,   ], 
                    COLOR_SETTINGS: {
                        COLOR: 31,
                    }, }, {
                POSITION: [  4.5,   8.5,    -1.5,    7,      0,     180,     0,   ], 
                    COLOR_SETTINGS: {
                        COLOR: 31,
                    }, }, {
                POSITION: [  4.5,   8.5,    -1.5,    7,      0,     300,     0,   ], 
                    COLOR_SETTINGS: {
                        COLOR: 31,
                    }, }, {
                POSITION: [   4,     6,     -1.6,    8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.defendOfShiniesMin,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 4,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,     6,     -1.6,    8,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.defendOfShiniesMin2,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 4,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [   4,     6,     -1.6,    8,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.defendOfShiniesMin3,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        AUTOFIRE: true,
                        MAX_CHILDREN: 4,
                        SYNCS_SKILLS: true,
                        WAIT_TO_CYCLE: true,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,     300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,     7,      0,      30,    360,  1],
                    TYPE: exports.tetgun,
                        }, {
                POSITION: [   5,     7,      0,      90,    360,  1],
                    TYPE: exports.defendOfShiniesGun,
                        }, {
                POSITION: [   5,     7,      0,     150,    360,  1],
                    TYPE: exports.tetgun,
                        }, {
                POSITION: [   5,     7,      0,     210,    360,  1],
                    TYPE: exports.defendOfShiniesGun,
                        }, {
                POSITION: [   5,     7,      0,     270,    360,  1],
                    TYPE: exports.tetgun,
                        }, {
                POSITION: [   5,     7,      0,     330,    360,  1],
                    TYPE: exports.defendOfShiniesGun,
                        },
            ],
        };

            exports.defend_lite = {
                PARENT: [exports.sentry],
                LABEL: 'Defender Lite',
                COLOR: 2,
                SHAPE: 3,
                SIZE: 12,
                VALUE: 30000,
                BODY: {
                    FOV: 1.15,
                    SPEED: base.SPEED * 2.5,
                    HEALTH: 20,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,     -2,      0,      60,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     13,     0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,     -2,      0,     180,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     13,     0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,     -2,      0,     300,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     13,     0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  9.7,    0,      0,     180,    360,   1, ], 
                        TYPE: [exports.defendgun],
                        },
                ],
            };
            exports.defend_lite2 = {
                PARENT: [exports.sentry2],
                LABEL: 'Defender Lite',
                COLOR: 2,
                SHAPE: 3,
                SIZE: 12,
                VALUE: 30000,
                BODY: {
                    FOV: 1.15,
                    SPEED: base.SPEED * 2.5,
                    HEALTH: 20,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,     -2,      0,      60,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     13,     0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,     -2,      0,     180,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     13,     0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,     -2,      0,     300,     0,   ], 
                        }, {
                    POSITION: [   3,     7,     1.7,     13,     0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.defend]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
                TURRETS: [{
                    /*********  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  9.7,    0,      0,     180,    360,   1, ], 
                        TYPE: [exports.defendgun],
                        },
                ],
            };
exports.triangleCascade = {
    PARENT: [exports.sentry],
    LABEL: 'Cascade',
    COLOR: 2,
    SHAPE: 3,
    SIZE: 15,
    VALUE: 50000,
    BODY: {
        FOV: 1.15,
        SPEED: base.SPEED * 3,
        HEALTH: 35,
    },
    DANGER: 5,
    GUNS: [{
        POSITION: [    6,    12,    1.25,    6,     0,    180,     0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 15,
            }, },
    ],
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  14,     8,      0,      60,    180,   0, ], 
            TYPE: [exports.autoTurret],
            }, {
        POSITION: [  14,     8,      0,     300,    180,   0, ], 
            TYPE: [exports.autoTurret],
            },
    ],
};
exports.triangleCascade2 = {
    PARENT: [exports.sentry2],
    LABEL: 'Cascade',
    COLOR: 2,
    SHAPE: 3,
    SIZE: 15,
    VALUE: 50000,
    BODY: {
        FOV: 1.15,
        SPEED: base.SPEED * 3,
        HEALTH: 35,
    },
    DANGER: 5,
    GUNS: [{
        POSITION: [    6,    12,    1.25,    6,     0,    180,     0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 15,
            }, },
    ],
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  14,     8,      0,      60,    180,   0, ], 
            TYPE: [exports.autoTurret],
            }, {
        POSITION: [  14,     8,      0,     300,    180,   0, ], 
            TYPE: [exports.autoTurret],
            },
    ],
};
exports.mneBullet = {
    PARENT: [exports.autoswarm],
    LABEL: 'Heat Missile',
    SHAPE: 0,
};
        exports.mnegun = {
            PARENT: [exports.genericTank],
            LABEL: 'Heatseeker',
            DANGER: 6,
            CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
            BODY: {
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   24,    8.5,     1,      0,      0,      0,      0,   ], 
                    }, {
                POSITION: [    3,     16,    1.2,     21,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic]),
                        TYPE: exports.mneBullet,
                    }, },
            ],
        };
    exports.mnebody = {
        CONTROLLERS: ['reversespin'],
        DANGER: 5,
        COLOR: 2,
        SHAPE: 5,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [   9,     9,      0,      36,    190, 0], 
                TYPE: exports.mnegun,
            }, {
            POSITION: [   9,     9,      0,     108,    180, 0], 
                TYPE: exports.mnegun,
            }, {
            POSITION: [   9,     9,      0,     180,    180, 0], 
                TYPE: exports.mnegun,
            }, {
            POSITION: [   9,     9,      0,    -108,    180, 0], 
                TYPE: exports.mnegun,
            }, {
            POSITION: [   9,     9,      0,     -36,    180, 0], 
                TYPE: exports.mnegun,
            },
        ],
    };
        exports.nestdefend_mnemosyne = { 
            PARENT: [exports.nest_defender],
            COLOR: 2,
            NAME: 'Mnemosyne',
            BODY: {
                SPEED: base.SPEED * 0.5,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.mnebody,
                        }, {
                POSITION: [   6,     9,      0,    180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   -180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.nestdefend_mnemosyne2 = { 
            PARENT: [exports.nest_defender2],
            COLOR: 2,
            BODY: {
                SPEED: base.SPEED * 0.5,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.mnebody,
                        }, {
                POSITION: [   6,     9,      0,    180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,   -180/7,    45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*3,   45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,  -180/7*5,   45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
            exports.megaCascadeGun = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
                BODY: {
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                     }, },
                ],
            };
exports.cascadeMin = {
    PARENT: [exports.minion],
    LABEL: 'Cascade',
    SHAPE: 3,
    BODY: {
        FOV: 1.15,
        SPEED: base.SPEED * 3,
        HEALTH: 35,
    },
    DANGER: 5,
    GUNS: [{
        POSITION: [    6,    12,    1.25,    6,     0,    180,     0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.guardian]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 15,
            }, },
    ],
    TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  14,     8,      0,      60,    180,   0, ], 
            TYPE: [exports.autoTurret],
            }, {
        POSITION: [  14,     8,      0,     300,    180,   0, ], 
            TYPE: [exports.autoTurret],
            },
    ],
};
        exports.mega_cascade = {
            PARENT: [exports.miniboss],
            LABEL: 'Mega Cascade',
            FACING_TYPE: 'looseToTarget',
            COLOR: 2,
            SHAPE: 3,
            SIZE: 60,
            VALUE: 500000,
            BODY: {
                FOV: 1.5,
                SPEED: base.SPEED,
                HEALTH: 70,
                SHIELD: base.SHIELD * 1.25,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 2.5,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,    12,     1.25,    6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.cascadeMin,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,
                        MAX_CHILDREN: 5,
                    }, }, {
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ], 
                    }, {
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ], 
                    },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   6,     7,      0,     120,    360,   1, ], 
                    TYPE: [exports.mnegun],
                    }, {
                POSITION: [   6,     7,      0,     240,    360,   1, ],
                    TYPE: [exports.mnegun],
                    }, {
                POSITION: [  10,     8,      0,      60,    180,   0, ],
                    TYPE: [exports.megaCascadeGun],
                    }, {
                POSITION: [  10,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.megaCascadeGun],
                    }, {
                POSITION: [   5,     0,      0,     180,    360,   1, ],
                    TYPE: [exports.skimturret],
                    },
            ],
        };
        exports.mega_cascade2 = {
            PARENT: [exports.miniboss2],
            LABEL: 'Mega Cascade',
            FACING_TYPE: 'looseToTarget',
            COLOR: 2,
            SHAPE: 3,
            SIZE: 60,
            VALUE: 500000,
            BODY: {
                FOV: 1.5,
                SPEED: base.SPEED,
                HEALTH: 70,
                SHIELD: base.SHIELD * 1.25,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 2.5,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,    12,     1.25,    6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.cascadeMin,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,
                        MAX_CHILDREN: 5,
                    }, }, {
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ], 
                    }, {
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ], 
                    },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   6,     7,      0,     120,    360,   1, ], 
                    TYPE: [exports.mnegun],
                    }, {
                POSITION: [   6,     7,      0,     240,    360,   1, ],
                    TYPE: [exports.mnegun],
                    }, {
                POSITION: [  10,     8,      0,      60,    120,   0, ],
                    TYPE: [exports.megaCascadeGun],
                    }, {
                POSITION: [  10,     8,      0,     300,    120,   0, ],
                    TYPE: [exports.megaCascadeGun],
                    }, {
                POSITION: [   5,     0,      0,     180,    360,   1, ],
                    TYPE: [exports.skimturret],
                    },
            ],
        };

        exports.celestial = { 
            PARENT: [exports.miniboss],
            DANGER: 10,
            LABEL: 'Coke Cassowary',
            SHAPE: 9,
            SIZE: 48,
            BODY: {
                FOV: 2,
                SPEED: base.SPEED * 0.01,
                HEALTH: 1000,
                SHIELD: 0.1,
                REGEN: 0.0001,
                DAMAGE: 2,
            },
            VALUE: 1000000,
            AI: { NO_LEAD: false, },
        };
        exports.celestial2 = { 
            PARENT: [exports.miniboss2],
            DANGER: 10,
            LABEL: 'Coke Cassowary',
            SHAPE: 9,
            SIZE: 48,
            BODY: {
                FOV: 2,
                SPEED: base.SPEED * 0.01,
                HEALTH: 1000,
                SHIELD: 0.1,
                REGEN: 0.0001,
                DAMAGE: 2,
            },
            VALUE: 1000000,
            AI: { NO_LEAD: false, },
        };
    exports.palChip = {
        PARENT: [exports.drone],
        LABEL: 'Pentagon Sunchip Drone',
        SHAPE: 5,
        BODY: {
            PENETRATION: 1.75,
            HEALTH: 1.8 * wepHealthFactor,
            DAMAGE: 1.6 * wepDamageFactor,
            SHIELD: 0.1,
            REGEN: 0.1,
            SPEED: 1.9,
        },
        INDEPENDENT: true,
        DRAW_HEALTH: true,
    };
        exports.palsep = {
            CONTROLLERS: ['reversespin'],
            COLOR: 14,
            SHAPE: 7,
            MAX_CHILDREN: 21,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,    6.5,     1.2,   7.5,     0,    180/7,    0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.palChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   4,    6.5,     1.2,   7.5,     0,   180/7*3,   0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.palChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   4,    6.5,     1.2,   7.5,     0,   180/7*5,   0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.palChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   4,    6.5,     1.2,   7.5,     0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.palChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   4,    6.5,     1.2,   7.5,     0,   -180/7,    0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.palChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   4,    6.5,     1.2,   7.5,     0,  -180/7*3,   0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.palChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   4,    6.5,     1.2,   7.5,     0,  -180/7*5,   0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.palChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
            ],
        };
            exports.palswarmer = {
                PARENT: [exports.genericTank],
                LABEL: 'Swarmer',
                BODY: {
                    FOV: 1.25,
                },
                INDEPENDENT: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.one_third_reload, g.five, g.five, g.five, g.hive, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.double_range, g.no_recoil]),
                            TYPE: exports.hive,
                        }, },
                ],
            };
        exports.palpen = {
            CONTROLLERS: ['spin'],
            COLOR: 14,
            SHAPE: 5,
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   9,     8,      0,      36,    190, 0], 
                    TYPE: exports.palswarmer,
                }, {
                POSITION: [   9,     8,      0,     108,    180, 0], 
                    TYPE: exports.palswarmer,
                }, {
                POSITION: [   9,     8,      0,     180,    180, 0], 
                    TYPE: exports.palswarmer,
                }, {
                POSITION: [   9,     8,      0,    -108,    180, 0], 
                    TYPE: exports.palswarmer,
                }, {
                POSITION: [   9,     8,      0,     -36,    180, 0], 
                    TYPE: exports.palswarmer,
                },
            ],
        };
        exports.celestial_paladin = { 
            PARENT: [exports.celestial],
            COLOR: 14,
            NAME: 'Paladin',
            BODY: {
                SPEED: base.SPEED * 0.05,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.palsep,
                        }, {
                POSITION: [   9,     0,      0,      0,     360, 1], 
                    TYPE: exports.palpen,
                        }, {
                POSITION: [   6,     9,      0,      20,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,      60,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     100,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     140,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     220,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     260,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     300,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     340,     45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.celestial_paladin2 = { 
            PARENT: [exports.celestial2],
            COLOR: 14,
            BODY: {
                SPEED: base.SPEED * 0.05,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.palsep,
                        }, {
                POSITION: [   9,     0,      0,      0,     360, 1], 
                    TYPE: exports.palpen,
                        }, {
                POSITION: [   6,     9,      0,      20,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,      60,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     100,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     140,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     220,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     260,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     300,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     340,     45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.freGun = {
            PARENT: [exports.genericTank],
            DANGER: -1,
            LABEL: 'Cruiser',
            STAT_NAMES: statnames.swarm,
            CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
            BODY: {
                FOV: 1.6,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: [exports.autoswarm, { BODY: { FOV: 1.8, }, }],
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: [exports.autoswarm, { BODY: { FOV: 1.8, }, }],
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
    exports.fresep = {
        CONTROLLERS: ['reversespin'],
        COLOR: 1,
        SHAPE: 7,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [   8,     8,      0,    180/7,   180, 0], 
                TYPE: exports.freGun,
            }, {
            POSITION: [   8,     8,      0,    180/7*3, 180, 0], 
                TYPE: exports.freGun,
            }, {
            POSITION: [   8,     8,      0,    180/7*5, 180, 0], 
                TYPE: exports.freGun,
            }, {
            POSITION: [   8,     8,      0,     180,    180, 0], 
                TYPE: exports.freGun,
            }, {
            POSITION: [   8,     8,      0,   -180/7*5, 180, 0], 
                TYPE: exports.freGun,
            }, {
            POSITION: [   8,     8,      0,   -180/7*3, 180, 0], 
                TYPE: exports.freGun,
            }, {
            POSITION: [   8,     8,      0,    -180/7,  180, 0], 
                TYPE: exports.freGun,
            }, 
        ],
    };
        exports.frepen = {
            CONTROLLERS: ['spin'],
            COLOR: 1,
            SHAPE: 5,
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   9,     8,      0,      36,    190, 0], 
                    TYPE: exports.auto4gun,
                }, {
                POSITION: [   9,     8,      0,     108,    180, 0], 
                    TYPE: exports.auto4gun,
                }, {
                POSITION: [   9,     8,      0,     180,    180, 0], 
                    TYPE: exports.auto4gun,
                }, {
                POSITION: [   9,     8,      0,    -108,    180, 0], 
                    TYPE: exports.auto4gun,
                }, {
                POSITION: [   9,     8,      0,     -36,    180, 0], 
                    TYPE: exports.auto4gun,
                },
            ],
        };
        exports.celestial_freyja = { 
            PARENT: [exports.celestial],
            COLOR: 1,
            NAME: 'Freyja',
            BODY: {
                SPEED: base.SPEED * 0.05,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.fresep,
                        }, {
                POSITION: [   9,     0,      0,      0,     360, 1], 
                    TYPE: exports.frepen,
                        }, {
                POSITION: [   6,     9,      0,      20,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,      60,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     100,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     140,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     220,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     260,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     300,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     340,     45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.celestial_freyja2 = { 
            PARENT: [exports.celestial2],
            COLOR: 1,
            BODY: {
                SPEED: base.SPEED * 0.05,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.fresep,
                        }, {
                POSITION: [   9,     0,      0,      0,     360, 1], 
                    TYPE: exports.frepen,
                        }, {
                POSITION: [   6,     9,      0,      20,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,      60,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     100,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     140,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     220,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     260,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     300,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     340,     45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    exports.zapsep = {
        CONTROLLERS: ['reversespin'], 
        COLOR: 2,
        MAX_CHILDREN: 35,
        SHAPE: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    180/7,    0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, }, {
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    180/7*3,  0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, }, {
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    180/7*5,  0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, }, {
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    180,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, }, {
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    -180/7,   0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, }, {
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    -180/7*3, 0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, }, {
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    -180/7*5, 0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, },
                ]
    };
    exports.zappen = {
        CONTROLLERS: ['spin'], 
        COLOR: 2,
        SHAPE: 5,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [   9,     8,      0,      36,    180, 0], 
                TYPE: [ exports.skimturret, { BODY: { FOV: base.FOV * 2.25, }, COLOR: 16, }, ],
            }, {
            POSITION: [   9,     8,      0,     108,    180, 0], 
                TYPE: [ exports.skimturret, { BODY: { FOV: base.FOV * 2.25, }, COLOR: 16, }, ],
            }, {
            POSITION: [   9,     8,      0,     180,    180, 0], 
                TYPE: [ exports.skimturret, { BODY: { FOV: base.FOV * 2.25, }, COLOR: 16, }, ],
            }, {
            POSITION: [   9,     8,      0,    -108,    180, 0], 
                TYPE: [ exports.skimturret, { BODY: { FOV: base.FOV * 2.25, }, COLOR: 16, }, ],
            }, {
            POSITION: [   9,     8,      0,    -36,     180, 0], 
                TYPE: [ exports.skimturret, { BODY: { FOV: base.FOV * 2.25, }, COLOR: 16, }, ],
            }, 
        ],
    };
        exports.celestial_zaphkiel = { 
            PARENT: [exports.celestial],
            NAME: 'Zaphkiel',
            COLOR: 2,
            BODY: {
                SPEED: base.SPEED * 0.05,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.zapsep,
                        }, {
                POSITION: [   9,     0,      0,      0,     360, 1], 
                    TYPE: exports.zappen,
                        }, {
                POSITION: [   6,     9,      0,      20,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,      60,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     100,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     140,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     220,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     260,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     300,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     340,     45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.celestial_zaphkiel2 = { 
            PARENT: [exports.celestial2],
            COLOR: 2,
            BODY: {
                SPEED: base.SPEED * 0.05,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.zapsep,
                        }, {
                POSITION: [   9,     0,      0,      0,     360, 1], 
                    TYPE: exports.zappen,
                        }, {
                POSITION: [   6,     9,      0,      20,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,      60,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     100,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     140,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     220,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     260,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     300,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     340,     45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    exports.artChip = {
        PARENT: [exports.drone],
        LABEL: 'Pentagon',
        SHAPE: 5,
        BODY: {
            PENETRATION: 1.75,
            HEALTH: 1.8 * wepHealthFactor,
            DAMAGE: 1.6 * wepDamageFactor,
            SHIELD: 0.1,
            REGEN: 0.1,
            SPEED: 1.9,
        },
        INDEPENDENT: true,
        DRAW_HEALTH: true,
    };
        exports.artsep = {
            CONTROLLERS: ['reversespin'],
            COLOR: 14,
            SHAPE: 7,
            MAX_CHILDREN: 21,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,    6.5,     1.2,   7.5,     0,    180/7,    0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pentachip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.artChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   4,    6.5,     1.2,   7.5,     0,   180/7*3,   0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pentachip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.artChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   4,    6.5,     1.2,   7.5,     0,   180/7*5,   0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pentachip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.artChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   4,    6.5,     1.2,   7.5,     0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pentachip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.artChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   4,    6.5,     1.2,   7.5,     0,   -180/7,    0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pentachip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.artChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   4,    6.5,     1.2,   7.5,     0,  -180/7*3,   0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pentachip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.artChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   4,    6.5,     1.2,   7.5,     0,  -180/7*5,   0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.pentachip, g.pound, g.pound, g.pound, g.more_speed, g.fast, g.no_recoil]),
                        TYPE: exports.artChip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
            ],
        };
exports.artmissile = {
    PARENT: [exports.missile],
    LABEL: 'Roto Missile',
    FACING_TYPE: 'fastautospin',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.more_speed, g.more_speed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
            }, }, {
        POSITION: [  14,     6,      1,      0,      0,     180,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.more_speed, g.more_speed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
            }, },
    ],
};
            exports.artgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Twister',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 3,
                },
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,   10.35,   -0.5,    9,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  17,     15,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.arty, g.skim, g.fast_launch, g.very_fast_launch, g.demoman]),
                            TYPE: exports.artmissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, }, {
                    POSITION: [ 7.5,     15,  -1.35,    4.5,     0,      0,      0,  ], 
                        },
                ],
            };

    exports.artpen = {
        CONTROLLERS: ['spin'], 
        COLOR: 14,
        SHAPE: 5,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [   9,     8,      0,      36,    180, 0], 
                TYPE: exports.artgun,
            }, {
            POSITION: [   9,     8,      0,     108,    180, 0], 
                TYPE: exports.artgun,
            }, {
            POSITION: [   9,     8,      0,     180,    180, 0], 
                TYPE: exports.artgun,
            }, {
            POSITION: [   9,     8,      0,    -108,    180, 0], 
                TYPE: exports.artgun,
            }, {
            POSITION: [   9,     8,      0,    -36,     180, 0], 
                TYPE: exports.artgun,
            }, 
        ],
    };
        exports.celestial_artemis = { 
            PARENT: [exports.celestial],
            NAME: 'Artemis',
            COLOR: 14,
            BODY: {
                SPEED: base.SPEED * 0.05,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.artsep,
                        }, {
                POSITION: [   9,     0,      0,      0,     360, 1], 
                    TYPE: exports.artpen,
                        }, {
                POSITION: [   6,     9,      0,      20,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,      60,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     100,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     140,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     220,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     260,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     300,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     340,     45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.celestial_artemis2 = { 
            PARENT: [exports.celestial2],
            COLOR: 14,
            BODY: {
                SPEED: base.SPEED * 0.05,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.artsep,
                        }, {
                POSITION: [   9,     0,      0,      0,     360, 1], 
                    TYPE: exports.artpen,
                        }, {
                POSITION: [   6,     9,      0,      20,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,      60,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     100,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     140,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     220,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     260,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     300,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     340,     45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.demsep = (() => {
            let a = 180/7, d = 1/7; D = 0.5; return {
            CONTROLLERS: ['reversespin'],
            COLOR: 1,
            SHAPE: 7,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,      a,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,      a,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,      a,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,     a*3,   1*d+D, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,     a*3,   1*d+D, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,     a*3,    1*d,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,     a*5,   2*d+D, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,     a*5,   2*d+D, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,     a*5,    2*d,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,     180,   3*d+D, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,     180,   3*d+D, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,     180,    3*d,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,     a*9,   4*d+D, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,     a*9,   4*d+D, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,     a*9,    4*d,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,     a*11,  5*d+D, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,     a*11,  5*d+D, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,     a*11,   5*d,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,    -2,     a*13,  6*d+D, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [ 4.5,     2,     0.75,   7.5,     2,     a*13,  6*d+D, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   6,     2,     0.75,   7.5,     0,     a*13,   6*d,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.triplet, g.pound, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.mini, g.double_range]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, },
            ],
        };})();
            exports.demswarmer = {
                PARENT: [exports.genericTank],
                LABEL: 'Swarmer',
                BODY: {
                    FOV: 1.25,
                },
                INDEPENDENT: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.one_third_reload, g.five, g.five, g.five, g.hive, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.more_speed, g.double_range, g.no_recoil]),
                            TYPE: exports.hive,
                        }, },
                ],
            };
        exports.dempen = {
            CONTROLLERS: ['spin'],
            COLOR: 1,
            SHAPE: 5,
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   9,     8,      0,      36,    190, 0], 
                    TYPE: exports.demswarmer,
                }, {
                POSITION: [   9,     8,      0,     108,    180, 0], 
                    TYPE: exports.demswarmer,
                }, {
                POSITION: [   9,     8,      0,     180,    180, 0], 
                    TYPE: exports.demswarmer,
                }, {
                POSITION: [   9,     8,      0,    -108,    180, 0], 
                    TYPE: exports.demswarmer,
                }, {
                POSITION: [   9,     8,      0,     -36,    180, 0], 
                    TYPE: exports.demswarmer,
                },
            ],
        };
        exports.celestial_demeter = { 
            PARENT: [exports.celestial],
            COLOR: 1,
            NAME: 'Demeter',
            BODY: {
                SPEED: base.SPEED * 0.05,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.demsep,
                        }, {
                POSITION: [   9,     0,      0,      0,     360, 1], 
                    TYPE: exports.dempen,
                        }, {
                POSITION: [   6,     9,      0,      20,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,      60,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     100,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     140,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     220,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     260,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     300,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     340,     45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.celestial_demeter2 = { 
            PARENT: [exports.celestial2],
            COLOR: 1,
            BODY: {
                SPEED: base.SPEED * 0.05,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.demsep,
                        }, {
                POSITION: [   9,     0,      0,      0,     360, 1], 
                    TYPE: exports.dempen,
                        }, {
                POSITION: [   6,     9,      0,      20,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,      60,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     100,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     140,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     220,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     260,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     300,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     340,     45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    exports.odisep = {
        CONTROLLERS: ['reversespin'], 
        COLOR: 2,
        MAX_CHILDREN: 28,
        SHAPE: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    180/7,    0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, }, {
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    180/7*3,  0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, }, {
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    180/7*5,  0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, }, {
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    180,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, }, {
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    -180/7,   0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, }, {
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    -180/7*3, 0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, }, {
                    POSITION: [   4,    6.5,     1.2,   7.5,     0,    -180/7*5, 0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.slow, g.half_reload, g.one_third_reload, g.near_double_size, g.double, g.triplet]),
                            TYPE: [exports.drone, { BODY: { FOV: base.FOV * 1.25, SPEED: 4.2, }, INDEPENDENT: true, }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, },
                ]
    };
            exports.odingun = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                     }, },
                ],
            };
    exports.odipen = {
        CONTROLLERS: ['spin'], 
        COLOR: 2,
        SHAPE: 5,
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [   9,     8,      0,      36,    180, 0], 
                TYPE: exports.odingun,
            }, {
            POSITION: [   9,     8,      0,     108,    180, 0], 
                TYPE: exports.odingun,
            }, {
            POSITION: [   9,     8,      0,     180,    180, 0], 
                TYPE: exports.odingun,
            }, {
            POSITION: [   9,     8,      0,    -108,    180, 0], 
                TYPE: exports.odingun,
            }, {
            POSITION: [   9,     8,      0,    -36,     180, 0], 
                TYPE: exports.odingun,
            }, 
        ],
    };
        exports.celestial_odin = { 
            PARENT: [exports.celestial],
            NAME: 'Odin',
            COLOR: 2,
            BODY: {
                SPEED: base.SPEED * 0.05,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.odisep,
                        }, {
                POSITION: [   9,     0,      0,      0,     360, 1], 
                    TYPE: exports.odipen,
                        }, {
                POSITION: [   6,     9,      0,      20,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,      60,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     100,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     140,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     220,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     260,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     300,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     340,     45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
        exports.celestial_odin2 = { 
            PARENT: [exports.celestial2],
            COLOR: 2,
            BODY: {
                SPEED: base.SPEED * 0.05,
            },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      0,      0,     360, 1], 
                    TYPE: exports.odisep,
                        }, {
                POSITION: [   9,     0,      0,      0,     360, 1], 
                    TYPE: exports.odipen,
                        }, {
                POSITION: [   6,     9,      0,      20,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,      60,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     100,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     140,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     180,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     220,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     260,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     300,     45, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   6,     9,      0,     340,     45, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };

        exports.eDestroyLite = {
            PARENT: [exports.sentry],
            LABEL: 'Elite Destroyer Lite',
            BODY: {
                HEALTH: 25,
                DAMAGE: 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.more_recoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.auto4gun, { COLOR: 5, }]
                    },
            ],
        };
        exports.eDestroyLite2 = {
            PARENT: [exports.sentry2],
            LABEL: 'Elite Destroyer Lite',
            BODY: {
                HEALTH: 25,
                DAMAGE: 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.more_recoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.auto4gun, { COLOR: 5, }]
                    },
            ],
        };
        exports.eDestroy = {
            PARENT: [exports.genericTank],
            LABEL: 'Mini Elite Destroyer',
            FACING_TYPE: 'autospin',
            SHAPE: 3,
            BODY: {
                FOV: 1.15,
                SPEED: base.SPEED * 0.5,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    14,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    14,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    14,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun]
                    },
            ],
        };
        exports.eGunnerLite = {
            PARENT: [exports.sentry],
            LABEL: 'Elite Gunner Lite',
            BODY: {
                HEALTH: 25,
                DAMAGE: 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto3gun],
                    }, {
                POSITION: [  11,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto3gun],
                }
            ],
        };
        exports.eGunnerLite2 = {
            PARENT: [exports.sentry2],
            LABEL: 'Elite Gunner Lite',
            BODY: {
                HEALTH: 25,
                DAMAGE: 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto3gun],
                    }, {
                POSITION: [  11,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto3gun],
                }
            ],
        };
        exports.eGunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Mini Elite Gunner',
            SHAPE: 3,
            BODY: {
                FOV: 1.15,
                SPEED: base.SPEED * 0.5,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.pillbox,
                    }, },
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
                }
            ],
        };

            exports.fallen_booster = {
                PARENT: [exports.miniboss],
                LABEL: 'Fallen Booster',
                FACING_TYPE: 'looseToTarget',
                SIZE: 22,
                COLOR: 18,
                BODY: {
                    HEALTH: 50,
                    SHIELD: base.SHIELD * 0.6,
                    DENSITY: base.DENSITY * 0.2,
                    FOV: 1.5,
                    SPEED: base.SPEED * 0.25,
                    DAMAGE: 3,
                },
                DANGER: 7,
                VALUE: 300000,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.much_more_recoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.fallen_booster2 = {
                PARENT: [exports.miniboss2],
                LABEL: 'Fallen Booster',
                FACING_TYPE: 'looseToTarget',
                SIZE: 22,
                COLOR: 18,
                BODY: {
                    HEALTH: 50,
                    SHIELD: base.SHIELD * 0.6,
                    DENSITY: base.DENSITY * 0.2,
                    FOV: 1.5,
                    SPEED: base.SPEED * 0.25,
                    DAMAGE: 3,
                },
                DANGER: 7,
                VALUE: 300000,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.much_more_recoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.underranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Sentinel',
                DANGER: 8,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin, g.ranger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                        }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            MAX_CHILDREN: 14,
                        }, },
                    ],
            };

exports.bentHomingBullet = {
    PARENT: [exports.autoswarm],
    LABEL: 'Heat Missile',
    SHAPE: 'M -0.25 -0.3 L -1 0 L -0.25 0.3 L 0 0.375 L 0 0.75 L 1 0 L 0 -0.75 L 0 -0.375 Z',
};
        exports.bentHoming = {
            PARENT: [exports.genericTank],
            LABEL: 'Seeker',
            DANGER: 8,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,     -20,     0,   ], 
                    }, {
                POSITION: [   2,     12,    1.01,    19,    -2,     -20,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bentHomingBullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,      20,     0,   ], 
                    }, {
                POSITION: [   2,     12,    1.01,    19,     2,      20,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bentHomingBullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    }, {
                POSITION: [   2,     12,    1.01,    22,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bentHomingBullet,
                    }, },
            ],
        };

            exports.hybridflanktrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Chimera',
                DANGER: 7,
                STAT_NAMES: 6,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: false, 
                            MAX_CHILDREN: 3,
                        }, }, {
                    POSITION: [  13,     8,      1,      0,      0,     180,     0,  ], 
                        }, {
                    POSITION: [   4,     8,     1.7,    13,      0,     180,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                    ],
            };

            exports.mini1gun = {
                PARENT: [exports.genericTank],
                LABEL: 'Minigun',
                DANGER: 7,
                SHAPE: 4,
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
                BODY: {
                    FOV: 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  26,    12,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,    0.333,], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.auto]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    12,      1,      0,      0,      0,    0.667,], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.auto]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.mini1 = {
                PARENT: [exports.genericTank],
                LABEL: 'Automaton',
                DANGER: 7,
                BODY: {
                    FOV: 1.2,
                },
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     180, 0], 
                        TYPE: exports.mini1gun,
                            },
                ],
            };

exports.cwisnuke = {
    PARENT: [exports.bullet],
    LABEL: 'Nuke',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   1,     6,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.destroy, g.one_third_reload, g.no_recoil]),
                TYPE: [exports.bullet, {PERSISTS_AFTER_DEATH: true}],
                SHOOT_ON_DEATH: true,
            }, }, {
        POSITION: [   1,     6,      1,      0,      0,      90,     0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.destroy, g.one_third_reload, g.no_recoil]),
                TYPE: [exports.bullet, {PERSISTS_AFTER_DEATH: true}],
                SHOOT_ON_DEATH: true,
            }, }, {
        POSITION: [   1,     6,      1,      0,      0,     180,     0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.destroy, g.one_third_reload, g.no_recoil]),
                TYPE: [exports.bullet, {PERSISTS_AFTER_DEATH: true}],
                SHOOT_ON_DEATH: true,
            }, }, {
        POSITION: [   1,     6,      1,      0,      0,     270,     0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.destroy, g.one_third_reload, g.no_recoil]),
                TYPE: [exports.bullet, {PERSISTS_AFTER_DEATH: true}],
                SHOOT_ON_DEATH: true,
            }, },
    ],
};
            exports.cwisgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Turret',
                DANGER: 7,
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
                BODY: {
                    FOV: 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,    7.5,     1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.no_recoil]),
                            TYPE: exports.cwisnuke,
                        },
                        COLOR_SETTINGS: {
                            COLOR: 9,
                            SKIN: 2,
                        }, },
                ],
            };
            exports.lockheedgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Turret',
                DANGER: 7,
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
                BODY: {
                    FOV: 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     15,     1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mini, g.flame, g.pound, g.destroy]),
                            TYPE: exports.bullet,
                        },
                        COLOR_SETTINGS: {
                            COLOR: 9,
                            SKIN: 1,
                        }, },
                ],
            };
            exports.ohmyfuckinggodIHAVENUKESSSSDSDSDSDSDSDSDS = {
                PARENT: [exports.genericTank],
                LABEL: 'Oh my fucking god I HAVE NUKESSSSDSDSDSDSDSDSDS',
                DANGER: 7,
                BODY: {
                    FOV: 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,     9,     -0.5,    9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,     10,     1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.arty, g.arty, g.skim, g.click, g.sgun]),
                            TYPE: exports.missile,
                        }, }, { 
                    POSITION: [  17,     10,     1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.arty, g.arty, g.skim, g.click, g.sgun]),
                            TYPE: exports.missile,
                        }, }, { 
                    POSITION: [  17,     10,     1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.arty, g.arty, g.skim, g.click, g.sgun]),
                            TYPE: exports.missile,
                        }, }, { 
                    POSITION: [  17,     10,     1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.arty, g.arty, g.skim, g.click, g.sgun]),
                            TYPE: exports.missile,
                        }, }, { 
                    POSITION: [  17,     10,     1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.arty, g.arty, g.skim, g.click, g.sgun]),
                            TYPE: exports.missile,
                        }, }, {
                    POSITION: [  5.5,    10,    -1.3,   6.5,     0,      0,      0,   ], 
                        },
                ],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  15,     0,      0,      0,     360, 1], 
                        TYPE: exports.lockheedgun,
                            }, {
                    POSITION: [  10,     8,      0,      60,    360, 0], 
                        TYPE: exports.cwisgun,
                            }, {
                    POSITION: [  10,     8,      0,     120,    360, 0], 
                        TYPE: exports.cwisgun,
                            }, {
                    POSITION: [  10,     8,      0,     180,    360, 0], 
                        TYPE: exports.cwisgun,
                            }, {
                    POSITION: [  10,     8,      0,     240,    360, 0], 
                        TYPE: exports.cwisgun,
                            }, {
                    POSITION: [  10,     8,      0,     300,    360, 0], 
                        TYPE: exports.cwisgun,
                            },
                ],
            };
            exports.flameceptionistmarking = {
                PARENT: [exports.genericTank],
                LABEL: '',
                COLOR: 17,
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [15.077,   8,      1,      0,      0,      0,      0,  ], 
                        COLOR_SETTINGS: {
                            COLOR: 17,
                            SKIN: 1,
                        }, },
                ],
            };
            exports.flameceptionistbullet = {
                PARENT: [exports.bullet],
                LABEL: 'Flamethrower',
                DANGER: 7,
                BODY: {
                    FOV: 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [15.077,   8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mini, g.flame, g.ceptionist, g.ceptionist_bullet]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                        },
                        COLOR_SETTINGS: {
                            COLOR: 17,
                            SKIN: 1,
                        }, },
                ],
            };
            exports.flameceptionist2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Flamethrower Ceptionist²',
                DANGER: 7,
                BODY: {
                    FOV: 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [15.077,   8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mini, g.flame, g.ceptionist]),
                            TYPE: exports.flameceptionistbullet,
                        },
                        COLOR_SETTINGS: {
                            SKIN: 1,
                        }, },
                ],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     0,      0,      0,      0,  1], 
                        TYPE: exports.flameceptionistmarking,
                            },
                ],
            };

            exports.pellet = {
                PARENT: [exports.genericTank],
                LABEL: 'Pelleter',
                DANGER: 5,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  17,     2,      1,      0,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  17,     2,      1,      0,     -3,      0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [ 4.5,    8.5,    -1.6,   7.5,     0,      0,      0,   ],
                        },
                ],
            };
            exports.hewn_pellet = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Pelleter',
                DANGER: 6,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  17,     2,      1,      0,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  17,     2,      1,      0,     -3,      0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  17,     2,      1,     -1,      3,     22.5,   0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  17,     2,      1,     -1,     -3,    -22.5,    0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [ 4.5,    8.5,    -1.6,   7.5,     0,      0,      0,   ],
                        },
                ],
            };
            exports.sail = {
                PARENT: [exports.genericTank],
                LABEL: 'Sailor',
                DANGER: 6,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  17,     2,      1,      0,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  17,     2,      1,      0,     -3,      0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   6,     5,     0.6,     6,     6.5,    15.5,  0.75,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [   6,     5,     0.6,     6,    -6.5,   -15.5,  0.25,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,
                        }, }, {
                    POSITION: [ 4.5,    8.5,    -1.6,   7.5,     0,      0,      0,   ],
                        },
                ],
            };
            exports.bore = {
                PARENT: [exports.genericTank],
                LABEL: 'Borer',
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     2,      1,      0,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.bore]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     2,      1,      0,     -3,      0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.bore]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [ 4.5,    8.5,    -1.6,   7.5,     0,      0,      0,   ],
                        },
                ],
            };
            exports.punt = {
                PARENT: [exports.genericTank],
                LABEL: 'Punt Gun',
                DANGER: 6,
                BODY: {
                    FOV: 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     2,      1,      0,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.punt]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     2,      1,      0,     -3,      0,     3/6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.punt]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     2,      1,      0,      3,      0,     1/6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.punt]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     2,      1,      0,     -3,      0,     4/6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.punt]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  14,     2,      1,      0,      3,      0,     2/6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.punt]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  14,     2,      1,      0,     -3,      0,     5/6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.punt]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [ 4.5,    8.5,    -1.6,   7.5,     0,      0,      0,   ],
                        },
                ],
            };
            exports.screw_punt = {
                PARENT: [exports.genericTank],
                LABEL: 'Screw Punt',
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     2,      1,      0,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.bore, g.punt]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  23,     2,      1,      0,     -3,      0,     3/6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.bore, g.punt]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,     2,      1,      0,      3,      0,     1/6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.bore, g.punt]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,     2,      1,      0,     -3,      0,     4/6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.bore, g.punt]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,      3,      0,     2/6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.bore, g.punt]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     -3,      0,     5/6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pellet, g.bore, g.punt]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [ 4.5,    8.5,    -1.6,   7.5,     0,      0,      0,   ],
                        },
                ],
            };

exports.bot = {
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    LEVEL: 60,
    NAME: '[AI] ',
    DANGER: 8,
    SIZE: 12,
    COLOR: 16,
    BODY: {
        SPEED: base.SPEED * 0.05,
        FOV: base.FOV * 1.25,
        HEALTH: base.HEALTH * 0.25,
        DAMAGE: base.DAMAGE * 0.16,
        SHIELD: base.SHIELD * 0.15,
        REGEN: base.REGEN * 0.01,
    },
    //COLOR: 17,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapTargetToGoal', 'fleeAtLowHealth'
    ],
    AI: { STRAFE: true, },
}
exports.botT1 = { // FFA Version
    PARENT: [exports.bot],
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    DANGER: 8,
    SIZE: 12,
    COLOR: 12,
    SKILL: skillSet({
        rld: 1,
        dam: 0.2,
        pen: 0.5,
        str: 0.3,
        spd: 1,
        atk: 0,
        hlt: 0,
        shi: 0,
        rgn: 0,
        mob: 0,        
    }),
    BODY: {
        SPEED: base.SPEED * 0.1,
        FOV: base.FOV * 1.25,
        HEALTH: base.HEALTH * 0.5,
        DAMAGE: base.DAMAGE * 0.45,
        SHIELD: base.SHIELD * 0.32,
        REGEN: base.REGEN * 0.01,
    },
    AI: { STRAFE: true, },
}
/* exports.botT1 = {
    PARENT: [exports.bot],
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    DANGER: 8,
    SIZE: 12,
    COLOR: 16,
    SKILL: skillSet({
        rld: 1,
        dam: 0.2,
        pen: 0.5,
        str: 0.3,
        spd: 1,
        atk: 0,
        hlt: 0,
        shi: 0,
        rgn: 0,
        mob: 0,        
    }),
    BODY: {
        SPEED: base.SPEED * 0.1,
        FOV: base.FOV * 1.25,
        HEALTH: base.HEALTH * 0.5,
        DAMAGE: base.DAMAGE * 0.45,
        SHIELD: base.SHIELD * 0.32,
        REGEN: base.REGEN * 0.01,
    },
    AI: { STRAFE: true, },
} */
exports.botT2 = {
    PARENT: [exports.bot],
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    DANGER: 8,
    SIZE: 12,
    COLOR: 8,
    SKILL: skillSet({
        rld: 1,
        dam: 0.8,
        pen: 0.6,
        str: 0.8,
        spd: 1,
        atk: 0.3,
        hlt: 0.5,
        shi: 0.2,
        rgn: 0.1,
        mob: 0,        
    }),
    BODY: {
        SPEED: base.SPEED * 0.1,
        FOV: base.FOV * 1.25,
        HEALTH: base.HEALTH * 1.2,
        DAMAGE: base.DAMAGE * 0.975,
        SHIELD: base.SHIELD * 0.875,
        REGEN: base.REGEN * 0.01,
    },
    AI: { STRAFE: true, },
}
exports.botT3 = {
    PARENT: [exports.bot],
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    DANGER: 8,
    COLOR: 'rainbow',
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 0,        
    }),
    BODY: {
        SPEED: base.SPEED * 0.025,
        FOV: base.FOV * 2.25,
        HEALTH: base.HEALTH * 1.6,
        DAMAGE: base.DAMAGE * 1.5,
        SHIELD: base.SHIELD * 1.25,
        REGEN: base.REGEN * 0.01,
    },
    AI: { STRAFE: true, },
    VALUE: 300000,
}
exports.botT3_A = {
    PARENT: [exports.botT3],
    NAME: '𝓐𝓘 ',
}
exports.botT3_B = {
    PARENT: [exports.botT3],
    NAME: '𝔸𝕀 ',
}
exports.botT3_C = {
    PARENT: [exports.botT3],
    NAME: 'ᴀɪ ',
}
exports.botT3_D = {
    PARENT: [exports.botT3],
    NAME: '𝑨𝑰 ',
}
exports.botT3_E = {
    PARENT: [exports.botT3],
    NAME: '卂丨 ',
}

// UPGRADE PATHS
            exports.testbed.UPGRADES_TIER_4 = [exports.testbedTanks, exports.testbedRemoved, exports.observer, exports.dev];
            exports.dev.UPGRADES_TIER_4 = [exports.devBosses, exports.devDominators, exports.devMisc, exports.devSentries, exports.devXK, exports.devOverdone, exports.devShapes, exports.devACs, exports.eventDev, exports.testbed];
            exports.devBosses.UPGRADES_TIER_4 = [exports.elite_sprayer_nonauto, exports.elite_gunner2, exports.elite_destroyer2, exports.palisade2, exports.dread2, exports.defend2, exports.custodian2, exports.octog2, exports.skimboss2, exports.krios_saucer2, exports.krisaucephase2, exports.defendOfShinies2, exports.defendOfShiniesPhase2, exports.mega_cascade2, exports.devBosses2];
            exports.devBosses2.UPGRADES_TIER_4 = [exports.celestial_paladin2, exports.celestial_freyja2, exports.celestial_zaphkiel2, exports.celestial_artemis2, exports.celestial_demeter2, exports.celestial_odin2, exports.fallen_booster2];

            exports.devDominators.UPGRADES_TIER_4 = [exports.destroy_dominator2, exports.gun_dominator2, exports.trap_dominator2, exports.drone_dominator2];

            exports.devSentries.UPGRADES_TIER_4 = [exports.sentrySwarm2, exports.sentryGun2, exports.sentryTrap2, exports.sentrySnipe2, exports.guardian_lite2, exports.crasher_dasher2, exports.crash_fighter2, exports.caltrop_fighter2, exports.baby_leviathan2, exports.penta_sentry2, exports.nestdefend_krios2, exports.rareSentrySwarm2, exports.rareSentryGun2, exports.rareSentryTrap2, exports.devSentries2];
            exports.devSentries2.UPGRADES_TIER_4 = [exports.nestdefend_tethys2, exports.defend_lite2, exports.triangleCascade2, exports.nestdefend_mnemosyne2, exports.eDestroyLite2, exports.eGunnerLite2];

            exports.devMisc.UPGRADES_TIER_4 = [exports.mothership2, exports.weirdspike, exports.ball, exports.op_anni, exports.ohmyfuckinggodIHAVENUKESSSSDSDSDSDSDSDSDS];

            exports.testbedTanks.UPGRADES_TIER_4 = [exports.rocketeer, exports.factory, exports.destroy, exports.shotgun, exports.builder, exports.artillery, exports.skimmer];

            exports.devOverdone.UPGRADES_TIER_4 = [exports.flameceptionist2];

            exports.devACs.UPGRADES_TIER_4 = [exports.arenaCloser2, exports.devACs2];

exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.pummeler, exports.single, exports.pellet];

    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.hexa, exports.gunner, exports.cruiser];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble, exports.battleship];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentdouble, exports.triple, exports.bentHoming];
            exports.triple.UPGRADES_TIER_4 = [exports.quint];
        exports.gunner.UPGRADES_TIER_3 = [exports.guntrap, exports.autogunner, exports.nailgun, exports.machinegunner, exports.overgunner, exports.hurricane];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.bore];
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.autoass];
            exports.assassin.UPGRADES_TIER_4 = [exports.falcon];
            exports.ranger.UPGRADES_TIER_4 = [exports.underranger];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach, exports.dual];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.engineer, exports.boomer];
            exports.boomer.UPGRADES_TIER_4 = [exports.bentboomer];

    exports.machine.UPGRADES_TIER_2 = [exports.mini, exports.gunner, exports.automachine, exports.spray];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid, exports.autodestroy, exports.hiveshooter];
            exports.hybrid.UPGRADES_TIER_4 = [exports.eDestroy];
            exports.autodestroy.UPGRADES_TIER_4 = [exports.eDestroy];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.autoarty];
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.hybridmini, exports.automini, exports.mini1, exports.minitrap];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap];
        exports.flank.UPGRADES_TIER_3 = [];
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.bomber, exports.autotri, exports.surfer];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.auto5, exports.autohexa, exports.hexatrap, exports.hurricane];
            exports.hexatrap.UPGRADES_TIER_4 = [exports.quadtrapper];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4, exports.sniper3, exports.machine3, exports.banshee];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bushwhack, exports.guntrap, exports.fortress, exports.bomber, exports.hybridflanktrap];
            exports.guntrap.UPGRADES_TIER_4 = [exports.eGunner];

    exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.battleship, exports.overgunner, exports.autoover, exports.master];  
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer, exports.autounderseer];
        exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress, exports.autocruiser];

    exports.pummeler.UPGRADES_TIER_2 = [exports.smash, exports.mauler, exports.autopummeler];
        exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash];
        exports.mauler.UPGRADES_TIER_3 = [exports.spike];
        exports.autopummeler.UPGRADES_TIER_3 = [exports.autosmash];

    exports.pellet.UPGRADES_TIER_2 = [exports.gunner, exports.cruiser, exports.hewn_pellet, exports.sail, exports.bore, exports.punt];
        exports.hewn_pellet.UPGRADES_TIER_3 = [exports.carrier];
        exports.bore.UPGRADES_TIER_3 = [exports.nailgun, exports.screw_punt];
