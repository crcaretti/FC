:: rulesAssistant [script]

// a collection of functions for rules assistant

window.CheckAutoRulesActivate = function CheckAutoRulesActivate(slave) {
	const V = State.variables
	let r = ""

	if (slave.currentRules === undefined || slave.currentRules.length < 1)
		slave.currentRules = []


	V.defaultRules.forEach(rule => {
		let applies = evalExpr(rule.condition, slave)
		if (applies && rule.excludeSpecialSlaves && isLeaderP(slave)) // TODO: exclusions/inclusions in rule condition
			applies = false
		if (applies) {
			if (rule.assignment.length > 0 || rule.facility.length > 0)
				applies = ruleAssignmentSelected(slave, rule)
			else if (rule.excludeAssignment.length > 0 || rule.excludeFacility.length > 0)
				applies = !ruleAssignmentExcluded(slave, rule)
			if (rule.selectedSlaves.length > 0)
				applies = ruleSlaveSelected(slave, rule)
			else if (rule.excludedSlaves.length > 0)
				applies = !ruleSlaveExcluded(slave, rule)
		}
		if (applies) {
			if (!ruleApplied(slave, rule.ID)) {
				slave.currentRules.push(rule.ID)
				r += `<br><span class="tan">Rule ${rule.ID} (${rule.name}) now applies to ${slave.slaveName}, who is assigned to ${slave.assignment}</span>\n`
			}
		} else if (ruleApplied(slave, rule.ID)) {
			r += RARemoveRule(slave, rule)
		}
	})
	return r
}

window.RARemoveRule = function RARemoveRule(slave, rule) {
	let r = ""
	const idx = slave.currentRules.indexOf(
	slave.currentRules.some((rule, i) => {
		if (rule.ID === rule) {
			slave.currentRules.splice(i, 1)
			r += `<br><span class="tan">Rule ${rule.ID} (${rule.name}) no longer applies to {slave.slaveName}, who is assignmed to ${slave.assignment}</span>`
			r += RAFacilityRemove(slave, rule)
			return true
		} else return false
	})
	return r
}

window.RAFacilityRemove = function RAFacilityRemove(slave, rule) {
	const V = State.variables
	let r = ""
	if (!rule.facilityRemove) return r
	switch(rule.setAssignment) {
	case "be confined in the arcade":
		if (slave.assignment === rule.setAssignment) {
			r += `<br>${slave.slaveName} has been removed from ${V.arcadeName} and has been assigned to ${rule.removalAssignment}.`
			assignJob(slave, rule.removalAssignment)
		}
		break;

	case "work in the brothel":
		if (slave.assignment === rule.setAssignment) {
			r += `<br>${slave.slaveName} has been removed from ${V.brothelName} and has been assigned to ${rule.removalAssignment}.`
			assignJob(slave, rule.removalAssignment)
		}
		break;

	case "serve in the club":
		if (slave.assignment === rule.setAssignment) {
			r += `<br>${slave.slaveName} has been removed from ${clubName} and has been assigned to ${rule.removalAssignment}.`
			assignJob(slave, rule.removalAssignment)
		}
		break;

	case "work in the dairy":
		if (slave.assignment === rule.setAssignment) {
			r += `<br>${slave.slaveName} has been removed from ${V.dairyName} and has been assigned to $rule.removalAssignment}.`
			assignJob(slave, rule.removalAssignment)
		}
		break;

	case "rest in the spa":
		if (slave.assignment === rule.setAssignment) {
			r += `<br>${slave.slaveName} has been removed from ${V.spaName} and has been assigned to ${rule.removalAssignment}.`
			assignJob(slave, rule.removalAssignment)
		}
		break;

	case "get treatment in the clinic":
		if (slave.assignment === rule.setAssignment) {
			r += `<br>{slave.slaveName} has been removed from ${V.clinicName} and has been assigned to ${rule.removalAssignment}.`
			assignJob(slave, rule.removalAssignment)
		}
		break;

	case "serve in the master suite":
		if (slave.assignment === rule.setAssignment) {
			r += `<br>{slave.slaveName} has been removed from ${V.masterSuiteName} and has been assigned to ${rule.removalAssignment}.`
			assignJob(slave, rule.removalAssignment)
		}
		break;

	case "live with your Head Girl":
		if (slave.assignment === rule.setAssignment) {
			r += `<br>${slave.slaveName} has been removed from ${HGSuiteName} and has been assigned to ${rule.removalAssignment}.`
			assignJob(slave, rule.removalAssignment)
		}
		break;

	case "work as a servant":
		if (slave.assignment === rule.setAssignment) {
			r += `<br>${slave.slaveName} has been removed from ${V.servantsQuartersName} and has been assigned to ${rule.removalAssignment}.`
			assignJob(slave, rule.removalAssignment)
		}
		break;

	case "learn in the schoolroom":
		if (slave.assignment === rule.setAssignment) {
			r += `<br>${slave.slaveName} has been removed from ${V.schoolroomName} and has been assigned to ${rule.removalAssignment}.`
			assignJob(slave, rule.removalAssignment)
		}
		break;

	case "be confined in the cellblock":
		if (slave.assignment === rule.setAssignment) {
			r += `<br>${slave.slaveName} has been removed from ${V.cellblockName} and has been assigned to ${rule.removalAssignment}.`
			assignJob(slave, rule.removalAssignment)
		}
		break;
	}
}
