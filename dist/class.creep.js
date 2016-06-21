function BaseCreep(creep, role) {
    this.creep = creep;
    this.role = role;
    this.primaryAction = false;
    this.target = null;
}

BaseCreep.prototype.getRole = function() {
    return this.role;
}

BaseCreep.prototype.setTarget = function(target) {
    this.target = target;
}

BaseCreep.prototype.getTarget = function() {
    return this.target;
}

module.exports = BaseCreep;
