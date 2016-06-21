function HarvesterCreep(creep) {
    this.creep = creep;
    this.creep.memory.role = 'harvester';
    this.target = null;
}

HarvesterCreep.prototype.setTarget = function(target) {
    this.target = target;
}

HarvesterCreep.prototype.run = function() {
    if (this.creep.memory['action'] == 'harvest') {
	if (this.creep.harvest(this.target) == ERR_NOT_IN_RANGE) {
	    this.creep.moveTo(this.target)
	}

	if (this.creep.carry.energy == this.creep.carryCapacity) {
	    this.creep.memory['action'] = 'deposit';
	}
    }
    else {
	// Find a place to dump the energy
	// TODO - Have the manager set the home spawn
	var targets = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
        if (targets.length > 0) {
            if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0]);
            }
        }

	if (targets.length == 0 || this.creep.carry.energy == 0) {
	    this.creep.memory.action = 'harvest';
	}
    }
}

module.exports = HarvesterCreep;
