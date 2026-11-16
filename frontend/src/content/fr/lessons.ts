/**
 * Les leçons, en français. Une phrase par ligne.
 * Les clés, l'ordre des listes et leur longueur sont ceux de `content/en/lessons.ts`.
 * Les versets sont traduits de l'anglais de la King James.
 */

import type { LessonsText } from "../../lib/lessons.ts";

export const lessons: LessonsText = {
  lessons: {
    "what-is-a-sat": {
      title: "Qu'est-ce qu'un sat ?",
      lines: [
        "Un sat est le plus petit morceau d'un bitcoin.",
        "Un bitcoin vaut 100 000 000 sats, comme un dollar vaut 100 cents.",
        "Les sats que tu gagnes ici sont du vrai bitcoin."
      ],
      more: [
        "Bitcoin est né en 2009, créé par quelqu'un qui signait Satoshi Nakamoto.",
        "Le plus petit morceau s'appelle un satoshi en son honneur, et on dit sat pour faire court.",
        "Un bitcoin entier vaut bien plus que ce que rapportent la plupart des petits boulots, alors on compte les salaires en sats.",
        "Mille sats font 0,00001 bitcoin.",
        "Un sat ne peut pas être coupé en plus petit, et il ne peut pas être copié.",
        "Quand on te paie 500 sats, tu possèdes 500 des sats qui existent, et personne d'autre ne les possède."
      ],
      tryThis: "Trouve la plus grosse récompense de ta liste de petits boulots et calcule quelle part d'un bitcoin elle représente.",
      ask: "Pourquoi est-ce utile d'avoir une monnaie qui se compte en tout petits morceaux ?"
    },
    "where-sats-live": {
      title: "Où vivent les sats ?",
      lines: [
        "Tes sats vivent dans un portefeuille, une application sur un téléphone.",
        "Le portefeuille garde une clé secrète, et c'est cette clé qui fait que les sats sont à toi.",
        "Garde bien la clé, et personne ne pourra te les prendre."
      ],
      more: [
        "Un portefeuille de sats garde autre chose que des pièces.",
        "Il garde une clé, un très long nombre secret.",
        "Celui qui connaît la clé peut dépenser les sats, c'est donc la clé qu'il faut protéger.",
        "La plupart des portefeuilles te donnent douze ou vingt-quatre mots à écrire sur papier, et ces mots sont la clé.",
        "Range ce papier là où la famille garde les choses importantes.",
        "Ne tape jamais ces mots sur un site web, et ne les prends jamais en photo.",
        "Le Guide montre comment choisir un portefeuille et en installer un pour un enfant."
      ],
      tryThis: "Avec un parent, trouve où ton portefeuille affiche ses mots de sauvegarde, et décidez ensemble où le papier sera rangé.",
      ask: "Quelle différence y a-t-il entre quelqu'un qui garde ton argent pour toi et toi qui le gardes toi-même ?"
    },
    "how-sats-move": {
      title: "Comment voyagent les sats ?",
      lines: [
        "Les sats voyagent sur Lightning, une route rapide construite sur Bitcoin.",
        "Ton portefeuille écrit une demande pour les sats que tu as gagnés.",
        "Le portefeuille de Maman ou de Papa la paie, et les sats arrivent en une seconde ou deux.",
        "Ils passent directement d'un portefeuille à l'autre."
      ],
      more: [
        "Bitcoin inscrit chaque paiement dans un registre que le monde entier partage.",
        "Ce registre est très sûr et un peu lent, alors les petits paiements passent par Lightning.",
        "Sur Lightning, ton portefeuille écrit une facture : une demande pour un nombre exact de sats.",
        "Le portefeuille de celui qui paie lit la facture et envoie exactement ce nombre.",
        "Le paiement prend une seconde ou deux et ne coûte presque rien.",
        "Personne ne garde tes sats en chemin."
      ],
      tryThis: "Quand un petit boulot est à payer, ouvre ton portefeuille, appuie sur Recevoir et fais la demande toi-même.",
      ask: "Pourquoi est-ce la personne payée qui écrit la demande, et celle qui paie qui l'approuve ?"
    },
    "why-nobody-can-make-more": {
      title: "Pourquoi personne ne peut en créer plus ?",
      lines: [
        "Il n'y aura jamais plus de 21 000 000 de bitcoins.",
        "Personne ne peut en imprimer en plus, comme on imprime plus de dollars chaque année.",
        "Une monnaie qui reste rare garde sa valeur pendant que tu épargnes."
      ],
      more: [
        "Les dollars, les livres et les euros sont créés par des banques centrales, et il s'en crée davantage chaque année.",
        "Quand plus d'argent court après le même pain, le pain coûte plus cher.",
        "Voilà pourquoi un grand-parent se souvient d'un pain qui coûtait quelques sous.",
        "Les règles de Bitcoin permettent 21 000 000 de pièces, et la liste s'arrête là.",
        "Les nouvelles pièces arrivent selon un calendrier qui diminue de moitié tous les quatre ans environ, jusqu'à ce qu'il n'en reste plus à émettre.",
        "Aucune personne, aucune entreprise, aucun gouvernement ne peut changer cela par simple décision.",
        "On appelle cela une monnaie saine : elle mesure la même chose demain qu'aujourd'hui."
      ],
      saying: {
        text: "Une balance faussée est une abomination pour le Seigneur, mais un poids juste fait sa joie.",
        from: "Proverbes 11:1"
      },
      tryThis: "Demande à un grand-parent combien coûtait un pain ou un litre d'essence quand il avait ton âge.",
      ask: "Si tu pouvais imprimer ton propre argent de poche, qu'arriverait-il au prix des bonbons à la maison ?"
    },
    "earn-it": {
      title: "Gagne-le",
      lines: [
        "L'argent est un merci pour avoir aidé quelqu'un.",
        "Tu as balayé le sol, alors la famille a une cuisine propre.",
        "Les sats disent que ton travail a compté pour eux."
      ],
      more: [
        "Personne n'est payé pour avoir envie d'argent.",
        "On est payé quand on fait quelque chose qui a de la valeur pour une autre personne.",
        "Le boulanger est payé parce que tu préfères avoir le pain plutôt que les pièces.",
        "Chacun de vous deux y gagne, et c'est cela, un échange juste.",
        "Un petit boulot à la maison, c'est le même échange en plus petit.",
        "Mieux tu sers, plus ton travail a de valeur."
      ],
      saying: {
        text: "Dans tout labeur il y a du profit, mais les simples paroles ne conduisent qu'à la misère.",
        from: "Proverbes 14:23"
      },
      tryThis: "Choisis un petit boulot et fais-le un peu mieux que ce que la note demande.",
      ask: "Qui a été aidé par le dernier travail que tu as fait ?"
    },
    "save-some": {
      title: "Mets-en de côté",
      lines: [
        "Les sats que tu gardes aujourd'hui pourront acheter quelque chose de mieux plus tard.",
        "Attendre est difficile, et c'est ainsi que l'on devient riche.",
        "Essaie de garder la moitié de ce que tu gagnes."
      ],
      more: [
        "Tu peux dépenser aujourd'hui ce que tu gagnes, ou le garder pour plus tard.",
        "Le garder s'appelle épargner, et c'est choisir un grand bien plus tard plutôt qu'un petit maintenant.",
        "Chaque outil, chaque magasin, chaque ferme qui existe a été bâti par quelqu'un qui a d'abord épargné.",
        "L'épargne aide aussi une famille à tenir bon quand quelque chose se casse ou que le travail manque.",
        "Épargner marche mieux avec une monnaie qui garde sa valeur pendant qu'elle attend.",
        "Commence petit, et fais-le chaque fois que tu es payé."
      ],
      saying: {
        text: "Celui qui amasse par son travail verra son bien grandir.",
        from: "Proverbes 13:11"
      },
      tryThis: "Choisis quelque chose qui vaut la peine d'attendre, et compte combien de petits boulots il faudra.",
      ask: "Qu'est-ce que notre famille possède parce que quelqu'un a épargné pour l'avoir ?"
    },
    "keep-your-word": {
      title: "Tiens parole",
      lines: [
        "Appuyer sur « Je m'en occupe ! », c'est faire une promesse.",
        "On fait confiance à celui qui termine ce qu'il a pris.",
        "La confiance vaut plus que n'importe quelle récompense."
      ],
      more: [
        "Le commerce repose sur des promesses.",
        "Le marchand promet que sa balance est juste, et le maçon promet que le mur tiendra.",
        "Quand tu prends un petit boulot, quelqu'un cesse de s'en inquiéter parce que tu as dit que tu le ferais.",
        "Si tu ne peux pas finir, dis-le tôt et rends le petit boulot.",
        "À celui qui est connu pour tenir parole, on propose le meilleur travail.",
        "Cette réputation se gagne en des années et se perd en un jour."
      ],
      saying: {
        text: "Celui qui est fidèle dans les plus petites choses est fidèle aussi dans les grandes.",
        from: "Luc 16:10"
      },
      tryThis: "Si tu as pris un petit boulot que tu ne peux pas finir, rends-le aujourd'hui et explique pourquoi.",
      ask: "En qui as-tu le plus confiance pour faire ce qu'il dit, et pourquoi ?"
    },
    "give-some": {
      title: "Donnes-en un peu",
      lines: [
        "Ce que tu as gagné, tu peux le partager.",
        "Un cadeau te coûte quelque chose, et c'est ce qui en fait un cadeau.",
        "Mets-en un peu de côté pour quelqu'un qui en a besoin."
      ],
      more: [
        "On ne peut donner que ce qui est à soi.",
        "Voilà pourquoi gagner vient en premier : cela te rend capable de donner.",
        "Depuis longtemps, les familles croyantes mettent de côté un dixième avant de dépenser quoi que ce soit.",
        "Un don fait discrètement aide celui qui le reçoit et façonne celui qui le donne.",
        "Donner de son temps compte aussi : un petit boulot fait pour un voisin, sans demander de récompense.",
        "Décide de ta part avant que les sats arrivent, et donner deviendra une habitude."
      ],
      saying: {
        text: "Il y a plus de bonheur à donner qu'à recevoir.",
        from: "Actes 20:35"
      },
      tryThis: "Choisis la part que tu donneras de ta prochaine récompense, et à qui.",
      ask: "Qui, près de chez nous, aurait besoin d'un coup de main cette semaine ?"
    },
    "what-to-save-for": {
      title: "Pourquoi épargner, et pour quoi ?",
      lines: [
        "L'épargne transforme beaucoup de petites récompenses en une grande chose.",
        "Un but donne une raison à chaque petit boulot.",
        "Choisis quelque chose qui vaut l'attente."
      ],
      more: [
        "Épargne d'abord pour quelque chose que tu peux atteindre en quelques semaines, pour voir que ça marche.",
        "Un bon outil est un beau premier but : un canif, une canne à pêche, une boîte de crayons.",
        "Ensuite, épargne pour quelque chose qui rapporte : des graines, quelques poules pondeuses, une tondeuse pour tondre des pelouses.",
        "Les choses qui rapportent s'appellent du capital, et c'est grâce à elles que l'épargne grandit par le travail.",
        "Gardes-en pour les jours difficiles, car les choses se cassent quand on s'y attend le moins.",
        "Certaines familles épargnent pour un avenir lointain : une première camionnette, une école de métiers, un bout de terre.",
        "Des sats mis de côté pendant des années vaudront peut-être plus ou moins en dollars le jour où tu les dépenseras."
      ],
      saying: {
        text: "Il y a un trésor précieux et de l'huile dans la demeure du sage, mais l'insensé dépense tout.",
        from: "Proverbes 21:20"
      },
      tryThis: "Écris un but pour ce mois-ci et un pour cette année, et ce que chacun coûte en sats.",
      ask: "Pour quoi épargnais-tu quand tu avais mon âge ?"
    },
    "where-else-to-earn": {
      title: "Où gagner d'autres sats ?",
      lines: [
        "Les petits boulots à la maison sont une façon.",
        "Toute personne qui a un portefeuille Lightning peut te payer.",
        "La façon la plus sûre est de fabriquer ou de faire quelque chose que les gens veulent."
      ],
      more: [
        "Vends ce que tu fais pousser ou ce que tu fabriques : des œufs, des légumes, du bois de chauffage, des pâtisseries, un objet d'artisanat.",
        "Une affiche avec le code de ton portefeuille transforme un étal de ferme en boutique qui accepte les sats.",
        "Propose tes services aux voisins : tondre, ratisser, déneiger, garder des animaux.",
        "Demande à tes grands-parents, à ton parrain et à ta marraine d'envoyer l'argent d'anniversaire en sats.",
        "Certaines applications paient de petites sommes en sats pour lire, écouter ou écrire.",
        "Ces sommes sont petites, et chaque application a ses propres règles et ses propres raisons de payer.",
        "Utilise-les avec un parent, et ne donne jamais à une application les mots secrets de ton portefeuille."
      ],
      tryThis: "Pense à une chose que tu pourrais vendre ou à un travail que tu pourrais faire pour un voisin, et parles-en à un parent.",
      ask: "Qu'est-ce que notre famille pourrait fabriquer ou faire pousser que quelqu'un voudrait acheter ?",
      links: [
        "Une application de la Bible qui récompense la lecture quotidienne avec des sats.",
        "Une application de podcasts qui paie des sats pour l'écoute.",
        "Un forum où les bons messages rapportent des sats. Pour les enfants plus âgés, avec un parent."
      ],
      care: "Ces services sont indépendants de ChipIn, qui ne reçoit rien d'eux. Lis les conditions de chacun avec un parent."
    },
    "where-to-give": {
      title: "Où donner ?",
      lines: [
        "Donne d'abord aux personnes que tu peux voir.",
        "Ensuite, à des œuvres auxquelles tu crois, plus loin.",
        "Les sats traversent le monde en une seconde, alors un petit don peut aller loin."
      ],
      more: [
        "Commence près de chez toi : ton église, un voisin dans le besoin, une famille qui traverse une période difficile.",
        "Si ton église n'accepte pas encore les sats, donne à la quête et propose ton aide pour mettre cela en place.",
        "Un don de temps compte : un petit boulot fait pour quelqu'un qui ne peut pas le faire.",
        "Plus loin, certains groupes acceptent directement les sats et disent ce qu'ils en font.",
        "Avant de donner à quelqu'un que tu ne connais pas, demande à un parent de regarder de qui il s'agit.",
        "Donne discrètement, et ne compte pas les mercis."
      ],
      saying: {
        text: "Dieu aime celui qui donne de bon cœur.",
        from: "2 Corinthiens 9:7"
      },
      tryThis: "Choisis une personne ou une cause, et mets de côté pour elle une part de ta prochaine récompense.",
      ask: "Qui a été généreux envers notre famille, et qu'est-ce que cela a représenté pour nous ?",
      links: [
        "Des gens qui rassemblent des sats pour des projets, souvent des écoles et des communautés.",
        "Paie les personnes qui construisent les logiciels libres de Bitcoin."
      ],
      care: "ChipIn ne se porte garant d'aucune cause de cette liste. Renseigne-toi sur chacune avant de donner."
    },
    "what-is-worth-buying": {
      title: "Qu'est-ce qui vaut la peine d'être acheté ?",
      lines: [
        "Achète des choses qui durent, qui instruisent ou qui t'aident à travailler.",
        "Une chose disparue en un jour vaut rarement une semaine de petits boulots.",
        "Avant de dépenser, attends une nuit."
      ],
      more: [
        "Un livre vaut la peine : on peut le relire et le prêter à un ami.",
        "Un outil vaut la peine : il te permet de faire un travail que tu ne pouvais pas faire avant.",
        "Les graines et les animaux valent la peine : ils deviennent de la nourriture, et parfois d'autres sats.",
        "La bonne nourriture vaut la peine, surtout celle d'un fermier que tu connais.",
        "Un cadeau pour quelqu'un d'autre vaut la peine.",
        "Pour chaque chose que tu veux, demande-toi si elle te fera encore plaisir dans un an.",
        "Chaque année, plus de magasins acceptent les sats, et une carte montre ceux qui sont près de chez toi."
      ],
      tryThis: "Repense aux trois dernières choses que tu as voulues, et demande-toi pour chacune si tu la voudrais encore dans un an.",
      ask: "Quel est le meilleur achat que notre famille ait jamais fait, et pourquoi ?",
      links: [
        "Des livres sur l'argent, l'agriculture et la famille, et du café.",
        "Une carte des magasins et des fermes près de chez toi qui acceptent le bitcoin."
      ],
      care: "Une adresse peut ne plus être à jour. Renseigne-toi auprès du magasin avant d'y aller."
    },
    "the-virtues": {
      title: "Les sept vertus",
      lines: [
        "Une vertu est une bonne habitude du cœur.",
        "Les chrétiens en enseignent sept depuis longtemps : trois données par Dieu et quatre que chacun peut pratiquer.",
        "Les petits boulots sont un bon endroit pour s'y exercer."
      ],
      more: [
        "Les trois vertus théologales viennent de la première lettre de saint Paul aux Corinthiens.",
        "Les quatre vertus cardinales ont été nommées par les Grecs et reprises par Ambroise, Augustin et Thomas d'Aquin.",
        "Cardinale vient du mot latin qui veut dire gond : tout le reste d'une vie bonne tourne sur ces quatre-là.",
        "D'autres listes sont enseignées à côté de celles-ci, et elles se ressemblent beaucoup.",
        "Le fruit de l'Esprit, dans Galates 5, nomme l'amour, la joie, la paix, la patience, la bonté, la bienveillance, la fidélité, la douceur et la maîtrise de soi.",
        "Une vertu grandit comme un muscle, en servant un peu chaque jour."
      ],
      points: [
        {
          group: "Théologale",
          name: "Foi",
          says: "Faire confiance à Dieu et à ses promesses."
        },
        {
          group: "Théologale",
          name: "Espérance",
          says: "Attendre de Dieu ce qui est bon, et y travailler."
        },
        {
          group: "Théologale",
          name: "Charité",
          says: "Aimer Dieu et son prochain en donnant de soi-même. Paul dit qu'elle est la plus grande."
        },
        {
          group: "Cardinale",
          name: "Prudence",
          says: "Bien choisir : réfléchir avant de prendre un petit boulot ou de dépenser un sat."
        },
        {
          group: "Cardinale",
          name: "Justice",
          says: "Rendre à chacun ce qui lui est dû : un travail honnête pour un salaire honnête."
        },
        {
          group: "Cardinale",
          name: "Force",
          says: "Finir le travail difficile quand on aimerait mieux s'arrêter."
        },
        {
          group: "Cardinale",
          name: "Tempérance",
          says: "Maîtriser ses envies : épargner quand on pourrait dépenser."
        }
      ],
      saying: {
        text: "Maintenant donc demeurent la foi, l'espérance et la charité, ces trois-là ; mais la plus grande des trois, c'est la charité.",
        from: "1 Corinthiens 13:13"
      },
      tryThis: "Choisis une vertu pour la semaine et remarque chaque fois qu'un petit boulot te la demande.",
      ask: "Laquelle des sept te vient le plus facilement, et laquelle est la plus difficile ?"
    }
  },
  words: [
    {
      word: "Bitcoin",
      means: "Une monnaie qui vit sur Internet et n'appartient à aucune banque ni à aucun pays."
    },
    {
      word: "Sat",
      means: "Le plus petit morceau d'un bitcoin. C'est le petit nom du satoshi."
    },
    {
      word: "Portefeuille",
      means: "L'application qui garde la clé de tes sats."
    },
    {
      word: "Lightning",
      means: "Le moyen rapide d'envoyer des sats d'un portefeuille à un autre."
    },
    {
      word: "Facture",
      means: "Une demande de sats écrite par un portefeuille. Elle commence par « lnbc »."
    },
    {
      word: "npub",
      means: "Ton nom sur ChipIn. Tu peux le partager sans risque."
    },
    {
      word: "nsec",
      means: "Le secret derrière ton npub. Ne le partage jamais."
    },
    {
      word: "Blockchain",
      means: "Le registre de tous les paiements en bitcoin, tenu par des milliers d'ordinateurs à la fois."
    }
  ],
  shelves: {
    money: "Monnaie et marchés",
    farm: "La petite ferme",
    land: "Terre, famille et propriété"
  },
  books: {
    "the-bitcoin-standard": "L'histoire de la monnaie, et pourquoi une quantité fixe compte.",
    "economics-in-one-lesson": "Regarder au-delà d'aujourd'hui, vers ce qu'un choix produit plus tard.",
    "basic-economics": "Comment les prix, le travail et les échanges s'accordent, en mots simples.",
    "the-church-and-the-market": "Un plaidoyer chrétien pour un commerce libre et honnête.",
    "you-can-farm": "Lancer une ferme comme entreprise familiale.",
    "the-market-gardener": "Vivre d'un peu plus d'un demi-hectare.",
    "the-contrary-farmer": "Quelques dizaines d'hectares, cultivés par amour du métier.",
    "dirt-to-soil": "Une famille redonne vie à sa terre.",
    "the-land-was-everything": "Ce que la ferme familiale a donné à un peuple.",
    "whats-wrong-with-the-world": "Le foyer et la famille comme mesure de toute chose.",
    "the-servile-state": "Pourquoi la propriété largement répartie garde les gens libres.",
    "small-is-beautiful": "L'économie à l'échelle des personnes."
  }
};
