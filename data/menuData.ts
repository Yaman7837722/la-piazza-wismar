/** Display content transcribed from the restaurant menu. Prices are German display strings. */
export type MenuCategoryId =
  | "salads" | "antipasti" | "pizza" | "pasta"
  | "meat-fish" | "kids" | "gelato" | "drinks";

export type MenuSubcategoryId =
  | "classic" | "gourmet" | "extras" | "pasta" | "al-forno"
  | "carne" | "pesce" | "specialties" | "ice-drinks" | "kids"
  | "portions" | "soft-drinks" | "hot-drinks" | "beer" | "spirits"
  | "aperitivi" | "wine-red" | "wine-white" | "house-wine" | "longdrinks";

export type MenuPriceOption = { number?: string; size: string; price: string };

export type MenuItem = {
  id: string;
  number?: string;
  name: string;
  description?: string;
  price?: string;
  size?: string;
  priceOptions?: MenuPriceOption[];
  markers?: string[];
  category: MenuCategoryId;
  subcategory?: MenuSubcategoryId;
  featured?: boolean;
  needsVerification?: boolean;
  verificationNote?: string;
};

export type MenuSubcategory = {
  id: MenuSubcategoryId;
  label: string;
  needsVerification?: boolean;
  verificationNote?: string;
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  subcategories?: MenuSubcategory[];
  note?: string;
  subcategoryNotes?: Partial<Record<MenuSubcategoryId, string>>;
};

export const menuCategories: MenuCategory[] = [
  { id: "salads", label: "Insalate" },
  { id: "antipasti", label: "Antipasti" },
  { id: "pizza", label: "Pizza", subcategories: [
    { id: "classic", label: "Pizza Classic" },
    // Gourmet Pizza source image must be manually verified before publication.
    { id: "gourmet", label: "Pizza Gourmet", needsVerification: true, verificationNote: "Source image must be manually verified before publication." },
    { id: "extras", label: "Pizza Extras" },
  ] },
  { id: "pasta", label: "Pasta", subcategories: [
    { id: "pasta", label: "Pasta" }, { id: "al-forno", label: "Pasta al Forno" },
  ] },
  { id: "meat-fish", label: "Carne e Pesce", subcategories: [
    { id: "carne", label: "Carne" }, { id: "pesce", label: "Pesce" },
  ], subcategoryNotes: { pesce: "Alle Fischgerichte werden mit Rosmarinkartoffeln und einem kleinen Salat als Beilage angerichtet." } },
  { id: "kids", label: "Kinder" },
  { id: "gelato", label: "Gelato", subcategories: [
    { id: "specialties", label: "Eisspezialitäten" }, { id: "ice-drinks", label: "Eisgetränke" },
    { id: "kids", label: "Kinder-Eis" }, { id: "portions", label: "Eisportionen" },
  ] },
  { id: "drinks", label: "Getränke", subcategories: [
    { id: "soft-drinks", label: "Soft Drinks" }, { id: "hot-drinks", label: "Heißgetränke" },
    { id: "beer", label: "Bier" },
    // Source entries 151–154 have obscured names and require manual verification.
    { id: "spirits", label: "Spirituosen", needsVerification: true, verificationNote: "Source entries 151–154 have obscured names; verify manually." },
    { id: "aperitivi", label: "Aperitivi / Spritz" }, { id: "wine-red", label: "Rotwein" },
    { id: "wine-white", label: "Weißwein" }, { id: "house-wine", label: "Hauswein" },
    { id: "longdrinks", label: "Longdrinks" },
  ] },
];

export const menuNote = "Informationen zu Zusatzstoffen und Allergenen erhalten Sie bei unserem Servicepersonal.";

const item = (category: MenuCategoryId, number: string, slug: string, name: string, price: string, description?: string, subcategory?: MenuSubcategoryId, extra: Partial<MenuItem> = {}): MenuItem => ({
  id: `${subcategory ?? category}-${number}-${slug}`, number, name, price, ...(description ? { description } : {}), category, ...(subcategory ? { subcategory } : {}), ...extra,
});

export const menuItems: MenuItem[] = [
  item("salads", "1", "insalata-di-pollo", "Insalata di Pollo", "13,90 €", "Gemischter Salat mit Hähnchenbrust"),
  item("salads", "2", "insalata-romantica", "Insalata Romantica", "13,10 €", "Gemischter Salat mit Oliven, Champignons, Ei und Schafskäse"),
  item("salads", "3", "insalata-mista", "Insalata Mista", "9,90 €", "Gemischter Salat mit Tomaten, Gurken und Zwiebeln"),
  item("salads", "4", "insalata-con-tonno", "Insalata con Tonno", "13,90 €", "Gemischter Salat mit Thunfisch, Zwiebeln, Oliven, Peperoni und Champignons"),
  item("salads", "5", "insalata-la-piazza", "Insalata La Piazza", "15,90 €", "Gemischter Salat mit Lachs"),
  item("antipasti", "6", "pizzabrot", "Ofenfrisches Pizzabrot", "6,70 €"),
  item("antipasti", "7", "knoblauchbrot", "Knoblauchbrot", "6,90 €"),
  item("antipasti", "8", "bruschetta-al-pomodoro", "Bruschetta al Pomodoro", "8,90 €"),
  item("antipasti", "9", "la-caprese", "La Caprese", "8,90 €", "Tomate-Mozzarella mit Basilikum"),
  item("antipasti", "10", "prosciutto-e-melone", "Prosciutto e Melone", "13,90 €", "Parmaschinken mit Honigmelone"),
  item("antipasti", "11", "antipasto-vegetale", "Antipasto Vegetale", "13,90 €", "Selbstgegrilltes und eingelegtes Gemüse in Olivenöl"),
  item("antipasti", "12", "antipasto-la-piazza", "Antipasto La Piazza", "22,10 €", "Gemischte Vorspeiseplatte nach Art des Hauses"),
  item("antipasti", "501", "rindercarpaccio", "Rindercarpaccio", "14,90 €", "Mit Rucola, Cherrytomaten und Grana-Padano-Käse"),
  item("pizza", "13", "margherita", "Margherita", "10,90 €", "Tomatensauce, Käse", "classic"),
  item("pizza", "14", "al-funghi", "Al Funghi", "12,90 €", "Tomatensauce, Käse, Champignons", "classic"),
  item("pizza", "15", "al-gorgonzola", "Al Gorgonzola", "13,90 €", "Tomatensauce, Käse, Gorgonzola, Broccoli", "classic"),
  item("pizza", "16", "salami", "Salami", "12,90 €", "Tomatensauce, Käse, Salami", "classic"),
  item("pizza", "17", "prosciutto", "Prosciutto", "12,90 €", "Tomatensauce, Käse, Schinken", "classic"),
  item("pizza", "19", "marinara", "Marinara", "17,90 €", "Tomatensauce, Käse, Meeresfrüchte", "classic"),
  item("pizza", "20", "tonno", "Tonno", "14,90 €", "Tomatensauce, Käse, Thunfisch, Zwiebeln", "classic"),
  item("pizza", "21", "san-leone", "San Leone", "13,90 €", "Tomatensauce, Käse, Schinken, Mais, Champignons", "classic"),
  item("pizza", "22", "romana", "Romana", "14,90 €", "Tomatensauce, Käse, Schinken, Ei, Champignons, Artischocken, Oliven", "classic"),
  item("pizza", "24", "stagioni", "Stagioni", "13,90 €", "Tomatensauce, Käse, Salami, Schinken, Champignons, Artischocken", "classic"),
  item("pizza", "25", "calzone", "Calzone", "13,90 €", "Pizzatasche gefüllt mit Tomatensauce, Käse, Schinken, Champignons", "classic"),
  item("pizza", "26", "formaggi", "Formaggi", "15,90 €", "Tomatensauce, vier verschiedene Käsesorten", "classic"),
  item("pizza", "28", "capricciosa", "Capricciosa", "14,90 €", "Tomatensauce, Käse, Schinken, Sardellen, Oliven, Paprika, Kapern", "classic"),
  item("pizza", "29", "siciliana", "Siciliana", "13,90 €", "Tomatensauce, Mozzarella, Sardellen, Kapern, scharfe ital. Salami", "classic"),
  item("pizza", "32", "vegetariana", "Vegetariana", "14,20 €", "Tomatensauce, Käse, Gemüse der Saison", "classic"),
  item("pizza", "33", "america", "America", "14,90 €", "Tomatensauce, Käse, Schinken, Champignons, Zwiebel, Ei", "classic"),
  item("pizza", "34", "salmone", "Salmone", "17,90 €", "Tomatensauce, Käse, Lachs, Tomatenwürfel in Knoblauch eingelegt", "classic"),
  item("pizza", "35", "hawaii", "Hawaii", "12,90 €", "Tomatensauce, Käse, Schinken, Ananas", "classic"),
  item("pizza", "37", "parma", "Parma", "17,90 €", "Tomatensauce, Mozzarella, Parmaschinken, Rucola, Parmesansplitter", "classic"),
  item("pizza", "38", "diavolo", "Diavolo", "18,90 €", "Tomatensauce, Käse, Salami, Schinken, Sardellen, Kapern, scharfe Peperoni, Paprika, Zwiebel", "classic"),
  item("pizza", "39", "marco-polo", "Marco Polo", "13,90 €", "Tomatensauce, Schinken, frische Tomaten, Broccoli, Sauce Hollandaise", "classic"),
  // Gourmet Pizza entries remain empty until the source image is manually verified.
  { id: "pizza-extras-weitere-zutat", name: "Jede weitere Zutat", price: "2,00 €", category: "pizza", subcategory: "extras" },
  { id: "pizza-extras-salami-schinken", name: "Salami oder Schinken", price: "2,00 €", category: "pizza", subcategory: "extras" },
  { id: "pizza-extras-gorgonzola-parmaschinken", name: "Gorgonzola oder Parmaschinken", price: "3,00 €", category: "pizza", subcategory: "extras" },
  { id: "pizza-extras-fisch-fleisch", name: "Fisch oder Fleisch", price: "4,00 €", category: "pizza", subcategory: "extras" },
  item("pasta", "40", "spaghetti-bolognese", "Spaghetti Bolognese", "13,30 €", "mit Hackfleisch", "pasta", { markers: ["*"] }),
  item("pasta", "41", "spaghetti-carbonara", "Spaghetti Carbonara", "13,90 €", "mit Speck und Ei in Sahnesauce", "pasta", { markers: ["*"] }),
  item("pasta", "42", "spaghetti-amatriciana", "Spaghetti Amatriciana", "12,90 €", "mit Bacon und Zwiebeln in Tomatensauce", "pasta", { markers: ["*"] }),
  item("pasta", "43", "spaghetti-al-pomodoro", "Spaghetti al Pomodoro", "11,90 €", "mit Tomatensauce", "pasta", { markers: ["*"] }),
  item("pasta", "44", "spaghetti-aglio-olio-peperoncino", "Spaghetti Aglio, Olio, Peperoncino", "12,90 €", "mit Knoblauch, Olivenöl und scharfer Peperoni", "pasta", { markers: ["*"] }),
  item("pasta", "46", "gnocchi-gorgonzola", "Gnocchi Gorgonzola", "16,90 €", "mit Käse", "pasta", { markers: ["*"] }),
  item("pasta", "47", "penne-arrabiata", "Penne Arrabiata", "12,90 €", "mit pikanter Tomaten-Knoblauch-Sauce", "pasta", { markers: ["*"] }),
  item("pasta", "48", "penne-alla-contadina", "Penne alla Contadina", "13,90 €", "mit frischem Gemüse und Kräutern", "pasta", { markers: ["*"] }),
  item("pasta", "49", "penne-boscaiola", "Penne Boscaiola", "12,90 €", "mit Pilzen und Speck, Tomatensoße und Sahne", "pasta", { markers: ["*"] }),
  item("pasta", "51", "tortellini-panna-e-prosciutto", "Tortellini Panna e Prosciutto", "14,90 €", "mit Schinken-Sahnesauce", "pasta", { markers: ["*"] }),
  item("pasta", "52", "tortellini-pasticciati", "Tortellini Pasticciati", "15,90 €", "mit Speck, Pilzen, Erbsen, Tomaten-Sorbet & Sahne", "pasta"),
  item("pasta", "53", "tagliatelle-al-salmone", "Tagliatelle al Salmone", "19,90 €", "mit frischem Räucherlachs in Pernot-Tomaten-Sahne-Sauce", "pasta", { markers: ["*", "#"] }),
  item("pasta", "54", "gnocci-la-piazza", "Gnocci la Piazza", "15,90 €", "mit Basilikumpesto", "pasta"),
  item("pasta", "55", "spaghetti-all-scoglio", "Spaghetti all Scoglio", "22,90 €", "mit Meeresfrüchten und Cherrytomaten", "pasta", { markers: ["*"] }),
  item("pasta", "56", "tagliatelle-gamberetti-e-zucchini", "Tagliatelle Gamberetti e Zucchini", "19,90 €", "mit Garnelen, Zucchini und Cherrytomaten in Weisswein-Sahne-Sauce", "pasta", { markers: ["*", "#"] }),
  item("pasta", "300", "penne-crema", "Penne Crema", "18,90 €", "mit roten Zwiebeln, Hähnchenbrust, Sahne und Balsamico-Sauce", "pasta", { markers: ["*"] }),
  item("pasta", "45", "tagliatelle-campagnola", "Tagliatelle Campagnola", "19,90 €", "mit Knoblauch, Steinpilze, Schweinefilet in Sahne Sauce & Trüffel Paste", "pasta", { markers: ["*"] }),
  item("pasta", "57", "lasagne-al-forno", "Lasagne al Forno", "16,90 €", "mit Bechamel, Hackfleisch und Käse", "al-forno", { markers: ["*", "+"] }),
  item("pasta", "59", "tortellini-al-forno", "Tortellini al Forno", "16,90 €", "in Bolognesesauce mit Käse überbacken", "al-forno", { markers: ["*", "+"] }),
  item("pasta", "60", "gnocchi-gratin", "Gnocchi Gratin", "15,90 €", "mit Mozzarella in Tomatensauce mit Käse überbacken", "al-forno", { markers: ["*", "+"] }),
  item("pasta", "58", "penne-alla-pavarotti", "Penne alla Pavarotti", "16,90 €", "mit Speck, Knoblauch, Cherry Tomaten, Brokkoli in Sahne Sauce überbacken", "al-forno"),
  item("meat-fish", "200", "scaloppa-al-limone", "Scaloppa al Limone", "23,10 €", "Schweinefleisch mit Zitronen-Sauce, Rosmarinkartoffeln und Salat", "carne"),
  item("meat-fish", "201", "scaloppa-al-gorgonzola", "Scaloppa al Gorgonzola", "23,90 €", "Schweinefleisch mit Gorgonzola-Sauce, Rosmarinkartoffeln und Salat", "carne"),
  item("meat-fish", "202", "saltimbocca-alla-romana", "Saltimbocca alla Romana", "25,90 €", "Schweinefleisch mit Schinken, Salbei, Rosmarinkartoffeln und Salat", "carne"),
  item("meat-fish", "203", "filetto-la-piazza", 'Filetto "La Piazza"', "25,90 €", undefined, "carne", { needsVerification: true, verificationNote: "Part of the description is obscured by glare in the supplied menu image. Verify against the restaurant's source menu before publishing." }),
  item("meat-fish", "204", "dorschfilet-all-italiana", "Dorschfilet all' Italiana", "27,10 €", "mit schwarzen Oliven, Cherrytomaten", "pesce"),
  item("meat-fish", "205", "dordenfilet-all-acqua-pazza", "Dordenfilet all' Acqua Pazza", "27,10 €", "mit Cherrytomaten, Knoblauch", "pesce"),
  item("meat-fish", "206", "salmone-all-italiana", "Salmone all' Italiana", "27,90 €", "Lachs mit Zitronensauce", "pesce"),
  item("meat-fish", "207", "salmone-al-pepe-verde", "Salmone al Pepe Verde", "27,90 €", "Lachs mit grünem Pfeffer und Sahne", "pesce"),
  item("kids", "208", "kinder-bolognese", "Kinder Bolognese", "6,80 €", "Spaghetti oder Penne mit Hackfleisch"),
  item("kids", "209", "kinder-pomodoro", "Kinder Pomodoro", "6,80 €", "Spaghetti oder Penne mit Tomatensauce"),
  item("kids", "210", "kinder-bianco", "Kinder Bianco", "5,10 €", "Spaghetti oder Penne ohne Sauce"),
  item("kids", "211", "fisch-chips", "Fisch Chips (6 Stück)", "6,90 €"),
  item("kids", "212", "nuggets-mit-pommes", "Nuggets mit Pommes (5 Stück)", "6,90 €"),
  item("kids", "213", "pommes-frites", "Portion Pommes Frites", "5,20 €"),
  item("gelato", "63", "schokoladenbecher", "Schokoladenbecher", "9,90 €", "Schokoladeneis garniert mit Sahne und Schokosauce", "specialties"),
  item("gelato", "64", "nussbecher", "Nussbecher", "10,10 €", "Haselnusseis, Sahne, Nusssauce, Krokant", "specialties", { markers: ["*"] }),
  item("gelato", "65", "erdbeerbecher", "Erdbeerbecher", "10,30 €", "Vanilleeis, frische Erdbeeren, Sahne, Erdbeersauce", "specialties", { markers: ["*"] }),
  item("gelato", "66", "kiwibecher", "Kiwibecher", "9,90 €", "gemischtes Eis, frische Kiwi, Kiwisauce und Sahne", "specialties", { markers: ["*"] }),
  item("gelato", "67", "kirschbecher", "Kirschbecher", "9,90 €", "Vanille- und Kirscheis mit Kirschen, Amarenasauce und Sahne", "specialties", { markers: ["*"] }),
  item("gelato", "68", "banana-split", "Banana-Split", "10,90 €", "gemischtes Eis mit Banane, Amarenakirschen, Sahne, Amarenasauce und Eierlikör", "specialties"),
  item("gelato", "69", "raffaello-becher", "Raffaello-Becher", "9,90 €", "gemischtes Eis mit Sahne, Batida de coco, Kokosstreusel", "specialties"),
  item("gelato", "70", "amarettobecher", "Amarettobecher", "9,90 €", "gemischtes Eis mit Amaretti, Kirschen, Sahne und Amarettolikör", "specialties", { markers: ["*"] }),
  item("gelato", "71", "krokantbecher", "Krokantbecher", "9,90 €", "gemischtes Eis mit Nusskrokant, Nusssauce und Sahne", "specialties"),
  item("gelato", "72", "fruchtebecher", "Früchtebecher", "10,90 €", "gemischtes Eis mit Früchtecocktail, Sahne und Amarenasauce", "specialties"),
  item("gelato", "74", "spaghettieis", "Spaghettieis", "9,50 €", "Vanilleeis mit Sahne und Erdbeersauce", "specialties", { markers: ["*"] }),
  item("gelato", "76", "la-piazza-becher", "La Piazza-Becher", "16,90 €", "lassen Sie sich überraschen", "specialties", { markers: ["*", "*"], featured: true }),
  item("gelato", "77", "melonenbecher", "Melonenbecher", "9,90 €", "gemischtes Eis, Melone, Sahne, Melonentopping", "specialties", { markers: ["*"] }),
  item("gelato", "78", "amarenabecher", "Amarenabecher", "10,10 €", "gemischtes Eis mit Sahne, Amarenakirschen und Amarenasauce", "specialties", { markers: ["*"] }),
  item("gelato", "79", "eierlikorbecher", "Eierlikörbecher", "9,90 €", "gemischtes Eis mit Sahne, Eierlikör, Schokostreusel", "specialties", { markers: ["#"] }),
  item("gelato", "80", "heidelbeerbecher", "Heidelbeerbecher", "9,90 €", "Vanille- und Heidelbeereis, Heidelbeeren, Sahne und Heidelbeersauce", "specialties", { markers: ["*"] }),
  item("gelato", "81", "malagabecher", "Malagabecher", "10,10 €", "Vanilleeis mit Marsalawein eingelegte Rosinen", "specialties"),
  item("gelato", "82", "after-eight-becher", "After-Eight-Becher", "10,10 €", "Stracciatella- und Pfefferminzeis, Sahne, After-Eight und Minzlikör", "specialties"),
  item("gelato", "83", "joghurt-becher", "Joghurt-Becher", "10,90 €", "Joghurteis, Joghurt, mit Früchten Ihrer Wahl, verziert mit Sahne", "specialties"),
  item("gelato", "87", "baileys-becher", "Baileys-Becher", "10,90 €", "gemischtes Eis mit Sahne und Baileys", "specialties", { markers: ["#"] }),
  item("gelato", "88", "mocca-becher", "Mocca-Becher", "10,10 €", "gemischtes Eis mit Sahne, Moccabohnen, Amarettolikör und Moccasauce", "specialties", { markers: ["*"] }),
  item("gelato", "89", "walnussbecher", "Walnussbecher", "10,90 €", "Walnusseis, Walnüsse, garniert mit Sahne und Nuss-Sauce", "specialties", { markers: ["*"] }),
  item("gelato", "91", "ananasbecher", "Ananasbecher", "10,90 €", "Vanilleeis, Ananasstücke, Sahne und Maracujasauce", "specialties", { markers: ["*"] }),
  item("gelato", "93", "himbeerbecher", "Himbeerbecher", "10,90 €", "Vanille- und Himbeereis, Himbeeren mit Sahne und Himbeersauce", "specialties", { markers: ["*"] }),
  item("gelato", "94", "schwarzwaldbecher", "Schwarzwaldbecher", "10,90 €", "Schokoeis, Kirschen, Sahne, Amarenasauce und Schokostreusel", "specialties", { markers: ["*"] }),
  item("gelato", "95", "schwedenbecher", "Schwedenbecher", "10,90 €", "Vanilleeis, Apfelmus, Eierlikör, Schokostreusel und Sahne", "specialties", { markers: ["*"] }),
  item("gelato", "96", "eiskaffee", "Eiskaffee", "7,10 €", "Vanille- und Moccaeis, Kaffee, Sahne und Moccalikör", "ice-drinks"),
  item("gelato", "97", "eisschokolade", "Eisschokolade", "7,20 €", "Vanilleeis, Schokoladentrunk und Sahne", "ice-drinks"),
  item("gelato", "98", "milchshake", "Milchshake", "7,20 €", "Milch mit Eissorte nach Wahl gemixt mit Sahne", "ice-drinks"),
  item("gelato", "99", "kiwi-joghurt-drink", "Kiwi-Joghurt-Drink", "7,50 €", "Milch mit Eis und Joghurt", "ice-drinks"),
  item("gelato", "100", "erdbeer-joghurt-drink", "Erdbeer-Joghurt-Drink", "7,50 €", "Milch mit Eis und Joghurt", "ice-drinks"),
  item("gelato", "101", "bananen-joghurt-drink", "Bananen-Joghurt-Drink", "7,50 €", "Milch mit Eis und Joghurt", "ice-drinks"),
  item("gelato", "102", "coppa-per-bambini", "Coppa per Bambini", "8,60 €", undefined, "kids", { needsVerification: true, verificationNote: "Part of description obscured by reflection in source image." }),
  item("gelato", "103", "kinder-spaghetti", "Kinder-Spaghetti", "7,50 €", "Vanilleeis mit Sahne und Erdbeersauce", "kids"),
  item("gelato", "104", "pinocchio-becher", "Pinocchio-Becher", "6,50 €", "Zwei Kugeln Eis, Sahne und Streusel", "kids"),
  item("gelato", "105", "kleine-portion-eis", "kleine Portion Eis (3 Kugeln)", "7,50 €", undefined, "portions"),
  item("gelato", "106", "mittlere-portion", "Mittlere Portion (4 Kugeln)", "8,90 €", undefined, "portions"),
  item("gelato", "107", "grosse-portion", "Große Portion (5 Kugeln)", "10,50 €", undefined, "portions"),
  item("gelato", "108", "portion-sahne", "Portion Sahne", "2,00 €", undefined, "portions"),
  item("gelato", "109", "likor", "Likör", "3,00 €", undefined, "portions"),
  ...([
    ["110", "coca-cola", "Coca Cola"], ["111", "coca-cola-light", "Coca Cola light"],
    ["201", "coca-cola-zero", "Coca Cola Zero"], ["112", "fanta", "Fanta"],
    ["113", "sprite", "Sprite"], ["114", "spezi", "Spezi"],
    ["115", "glashager-apfelschorle", "Glashäger Apfelschorle"],
    ["116", "mineralwasser-stilles-wasser", "Mineralwasser / stilles Wasser"],
  ] as const).map(([number, slug, name]) => ({
    id: `soft-drinks-${number}-${slug}`, number, name, category: "drinks" as const,
    subcategory: "soft-drinks" as const,
    priceOptions: [{ size: "0,2 l", price: "3,00 €" }, { size: "0,4 l", price: "5,00 €" }],
  })),
  item("drinks", "117", "bitter-lemon", "Bitter Lemon", "3,00 €", undefined, "soft-drinks", { size: "0,25 l" }),
  item("drinks", "118", "tonic-water", "Tonic Water", "3,00 €", undefined, "soft-drinks", { size: "0,25 l" }),
  item("drinks", "119", "ginger-ale", "Ginger Ale", "3,00 €", undefined, "soft-drinks", { size: "0,25 l" }),
  ...([
    ["120", "apfelsaft", "Granini Apfelsaft"], ["121", "orangensaft", "Granini Orangensaft"],
    ["122", "bananensaft", "Granini Bananensaft"], ["123", "kirschsaft", "Granini Kirschsaft"],
    ["124", "kibasaft", "Granini Kibasaft"],
  ] as const).map(([number, slug, name]) => ({
    id: `soft-drinks-${number}-${slug}`, number, name, category: "drinks" as const,
    subcategory: "soft-drinks" as const,
    priceOptions: [{ size: "0,2 l", price: "3,10 €" }, { size: "0,4 l", price: "5,60 €" }],
  })),
  item("drinks", "200", "san-pellegrino-vio", "S. Pellegrino / VIO still", "7,90 €", undefined, "soft-drinks", { size: "0,75 l" }),
  item("drinks", "125", "espresso-macchiato", "Espresso Macchiato", "2,90 €", undefined, "hot-drinks"),
  item("drinks", "126", "espresso", "Espresso", "2,50 €", undefined, "hot-drinks"),
  item("drinks", "127", "espresso-corretto", "Espresso Corretto", "4,00 €", undefined, "hot-drinks"),
  item("drinks", "128", "doppelter-espresso", "Doppelter Espresso", "4,50 €", undefined, "hot-drinks"),
  item("drinks", "129", "cappuccino-mit-sahne", "Cappuccino mit Sahne", "4,90 €", undefined, "hot-drinks"),
  item("drinks", "130", "tasse-kaffee", "Tasse Kaffee", "3,00 €", undefined, "hot-drinks"),
  item("drinks", "131", "pott-kaffee", "Pott Kaffee", "4,00 €", undefined, "hot-drinks"),
  item("drinks", "132", "ital-cappuccino", "ital. Cappuccino", "5,10 €", undefined, "hot-drinks"),
  item("drinks", "133", "tee", "Tee", "3,50 €", undefined, "hot-drinks"),
  item("drinks", "134", "kakao", "Kakao", "4,10 €", undefined, "hot-drinks"),
  item("drinks", "135", "kakao-mit-sahne", "Kakao mit Sahne", "5,10 €", undefined, "hot-drinks"),
  item("drinks", "136", "latte-macchiato", "Latte Macchiato", "5,50 €", undefined, "hot-drinks"),
  item("drinks", "137", "latte-macchiato-caramel", "Latte Macchiato Caramel", "6,50 €", undefined, "hot-drinks"),
  item("drinks", "138", "milchkaffee", "Milchkaffee", "5,00 €", undefined, "hot-drinks"),
  item("drinks", "139", "irish-coffee", "Irish Coffee", "6,00 €", undefined, "hot-drinks"),
  item("drinks", "140", "heisser-amaretto-mit-sahne", "Heißer Amaretto mit Sahne", "4,50 €", undefined, "hot-drinks"),
  item("drinks", "141", "konig-pilsener-02", "König Pilsener vom Fass", "4,30 €", undefined, "beer", { size: "0,2 l" }),
  item("drinks", "142", "konig-pilsener-05", "König Pilsener vom Fass", "5,50 €", undefined, "beer", { size: "0,5 l" }),
  item("drinks", "143", "alster-03", "Alster", "4,30 €", undefined, "beer", { size: "0,3 l" }),
  item("drinks", "144", "alster-05", "Alster", "5,50 €", undefined, "beer", { size: "0,5 l" }),
  item("drinks", "145", "malzbier", "Malzbier", "3,70 €", undefined, "beer", { size: "0,33 l" }),
  item("drinks", "146", "benediktiner", "Benediktiner", "5,50 €", undefined, "beer", { size: "0,5 l" }),
  item("drinks", "147", "benediktiner-alkoholfrei", "Benediktiner alkoholfrei", "5,50 €", undefined, "beer", { size: "0,5 l" }),
  item("drinks", "148", "benediktiner-dunkel", "Benediktiner dunkel", "5,50 €", undefined, "beer", { size: "0,5 l" }),
  item("drinks", "149", "bitburger-alkoholfrei", "Bitburger alkoholfrei", "3,70 €", undefined, "beer", { size: "0,33 l" }),
  item("drinks", "150", "kostritzer-schwarzbier", "Köstritzer Schwarzbier", "3,70 €", undefined, "beer", { size: "0,33 l" }),
  // Source entries 151–154 are omitted until their obscured names are manually verified.
  ...([
    ["sambuca", "Sambuca", "2 cl", "3,90 €"], ["grappa-bianca", "Grappa Bianca", "2 cl", "4,10 €"],
    ["fernet", "Fernet", "2 cl", "3,90 €"], ["ramazotti", "Ramazotti", "2 cl", "3,90 €"],
    ["grappa-chardonnay", "Grappa Chardonnay", "2 cl", "5,10 €"],
    ["grappa-prosecco", "Grappa Prosecco", "2 cl", "3,90 €"],
    ["vecchia-romagna", "Vecchia Romagna", "2 cl", "5,10 €"],
    ["baileys", "Baileys", "2 cl", "3,90 €"], ["whisky", "Whisky", "4 cl", "5,90 €"],
  ] as const).map(([slug, name, size, price]) => ({ id: `spirits-${slug}`, name, size, price, category: "drinks" as const, subcategory: "spirits" as const })),
  // The dedicated Spritz page is treated as the newer source; older general-menu entries 165–167 are not duplicated.
  { id: "aperitivi-aperol-spritz", name: "Aperol Spritz", price: "8,30 €", category: "drinks", subcategory: "aperitivi" },
  { id: "aperitivi-sarti-spritz", name: "Sarti Spritz", price: "8,30 €", category: "drinks", subcategory: "aperitivi" },
  { id: "aperitivi-campari-spritz", name: "Campari Spritz", price: "8,30 €", category: "drinks", subcategory: "aperitivi" },
  { id: "aperitivi-averna-don-salvatore", name: "Averna — Don Salvatore auf Eis", price: "3,90 €", size: "2 cl", category: "drinks", subcategory: "aperitivi" },
  { id: "aperitivi-crodino-spritz", name: "Crodino Spritz alkoholfrei", price: "4,70 €", category: "drinks", subcategory: "aperitivi" },
  item("drinks", "168", "lambrusco-025", "Lambrusco, lieblich", "8,90 €", undefined, "wine-red", { size: "0,25 l" }),
  item("drinks", "169", "lambrusco-05", "Lambrusco, lieblich", "14,90 €", undefined, "wine-red", { size: "0,5 l" }),
  item("drinks", "170", "chianti-025", "Chianti, trocken", "8,90 €", undefined, "wine-red", { size: "0,25 l" }),
  item("drinks", "171", "chianti-05", "Chianti, trocken", "14,90 €", undefined, "wine-red", { size: "0,5 l" }),
  item("drinks", "172", "nero-davola-025", "Nero D'Avola, trocken", "8,90 €", undefined, "wine-red", { size: "0,25 l" }),
  item("drinks", "173", "nero-davola-05", "Nero D'Avola, trocken", "14,90 €", undefined, "wine-red", { size: "0,5 l" }),
  item("drinks", "174", "rose-025", "Rosé, trocken-fein", "8,90 €", undefined, "wine-red", { size: "0,25 l" }),
  item("drinks", "175", "rose-05", "Rosé, trocken-fein", "14,90 €", undefined, "wine-red", { size: "0,5 l" }),
  item("drinks", "176", "frizzantino-025", "Frizzantino, lieblich", "8,90 €", undefined, "wine-white", { size: "0,25 l" }),
  item("drinks", "177", "frizzantino-05", "Frizzantino, lieblich", "14,90 €", undefined, "wine-white", { size: "0,5 l" }),
  item("drinks", "178", "chardonnay-025", "Chardonnay, trocken", "8,90 €", undefined, "wine-white", { size: "0,25 l" }),
  item("drinks", "179", "chardonnay-05", "Chardonnay, trocken", "14,90 €", undefined, "wine-white", { size: "0,5 l" }),
  item("drinks", "180", "saave-025", "Saave, trocken", "8,90 €", undefined, "wine-white", { size: "0,25 l" }),
  item("drinks", "181", "saave-05", "Saave, trocken", "14,90 €", undefined, "wine-white", { size: "0,5 l" }),
  item("drinks", "182", "pinot-grigio-025", "Pinot Grigio, trocken-fruchtig", "8,90 €", undefined, "wine-white", { size: "0,25 l" }),
  item("drinks", "183", "pinot-grigio-05", "Pinot Grigio, trocken-fruchtig", "14,90 €", undefined, "wine-white", { size: "0,5 l" }),
  item("drinks", "184", "vino-della-casa-025", 'Vino della Casa "Hausmarke"', "7,90 €", undefined, "house-wine", { size: "0,25 l" }),
  item("drinks", "185", "vino-della-casa-05", 'Vino della Casa "Hausmarke"', "13,90 €", undefined, "house-wine", { size: "0,5 l" }),
  item("drinks", "186", "weinschorle-025", "Weinschorle", "8,90 €", undefined, "house-wine", { size: "0,25 l" }),
  item("drinks", "187", "weinschorle-05", "Weinschorle", "13,50 €", undefined, "house-wine", { size: "0,5 l" }),
  item("drinks", "188", "vodka-lemon", "Vodka Lemon", "10,00 €", undefined, "longdrinks"),
  item("drinks", "189", "bacardi-cola", "Bacardi Cola", "10,00 €", undefined, "longdrinks"),
  item("drinks", "190", "whisky-cola", "Whisky Cola", "10,00 €", undefined, "longdrinks"),
  item("drinks", "191", "weinbrand-cola", "Weinbrand Cola", "10,00 €", undefined, "longdrinks"),
];

export const menuItemsNeedingVerification = menuItems.filter(item => item.needsVerification);
export const menuSubcategoriesNeedingVerification = menuCategories.flatMap(category =>
  category.subcategories?.filter(subcategory => subcategory.needsVerification).map(subcategory => ({ category: category.id, ...subcategory })) ?? [],
);
