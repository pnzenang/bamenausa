import type { MemberDirectoryListLabels } from '@/components/members/member-directory-list'

import type { Locale } from '@/lib/i18n'

type PublicPageMetadata = {
  title: string
  description: string
}

type PublicMembersContent = {
  metadata: PublicPageMetadata
  badge: string
  title: string
  unavailableMessage: string
  loadingLabel: string
  directoryLabels: MemberDirectoryListLabels
}

type PublicGaleryContent = {
  metadata: PublicPageMetadata
  title: string
  description: string
  imageAltPrefix: string
}

type PublicMeetingsContent = {
  metadata: PublicPageMetadata
  badge: string
  title: string
  description: string
  stateSectionTitle: string
  stateSectionDescription: string
  statusLabel: string
  contactLabel: string
  states: {
    name: string
    region: string
    description: string
    href?: string
  }[]
}

type PublicNecrologyContent = {
  metadata: PublicPageMetadata
  badge: string
  title: string
  description: string
  placeholderEyebrow: string
  placeholderTitle: string
  placeholderDescription: string
}

export const publicPageContent: Record<
  Locale,
  {
    members: PublicMembersContent
    galery: PublicGaleryContent
    meetings: PublicMeetingsContent
    necrology: PublicNecrologyContent
  }
> = {
  en: {
    members: {
      metadata: {
        title: 'Bamena-USA Members',
        description: 'Browse public Bamena-USA member profiles.'
      },
      badge: 'Members',
      title: 'Bamena-USA Members',
      unavailableMessage: 'The member directory is temporarily unavailable.',
      loadingLabel: 'Loading members',
      directoryLabels: {
        filterBar: {
          nameLabel: 'Name',
          searchNamePlaceholder: 'Search name',
          clearNameSearch: 'Clear name search',
          quartierLabel: 'Quartier',
          allQuartiers: 'All quartiers',
          stateLabel: 'State',
          allStates: 'All states'
        },
        directoryTitle: 'Directory',
        memberSingularFound: 'member found',
        memberPluralFound: 'members found',
        noProfiles: 'No member profiles saved yet.',
        noMatches: 'No members match those filters.',
        membersPerPage: 'Members per page',
        showing: 'Showing',
        of: 'of',
        previous: 'Previous',
        next: 'Next',
        goToPage: 'Go to page',
        from: 'From',
        livesIn: 'Lives in',
        noEmail: 'No email on file',
        noTelephone: 'No telephone on file',
        noQuarter: 'No quarter on file',
        noState: 'No state on file',
        noLocation: 'No city or state on file'
      }
    },
    galery: {
      metadata: {
        title: 'Gallery',
        description: 'Bamena-USA community photo gallery.'
      },
      title: 'Bamena-USA Gallery',
      description: 'Bamena-USA unveiled its new uniform.',
      imageAltPrefix: 'Bamena-USA gallery photo'
    },
    meetings: {
      metadata: {
        title: 'Meetings | Bamena-USA',
        description: 'Find Bamena-USA meeting information organized by state community.'
      },
      badge: 'Meetings',
      title: 'Bamena-USA Meetings',
      description: 'A simple place to find meeting information by state as Bamena-USA local groups organize.',
      stateSectionTitle: 'Meeting states',
      stateSectionDescription:
        'Choose a state community below. Schedules, hosts, and location information can be added as each group confirms its meeting plan.',
      statusLabel: 'Information coming soon',
      contactLabel: 'Contact the community team for current meeting information.',
      states: [
        {
          name: 'Maryland',
          region: 'Mid-Atlantic',
          description: 'A meeting hub for members around Maryland and nearby communities.',
          href: '/meetings/maryland'
        },
        {
          name: 'Virginia',
          region: 'Mid-Atlantic',
          description: 'A state group for families and members gathering across Virginia.',
          href: '/meetings/maryland'
        },
        {
          name: 'District of Columbia',
          region: 'DMV area',
          description: 'A central meeting area for members in and around Washington, DC.',
          href: '/meetings/maryland'
        },
        {
          name: 'Georgia',
          region: 'Southeast',
          description: 'A meeting point for Bamena-USA members living across Georgia.'
        },
        {
          name: 'Texas',
          region: 'South Central',
          description: 'A state community for members coordinating gatherings across Texas.'
        },
        {
          name: 'California',
          region: 'West Coast',
          description: 'A meeting group for members and families throughout California.'
        },
        {
          name: 'New York',
          region: 'Northeast',
          description: 'A meeting area for members in New York and nearby states.'
        },
        {
          name: 'Illinois',
          region: 'Midwest',
          description: 'A meeting group for Bamena-USA members and families across Illinois.'
        },
        {
          name: 'Ohio',
          region: 'Midwest',
          description: 'A meeting group for members and families coordinating across Ohio.'
        },
        {
          name: 'Indiana',
          region: 'Midwest',
          description: 'A state community for Bamena-USA members connecting in Indiana.'
        },
        {
          name: 'Michigan',
          region: 'Midwest',
          description: 'A meeting area for members and families gathering throughout Michigan.'
        },
        {
          name: 'North Carolina',
          region: 'Southeast',
          description: 'A state group for members connecting across North Carolina.'
        }
      ]
    },
    necrology: {
      metadata: {
        title: 'Necrology | Bamena-USA',
        description: 'A forthcoming Bamena-USA memorial page honoring departed community members.'
      },
      badge: 'Necrology',
      title: 'Bamena-USA Necrology',
      description: 'A dedicated place to remember and honor departed members of the Bamena-USA community.',
      placeholderEyebrow: 'Coming soon.',
      placeholderTitle: 'Memorial listings will appear here.',
      placeholderDescription:
        'This page is being prepared as a respectful space for community remembrance. Please check back soon for updates.'
    }
  },
  fr: {
    members: {
      metadata: {
        title: 'Membres Bamena-USA',
        description: 'Consultez les profils publics des membres de Bamena-USA.'
      },
      badge: 'Membres',
      title: 'Membres Bamena-USA',
      unavailableMessage: 'Le répertoire des membres est temporairement indisponible.',
      loadingLabel: 'Chargement des membres',
      directoryLabels: {
        filterBar: {
          nameLabel: 'Nom',
          searchNamePlaceholder: 'Rechercher un nom',
          clearNameSearch: 'Effacer la recherche par nom',
          quartierLabel: 'Quartier',
          allQuartiers: 'Tous les quartiers',
          stateLabel: 'État',
          allStates: 'Tous les États'
        },
        directoryTitle: 'Répertoire',
        memberSingularFound: 'membre trouvé',
        memberPluralFound: 'membres trouvés',
        noProfiles: "Aucun profil de membre n'a encore été enregistré.",
        noMatches: 'Aucun membre ne correspond à ces filtres.',
        membersPerPage: 'Membres par page',
        showing: 'Affichage',
        of: 'sur',
        previous: 'Précédent',
        next: 'Suivant',
        goToPage: 'Aller à la page',
        from: 'De',
        livesIn: 'Vit à',
        noEmail: 'Aucun courriel enregistré',
        noTelephone: 'Aucun téléphone enregistré',
        noQuarter: 'Aucun quartier enregistré',
        noState: 'Aucun État enregistré',
        noLocation: 'Aucune ville ni aucun État enregistré'
      }
    },
    galery: {
      metadata: {
        title: 'Galerie',
        description: 'Galerie de photos de la communauté Bamena-USA.'
      },
      title: 'Galerie Bamena-USA',
      description: 'Bamena-USA a dévoilé son nouvel uniforme.',
      imageAltPrefix: 'Photo de la galerie Bamena-USA'
    },
    meetings: {
      metadata: {
        title: 'Réunions | Bamena-USA',
        description: 'Trouvez les informations des réunions Bamena-USA organisées par communauté d’État.'
      },
      badge: 'Réunions',
      title: 'Réunions Bamena-USA',
      description:
        'Un espace simple pour trouver les informations de réunion par État lorsque les groupes locaux Bamena-USA s’organisent.',
      stateSectionTitle: 'Réunions par État',
      stateSectionDescription:
        'Choisissez une communauté d’État ci-dessous. Les horaires, les responsables et les lieux pourront être ajoutés à mesure que chaque groupe confirme son plan de réunion.',
      statusLabel: 'Informations à venir',
      contactLabel: "Contactez l'équipe communautaire pour les informations actuelles sur les réunions.",
      states: [
        {
          name: 'Maryland',
          region: 'Moyen-Atlantique',
          description: 'Un point de réunion pour les membres du Maryland et des communautés voisines.',
          href: '/fr/meetings/maryland'
        },
        {
          name: 'Virginie',
          region: 'Moyen-Atlantique',
          description: 'Un groupe d’État pour les familles et membres qui se réunissent en Virginie.',
          href: '/fr/meetings/maryland'
        },
        {
          name: 'District de Columbia',
          region: 'Zone DMV',
          description: 'Une zone centrale de réunion pour les membres autour de Washington, DC.',
          href: '/fr/meetings/maryland'
        },
        {
          name: 'Géorgie',
          region: 'Sud-Est',
          description: 'Un point de rencontre pour les membres Bamena-USA vivant en Géorgie.'
        },
        {
          name: 'Texas',
          region: 'Centre-Sud',
          description: 'Une communauté d’État pour coordonner les réunions au Texas.'
        },
        {
          name: 'Californie',
          region: 'Côte Ouest',
          description: 'Un groupe de réunion pour les membres et familles en Californie.'
        },
        {
          name: 'New York',
          region: 'Nord-Est',
          description: 'Une zone de réunion pour les membres de New York et des États voisins.'
        },
        {
          name: 'Illinois',
          region: 'Centre-Ouest',
          description: 'Un groupe de réunion pour les membres et familles Bamena-USA en Illinois.'
        },
        {
          name: 'Ohio',
          region: 'Centre-Ouest',
          description: 'Un groupe de réunion pour les membres et familles qui s’organisent en Ohio.'
        },
        {
          name: 'Indiana',
          region: 'Centre-Ouest',
          description: 'Une communauté d’État pour les membres Bamena-USA qui se connectent en Indiana.'
        },
        {
          name: 'Michigan',
          region: 'Centre-Ouest',
          description: 'Une zone de réunion pour les membres et familles qui se réunissent au Michigan.'
        },
        {
          name: 'Caroline du Nord',
          region: 'Sud-Est',
          description: 'Un groupe d’État pour les membres qui se connectent en Caroline du Nord.'
        }
      ]
    },
    necrology: {
      metadata: {
        title: 'Nécrologie | Bamena-USA',
        description: 'Une page commémorative Bamena-USA à venir pour honorer les membres disparus.'
      },
      badge: 'Nécrologie',
      title: 'Nécrologie Bamena-USA',
      description: 'Un espace dédié pour se souvenir des membres disparus de la communauté Bamena-USA.',
      placeholderEyebrow: 'Bientôt disponible.',
      placeholderTitle: 'Les hommages commémoratifs apparaîtront ici.',
      placeholderDescription:
        'Cette page est en préparation comme espace respectueux de mémoire communautaire. Revenez bientôt pour les mises à jour.'
    }
  }
}
