
import { EducationPath } from './types';

export const APP_COLOR = '#6eae44';
export const LOGO_URL = 'https://i.imgur.com/ksZMV4U.png';

export const EDUCATION_PATHS: EducationPath[] = [
  {
    id: 'cap-epc',
    title: 'CAP EPC',
    subtitle: 'Équipier Polyvalent du Commerce'
  },
  {
    id: '2nd-pro',
    title: 'Les 2nd Professionnelles',
    subtitle: 'MRC, GATL, AEPA',
    subPaths: [
      {
        id: '2nd-pro-mrc',
        title: '2nd MRC',
        subtitle: 'Métiers de la Relation Client'
      },
      {
        id: '2nd-pro-gatl',
        title: '2nd GATL',
        subtitle: 'Gestion-Administration, Transport, Logistique'
      },
      {
        id: '2nd-pro-aepa',
        title: '2nd AEPA',
        subtitle: 'Animation et Enfance et Personnes Âgées'
      }
    ]
  },
  {
    id: 'bac-pro',
    title: 'Les Bacs Professionnels',
    subtitle: 'MCV A & B, AGORA, AEPA, Métiers de l’Accueil',
    subPaths: [
      {
        id: 'bac-pro-mcv-a',
        title: 'Bac Pro MCV A',
        subtitle: 'Métiers du Commerce et de la Vente - Option A'
      },
      {
        id: 'bac-pro-mcv-b',
        title: 'Bac Pro MCV B',
        subtitle: 'Métiers du Commerce et de la Vente - Option B'
      },
      {
        id: 'bac-pro-agora',
        title: 'Bac Pro AGORA',
        subtitle: 'Assistance à la Gestion des Organisations et de leurs Activités'
      },
      {
        id: 'bac-pro-aepa',
        title: 'Bac Pro AEPA',
        subtitle: 'Animation - Enfance et Personnes Âgées'
      },
      {
        id: 'bac-pro-accueil',
        title: 'Bac Pro Accueil',
        subtitle: 'Métiers de l’Accueil'
      }
    ]
  },
  {
    id: 'bac-tech',
    title: 'Les Bac Technologiques',
    subtitle: 'STMG : Mercatique & Gestion et Finance',
    subPaths: [
      {
        id: 'bac-stmg-gf',
        title: 'Bac STMG : Gestion et Finance',
        subtitle: 'Spécialité Gestion et Finance'
      },
      {
        id: 'bac-stmg-mercatique',
        title: 'Bac STMG : Mercatique',
        subtitle: 'Spécialité Marketing'
      }
    ]
  },
  {
    id: 'bts-pi',
    title: 'Le BTS PI',
    subtitle: 'Professions Immobilières'
  },
  {
    id: 'section-euro',
    title: 'Section européenne',
    subtitle: 'De lycée professionnel'
  },
  {
    id: 'ulis',
    title: 'ULIS',
    subtitle: "Unité Localisée pour l'Inclusion Scolaire"
  },
  {
    id: 'upe2a',
    title: 'UPE2A',
    subtitle: 'Unité Pédagogique pour Élèves Allophones Arrivants'
  }
];
