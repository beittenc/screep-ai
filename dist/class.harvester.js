var BaseCreep = require('base.creep');

var HarvesterCreep.prototype = new BaseCreep('harvester');

HarvesterCreep.prototype.run = function() {
    if (this.primaryAction) {
	if (this.creep.harvest(this.target) == ERR_NOT_IN_RANGE) {
	    this.creep.moveTo(this.target)
	}

	if (this.creep.carry.energy == this.creep.carry.carryCapacity) {
	    this.primaryAction = false;
	}
    }
    else {
	// Find a place to dump the energy
	var targets = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
        if (targets.length > 0) {
            if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }

	if (targets.length == 0 || this.creep.carry.energy == 0) {
	    this.primaryAction = true;
	}
    }
}

module.exports = HarvesterCreep;
