:: assignJob [script]

window.assignJob = function assignJob(slave, job) {
	const V = State.variables
	let r = ""

	if (job === "Pit" || job === "Coursing Association")
		return r
	
	removeJob(slave, slave.assignment)
	const idx = V.slaves.findIndex(s => s.ID === slave.ID)

	/* use .toLowerCase() to get rid of a few dupe conditions. */
	switch (job.toLowerCase()) {
		case "be confined in the arcade":
		case "arcade":
			slave.assignment = "be confined in the arcade"
			slave.assignmentVisible = 0
			V.arcadeSlaves++
			V.ArcadeiIDs.push(slave.ID)
			slave.clothing = "none"
			slave.shoes = "none"
			slave.collar = "none"
			slave.livingRules = "spare"
			break

		case "work in the brothel":
		case "brothel":
			slave.assignment = "work in the brothel"
			slave.assignmentVisible = 0
			V.brothelSlaves++
			V.BrothiIDs.push(slave.ID)
			switch (V.brothelDecoration) {
				case "Degradationist":
				case "standard":
					slave.livingRules = "spare"
					break
				default:
					slave.livingRules = "normal"
					break
			}
			break

		case "be confined in the cellblock":
		case "cellblock":
			slave.assignment = "be confined in the cellblock"
			slave.assignmentVisible = 0
			V.cellblockSlaves++
			V.CellBiIDs.push(slave.ID)
			switch (V.cellblockDecoration) {
				case "Paternalist":
					slave.livingRules = "normal"
					break
				default:
					slave.livingRules = "spare"
					break
			}
			break

		case "get treatment in the clinic":
		case "clinic":
			slave.assignment = "get treatment in the clinic"
			slave.assignmentVisible = 0
			V.clinicSlaves++
			V.CliniciIDs.push(slave.ID)
			switch (V.clinicDecoration) {
				case "Repopulation Focus":
				case "Eugenics":
				case "Gender Radicalist":
				case "Gender Fundamentalist":
				case "Paternalist":
				case "Maturity Preferentialist":
				case "Youth Preferentialist":
				case "Slimness Enthusiast":
				case "Hedonistic":
					slave.livingRules = "luxurious"
					break
				
				case "Roman Revivalist":
				case "Aztec Revivalist":
				case "Egyptian Revivalist":
				case "Arabian Revivalist":
				case "Chinese Revivalist":
				case "Chattel Religionist":
				case "Edo Revivalist":
					slave.livingRules = "normal"
					break
				
				default:
					slave.livingRules = "spare"
					break
			}
			break

		case "serve in the club":
		case "club":
			slave.assignment = "serve in the club"
			slave.assignmentVisible = 0
			V.clubSlaves++
			V.ClubiIDs.push(slave.ID)
			slave.livingRules = "normal"
			break

		case "work in the dairy":
		case "dairy":
			slave.assignment = "work in the dairy"
			slave.assignmentVisible = 0
			V.dairySlaves++
			V.DairyiIDs.push(slave.ID)
			switch (V.dairyDecoration) {
				case "Roman Revivalist":
				case "Aztec Revivalist":
				case "Chinese Revivalist":
				case "Chattel Religionist":
				case "Edo Revivalist":
				case "Arabian Revivalist":
				case "Egyptian Revivalist":
				case "Supremacist":
				case "Subjugationist":
				case "Degradationist":
					slave.livingRules = "spare"
					break
				default:
					slave.livingRules = "normal"
					break
			}
			break

		case "live with your head girl":
		case "head girl suite":
		case "hgsuite":
			slave.assignment = "live with your Head Girl"
			slave.assignmentVisible = 0
			V.HGSuiteSlaves++
			V.HGSuiteiIDs.push(slave.ID)
			slave.livingRules = "luxurious"
			break

		case "serve in the master suite":
		case "master suite":
		case "mastersuite":
			slave.assignment = "serve in the master suite"
			slave.assignmentVisible = 0
			V.masterSuiteSlaves++
			V.MastSiIDs.push(slave.ID)
			break

		case "learn in the schoolroom":
		case "schoolroom":
			slave.assignment = "learn in the schoolroom"
			slave.assignmentVisible = 0
			V.schoolroomSlaves++
			V.SchlRiIDs.push(slave.ID)
			slave.livingRules = "normal"
			break

		case "work as a servant":
		case "servants' quarters":
		case "servantsquarters":
			slave.assignment = "work as a servant"
			slave.assignmentVisible = 0
			V.servantsQuartersSlaves++
			V.ServQiIDs.push(slave.ID)
			switch (V.servantsQuartersDecoration) {
				case "Roman Revivalist":
				case "Aztec Revivalist":
				case "Chinese Revivalist":
				case "Chattel Religionist":
				case "Edo Revivalist":
				case "Supremacist":
				case "Subjugationist":
				case "Degradationist":
				case "Arabian Revivalist":
				case "Egyptian Revivalist":
					slave.livingRules = "spare"
					break
				default:
					slave.livingRules = "normal"
					break
			}
			break

		case "rest in the spa":
		case "spa":
			slave.assignment = "rest in the spa"
			slave.assignmentVisible = 0
			V.spaSlaves++
			V.SpaiIDs.push(slave.ID)
			switch (V.spaDecoration) {
				case "Chattel Religionist":
				case "Chinese Revivalist":
					slave.livingRules = "normal"
					break
				case "Degradationist":
					slave.livingRules = "spare"
					break
				default:
					slave.livingRules = "luxurious"
					break
			}
			break

		case "be the attendant":
		case "be your concubine":
		case "be the dj":
		case "be the madam":
		case "be the milkmaid":
		case "be the nurse":
		case "be the schoolteacher":
		case "be the stewardess":
		case "be the wardeness":
			slave.assignment = job
			slave.assignmentVisible = 0     /* non-visible leadership roles */
			slave.livingRules = "luxurious"
			break

		case "be your head girl":
			slave.assignment = job
			if (V.HGSuite === 1) {
				slave.livingRules = "luxurious"
			}
			break

		case "guard you":
			slave.assignment = job
			if (V.dojo > 1) {
				slave.livingRules = "luxurious"
			}
			break

		case "be your agent":
		case "live with your agent":
			slave.assignment = job
			slave.assignmentVisible = 0
			slave.useRulesAssistant = 0 /* non-visible roles exempt from Rules Assistant */
			if (job === "be your agent") {
				V.leaders.push(slave)
			}
			break

		case "choose her own job":
			slave.assignment = job
			slave.choosesOwnAssignment = 1  /* removeJob already set assignmentVisible = 1 */
			break

		default:
			slave.assignment = job /* removeJob already set assignmentVisible = 1 and choosesOwnAssignment = 0 */
			break
	}

	if (slave.assignmentVisible === 0 && Array.isArray(V.personalAttention)) {
		const awi = V.personalAttention.findIndex(function(s) { return s.ID === slave.ID; })
		if (awi != -1) {
			V.personalAttention.deleteAt(awi)
			if (V.personalAttention.length === 0) {
				if (V.PC.career === "escort") 
					V.personalAttention = "whoring"
				else if (V.PC.career === "servant")
					V.personalAttention = "upkeep"
				else
					V.personalAttention = "business"
				r += `${slave.slaveName} no longer has your personal attention; you plan to focus on ${V.personalAttention}.`
			} else
				r += `${slave.slaveName} no longer has your personal attention.`
		}
	}
	return r
}

window.removeJob = function removeJob(slave, assignment) {
	const V = State.variables
	let r = ""
	
	const idx = V.slaves.findIndex(function(s) { return s.ID === slave.ID; })

	if (assignment === "Pit")
		V.fighterIDs.delete(slave.ID)

	else if (assignment === "Coursing Association")
		V.Lurcher = 0

	else {
		if (V.HeadGirl !== 0 && slave.ID === V.HeadGirl.ID)
			V.HeadGirl = 0
		if (V.Recruiter !== 0 && slave.ID == V.Recruiter.ID)
			V.Recruiter = 0
		if (V.Bodyguard !== 0 && slave.ID === V.Bodyguard.ID)
			V.Bodyguard = 0
		if (V.Madam !== 0 && slave.ID === V.Madam.ID)
			V.Madam = 0
		if (V.DJ !== 0 && slave.ID === V.DJ.ID)
			V.DJ = 0
		if (V.Milkmaid !== 0 && slave.ID === V.Milkmaid.ID)
			V.Milkmaid = 0
		if (V.Schoolteacher !== 0 && slave.ID === V.Schoolteacher.ID)
			V.Schoolteacher = 0
		if (V.Attendant !== 0 && slave.ID === V.Attendant.ID)
			V.Attendant = 0
		if (V.Nurse !== 0 && slave.ID === V.Nurse.ID)
			V.Nurse = 0
		if (V.Stewardess !== 0 && slave.ID === V.Stewardess.ID)
			V.Stewardess = 0
		if (V.Wardeness !== 0 && slave.ID === V.Wardeness.ID)
			V.Wardeness = 0
		if (V.Concubine !== 0 && slave.ID === V.Concubine.ID)
			V.Concubine = 0
		if (V.Collectrix !== 0 && slave.ID === V.Collectrix.ID)
			V.Collectrix = 0

		/* use .toLowerCase() to get rid of a few dupe conditions. */
		switch (assignment.toLowerCase()) {
		case "be confined in the arcade":
		case "arcade":
			slave.assignment = "work a glory hole"
			V.ArcadeiIDs.delete(slave.ID)
			V.arcadeSlaves--
			break

		case "work in the brothel":
		case "brothel":
			slave.assignment = "whore"
			V.BrothiIDs.delete(slave.ID)
			V.brothelSlaves--
			break

		case "be confined in the cellblock":
		case "cellblock":
			slave.assignment = "rest"
			if ((V.slaves[idx].inflation > 0)) {
				slave.inflation = 0
				slave.inflationType = "none"
				slave.inflationMethod = 0
				SetBellySize(slave)
			}
			V.CellBiIDs.delete(slave.ID)
			V.cellblockSlaves--
			break

		case "get treatment in the clinic":
		case "clinic":
			slave.assignment = "rest"
			V.CliniciIDs.delete(slave.ID)
			V.clinicSlaves--
			break

		case "serve in the club":
		case "club":
			slave.assignment = "serve the public"
			V.ClubiIDs.delete(slave.ID)
			V.clubSlaves--
			break

		case "work in the dairy":
		case "dairy":
			slave.assignment = "get milked"
			V.DairyiIDs.delete(slave.ID)
			V.dairySlaves--
			break

		case "learn in the schoolroom":
		case "schoolroom":
			slave.assignment = "rest"
			V.SchlRiIDs.delete(slave.ID)
			V.schoolroomSlaves--
			break

		case "rest in the spa":
		case "spa":
			slave.assignment = "rest"
			V.SpaiIDs.delete(slave.ID)
			V.spaSlaves--
			break

		case "work as a servant":
		case "servants' quarters":
		case "servantsquarters":
			slave.assignment = "be a servant"
			V.ServQiIDs.delete(slave.ID)
			V.servantsQuartersSlaves--
			break

		case "serve in the master suite":
		case "master suite":
		case "mastersuite":
			slave.assignment = "please you"
			V.MastSiIDs.delete(slave.ID)
			V.masterSuiteSlaves--
			break

		case "live with your head girl":
		case "head girl suite":
		case "hgsuite":
			slave.assignment = "rest"
			V.HGSuiteiIDs.delete(slave.ID)
			V.HGSuiteSlaves--
			break

		case "be your head girl":
			slave.assignment = "rest"
			if (V.HGSuiteEquality === 0 && V.personalAttention === "HG") {
				if (V.PC.career === "escort")
					V.personalAttention = "whoring"
				else if (V.PC.career === "servant")
					V.personalAttention = "upkeep"
				else
					V.personalAttention = "business"
				
				r += `You no longer have a slave assigned to be your Head Girl, so you turn your personal attention to focus on ${V.personalAttention}.`
			}
			break
			
		case "be your agent":
		case "live with your agent":
			slave.assignment = "rest"
			const _leaderIndex = V.leaders.findIndex(function(x) { return x.ID === slave.ID })
			if (_leaderIndex !== -1)
				V.leaders.deleteAt(_leaderIndex)
			
			if (slave.relationshipTarget > 0) { /* following code assumes there can be at most one companion */
				const _lover = V.slaves.findIndex(function(s) { return haveRelationshipP(s, slave) && s.assignment === "live with your agent"; })
				if (_lover !== -1) {
					V.slaves[_lover].assignment = "rest"
					V.slaves[_lover].assignmentVisible = 1
				}
			}
			break
			
		default:
			slave.assignment = "rest"
			break
		}

		slave.assignmentVisible = 1
		slave.choosesOwnAssignment = 0
		slave.sentence = 0
		if (slave.livingRules === "luxurious")
			slave.livingRules = "normal"
	}
	return r
}
