CREATE MIGRATION m1jhnqaom3mqcqwcjbmfsjsqwejrgke6tcsn4klwmj64jw6dato2xa
    ONTO m1mgshjhy36it2pa4apidctj5d6nsawznpmgh7t6wi3ky3gojdgmbq
{
  CREATE TYPE auth::TenantMetadata {
      CREATE PROPERTY tenant_favicon: std::str;
      CREATE PROPERTY tenant_logo: std::str;
      CREATE PROPERTY tenant_main_color: std::str;
      CREATE PROPERTY tenant_secondary_color: std::str;
  };
  ALTER TYPE auth::Tenant {
      CREATE LINK tenant_metadata: auth::TenantMetadata;
  };
  CREATE TYPE inventory::ProductCustomFields {
      CREATE REQUIRED LINK product: inventory::Product;
      CREATE REQUIRED LINK tenant: auth::Tenant;
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY field_type: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  ALTER TYPE inventory::Product {
      CREATE MULTI LINK fields: inventory::ProductCustomFields {
          CREATE PROPERTY value: std::str;
      };
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
  };
};
