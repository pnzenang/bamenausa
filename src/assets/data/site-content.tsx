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
        'A nonprofit cultural organization preserving Bamena heritage and strengthening diaspora community.',
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
        title: 'Programs',
        href: '#programs'
      },
      {
        title: 'Impact',
        href: '#about-us'
      },
      {
        title: 'Events',
        href: '#initiatives'
      },
      {
        title: 'Members',
        href: '/members'
      },
      {
        title: 'Galery',
        href: '/galery'
      },
      {
        title: 'Contact',
        href: '#contact-us'
      }
    ],
    footer: {
      navigation: [
        {
          title: 'Programs',
          href: '#programs'
        },
        {
          title: 'Impact',
          href: '#about-us'
        },
        {
          title: 'Events',
          href: '#initiatives'
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
          href: '#offers'
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
        'Bamena-USA is a nonprofit home for heritage education, youth mentorship, family connection, and fundraising that turns cultural pride into lasting community impact.',
      donateCta: 'Donate',
      programsCta: 'Explore programs',
      missionEyebrow: 'Our Mission',
      missionItems: [
        {
          title: 'Heritage',
          description: 'Keep language, stories, music, and traditions alive across generations.'
        },
        {
          title: 'Belonging',
          description: 'Create gathering spaces where families, elders, and youth stay connected.'
        },
        {
          title: 'Service',
          description: 'Fund cultural, educational, and community support projects with transparency.'
        }
      ]
    },
    programs: {
      eyebrow: 'Culture Programs',
      title: 'Programs that keep heritage alive',
      description:
        'Bamena-USA creates practical spaces for learning, service, celebration, and intergenerational connection.',
      items: [
        {
          image: '/images/culture/gala-2026/bamena-gala-2026-01.jpg',
          alt: 'Bamena-USA members in traditional attire at the 2026 fundraising gala',
          name: 'Cultural Preservation',
          type: 'Heritage',
          description: 'Storytelling, language, music, and customs shared with dignity across generations.'
        },
        {
          image: '/images/culture/gala-2026/bamena-gala-2026-04.jpg',
          alt: 'Bamena-USA women posing together at the 2026 fundraising gala',
          name: 'Youth Mentorship',
          type: 'Education',
          description: 'Workshops and guidance that help young people know their roots and lead with confidence.'
        },
        {
          image: '/images/culture/gala-2026/bamena-gala-2026-06.jpg',
          alt: 'Community members celebrating at the Bamena Water Project fundraising gala',
          name: 'Community Events',
          type: 'Celebration',
          description: 'Gala nights, family gatherings, and cultural showcases that bring the diaspora together.'
        },
        {
          image: '/images/culture/gala-2026/bamena-gala-2026-10.jpg',
          alt: 'Bamena-USA gala guests gathered in matching cultural attire',
          name: 'Community Support',
          type: 'Service',
          description: 'Volunteer projects, member care, and fundraising that turn generosity into practical help.'
        }
      ]
    },
    about: {
      eyebrow: 'About Us',
      title: 'A nonprofit rooted in culture',
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
          value: '12+',
          description: ['Culture & Youth', 'Programs']
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
      title: 'Gather, learn, and serve together',
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
          blogLink: '#offers'
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
      title: 'Get in touch with us',
      description:
        'Reach out to volunteer, sponsor a program, ask about the gala, or connect your family with Bamena-USA.',
      imageAlt: 'Bamena-USA volunteers welcoming families with community resources',
      secondaryTitle: "We're here to build with you",
      secondaryDescription:
        'Whether you want to donate, volunteer, partner, or learn more about our programs, the Bamena-USA team would love to hear from you.',
      items: [
        {
          title: 'DMV Monthly Meeting',
          icon: Clock8Icon,
          description: 'Third Saturday of the month\n7:00 pm to 9:00 pm'
        },
        {
          title: 'Service Area',
          icon: MapPinIcon,
          description: 'DMV Area\nUnited States'
        },
        {
          title: 'Email',
          icon: Mail,
          description: 'codemenousa@gmail.com'
        },
        {
          title: 'Volunteer Line',
          icon: PhoneIcon,
          description: 'Coming soon\nBoard contact'
        }
      ]
    },
    giving: {
      eyebrow: 'Donate',
      title: 'Fuel culture with generosity',
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
            link: '#contact-us',
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
            link: '#contact-us',
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
      languageToggleLabel: 'View the site in English',
      languageToggleText: 'EN'
    },
    navigation: [
      {
        title: 'Programmes',
        href: '#programs'
      },
      {
        title: 'Impact',
        href: '#about-us'
      },
      {
        title: 'Événements',
        href: '#initiatives'
      },
      {
        title: 'Membres',
        href: '/members'
      },
      {
        title: 'Galerie',
        href: '/galery'
      },
      {
        title: 'Contact',
        href: '#contact-us'
      }
    ],
    footer: {
      navigation: [
        {
          title: 'Programmes',
          href: '#programs'
        },
        {
          title: 'Impact',
          href: '#about-us'
        },
        {
          title: 'Événements',
          href: '#initiatives'
        },
        {
          title: 'Membres',
          href: '/members'
        },
        {
          title: 'Contact',
          href: '#contact-us'
        },
        {
          title: 'Faire un don',
          href: '#offers'
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
        "Bamena-USA est un espace associatif à but non lucratif dédié à l'éducation culturelle, au mentorat des jeunes, aux liens familiaux et aux collectes de fonds qui transforment la fierté culturelle en impact durable pour la communauté.",
      donateCta: 'Faire un don',
      programsCta: 'Découvrir les programmes',
      missionEyebrow: 'Notre mission',
      missionItems: [
        {
          title: 'Héritage',
          description: "Faire vivre la langue, les récits, la musique et les traditions d'une génération à l'autre."
        },
        {
          title: 'Appartenance',
          description: 'Créer des espaces de rassemblement où les familles, les aînés et les jeunes restent connectés.'
        },
        {
          title: 'Service',
          description:
            'Financer avec transparence des projets culturels, éducatifs et communautaires au service de tous.'
        }
      ]
    },
    programs: {
      eyebrow: 'Programmes culturels',
      title: "Des programmes qui gardent l'héritage vivant",
      description:
        'Bamena-USA crée des espaces concrets pour apprendre, servir, célébrer et renforcer les liens entre générations.',
      items: [
        {
          image: '/images/culture/gala-2026/bamena-gala-2026-01.jpg',
          alt: 'Membres de Bamena-USA en tenue traditionnelle au gala de collecte de fonds 2026',
          name: 'Préservation culturelle',
          type: 'Héritage',
          description: 'Récits, langue, musique et coutumes transmis avec dignité entre générations.'
        },
        {
          image: '/images/culture/gala-2026/bamena-gala-2026-04.jpg',
          alt: 'Femmes de Bamena-USA posant ensemble au gala de collecte de fonds 2026',
          name: 'Mentorat des jeunes',
          type: 'Éducation',
          description:
            'Ateliers et accompagnement pour aider les jeunes à connaître leurs racines et à avancer avec confiance.'
        },
        {
          image: '/images/culture/gala-2026/bamena-gala-2026-06.jpg',
          alt: 'Membres de la communauté célébrant au gala de collecte de fonds du projet eau Bamena',
          name: 'Événements communautaires',
          type: 'Célébration',
          description: 'Galas, rencontres familiales et vitrines culturelles qui rassemblent la diaspora.'
        },
        {
          image: '/images/culture/gala-2026/bamena-gala-2026-10.jpg',
          alt: 'Invités de Bamena-USA réunis en tenue culturelle assortie',
          name: 'Soutien communautaire',
          type: 'Service',
          description:
            'Projets bénévoles, accompagnement des membres et collectes de fonds qui transforment la générosité en aide concrète.'
        }
      ]
    },
    about: {
      eyebrow: 'À propos',
      title: 'Une association enracinée dans la culture',
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
          value: '12+',
          description: ['Programmes culturels', 'et jeunesse']
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
      title: 'Se réunir, apprendre et servir ensemble',
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
          blogLink: '#offers'
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
      title: 'Entrer en contact avec nous',
      description:
        'Contactez-nous pour faire du bénévolat, parrainer un programme, poser une question sur le gala ou connecter votre famille à Bamena-USA.',
      imageAlt: 'Bénévoles de Bamena-USA accueillant les familles avec des ressources communautaires',
      secondaryTitle: 'Nous sommes là pour bâtir avec vous',
      secondaryDescription:
        "Que vous souhaitiez faire un don, devenir bénévole, créer un partenariat ou en apprendre davantage sur nos programmes, l'équipe Bamena-USA sera heureuse de vous lire.",
      items: [
        {
          title: 'Réunion mensuelle DMV',
          icon: Clock8Icon,
          description: 'Troisième samedi du mois\n19 h 00 à 21 h 00'
        },
        {
          title: 'Zone de service',
          icon: MapPinIcon,
          description: 'Région DMV\nÉtats-Unis'
        },
        {
          title: 'Email',
          icon: Mail,
          description: 'codemenousa@gmail.com'
        },
        {
          title: 'Ligne bénévolat',
          icon: PhoneIcon,
          description: 'Bientôt disponible\nContact du conseil'
        }
      ]
    },
    giving: {
      eyebrow: 'Don',
      title: 'Nourrir la culture par la générosité',
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
            link: '#contact-us',
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
            link: '#contact-us',
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
