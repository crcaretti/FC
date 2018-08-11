/*SecForceEX JS*/ window.SFC = function() {const V = State.variables;
if (V.SFTradeShow.CanAttend === -1) {return`The Colonel`;
} else {
	if (V.LieutenantColonel === 1) {
		return`Lieutenant Colonel <<= SlaveFullName($LieutenantColonel)>>`;
	} else {return`a designated soldier`};
}};

window.SFCR = function() {const V = State.variables;
	if (V.SFColonel.Status === 0) {return`boss`;
	} else if (V.SFColonel.Status >= 10) {return`friend`;
	} else if (V.SFColonel.Status >= 25) {return`close friend`;
	} else if (V.SFColonel.Status >= 45) {if (V.PC.title === 1) {return`boyfriend`;} else {return`girlfriend`;}
	} else if (V.SFColonel.Status >= 65) {return`lover`;}}

window.TroopDec = function() {const V = State.variables;const commom = "the <<print commaNum($SFUnit.Troops)>> members of $SF.Lower";
if (V.SFUnit.Troops < 100)
	return`sparsely occupied, ${commom} residing within them concentrating together in a corner. The hundreds of empty beds and lockers visibly herald the future`;
else if (V.SFUnit.Troops < 400)
	return`lightly occupied, with ${commom} starting to spread out across them`;
else if (V.SFUnit.Troops < 800)
	return`moderately occupied, though ${commom} residing within have a considerable amount of extra room`;
else if (V.SFUnit.Troops < 1500)
	return`well-occupied, and ${commom} residing within have started to form small cliques based on section and row`;
else if (V.SFUnit.Troops < 2000)
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

window.Count = function() {const V = State.variables,T = State.temporary;
	T.FirebaseU = 10,T.ArmouryU = 10,T.DrugsU = 10;
	T.Garage = V.SFUnit.Vehicles+V.SFUnit.HBT,T.VehiclesU = 0;
	T.HBTU = 10,T.GarageU = T.VehiclesU+T.HBTU;
	T.Hanger = V.SFUnit.AirForce+V.SFUnit.SpacePlane+V.SFUnit.GunS,T.AirForceU = 10,T.GunSU = 6;
	if (V.SFUnit.Armoury >= 10) {T.SpacePlaneU = 10;} else {T.SpacePlaneU = 9;};
	T.HangerU = T.AirForceU+T.SpacePlaneU+T.GunSU,T.DronesU = 8;
	if (V.PC.hacking >= 75) {T.SatU = 10,T.GiantRobotU = 10;} else {T.SatU = 9,T.GiantRobotU = 9;};T.MissileSiloU = 3;
	T.Base = V.SFUnit.Firebase+V.SFUnit.Armoury+V.SFUnit.Drugs+V.SFUnit.Drones+T.Garage+T.Hanger;
	T.BaseU = T.FirebaseU+T.ArmouryU+T.DrugsU+T.DronesU+T.GarageU+T.HangerU;
	if (V.PC.hacking >= 75) {T.SubU = 10;} else {T.SubU = 9;};T.HATU = 10;T.AircraftCarrierU = 10;
	V.SFUnit.Firebase = Math.clamp(V.SFUnit.Firebase, 0, T.FirebaseU);
	V.SFUnit.Armoury = Math.clamp(V.SFUnit.Armoury, 0, T.ArmouryU);
	V.SFUnit.Drugs = Math.clamp(V.SFUnit.Drugs, 0, T.DrugsU);
	V.SFUnit.Vehicles = Math.clamp(V.SFUnit.Vehicles, 0, T.VehiclesU);
	V.SFUnit.HBT = Math.clamp(V.SFUnit.HBT, 0, T.HBTU);
	V.SFUnit.AirForce = Math.clamp(V.SFUnit.AirForce, 0, T.AirForceU);
	V.SFUnit.SpacePlane = Math.clamp(V.SFUnit.SpacePlane, 0, T.SpacePlaneU);
	V.SFUnit.GunS = Math.clamp(V.SFUnit.GunS, 0, T.GunSU);
	V.SFUnit.SpacePlane = Math.clamp(V.SFUnit.SpacePlane, 0, T.SpacePlaneU);
	V.SFUnit.Drones = Math.clamp(V.SFUnit.Drones, 0, T.DronesU);
	V.SFUnit.Satellite = Math.clamp(V.SFUnit.Satellite, 0, T.SatU);
	V.SFUnit.GiantRobot = Math.clamp(V.SFUnit.GiantRobot, 0, T.GiantRobotU);
	V.SFUnit.MissileSilo = Math.clamp(V.SFUnit.MissileSilo, 0, T.MissileSiloU);
	V.SFUnit.AircraftCarrier = Math.clamp(V.SFUnit.AircraftCarrier, 0, T.AircraftCarrierU);
	V.SFUnit.Sub = Math.clamp(V.SFUnit.Sub, 0, T.SubU);
	V.SFUnit.HAT = Math.clamp(V.SFUnit.HAT, 0, T.HATU);
	if (V.terrain !== "oceanic" && V.terrain !== "marine") {
	T.LaunchBay = V.SFUnit.Satellite+V.GiantRobot+V.MissileSilo;
	T.LaunchBayU = T.SatU+T.GiantRobotU+T.MissileSiloU;
	V.SF.Units = T.Base+T.LaunchBay,T.max = T.BaseU+T.LaunchBayU; T.Land = 1;
} else if (V.terrain === "oceanic"||V.terrain === "marine") {
	T.LaunchBay = V.SFUnit.Satellite,T.LaunchBayU = T.SatU;
	T.NavalYard = V.SFUnit.AircraftCarrier+V.Sub+V.HAT,T.NavalYardU = T.AircraftCarrierU+T.SubU+T.HATU;
	V.SF.Units = T.Base+T.LaunchBay+T.NavalYard,T.max = T.BaseU+T.LaunchBayU+T.NavalYardU;}
	V.SF.Units = Math.clamp(V.SF.Units, 0, T.max); T.Land = 0;
	if (V.economy === .5) {T.Env = 4} else if (V.economy === 1.5) {T.Env = 2} else {T.Env = 3};
}

window.Firebase = function() {const V = State.variables;
	if (V.SFUnit.Firebase === 0)
		return`Is currently quite basic, consisting of little more than a dormitory, armoury, a processing facility for human spoils, and a common area, sectioned off by stacks of empty supply crates. The cavernous space, however, is ripe for expansion.`;
	if (V.SFUnit.Firebase === 1)
		return`Has become more permanent, expanding into free space, erecting permanent dividers, and sectioning off an area for use as a garage and vehicle maintenance bay.`;
	if (V.SFUnit.Firebase === 2)
		return`Has added a facility for the storage, maintenance, and deployment of armed combat drones, and added storage facilities for the soldiers to store their personal spoils in.`;
	if (V.SFUnit.Firebase === 3)
		return`Has added additional support personnel and equipment, allowing the potential procurement of heavier infantry armour, fighting vehicles, and combat drones.`;
	if (V.SFUnit.Firebase === 4)
		return`Has expanded tremendously, adding an aerial control facility and express elevator connecting to a ring of launch pads and hangars built around the arcology's upper levels. Additional facilities have been added for soldier recreation, and Spartan quarters for live-in slaves, both menial and service, have been installed.`;
	if (V.SFUnit.Firebase > 4)var quanitiy ="";var casemates ="";var pads ="";var sizeI ="";var barrel ="";
	var t =`Has (mostly) taken on the appearance of a professional military installation, with clearly delineated soldier and logistical areas, dedicated support and recreation facilities, in addition to advanced command and control apparatus. As a final measure,`;
	if (V.SFUnit.Firebase >= 6) {quanitiy =`quad`;} else {sizeI =`356 cm wide`;}
	if (V.SFUnit.Firebase >= 7) {casemates =`fortified EMP/jammer resistant`} else {sizeI =`406 cm wide`;}
	if (V.SFUnit.Firebase >= 8) {pads =`and a powerful arcology wide electromagnetic force field has been installed`;} else {barrel =`double-barreled`;}
	if (V.SFUnit.Firebase === 9)barrel =`tripple-barreled`;sizeI =`415 cm wide`;
	if (V.SFUnit.Firebase === 10)barrel =`quad-barreled`;sizeI =`420 cm wide`;
	return` ${t} ${quanitiy} heavy, long range, ${barrel} electromagnetic railgun ${sizeI} artillery pieces have been installed in ${casemates} casemates along the aerial launch pads ${pads}, giving $SF.Lower an immense superiority in local firepower.`;}

window.Armoury = function() {const V = State.variables;
	if (V.SFUnit.Armoury === 0)
		return`Is well-stocked with high-quality personal weapons and light armour, but contains little in the way of exceptional armament.`;
	if (V.SFUnit.Armoury === 1)
		return`Has large stocks of the absolute latest personal weapons and light armour, It has also added first-generation exo-suits to improve soldier lethality.`;
	if (V.SFUnit.Armoury === 2)
		return`Has acquired advanced tactical helmets and second-generation exo-suits to further improve soldier lethality.`;
	if (V.SFUnit.Armoury === 3)
		return`Has replaced deployed exo-suits with basic enclosed combat armour suits, and has further begun to deploy early electromagnetic (coilgun) weaponry.`;
	if (V.SFUnit.Armoury === 4)
		return`Has begun to equip the soldiers with more advanced combat armour suits, and has expanded its inventory of electromagnetic weaponry.`;
	if (V.SFUnit.Armoury > 4)
	var t =`Acquired heavy weapon attachments for its combat armour suits`;
	var y =`for the soldiers, ensuring that the infantry of $SF.Lower is perhaps the most well-equipped in the world.`;
	if (V.SFUnit.Armoury === 5)var size =`small`;
	if (V.SFUnit.Armoury === 6)size =`both small and medium`;
	if (V.SFUnit.Armoury >= 7)size =`small/medium and large`;
	if (V.SFUnit.Armoury === 8)var kit =`with basic thrusters`;
	if (V.SFUnit.Armoury === 9)kit =`with advanced thrusters`;
	if (V.SFUnit.Armoury === 10)kit =`with advanced thrusters and optical illusion kits`;
	return`${t} ${kit},and has further sourced ${size} advanced electromagnetic weaponry (miniaturized railguns) ${y}`;}

window.Drugs = function() {const V = State.variables;
	if (V.SFUnit.Drugs === 0)
		return`Is providing the soldiers with standard ephedrine-based stimulants.`;
	if (V.SFUnit.Drugs === 1)
		return`Improved the formula of the ephedrine-based stimulants, concentrating them and increasing both their potency, and the effectiveness of the soldiers under their influence.`;
	if (V.SFUnit.Drugs === 2)
		return`Replaced the soldiers' stimulants with methamphetamine-based variants, greatly increasing their alertness and aggressiveness when under their influence.`;
	if (V.SFUnit.Drugs === 3)
		return`Improved and concentrated the methamphetamine-based stimulants, and has also begun providing soldiers with phencyclidine-based dissociatives, allowing the soldiers to excuse their actions in the field and reducing any reluctance to follow severe orders.`;
	if (V.SFUnit.Drugs > 3)var improvement =``;var tryptamine =``;var tryptamine1 =``;var Dose =``;var LSD =``;var purity =``;var doc =``;var Effects =``;
	var x = 'the formulas of the methamphetamine-based stimulants and phencyclidine-based dissociatives,';
	if (V.SFUnit.Drugs === 4)improvement =`further`;
		tryptamine =`has also begun providing tryptamine-based psychedelics to the soldiers, allowing them to avoid traumatic stress in the field.`;
	if (V.SFUnit.Drugs >= 5)improvement =`maximally`;
		tryptamine =`tryptamine-based psychedelics`;
		tryptamine1 =`Greatly increasing their effectiveness in all aspects thus ensuring that the soldiers of $SF.Lower go into combat wired, aggressive, and euphoric (if needed).`;
	if (V.SFUnit.Drugs === 6)purity =`with much higher purity compontent`;
	if (V.SFUnit.Drugs === 7)LSD =`and a slight trace of LSD`;
	if (V.SFUnit.Drugs === 8)Dose =`into a single dose`;doc =`<div style='font-size: 75%;'>*Only the doctors of $SF.Lower were consulted to ensure a completely unbiased result.</div>`;
		Effects =`However side effects may include (no particular order): Dissociative Identity Disorder, severe clinical depression, unstoppable vomiting, extreme paranoia, PTSD, finally total organ failure. Recommended by 9/10 doctors*.`;
	if (V.SFUnit.Drugs === 9)Effects =`Potential side effects have been reduced slightly to “only mildly” severe ones: Dissociative Identity Disorder, severe clinical depression, unstoppable vomiting, extreme paranoia and PTSD. Now recommended by 15/10 doctors*.`;var Effect0 =``;
	if (V.SFUnit.Drugs === 10)Dose =`into a single higher strength dose`;
		Effect0 =`at the cost of lengthening the effects`;
	return`Has ${improvement} refined ${x} and ${tryptamine} ${purity} ${LSD} ${Dose}. ${tryptamine1} ${Effect0}.${Effects} ${doc}`;}

window.Drones = function() {const V = State.variables;
	if (V.SFUnit.Drones === 0)
		return`Contains a small number of 're-purposed' non-military drones from the arcology's original contingent`;
	if (V.SFUnit.Drones === 1)
		return`Has replaced the security drones with basic, lightly-armored military combat models possessing integrated small arms`;
	if (V.SFUnit.Drones === 2)
		return`Has replaced its basic military drones with more advanced models and added a number of support drones carrying heavy weaponry to its fleet`;
	if (V.SFUnit.Drones === 3)
		return`Acquired even more advanced models of both the standard combat drones and the heavy support drones, and expanded its numbers of both.`;
	if (V.SFUnit.Drones === 4)
		return`Has upgraded both the standard and support models of drones to carry basic electromagnetic weaponry, improving their overall combat effectiveness.`;
	if (V.SFUnit.Drones === 5)
		return`Has mproved the electromagnetic armament of its drones by mounting both miniaturized and heavy railguns on them. In addition further sourcing numerous models of drones for roles as diverse as reconnaissance, independent slave capture and swarming tactics.`;var thick =``;var power =``;var advanced =``;
	if (V.SFUnit.Drones === 6)thick =`thicker`;
	if (V.SFUnit.Drones === 7)power =`higher power`;
	if (V.SFUnit.Drones === 8)advanced =`more advanced highly`;
	return`Has acquired even lighter advanced ${thick} armored combat drones with ${power} electromagnetic weaponry, advanced heavy drones with ${power} electromagnetic support weaponry along with ${advanced} specialized drones for reconnaissance, capture, and swarm tactics.`;}
/* window.SFUnit.VehiclesDec = function() {const V = State.variables; */
window.AttAir= function() {const V = State.variables;
	if (V.SFUnit.AirForce >= 1)var W1 =`only armed`;var W2 =``;var W3 =`a poor weapon against anything flying, but enough to handle ground forces`;var engines =``;var troops2 =``;var stealth =``;var support =`support ground troops`;var C =`a`;var lock =``;var scramble =``;var PAI =``;
		var group =`A small group of attack VTOL have been recommissioned for use by $SF.lower, enough to make up a squadron`;
	if (V.SFUnit.AirForce >= 2)W1 =`armed`;W2 =`and air-to-air missiles`;W3 =`${C} combination that can defend the arcology from anything in the air, as well as ${support}`;
	if (V.SFUnit.AirForce >= 3)engines =`The engines have been tuned, allowing faster flight with greater acceleration.`;
	if (V.SFUnit.AirForce >= 4)troops =`An advanced targeting AI has been installed to intelligently call shots, allowing much more efficent use of ammunition and anti-countermeasure targeting.`;
	if (V.SFUnit.AirForce >= 5)stealth =`The VTOLs have been given stealth technology by replacing the skin with a radar-absorbent material.`;
	if (V.SFUnit.AirForce >= 6)group =`A respectable number of attack VTOL protect your arcology, split into a few squadrons`;
	if (V.SFUnit.AirForce >= 7)C =`A`;support =`attack ground targets`;W2 =`rocket pods, and air-to-air missiles.`;
	if (V.SFUnit.AirForce >= 8)lock =`Multispectrum countermeasures protect against all known types of missile lock-ons.`;
	if (V.SFUnit.AirForce >= 9)scramble =`The VTOLs can scramble to react to any threat in under three minutes.`;
	if (V.SFUnit.AirForce === 10)PAI =`A piloting AI has been installed, allowing the VTOLs to operate without human interaction.`;
	return`${group}. Several of the landing pads around $arcologies[0].name host groups of four fighters, ready to defend the arcology at a moment's notice. The attack VTOL are currently ${W1} with a Gatling cannon ${W2} ${W3}. ${troops2} ${engines} ${scramble} ${stealth} ${lock} ${PAI}`;}

window.TsAir = function() {const V = State.variables;
	if (V.SFUnit.AirForce >= 1)var Num = `number`;var capacity = `small platoon or 15`;var engines =``;var engines2 =``;var Radar =``;var Armor =``;var landing =``;var miniguns =``;var counter =``;
	if (V.SFUnit.AirForce >= 2)engines =`The tiltrotor engines have been replaced with a more powerful engine, allowing faster travel times.`;
	if (V.SFUnit.AirForce >= 3)counter =`Multispectrum countermeasures have been added to protect against seeking missiles.`;
	if (V.SFUnit.AirForce >= 4)miniguns =`Mounted miniguns have been added to cover soldiers disembarking in dangerous areas.`;
	if (V.SFUnit.AirForce >= 5)Num =`large number`;
	if (V.SFUnit.AirForce >= 6)landing =`The landing equipment has been overhauled, protecting any onboard in case of a hard landing or crash.`;
	if (V.SFUnit.AirForce >= 7)Armor =`Armor has been added to protect passengers from small arms fire from below.`;
	if (V.SFUnit.AirForce >= 8)capacity =`large platoon or 20`;engines2 =`Further tweaks to the engine allow for greater lifting capacity.`;
	if (V.SFUnit.AirForce >= 9)Radar =`Radar-absorbent materials have replaced the old skin, making it difficult to see the VTOL on radar.`;
	if (V.SFUnit.AirForce === 10)engines2 =``;engines =`The tiltrotors have been replaced with tiltjets, allowing for much greater airspeed and acceleration.`;
	return`A ${number} of transport tiltrotor VTOL have been recommissioned for use by $SF.Lower. The VTOLs are resting on large pads near the base to load either a ${capacity} tons of materiel. ${Armor} ${counter} ${landing} ${engines} ${engines2} ${Radar} ${miniguns}`;}

window.HBT = function() {const V = State.variables;
	var Body =`The heavy battle tank rests in the corner of the garage, its massive chassis barely able to fit through the widened doors`;
	var armour =`The armour has been modernised`;
	if (V.SFUnit.HBT === 1)return`${Body}.`;
	if (V.SFUnit.HBT === 2)return`${Body} ${armour}.`;
	if (V.SFUnit.HBT === 3)var barrel =`single`;var mg =`single`;var ml =`single`;
	if (V.SFUnit.HBT === 4)mg =`dual`; if (V.SFUnit.HBT === 5)ml =`dual`;
	if (V.SFUnit.HBT === 6)mg =`tri`; if (V.SFUnit.HBT >= 7)mg =`quad`;
	if (V.SFUnit.HBT === 8)ml =`tri`; if (V.SFUnit.HBT >= 9)barrel =`dual`;
	if (V.SFUnit.HBT === 10)ml =`quad`;
	return`${Body}. ${armour} also the turret has been re-fitted with a ${barrel} barreled 356 mm main gun along with a ${mg} barrel .50 cal and ${ml} row missile launcher.`;}

window.SP = function() {const V = State.variables;
	if (V.SFUnit.SpacePlane === 1)
		return`A basic black twin engine space plane has been 'borrowed' from the old world.`;
	if (V.SFUnit.SpacePlane > 1)var engine =``;var modernised =``;var modernised2 =``;var modernised3 =``;var drag =``;var crew =``;var engine2 =``;var skin =``;
		var shield =`shielding has been upgraded reducing both potential heat damage and radar signature.`;
	if (V.SFUnit.SpacePlane >= 3)engine =`Another pair of engines have been mounted on top of the tail`;
	if (V.SFUnit.SpacePlane >= 4)modernised =`modernized the electronics`;
	if (V.SFUnit.SpacePlane >= 5)modernised2 =`in addition to the fuel lines to increase efficiency`;
	if (V.SFUnit.SpacePlane >= 6)modernised3 =`The engines have been improved to allow for more efficient fuel.`;
	if (V.SFUnit.SpacePlane >= 7)drag =`Reduced the weight and reworked the body to reduce drag.`;
	if (V.SFUnit.SpacePlane >= 8)crew =`Increased the crew comfort and life support systems to increase operational time.`;
	if (V.SFUnit.SpacePlane >= 9)engine2 =`Added an aditional engine per wing which greatly increases acceleration and raises the top speed to mach 15, making it untouchable.`;
	if (V.SFUnit.SpacePlane === 10)skin =`Replaced the skin with an advanced optical illusion kit.`;
	return`The black and silver space plane's ${shield} ${engine}. ${modernised} ${modernised2}. ${modernised3} ${drag} ${crew} ${engine2}`;}

window.GunS = function() {const V = State.variables;
	if (V.SFUnit.GunS === 1)
		return`A basic black and silver gunship has been 'borrowed' from the old world.`;
	if (V.SFUnit.GunS > 1)var gun =``;var electronics =``;var crew =``;var speed =``;
	if (V.SFUnit.GunS >= 3)gun =`The 140 mm gatteling gun rounds have been upgraded with exposive tips.`;
	if (V.SFUnit.GunS >= 4)electronics =`The electronics have been modernised and made emp resistant.`;
	if (V.SFUnit.GunS >= 5)crew =`The crew seating has been made more confortable.`;
	if (V.SFUnit.GunS >= 6)speed =`Increased the speed and maneuverability.`;
	return`The armour of the black and silver gunship has been modernized. ${gun} ${electronics} ${crew} ${speed}`;}

window.Sat = function() {const V = State.variables;
	if (V.SFUnit.Satellite === 1)
		return`A basic satellite has been 'borrowed' from the old world.`;
	if (V.SFUnit.Satellite > 1)var wire =``;var emp1 =``;var beem0 =``;var beem3 =``;var jam =``;var jd3 =``;var emp =``;var beem1 =``;var emp0 =``;var beem4 =``;var jd =``;
	if (V.SFUnit.Satellite >= 3)wire =`wiring, and circuitry`;
	if (V.SFUnit.Satellite === 4) {jd =`Installed a basic`;} else {jam =` localized communications jammer to the satellite (excludes your own frequencies with little to no leeway) that will "slightly" anger locals until it is deactivated. ${jd3}`;}
	if (V.SFUnit.Satellite >= 5)jd =`Installed a more advanced version that is 50% more powerful`;jd3 =`The AO localization has been increased which reduces the amount of affected equipment`;
	if (V.SFUnit.Satellite === 6) {emp0 =`The satellite is now equipped with a basic`;beem0 =`an entire city block.`;} else {emp1 =` EMP generator (advanced EMP hardening was applied before the insulation and activation) that will "slightly" damage equipment with the AO.`;beem1 =`Thanks to imporvements applied to battery system and shielding in additon to R&D funds, the satellite will be able to shoot a concentrated beam of pure energy that is able to level`;}
	if (V.SFUnit.Satellite >= 7) {emp0 =`The satellite is now equipped with a more advanced version that is 50% more powerful`;} else {beem0 =`a suburb to a block of houses.`;}
	if (V.SFUnit.Satellite === 8)beem0 =`a single house to 30m.`;beem3 =`The beem can also now fire off a heat wave to disorrent targets`;
	if (V.SFUnit.Satellite === 9) {beem0 =`20m to 10m.`;} else {beem3 =`The beem can also now fire off a much stronger heat wave to disorrent targets for longer and with more effects.`;}
	if (V.SFUnit.Satellite === 10)beem0 =`5m to 1m.`;beem4 =`It is now possible for the beem to be split as required.`;
	return`Modernised the satellite's electronics ${wire}. ${jd}${jam} ${jd3} ${emp0}${emp1} ${beem1} ${beem0} ${beem3} ${beem4}`;}

window.GR = function() {const V = State.variables;
	if (V.SFUnit.GiantRobot === 1)return`A basic black and silver giant robot has been 'borrowed'.`;
	if (V.SFUnit.GiantRobot > 1)var bat =``;var weight =``;var skin =``;var armor =``;var weapons =``;var QOL =``;var pilots =``;
	if (V.SFUnit.GiantRobot >= 3)bat =`.Power efficiency has been increased`;
	if (V.SFUnit.GiantRobot >= 4)weight =`Overall weight has been reduced signicantly allowing for greater mobility.`;
	if (V.SFUnit.GiantRobot >= 5)bat =`Power efficiency and battery capacity have been increased.`;
	if (V.SFUnit.GiantRobot >= 6)armor =`Armor has been thickened and is lighter`;
	if (V.SFUnit.GiantRobot >= 7)weapons =`and heat seeking missiles plus a massive 150m long energy sword in addition to quad 420 cm back mounted powerful electromagnetic cannons`;
	if (V.SFUnit.GiantRobot >= 8)pilots =`The pilot count has been increased to two via a synced neural link.`;
	if (V.SFUnit.GiantRobot >= 9)QOL =`Improved the life support systems and crew seating, allowing for longer operational durations. Added hover and boost capabilities, allowing for greater mobility in addition to ramming potential.`;
	if (V.SFUnit.GiantRobot >= 10)skin =`Replaced the skin with an advanced optical illusion kit and overclocked the movement systems allowing for even greater mobility. However the amount of heat generated has increased slightly.`;
	return`The black and silver gaint robot has had it's wiring and circuitry upgraded ${bat} ${weight} ${armor}. For self defense the robot has it's bare hands ${weapons}. ${pilots} ${QOL} ${skin}`;}

window.ms = function() {const V = State.variables;
	if (V.SFUnit.MissileSilo === 1)return`A basic black and silver missile silo has been 'borrowed' from the old world.`;
	if (V.SFUnit.MissileSilo === 2)return`Modernized the black and silver missile silo's launching electronics`;
	if (V.SFUnit.MissileSilo === 3)return`Modernized the black and silver missile silo's launching electronics, wiring and circuitry.`;}

window.AC = function() {const V = State.variables; 
	if (V.SFUnit.AircraftCarrier === 1)return`An old aircraft carrier has been 'borrowed' from the old world for use by $SF.Lower. It is moored to the pier in the Naval Yard. ${jets} strike jets have been recommissioned to serve as its airpower. `;
	if (V.SFUnit.AircraftCarrier > 1)var dock =`The aircraft carrier is moored to the pier in the Naval Yard.`; var emp =`The electronics and wiring have been shielded to protect from EMP blasts`; var radar =``;var emp2 =`.`;var morale =``;var AA ='';var prop =``;var scramble ='';var jets =`Mothballed`; var jets2 = "";
	if (V.SFUnit.AircraftCarrier >= 3)radar =`The island's radar and comms have been improved.`; 
	if (V.SFUnit.AircraftCarrier >= 4)AA = `The antiair guns have been updated to automatically track and predict enemy aircraft movement.`; 
	if (V.SFUnit.AircraftCarrier >= 5)prop =`The propulsion system has been tweaked to be much more difficult to pick up by sonar.`;
	if (V.SFUnit.AircraftCarrier >= 6)jets =`Modern`; 
	if (V.SFUnit.AircraftCarrier >= 7)morale =`The mess, bunks, and recreation on the ship have been renovated, boosting morale among the sailors.`;
	if (V.SFUnit.AircraftCarrier >= 8)jets2 =`with state-of-the-art weapons systems`; 
	if (V.SFUnit.AircraftCarrier >= 9)scramble = `The catapult has been converted into an electromagnetic launcher, halving the time it takes to scramble jets.`;
	if (V.SFUnit.AircraftCarrier >= 10)emp2 =`, and the power plant has been converted to nuclear power.`;
	return`${dock} ${jets} strike jets ${jets2} have been recommissioned to serve as its airpower.${scramble} ${emp}${emp2} ${radar} ${AA} ${prop} ${morale}`;}

window.Sub = function() {const V = State.variables;
	if (V.SFUnit.Sub === 1)return`An old attack submarine has been recommissioned from the old world, and is moored to the pier of the Naval Yard. Because diesel engines provide power and breathing oxygen is kept in pressurized canisters, the sub must frequently surface.`;
	if (V.SFUnit.Sub > 1)var dock =`The attack submarine is moored to the pier of the Naval Yard.`; var reactor =`A nuclear reactor provides power`;
	var reactor1 = `, but because oxygen is still kept in pressurized canisters the sub must frequently surface to replenish its oxygen stocks.`;var missiles = ""; var Cal = "";var hull = "";var tubes = "";var sonar = "";var control = "";
	if (V.SFUnit.Sub >= 3)reactor1 =`and an oxygen generator pulls O₂ from the surrounding seawater, allowing the submarine to remain underwater for months if necessary.`;
	if (V.SFUnit.Sub >= 4)Cal =` Calibration of the propulsion systems has reduced the telltale hum of a moving sub to a whisper.`; 
	if (V.SFUnit.Sub >= 5)hull =`The outer hull has been redesigned to absorb sonar and for hydrodynamics.`;
	if (V.SFUnit.Sub === 6)tubes =`The torpedo tubes have been redesigned for much faster loading speeds.`;
	if (V.SFUnit.Sub >= 7)sonar =`The passive sonar has been finely tuned to detect mechanical noises kilometers away.`; 
	if (V.SFUnit.Sub >= 8)control =`The control room computers have been upgraded to automate many conn duties.`;
	if (V.SFUnit.Sub >= 9)tubes =`The torpedo tubes have been redesigned for much faster loading speeds, and hold newer,faster and more agile torpedoes.`;
	if (V.SFUnit.Sub === 10)missiles =`The submarine has been outfitted with several cruise missiles to attack land or sea-based targets.`
	return`${dock} ${reactor} ${reactor1} ${Cal} ${hull} ${tubes} ${sonar} ${control} ${missiles}`;}

window.HAT = function() {const V = State.variables;
	if (V.SFUnit.HAT === 1)var skirt =`, has been recommissioned for use by $SF.Lower`;var guns =``;var turbines =``;var armor =``;var tons =`200`;var ramps =``;var frame =``;var loadout =``;
	if (V.SFUnit.HAT >= 2)skirt =`. The skirt has been upgraded to improve cushion when travelling over uneven terrain and waves, as well as increasing durability`;
	if (V.SFUnit.HAT >= 3)var guns2 = `minigun`;guns =`A .50 cal ${guns2} has been mounted in each of the four corners of the craft to defend against attackers.`;
	if (V.SFUnit.HAT >= 4)var fans =`rear fans`;var speed =`acceleration and speed`;turbines =`The turbines powering the ${fans} have been replaced with a more powerful version, allowing greater ${speed}.`;
	if (V.SFUnit.HAT >= 5)armor =`The armor protecting its cargo has been increased.`;
	if (V.SFUnit.HAT >= 6)tons =`300`;fans =`rear fans and impeller`;speed =`acceleration, speed, and carrying capacity`;
	if (V.SFUnit.HAT >= 7)guns2 =`minigun and grenade launcher combo`;
	if (V.SFUnit.HAT >= 8)ramps =`The loading ramps have been improved, allowing for faster unloading.`;
	if (V.SFUnit.HAT >= 9)frame =`The frame has been widened and reinforced, allowing for more space on the deck.`;
	if (V.SFUnit.HAT === 10)loadout =`An experimental loadout sacrifices all carrying capacity to instead act as a floating gun platform by mounting several rotary autocannons the deck, should the need arise.`;
	return`An air cushion transport vehicle, or hovercraft${skirt}. It is parked on the pier of the Naval Yard, ready to ferry ${tons} tons of soldiers and vehicles at any time. ${guns} ${turbines} ${armor} ${ramps} ${frame} ${loadout}`;}
	
window.Interactions = function() {const V = State.variables,T = State.temporary;
var choice = "";var gift ="";var giftdec = "";var giftdec2 = "";var Colonel = "";var join ="";var status =``;var staus2 =``;
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