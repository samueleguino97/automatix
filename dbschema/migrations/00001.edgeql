CREATE MIGRATION m1mgshjhy36it2pa4apidctj5d6nsawznpmgh7t6wi3ky3gojdgmbq
    ONTO initial
{
  CREATE MODULE auth IF NOT EXISTS;
  CREATE MODULE facturacion IF NOT EXISTS;
  CREATE MODULE inventory IF NOT EXISTS;
  CREATE TYPE auth::Tenant {
      CREATE PROPERTY active: std::bool;
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE auth::Branch {
      CREATE REQUIRED LINK tenant: auth::Tenant;
      CREATE REQUIRED PROPERTY active: std::bool;
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY slug := (std::str_lower(std::re_replace(.name, ' ', '-')));
  };
  CREATE TYPE auth::Company {
      CREATE REQUIRED LINK tenant: auth::Tenant;
      CREATE REQUIRED PROPERTY active: std::bool;
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY slug := (std::str_lower(std::re_replace(.name, ' ', '-')));
  };
  ALTER TYPE auth::Branch {
      CREATE LINK company: auth::Company;
  };
  ALTER TYPE auth::Company {
      CREATE MULTI LINK branches := (.<company[IS auth::Branch]);
  };
  CREATE SCALAR TYPE auth::UserRole EXTENDING enum<Admin, Employee>;
  CREATE TYPE auth::User {
      CREATE REQUIRED LINK branch: auth::Branch;
      CREATE MULTI LINK branches: auth::Branch;
      CREATE REQUIRED LINK tenant: auth::Tenant;
      CREATE REQUIRED PROPERTY active: std::bool;
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY slug := (std::str_lower(std::re_replace(.name, ' ', '-')));
      CREATE REQUIRED PROPERTY password: std::str;
      CREATE PROPERTY pin: std::str {
          CREATE CONSTRAINT std::max_len_value(6);
      };
      CREATE REQUIRED PROPERTY salt: std::str;
      CREATE REQUIRED PROPERTY user_role: auth::UserRole;
      CREATE REQUIRED PROPERTY username: std::str;
  };
  ALTER TYPE auth::Branch {
      CREATE MULTI LINK users := (.<branch[IS auth::User]);
  };
  CREATE TYPE auth::EmployeeRole {
      CREATE REQUIRED LINK tenant: auth::Tenant;
      CREATE REQUIRED PROPERTY active: std::bool;
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE auth::Permission {
      CREATE REQUIRED PROPERTY active: std::bool;
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY slug: std::str;
  };
  ALTER TYPE auth::EmployeeRole {
      CREATE MULTI LINK permissions: auth::Permission;
  };
  ALTER TYPE auth::Permission {
      CREATE MULTI LINK employee_roles := (.<permissions[IS auth::EmployeeRole]);
  };
  ALTER TYPE auth::User {
      CREATE LINK employee_role: auth::EmployeeRole;
  };
  ALTER TYPE auth::EmployeeRole {
      CREATE MULTI LINK users := (.<employee_role[IS auth::User]);
  };
  CREATE TYPE inventory::Category {
      CREATE REQUIRED LINK tenant: auth::Tenant;
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE inventory::Unit {
      CREATE REQUIRED LINK tenant: auth::Tenant;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY name: std::str;
  };
  CREATE TYPE inventory::Product {
      CREATE REQUIRED LINK tenant: auth::Tenant;
      CREATE REQUIRED LINK category: inventory::Category;
      CREATE REQUIRED LINK unit: inventory::Unit;
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE SCALAR TYPE inventory::InventoryTransactionType EXTENDING enum<MoveIn, MoveOut, Lost>;
  CREATE TYPE inventory::InventoryHistory {
      CREATE REQUIRED LINK tenant: auth::Tenant;
      CREATE REQUIRED LINK by_user: auth::User;
      CREATE REQUIRED LINK product: inventory::Product;
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY quantity: std::float32;
      CREATE REQUIRED PROPERTY transaction_price: std::float32;
      CREATE REQUIRED PROPERTY transaction_type: inventory::InventoryTransactionType;
  };
  ALTER TYPE inventory::Category {
      CREATE MULTI LINK products := (.<category[IS inventory::Product]);
  };
};
