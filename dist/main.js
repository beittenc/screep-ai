//var roleHarvester = require('role.harvester');
var roleMule = require('role.mule');
var roleUpgrader = require('role.upgrader');

//var HarvesterCreep = require('class.harvester');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var mules = _.filter(Game.creeps, (creep) => creep.memory.role == 'mule');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

//    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
//        console.log('Spawning new harvester: ' + newName);
    }
    // else if(mules.length < 2) {
    //     var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'mule'});
    // }

   if(upgraders.length < 1) {
       var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
   }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
	var sources = creep.room.find(FIND_SOURCES);

        if(creep.memory.role == 'harvester') {
//            roleHarvester.run(creep, sources[0]);
	    var newHarvester = new HarvesterCreep(creep);
	    newHarvester.run();
        }
        if(creep.memory.role == 'mule') {
            roleMule.run(creep, sources[0]);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
