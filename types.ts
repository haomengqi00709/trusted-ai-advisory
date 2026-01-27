
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
