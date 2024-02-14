export interface ICustomer {
    customerId: number;
    customerName: string;
    customerEmail: string;
    paymentMethodCode: string;
    customerPhone: number;
    paymentDetail:string;
    otherPaymentDetail:string;
    customerAddresses:IcustomerAddresses[]
}
export interface IcustomerAddresses {
    address_id: number;
    address_type_code: string;
    customerId: number;
    date_from: string;
    date_to: string;
    addresses:Iaddresses;
    addressTypes:addressTypes
  }
  export interface Iaddresses {
    city: string;
    firstName: string;
    lastName: string;
    state: string;
    street: string;
    zipCode: string;
  }

  export interface addressTypes {
    address_type_code: number;
    address_type_description: string;
    
  }