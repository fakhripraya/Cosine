// types/catalogue.ts
export interface CatalogueData {
  productName: string;
  productCategory: string;
  productCatalogue: string;
  productDescription: string;
  productHashtag: string;
  productCondition: string;
  productWeight: string;
  productWeightUnit: string;
  productPrice: string;
  productSKU: string;
  productStocks: string;
  productSafetyStocks: string;
  productUOM: string;
  courierChoosen: (string | null)[];
}

export interface FetchedDatas {
  datas: {
    catalogues: any;
    categories: any;
    couriers: any;
    productUOM: any;
  };
  dropdowns: {
    catalogues: string[];
    categories: string[];
    couriers: string[];
    productUOM: string[];
  };
}

export interface UploadFile {
  blob: Blob;
  name: string;
}