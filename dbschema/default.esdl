
module auth {
    scalar type UserRole extending enum<Admin,Employee>;

    type EmployeeRole {
        required name: str;
        description: str;
        required active: bool;
        required tenant: Tenant;
        multi link users := .<employee_role[is User];
        multi permissions: Permission;
        
    }

    type Permission {
        required name: str;
        description: str;
        required slug: str;
        required active: bool;
        multi link employee_roles := .<permissions[is EmployeeRole];
    }

    type Tenant {
         required name: str;
        description: str; 
        active: bool;
        required created_at: datetime {
            readonly := true;
            default := datetime_of_statement();
        }
        tenant_metadata: TenantMetadata;
    }

    type TenantMetadata {
        tenant_main_color: str;
        tenant_logo: str;
        tenant_favicon: str;
        tenant_secondary_color: str;
    }

    type User {
        name: str;
        required username: str;
        required password: str;
        required salt : str;
        property slug := str_lower(re_replace(.name, ' ', '-'));
        required active: bool;
        required tenant: Tenant;
        required branch: Branch;
        required user_role: UserRole;
        employee_role: EmployeeRole;
        pin: str {
            constraint max_len_value(6);
        }
        multi branches: Branch;required created_at: datetime {
    readonly := true;
    default := datetime_of_statement();
  }
    }
    type Company {
        required name: str;
        description: str;
        required active: bool;
        required tenant: Tenant;
        multi link branches := .<company[is Branch];
        required created_at: datetime {
    readonly := true;
    default := datetime_of_statement();
  }
  property slug := str_lower(re_replace(.name, ' ', '-'));
    }
    type Branch {
        
        required name: str;
        description: str;
        required active: bool;
        required tenant: Tenant;
        multi link users := .<branch[is User];
        company: Company;
        required created_at: datetime {
    readonly := true;
    default := datetime_of_statement();
    }
  property slug := str_lower(re_replace(.name, ' ', '-'));
    }

}
module inventory {
    scalar type InventoryTransactionType extending enum<MoveIn,MoveOut,Lost>;
    type Category {
        required name: str;
        description: str;
        required tenant: auth::Tenant;
        multi link products := .<category[is Product];
    }
    type Product {
        required name: str;
        description: str;
        required unit : Unit;
        required tenant: auth::Tenant;
        required category: Category;
        multi fields: ProductCustomFields {
            value: str;
        }
        required created_at: datetime {
            readonly := true;
            default := datetime_of_statement();
        }

    }
    type ProductCustomFields {
        required name: str;
        required field_type: str;
        required description: str;
        required tenant: auth::Tenant;
        required product: Product;
        required created_at: datetime {
            readonly := true;
            default := datetime_of_statement();
        }
    }
    type Unit {
        name: str;
        description: str;
        required tenant: auth::Tenant;
    }
    type InventoryHistory {
        required product: Product;
        required quantity: float32;
        required tenant: auth::Tenant;
        required transaction_type: InventoryTransactionType;
        required transaction_price: float32;
        required by_user: auth::User;
        required created_at: datetime {
            readonly := true;
            default := datetime_of_statement();
        }
    }


}
module default {


}
module facturacion {

}