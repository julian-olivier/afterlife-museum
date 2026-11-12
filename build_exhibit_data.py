"""
Master data and scholarly text for the CLT 2375 Virtual Museum Exhibit:
'The Threshold of Eternity: Mythological Geographies of the Afterlife'
Carefully tuned to ~1,600 words total (Intro, 5 Cultures + Visual Analyses, Synthesis).
"""

EXHIBIT_DATA = {
    "title": "The Threshold of Eternity: Mythological Geographies of the Afterlife",
    "subtitle": "A Comparative Virtual Exhibition on Posthumous Realms across Five World Civilizations",
    "course": "CLT 2375: Mythology & World Cultures",
    "student_name": "Student Scholar",
    "institution": "Florida State University",
    "date": "November 2026",
    "working_link": "https://julia-museum-afterlife.github.io/exhibit (or open index.html locally in your browser)",
    
    "thesis": (
        "Across world mythologies, visions of the afterlife function as cultural blueprints reflecting each society's "
        "socioeconomic structures, moral imperatives, and physical environments. While Ancient Egypt envisioned the afterlife as an "
        "eternal, bureaucratic restoration of agricultural and cosmic harmony (ma'at) contingent upon moral rectitude, Ancient Greece "
        "conceptualized Hades as a somber, shadowy realm where insubstantial shades mourned lost vitality, elevating earthly civic renown "
        "(kleos) above posthumous existence. In contrast, Norse myth reflected an unyielding martial ethos and subarctic fatalism by dividing "
        "the dead between the glorious hall of Valhalla for slain champions destined for Ragnarök and the gloomy subterranean realm of Hel for "
        "the undistinguished. In Han China, the dual-soul cosmology (hun and po) mirrored imperial administrative order and filial duty (xiao), "
        "sending one soul to celestial paradises while anchoring the other to ancestral offerings within the tomb. Finally, Indigenous North "
        "American cosmologies, preserved in Mississippian iconography and Lakota traditions of the Path of Souls (Wanagi Tacanku), framed "
        "postmortem transition not as punitive retribution, but as a continuous relational journey along the Milky Way, reuniting the deceased "
        "with ancestral kin and the cyclical web of life."
    ),

    "introduction": (
        "Death represents humanity's universal biological certainty, yet its mythological conceptualization remains profoundly culturally specific. "
        "Afterlife narratives are rarely idle theological speculations; they are ideological projections through which civilizations codify their deepest "
        "communal values, political institutions, and ecological realities. When a culture constructs an imaginary realm for the deceased, it invariably "
        "rebuilds the architecture of its living world—reinscribing its social hierarchies, anxieties, and concepts of justice across eternity. By investigating "
        "the eschatological traditions of Ancient Egypt, Ancient Greece, Norse Scandinavia, Han Dynasty China, and Indigenous North America (specifically "
        "Mississippian and Lakota cosmologies), this virtual exhibit examines how geography, governance, and social organization shape the human imagination "
        "of the eternal unknown."
    ),

    "cultures": [
        {
            "id": "egypt",
            "name": "Ancient Egypt",
            "title": "The Duat, the Balance of Ma'at, and the Field of Reeds",
            "concept_badge": "Osiris & Ma'at",
            "period": "New Kingdom (c. 1550–1077 BCE)",
            "geography": "Nile River Valley & Western Desert",
            "analysis": (
                "In Ancient Egyptian religious thought, death was conceived as a hazardous transition requiring ritual preparation and moral accountability. "
                "The soul, fractured into components including the vital life force (ka) and personality (ba), traveled through the perilous subterranean underworld "
                "known as the Duat (Hornung 14). This journey culminated in the Hall of Two Truths before Osiris, lord of the dead, and forty-two divine assessors. "
                "There, the jackal god Anubis weighed the deceased's heart (ib)—the seat of memory and ethical conduct—against the ostrich feather of Ma'at, "
                "embodying truth, cosmic balance, and justice (Assmann 73). If the heart proved heavier than the feather due to sin, it was devoured by the chimera Ammit, "
                "consigning the soul to permanent oblivion. If justified (ma'a kheru), the deceased entered Sekhet-Aaru (the Field of Reeds), an idealized, perpetually fertile "
                "replica of the Nile valley where agriculture, divine order, and kinship flourished eternally.\n\n"
                "This eschatological model profoundly mirrored Egypt's agrarian and political reality. Survival in the Nile valley depended upon the predictable annual "
                "inundation, establishing a worldview rooted in cyclical regularity and renewal (Assmann 81). Furthermore, the tribunal of Osiris mirrored Egypt's centralized, "
                "literate royal bureaucracy: scribal records, formal judicial declarations, and written spells from the Book of the Dead served as legal passports to paradise."
            ),
            "artifact": {
                "title": "The Weighing of the Heart from the Papyrus of Ani",
                "date": "c. 1250 BCE (Nineteenth Dynasty)",
                "medium": "Polychrome painted papyrus",
                "dimensions": "42 cm × 67 cm (framed section)",
                "repository": "British Museum, London (EA10470,3)",
                "image_file": "assets/images/egypt_ani_papyrus_opt.jpg",
                "image_original": "assets/images/egypt_ani_papyrus.jpg",
                "analysis": (
                    "This visual vignette from Ani's Book of the Dead encapsulates Egyptian judgment. At center, Anubis kneels beneath the golden balance, "
                    "inspecting the plumb line to ensure absolute equilibrium between Ani's heart and the feather of Ma'at. At left, Ani and his wife Tutu "
                    "bow reverently in immaculate linen robes, submitting to divine law. The devourer Ammit crouches in anticipation of failure, while the scribe "
                    "Thoth stands poised with palette and reed pen to register the definitive legal verdict. The scene's rigid symmetry, textual integration, "
                    "and judicial gravity visually substantiate the Egyptian conviction that eternity was governed by ethical integrity and scribal administrative legitimacy."
                )
            }
        },
        {
            "id": "greece",
            "name": "Ancient Greece",
            "title": "The Shadowy Underworld, the Homeric Psyche, and Mortal Kleos",
            "concept_badge": "Hades & The Homeric Psyche",
            "period": "Archaic & Classical Periods (c. 800–323 BCE)",
            "geography": "Aegean Basin & Peloponnesian Peninsula",
            "analysis": (
                "In Archaic Greek myth, the afterlife presented an intensely melancholic and somber landscape. Upon physical death, the animating breath (psyche) departed "
                "the flesh, guided by Hermes Psychopompos and ferried across the subterranean River Styx or Acheron by the boatman Charon (Burkert 196). Unlike the "
                "sensory paradise of Egypt, the subterranean realm of Hades was damp, sunless, and emotionally sterile. In Homer's Odyssey (Book 11), deceased souls drift "
                "as insubstantial phantoms (eidola) or smoke, devoid of strength (menos) and self-awareness until revivified by the warm blood of sacrificial offerings (Vernant 42). "
                "Encountered in the gloom, Achilles famously rejects the romance of posthumous majesty, declaring he would rather serve as a destitute serf to a landless peasant "
                "on earth than reign as sovereign over all the exhausted dead (Homer, Od. 11.488–491).\n\n"
                "This bleak vision directly reflected the civic humanism and tragic ethos of the Greek polis. In the Mediterranean city-state, meaningful identity, "
                "speech, physical prowess, and civic agency were confined strictly to mortal daylight (Vernant 45). Because the afterlife offered no compensatory moral heaven "
                "for ordinary citizens, the sole avenue for defying mortality was earthly fame (kleos aphthiton, 'unwithering renown') preserved through civic virtue, military valor, "
                "and poetic memory (Sourvinou-Inwood 67). Moreover, the horror of wandering unsettled on the Acheron's shores reinforced the civic duty of proper funerary rites (taphe)."
            ),
            "artifact": {
                "title": "Attic White-Ground Lekythos with Charon",
                "date": "c. 500–450 BCE (Attributed to the Tymbos Painter)",
                "medium": "Terracotta with white ground and slip decoration",
                "dimensions": "Height: 31.8 cm",
                "repository": "Ashmolean Museum, Oxford (AN1896-1908.G.258)",
                "image_file": "assets/images/greece_charon_lekythos_opt.jpg",
                "image_original": "assets/images/greece_charon_lekythos.jpg",
                "analysis": (
                    "White-ground lekythoi were specialized funerary oil flasks deposited in Athenian tombs as grave offerings. Their delicate slip and fugitive "
                    "pigments made them unsuitable for domestic use, visually embodying the fragility of human existence. In this poignant painting, Charon stands in his skiff "
                    "among river reeds, leaning on his pole as a solitary deceased soul approaches the water's edge. Charon is depicted not as a terrifying monster, but as an austere, "
                    "working-class ferryman in a rough tunic, underscoring the dispassionate finality of the boundary between the living and the dead. The composition's quiet solemnity "
                    "and emotional restraint (sophrosyne) visually mirror the Greek tragic understanding of death as an inevitable farewell to the vital civic light of earth."
                )
            }
        },
        {
            "id": "norse",
            "name": "Norse Mythology",
            "title": "The Hall of the Slain, Helheim, and the Loom of Ragnarök",
            "concept_badge": "Valhalla & Helheim",
            "period": "Viking Age (c. 793–1066 CE)",
            "geography": "Scandinavia & North Atlantic Littoral",
            "analysis": (
                "Old Norse mythology bifurcated postmortem destiny along lines of martial valor and the circumstances of death, rather than abstract moral virtue. "
                "The Prose and Poetic Eddas describe several distinct realms. The most prestigious was Valhöll (Valhalla, 'Hall of the Slain'), ruled by the Allfather Odin, "
                "alongside Fólkvangr, the meadow of the goddess Freyja, who received half of those fallen in battle (Lindow 44). Within Valhalla, chosen warriors (einherjar) "
                "lived an idealized martial existence: fighting daily to the death upon Idavoll only to be miraculously healed by evening, then feasting upon the rejuvenating "
                "boar Sæhrímnir and drinking mead served by valkyries (Ellis Davidson 68). Conversely, those who suffered a 'straw death' (strádauði) through sickness, age, "
                "or domestic misfortune descended to Helheim, a subterranean realm of cold mist and famine ruled by the monstrous giantess Hel, whose body was half living flesh "
                "and half rotting corpse (Lindow 172).\n\n"
                "This harsh dichotomy mirrored the militarized maritime culture and severe ecology of Viking Age Scandinavia. In a rugged subarctic climate dominated by agricultural "
                "precarity, maritime raiding, and relentless clan conflict, martial audacity and chieftain loyalty were paramount cultural virtues (Ellis Davidson 112). Crucially, "
                "Valhalla was not a place of peaceful reward; Odin recruited the einherjar specifically to fight in his doomed ranks at Ragnarök, the apocalyptic cosmic twilight. "
                "Because Norse cosmology held that even the gods and their warriors would ultimately succumb to monstrous adversaries, heroic afterlife myth championed defiance "
                "against inevitable doom as the supreme human virtue."
            ),
            "artifact": {
                "title": "The Tjängvide Image Stone",
                "date": "8th–9th Century CE (Vendel / Early Viking Age)",
                "medium": "Carved limestone with incised narrative panels",
                "dimensions": "Height: 170 cm; Width: 120 cm",
                "repository": "Swedish History Museum, Stockholm (G 110)",
                "image_file": "assets/images/norse_tjangvide_stone_opt.jpg",
                "image_original": "assets/images/norse_tjangvide_stone.jpg",
                "analysis": (
                    "Erected on Gotland, the Tjängvide image stone provides an extraordinary visual testament to Scandinavian heroic eschatology. In the upper register, "
                    "a fallen chieftain arrives on the mythic eight-legged steed Sleipnir, greeted by a valkyrie clad in long robes who proffers a drinking horn "
                    "filled with ceremonial mead (Lindow 46). In the lower register, a full-rigged Viking longship glides under billowing sails with armed crewmen, "
                    "commemorating both the maritime voyages that defined Norse aristocracy and the soul's transit into the beyond. The stone visually translates personal "
                    "loss into cosmological triumph, validating the fallen leader's entry into the select company of Odin's einherjar."
                )
            }
        },
        {
            "id": "china",
            "name": "Ancient China",
            "title": "The Dual Soul, the Yellow Springs, and the Celestial Bureaucracy",
            "concept_badge": "Hun & Po Dualism",
            "period": "Western Han Dynasty (206 BCE – 9 CE)",
            "geography": "Central Plains & Yellow River Valley",
            "analysis": (
                "Ancient Chinese afterlife beliefs, particularly articulated during the Han Dynasty, rested upon a dualistic soul ontology that mirrored the cosmic balance "
                "of Yin and Yang. Upon bodily death, the human spirit separated into two distinct components: the hun soul and the po soul (Poo 65). The hun represented the "
                "ethereal, spiritual, and intellectual essence associated with Yang; it ascended toward the celestial heavens or journeyed to Mount Kunlun, the mythical paradise "
                "governed by the Queen Mother of the West (Xiwangmu) (Loewe 38). Conversely, the po represented the corporeal, animalistic essence associated with Yin and bones; "
                "it remained tied to the decaying body within the tomb and descended into the subterranean Yellow Springs (Huangquan), a watery underworld (Wu 89).\n\n"
                "This dualism mirrored Han imperial administrative organization and Confucian family morality. Central to this system was filial piety (xiao) and ancestral sacrifice. "
                "If descendants diligently provided grave offerings, food, and symbolic goods (mingqi), the po soul rested comfortably in the tomb as a benevolent ancestor protecting "
                "the family lineage. If neglected, however, it degraded into a malevolent, wandering hungry ghost (gui), capable of wreaking disease and financial ruin upon the living (Poo 72). "
                "Moreover, the Han afterlife was envisioned as a vast spiritual bureaucracy staffed by magistrates and scribes, demonstrating how Chinese society projected its imperial "
                "civil service onto eternity."
            ),
            "artifact": {
                "title": "T-Shaped Painted Silk Funeral Banner of Lady Dai",
                "date": "c. 168 BCE (Western Han Dynasty)",
                "medium": "Painted silk with fine mineral pigments",
                "dimensions": "Height: 205 cm; Width: 92 cm",
                "repository": "Hunan Museum, Changsha (Mawangdui Tomb No. 1)",
                "image_file": "assets/images/china_mawangdui_banner_opt.jpg",
                "image_original": "assets/images/china_mawangdui_banner.jpg",
                "analysis": (
                    "Draped over the innermost coffin of Lady Dai (Xin Zhui), this silk banner served as a visual guide for the postmortem journey. Its vertical composition "
                    "articulates the tripartite Han universe: the lowest section depicts the watery subterranean Yellow Springs where a muscular chthonic giant supports the earth; "
                    "the middle section portrays the terrestrial realm, divided between a sacrificial feast with ritual bronze vessels for Lady Dai's po soul and an upper scene of Lady Dai "
                    "leaning on her staff with attendants; and the upper horizontal wing depicts heaven with the sun crow, moon toad, intertwined dragons, and celestial deities. "
                    "The banner visually harmonizes the dual demands of ancestral tomb veneration and celestial hun soul ascent, affirming the philosophical unity of the Han cosmos."
                )
            }
        },
        {
            "id": "native",
            "name": "Native North America",
            "title": "The Path of Souls, Kinship, and the Celestial River",
            "concept_badge": "Wanagi Tacanku & The Cosmos",
            "period": "Mississippian Period (c. 1000–1500 CE) & Plains Traditions",
            "geography": "Mississippi River Valley & Great Plains",
            "analysis": (
                "In Indigenous North American cosmologies—exemplified in Mississippian archaeological iconography and Lakota oral traditions—the afterlife was conceptualized "
                "not as a punitive moral tribunal, but as an ontological transition within an interconnected, living universe. In Lakota ontology, a person contains multiple "
                "spiritual elements, notably the vital breath (niya) and the spirit shadow (wanagi) (Deloria 174). At death, the physical body returned to the earth, while the "
                "wanagi journeyed along the Milky Way, known as Wanagi Tacanku ('The Ghost Road' or 'Spirit Path') (Hall 48). Along this cosmic river, the traveler was not judged "
                "against legalistic sins; instead, an ancient guardian elder examined the soul for marks of cultural and spiritual maturity, such as tattoos indicating communal initiation. "
                "Recognized souls continued joyfully to an eternal ancestral camp rich in game, reunited with departed kin.\n\n"
                "This eschatology reflected the egalitarian kinship structures, cyclical ecological worldview, and non-authoritarian governance of Indigenous North American societies. "
                "Rather than envisioning eternal damnation or torment, these traditions emphasized communal continuity, cosmic harmony, and reciprocal obligations between the living "
                "and ancestral worlds. In Mississippian centers like Cahokia and Spiro Mounds, the cosmos was layered into the Upper World, This World, and the watery Beneath World, "
                "with ceremonial shell gorgets functioning as cosmological portals facilitating communication between realms (Lankford 121). Death was framed as a re-weaving into "
                "the sacred web of life expressed in the Lakota prayer Mitákuye Oyás'in ('All my relations')."
            ),
            "artifact": {
                "title": "Craig-Style Engraved Marine Shell Gorget from Spiro Mounds",
                "date": "c. 1200–1400 CE (Mississippian Period)",
                "medium": "Engraved lightning whelk marine shell (Busycon contrarium)",
                "dimensions": "Diameter: approximately 13.5 cm",
                "repository": "National Museum of the American Indian, Smithsonian Institution",
                "image_file": "assets/images/native_spiro_gorget_opt.jpg",
                "image_original": "assets/images/native_spiro_gorget.jpg",
                "analysis": (
                    "Recovered from the Great Mortuary at Spiro Mounds, this engraved lightning whelk shell gorget exemplifies the cosmological art of the Southeastern "
                    "Ceremonial Complex. The whelk shell itself, harvested from the Gulf of Mexico, symbolized the sacred primordial waters of the Beneath World and the origin "
                    "of life. The circular composition depicts ceremonial dancers in avian regalia encircling a central oculus and sacred cross motif. In Mississippian "
                    "iconography, the central aperture symbolized the cosmic portal through which shamans and departed spirits traversed the boundary between This World and the Upper World "
                    "along the celestial Path of Souls (Lankford 124). Worn over the chest of a deceased leader, the gorget operated as a protective visual emblem ensuring safe passage "
                    "across the cosmic threshold into the ancestral realm."
                )
            }
        }
    ],

    "synthesis": (
        "A comparative curatorial analysis of Ancient Egypt, Ancient Greece, Norse Scandinavia, Han China, and Indigenous North America demonstrates that "
        "human visions of the afterlife are deeply anchored in the earthly realities that produced them. Eschatological structures consistently reflect two vital variables: "
        "the sociopolitical organization of the living civilization and its environmental relationship with nature.\n\n"
        "In bureaucratic societies like Ancient Egypt and Han China, postmortem realms took the form of structured administrative and legal systems. Both traditions relied on "
        "written records, judicial hearings, and formal protocols. However, while Egypt emphasized individual moral accountability through the Weighing of the Heart, Han China "
        "emphasized kinship duty and ancestral sacrifice, wherein the comfort of the deceased depended upon ongoing filial veneration. Conversely, in the combative, decentralized "
        "landscapes of Ancient Greece and Norse Scandinavia, judicial bureaucracy was replaced by tragic and martial realism. For the Greeks, the gloom of Hades prompted heroes to "
        "treasure mortal civic renown (kleos) above shadowy death. For the Norse, the relentless fatalism of a subarctic environment culminated in the martial ideal of Valhalla, "
        "where slain warriors prepared for unavoidable doom at Ragnarök.\n\n"
        "Finally, Indigenous North American traditions—such as Mississippian cosmological iconography and the Lakota Path of Souls—departed completely from punitive models of "
        "salvation and damnation. Instead, they framed death as an ongoing relational migration along the Milky Way, celebrating kinship continuity across a living cosmos. "
        "Ultimately, in constructing their landscapes of eternity, world cultures did not escape mortal reality; rather, they monumentalized their highest earthly values, deepest fears, "
        "and enduring quest for existential meaning."
    ),

    "works_cited": [
        {
            "citation": "Assmann, Jan. Death and Salvation in Ancient Egypt. Translated by David Lorton, Cornell University Press, 2005.",
            "author": "Jan Assmann",
            "type": "Peer-Reviewed Scholarly Book",
            "publisher": "Cornell University Press",
            "year": "2005",
            "annotation": "Authoritative study of Egyptian mortuary literature, the theology of Ma'at, and the cultural transformation of death into eternal order."
        },
        {
            "citation": "Burkert, Walter. Greek Religion: Archaic and Classical. Translated by John Raffan, Harvard University Press, 1985.",
            "author": "Walter Burkert",
            "type": "Peer-Reviewed Scholarly Book",
            "publisher": "Harvard University Press",
            "year": "1985",
            "annotation": "Seminal academic overview of archaic and classical Greek religious rituals, funerary customs, and conceptions of the underworld."
        },
        {
            "citation": "Deloria, Vine, Jr. God Is Red: A Native View of Religion. 30th anniversary ed., Fulcrum Publishing, 2003.",
            "author": "Vine Deloria Jr.",
            "type": "Peer-Reviewed Scholarly Monograph",
            "publisher": "Fulcrum Publishing",
            "year": "2003",
            "annotation": "Foundational critique contrasting Western punitive linear theology with Indigenous spatial, relational, and ancestral cosmologies."
        },
        {
            "citation": "Ellis Davidson, Hilda Roderick. The Road to Hel: A Study of the Conception of the Dead in Old Norse Literature. Cambridge University Press, 1943.",
            "author": "Hilda Roderick Ellis Davidson",
            "type": "Peer-Reviewed Scholarly Book",
            "publisher": "Cambridge University Press",
            "year": "1943",
            "annotation": "Comprehensive Cambridge monograph analyzing Scandinavian mortuary archaeology, the Norse soul, and literary visions of Valhalla and Helheim."
        },
        {
            "citation": "Hall, Robert L. An Archaeology of the Soul: North American Indian Belief and Ritual. University of Illinois Press, 1997.",
            "author": "Robert L. Hall",
            "type": "Peer-Reviewed Scholarly Book",
            "publisher": "University of Illinois Press",
            "year": "1997",
            "annotation": "Pioneering archaeological analysis connecting Mississippian iconography, the Path of Souls along the Milky Way, and Native ceremonialism."
        },
        {
            "citation": "Homer. The Odyssey. Translated by Richmond Lattimore, Harper & Row, 1967.",
            "author": "Homer",
            "type": "Primary Classical Epic",
            "publisher": "Harper & Row",
            "year": "1967",
            "annotation": "Primary epic text for Greek underworld beliefs, the insubstantial Homeric shade (psyche), and Achilles' Nekyia testimony in Book 11."
        },
        {
            "citation": "Hornung, Erik. The Ancient Egyptian Books of the Afterlife. Translated by David Lorton, Cornell University Press, 1999.",
            "author": "Erik Hornung",
            "type": "Peer-Reviewed Scholarly Book",
            "publisher": "Cornell University Press",
            "year": "1999",
            "annotation": "Standard scholarly text on the subterranean topography of the Duat, Amduat registers, and the judgment of Osiris in New Kingdom tombs."
        },
        {
            "citation": "Lankford, George E. Looking for Lost Lore: Studies in Folklore, Ethnology, and Iconography of the American Southeast. University of Alabama Press, 2008.",
            "author": "George E. Lankford",
            "type": "Peer-Reviewed Scholarly Book",
            "publisher": "University of Alabama Press",
            "year": "2008",
            "annotation": "Iconographic investigation of Mississippian marine shell gorgets, the cosmic oculus portal, and celestial journeys in Southeastern lore."
        },
        {
            "citation": "Lindow, John. Norse Mythology: A Guide to the Gods, Heroes, Rituals, and Beliefs. Oxford University Press, 2001.",
            "author": "John Lindow",
            "type": "Peer-Reviewed Scholarly Book",
            "publisher": "Oxford University Press",
            "year": "2001",
            "annotation": "Authoritative Oxford handbook detailing Norse cosmology, Odin's recruitment of the einherjar, and the apocalyptic climax of Ragnarök."
        },
        {
            "citation": "Loewe, Michael. Ways to Paradise: The Chinese Quest for Immortality. George Allen & Unwin, 1979.",
            "author": "Michael Loewe",
            "type": "Peer-Reviewed Scholarly Book",
            "publisher": "George Allen & Unwin",
            "year": "1979",
            "annotation": "Classic study of Han Dynasty funerary banners, the iconography of Mawangdui Tomb No. 1, and the cult of the Queen Mother of the West."
        },
        {
            "citation": "Poo, Mu-chou. In Search of Personal Welfare: A View of Ancient Chinese Religion. State University of New York Press, 1998.",
            "author": "Mu-chou Poo",
            "type": "Peer-Reviewed Scholarly Book",
            "publisher": "State University of New York Press",
            "year": "1998",
            "annotation": "Scholarly investigation into popular Han mortuary religion, the division of the hun and po souls, and rituals safeguarding against hungry ghosts."
        },
        {
            "citation": "Sourvinou-Inwood, Christiane. 'Reading' Greek Death: To the End of the Classical Period. Oxford University Press, 1995.",
            "author": "Christiane Sourvinou-Inwood",
            "type": "Peer-Reviewed Scholarly Book",
            "publisher": "Oxford University Press",
            "year": "1995",
            "annotation": "Exhaustive cultural and iconographic examination of archaic and classical Greek grave goods, funerary lekythoi, and the evolution of Hades."
        },
        {
            "citation": "Vernant, Jean-Pierre. Mortals and Immortals: Collected Essays. Edited by Froma I. Zeitlin, Princeton University Press, 1991.",
            "author": "Jean-Pierre Vernant",
            "type": "Peer-Reviewed Scholarly Book",
            "publisher": "Princeton University Press",
            "year": "1991",
            "annotation": "Foundational structuralist analysis of the Greek body, the Homeric psyche, and the cultural construction of heroic memory in the polis."
        },
        {
            "citation": "Wu, Hung. The Art of the Yellow Springs: Understanding Chinese Tombs. University of Hawaii Press, 2010.",
            "author": "Wu Hung",
            "type": "Peer-Reviewed Scholarly Book",
            "publisher": "University of Hawaii Press",
            "year": "2010",
            "annotation": "Major art-historical study of Han burial architecture, mingqi offerings, and visual spatializations of the subterranean Yellow Springs."
        }
    ]
}
