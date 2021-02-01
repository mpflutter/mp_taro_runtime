export interface MPComponentsProps {
    name: string;
    attributes: { [key: string]: any };
    constraints?: MPConstraints;
    children: MPComponentsProps[];
  }
  
  export interface MPConstraints {
    minWidth: string;
    minHeight: string;
    maxWidth: string;
    maxHeight: string;
    hasTightWidth: boolean;
    hasTightHeight: boolean;
    measuring: boolean;
  }
  