var roleMule = {
    run: function(creep) {
	var resources = creep.room.find(FIND_DROPPED_ENERGY);

	if (creep.carry.energy < creep.carry.carryCapacity) {
	    for (var r in resources) {
		creep.moveTo(r);
		creep.pickup(r);
	    }
	}
	else {
	    var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	}
    }
};

module.exports = roleMule;
