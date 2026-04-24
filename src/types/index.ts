export type Project = {
  slug:        string;
  title:       string;
  category:    string;
  client:      string;
  year:        number;
  cover:       string;
  video?:      string;
  summary:     string;
  description: string;
  tags:        string[];
  featured:    boolean;
};

export type Service = {
  id:          string;
  title:       string;
  description: string;
};

export type Testimonial = {
  quote:       string;
  author:      string;
  role:        string;
  company:     string;
  photo?:      string;
};
