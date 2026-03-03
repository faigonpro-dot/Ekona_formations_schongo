
import React, { useEffect, useState } from 'react';
import { EducationPath } from '../types';
import { getPathDescription } from '../services/gemini';

interface PathInfo {
  introduction: string;
  objectifs: string[];
  debouches: string[];
  pointsForts: string[];
  institution?: string;
  languages?: string[];
  extraSection?: {
    title: string;
    content: string;
  };
}

interface ContentDetailProps {
  path: EducationPath;
  onBack: () => void;
}

const CAP_EPC_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "Le titulaire de ce diplôme assure la réception et le suivi des commandes, la mise en valeur des produits, l'accueil et le conseil client ainsi que l'encaissement.",
  objectifs: [
    "Réception et suivi des commandes : Contrôler la marchandise et gérer les stocks.",
    "Mise en valeur des produits : Approvisionner les rayons et veiller à l'attractivité du point de vente.",
    "Conseil et vente : Accueillir le client, identifier ses besoins et conclure la vente.",
    "Gestion de la caisse : Maîtriser les procédures d'encaissement."
  ],
  debouches: [
    "🎓 42 % poursuivent leurs études.",
    "💼 12 % sont en emploi salarié sous 6 mois.",
    "🌍 46 % s'orientent vers d'autres projets (emploi, étranger, etc.)."
  ],
  pointsForts: [
    "Durée : 2 ans",
    "Diplôme national d'État",
    "Qualification reconnue"
  ]
};

const SECOND_MRC_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "Cette classe permet d'acquérir les bases communes aux métiers du commerce, de la vente et de l'accueil :",
  objectifs: [
    "Accueil et Communication : Apprendre à accueillir les clients et à identifier leurs besoins.",
    "Vente et Conseil : Présenter les caractéristiques des produits et argumenter pour convaincre.",
    "Gestion de la Relation Client : Assurer le suivi des ventes et traiter les demandes ou réclamations.",
    "Environnement Numérique : Utiliser les outils digitaux et logiciels professionnels liés au point de vente."
  ],
  debouches: [
    "• Durée : 1 an (année d'orientation vers un Bac Pro).",
    "• Modalité : Temps plein.",
    "• Validation : Diplôme national ou d'État garantissant une qualification reconnue."
  ],
  pointsForts: [],
  extraSection: {
    title: "🎯 OBJECTIF DE L'ANNÉE",
    content: "Découvrir les différents métiers de la relation client pour choisir sa spécialité en fin d'année (Bac Pro Métiers du Commerce et de la Vente option A ou B , ou Bac Pro métiers de l’Accueil)."
  }
};

const SECOND_GATL_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "Cette année permet d'acquérir les bases communes à trois secteurs clés :",
  objectifs: [
    "Gestion Administrative : Organisation d'activités, gestion du courrier et suivi des dossiers numériques.",
    "Relation Partenaires : Suivi des relations avec les clients, les fournisseurs et les banques (commandes, facturation).",
    "Logistique et Transport : Découverte des flux de marchandises, gestion des stocks et planification simple.",
    "Maîtrise du Numérique : Utilisation intensive des logiciels de bureautique et des outils de gestion professionnelle."
  ],
  debouches: [
    "• Durée : 1 an (année d'orientation vers un Bac Pro).",
    "• Modalité : Temps plein.",
    "• Diplôme : Diplôme national ou d'État, garantissant une qualification reconnue sur tout le territoire."
  ],
  pointsForts: [],
  extraSection: {
    title: "🎯 ORIENTATION",
    content: "À l'issue de cette classe, vous choisirez votre spécialité de Bac Pro parmi les métiers de la gestion-administration, de la logistique ou du transport."
  }
};

const SECOND_AEPA_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "Première étape d'un Bac Pro en 3 ans axé sur la créativité et le lien social. Cette formation s'adresse aux personnes souhaitant travailler avec les enfants et les personnes âgées.",
  objectifs: [
    "Pôle 1 : Autonomie & Lien Social (Seniors) - Concevoir des activités pour maintenir l'autonomie (ateliers mémoire, gym douce, sorties).",
    "Pôle 2 : Épanouissement & Éducation (Jeunesse) - Mettre en place des jeux collectifs, activités d’expression et assurer l'accompagnement scolaire."
  ],
  debouches: [
    "• Stages (PFMP) : 6 semaines de formation en milieu professionnel dès la seconde.",
    "• Lieux : Centres de loisirs, MJC, EHPAD ou accueils de jour."
  ],
  pointsForts: [],
  extraSection: {
    title: "💪 PROFIL RECHERCHÉ",
    content: "Avoir le sens du contact et être dynamique. Aimer organiser des projets (spectacles, ateliers). Faire preuve d'énergie et de patience."
  }
};

const BAC_PRO_MCV_A_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "L'option A se concentre sur l'attractivité du point de vente et la dynamisation de l'offre commerciale.",
  objectifs: [
    "Animation commerciale : Mettre en œuvre des opérations de promotion et d'animation.",
    "Gestion de l'espace : Implanter les produits et optimiser l'aménagement du magasin.",
    "Vente et Conseil : Accueillir le client, argumenter et fidéliser.",
    "Gestion des flux : Suivre les stocks et participer à la gestion des commandes."
  ],
  debouches: [
    "🎓 41 % poursuivent leurs études (BTS, spécialisations).",
    "💼 23 % accèdent directement à un emploi salarié sous 6 mois.",
    "🌍 36 % s'orientent vers d'autres projets (indépendant, étranger, etc.)."
  ],
  pointsForts: [
    "Accès : Après une 2de pro MRC",
    "Durée : 2 ans",
    "Atout : Co-qualification Azubi-Bacpro"
  ],
  extraSection: {
    title: "🌍 ATOUT INTERNATIONAL",
    content: "Possibilité de préparer la co-qualification franco-allemande « Azubi-Bacpro » pour valoriser votre parcours à l'échelle européenne."
  }
};

const BAC_PRO_MCV_B_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "L'option B met l'accent sur la démarche active vers le client et le développement de l'offre commerciale.",
  objectifs: [
    "Prospection : Rechercher de nouveaux clients et identifier leurs besoins.",
    "Négociation : Maîtriser les techniques de vente et savoir argumenter.",
    "Fidélisation : Créer une relation durable et assurer le suivi des ventes.",
    "Valorisation de l'offre : Développer le portefeuille client et promouvoir les produits ou services."
  ],
  debouches: [
    "🎓 41 % poursuivent leurs études (BTS, formations supérieures).",
    "💼 23 % sont en emploi salarié sous 6 mois.",
    "🌍 36 % s'orientent vers d'autres projets (indépendants, étranger, etc.)."
  ],
  pointsForts: [
    "Accès : Après une 2de pro MRC",
    "Durée : 2 ans",
    "Modalité : Temps plein",
    "Atout : Co-qualification Azubi-Bacpro"
  ],
  extraSection: {
    title: "🌍 ATOUT INTERNATIONAL",
    content: "Possibilité de préparer la co-qualification franco-allemande « Azubi-Bacpro » pour valoriser votre parcours à l'échelle européenne."
  }
};

const BAC_PRO_AGORA_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "Le titulaire de ce diplôme assure le soutien administratif aux activités d'une organisation.",
  objectifs: [
    "Gestion des relations avec les clients et fournisseurs : Traitement des commandes et suivi de la facturation.",
    "Gestion administrative du personnel : Suivi des dossiers des salariés et préparation d'éléments de paie.",
    "Support au management : Organisation de réunions, gestion d'agendas et accueil des visiteurs.",
    "Digitalisation : Utilisation experte des outils bureautiques et des logiciels de gestion."
  ],
  debouches: [
    "🎓 67 % poursuivent leurs études (BTS, formations supérieures).",
    "💼 18 % sont en emploi salarié sous 6 mois.",
    "🌍 15 % s'orientent vers d'autres projets (indépendants, étranger, etc.)."
  ],
  pointsForts: [
    "Accès : Après une 2de pro GATL",
    "Durée : 2 ans",
    "Modalité : Temps plein",
    "Qualification : Diplôme national d'État"
  ]
};

const BAC_PRO_AEPA_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "Le titulaire de ce diplôme intervient dans l'animation auprès de publics variés pour favoriser l'épanouissement et le lien social.",
  objectifs: [
    "Animation auprès des enfants : Concevoir et animer des activités éducatives, de loisirs et d'épanouissement.",
    "Animation auprès des personnes âgées : Mettre en place des projets pour favoriser le lien social et maintenir l'autonomie (ateliers mémoire, activités physiques douces).",
    "Méthodologie de projet : Apprendre à préparer, réaliser et évaluer une action d'animation.",
    "Communication : Développer des compétences relationnelles pour interagir avec les publics, les familles et les partenaires."
  ],
  debouches: [
    "💼 40 % accèdent à un emploi salarié sous 6 mois.",
    "🎓 36 % poursuivent leurs études (formations supérieures, spécialisations).",
    "🌍 24 % s'orientent vers d'autres projets (recherche d'emploi, étranger, etc.)."
  ],
  pointsForts: [
    "Parcours : 3 ans après la 3e",
    "Diplôme : Diplôme national ou d'État",
    "Modalité : Formation à temps plein"
  ]
};

const BAC_STMG_GF_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "Cette spécialité s'intéresse au processus de création de la valeur, à la mesure de la performance, à la maîtrise des risques et à l'analyse financière.",
  objectifs: [
    "Analyse de la situation financière : Étudier les bilans et comptes de résultat.",
    "Gestion de la trésorerie : Suivre les flux financiers et assurer la solvabilité.",
    "Calcul des coûts : Déterminer la rentabilité des produits ou services.",
    "Systèmes d'information : Utiliser des logiciels de gestion comptable et financière."
  ],
  debouches: [
    "🎓 BTS (Comptabilité Gestion, Gestion de la PME).",
    "🎓 BUT (Gestion des Entreprises et des Administrations).",
    "🎓 Classes Préparatoires (ECT).",
    "💼 Métiers : Comptable, assistant de gestion, analyste financier junior."
  ],
  pointsForts: [
    "Rigueur et logique",
    "Goût pour les chiffres",
    "Esprit d'analyse"
  ]
};

const BAC_STMG_MERCATIQUE_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "La mercatique (marketing) porte sur la relation entre l'entreprise et ses clients. On y étudie comment l'entreprise adapte son offre aux besoins des consommateurs.",
  objectifs: [
    "Étude de marché : Analyser les besoins et comportements des consommateurs.",
    "Marketing Mix : Définir le produit, le prix, la distribution et la communication.",
    "Fidélisation : Mettre en place des stratégies pour garder ses clients.",
    "Numérique : Utiliser les réseaux sociaux et outils digitaux pour la promotion."
  ],
  debouches: [
    "🎓 BTS (Management Commercial Opérationnel, NDRC).",
    "🎓 BUT (Techniques de Commercialisation).",
    "🎓 Écoles de commerce.",
    "💼 Métiers : Chef de rayon, chargé de clientèle, assistant marketing."
  ],
  pointsForts: [
    "Sens du contact",
    "Créativité",
    "Esprit d'initiative"
  ]
};

const BTS_PI_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "Le programme s'appuie sur 25 heures d'enseignements professionnels par semaine :",
  objectifs: [
    "Gestion de projet immobilier : Prospection, négociation de mandats, commercialisation et suivi financier des ventes ou locations.",
    "Administration de copropriétés : Gestion administrative, comptable et suivi du personnel ou des contentieux.",
    "Conseil en gestion du bâti : Expertise en entretien et rénovation dans le contexte de la transition énergétique.",
    "Environnement juridique et économique : Sécurisation des opérations et analyse du marché immobilier.",
    "Communication et Numérique : Maîtrise de la relation client et des technologies digitales indispensables au secteur."
  ],
  debouches: [
    "🎓 51 % poursuivent leurs études (Licences pro, écoles spécialisées).",
    "💼 26 % accèdent directement à un emploi salarié sous 6 mois.",
    "🏠 Métiers : Agent immobilier, gestionnaire de copropriété, administrateur de biens"
  ],
  pointsForts: [
    "Durée : 2 ans.",
    "Diplôme : Diplôme national d'État, garantissant une qualification reconnue sur l'ensemble du territoire.",
    "Objectif : Former des experts en gestion-administration de biens et en fonctions commerciales immobilières."
  ],
  extraSection: {
    title: "👤 PROFIL RECHERCHÉ",
    content: "Compétences relationnelles et sens de l'écoute. • Capacités d'analyse et d'évaluation de biens. • Aptitude au travail collaboratif et à l'autonomie."
  }
};

const SECTION_EURO_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "Ambition : Viser un niveau proche du bilinguisme et une ouverture internationale.",
  objectifs: [
    "Anglais Renforcé : Développement intensif de la communication orale et écrite.",
    "Adaptabilité : Développer son autonomie et sa capacité à travailler dans un contexte interculturel."
  ],
  debouches: [
    "🎓 VALORISATION DU DIPLÔME : Obtenez l'indication « Section Européenne » sur votre Baccalauréat Professionnel.",
    "✅ Condition : Minimum 12/20 à l'épreuve de langue."
  ],
  pointsForts: [
    "🌟 OBJECTIF : LE BILINGUISME",
    "👥 Public : Ouvert à tous les élèves motivés par l'apprentissage des langues."
  ],
  extraSection: {
    title: "✈️ L'IMMERSION INTERNATIONALE",
    content: "PFMP à l'étranger : 4 semaines de stage en immersion totale dans un pays anglophone (Malte ou Irlande). Organisée chaque année lors de la 2nde PFMP de la classe de 1ère Bac Pro."
  }
};

const ULIS_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "L'objectif est de construire un parcours unique et individualisé pour chaque élève :",
  objectifs: [
    "Maîtrise professionnelle : Acquisition des gestes métiers et des compétences théoriques du diplôme préparé (Commerce, Restauration, etc.).",
    "Autonomie sociale et pro : Développer sa capacité à s'organiser et à s'intégrer dans le monde du travail.",
    "Communication : Apprendre à s'exprimer, à dépasser ses difficultés relationnelles et à interagir avec des collègues ou clients.",
    "Projet d'orientation : Utiliser des outils numériques (comme Folios) pour construire son avenir et ouvrir le champ des possibles."
  ],
  debouches: [
    "🎯 Objectif : Obtenir un diplôme professionnel ou une attestation de compétences.",
    "💼 Débouchés : Accès à l'emploi (milieu ordinaire ou protégé) ou poursuite d'études selon les capacités de chacun."
  ],
  pointsForts: [
    "Un dispositif d'appui : Ce n'est pas une classe mais un dispositif qui soutient la scolarisation d'élèves porteurs de troubles des fonctions cognitives (trisomie, troubles autistiques, troubles « dys », etc.) au sein du lycée professionnel.",
    "Inclusion : Les élèves sont inscrits dans une classe de CAP ou de Bac Pro et rejoignent l'ULIS pour des temps de soutien spécifiques."
  ]
};

const UPE2A_DATA: PathInfo = {
  institution: "Lycée Polyvalent Martin Schongauer (Colmar)",
  introduction: "L'UPE2A est un dispositif d'accompagnement pour les élèves arrivant en France sans maîtrise suffisante de la langue française.",
  objectifs: [
    "Français Langue Seconde (FLS) : Apprendre à communiquer à l'oral comme à l'écrit pour les besoins de la vie quotidienne et scolaire.",
    "Lexique Professionnel : Maîtriser le jargon spécifique des métiers et les consignes scolaires (ex: \"complétez\", \"encadrez\").",
    "Adaptation au système : Comprendre les codes et les habitudes de travail de l'école française."
  ],
  debouches: [],
  pointsForts: [
    "Inclusion rapide : Favoriser l'intégration dans une classe ordinaire de CAP ou de Bac Pro correspondant à l'âge de l'élève.",
    "Réussite scolaire : Maintenir l'élève dans une dynamique de succès tout en apprenant la langue.",
    "Enseignement spécifique : Garantir le droit à une éducation adaptée aux besoins éducatifs particuliers."
  ],
  extraSection: {
    title: "✨ L'INTÉRÊT DE LA SECTION",
    content: "Flexibilité : L'élève ne rejoint le dispositif que pour des périodes définies selon ses besoins (souplesse de l'unité pédagogique). • Parcours sécurisé : Préparation aux diplômes professionnels (CAP, Bac Pro) et aux certifications de langue comme le DELF (A1, A2, B1). • Socialisation : Intégration immédiate avec les autres élèves lors des cours d'EPS, d'arts ou d'atelier professionnel."
  }
};

const ContentDetail: React.FC<ContentDetailProps> = ({ path, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<PathInfo | null>(null);

  useEffect(() => {
    async function loadData() {
      if (path.id === 'cap-epc') {
        setInfo(CAP_EPC_DATA);
        setLoading(false);
        return;
      }
      if (path.id === '2nd-pro-mrc') {
        setInfo(SECOND_MRC_DATA);
        setLoading(false);
        return;
      }
      if (path.id === '2nd-pro-gatl') {
        setInfo(SECOND_GATL_DATA);
        setLoading(false);
        return;
      }
      if (path.id === '2nd-pro-aepa') {
        setInfo(SECOND_AEPA_DATA);
        setLoading(false);
        return;
      }
      if (path.id === 'bac-pro-mcv-a') {
        setInfo(BAC_PRO_MCV_A_DATA);
        setLoading(false);
        return;
      }
      if (path.id === 'bac-pro-mcv-b') {
        setInfo(BAC_PRO_MCV_B_DATA);
        setLoading(false);
        return;
      }
      if (path.id === 'bac-pro-agora') {
        setInfo(BAC_PRO_AGORA_DATA);
        setLoading(false);
        return;
      }
      if (path.id === 'bac-pro-aepa') {
        setInfo(BAC_PRO_AEPA_DATA);
        setLoading(false);
        return;
      }
      if (path.id === 'bac-stmg-gf') {
        setInfo(BAC_STMG_GF_DATA);
        setLoading(false);
        return;
      }
      if (path.id === 'bac-stmg-mercatique') {
        setInfo(BAC_STMG_MERCATIQUE_DATA);
        setLoading(false);
        return;
      }
      if (path.id === 'bts-pi') {
        setInfo(BTS_PI_DATA);
        setLoading(false);
        return;
      }
      if (path.id === 'section-euro') {
        setInfo(SECTION_EURO_DATA);
        setLoading(false);
        return;
      }
      if (path.id === 'ulis') {
        setInfo(ULIS_DATA);
        setLoading(false);
        return;
      }
      if (path.id === 'upe2a') {
        setInfo(UPE2A_DATA);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const data = await getPathDescription(path.title, path.subtitle);
      setInfo(data);
      setLoading(false);
    }
    loadData();
  }, [path]);

  const renderPathHeader = () => {
    let title = path.title;
    let subtitle = path.subtitle;

    if (path.id === 'cap-epc') title = "CAP ÉQUIPIER POLYVALENT DU COMMERCE";
    if (path.id === '2nd-pro-mrc') title = "2nd MRC (Métiers de la Relation Client)";
    if (path.id === '2nd-pro-gatl') title = "2de PRO GATL (Gestion Administrative, du Transport et de la Logistique)";
    if (path.id === '2nd-pro-aepa') title = "2de PRO AEPA (Animation - Enfance et Personnes Âgées)";
    if (path.id === 'bac-pro-mcv-a') title = "BAC PRO MCV Option A (Animation et Gestion de l’Espace Commercial)";
    if (path.id === 'bac-pro-mcv-b') title = "BAC PRO MCV Option B (Prospection Clientèle et Valorisation de l'Offre Commerciale)";
    if (path.id === 'bac-pro-agora') title = "BAC PRO AGORA (Assistance à la Gestion des Organisations et de leurs Activités)";
    if (path.id === 'bac-pro-aepa') title = "BAC PRO AEPA (Animation - Enfance et Personnes Âgées)";
    if (path.id === 'bac-stmg-gf') title = "BAC STMG : GESTION ET FINANCE";
    if (path.id === 'bac-stmg-mercatique') title = "BAC STMG : MERCATIQUE (MARKETING)";
    if (path.id === 'bts-pi') title = "BTS PROFESSIONS IMMOBILIÈRES";
    if (path.id === 'section-euro') title = "SECTION EUROPÉENNE ANGLAIS";
    if (path.id === 'ulis') title = "ULIS PRO";
    if (path.id === 'upe2a') title = "UPE2A";
    
    if (info?.institution) subtitle = info.institution;

    return (
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-tight">
          {title}
        </h1>
        <p className="text-2xl md:text-3xl font-light text-white/80">
          {subtitle}
        </p>
        <div className="h-2 w-32 bg-white rounded-full mx-auto md:mx-0"></div>
      </div>
    );
  };

  const isStaticSecondPro = path.id === '2nd-pro-mrc' || path.id === '2nd-pro-gatl' || path.id === '2nd-pro-aepa';
  const isStaticBacPro = path.id === 'bac-pro-mcv-a' || path.id === 'bac-pro-mcv-b' || path.id === 'bac-pro-agora' || path.id === 'bac-pro-aepa';
  const isStaticBacTech = path.id === 'bac-stmg-gf' || path.id === 'bac-stmg-mercatique';
  const isStaticBts = path.id === 'bts-pi';
  const isStaticSectionEuro = path.id === 'section-euro';
  const isStaticUlis = path.id === 'ulis';
  const isStaticUpe2a = path.id === 'upe2a';
  const isStaticCap = path.id === 'cap-epc';

  return (
    <div className="flex flex-col min-h-full animate-fade-in p-6 md:p-12 text-white bg-black/10">
      <button 
        onClick={onBack}
        className="self-start mb-8 flex items-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/20 text-xl font-bold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Retour
      </button>

      <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
        {renderPathHeader()}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <p className="text-xl animate-pulse">Consultation de l'IA pour les détails...</p>
          </div>
        ) : info ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {(isStaticCap || isStaticBacPro || isStaticBacTech || isStaticBts || isStaticSectionEuro || isStaticUlis || isStaticUpe2a) && (
              <>
                <section className="bg-white/10 p-8 rounded-3xl border border-white/10 col-span-1 md:col-span-2 shadow-inner">
                   <h3 className="text-2xl font-bold mb-4 text-yellow-300 uppercase tracking-wider">
                     {isStaticSectionEuro ? '📋 PRÉSENTATION' : (isStaticUlis ? '📋 QU\'EST-CE QUE L\'ULIS PRO ?' : (isStaticUpe2a ? '📋 MISSION ET OBJECTIFS' : '📋 LA FORMATION'))}
                   </h3>
                   <ul className="space-y-2 text-xl">
                     {isStaticCap ? (
                       <>
                         <li>• Durée : 2 ans.</li>
                         <li>• Diplôme : Diplôme national d'État garantissant une qualification reconnue sur tout le territoire.</li>
                       </>
                     ) : isStaticBacTech ? (
                       <>
                         <li>• Durée : 2 ans (après une classe de 2de générale et technologique).</li>
                         <li>• Diplôme : Baccalauréat Technologique (Série STMG).</li>
                         <li>• Modalité : Temps plein.</li>
                       </>
                     ) : (isStaticBts || isStaticSectionEuro || isStaticUlis || isStaticUpe2a) ? (
                       <>
                         {info.pointsForts.map((point, idx) => (
                           <li key={idx}>• {point}</li>
                         ))}
                       </>
                     ) : (
                       <>
                         {path.id === 'bac-pro-agora' ? (
                           <>
                            <li>• Accès : Se prépare en 2 ans après la 2de professionnelle organisée par famille de métiers (GATL).</li>
                            <li>• Diplôme : Diplôme national ou d'État garantissant une qualification reconnue sur l'ensemble du territoire.</li>
                            <li>• Modalité : Formation à temps plein.</li>
                           </>
                         ) : path.id === 'bac-pro-aepa' ? (
                           <>
                            <li>• Parcours : 3 ans après la 3e.</li>
                            <li>• Diplôme : Diplôme national ou d'État, garantissant une qualification reconnue sur l'ensemble du territoire.</li>
                            <li>• Modalité : Formation à temps plein.</li>
                           </>
                         ) : (
                           <>
                            <li>• Accès : Se prépare en 2 ans après la 2de professionnelle organisée par famille de métiers.</li>
                            <li>• Diplôme : Diplôme national ou d'État garantissant une qualification reconnue par l'État.</li>
                            {info.pointsForts.some(p => p.includes('Temps plein')) && <li>• Modalité : Formation à temps plein.</li>}
                            {info.pointsForts.some(p => p.includes('Azubi')) && (
                              <li>• Atout International : Possibilité de préparer la co-qualification franco-allemande « Azubi-Bacpro ».</li>
                            )}
                           </>
                         )}
                       </>
                     )}
                   </ul>
                </section>
                <section className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-300 uppercase tracking-wider">
                    {path.id === 'bts-pi' ? '🛠️ COMPÉTENCES CLÉS' : (path.id === 'section-euro' ? '🛠️ COMPÉTENCES TRAVAILLÉES' : (path.id === 'ulis' ? '🛠️ COMPÉTENCES TRAVAILLÉES' : (path.id === 'upe2a' ? '🛠️ COMPÉTENCES TRAVAILLÉES' : (path.id === 'bac-pro-aepa' ? '🛠️ LES COMPÉTENCES TRAVAILLÉES' : '🛠️ COMPÉTENCES'))))}
                  </h3>
                  {(isStaticBacPro || isStaticBacTech || isStaticBts || isStaticSectionEuro || isStaticUlis || isStaticUpe2a) && path.id !== 'bac-pro-aepa' && <p className="text-xl mb-4 italic opacity-80">{info.introduction}</p>}
                  {path.id === 'bac-pro-aepa' && <p className="text-xl mb-4 italic opacity-80">Dès la classe de seconde, les élèves commencent à acquérir les bases de l'animation pour deux publics prioritaires :</p>}
                  <ul className="space-y-4">
                    {info.objectifs.map((item, idx) => (
                      <li key={idx} className="flex gap-4 text-xl">
                        <span className="text-white/40">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
                {isStaticBts && info.languages && (
                  <section className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors">
                    <h3 className="text-2xl font-bold mb-6 text-yellow-300 uppercase tracking-wider">🌍 LANGUES VIVANTES</h3>
                    <p className="text-xl mb-4 opacity-80">L'enseignement inclut l'apprentissage et le perfectionnement en :</p>
                    <ul className="space-y-2 text-xl">
                      {info.languages.map((lang, idx) => (
                        <li key={idx}>• {lang}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {info.debouches.length > 0 && (
                  <section className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors">
                    <h3 className="text-2xl font-bold mb-6 text-yellow-300 uppercase tracking-wider">
                      {path.id === 'bts-pi' ? '🚀 QUE DEVIENNENT NOS ÉLÈVES ?' : (path.id === 'section-euro' ? '🎓 VALORISATION DU DIPLÔME' : (path.id === 'ulis' ? '🚀 VERS L\'AVENIR' : (path.id === 'upe2a' ? '🚀 VERS L\'AVENIR' : '🚀 QUE DEVIENNENT NOS DIPLÔMÉS ?')))}
                    </h3>
                    {path.id !== 'section-euro' && path.id !== 'ulis' && path.id !== 'upe2a' && (
                      <p className="text-white/60 mb-4 text-lg italic">
                        {path.id === 'bts-pi' ? '(Données InserJeunes 2024)' : '(Données InserJeunes 2023-2024)'}
                      </p>
                    )}
                    <ul className="space-y-4">
                      {info.debouches.map((item, idx) => (
                        <li key={idx} className="flex gap-4 text-xl">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {info.extraSection && (
                   <section className="bg-white/10 p-10 rounded-3xl border-2 border-white/20 col-span-1 md:col-span-2">
                    <h3 className="text-3xl font-bold mb-6 text-yellow-300 uppercase tracking-wider text-center">
                      {info.extraSection.title}
                    </h3>
                    <p className="text-2xl text-center leading-relaxed">
                      {info.extraSection.content}
                    </p>
                  </section>
                )}
              </>
            )}

            {isStaticSecondPro && (
              <>
                <section className="bg-white/10 p-8 rounded-3xl border border-white/10 col-span-1 md:col-span-2 shadow-inner">
                   <h3 className="text-2xl font-bold mb-4 text-yellow-300 uppercase tracking-wider">
                     {path.id === '2nd-pro-aepa' ? '🌟 UNE FORMATION TOURNÉE VERS L\'HUMAIN' : '📋 LA FORMATION'}
                   </h3>
                   <ul className="space-y-2 text-xl">
                     {info.debouches.map((line, i) => <li key={i}>{line}</li>)}
                   </ul>
                </section>
                <section className="bg-white/5 p-8 rounded-3xl border border-white/5 col-span-1 md:col-span-2 shadow-inner">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-300 uppercase tracking-wider">
                    {path.id === '2nd-pro-aepa' ? '🛠️ COMPÉTENCES PRINCIPALES' : '🛠️ LES COMPÉTENCES TRAVAILLÉES'}
                  </h3>
                  <p className="text-xl mb-6">{info.introduction}</p>
                  <ul className="space-y-4">
                    {info.objectifs.map((item, idx) => (
                      <li key={idx} className="flex gap-4 text-xl">
                        <span className="text-white/40">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
                {info.extraSection && (
                   <section className="bg-white/10 p-10 rounded-3xl border-2 border-white/20 col-span-1 md:col-span-2">
                    <h3 className="text-3xl font-bold mb-6 text-yellow-300 uppercase tracking-wider text-center">
                      {info.extraSection.title}
                    </h3>
                    <p className="text-2xl text-center leading-relaxed">
                      {info.extraSection.content}
                    </p>
                  </section>
                )}
              </>
            )}

            {!isStaticSecondPro && !isStaticBacPro && !isStaticCap && !isStaticBacTech && !isStaticBts && !isStaticSectionEuro && !isStaticUlis && !isStaticUpe2a && (
              <>
                <section className="bg-white/10 p-8 rounded-3xl border border-white/10 col-span-1 md:col-span-2 shadow-inner">
                  <p className="text-2xl md:text-3xl leading-relaxed italic">
                    "{info.introduction}"
                  </p>
                </section>

                <section className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-white text-[#6eae44] rounded-lg text-xl">1</span>
                    Objectifs de la formation
                  </h3>
                  <ul className="space-y-4">
                    {info.objectifs.map((item, idx) => (
                      <li key={idx} className="flex gap-4 text-xl">
                        <span className="text-white/40">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-white text-[#6eae44] rounded-lg text-xl">2</span>
                    Débouchés & Poursuites
                  </h3>
                  <ul className="space-y-4">
                    {info.debouches.map((item, idx) => (
                      <li key={idx} className="flex gap-4 text-xl">
                        <span className="text-white/40">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-white/10 p-10 rounded-3xl border-2 border-white/20 col-span-1 md:col-span-2">
                  <h3 className="text-3xl font-bold mb-8 text-center text-yellow-300">
                    Pourquoi choisir cette voie ?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {info.pointsForts.map((point, idx) => (
                      <div key={idx} className="text-center p-4 bg-black/20 rounded-2xl">
                        <p className="text-xl font-semibold">{point}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-red-500/20 rounded-3xl">
            <p className="text-2xl">Erreur lors de la récupération des données.</p>
            <button onClick={onBack} className="mt-4 underline">Retourner au menu</button>
          </div>
        )}
      </div>

      <footer className="mt-auto py-12 text-center text-white/40 text-lg">
        Touchez l'écran pour naviguer • © Kiosque Orientation
      </footer>
    </div>
  );
};

export default ContentDetail;
