PYTHON?= python
ifeq (${MAKE_HOST}, x86_64-unknown-cygwin)
	TWEEGOBIN?= tweego.exe
else
	TWEEGOBIN?= tweego
endif

SRCDIR?= src
STARTFILE?= $(SRCDIR)/config/start.tw
FCTARG?= bin/FC.html
GENINCLUDES?=  ./devTools/scripts/includes.py
all: $(FCTARG)

$(STARTFILE):	$(SRCDIR)/config/start.tw.proto $(GENINCLUDES) \
		$(shell find ${SRCDIR} -type d -print)
	$(PYTHON) $(GENINCLUDES) $< $@ $(SRCDIR)

$(FCTARG): $(STARTFILE) $(shell find ${SRCDIR} -type f -name \*.tw -print)
	./devTools/tweeGo/$(TWEEGOBIN) -o $(FCTARG) $(STARTFILE)

clean:
	-$(RM) $(STARTFILE) $(FCTARG)
