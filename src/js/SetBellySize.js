:: SetBellySize [script]

window.SetBellySize = function SetBellySize(slave) {
	let _implantSize
	WombNormalizePreg(slave) /*now with support for legacy code that advance pregnancy by setting .preg++ */ 

	if (slave.bellyImplant > 0)
		_implantSize = slave.bellyImplant
	else
		_implantSize = 0
		
	if (slave.inflation == 3)	
		slave.bellyFluid = 10000
	else if (slave.inflation == 2)
		slave.bellyFluid = 5000
	else if (slave.inflation == 1)
		slave.bellyFluid = 2000
	else
		slave.bellyFluid = 0
	
	slave.belly = slave.bellyPreg+slave.bellyFluid+_implantSize
}
