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
        noLocation: 'No city/state on file'
      }
    },
    galery: {
      metadata: {
        title: 'Gallery',
        description: 'Bamena-USA community photo gallery.'
      },
      title: 'Bamena-USA Gallery',
      description: 'Bamena-USA was unveiling their new uniform.',
      imageAltPrefix: 'Bamena-USA gallery photo'
    },
    necrology: {
      metadata: {
        title: 'Necrology | Bamena-USA',
        description: 'A forthcoming Bamena-USA memorial page honoring departed community members.'
      },
      badge: 'Necrology',
      title: 'Bamena-USA Necrology',
      description: 'A dedicated place to remember and honor departed members of the Bamena-USA community.',
      placeholderEyebrow: 'Coming soon',
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
        noLocation: 'Aucune ville/État enregistré'
      }
    },
    galery: {
      metadata: {
        title: 'Galerie',
        description: 'Galerie photo de la communauté Bamena-USA.'
      },
      title: 'Galerie Bamena-USA',
      description: 'Bamena-USA dévoilait son nouvel uniforme.',
      imageAltPrefix: 'Photo de la galerie Bamena-USA'
    },
    necrology: {
      metadata: {
        title: 'Nécrologie | Bamena-USA',
        description: 'Une page commémorative Bamena-USA à venir pour honorer les membres disparus.'
      },
      badge: 'Nécrologie',
      title: 'Nécrologie Bamena-USA',
      description: 'Un espace dédié pour se souvenir des membres disparus de la communauté Bamena-USA.',
      placeholderEyebrow: 'Bientôt disponible',
      placeholderTitle: 'Les hommages commémoratifs apparaîtront ici.',
      placeholderDescription:
        'Cette page est en préparation comme espace respectueux de mémoire communautaire. Revenez bientôt pour les mises à jour.'
    }
  }
}
