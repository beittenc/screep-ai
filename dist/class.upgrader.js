function UpgraderCreep(creep) {
    this.creep = creep;
    this.creep.memory.role = 'upgrader';
    this.target = null;
}

UpgraderCreep.prototype.setTarget = function(target) {
    this.target = target;
}

UpgraderCreep.prototype.run = function() {
    if (this.creep.memory['action'] == 'harvest') {
	if (this.creep.harvest(this.target) == ERR_NOT_IN_RANGE) {
	    this.creep.moveTo(this.target)
	}

	if (this.creep.carry.energy == this.creep.carryCapacity) {
	    this.creep.memory['action'] = 'upgrade';
	}
    }
    else {
	// Upgrade the controller
        if(this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.creep.room.controller);
        }

	if (this.creep.carry.energy == 0) {
	    this.creep.memory.action = 'harvest';
	}
    }
}

module.exports = UpgraderCreep;
