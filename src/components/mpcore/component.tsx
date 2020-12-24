export interface MPComponentsProps {
    name: string;
    attributes: { [key: string]: any };
    children: MPComponentsProps[];
}
