export interface IOrganization {
    id?: string;
    created?: string | Date;
    updated?: string | Date;
    users?: IUser[];
}

export interface IUser {
    email: string;
    name?: string;
}

export interface IProduct {
    id?: string;
    created?: string | Date;
    updated?: string | Date;
    name: string;
    orgId?: string;
    pricingModel: TPricingModels;
    price: number;
    size: ISize;
    adserverId?: string;
    access?: { [path in TProductAccess]?: boolean };
    tags?: string[];
    archived?: boolean;
}

export interface ISize {
    width: number;
    height: number;
}

export const PricingModels = ['CPM', 'CPC', 'CPD'];

export const constPricingModels = ['CPM', 'CPC', 'CPD'] as const;

export type TPricingModels = typeof constPricingModels[number];

export const ProductAccess = ['BUYER', 'AGENCY', 'SALES'];

export const constProductAccess = ['BUYER', 'AGENCY', 'SALES'] as const;

export type TProductAccess = typeof constProductAccess[number];
