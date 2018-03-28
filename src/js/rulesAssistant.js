:: rulesAssistant [script]

// RAJS

window.ruleApplied = function(slave, ID) {
	if (!slave || !slave.currentRules)
		return null;
	return slave.currentRules.includes(ID);
};

window.ruleSlaveSelected = function(slave, rule) {
	if (!slave || !rule || !rule.selectedSlaves)
		return false;
	return rule.selectedSlaves.includes(slave.ID);
};

window.ruleSlaveExcluded = function(slave, rule) {
	if (!slave || !rule || !rule.excludedSlaves)
		return false;
	return rule.excludedSlaves.includes(slave.ID);
};

window.ruleAssignmentSelected = function(slave, rule) {
	if (!slave || !rule || (!rule.assignment && !rule.facility))
		return false;
	var assignment = rule.assignment.concat(expandFacilityAssignments(rule.facility));
	return assignment.includes(slave.assignment);
}

window.ruleAssignmentExcluded = function(slave, rule) {
	if (!slave || !rule || (!rule.excludeAssignment && !rule.excludeFacility))
		return false;
	var excludeAssignment = rule.excludeAssignment.concat(expandFacilityAssignments(rule.excludeFacility));
	return excludeAssignment.includes(slave.assignment);
}

window.hasSurgeryRule = function(slave, rules) {
	if (!slave || !rules || !slave.currentRules)
		return false;

	for (var d = rules.length-1; d >= 0; d--) {
		if (ruleApplied(slave, rules[d].ID)) {
			if (rules[d].autoSurgery > 0) {
				return true;
			}
		}
	}
	return false;
};

window.hasRuleFor = function(slave, rules, what) {
	if (!slave || !rules || !slave.currentRules)
		return false;

	for (var d = rules.length-1; d >= 0; d--) {
		if (ruleApplied(slave, rules[d].ID)) {
			if (rules[d][what] !== "no default setting") {
				return true;
			}
		}
	}
	return false;
};

window.hasHColorRule = function(slave, rules) {
	return hasRuleFor(slave, rules, "hColor");
}

window.hasHStyleRule = function(slave, rules) {
	return hasRuleFor(slave, rules, "hStyle");
};

window.hasEyeColorRule = function(slave, rules) {
	return hasRuleFor(slave, rules, "eyeColor");
};

window.lastPregRule = function(slave, rules) {
	if (!slave || !rules)
		return null;
	if (!slave.currentRules)
		return false;

	for (var d = rules.length-1; d >= 0; d--) {
		if (ruleApplied(slave, rules[d].ID)) {
			if (rules[d].preg == -1) {
				return true;
			}
		}
	}

	return null;
};

window.autoSurgerySelector = function(slave, ruleset) {

	var appRules = ruleset.filter(function(rule){
			return (rule.autoSurgery == 1) && this.currentRules.contains(rule.ID);
		}, slave);

	var surgery = {eyes: "no default setting", lactation: "no default setting", cosmetic: "nds", accent: "no default setting", shoulders: "no default setting", shouldersImplant: "no default setting", boobs: "no default setting", hips: "no default setting", hipsImplant: "no default setting", butt: "no default setting", faceShape: "no default setting", lips: "no default setting", holes: "nds", bodyhair: "nds", hair: "nds", bellyImplant: "no default setting"};
	var i, key, ruleSurgery;

	for (i in appRules)
	{
		ruleSurgery = appRules[i].surgery;
		for (key in ruleSurgery)
		{
			if (ruleSurgery[key] != "no default setting" || ruleSurgery[key] != "nds")
			{	
				surgery[key] = ruleSurgery[key];
			}
		}
	}

	return surgery;
}

window.mergeRules = function(rules) {
    var combinedRule = {};

    for (var i = 0; i < rules.length; i++) {
        for (var prop in rules[i]) {
            // A rule overrides any preceding ones if,
            //   * there are no preceding ones,
            //   * or it sets autoBrand,
            //   * or it does not set autoBrand and is not "no default setting"
            var applies = (
                combinedRule[prop] === undefined
                || (prop === "autoBrand" && rules[i][prop])
                || (prop !== "autoBrand" && rules[i][prop] !== "no default setting")
            );

            if (applies)
            {

            	//Objects in JS in operations "=" pass by reference, so we need a completely new object to avoid messing up previous rules.
            	if ("object" == typeof rules[i][prop] && "object" != typeof combinedRule[prop])
            		combinedRule[prop] = new Object();

            	//If we already have object - now we will process its properties, but object itself should be skipped.
            	if ("object" != typeof combinedRule[prop])
                	combinedRule[prop] = rules[i][prop];

            	/*Some properties of rules now have second level properties. We need to check it, and change ones in combinedRule. (Good example - growth drugs. Breasts, butt, etc...) */
            	if ( "object" == typeof rules[i][prop])
    	        {
	            	for (var subprop in rules[i][prop])
    	        	{
    	           		var subapplies = (
            	    	combinedRule[prop][subprop] === undefined
                			|| (rules[i][prop][subprop] !== "no default setting")
	            		);

		            	if (subapplies)
    		            	combinedRule[prop][subprop] = rules[i][prop][subprop];
    		        }

            	}
           	}

        }

    }
    return combinedRule;
}

// rulesassistant.tw

function panic(message) {
    message = message || "panic";
    if (typeof Error !== "undefined") {
        throw new Error(message);
    }
    throw message;
}

function assert(condition, message) {
    if (!condition)
        panic(message || "Assertion failed");
}


window.isSimpleCondition = function(expr, validNames) {
    assert(validNames, "validNames was not given");

    switch (expr.id) {
    case "true": case "false":
        return true;

    case "<": case "<=": case ">": case ">=":
        return (
            expr.first.id === "(name)"              // first operand should be a name
            && validNames.includes(expr.first.name) // among the valid ones
            && expr.second.id === "(number)"        // and second should be a literal
        );

    case "&&": case "||":
        return (
            (expr.first.id == "<" || expr.first.id == "<=")
            && (expr.second.id == ">" || expr.second.id == ">=")
            && isSimpleCondition(expr.first, validNames)
            && isSimpleCondition(expr.second, validNames)
            && expr.first.first.name === expr.second.first.name
        );
    }
    return false;
}


window.getVariable = function(expr) {
    switch (expr.id) {
    case "true":
        return "always";
    case "false":
        return "none";
    case "<": case "<=": case ">": case ">=":
        return expr.first.name === "energy" ? "sex drive" : expr.first.name;
    case "&&": case "||":
        return getVariable(expr.first);
    }
}

window.changeVariable = function(expr, newVar) {
    //assert(isSimpleCondition(expr), "expr is not simple");

    switch (expr.id) {
    case "true": case "false":
        return {
            id: "<",
            first: {id: "(name)", name: newVar},
            second: {id: "(number)", value: 0}
        };

    case "<": case "<=": case ">": case ">=":
        expr.first.name = newVar;
        return expr;

    case "&&": case "||":
        expr.first.first.name = newVar;
        expr.second.first.name = newVar;
        return expr;
    }
}


window.changeComparison = function(expr, newComparison) {
    assert(expr.id !== "true" && expr.id !== "false", "expr is constant");
    //assert(isSimpleCondition(expr), "expr is not simple");

    var newOperand = {
        id: newComparison,
        first: {id: "(name)", name: expr.first.name},
        second: {id: "(number)", value: 0}
    };

    if (newComparison === "<" || newComparison === "<=") {
        switch (expr.id) {
        case "<": case "<=":
            expr.id = newComparison;
            return expr;
        case ">": case ">=":
            return { id: "&&", first: newOperand, second: expr };
        case "&&": case "||":
            expr.first.id = newComparison;
            return expr;
        }
    } else {
        switch (expr.id) {
        case "<": case "<=":
            return { id: "&&", first: expr, second: newOperand };
        case ">": case ">=":
            expr.id = newComparison;
            return expr;
        case "&&": case "||":
            expr.second.id = newComparison;
            return expr;
        }
    }
}

window.removeComparison = function(expr, comparisonType) {
    assert(expr.id !== "true" && expr.id !== "false", "expr is constant");
    //assert(isSimpleCondition(expr), "expr is not simple");
    assert(comparisonType === "lower" || comparisonType === "upper",
           "invalid comparisonType '" + comparisonType + "'");

    if (comparisonType === "lower") {
        switch (expr.id) {
        case "<": case "<=":
            return expr;
        case ">": case ">=":
            return { id: "true" };
        case "&&": case "||":
            return expr.first;
        }
    } else {
        switch (expr.id) {
        case "<": case "<=":
            return { id: "false" };
        case ">": case ">=":
            return expr;
        case "&&": case "||":
            return expr.second;
        }
    }
}


window.changeConnective = function(expr, newConnective) {
    switch (expr.id) {
    case "true": case "false":
    case "<": case "<=": case ">": case ">=":
        return expr;
    case "&&": case "||":
        expr.id = newConnective;
        return expr;
    }
}


window.unparseExpr = function(expr) {
    switch (expr.id) {

    // literals
    case "true":
        return "true";
    case "false":
        return "false";
    case "(number)": case "(string)":
        return expr.value;

    // names
    case "(name)":
        return expr.name;

    // logical infix operators
    case "&&": case "||":
    // numerical infix comperators
    case "<": case "<=":
    case ">": case ">=":
    case "=": case "!=":
    // numerical infix operators (excluding minus)
    case "+": case "*": case "/": case "^":
        return [unparseExpr(expr.first),
                expr.id,
                unparseExpr(expr.second)].join(" ");

    // unary/prefix operators
    case "!":
        return expr.id + unparseExpr(expr.first);

    case "-":
        if (expr.second !== undefined) {
            return unparseExpr(expr.first) + " - " + unparseExpr(expr.second);
        } else {
            return "-" + unparseExpr(expr.first);
        }

    // parentheses
    case "(":
        return "(" + unparseExpr(expr.first) + ")";
    }

    panic("how did I get here? unknown expr.id: " + expr.id);
}

window.typeExpr = function(expr, env) {
    switch (expr.id) {

    case "true": case "false":
        return "bool";
    case "(number)":
        return "number";
    case "(string)":
        return "string";

    case "(name)":
        return env[expr.name];

    case "&&": case "||":
        return "bool";

    case "<": case "<=":
    case ">": case ">=":
        return "bool";
    case "=": case "!=":
        return "bool";

    case "*": case "/":  case "^":
        return "number";

    case "+":
        return typeExpr(expr.first, env) === "string" ? "string" : "number";

    case "!":
        return typeExpr(expr.first, env);
    case "-":
        if (expr.second !== undefined) {
            return "number";
        } else {
            return typeExpr(expr.first, env);
        }

    case "(":
        return typeExpr(expr.first, env);
    }
}

window.optimizeExpr = function(expr) {
    switch (expr.id) {
    case "true": case "false":
    case "(number)": case "(string)":
    case "(name)":
        return expr;

    case "-":
        // The only "optimization" we are doing.  Obviously, this is not done
        // for the sake of speed, rather, to make the UI and isSimpleCondition
        // simpler, since they don't have to explicitly check for negative
        // numbers.
        if (expr.second === undefined && expr.first.id === "(number)")
            return {id: "(number)", value: evalExpr(expr)};
        // fallthrough, if the minus was not unary

    case "&&": case "||":
    case "<": case "<=": case ">": case ">=":
    case "=": case "!=":
    case "+": case "*": case "/": case "^":
        return {
            id: expr.id,
            first: optimizeExpr(expr.first),
            second: optimizeExpr(expr.second)
        };

    case "!": case "(":
        return {
            id: expr.id,
            first: optimizeExpr(expr.first)
        };
    }
}

window.printError = function(exprStr, error) {
    var result = [],
        inError = false;
    for (var i = 0; i < exprStr.length; i++) {
        if (i === error.index)
            result.push("@@.red;");
        result.push(exprStr[i]);
    }
    result.push("@@");
    return result.join("");
}

window.CheckAutoRulesActivate = function CheckAutoRulesActivate(slave) {
	const V = State.variables
	let r = ""

	if (slave.currentRules === undefined || slave.currentRules.length < 1)
		slave.currentRules = []


	V.defaultRules.forEach(rule => {
		let applies = evalExpr(rule, slave)
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

window.evalExpr = function(rule, slave) {
	let flag
	const expr = rule.condition

	switch (expr.id) {
	case "true":
		flag = true;
		break
	case "false":
		flag = false;
		break
	case "(number)":
		flag = expr.value;
		break
	case "(string)":
		if(expr.value.startsWith('"') && expr.value.endsWith('"')) {
			flag = JSON.parse(expr.value);
		} else {
			flag = expr.value;
		}
		break
	case "(name)":
		flag = slave[expr.name];
		break
	case "&&":
		flag = evalExpr(expr.first, slave) && evalExpr(expr.second, slave);
		break
	case "||":
		flag = evalExpr(expr.first, slave) || evalExpr(expr.second, slave);
		break
	case "<":
		flag = evalExpr(expr.first, slave) < evalExpr(expr.second, slave);
		break
	case "<=":
		flag = evalExpr(expr.first, slave) <= evalExpr(expr.second, slave);
		break
	case ">":
		flag = evalExpr(expr.first, slave) > evalExpr(expr.second, slave);
		break
	case ">=":
		flag = evalExpr(expr.first, slave) >= evalExpr(expr.second, slave);
		break
	case "=":
		flag = evalExpr(expr.first, slave) == evalExpr(expr.second, slave);
		break
	case "!=":
		flag = evalExpr(expr.first, slave) != evalExpr(expr.second, slave);
		break
	case "+":
		flag = evalExpr(expr.first, slave) + evalExpr(expr.second, slave);
		break
	case "*":
		flag = evalExpr(expr.first, slave) * evalExpr(expr.second, slave);
		break
	case "/":
		flag = evalExpr(expr.first, slave) / evalExpr(expr.second, slave);
		break
	case "^":
		flag = Math.pow(evalExpr(expr.first, slave), evalExpr(expr.second, slave));
		break
	case "!":
		flag = !evalExpr(expr.first, slave);
		break
	case "-":
		if (expr.second !== undefined) {
			flag = evalExpr(expr.first, slave) - evalExpr(expr.second, slave);
		} else {
			flag = -evalExpr(expr.first, slave);
		}
		break
	case "(":
		flag = evalExpr(expr.first, slave);
		break
	}

	if (flag && rule.excludeSpecialSlaves && isLeaderP(slave))
		flag = false
	else if (flag) {
		if (rule.assignment.length > 0 || rule.facility.length > 0)
			flag = ruleAssignmentSelected(slave, rule)
		else if (rule.excludeAssignment.length > 0 || rule.excludeFacility.length > 0)
			flag = !ruleAssignmentExcluded(slave, rule)
		if (rule.selectedSlaves.length > 0)
			flag = ruleSlaveSelected(slave, rule)
		else if (rule.excludedSlaves.length > 0)
			flag = !ruleSlaveExcluded(slave, rule)
	}
	return flag
}
