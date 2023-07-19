import { GarageInterface } from 'interfaces/garage';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InvoiceInterface {
  id?: string;
  garage_id?: string;
  status: string;
  payment_status: string;
  mechanic_id?: string;
  accountant_id?: string;
  created_at?: any;
  updated_at?: any;

  garage?: GarageInterface;
  user_invoice_mechanic_idTouser?: UserInterface;
  user_invoice_accountant_idTouser?: UserInterface;
  _count?: {};
}

export interface InvoiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  garage_id?: string;
  status?: string;
  payment_status?: string;
  mechanic_id?: string;
  accountant_id?: string;
}
