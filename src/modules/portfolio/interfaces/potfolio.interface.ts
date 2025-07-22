interface CreatePortfolioRequestBody {
  id: string;
  greeting: string;
  bio: string;
  country: string;
  city: string;
  note: string;
  aboutphrase: string;
  aboutcontent: string;
  skillsphrase: string;
  experiencephrase: string;
  workphrase: string;
  testimonialsphrase: string;
  contactphrase: string;
  copyright: string;
  slogan: string;
  // Optional fields for file uploads
  cvlink?: string;
  profilepicture?: string;
  aboutpicture?: string;
}
