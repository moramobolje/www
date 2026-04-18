let schedule = {};
let currentDay = "";
let currentType = "DEPARTURES";

const iataKey = {"TTF":"224th Flight Unit","TWF":"247 Jet Ltd","FTY":"ABC Bedarsflug","AAB":"Abelag Aviation","RUN":"ACT Havayollari","ZY":"Sky Airlines","JP":"Adria Airways","A3":"Aegean Airlines","REA":"Aer Arann","ADN":"Aerodienst GmbH","SU":"Aeroflot Russian Airlines","D9":"Aeroflot-Don","RTE":"Aeronorte","PEL":"Aeropelican Air Services","VV":"Aerosvit Airlines","VIZ":"Aerovis Airlines","MMD":"Air Alsie","ABD":"Air Atlanta Icelandic","9A":"Air Atlantic","BT":"Air Baltic","AB":"Air Berlin","JA":"B & H Airlines","BUR":"Air Bucharest","SM":"Air Cairo","AC":"Air Canada","CA":"Air China","ABR":"Air Contractors","PC":"Pegasus Airlines","AF":"Air France","LZR":"Air Lazur","MCD":"Air Medical","MHS":"Air Memphis","RCH":"Air Mobility Command","AOE":"Air One Executive","TC":"Air Tanzania","ATJ":"Air Traffic GmbH","UKR":"Air Ukraine","URG":"Air Urga","EOL":"Airailes","AK":"AirAsia","RU":"AirBridge Cargo Airlines LLC","FIX":"Airfix Aviation","ARL":"Airlec - Air Aquitaine Transport","JAR":"Airlink","NWG":"NWG-Airwing","PAJ":"Aliparma","AZ":"Alitalia","LVN":"Aliven","VER":"Almaver","XPE":"Amira Air","AAN":"Amsterdam Airlines","RNV":"Armavia","AEU":"Astraeus","ASZ":"Astrakhan Airlines","RC":"Atlantic Airways","KK":"Atlasglobal","TUR":"Atur","AUF":"Augusta Air Luftfahrtunternehmen","LSK":"Aurela","OS":"Austrian Airlines","VBC":"Avb-2004 Ltd","AJF":"Avia Consult Flugbetriebs","AZS":"Aviacon Zitotrans Air Company","VLV":"Avialift Vladivostok","Z3":"Avient Aviation","BGF":"Aviodetachment-28","AGX":"Aviogenex","J2":"Azerbaijan Airlines","B2":"Belavia Belarusian Airlines","BAF":"Belgian Air Force","BID":"Binair","BD":"bmi","BA":"British Airways","FB":"Bulgaria Air","ICL":"CAL Cargo Air Lines","2G":"Cargoitalia","V3":"Carpatair","CAZ":"Cat Aviation","CCF":"CCF Manager Airline","QI":"Cimber Air","RBI":"Air Bright","C9":"Cirrus Airlines","CNB":"Cityline Hungary","CAT":"Civil Air Transport","COL":"Columbia Airlines","CTM":"Commandement Du Transport Aerien Militaire Francais","COE":"Comtel Air","DE":"Condor Flugdienst","CO":"Continental Airlines","OU":"Croatia Airlines","CEF":"Czech Air Force","OK":"Czech Airlines","DCS":"Daimler Chrysler Aviation","DAF":"Danish Air Force","DRT":"Darta","DSO":"Dassault Falcon Service","DI":"dba","DL":"Delta Air Lines","AMB":"Deutsche Rettungsflugwacht","DIS":"Di Air","DUB":"Dubai Airwing","DBK":"Dubrovnik Air","DUK":"Ducair-Luxembourg Air Ambulance","LY":"El Al Israel Airlines","PRG":"Empresa Aero-Servicios Parrague","EU":"Empresa Ecuatoriana De Aviacion","E7":"Estafeta Carga Aerea","K2":"Eurolot","EZ":"Evergreen International Airlines","EXN":"Exin","IFA":"FAI Airservice","FAT":"Farnair Switzerland","DCM":"Fltplan","FZ":"Fly Dubai","FLY":"Fly Me Sweden","BE":"Flybe","FXR":"Foxair","FNG":"Finnish Border Guard","GNJ":"Gain Jet Aviation","GZP":"Gazpromavia","GNZ":"General Aviation","GNX":"Avio Genex","GAF":"German Air Force","4U":"Germanwings","GLJ":"Global Jet Austria","SVW":"Global Jet Luxembourg","GBT":"Gold Belt Air Transport","GDK":"Goldeck-Flug","ZK":"Great Lakes Airlines","HTG":"Grossmann Air Service","HGR":"Hangar 8","HB":"Harbor Airlines","HA":"Hawaiian Airlines","HAF":"Hellenic Air Force","2L":"Helvetic Airways","IJM":"IJM International Jet Management","RFL":"Interfly","IR":"Iran Air","ED":"Air Explore","6H":"Israir","JU":"Air Serbia","PJS":"Jet Aviation","JEI":"Jet Executive International Charter","JEK":"Jet Link","LS":"Jet2.com","JAG":"Jetalliance","JEF":"Jetflite","JNV":"Jetnova de Aviacion Ejecutiva","JTG":"Jettime","KL":"KLM Royal Dutch Airlines","KGL":"Kogalymavia Air Company","KSM":"Kosmos","KIL":"Kuban Airlines","KAF":"Kuwait Airforce","KU":"Kuwait Airways","LNX":"London Executive Aviation","VA":"Virgin Australia","LO":"LOT Polish Airlines","LH":"Lufthansa","MA":"Malev","MAE":"Mali Air","MAD":"Maple Air Services","LMJ":"Masterjet","6F":"MAT Airways","MEM":"Meridian Limited","MWA":"Midwest Airlines (Egypt)","MON":"Monarch Airlines","YM":"Montenegro Airlines","HG":"Niki","NOR":"Norsk Helikopter","NFA":"North Flying","DY":"Norwegian Air Shuttle","OA":"Olympic Airlines","8P":"Pacific Coastal Airline","PIR":"Pamir Airways","PEA":"Pan Europeenne Air Service","PHV":"Phenix Aviation","POT":"Polet","POF":"Police Aux Frontiers","PH":"Polynesian Airlines","POR":"Porteadora De Cosola","AFP":"Portuguese Air Force","PGL":"Premiair Aviation Services","PWF":"Private Wings Flugcharter","QAF":"Qatar Amiri Flight","QAJ":"Quick Air Jet Charter","RAN":"Renan","RRR":"Royal Air Force","ROJ":"Royal Jet","RJ":"Royal Jordanian","RLU":"Rusline","SHU":"Sakhalinskie Aviatrassy (SAT)","SAM":"SAM Colombia","SP":"Sata Air Acores","SK":"Scandinavian Airlines System","YR":"Senic Airlines","LLA":"Servico Leo Lopex","SHJ":"Sharjah Ruler's Flight","S5":"Small Planet Airlines","SCR":"Silver Cloud Air GMBH","SUA":"Silesia Air","ZP":"Silk Way Airlines","FJE":"Silverjet","SIO":"Sirio","XW":"Sky Express","SKS":"Sky Service","SX":"Sky Work Airlines","BC":"Skymark Airlines","IGA":"Skytaxi","OO":"SkyWest","OKT":"Soko Aviation","SRB":"Republika Srbija","SOP":"Solinair","ONG":"Sonnig SA","SA":"South African Airways","JKK":"Spanair","SUM":"State Unitary Air Enterprise","FFD":"Stuttgarter Flugdienst","SWT":"Swiftair","SAZ":"Swiss Air-Ambulance","LX":"Swiss International Air Lines","SYR":"Syrian Arab Airlines","7J":"Tajik Air","TP":"TAP Portugal","RO":"Tarom","UN":"Transaero Airlines","HV":"Transavia Airlines","QS":"SmartWings","CLU":"Triple Alpha","TU":"Tunisair","TK":"Turkish Airlines","T7":"Twin Jet","TWJ":"Twinjet Aircraft Sales","TYW":"Tyrol Air Ambulance","TJS":"Tyrolean Jet Service","UKN":"Ukraine Air Enterprise","UA":"United Airlines","UJT":"Universal Jet Aviation","US":"US Airways","UR":"UTair-Express","VP":"Viacao Aerea Sao Paulo (VASP)","VIB":"Vibroair Flugservice","VN":"Vietnam Airlines","VQ":"Viking Hellas","VPA":"VIP Air","VLM":"VLM Airlines","GOT":"Walter I Linkoping","W6":"Wizz Air","XJC":"Xclusive Jet Charter Limited","OD":"Zuliana de Aviacion","4O":"Air Montenegro","NE":"Nesma Airlines","DFC":"Aeropartner a.s.","QR":"Qatar Airways","AP":"Air One","EY":"Etihad Airways","FH":"Freebird Airlines","U2":"easyJet","FS":"Syphax Airlines","SUS":"Air Solo","PNC":"Prince aviation","PAR":"Parked Aircraft","VTM":"Vladimirova kompanija","NJE":"Net Jet","GH":"Globus LLC","8Q":"Onur Air","VY":"Vueling Airlines","F7":"Etihad Regional","LXA":"Luxaviation","HTM":"Htm Jets","MTL":"Raf Avia","SFR":"Safair","TZS":"TCA LLC","7M":"Mistral Air","UT":"UTair Aviation","7L":"Silkway west Airlines, Azerbaijan","VEM":"VEM","FTL":"Flightline","ADZ":"AvioDelta Ltd.","YB":"Borajet","RSD":"Russia Federal State Budget Inst","8H":"BH Air","MHV":"MHS Aviation","AOJ":"Avcon Jet AG","ST":"Germania","5O":"ASL Airlines France","EK":"Emirates","ITL":"Italfly","DS":"easyJet Switzerland","NPT":"West Atlantic Cargo Airlines","GAC":"Globe Air","CD":"Corendon Dutch Airlines B.V.","BOO":"Bookajet Ltd","7W":"Windrose Airlines","CGF":"Cargo Air Bulgaria","MS":"EgyptAir","XC":"Corendon Airlines","DX":"Danish Air Transport","PHU":"Pannon Air Service","FNM":"Avio Nord","HK":"Hamburg Airways","RSB":"Ruby Star","ENT":"Enter Air","EAT":"Air Transport","VCG":"Fly Vectra","JDI":"Blue Jet SP Z.O.O.","GRX":"Aircompany Grodno","NUB":"Nomad Aviation Europe Ltd","VSR":"Aviostart","IAM":"Italian Air Force","ITA":"Italy State Police","RFT":"Aviation Academy Romania","HYP":"Hyperion Aviation","SSG":"Slovak Government Flying Service","GMA":"Gama Aviation","ROF":"Romanian Air Force","TOY":"Toyo Aviation","IB":"Iberia","JSY":"Jung Sky","YW":"Air Nostrum","JSH":"Jetstream","Y7":"Nordstar Airlines","AYY":"Air Alliance Express AG & Co. KG","LLK":"Life Line Aviation","D2":"Severstal Aircompany","GCH":"Gama Aviation Switzerland","ZT":"Titan Airways","CLF":"Centreline Air Charter","HM":"Air Seychelles","UL":"SriLankan Airlines","ADB":"Antonov Airlines","VPC":"Panaviatic","HLR":"Heli Air Services","FRX":"Fort Aero","DNE":"Venid Air","QGA":"Windrose Air Jetcharter Gmbh","AHO":"Air Hamburg","EXH":"G5 Executive AG","RFE":"Jet Express","R3":"Yakutia Air","CNV":"US Navy","AH":"Air Algerie","MSX":"Egypt Air Cargo","LVR":"Aviavilsa Lituania","TTJ":"Tatra Jet s.r.o.","QNR":"Queen Air s.r.o.","ATV":"Avanti Air","DF":"Centre - South Airlines","AZE":"Arcus Air","BFG":"Bright Flight Ltd","BJ":"Nouvelair Tunisie","RRJ":"Red Wings Airlines","EUW":"Eurowest","TRK":"Turkish Airlines General Aviation","BFX":"Fly Alpha GmbH","NTF":"OK Aviation","CW":"Air Cargo Global","VJT":"Vistajet LTD ( Malta)","FRF":"Fleet Air","XQ":"Sun Express","VAS":"Atran Airlines","MXM":"Maximus Air, UAE","LXG":"Luxaviation Germany GMBH","SUI":"Swiss Air Force","BVR":"ACM Air Charter","TIH":"Tiriac Air","FYJ":"Flyjet","CVK":"Swift Solution","XAE":"Aura Bohemia","CPI":"Compagnia Aerea Italiana","HKH":"Air Invest KFT","VLB":"Air Volta","TRUCK":"Kamionski prevoz","VJS":"Vista Jet","DUKE":"Jubilee Airways","LEU":"Lions Air","TUP":"Aviastar","JNL":"JetNetherlands","YE":"YanAir","AUV":"Austrian Ambulance","LTC":"Charter Jets","EFD":"Eisele Flugdienst","CBA":"Civil Aviation Inspectorate of the Czech Republic","IG":"Meridiana","AL":"TransAVIAexport Airlines","SVV":"Salt Aviation Sp. z.o.o.","HSG":"HESNES AIR AS","R5":"Jordan Aviation","MLT":"Maleth - Aero AOC Limited","ESW":"SILKWAY BUSINESS AVIATION LLC","MOZ":"Salzburg  jet  aviation","BTT":"Business Jet Travel UKRAINE","6B":"TUIfly Nordic","MAP":"Macedonian police","SQF":"Slovak Air Force","TWG":"Air-Taxi Europe","MDF":"Swiftair Hellas","EXU":"Executive Airlines","FPG":"TAG Aviation S.A.","ESQ":"EUROP-STAR AIRCRAFT GMBH","TGZ":"Georgian Airways","SVF":"Swedish Air Force","HRM":"Hermes Aviation LTD","A5":"HOP REGIONAL","VBA":"AVB 2012 ltd","LA":"LAN Airlines","ALN":"Air Lincoln","EJM":"Executive Jet Management","LWG":"LUXWING LTD.","QQE":"Qater Executive Jet","SXI":"Southern Cross International B.V.","CIG":"Sirius-Aero LTD","SRN":"SPRINTAIR","OR":"Arkefly (TUI Airlines Nederland B.V.)","ECC":"Eclair Aviation","UAR":"Aerostar","BWJ":"BELLAWINGS JET","UKL":"Ukraine-Airalliance","SAH":"Smart Jet","5N":"Nordavia Regional Airlines","GRV":"Epsilon Aviation SA","ORZ":"ZOREX S.A","VND":"AVIONORD","JSI":"JSI - Jet Air Group","NCR":"NATIONAL AIRLINES","R6":"DOT LT","KRF":"KRF - RAF Queen's Flight","EPR":"Express Airways","FOR":"Formula One Management","PVG":"Privilege Style","TSY":"Tristar Air","BBF":"B-Air Charter Gmbh","VVV":"VALAIR","XRO":"ExxAero","MMM":"MERIDIAN AIR COMPANY","EL":"Ellinair","PT":"PrivatAir GmbH","FWR":"OSM Aviation Group LTD","CRV":"Acropolis Aviation","SLJ":"Slam Lavori Aerei srl","BCF":"BCF - B.A.C.H. Flugbetriebs GmbH","U6":"Ural Airlines","BUD":"BUD","XG":"SunExpress Germany","LLT":"Classic Jet","BEC":"STATE AIR COMPANY BERKUT - KAZAKHSTAN","FYG":"FYG - Flying Partners","LJB":"Al Jaber Aviation","TI":"Tailwind Airlines","ABP":"ABS Jets","VIS":"Vision Air International","FLJ":"Flairjet Ltd","CYF":"CYF","EM":"Empire Airlines","KER":"Kermas Aviation","PSK":"Prescott Support Company","LSV":"Slovenian Ministry of Defence","EAV":"Elitavia LTD","M4":"Mistral Air","U8":"TUS AIRWAYS","IBJ":"Air Taxi and Charter International","A2":"Astra Airlines","QB":"Qeshm Air","SV":"Saudi Arabian Airlines","UX":"Air Europa","AXY":"AIRX","TKJ":"TARKIM AIR","TBM":"TBM","QY":"European Air Transport Leipzig GmbH","FXT":"Flexflight","OFL":"Open Flight","RDA":"Rada Airlines LLC","6G":"RLX - Go2Sky","PAV":"ProAir Aviation","FV":"Rossiya Airlines","ELJ":"Elite Jet","BOH":"Air Bohemia","UMK":"Yuzhmashavia","MJE":"Empire Aviation Group","RJD":"Rotona Jet Aviation","ECA":"Excellent Air GmbH","AME":"Spanish Air Force","4T":"Belair Airlines","OC":"Omni Aviacao e Tecnologia","LDM":"LAUDA MOTION GMBH","HSY":"Sky Helicopteros S.A.","VMP":"Execujet Scandinavia","JKH":"JKH","VI":"Volga-Dnepr Airlines","EZE":"Eastern Airways","ITE":"AEROTAXI S.R.O.","SPG":"SPEEDWINGS SA","AJU":"AIRJETSUL","C3":"Trade Air Ltd.","EW":"Eurowings","KT":"Siavia","BPS":"Budapest Aircraft Services Ltd.","YU":"EUROATLANTIC Airways","EMM":"EMPEROR AVIATION LTD","UK":"Vistara","VOR":"Flight Calibration Services","LUC":"Alninati Aeronautics","ZI":"Aigle Azur","NN":"VIM Airlines","IZ":"Arkia Israeli Airlines","RSJ":"RusJet","CLJ":"Cello Aviation Ltd","HKY":"HKY-USAF","DAT":"DART AIRLINES","YD":"Synergy Aviation","FOA":"Fortune Air","LSA":"LEADER SRL","IMX":"Zimex Aviation","FLO":"FLYCOM","PGG":"Praga Aviation sro","RAC":"Icar Air","M9":"Motor Sich Airlines","HUF":"HUF - Hungarian Air Force","SEH":"Sky Express","5P":"Small Planet Airlines GmbH","HAT":"Air Horizont","YC":"Yamal Airlines","IK":"IKAR","ASW":"Air Southwest","BHK":"Blu Halkin Ltd, London","MJF":"Mjet GmbH","TJJ":"Top Jets LTD","CMB":"U.S. Transportation Command","GJT":"GET JET Airlines","WKT":"Diamond Executive Aviation Ltd","UJ":"Almasria Airlines","BKK":"Blink","TVF":"Transavia France","6Y":"Smartlynx Airlines","AMQ":"Aircraft Management and Consulting SP. z.o.o.","LG":"Luxair","AVC":"Aerovenca","HU":"Hainan Airlines","X3":"TUIfly","RFF":"Russian Federation Air Force","AFB":"Bulgarian Air Force","JFA":"Jetfly Aviation S.A., Luxembourg.","AUH":"ABU DHABI PRESIDENTAL FLIGHT","BAH":"BAHREIN ROYAL","KUG":"Government of Kuwait","AQS":"Airstream","5Y":"Atlas Air","K4":"Kalitta Air","KD":"Western Global Airlines","UAF":"United Arab Emirates Air Force","GWC":"Gulf Wings","F5":"Aerotranscargo","RL":"Royal Flight","9U":"Air Moldova","LZF":"LEASEFLY AVIATION SERVICES SA","TWY":"Solairus Aviation","ABF":"Scanwings Oy","WWI":"Worldwide Jet Charter","XGO":"Airgo","FYL":"Flying Group Luxembourg","VO":"VLM Airlines d.d.","TIE":"Time Air","JTI":"IMPERIAL JET","AEH":"Aerocutter","H6":"Bulgarian Air Charter","N4":"Nord Wind Airlines LLC","ATL":"Atlas Air Service","HAN":"Aushaanair Limited","JCL":"Jetcall","JME":"EJME Aircraft Management","MV":"Air Mediterranean","PE":"Peoples Viennaline","EDC":"Air Charter Scotland","7E":"Sylt Air","EVL":"EVOLEM AVIATION","MGF":"TRTO Agency Ltd","VKA":"Vulkan Air LLC","JF":"Japanese Air Force","PSW":"JSC Pskovavia","W5":"Mahan Air","FT":"Fly Egypt","SAF":"Swiss Air Force","TMI":"Tamir Airways","JTN":"JET TEST INTERNATIONAL","LB":"Bul Air","DAI":"Dena Airways","LDX":"LaudaMotion Executive GmbH","KTR":"SKYAVIATRANS LLC","WZ":"Red Wings Airlines","VIP":"Tag Aviation UK","GAA":"Global Africa Cargo","HYR":"Airlink Airways","LEA":"LEA - SA AXA Reassurance / AXA RE, Paris","STQ":"Star Wings Dortmund","PWY":"Privateways Luftfahrtgesellschaft mbH","6Q":"Cham Wings Airlines","TG":"Thai Airways International","GP":"Gest Air","AXG":"Air X Charter","KLJ":"JSC KlasJet","KOC":"Setair","LYF":"Lithuanian Air Force","PLF":"Polish Air Force","Y9":"Kish Airlines","RIF":"Federal Service of the National Guard Troops of The Russian Federation","S7":"S7 Airlines","SR":"SUNDAIR","N9":"NOVAIR","AMV":"AMV","IFM":"Ifly","BBD":"Bluebird Cargo","HRN":"Heron Luftfahrt","JBC":"JetBee Czech","KFE":"SKYFREE","DK":"Thomas Cook Airlines Scandinavia","MT":"Thomas Cook Airlines Great Britain","HY":"Uzbekistan Airways","JTS":"Arrendamiento de Aviones Jets","MB":"MNG Airlines","AI":"Air India","VLZ":"VLZ - Volare Aviation","GJE":"Global Air Charters","R2":"US ARMY","70":"TRAVEL SERVICE HUNGARY","VBB":"ALK Airlines","I4":"I Fly","EES":"Eagle Express","OXM":"Orion Malta","JAS":"Jet Setter","VAJ":"Avcon Jet Srl","EDG":"Rocky Mountain Aviation","V7":"Volotea","FRV":"Royal Air Forces of the Kingdom of Marocco","BF":"French Bee","0B":"Blue Air","EAU":"Elitavia Malta","G9":"Air Arabia","B0":"La Compagnie","BFY":"Bestfly Aircraft Management Aruba","UKF":"Ukraine Air Force","MAF":"Macedonian Air Force","VAW":"Via Airways","LYD":"LYD - Atlantic Bridge Aviation Ltd","DP":"Pobeda Airlines","CDX":"Cedar Executive","SME":"Smart Aviation","TES":"Taespejo Portugal","EC":"easyJet Europe","ENZ":"Jota Aviation","SQ":"Singapore Airlines Limited","W9":"Wizz Air UK","AY":"Finnair","NYX":"NyxAir","FBG":"Fleet Air Bulgaria","PIN":"PINK 3D","JPJ":"Jupiter Jet","PQ":"SkyUp Airlines","5W":"Wizz Air Abu Dhabi","MNE":"Air Montenegro","WY":"Oman Air","MH":"Malaysia Airlines","CY":"Cyprus Airways","WB":"RwandAir","J9":"Jazeera Airways","B6":"JetBlue Airways","BRO":"BASE Regional Airlines","AGR":"Air Charters Europe","VF":"AJet","AA":"American Airlines","E4":"Enter Air","GQ":"Sky Express","NO":"Neos","EUP":"Pan EuropÃ©enne Air Service","CX":"Cathay Pacific","CZ":"China Southern Airlines","UEE":"United Eagle","X5":"AirEuropa OVA","XZ":"Aeroitalia AEZ","4X":"Viva aerobus","BQ":"SkyAlps SWU","GEL":"Geosky D4","W4":"Wizz Air Malta","8R":"Amelia"};

const iataPlane = {"100":["Fokker 100","Fokker",8.5,35.5,28.1,845,10668,3170,"97 - 107"],"319":["Airbus A319","Airbus",11.8,33.8,34.1,871,12000,6700,"124 - 156"],"31Y":["Airbus A310-300 Freighter","Airbus",15.8,46.7,43.9,892,12500,7330,""],"320":["Airbus A320","Airbus",11.8,37.6,34.1,871,12000,5700,"150 - 180"],"321":["Airbus A321","Airbus",11.8,44.5,34.1,871,12000,5600,"185 - 236"],"32A":["Airbus A320-200 sharklets","Airbus",11.8,37.6,35.8,871,12000,6100,"150 - 180"],"32B":["Airbus A321-200 sharklets","Airbus",11.8,44.5,35.8,871,12000,5950,"185 - 236"],"332":["Airbus A330-200","Airbus",17.4,58.8,60.3,913,12527,13400,"246 - 380"],"33X":["Airbus A330-200 Freighter","Airbus",16.9,58.8,60.3,913,12527,7400,""],"3N0":["Airbus A320neo","Airbus",11.8,37.6,35.8,871,12000,6850,"150 - 180"],"733":["Boeing 737-300","Boeing Commercial Airplanes",11.1,33.4,28.9,780,11300,4204,"128 - 149"],"735":["Boeing 737-500","Boeing Commercial Airplanes",11.1,31.1,28.9,786,11277,4444,"108 - 132"],"738":["Boeing 737-800","Boeing Commercial Airplanes",12.5,39.5,35.7,828,12500,5665,"160 - 189"],"73H":["Boeing 737-800NG","Boeing Commercial Airplanes",12.6,39.5,35.7,828,12500,5765,"160 - 189"],"73P":["Boeing 737-400 Freighter","Boeing Commercial Airplanes",11.1,36.5,28.9,786,11277,5186,""],"73W":["Boeing 737-700NG","Boeing Commercial Airplanes",12.5,33.6,35.7,828,12500,6370,"128 - 148"],"75F":["Boeing 757-200 Freighter","Boeing Commercial Airplanes",14.0,47.3,38.1,850,12800,5834,""],"77X":["Boeing 777-200 Freighter","Boeing Commercial Airplanes",18.6,63.7,64.8,896,10668,9070,""],"7M8":["Boeing 737 MAX 8","Boeing Commercial Airplanes",12.3,39.5,35.9,839,12000,6510,"162 - 200"],"A26":["Antonov An-26","Antonov Company",8.6,23.8,29.2,440,7500,2550,""],"ABY":["Airbus A300-600 Freighter","Airbus",16.5,54.1,44.8,870,12500,7500,""],"ANF":["Antonov An-12","Antonov Company",10.5,33.1,38.0,670,10200,3600,""],"AT4":["ATR 42","Avions de Transport RÃ©gional",7.6,22.7,24.6,498,7600,2800,"46 - 50"],"AT5":["ATR 42-500","Avions de Transport RÃ©gional",7.6,22.7,24.6,560,7600,3500,"42 - 50"],"AT7":["ATR 72","Avions de Transport RÃ©gional",7.7,27.2,27.1,507,7620,1615,"62 - 74"],"ATF":["ATR 72 Freighter","Avions de Transport RÃ©gional",7.7,27.2,27.1,507,7620,926,""],"CR2":["Bombardier CRJ200","Bombardier Inc.",6.2,26.8,21.2,785,12496,2491,""],"CR9":["Bombardier CRJ900","Bombardier Inc.",7.5,36.4,24.9,850,12496,2500,"75 - 90"],"CS3":["Airbus A220-300","Airbus",11.5,38.7,35.1,829,12497,6112,"130 - 160"],"DH4":["Bombardier Q400","Bombardier Inc.",8.3,32.8,28.4,667,8230,2522,"68 - 78"],"E75":["Embraer 175","Embraer",9.7,31.7,26.0,890,12500,3334,"78 - 88"],"E90":["Embraer 190","Embraer",10.3,36.2,28.7,890,12500,3334,"94 - 114"],"E95":["Embraer 195","Embraer",10.3,38.7,28.7,890,12500,2593,"106 - 122"],"SF3":["Saab 340","Saab",7.0,19.7,21.4,522,9450,1732,""],"SW4":["Swearingen SA227 Metro 23","Fairchild",5.1,18.1,17.4,576,7620,2131,"19"],"221":["Airbus A220-100","Airbus",11.5,35,35.1,871,12000,6390,"100-120"],"223":["Airbus A220-300","Airbus",11.5,38.71,35.1,871,12000,6700,"120-150"],"290":["Embraer E190-E2","Embraer",10.96,36.25,33.72,890,12500,5280,"80-90"],"295":["Embraer E195-E2","Embraer",10.91,41.51,33.72,890,12500,4917,"120-146"],"32N":["Airbus A320neo","Airbus",11.76,37.57,35.80,833,12100,6500,"165-195"],"32Q":["Airbus A321neo","Airbus",11.76,44.51,35.80,833,12100,7400,"206-244"],"333":["Airbus A330-300","Airbus",16.79,63.66,60.3,871,12500,11750,"300-440"],"734":["Boeing 737-400","Boeing Commercial Airplanes",11.13,36.4,28.9,796,11278,4398,"147-168"],"73J":["Boeing 737-900 Winglets","Boeing Commercial Airplanes",12.55,42.11,35.79,844,12497,5460,"177-215"],"E70":["Embraer E170","Embraer",9.83,29.90,26.01,890,12500,2470,"66-78"],"788":["Boeing 787-8","Boeing Commercial Airplanes",16.92,56.72,60.12,956,13100,13530,"242-359"],"789":["Boeing 787-9","Boeing Commercial Airplanes",17.02,62.81,60.12,956,13100,14010,"290-406"],"56X":["Cessna Citation Excel","Cessna Textron Aviation",5.23,16.0,17.17,816,13716,3441,"9"],"ER4":["Embraer RJ145","Embraer",6.76,29.87,20.04,854,11278,3700,"50"],"ER3":["Embraer Legacy 600 / Legacy 650 ","Embraer",6.64,26.33,21.17,829,12000,6300,"13-14"],"7M9":["Boeing 737 MAX 9","Boeing Commercial Airplanes",12.29,42.16,35.82,839,12000,6100,"204-230"],"E7W":["Embraer 175 long wing","Embraer",10,31.7,29.0,875,12500,2897,"78 - 88"]};

const remarkMap = {
  "GOP": "Gate open", "NBD": "Boarding", "NTM": "New time", "ONT": "On time",
  "EXP": "Expected", "DEP": "Departed", "TAX": "Taxi", "CAN": "Cancelled",
  "DLY": "Delayed", "NGT": "New gate", "NIN": "New info at", "DVT": "Diverted",
  "LAC": "Last call", "GTC": "Gate closed", "CKO": "Check-in open", "GCH": "Gate change",
  "HLD": "Holding", "LAN": "Landed", "ARR": "Arrived", "GTG - GO TO GATE": "Go to gate"
};

window.onload = function() { refreshData(); };

function setTimestamp() {
  const now = new Date();
  const clockEl = document.getElementById('live-clock');
  const dateEl = document.getElementById('live-date');
  if (clockEl) clockEl.innerText = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  if (dateEl) dateEl.innerText = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getDiffInMinutes(st, at) {
  if (!st || !at || st === "--:--" || at === "--:--") return null;
  const [h1, m1] = st.split(':').map(Number);
  const [h2, m2] = at.split(':').map(Number);
  return (h2 * 60 + m2) - (h1 * 60 + m1);
}

async function refreshData() {
  const icon = document.getElementById('refresh-icon');
  if (icon) icon.classList.add('bi-spin');
  const targetUrl = 'https://begv2-live.ha.rs/sites/default/files/data/redLetenja.xml';
  const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(targetUrl);
  
  try {
    const response = await fetch(proxyUrl);
    const xml = await response.text();
    const flightBlocks = xml.split(/<LET>|<flight>/i);
    flightBlocks.shift(); 

    const grouped = {};
    let todayDateStr = "";

    flightBlocks.forEach(block => {
      const getVal = (tag) => {
        const match = block.match(new RegExp(`<${tag}>(.*?)<\\/${tag}>`, 'i'));
        return match ? match[1].trim() : "";
      };
      const brojLeta = getVal('BROJ_LETA');
      const vezanLet = getVal('VEZAN_LET');
      if ((brojLeta !== vezanLet && vezanLet !== "") || !brojLeta) return;

      const date = getVal('DATUM');
      if (getVal('DAN') === "0") todayDateStr = date;

      const rTag = getVal('REMARK').toUpperCase();
      const flight = {
        st: getVal('ST') || "--:--", et: getVal('ET') || "--:--", at: getVal('TIME') || "--:--",
        dest: getVal('DESTINACIJA') || getVal('DEST') || "N/A", fn: brojLeta, ac: getVal('TIP_AVIONA') || "-",
        gate: getVal('GATE_BAY'), remarkText: remarkMap[rTag] || "ON TIME", remarkCode: rTag === "" ? "ONT" : rTag,
        type: getVal('TIP') === 'IA' ? 'ARRIVALS' : 'DEPARTURES'
      };
      if (!grouped[date]) grouped[date] = { ARRIVALS: [], DEPARTURES: [] };
      grouped[date][flight.type].push(flight);
    });

    schedule = grouped;
    currentDay = todayDateStr || Object.keys(schedule).sort()[0];
    if (icon) icon.classList.remove('bi-spin');
    setTimestamp(); 
    initUI();
  } catch (e) {
    document.getElementById('loading-zone').innerHTML = `<div class="alert alert-warning">Data unavailable.</div>`;
  }
}

function initUI() {
  document.getElementById('loading-zone').classList.add('d-none');
  document.getElementById('type-tabs').setAttribute('style', 'display: flex !important');
  document.getElementById('selected-date-label').innerText = currentDay;

  const dropdown = document.getElementById('day-dropdown');
  dropdown.innerHTML = "";
  Object.keys(schedule).sort().forEach((date) => {
    const li = document.createElement('li');
    li.innerHTML = `<a class="dropdown-item ${date === currentDay ? 'active' : ''}" href="#">${date}</a>`;
    li.onclick = (e) => { e.preventDefault(); currentDay = date; document.getElementById('selected-date-label').innerText = date; renderTable(); };
    dropdown.appendChild(li);
  });
  renderTable();
}

function switchType(type, el) {
  currentType = type;
  document.querySelectorAll('.btn-pill').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderTable();
}

function renderTable() {
  const container = document.getElementById('flight-table-container');
  if (!container || !schedule[currentDay]) return;

  const flights = schedule[currentDay][currentType].sort((a, b) => a.st.localeCompare(b.st));
  const currentTime = new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0');

  let html = `<table class="table table-hover align-middle m-0"><thead><tr>
    <th width="9%">SCHEDULED</th><th width="9%">ESTIMATED</th><th width="9%">ACTUAL</th>
    <th width="20%">${currentType === 'ARRIVALS' ? 'ORIGIN' : 'DESTINATION'}</th>
    <th width="11%">FLIGHT</th><th width="15%">AIRCRAFT</th><th width="10%">GATE</th><th width="17%">STATUS</th>
  </tr></thead><tbody>`;

  let closestRowId = null;
  flights.forEach((f, index) => {
    const prefix2 = f.fn.substring(0, 2).toUpperCase();
    const prefix3 = f.fn.substring(0, 3).toUpperCase();
    const companyName = iataKey[prefix3] || iataKey[prefix2] || "Airline";

    const cleanAc = String(f.ac).trim().toUpperCase();
    let aircraftDisplay = cleanAc;
    
    if (iataPlane[cleanAc]) {
        aircraftDisplay = iataPlane[cleanAc][0];
    } else if (cleanAc.startsWith('3')) {
        aircraftDisplay = "Airbus A" + cleanAc;
    } else if (cleanAc.startsWith('7')) {
        aircraftDisplay = "Boeing " + cleanAc;
    }

    let remarkClass = (f.remarkText.toUpperCase().includes("ON TIME")) ? "status-ONT" : `status-${f.remarkCode}`;
    if (currentType === 'ARRIVALS' && f.remarkCode === 'DLY') remarkClass = "status-DLY-orange";
    
    let destClass = "fw-bold text-uppercase " + ((f.remarkCode === 'DEP' || f.remarkCode === 'LAN' || f.remarkCode === 'ARR') ? "text-success-city" : "");
    
    let indicator = "";
    if (f.remarkCode === 'LAC') indicator = `<span class="status-dot dot-pulse-red"></span>`;
    else if (f.remarkCode === 'NBD') indicator = `<span class="status-dot dot-pulse-blue"></span>`;
    else if (f.remarkCode === 'GTC') indicator = `<i class="bi bi-lock-fill status-icon-inline text-gtc-lock"></i>`;
    else if (f.remarkCode === 'GTG' || f.remarkText.toUpperCase().includes("GO TO GATE")) {
        indicator = `<span class="status-dot dot-static-blue"></span>`;
    }

    let busIcon = /[A-Z]$/i.test(String(f.gate).trim()) ? `<i class="bi bi-bus-front ms-2 text-muted bus-icon-style" title="Remote position" style="font-size: 0.8rem;"></i>` : "";
    
    let offsetText = "";
    const diff = getDiffInMinutes(f.st, f.at);
    if (diff !== null && (f.remarkCode === 'DEP' || f.remarkCode === 'LAN' || f.remarkCode === 'ARR' || f.remarkCode === 'DLY')) {
      const absDiff = Math.abs(diff);
      const unit = absDiff === 1 ? "min" : "mins";
      if (diff < 0) offsetText = ` <span class="offset-text offset-early">${absDiff} ${unit} early</span>`;
      else if (diff > 0) {
        let delayColorClass = "offset-late-low";
        if (diff > 30) delayColorClass = "offset-late-high";
        else if (diff > 15) delayColorClass = "offset-late-mid";
        offsetText = ` <span class="offset-text ${delayColorClass}">${absDiff} ${unit} late</span>`;
      }
    }

    let rowClass = (closestRowId === null && f.st >= currentTime) ? "current-row" : "";
    if (rowClass === "current-row") closestRowId = `row-${index}`;

    // Updated with data-label for mobile CSS support
    html += `<tr id="row-${index}" class="${rowClass}">
      <td data-label="Scheduled">${f.st}</td>
      <td data-label="Estimated" class="text-muted small">${f.et}</td>
      <td data-label="Actual" class="fw-bold text-success">${f.at !== "--:--" ? f.at : ""}</td>
      <td data-label="${currentType === 'ARRIVALS' ? 'Origin' : 'Destination'}" class="${destClass}">${indicator}${f.dest}</td>
      <td data-label="Flight" class="fn-cell" title="${companyName}">${f.fn}</td>
      <td data-label="Aircraft" class="fw-normal small text-secondary">${aircraftDisplay}</td>
      <td data-label="Gate"><div class="d-flex align-items-center"><span class="gate-box">${f.gate || '-'}</span>${busIcon}</div></td>
      <td data-label="Status" class="${remarkClass}">${f.remarkText.toUpperCase()}${offsetText}</td></tr>`;
  });
  
  container.innerHTML = html + `</tbody></table>`;
  if (closestRowId) setTimeout(() => document.getElementById(closestRowId)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
}