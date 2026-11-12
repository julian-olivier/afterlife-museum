/**
 * THE THRESHOLD OF ETERNITY: 3D VIRTUAL MUSEUM INTERFACE SCRIPT
 * Course: CLT 2375 • Comparative Mythology
 * Handles Modals, Curatorial Lightboxes, and Ambient Soundscape
 */

// Full Scholarly Text Database for Curatorial Modals
const SCHOLARLY_ESSAY_DATA = {
    egypt: {
        wing: "Wing I: Ancient Egypt",
        title: "The Weighing of the Heart from the Papyrus of Ani",
        culture: "Ancient Egypt (Nineteenth Dynasty, New Kingdom)",
        date: "c. 1250 BCE",
        medium: "Polychrome painted papyrus roll",
        dimensions: "42 cm × 67 cm (framed section)",
        repository: "The British Museum, London (Accession no. EA10470,3)",
        image: "assets/images/egypt_ani_papyrus.jpg",
        essay: [
            "In Ancient Egyptian religious thought, death was conceived as a hazardous ontological transition requiring ritual preparation and moral accountability. The soul, fractured into components including the vital life force (ka) and personality (ba), traveled through the perilous subterranean underworld known as the Duat (Hornung 14). This journey culminated in the Hall of Two Truths before Osiris, lord of the dead, and forty-two divine assessors. There, the jackal god Anubis weighed the deceased's heart (ib)—the seat of memory and ethical conduct—against the ostrich feather of Ma'at, embodying truth, cosmic balance, and justice (Assmann 73). If the heart proved heavier than the feather due to sin, it was devoured by the chimera Ammit, consigning the soul to permanent oblivion. If justified (ma'a kheru), the deceased entered Sekhet-Aaru (the Field of Reeds), an idealized, perpetually fertile replica of the Nile valley where agriculture, divine order, and kinship flourished eternally.",
            "This eschatological model profoundly mirrored Egypt's agrarian and political reality. Survival in the Nile valley depended upon the predictable annual inundation, establishing a worldview rooted in cyclical regularity and renewal (Assmann 81). Furthermore, the tribunal of Osiris mirrored Egypt's centralized, literate royal bureaucracy: scribal records, formal judicial declarations, and written spells from the Book of the Dead served as legal passports to paradise."
        ],
        visualAnalysis: "This visual vignette from Ani's Book of the Dead encapsulates Egyptian judgment. At center, Anubis kneels beneath the golden balance, inspecting the plumb line to ensure absolute equilibrium between Ani's heart and the feather of Ma'at. At left, Ani and his wife Tutu bow reverently in immaculate linen robes, submitting to divine law. The devourer Ammit crouches in anticipation of failure, while the scribe Thoth stands poised with palette and reed pen to register the definitive legal verdict. The scene's rigid symmetry, textual integration, and judicial gravity visually substantiate the Egyptian conviction that eternity was governed by ethical integrity and scribal administrative legitimacy.",
        nextWing: "greece"
    },
    greece: {
        wing: "Wing II: Ancient Greece",
        title: "Attic White-Ground Lekythos with Charon",
        culture: "Classical Greece (Attic, Attributed to the Tymbos Painter)",
        date: "c. 500–450 BCE",
        medium: "Terracotta with white ground and slip decoration",
        dimensions: "Height: 31.8 cm; Diameter: 10.4 cm",
        repository: "Ashmolean Museum, Oxford (Accession no. AN1896-1908.G.258)",
        image: "assets/images/greece_charon_lekythos.jpg",
        essay: [
            "In Archaic Greek myth, the afterlife presented an intensely melancholic and somber landscape. Upon physical death, the animating breath (psyche) departed the flesh, guided by Hermes Psychopompos and ferried across the subterranean River Styx or Acheron by the boatman Charon (Burkert 196). Unlike the sensory paradise of Egypt, the subterranean realm of Hades was damp, sunless, and emotionally sterile. In Homer's Odyssey (Book 11), deceased souls drift as insubstantial phantoms (eidola) or smoke, devoid of strength (menos) and self-awareness until revivified by the warm blood of sacrificial offerings (Vernant 42). Encountered in the gloom, Achilles famously rejects the romance of posthumous majesty, declaring he would rather serve as a destitute serf to a landless peasant on earth than reign as sovereign over all the exhausted dead (Homer, Od. 11.488–491).",
            "This bleak vision directly reflected the civic humanism and tragic ethos of the Greek polis. In the Mediterranean city-state, meaningful identity, speech, physical prowess, and civic agency were confined strictly to mortal daylight (Vernant 45). Because the afterlife offered no compensatory moral heaven for ordinary citizens, the sole avenue for defying mortality was earthly fame (kleos aphthiton, 'unwithering renown') preserved through civic virtue, military valor, and poetic memory (Sourvinou-Inwood 67). Moreover, the horror of wandering unsettled on the Acheron's shores reinforced the civic duty of proper funerary rites (taphe)."
        ],
        visualAnalysis: "White-ground lekythoi were specialized funerary oil flasks deposited in Athenian tombs as grave offerings. Their delicate slip and fugitive pigments made them unsuitable for domestic use, visually embodying the fragility of human existence. In this poignant painting, Charon stands in his skiff among river reeds, leaning on his pole as a solitary deceased soul approaches the water's edge. Charon is depicted not as a terrifying monster, but as an austere, working-class ferryman in a rough tunic, underscoring the dispassionate finality of the boundary between the living and the dead. The composition's quiet solemnity and emotional restraint (sophrosyne) visually mirror the Greek tragic understanding of death as an inevitable farewell to the vital civic light of earth.",
        nextWing: "norse"
    },
    norse: {
        wing: "Wing III: Norse Mythology",
        title: "The Tjängvide Image Stone",
        culture: "Early Viking Age (Gotland, Sweden)",
        date: "8th–9th Century CE",
        medium: "Carved limestone with incised narrative panels",
        dimensions: "Height: 170 cm; Width: 120 cm; Thickness: 30 cm",
        repository: "Swedish History Museum (Historiska museet), Stockholm (Catalog no. G 110)",
        image: "assets/images/norse_tjangvide_stone.jpg",
        essay: [
            "Old Norse mythology bifurcated postmortem destiny along lines of martial valor and the circumstances of death, rather than abstract moral virtue. The Prose and Poetic Eddas describe several distinct realms. The most prestigious was Valhöll (Valhalla, 'Hall of the Slain'), ruled by the Allfather Odin, alongside Fólkvangr, the meadow of the goddess Freyja, who received half of those fallen in battle (Lindow 44). Within Valhalla, chosen warriors (einherjar) lived an idealized martial existence: fighting daily to the death upon Idavoll only to be miraculously healed by evening, then feasting upon the rejuvenating boar Sæhrímnir and drinking mead served by valkyries (Ellis Davidson 68). Conversely, those who suffered a 'straw death' (strádauði) through sickness, age, or domestic misfortune descended to Helheim, a subterranean realm of cold mist and famine ruled by the monstrous giantess Hel, whose body was half living flesh and half rotting corpse (Lindow 172).",
            "This harsh dichotomy mirrored the militarized maritime culture and severe ecology of Viking Age Scandinavia. In a rugged subarctic climate dominated by agricultural precarity, maritime raiding, and relentless clan conflict, martial audacity and chieftain loyalty were paramount cultural virtues (Ellis Davidson 112). Crucially, Valhalla was not a place of peaceful reward; Odin recruited the einherjar specifically to fight in his doomed ranks at Ragnarök, the apocalyptic cosmic twilight. Because Norse cosmology held that even the gods and their warriors would ultimately succumb to monstrous adversaries, heroic afterlife myth championed defiance against inevitable doom as the supreme human virtue."
        ],
        visualAnalysis: "Erected on Gotland, the Tjängvide image stone provides an extraordinary visual testament to Scandinavian heroic eschatology. In the upper register, a fallen chieftain arrives on the mythic eight-legged steed Sleipnir, greeted by a valkyrie clad in long robes who proffers a drinking horn filled with ceremonial mead (Lindow 46). In the lower register, a full-rigged Viking longship glides under billowing sails with armed crewmen, commemorating both the maritime voyages that defined Norse aristocracy and the soul's transit into the beyond. The stone visually translates personal loss into cosmological triumph, validating the fallen leader's entry into the select company of Odin's einherjar.",
        nextWing: "china"
    },
    china: {
        wing: "Wing IV: Ancient China",
        title: "T-Shaped Painted Silk Funeral Banner of Lady Dai",
        culture: "Western Han Dynasty (Changsha, Hunan Province)",
        date: "c. 168 BCE",
        medium: "Painted silk with fine mineral pigments",
        dimensions: "Height: 205 cm; Width: 92 cm",
        repository: "Hunan Museum, Changsha, China (Mawangdui Tomb No. 1)",
        image: "assets/images/china_mawangdui_banner.jpg",
        essay: [
            "Ancient Chinese afterlife beliefs, particularly articulated during the Han Dynasty, rested upon a dualistic soul ontology that mirrored the cosmic balance of Yin and Yang. Upon bodily death, the human spirit separated into two distinct components: the hun soul and the po soul (Poo 65). The hun represented the ethereal, spiritual, and intellectual essence associated with Yang; it ascended toward the celestial heavens or journeyed to Mount Kunlun, the mythical paradise governed by the Queen Mother of the West (Xiwangmu) (Loewe 38). Conversely, the po represented the corporeal, animalistic essence associated with Yin and bones; it remained tied to the decaying body within the tomb and descended into the subterranean Yellow Springs (Huangquan), a watery underworld (Wu 89).",
            "This dualism mirrored Han imperial administrative organization and Confucian family morality. Central to this system was filial piety (xiao) and ancestral sacrifice. If descendants diligently provided grave offerings, food, and symbolic goods (mingqi), the po soul rested comfortably in the tomb as a benevolent ancestor protecting the family lineage. If neglected, however, it degraded into a malevolent, wandering hungry ghost (gui), capable of wreaking disease and financial ruin upon the living (Poo 72). Moreover, the Han afterlife was envisioned as a vast spiritual bureaucracy staffed by magistrates and scribes, demonstrating how Chinese society projected its imperial civil service onto eternity."
        ],
        visualAnalysis: "Draped over the innermost coffin of Lady Dai (Xin Zhui), this silk banner served as a visual guide for the postmortem journey. Its vertical composition articulates the tripartite Han universe: the lowest section depicts the watery subterranean Yellow Springs where a muscular chthonic giant supports the earth; the middle section portrays the terrestrial realm, divided between a sacrificial feast with ritual bronze vessels for Lady Dai's po soul and an upper scene of Lady Dai leaning on her staff with attendants; and the upper horizontal wing depicts heaven with the sun crow, moon toad, intertwined dragons, and celestial deities. The banner visually harmonizes the dual demands of ancestral tomb veneration and celestial hun soul ascent, affirming the philosophical unity of the Han cosmos.",
        nextWing: "native"
    },
    native: {
        wing: "Wing V: Native North America",
        title: "Craig-Style Engraved Marine Shell Gorget from Spiro Mounds",
        culture: "Mississippian Culture (Southeastern Ceremonial Complex)",
        date: "c. 1200–1400 CE",
        medium: "Engraved lightning whelk marine shell (Busycon contrarium)",
        dimensions: "Diameter: approximately 13.5 cm",
        repository: "National Museum of the American Indian, Smithsonian Institution, Washington, D.C.",
        image: "assets/images/native_spiro_gorget.jpg",
        essay: [
            "In Indigenous North American cosmologies—exemplified in Mississippian archaeological iconography and Lakota oral traditions—the afterlife was conceptualized not as a punitive moral tribunal, but as an ontological transition within an interconnected, living universe. In Lakota ontology, a person contains multiple spiritual elements, notably the vital breath (niya) and the spirit shadow (wanagi) (Deloria 174). At death, the physical body returned to the earth, while the wanagi journeyed along the Milky Way, known as Wanagi Tacanku ('The Ghost Road' or 'Spirit Path') (Hall 48). Along this cosmic river, the traveler was not judged against legalistic sins; instead, an ancient guardian elder examined the soul for marks of cultural and spiritual maturity, such as tattoos indicating communal initiation. Recognized souls continued joyfully to an eternal ancestral camp rich in game, reunited with departed kin.",
            "This eschatology reflected the egalitarian kinship structures, cyclical ecological worldview, and non-authoritarian governance of Indigenous North American societies. Rather than envisioning eternal damnation or torment, these traditions emphasized communal continuity, cosmic harmony, and reciprocal obligations between the living and ancestral worlds. In Mississippian centers like Cahokia and Spiro Mounds, the cosmos was layered into the Upper World, This World, and the watery Beneath World, with ceremonial shell gorgets functioning as cosmological portals facilitating communication between realms (Lankford 121). Death was framed as a re-weaving into the sacred web of life expressed in the Lakota prayer Mitákuye Oyás'in ('All my relations')."
        ],
        visualAnalysis: "Recovered from the Great Mortuary at Spiro Mounds, this engraved lightning whelk shell gorget exemplifies the cosmological art of the Southeastern Ceremonial Complex. The whelk shell itself, harvested from the Gulf of Mexico, symbolized the sacred primordial waters of the Beneath World and the origin of life. The circular composition depicts ceremonial dancers in avian regalia encircling a central oculus and sacred cross motif. In Mississippian iconography, the central aperture symbolized the cosmic portal through which shamans and departed spirits traversed the boundary between This World and the Upper World along the celestial Path of Souls (Lankford 124). Worn over the chest of a deceased leader, the gorget operated as a protective visual emblem ensuring safe passage across the cosmic threshold into the ancestral realm.",
        nextWing: "synthesis"
    }
};

let openModalById = null;

document.addEventListener('DOMContentLoaded', () => {
    initArtifactModal();
    initGeneralModals();
    initThemeToggle();
    initCopyCitationButtons();
});

/* ==========================================================================
   ARTIFACT INSPECTION MODAL (LIGHTBOX)
   ========================================================================== */
function initArtifactModal() {
    const modal = document.getElementById('artifact-modal');
    const closeBtn = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalWing = document.getElementById('modal-wing-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalCulture = document.getElementById('modal-culture');
    const modalDate = document.getElementById('modal-date');
    const modalMedium = document.getElementById('modal-medium');
    const modalDimensions = document.getElementById('modal-dimensions');
    const modalRepository = document.getElementById('modal-repository');
    const modalScholarlyText = document.getElementById('modal-scholarly-text');
    const modalAnalysis = document.getElementById('modal-analysis');
    const nextBtn = document.getElementById('modal-next-btn');

    let currentZoom = 1;
    let currentCultureId = null;

    function openModal(cultureId) {
        const item = SCHOLARLY_ESSAY_DATA[cultureId];
        if (!item) return;

        currentCultureId = cultureId;
        modalImg.src = item.image;
        modalWing.textContent = item.wing;
        modalTitle.textContent = item.title;
        modalCulture.textContent = item.culture;
        modalDate.textContent = item.date;
        modalMedium.textContent = item.medium;
        modalDimensions.textContent = item.dimensions;
        modalRepository.textContent = item.repository;
        modalAnalysis.textContent = item.visualAnalysis;

        // Render full scholarly essay paragraphs
        modalScholarlyText.innerHTML = item.essay.map(p => `<p class="scholarly-p">${p}</p>`).join('');

        // Reset scroll position to top
        const infoCol = modal.querySelector('.modal-info-col');
        if (infoCol) infoCol.scrollTop = 0;

        // Setup next wing button
        if (nextBtn) {
            nextBtn.onclick = () => {
                closeModal();
                if (window.museumInstance && item.nextWing) {
                    window.museumInstance.teleportTo(item.nextWing);
                }
            };
        }

        currentZoom = 1;
        modalImg.style.transform = `scale(${currentZoom})`;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-active');

        // Pause guided tour while user is inspecting the artifact
        if (window.museumInstance && typeof window.museumInstance.pauseTourForInspection === 'function') {
            window.museumInstance.pauseTourForInspection();
        }
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-active');
        currentZoom = 1;
        modalImg.style.transform = `scale(1)`;

        // Resume guided tour timer when artifact inspection is closed
        if (window.museumInstance && typeof window.museumInstance.resumeTourFromInspection === 'function') {
            window.museumInstance.resumeTourFromInspection();
        }
    }

    window.openModalById = openModal;
    openModalById = openModal;

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    const zoomIn = document.getElementById('zoom-in-btn');
    const zoomOut = document.getElementById('zoom-out-btn');
    const zoomReset = document.getElementById('zoom-reset-btn');

    if (zoomIn) {
        zoomIn.addEventListener('click', () => {
            currentZoom = Math.min(currentZoom + 0.25, 2.5);
            modalImg.style.transform = `scale(${currentZoom})`;
        });
    }

    if (zoomOut) {
        zoomOut.addEventListener('click', () => {
            currentZoom = Math.max(currentZoom - 0.25, 0.75);
            modalImg.style.transform = `scale(${currentZoom})`;
        });
    }

    if (zoomReset) {
        zoomReset.addEventListener('click', () => {
            currentZoom = 1;
            modalImg.style.transform = `scale(1)`;
        });
    }
}

/* ==========================================================================
   THESIS & SYNTHESIS GENERAL MODALS
   ========================================================================== */
function initGeneralModals() {
    // Thesis Modal
    const thesisModal = document.getElementById('thesis-modal');
    const thesisClose = document.getElementById('thesis-modal-close');

    if (thesisClose && thesisModal) {
        thesisClose.addEventListener('click', () => {
            thesisModal.classList.remove('open');
            document.body.classList.remove('modal-active');
            if (window.museumInstance && typeof window.museumInstance.resumeTourFromInspection === 'function') {
                window.museumInstance.resumeTourFromInspection();
            }
        });
        thesisModal.addEventListener('click', (e) => {
            if (e.target === thesisModal) {
                thesisModal.classList.remove('open');
                document.body.classList.remove('modal-active');
                if (window.museumInstance && typeof window.museumInstance.resumeTourFromInspection === 'function') {
                    window.museumInstance.resumeTourFromInspection();
                }
            }
        });
    }

    // Synthesis Modal
    const synthModal = document.getElementById('synthesis-modal');
    const synthClose = document.getElementById('synthesis-modal-close');

    if (synthClose && synthModal) {
        synthClose.addEventListener('click', () => {
            synthModal.classList.remove('open');
            document.body.classList.remove('modal-active');
            if (window.museumInstance && typeof window.museumInstance.resumeTourFromInspection === 'function') {
                window.museumInstance.resumeTourFromInspection();
            }
        });
        synthModal.addEventListener('click', (e) => {
            if (e.target === synthModal) {
                synthModal.classList.remove('open');
                document.body.classList.remove('modal-active');
                if (window.museumInstance && typeof window.museumInstance.resumeTourFromInspection === 'function') {
                    window.museumInstance.resumeTourFromInspection();
                }
            }
        });
    }

    // Global ESC key listener for thesis & synthesis
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (thesisModal && thesisModal.classList.contains('open')) {
                thesisModal.classList.remove('open');
                document.body.classList.remove('modal-active');
                if (window.museumInstance && typeof window.museumInstance.resumeTourFromInspection === 'function') {
                    window.museumInstance.resumeTourFromInspection();
                }
            }
            if (synthModal && synthModal.classList.contains('open')) {
                synthModal.classList.remove('open');
                document.body.classList.remove('modal-active');
                if (window.museumInstance && typeof window.museumInstance.resumeTourFromInspection === 'function') {
                    window.museumInstance.resumeTourFromInspection();
                }
            }
        }
    });
}

/* ==========================================================================
   COPY CITATION BUTTONS
   ========================================================================== */
function initCopyCitationButtons() {
    document.querySelectorAll('.copy-cit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const citation = btn.getAttribute('data-cit');
            navigator.clipboard.writeText(citation).then(() => {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<span class="copy-icon">✓</span> Copied!';
                btn.style.borderColor = 'var(--gold-primary)';
                btn.style.color = 'var(--gold-primary)';
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });
}



/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    const savedTheme = localStorage.getItem('museum-theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('museum-dark');
        document.body.classList.add('museum-light');
        if (themeIcon) themeIcon.textContent = '☀️';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (document.body.classList.contains('museum-dark')) {
                document.body.classList.remove('museum-dark');
                document.body.classList.add('museum-light');
                if (themeIcon) themeIcon.textContent = '☀️';
                localStorage.setItem('museum-theme', 'light');
            } else {
                document.body.classList.remove('museum-light');
                document.body.classList.add('museum-dark');
                if (themeIcon) themeIcon.textContent = '🌙';
                localStorage.setItem('museum-theme', 'dark');
            }
        });
    }
}
