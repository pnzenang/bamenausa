import {
  BookOpenText,
  CalendarDays,
  Clock8Icon,
  HeartHandshake,
  type LucideIcon,
  Mail,
  MapPinIcon,
  PhoneIcon,
  UsersRound
} from 'lucide-react'

import { contactInfo } from './contact-us'

import type { NavigationSection } from '@/components/blocks/menu-navigation'
import type { Locale } from '@/lib/i18n'

type TextLink = {
  title: string
  href: string
}

type Stat = {
  icon: LucideIcon
  value: string
  description: [string, string]
}

type CulturalProgram = {
  image: string
  alt: string
  name: string
  type: string
  description: string
  imageFit?: 'cover' | 'contain'
}

type Initiative = {
  img: string
  alt: string
  title: string
  description: string
  blogLink: string
}

type ContactInfo = {
  title: string
  icon: LucideIcon
  description: string
}

type GalleryImage = {
  src: string
  videoSrc?: string
  alt: string
  className?: string
  offerText: {
    text: string
    className?: string
  }
  offerButton: {
    text: string
    link: string
    className?: string
  }
}

export type SiteContent = {
  metadata: {
    title: string
    description: string
    openGraphDescription: string
    twitterDescription: string
    imageAlt: string
  }
  jsonLd: {
    websiteDescription: string
    organizationDescription: string
    inLanguage: string
  }
  header: {
    loginCta: string
    loginTooltip: string
    menuLabel: string
    languageToggleLabel: string
    languageToggleText: string
  }
  navigation: NavigationSection[]
  footer: {
    navigation: TextLink[]
    nonprofitLabel: string
    copyrightTagline: string
  }
  hero: {
    videoAriaLabel: string
    eyebrow: string
    title: string
    description: string
    donateCta: string
    joinCta: string
    programsCta: string
    missionEyebrow: string
    missionItems: {
      title: string
      description: string
    }[]
  }
  programs: {
    eyebrow: string
    title: string
    description: string
    items: CulturalProgram[]
  }
  about: {
    eyebrow: string
    title: string
    description: string
    cta: string
    imageAlt: string
    stats: Stat[]
  }
  testimonials: {
    eyebrow: string
    titleLines: [string, string]
    description: string
    items: {
      name: string
      avatar: string
      content: string
    }[]
  }
  initiatives: {
    eyebrow: string
    title: string
    description: string
    learnMore: string
    items: Initiative[]
  }
  contact: {
    eyebrow: string
    title: string
    description: string
    imageAlt: string
    secondaryTitle: string
    secondaryDescription: string
    items: ContactInfo[]
  }
  giving: {
    eyebrow: string
    title: string
    description: string
    images: GalleryImage[]
  }
}

const sharedGalleryClasses = {
  preserve: {
    container: 'col-span-2 row-span-2 aspect-[3/4]',
    text: 'xl:top-6 xl:right-6 top-3 right-3',
    button: 'xl:top-19.5 xl:right-6 top-12 right-3'
  },
  youth: {
    container: 'col-span-2 min-h-64 md:min-h-0',
    text: 'xl:bottom-18.5 xl:left-4 bottom-13 left-3',
    button: 'xl:bottom-5 xl:left-4 bottom-2 left-3'
  },
  families: {
    container: 'col-span-2 min-h-64 md:min-h-0',
    text: 'xl:top-5 xl:right-12 top-3 right-3',
    button: 'xl:top-19 xl:right-12 top-11 right-3'
  }
}

export const siteContent: Record<Locale, SiteContent> = {
  en: {
    metadata: {
      title: 'Cultural Nonprofit Organization',
      description:
        'Bamena-USA is a nonprofit cultural organization preserving heritage, connecting families, mentoring youth, and mobilizing community support across the diaspora.',
      openGraphDescription:
        'Preserving Bamena heritage, strengthening families, mentoring youth, and celebrating culture through nonprofit community programs.',
      twitterDescription:
        'A nonprofit cultural organization preserving heritage, connecting families, mentoring youth, and mobilizing community support.',
      imageAlt: 'Bamena-USA cultural community gathering'
    },
    jsonLd: {
      websiteDescription:
        'A nonprofit cultural organization preserving Bamena heritage and strengthening the diaspora community.',
      organizationDescription:
        'Bamena-USA promotes culture, education, community support, and intergenerational connection for Bamena families and friends in the United States.',
      inLanguage: 'en-US'
    },
    header: {
      loginCta: 'Sign in',
      loginTooltip: 'Sign in',
      menuLabel: 'Menu',
      languageToggleLabel: 'Voir le site en français',
      languageToggleText: 'FR'
    },
    navigation: [
      {
        title: 'Impact',
        href: '#about-us'
      },
      {
        title: 'Meetings',
        href: '/meetings'
      },
      {
        title: 'Members',
        href: '/members'
      },
      {
        title: 'Gallery',
        href: '/galery'
      },
      {
        title: 'Donate',
        href: '/donate'
      },
      {
        title: 'Contact',
        href: '#contact-us'
      }
    ],
    footer: {
      navigation: [
        {
          title: 'Impact',
          href: '#about-us'
        },
        {
          title: 'Meetings',
          href: '/meetings'
        },
        {
          title: 'Members',
          href: '/members'
        },
        {
          title: 'Contact',
          href: '#contact-us'
        },
        {
          title: 'Donate',
          href: '/donate'
        }
      ],
      nonprofitLabel: 'A 501(c)(3) organization',
      copyrightTagline: 'Ngon Meno - Ngon Nkougni.'
    },
    hero: {
      videoAriaLabel: 'Bamena fundraising gala preview video',
      eyebrow: 'Bamena USA Gala',
      title: 'Preserving Bamena culture through community, service, and celebration.',
      description:
        'Bamena-USA is a nonprofit organization dedicated to heritage education, youth mentorship, family connection, and fundraising. It turns cultural pride into lasting community impact and brings together people of Bamena descent living in the United States, along with their families and supporters.',
      donateCta: 'Donate',
      joinCta: 'Join us',
      programsCta: 'Explore our achievements',
      missionEyebrow: 'Our Mission',
      missionItems: [
        {
          title: 'Heritage',
          description: 'Keep language, stories, music, and traditions alive across generations in U.S. cities.'
        },
        {
          title: 'Belonging',
          description: 'Create gathering spaces across U.S. cities where families, elders, and youth stay connected.'
        },
        {
          title: 'Service',
          description:
            'Fund cultural, educational, and community support projects, and support one another through strong social programs that serve people of Bamena descent, their families, and sympathizers living in the U.S., so no member of the Bamena community is left behind.'
        }
      ]
    },
    programs: {
      eyebrow: 'Culture Programs',
      title: 'Impacts that keep heritage alive.',
      description:
        'Bamena-USA creates practical spaces for learning, service, celebration, and intergenerational connection.',
      items: [
        {
          image: '/images/realization/Louh.jpg',
          alt: 'Bamena-USA water tower project in Louh',
          name: 'Louh',
          type: 'Water Project',
          description:
            'Helping families benefit from safer water systems built, maintained, and strengthened by community support.'
        },
        {
          image: '/images/realization/Pouzouh.jpg',
          alt: 'Bamena-USA water tower project in Pouzouh',
          name: 'Pouzouh',
          type: 'Water Project',
          description:
            'Investing in water access that helps communities store, protect, and share a dependable local supply.'
        },
        {
          image: '/images/realization/FopLouh.jpg',
          alt: 'Bamena-USA completed water infrastructure project in Fop Louh',
          name: 'FopLouh',
          type: 'Water Project',
          description:
            'Turning community generosity into practical water infrastructure that supports daily life for years to come.'
        }
      ]
    },
    about: {
      eyebrow: 'About Us',
      title: 'A nonprofit rooted in culture.',
      description:
        'Bamena-USA preserves the stories, values, and traditions of Bamena while building a stronger support system for families, youth, elders, and friends of the community.',
      cta: 'Support the mission',
      imageAlt: 'Bamena-USA community members gathered for cultural connection',
      stats: [
        {
          icon: CalendarDays,
          value: '20+',
          description: ['Years of', 'Community Service']
        },
        {
          icon: BookOpenText,
          value: '10+',
          description: ['Realizations', 'in the Village']
        },
        {
          icon: UsersRound,
          value: '500+',
          description: ['Families & Friends', 'Connected']
        },
        {
          icon: HeartHandshake,
          value: '501(c)(3)',
          description: ['Nonprofit', 'Mission']
        }
      ]
    },
    testimonials: {
      eyebrow: 'Community Voices',
      titleLines: ['Culture', 'In Their Words'],
      description: 'Members, volunteers, and families share why cultural preservation and community service matter.',
      items: [
        {
          name: 'Patrice N.',
          avatar: '/images/culture/gala-2026/bamena-gala-2026-07.jpg',
          content:
            'Bamena-USA gives our children a place to hear the stories, songs, and values that shaped us. It feels like a bridge between home and the next generation.'
        },
        {
          name: 'Jean Paul T.',
          avatar: '/images/culture/gala-2026/bamena-gala-2026-08.jpg',
          content:
            'The gala is more than an event. It brings families together, raises support for meaningful projects, and reminds us what we can build when culture leads.'
        },
        {
          name: 'Mariette F.',
          avatar: '/images/culture/gala-2026/bamena-gala-2026-09.jpg',
          content:
            'I joined as a volunteer and found a community. The work is practical, joyful, and rooted in respect for our elders and responsibility to our youth.'
        },
        {
          name: 'Emmanuel K.',
          avatar: '/images/culture/gala-2026/bamena-gala-2026-10.jpg',
          content:
            'Seeing young people ask questions about Bamena heritage is powerful. This organization makes culture feel alive, useful, and shared.'
        }
      ]
    },
    initiatives: {
      eyebrow: 'Events & Initiatives',
      title: 'Gather, learn, and serve together.',
      description:
        'From the annual gala to youth workshops, each initiative helps culture move from memory into daily life.',
      learnMore: 'Learn more',
      items: [
        {
          img: '/images/culture/gala-2026/bamena-gala-2026-06.jpg',
          alt: 'Bamena-USA cultural gala celebration',
          title: 'Annual Cultural Gala',
          description:
            'A flagship fundraising celebration for culture, education, and community projects in the DMV and beyond.',
          blogLink: '#contact-us'
        },
        {
          img: '/images/culture/gala-2026/bamena-gala-2026-08.jpg',
          alt: 'Bamena-USA group portrait in traditional attire at the gala',
          title: 'Youth Heritage Workshops',
          description:
            'Hands-on sessions where young people learn stories, values, language, leadership, and cultural pride.',
          blogLink: '#contact-us'
        },
        {
          img: '/images/culture/gala-2026/bamena-gala-2026-09.jpg',
          alt: 'Bamena-USA community members celebrating at the Bamena Water Project fundraising gala',
          title: 'Member Care & Service',
          description: 'Volunteer-led support for families, elders, students, and cultural preservation efforts.',
          blogLink: '#contact-us'
        }
      ]
    },
    contact: {
      eyebrow: 'Contact Us',
      title: 'Get in touch with us.',
      description:
        'Reach out to volunteer, sponsor a program, ask about the gala, or connect your family with Bamena-USA.',
      imageAlt: 'Bamena-USA volunteers welcoming families with community resources',
      secondaryTitle: "We're here to build with you.",
      secondaryDescription:
        'Whether you want to donate, volunteer, partner, or learn more about our programs, the Bamena-USA team would love to hear from you.',
      items: contactInfo
    },
    giving: {
      eyebrow: 'Donate',
      title: 'Fuel culture with generosity.',
      description:
        'Your support helps fund cultural education, youth mentorship, community care, and gatherings that keep Bamena heritage visible and shared.',
      images: [
        {
          src: '/images/culture/gala-2026/bamena-gala-2026-03.jpg',
          videoSrc: '/videos/congratulatingVideo.mp4',
          alt: 'Bamena-USA gala guests posing in matching cultural attire',
          className: sharedGalleryClasses.preserve.container,
          offerText: {
            text: 'Preserve Culture',
            className: sharedGalleryClasses.preserve.text
          },
          offerButton: {
            text: 'Give today',
            link: '/donate',
            className: sharedGalleryClasses.preserve.button
          }
        },
        {
          src: '/images/culture/gala-2026/bamena-gala-2026-07.jpg',
          alt: 'Three Bamena-USA women standing together at the gala backdrop',
          className: sharedGalleryClasses.youth.container,
          offerText: {
            text: 'Mentor Youth',
            className: sharedGalleryClasses.youth.text
          },
          offerButton: {
            text: 'Volunteer',
            link: '#contact-us',
            className: sharedGalleryClasses.youth.button
          }
        },
        {
          src: '/images/culture/gala-2026/bamena-gala-2026-10.jpg',
          alt: 'Bamena-USA gala guests gathered in matching cultural attire',
          className: sharedGalleryClasses.families.container,
          offerText: {
            text: 'Support Families',
            className: sharedGalleryClasses.families.text
          },
          offerButton: {
            text: 'Get involved',
            link: '/donate',
            className: sharedGalleryClasses.families.button
          }
        }
      ]
    }
  },
  fr: {
    metadata: {
      title: 'Organisation culturelle à but non lucratif',
      description:
        "Bamena-USA est une organisation culturelle à but non lucratif qui préserve l'héritage, relie les familles, accompagne les jeunes et mobilise le soutien communautaire dans la diaspora.",
      openGraphDescription:
        "Préserver l'héritage Bamena, renforcer les familles, accompagner les jeunes et célébrer la culture grâce à des programmes communautaires à but non lucratif.",
      twitterDescription:
        "Une organisation culturelle à but non lucratif qui préserve l'héritage, relie les familles, accompagne les jeunes et mobilise le soutien communautaire.",
      imageAlt: 'Rassemblement culturel communautaire Bamena-USA'
    },
    jsonLd: {
      websiteDescription:
        "Une organisation culturelle à but non lucratif qui préserve l'héritage Bamena et renforce la communauté de la diaspora.",
      organizationDescription:
        "Bamena-USA promeut la culture, l'éducation, le soutien communautaire et les liens entre générations pour les familles et amis de Bamena aux États-Unis.",
      inLanguage: 'fr-FR'
    },
    header: {
      loginCta: 'Connexion',
      loginTooltip: 'Connexion',
      menuLabel: 'Menu',
      languageToggleLabel: 'Voir le site en anglais',
      languageToggleText: 'EN'
    },
    navigation: [
      {
        title: 'Impact',
        href: '#about-us'
      },
      {
        title: 'Réunions',
        href: '/fr/meetings'
      },
      {
        title: 'Membres',
        href: '/fr/members'
      },
      {
        title: 'Galerie',
        href: '/fr/galery'
      },
      {
        title: 'Faire un don',
        href: '/fr/donate'
      },
      {
        title: 'Contact',
        href: '#contact-us'
      }
    ],
    footer: {
      navigation: [
        {
          title: 'Impact',
          href: '#about-us'
        },
        {
          title: 'Réunions',
          href: '/fr/meetings'
        },
        {
          title: 'Membres',
          href: '/fr/members'
        },
        {
          title: 'Contact',
          href: '#contact-us'
        },
        {
          title: 'Faire un don',
          href: '/fr/donate'
        }
      ],
      nonprofitLabel: 'Une organisation 501(c)(3)',
      copyrightTagline: 'Ngon Meno - Ngon Nkougni.'
    },
    hero: {
      videoAriaLabel: "Vidéo d'aperçu du gala de collecte de fonds Bamena",
      eyebrow: 'Gala Bamena USA',
      title: 'Préserver la culture Bamena par la communauté, le service et la célébration.',
      description:
        "Bamena-USA est une association à but non lucratif dédiée à l'éducation culturelle, au mentorat des jeunes, au renforcement des liens familiaux et aux collectes de fonds. Elle transforme la fierté culturelle en impact durable pour la communauté et rassemble les personnes originaires de Bamena vivant aux États-Unis, ainsi que leurs familles et leurs sympathisants.",
      donateCta: 'Faire un don',
      joinCta: 'Nous rejoindre',
      programsCta: 'Découvrir nos réalisations',
      missionEyebrow: 'Notre mission',
      missionItems: [
        {
          title: 'Héritage',
          description:
            "Faire vivre la langue, les récits, la musique et les traditions d'une génération à l'autre et dans les villes des États-Unis."
        },
        {
          title: 'Appartenance',
          description:
            'Créer des espaces de rassemblement où les familles, les aînés et les jeunes restent connectés dans les villes des États-Unis.'
        },
        {
          title: 'Service',
          description:
            "Financer des projets culturels, éducatifs et communautaires, et nous soutenir mutuellement grâce à des programmes sociaux solides au service des personnes originaires de Bamena, de leurs familles et de leurs sympathisants vivant aux États-Unis, afin qu'aucun membre de la communauté ne soit laissé de côté."
        }
      ]
    },
    programs: {
      eyebrow: 'Programmes culturels',
      title: "Des actions qui gardent l'héritage vivant.",
      description:
        'Bamena-USA crée des espaces concrets pour apprendre, servir, célébrer et renforcer les liens entre générations.',
      items: [
        {
          image: '/images/realization/Louh.jpg',
          alt: "Projet de château d'eau Bamena-USA à Louh",
          name: 'Louh',
          type: "Projet d'eau",
          description:
            "Aider les familles à bénéficier de systèmes d'eau plus sûrs, construits, entretenus et renforcés par le soutien communautaire."
        },
        {
          image: '/images/realization/Pouzouh.jpg',
          alt: "Projet de château d'eau Bamena-USA à Pouzouh",
          name: 'Pouzouh',
          type: "Projet d'eau",
          description:
            "Investir dans l'accès à l'eau afin d'aider les communautés à stocker, protéger et partager une ressource locale fiable."
        },
        {
          image: '/images/realization/FopLouh.jpg',
          alt: "Projet d'infrastructure d'eau Bamena-USA achevé à Fop Louh",
          name: 'FopLouh',
          type: "Projet d'eau",
          description:
            "Transformer la générosité communautaire en infrastructures d'eau concrètes qui soutiennent la vie quotidienne pendant des années."
        }
      ]
    },
    about: {
      eyebrow: 'À propos',
      title: 'Une association enracinée dans la culture.',
      description:
        'Bamena-USA préserve les récits, les valeurs et les traditions de Bamena tout en renforçant un réseau de soutien pour les familles, les jeunes, les aînés et les amis de la communauté.',
      cta: 'Soutenir la mission',
      imageAlt: 'Membres de Bamena-USA réunis pour un moment de connexion culturelle',
      stats: [
        {
          icon: CalendarDays,
          value: '20+',
          description: ['Années de', 'service communautaire']
        },
        {
          icon: BookOpenText,
          value: '10+',
          description: ['Réalisations', 'au village']
        },
        {
          icon: UsersRound,
          value: '500+',
          description: ['Familles et amis', 'connectés']
        },
        {
          icon: HeartHandshake,
          value: '501(c)(3)',
          description: ['Mission', 'à but non lucratif']
        }
      ]
    },
    testimonials: {
      eyebrow: 'Voix de la communauté',
      titleLines: ['La culture', 'en leurs mots'],
      description:
        'Des membres, bénévoles et familles expliquent pourquoi la préservation culturelle et le service communautaire comptent.',
      items: [
        {
          name: 'Patrice N.',
          avatar: '/images/culture/gala-2026/bamena-gala-2026-07.jpg',
          content:
            "Bamena-USA donne à nos enfants un lieu où entendre les histoires, les chants et les valeurs qui nous ont façonnés. C'est comme un pont entre le pays et la prochaine génération."
        },
        {
          name: 'Jean Paul T.',
          avatar: '/images/culture/gala-2026/bamena-gala-2026-08.jpg',
          content:
            "Le gala est plus qu'un événement. Il rassemble les familles, soutient des projets utiles et nous rappelle ce que nous pouvons bâtir quand la culture guide nos actions."
        },
        {
          name: 'Mariette F.',
          avatar: '/images/culture/gala-2026/bamena-gala-2026-09.jpg',
          content:
            "Je suis venue comme bénévole et j'ai trouvé une communauté. Le travail est concret, joyeux et enraciné dans le respect de nos aînés et la responsabilité envers nos jeunes."
        },
        {
          name: 'Emmanuel K.',
          avatar: '/images/culture/gala-2026/bamena-gala-2026-10.jpg',
          content:
            "Voir les jeunes poser des questions sur l'héritage Bamena est puissant. Cette organisation rend la culture vivante, utile et partagée."
        }
      ]
    },
    initiatives: {
      eyebrow: 'Événements et initiatives',
      title: 'Se réunir, apprendre et servir ensemble.',
      description:
        'Du gala annuel aux ateliers jeunesse, chaque initiative aide la culture à passer de la mémoire à la vie quotidienne.',
      learnMore: 'En savoir plus',
      items: [
        {
          img: '/images/culture/gala-2026/bamena-gala-2026-06.jpg',
          alt: 'Célébration du gala culturel Bamena-USA',
          title: 'Gala culturel annuel',
          description:
            "Une célébration phare de collecte de fonds pour la culture, l'éducation et les projets communautaires dans la région DMV et au-delà.",
          blogLink: '#contact-us'
        },
        {
          img: '/images/culture/gala-2026/bamena-gala-2026-08.jpg',
          alt: 'Portrait de groupe Bamena-USA en tenue traditionnelle au gala',
          title: "Ateliers jeunesse sur l'héritage",
          description:
            'Des séances pratiques où les jeunes découvrent les récits, les valeurs, la langue, le leadership et la fierté culturelle.',
          blogLink: '#contact-us'
        },
        {
          img: '/images/culture/gala-2026/bamena-gala-2026-09.jpg',
          alt: 'Membres de Bamena-USA célébrant au gala de collecte de fonds du projet eau Bamena',
          title: 'Accompagnement des membres et service',
          description:
            'Un soutien mené par des bénévoles pour les familles, les aînés, les étudiants et les efforts de préservation culturelle.',
          blogLink: '#contact-us'
        }
      ]
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Contactez-nous.',
      description:
        'Contactez-nous pour faire du bénévolat, parrainer un programme, poser une question sur le gala ou mettre votre famille en relation avec Bamena-USA.',
      imageAlt: 'Bénévoles de Bamena-USA accueillant les familles avec des ressources communautaires',
      secondaryTitle: 'Nous sommes là pour bâtir avec vous.',
      secondaryDescription:
        "Que vous souhaitiez faire un don, devenir bénévole, créer un partenariat ou en apprendre davantage sur nos programmes, l'équipe Bamena-USA sera heureuse de vous lire.",
      items: [
        {
          title: 'Réunion mensuelle DMV',
          icon: Clock8Icon,
          description: 'Troisième samedi du mois.\n19 h 00 à 21 h 00'
        },
        {
          title: 'Région DMV',
          icon: MapPinIcon,
          description: '5020 Sunnyside Ave\nBeltsville, MD 20705'
        },
        {
          title: 'Email',
          icon: Mail,
          description: 'codemenousa@gmail.com'
        },
        {
          title: 'Ligne bénévolat',
          icon: PhoneIcon,
          description: 'Bientôt disponible.\nContact du conseil.'
        }
      ]
    },
    giving: {
      eyebrow: 'Don',
      title: 'Nourrir la culture par la générosité.',
      description:
        "Votre soutien finance l'éducation culturelle, le mentorat des jeunes, l'entraide communautaire et les rassemblements qui gardent l'héritage Bamena visible et partagé.",
      images: [
        {
          src: '/images/culture/gala-2026/bamena-gala-2026-03.jpg',
          videoSrc: '/videos/congratulatingVideo.mp4',
          alt: 'Invités de Bamena-USA posant en tenue culturelle assortie',
          className: sharedGalleryClasses.preserve.container,
          offerText: {
            text: 'Préserver la culture',
            className: sharedGalleryClasses.preserve.text
          },
          offerButton: {
            text: "Donner aujourd'hui",
            link: '/fr/donate',
            className: sharedGalleryClasses.preserve.button
          }
        },
        {
          src: '/images/culture/gala-2026/bamena-gala-2026-07.jpg',
          alt: 'Trois femmes de Bamena-USA ensemble devant le décor du gala',
          className: sharedGalleryClasses.youth.container,
          offerText: {
            text: 'Encadrer les jeunes',
            className: sharedGalleryClasses.youth.text
          },
          offerButton: {
            text: 'Devenir bénévole',
            link: '#contact-us',
            className: sharedGalleryClasses.youth.button
          }
        },
        {
          src: '/images/culture/gala-2026/bamena-gala-2026-10.jpg',
          alt: 'Invités de Bamena-USA réunis en tenue culturelle assortie',
          className: sharedGalleryClasses.families.container,
          offerText: {
            text: 'Soutenir les familles',
            className: sharedGalleryClasses.families.text
          },
          offerButton: {
            text: 'Participer',
            link: '/fr/donate',
            className: sharedGalleryClasses.families.button
          }
        }
      ]
    }
  }
}

export const getSiteContent = (locale: Locale) => {
  return siteContent[locale]
}
