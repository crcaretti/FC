/*SecForceEX JS*/ window.SFC = function() {const V = State.variables;
if (V.SFTradeShow.CanAttend === -1) {return`The Colonel`;
} else { if (V.LieutenantColonel === 1) {
			return`Lieutenant Colonel <<= SlaveFullName($LieutenantColonel)>>`;
	} else {return`a designated soldier`};
}};

window.SFCR = function() {const V = State.variables, C = V.SFColonel;
	if (C.Status === 0) {return`boss`; } else if (C.Status >= 10) {return`friend`;
	} else if (C.Status >= 25) {return`close friend`;
	} else if (C.Status >= 45) {if (V.PC.title === 1) {return`boyfriend`} else {return`girlfriend`};
	} else if (C.Status >= 65) {return`lover`;}}

window.TroopDec = function() {const V = State.variables,commom = "the <<print commaNum($SFUnit.Troops)>> members of $SF.Lower",S = V.SFUnit;
if (S.Troops < 100)
	return`sparsely occupied, ${commom} residing within them concentrating together in a corner. The hundreds of empty beds and lockers visibly herald the future`;
else if (S.Troops < 400)
	return`lightly occupied, with ${commom} starting to spread out across them`;
else if (S.Troops < 800)
	return`moderately occupied, though ${commom} residing within have a considerable amount of extra room`;
else if (S.Troops < 1500)
	return`well-occupied, and ${commom} residing within have started to form small cliques based on section and row`;
else if (S.Troops < 2000)
	return`near capacity, and ${commom} often barter their personal loot, whether it be monetary or human, for the choicest bunks`;}

window.HSM = function() {const V = State.variables;
	if (V.PC.hacking <= -100)return 1.5;
	else if (V.PC.hacking <= -75)return 1.35;
	else if (V.PC.hacking <= -50)return 1.25;
	else if (V.PC.hacking <= -25)return 1.15;
	else if (V.PC.hacking < 0)return 1.10;
	else if (V.PC.hacking === 0)return 1;
	else if (V.PC.hacking <= 10)return .97;
	else if (V.PC.hacking <= 25)return .95;
 else if (V.PC.hacking <= 50)return .90;
	else if (V.PC.hacking <= 75)return .85;
	else if (V.PC.hacking < 100)return .80;
	else if (V.PC.hacking >= 100)return .75;}

window.Count = function() {const V = State.variables,T = State.temporary,C = Math.clamp,S = V.SFUnit, E = V.economy;
T.FU = 10;S.Firebase = C(S.Firebase, 0, T.FU);
	T.AU = 10;S.Armoury = C(S.Armoury, 0, T.AU);
	T.DrugsU = 10;S.Drugs = C(S.Drugs, 0, T.DrugsU); 
	T.DU = 8;S.Drones = C(S.Drones, 0, T.DU); 
T.VU = 10;S.Vehicles = C(S.Vehicles, 0, T.VU);
	T.HBTU = 10;S.HBT = C(S.HBT, 0, T.HBTU);
	T.GU = T.VU+T.HBTU; T.G = S.Vehicles+S.HBT;
if (V.PC.hacking >= 75) {T.AFU = 10} else {T.AFU = 9};S.AirForce = C(S.AirForce, 0, T.AFU);
	if (V.PC.hacking >= 75) {T.SPU = 10} else {T.SPU = 9}; T.GunSU = 6;
	S.SpacePlane = C(S.SpacePlane, 0, T.SPU); S.GunS = C(S.GunS, 0, T.GunSU);
	T.H = S.AirForce+S.SpacePlane+S.GunS; T.HU = T.AFU+T.SPU+T.GunSU
if (V.PC.hacking >= 75) {T.SatU = 10,T.GRU = 10} else {T.SatU = 9,T.GRU = 9};
	S.Satellite = C(S.Satellite, 0, T.SatU); S.GiantRobot = C(S.GiantRobot, 0, T.GRU);
	T.MSU = 3;S.MissileSilo = C(S.MissileSilo, 0, T.MSU);
if (V.PC.hacking >= 75) {T.SubU = 10} else {T.SubU = 9};
	S.Sub = C(S.Sub, 0, T.SubU); T.HATU = 10;S.HAT = C(S.HAT, 0, T.HATU);	
	T.ACU = 10;S.AircraftCarrier = C(S.AircraftCarrier, 0, T.ACU);
T.Base = S.Firebase+S.Armoury+S.Drugs+S.Drones+T.G+T.H;
T.BaseU = T.FU+T.AU+T.DrugsU+T.DU+T.GU+T.HU;
if (V.terrain === "urban" && V.terrain === "rural") {
	T.LBU = T.SatU+T.GRU+T.MSU; T.LB = S.Satellite+S.GiantRobot+S.MissileSilo;
	T.max = T.BaseU+T.LBU; V.SF.Units = T.Base+T.LB; T.Land = 1;
} else { T.LB = S.Satellite; T.LBU = T.SatU;
	T.NY = S.AircraftCarrier+S.Sub+S.HAT; T.NYU = T.ACU+T.SubU+T.HATU;
	T.max = T.BaseU+T.LBU+T.NYU; V.SF.Units = T.Base+T.LB+T.NY; T.Land = 0;
} V.SF.Units = C(V.SF.Units, 0, T.max); if (E === .5) {T.Env = 4} else if (E === 1.5) {T.Env = 2} else {T.Env = 3};
}

window.Firebase = function() {const V = State.variables,S = V.SFUnit;
	if (S.Firebase === 0)
		return`Is currently quite basic, consisting of little more than a dormitory, armoury, a processing facility for human spoils, and a common area, sectioned off by stacks of empty supply crates. The cavernous space, however, is ripe for expansion.`;
	if (S.Firebase === 1)
		return`Has become more permanent, expanding into free space, erecting permanent dividers, and sectioning off an area for use as a garage and vehicle maintenance bay.`;
	if (S.Firebase === 2)
		return`Has added a facility for the storage, maintenance, and deployment of armed combat drones, and added storage facilities for the soldiers to store their personal spoils in.`;
	if (S.Firebase === 3)
		return`Has added additional support personnel and equipment, allowing the potential procurement of heavier infantry armour, fighting vehicles, and combat drones.`;
	if (S.Firebase === 4)
		return`Has expanded tremendously, adding an aerial control facility and express elevator connecting to a ring of launch pads and hangars built around the arcology's upper levels. Additional facilities have been added for soldier recreation, and Spartan quarters for live-in slaves, both menial and service, have been installed.`;
	if (S.Firebase > 4)var quanitiy ="",casemates ="",pads ="",sizeI ="",barrel ="";
	var t =`Has (mostly) taken on the appearance of a professional military installation, with clearly delineated soldier and logistical areas, dedicated support and recreation facilities, in addition to advanced command and control apparatus. As a final measure,`;
	if (S.Firebase >= 6) {quanitiy =`quad`} else {sizeI =`356 cm wide`};
	if (S.Firebase >= 7) {casemates =`fortified EMP/jammer resistant`} else {sizeI =`406 cm wide`};
	if (S.Firebase >= 8) {pads =`and a powerful arcology wide electromagnetic force field has been installed`} else {barrel =`double-barreled`};
	if (S.Firebase === 9)barrel =`tripple-barreled`,sizeI =`415 cm wide`;
	if (S.Firebase === 10)barrel =`quad-barreled`,sizeI =`420 cm wide`;
	return` ${t} ${quanitiy} heavy, long range, ${barrel} electromagnetic railgun ${sizeI} artillery pieces have been installed in ${casemates} casemates along the aerial launch pads ${pads}, giving $SF.Lower an immense superiority in local firepower.`;}

window.Armoury = function() {const V = State.variables,S = V.SFUnit;
	if (S.Armoury === 0)
		return`Is well-stocked with high-quality personal weapons and light armour, but contains little in the way of exceptional armament.`;
	if (S.Armoury === 1)
		return`Has large stocks of the absolute latest personal weapons and light armour, It has also added first-generation exo-suits to improve soldier lethality.`;
	if (S.Armoury === 2)
		return`Has acquired advanced tactical helmets and second-generation exo-suits to further improve soldier lethality.`;
	if (S.Armoury === 3)
		return`Has replaced deployed exo-suits with basic enclosed combat armour suits, and has further begun to deploy early electromagnetic (coilgun) weaponry.`;
	if (S.Armoury === 4)
		return`Has begun to equip the soldiers with more advanced combat armour suits, and has expanded its inventory of electromagnetic weaponry.`;
	if (S.Armoury > 4)var size =``,kit =``;
	var t =`Acquired heavy weapon attachments for its combat armour suits`;
	var y =`for the soldiers, ensuring that the infantry of $SF.Lower is perhaps the most well-equipped in the world.`;
	if (S.Armoury === 5)size =`small`;
	if (S.Armoury === 6)size =`both small and medium`;
	if (S.Armoury >= 7)size =`small/medium and large`;
	if (S.Armoury === 8)kit =`with basic thrusters`;
	if (S.Armoury === 9)kit =`with advanced thrusters`;
	if (S.Armoury === 10)kit =`with advanced thrusters and optical illusion kits`;
	return`${t} ${kit},and has further sourced ${size} advanced electromagnetic weaponry (miniaturized railguns) ${y}`;}

window.Drugs = function() {const V = State.variables,S = V.SFUnit;
	if (S.Drugs === 0)
		return`Is providing the soldiers with standard ephedrine-based stimulants.`;
	if (S.Drugs === 1)
		return`Improved the formula of the ephedrine-based stimulants, concentrating them and increasing both their potency, and the effectiveness of the soldiers under their influence.`;
	if (S.Drugs === 2)
		return`Replaced the soldiers' stimulants with methamphetamine-based variants, greatly increasing their alertness and aggressiveness when under their influence.`;
	if (S.Drugs === 3)
		return`Improved and concentrated the methamphetamine-based stimulants, and has also begun providing soldiers with phencyclidine-based dissociatives, allowing the soldiers to excuse their actions in the field and reducing any reluctance to follow severe orders.`;
	if (S.Drugs > 3)var improvement =``,tryptamine =``,tryptamine1 =``,Dose =``,LSD =``,purity =``,doc =``,Effects =``,Effect0 =``;
	var x = 'the formulas of the methamphetamine-based stimulants and phencyclidine-based dissociatives,';
	if (S.Drugs === 4)improvement =`further`;
		tryptamine =`has also begun providing tryptamine-based psychedelics to the soldiers, allowing them to avoid traumatic stress in the field.`;
	if (S.Drugs >= 5)improvement =`maximally`;
		tryptamine =`tryptamine-based psychedelics`;
		tryptamine1 =`Greatly increasing their effectiveness in all aspects thus ensuring that the soldiers of $SF.Lower go into combat wired, aggressive, and euphoric (if needed).`;
	if (S.Drugs === 6)purity =`with much higher purity compontent`;
	if (S.Drugs === 7)LSD =`and a slight trace of LSD`;
	if (S.Drugs === 8)Dose =`into a single dose`;doc =`<div style='font-size: 75%;'>*Only the doctors of $SF.Lower were consulted to ensure a completely unbiased result.</div>`;
		Effects =`However side effects may include (no particular order): Dissociative Identity Disorder, severe clinical depression, unstoppable vomiting, extreme paranoia, PTSD, finally total organ failure. Recommended by 9/10 doctors*.`;
	if (S.Drugs === 9)Effects =`Potential side effects have been reduced slightly to “only mildly” severe ones: Dissociative Identity Disorder, severe clinical depression, unstoppable vomiting, extreme paranoia and PTSD. Now recommended by 15/10 doctors*.`;
	if (S.Drugs === 10)Dose =`into a single higher strength dose`;
		Effect0 =`at the cost of lengthening the effects`;
	return`Has ${improvement} refined ${x} and ${tryptamine} ${purity} ${LSD} ${Dose}. ${tryptamine1} ${Effect0}.${Effects} ${doc}`;}

window.Drones = function() {const V = State.variables,S = V.SFUnit,thick =`thicker`,power =`higher power`,advanced =`more advanced highly`;
	if (S.Drones === 0)
		return`Contains a small number of 're-purposed' non-military drones from the arcology's original contingent`;
	if (S.Drones === 1)
		return`Has replaced the security drones with basic, lightly-armored military combat models possessing integrated small arms`;
	if (S.Drones === 2)
		return`Has replaced its basic military drones with more advanced models and added a number of support drones carrying heavy weaponry to its fleet`;
	if (S.Drones === 3)
		return`Acquired even more advanced models of both the standard combat drones and the heavy support drones, and expanded its numbers of both.`;
	if (S.Drones === 4)
		return`Has upgraded both the standard and support models of drones to carry basic electromagnetic weaponry, improving their overall combat effectiveness.`;
	if (S.Drones === 5)
		return`Has mproved the electromagnetic armament of its drones by mounting both miniaturized and heavy railguns on them. In addition further sourcing numerous models of drones for roles as diverse as reconnaissance, independent slave capture and swarming tactics.`,thick =``,power =``,advanced =``;
	if (S.Drones >= 5)
		if (S.Drones < 6)thick =``;if (S.Drones < 7)power =``;if (S.Drones < 8)advanced =``;
		return`Has acquired even lighter advanced ${thick} armored combat drones with ${power} electromagnetic weaponry, advanced heavy drones with ${power} electromagnetic support weaponry along with ${advanced} specialized drones for reconnaissance, capture, and swarm tactics.`;}

window.AttGround = function() {const V = State.variables,S = V.SFUnit;
	if (S.Vehicles === 1)var b =`has been recommissioned for use by $SF.lower. They`, c =`; mechanics are methodically checking the recent purchases for battle-readiness`,turret =``,engine =``,armor =``,armor2 =``,ammo =``,mg =``,fireC0 =``,fireC1 =``,fireC2 =``,fireC3 =``,MG = `120 mm main gun is enough to handle the majority of opponents around the Free Cities`; 
	if (S.Vehicles >= 2)engine =`The engine has been overhauled, allowing much faster maneuvering around the battlefield.`,b =``,c =``;
	if (S.Vehicles >= 3)armor =`A composite ceramic armor has replaced the original, offering much greater protection from attacks.`;
	if (S.Vehicles >= 4)ammo =`.The tanks have been outfitted with additional types of ammo for situational use.`;
	if (S.Vehicles >= 5)mg =`A remote-controlled .50 cal machine gun has been mounted on the turret to handle infantry and low-flying aircraft.`;
	if (S.Vehicles >= 6)fireC0 =`A fire-control system`,fireC3 =`been installed, guaranteeing`,fireC2 =`has`,fireC1 =`accurate fire`;
	if (S.Vehicles >= 7)fireC2 =`and an autoloader have`,fireC1 =`rapid, accurate fire while separating the crew from the stored ammunition`;
	if (S.Vehicles >= 8)armor2 =`A layer of reactive armor has been added on top, protecting the tank from additional damage.`;
	if (S.Vehicles >= 9)turret =`The turret has been massively redesigned, lowering the tank profile and increasing the efficiency of the mechanisms within.`;
	if (S.Vehicles === 10)MG = `140 mm main gun can quash anything even the greatest Old World nations could muster`;
	return `A fleet of main battle tanks ${b} are parked in the garage${c}. ${turret} ${engine} ${armor} ${armor2} The ${MG}${ammo} ${mg} ${fireC0} ${fireC2} ${fireC3} ${fireC1}.`
}

window.AttAir= function() {const V = State.variables,S = V.SFUnit;
	if (S.AirForce >= 1)var W1 =`only armed`,W2 =``,W3 =`a poor weapon against anything flying, but enough to handle ground forces`,engines =``,troops2 =``,stealth =``,support =`support ground troops`,C =`a`,lock =``,scramble =``,PAI =``,troops =``;
		var group =`A small group of attack VTOL have been recommissioned for use by $SF.lower, enough to make up a squadron`;
	if (S.AirForce >= 2)W1 =`armed`;W2 =`and air-to-air missiles`;W3 =`combination that can defend the arcology from anything in the air, as well as ${support}`;
	if (S.AirForce >= 3)engines =`The engines have been tuned, allowing faster flight with greater acceleration.`;
	if (S.AirForce >= 4)troops =`An advanced targeting AI has been installed to intelligently call shots, allowing much more efficent use of ammunition and anti-countermeasure targeting.`;
	if (S.AirForce >= 5)stealth =`The VTOLs have been given stealth technology by replacing the skin with a radar-absorbent material.`;
	if (S.AirForce >= 6)group =`A respectable number of attack VTOL protect your arcology, split into a few squadrons`;
	if (S.AirForce >= 7)C =`A`;support =`attack ground targets`;W2 =`,rocket pods, and air-to-air missiles.`;
	if (S.AirForce >= 8)lock =`Multispectrum countermeasures protect against all known types of missile lock-ons.`;
	if (S.AirForce >= 9)scramble =`The VTOLs can scramble to react to any threat in under three minutes.`;
	if (S.AirForce === 10)PAI =`A piloting AI has been installed, allowing the VTOLs to operate without human interaction.`;
	return`${group}. Several of the landing pads around $arcologies[0].name host groups of four fighters, ready to defend the arcology at a moment's notice. The attack VTOL are currently ${W1} with a Gatling cannon ${W2} ${C} ${W3}. ${troops2} ${engines} ${scramble} ${stealth} ${lock} ${PAI}`;}

window.TsAir = function() {const V = State.variables,S = V.SFUnit;
	if (S.AirForce >= 1)var Num =`number`,capacity =`small platoon or 15`,engines =``,engines2 =``,Radar =``,Armor =``,landing =``,miniguns =``,counter =``;
	if (S.AirForce >= 2)engines =`The tiltrotor engines have been replaced with a more powerful engine, allowing faster travel times.`;
	if (S.AirForce >= 3)counter =`Multispectrum countermeasures have been added to protect against seeking missiles.`;
	if (S.AirForce >= 4)miniguns =`Mounted miniguns have been added to cover soldiers disembarking in dangerous areas.`;
	if (S.AirForce >= 5)Num =`large number`;
	if (S.AirForce >= 6)landing =`The landing equipment has been overhauled, protecting any onboard in case of a hard landing or crash.`;
	if (S.AirForce >= 7)Armor =`Armor has been added to protect passengers from small arms fire from below.`;
	if (S.AirForce >= 8)capacity =`large platoon or 20`;engines2 =`Further tweaks to the engine allow for greater lifting capacity.`;
	if (S.AirForce >= 9)Radar =`Radar-absorbent materials have replaced the old skin, making it difficult to see the VTOL on radar.`;
	if (S.AirForce === 10)engines2 =``;engines =`The tiltrotors have been replaced with tiltjets, allowing for much greater airspeed and acceleration.`;
	return`A ${Num} of transport tiltrotor VTOL have been recommissioned for use by $SF.Lower. The VTOLs are resting on large pads near the base to load either a ${capacity} tons of materiel. ${Armor} ${counter} ${landing} ${engines} ${engines2} ${Radar} ${miniguns}`;}

window.HBT = function() {const V = State.variables,S = V.SFUnit;
	var Body =`The heavy battle tank rests in the corner of the garage, its massive chassis barely able to fit through the widened doors`;
	var armour =`The armour has been modernised`;
	if (S.HBT === 1)return`${Body}.`;
	if (S.HBT === 2)return`${Body} ${armour}.`;
	if (S.HBT === 3)var barrel =`single`,mg =`single`,ml =`single`;
	if (S.HBT === 4)mg =`dual`; if (S.HBT === 5)ml =`dual`;
	if (S.HBT === 6)mg =`tri`; if (S.HBT >= 7)mg =`quad`;
	if (S.HBT === 8)ml =`tri`; if (S.HBT >= 9)barrel =`dual`;
	if (S.HBT === 10)ml =`quad`;
	return`${Body}. ${armour} also the turret has been re-fitted with a ${barrel} barreled 356 mm main gun along with a ${mg} barrel .50 cal and ${ml} row missile launcher.`;}

window.SP = function() {const V = State.variables,S = V.SFUnit;
	if (S.SpacePlane === 1)
		return`A basic black twin engine space plane has been 'borrowed' from the old world.`;
	if (S.SpacePlane > 1)var engine =``,modernised =``,modernised2 =``,modernised3 =``,drag =``,crew =``,engine2 =``,skin =``;
		var shield =`shielding has been upgraded reducing both potential heat damage and radar signature.`;
	if (S.SpacePlane >= 3)engine =`Another pair of engines have been mounted on top of the tail`;
	if (S.SpacePlane >= 4)modernised =`modernized the electronics`;
	if (S.SpacePlane >= 5)modernised2 =`in addition to the fuel lines to increase efficiency`;
	if (S.SpacePlane >= 6)modernised3 =`The engines have been improved to allow for more efficient fuel.`;
	if (S.SpacePlane >= 7)drag =`Reduced the weight and reworked the body to reduce drag.`;
	if (S.SpacePlane >= 8)crew =`Increased the crew comfort and life support systems to increase operational time.`;
	if (S.SpacePlane >= 9)engine2 =`Added an aditional engine per wing which greatly increases acceleration and raises the top speed to mach 15, making it untouchable.`;
	if (S.SpacePlane === 10)skin =`Replaced the skin with an advanced optical illusion kit.`;
	return`The black and silver space plane's ${shield} ${engine}. ${modernised} ${modernised2}. ${modernised3} ${drag} ${crew} ${engine2}`;}

window.GunS = function() {const V = State.variables,S = V.SFUnit;
	if (S.GunS === 1)
		return`A basic black and silver gunship has been 'borrowed' from the old world.`;
	if (S.GunS > 1)var gun =``,electronics =``,crew =``,speed =``;
	if (S.GunS >= 3)gun =`The 140 mm gatteling gun rounds have been upgraded with exposive tips.`;
	if (S.GunS >= 4)electronics =`The electronics have been modernised and made emp resistant.`;
	if (S.GunS >= 5)crew =`The crew seating has been made more confortable.`;
	if (S.GunS >= 6)speed =`Increased the speed and maneuverability.`;
	return`The armour of the black and silver gunship has been modernized. ${gun} ${electronics} ${crew} ${speed}`;}

window.Sat = function() {const V = State.variables,S = V.SFUnit;
	if (S.Satellite === 1)
		return`A basic satellite has been 'borrowed' from the old world.`;
	if (S.Satellite > 1)var wire =``,emp1 =``,beem0 =``,beem3 =``,jam =``,jd3 =``,emp =``,beem1 =``,emp0 =``,beem4 =``,jd =``;
	if (S.Satellite >= 3)wire =`wiring, and circuitry`;
	if (S.Satellite === 4) {jd =`Installed a basic`;} else {jam =` localized communications jammer to the satellite (excludes your own frequencies with little to no leeway) that will "slightly" anger locals until it is deactivated. ${jd3}`;}
	if (S.Satellite >= 5)jd =`Installed a more advanced version that is 50% more powerful`;jd3 =`The AO localization has been increased which reduces the amount of affected equipment`;
	if (S.Satellite === 6) {emp0 =`The satellite is now equipped with a basic`;beem0 =`an entire city block.`;} else {emp1 =` EMP generator (advanced EMP hardening was applied before the insulation and activation) that will "slightly" damage equipment with the AO.`;beem1 =`Thanks to imporvements applied to battery system and shielding in additon to R&D funds, the satellite will be able to shoot a concentrated beam of pure energy that is able to level`;}
	if (S.Satellite >= 7) {emp0 =`The satellite is now equipped with a more advanced version that is 50% more powerful`;} else {beem0 =`a suburb to a block of houses.`;}
	if (S.Satellite === 8)beem0 =`a single house to 30m.`;beem3 =`The beem can also now fire off a heat wave to disorrent targets`;
	if (S.Satellite === 9) {beem0 =`20m to 10m.`;} else {beem3 =`The beem can also now fire off a much stronger heat wave to disorrent targets for longer and with more effects.`;}
	if (S.Satellite === 10)beem0 =`5m to 1m.`;beem4 =`It is now possible for the beem to be split as required.`;
	return`Modernised the satellite's electronics ${wire}. ${jd}${jam} ${jd3} ${emp0}${emp1} ${beem1} ${beem0} ${beem3} ${beem4}`;}

window.GR = function() {const V = State.variables,S = V.SFUnit;
	if (S.GiantRobot === 1)return`A basic black and silver giant robot has been 'borrowed'.`;
	if (S.GiantRobot > 1)var bat =``,weight =``,skin =``,armor =``,weapons =``,QOL =``,pilots =``;
	if (S.GiantRobot >= 3)bat =`.Power efficiency has been increased`;
	if (S.GiantRobot >= 4)weight =`Overall weight has been reduced signicantly allowing for greater mobility.`;
	if (S.GiantRobot >= 5)bat =`Power efficiency and battery capacity have been increased.`;
	if (S.GiantRobot >= 6)armor =`Armor has been thickened and is lighter`;
	if (S.GiantRobot >= 7)weapons =`and heat seeking missiles plus a massive 150m long energy sword in addition to quad 420 cm back mounted powerful electromagnetic cannons`;
	if (S.GiantRobot >= 8)pilots =`The pilot count has been increased to two via a synced neural link.`;
	if (S.GiantRobot >= 9)QOL =`Improved the life support systems and crew seating, allowing for longer operational durations. Added hover and boost capabilities, allowing for greater mobility in addition to ramming potential.`;
	if (S.GiantRobot >= 10)skin =`Replaced the skin with an advanced optical illusion kit and overclocked the movement systems allowing for even greater mobility. However the amount of heat generated has increased slightly.`;
	return`The black and silver gaint robot has had it's wiring and circuitry upgraded ${bat} ${weight} ${armor}. For self defense the robot has it's bare hands ${weapons}. ${pilots} ${QOL} ${skin}`;}

window.ms = function() {const V = State.variables,S = V.SFUnit;
	if (S.MissileSilo === 1)return`A basic black and silver missile silo has been 'borrowed' from the old world.`;
	if (S.MissileSilo === 2)return`Modernized the black and silver missile silo's launching electronics`;
	if (S.MissileSilo === 3)return`Modernized the black and silver missile silo's launching electronics, wiring and circuitry.`;}

window.AC = function() {const V = State.variables,S = V.SFUnit; 
	if (S.AircraftCarrier === 1)return`An old aircraft carrier has been 'borrowed' from the old world for use by $SF.Lower. It is moored to the pier in the Naval Yard. ${jets} strike jets have been recommissioned to serve as its airpower. `;
	if (S.AircraftCarrier > 1)var dock =`The aircraft carrier is moored to the pier in the Naval Yard.`; var emp =`The electronics and wiring have been shielded to protect from EMP blasts`; var radar =``,emp2 =`.`,morale =``,AA ='',prop =``,scramble ='',jets =`Mothballed`; var jets2 =``;
	if (S.AircraftCarrier >= 3)radar =`The island's radar and comms have been improved.`; 
	if (S.AircraftCarrier >= 4)AA =`The antiair guns have been updated to automatically track and predict enemy aircraft movement.`; 
	if (S.AircraftCarrier >= 5)prop =`The propulsion system has been tweaked to be much more difficult to pick up by sonar.`;
	if (S.AircraftCarrier >= 6)jets =`Modern`; 
	if (S.AircraftCarrier >= 7)morale =`The mess, bunks, and recreation on the ship have been renovated, boosting morale among the sailors.`;
	if (S.AircraftCarrier >= 8)jets2 =`with state-of-the-art weapons systems`; 
	if (S.AircraftCarrier >= 9)scramble =`The catapult has been converted into an electromagnetic launcher, halving the time it takes to scramble jets.`;
	if (S.AircraftCarrier >= 10)emp2 =`, and the power plant has been converted to nuclear power.`;
	return`${dock} ${jets} strike jets ${jets2} have been recommissioned to serve as its airpower.${scramble} ${emp}${emp2} ${radar} ${AA} ${prop} ${morale}`;}

window.Sub = function() {const V = State.variables,S = V.SFUnit;
	if (S.Sub === 1)return`An old attack submarine has been recommissioned from the old world, and is moored to the pier of the Naval Yard. Because diesel engines provide power and breathing oxygen is kept in pressurized canisters, the sub must frequently surface.`;
	if (S.Sub > 1)var dock =`The attack submarine is moored to the pier of the Naval Yard.`,reactor =`A nuclear reactor provides power`;
	var reactor1 =`, but because oxygen is still kept in pressurized canisters the sub must frequently surface to replenish its oxygen stocks.`,missiles =``,Cal =``,hull =``,tubes =``,sonar =``,control =``;
	if (S.Sub >= 3)reactor1 =`and an oxygen generator pulls O₂ from the surrounding seawater, allowing the submarine to remain underwater for months if necessary.`;
	if (S.Sub >= 4)Cal =` Calibration of the propulsion systems has reduced the telltale hum of a moving sub to a whisper.`; 
	if (S.Sub >= 5)hull =`The outer hull has been redesigned to absorb sonar and for hydrodynamics.`;
	if (S.Sub === 6)tubes =`The torpedo tubes have been redesigned for much faster loading speeds.`;
	if (S.Sub >= 7)sonar =`The passive sonar has been finely tuned to detect mechanical noises kilometers away.`; 
	if (S.Sub >= 8)control =`The control room computers have been upgraded to automate many conn duties.`;
	if (S.Sub >= 9)tubes =`The torpedo tubes have been redesigned for much faster loading speeds, and hold newer,faster and more agile torpedoes.`;
	if (S.Sub === 10)missiles =`The submarine has been outfitted with several cruise missiles to attack land or sea-based targets.`
	return`${dock} ${reactor} ${reactor1} ${Cal} ${hull} ${tubes} ${sonar} ${control} ${missiles}`;}

window.HAT = function() {const V = State.variables,S = V.SFUnit;
	if (S.HAT === 1)var skirt =`, has been recommissioned for use by $SF.Lower`,guns =``,turbines =``,armor =``,tons =`200`,ramps =``,frame =``,loadout =``;
	if (S.HAT >= 2)skirt =`. The skirt has been upgraded to improve cushion when travelling over uneven terrain and waves, as well as increasing durability`;
	if (S.HAT >= 3)var guns2 =`minigun`;guns =`A .50 cal ${guns2} has been mounted in each of the four corners of the craft to defend against attackers.`;
	if (S.HAT >= 4)var fans =`rear fans`,speed =`acceleration and speed`;turbines =`The turbines powering the ${fans} have been replaced with a more powerful version, allowing greater ${speed}.`;
	if (S.HAT >= 5)armor =`The armor protecting its cargo has been increased.`;
	if (S.HAT >= 6)tons =`300`;fans =`rear fans and impeller`;speed =`acceleration, speed, and carrying capacity`;
	if (S.HAT >= 7)guns2 =`minigun and grenade launcher combo`;
	if (S.HAT >= 8)ramps =`The loading ramps have been improved, allowing for faster unloading.`;
	if (S.HAT >= 9)frame =`The frame has been widened and reinforced, allowing for more space on the deck.`;
	if (S.HAT === 10)loadout =`An experimental loadout sacrifices all carrying capacity to instead act as a floating gun platform by mounting several rotary autocannons the deck, should the need arise.`;
	return`An air cushion transport vehicle, or hovercraft${skirt}. It is parked on the pier of the Naval Yard, ready to ferry ${tons} tons of soldiers and vehicles at any time. ${guns} ${turbines} ${armor} ${ramps} ${frame} ${loadout}`;}
	
window.Interactions = function() {const V = State.variables,T = State.temporary;
var choice =``,gift =``,giftdec =``,giftdec2 =``,Colonel =``,join =``,status =``,staus2 =``;
if (V.SF.Units !== T.max) {if (V.SF.U === 1)status =`being`
	else status =`able to be`;staus2 =` improved this week`;
} else {status =`fully equipped and upgraded - nothing else can be done`;}
if (V.SF.WG === 1||(V.SFColonel.Talk === 1||V.SFColonel.Fun === 1))choice =`. This week you have already`;
	if (V.SF.WG === 1) {gift =`been provided with`;
		if (V.choice === 1) {giftdec =`an extra @@.yellowgreen;<<print cashFormat(Math.ceil($CashGift))>>@@ in tribute`;
		} else if (V.choice === 2||V.choice === 3) {giftdec =`a message of support, @@.green;improving@@`;
			if (V.choice == 2)giftdec2 =`your reputation.`; else giftdec2 =`the prosperity of $arcologies[0].name`;
		}
	}
	if (V.SFColonel.Talk === 1||V.SFColonel.Fun === 1) {Colonel =`spent time with The Colonel`;
		if (V.SF.WG === 1) {join =`and`;}}
return`${status}${staus2}${choice}${gift}${giftdec}${giftdec2}${join}${Colonel}.//`;}