import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: String;

  // Header Section
  @Column()
  cvLink: string;

  // Hero Section
  @Column()
  profilePicture: string;

  @Column()
  greeting: string;

  @Column()
  bio: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  note: string;

  @Column('jsonb') // Store social media links as JSON
  socialMedia: { icon: string; link: string }[];

  // About Section
  @Column()
  aboutPhrase: string;

  @Column()
  aboutPicture: string;

  @Column('text')
  aboutContent: string;

  // Skills Section
  @Column()
  skillsPhrase: string;

  @Column('jsonb') // Store technologies as JSON
  technologies: { logo: string; name: string }[];

  // Experience Section
  @Column()
  experiencePhrase: string;

  @Column('jsonb') // Store experiences as JSON
  experiences: {
    companyLogo: string;
    companyName: string;
    content: string;
    dateStart: string;
    dateEnd: string;
  }[];

  // Work Section
  @Column()
  workPhrase: string;

  @Column('jsonb') // Store projects as JSON
  projects: {
    images: string[];
    projectName: string;
    description: string[];
    technologies: string[];
    links: { icon: string; link: string }[];
  }[];

  // Testimonials Section
  @Column()
  testimonialsPhrase: string;

  @Column('jsonb') // Store testimonials as JSON
  testimonials: {
    personPhoto: string;
    personName: string;
    testimonial: string;
    websiteLink: string;
  }[];

  // Contact Section
  @Column()
  contactPhrase: string;

  @Column('jsonb') // Store contact form as JSON
  contactForm: {
    name: string;
    email: string;
    message: string;
    textButton: string;
  };

  // Bio Section
  @Column()
  copyright: string;

  @Column()
  slogan: string;
}
