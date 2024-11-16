export interface Reference {
  fullName: string;
  address: string;
  contactNumber: string;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  streetAddress: string;
  streetAddressLine2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  hearAboutUs: string;
  otherSource?: string;
  feedback?: string;
  suggestions?: string;
  willingToRecommend: 'Yes' | 'Maybe' | 'No';
  references: Reference[];
}