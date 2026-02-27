import { ROUTES } from "./routes";

export const SIDEBAR_LINKS = [
  {
    title: "Dashboard",
    key: "dashboard",
    children: [
      { label: "Dashboard",  to: ROUTES.DASHBOARD },
      { label: "Staff Dashboard",  to: ROUTES.DASHBOARD_STAFF },

    ],
  },
  
    {
    title: "Store Onboarding",
    key: "onboarding",
    children: [
      { label: "Licence & GST", to: ROUTES.LICENCE_GST },
      { label: "Owner Details", to: ROUTES.OWNER_DETAILS },
      { label: "Store Details", to: ROUTES.STORE_DETAILS },
      { label: "Store Configuration", to: ROUTES.STORE_CONFIG },
      { label: "Subscription Plan", to: ROUTES.SUBSCRIPTION_PLAN },
      { label: "Success", to: ROUTES.ONBOARDING_SUCCESS },
    ],
  },


  {
    title: "Inventory Management",
    key: "inventory",
    children: [
      { label: "Medicine List", to: ROUTES.MEDICINE_LIST },
      { label: "Add Medicine", to: ROUTES.MEDICINE_ADD },
      { label: "Inventory List", to: ROUTES.INVENTORY_LIST },
      { label: "Batch Management", to: ROUTES.BATCH_MANAGEMENT },
      { label: "Expiry Tracking", to: ROUTES.EXPIRY_TRACKING },
      { label: "Barcode Management", to: ROUTES.BARCODE_MANAGER },
    ],
  },

    {
    title: "Sales",
    key: "sales",
    children: [
      { label: "Sales List", to: ROUTES.SALES_LIST },
      { label: "Invoice List", to: ROUTES.INVOICE_LIST },
      { label: "POS Billing", to: ROUTES.POS_BILLING },
      { label: "Payment History", to: ROUTES.PAYMENT_HISTORY },
      { label: "Sales Return", to: ROUTES.SALES_RETURN },
      { label: "Refunds", to: ROUTES.REFUNDS },
    ],
  },
 

  {
    title: "Customers",
    key: "customers",
    children: [
      { label: "Customer List", to: ROUTES.CUSTOMERLIST },
      { label: "Prescriptions", to: ROUTES.PRESSCRIPTIONHISTORY },
      { label: "Customer Profile", to: ROUTES.CUSTOMERPROFILE },
    ],
  },

{
  title: "Suppliers",
  key: "suppliers",
  children: [
    { label: "Supplier List", to: ROUTES.SUPPLIER_LIST },
    { label: "Add Supplier", to: ROUTES.SUPPLIER_FORM },
    { label: "Purchase Orders", to: ROUTES.PURCHASE_ORDER },
    { label: "Purchase Invoice (GRN)", to: ROUTES.PURCHASE_INVOICE },
    { label: "Supplier Payments", to: ROUTES.SUPPLIER_PAYMENTS },
    { label: "Purchase Returns", to: ROUTES.PURCHASE_RETURN },
  ],
},


  {
    title: "Reports & Analytics",
    key: "reports",
    children: [
      { label: "Sales Report", to: ROUTES.SALES_REPORT },
      { label: "GST Report", to: ROUTES.GST_REPORT },
      { label: "Audit Report", to: ROUTES.AUDIT_REPORT },
      { label: "Expiry Loss Report", to: ROUTES.EXPIRY_LOSS_REPORT },
      { label: "Inventory Analytics", to: ROUTES.INVENTORY_ANALYTICS },
      { label: "Download Reports", to: ROUTES.REPORT_DOWNLOAD },
    ],
  },



{
  title: "Staff & Roles",
  key: "staff",
  children: [
    { label: "Staff Management", to: ROUTES.STAFF_MANAGEMENT },
    { label: "Role Permissions", to: ROUTES.ROLE_PERMISSIONS },
    { label: "Attendance", to: ROUTES.STAFF_ATTENDANCE },
    { label: "Activity Logs", to: ROUTES.ACTIVITY_LOGS },
  ],
},



  {
    title: "Subscription & Plans",
    key: "subscription",
    children: [
      { label: "My Subscription", to: ROUTES.MY_SUBSCRIPTION },
      { label: "Available Plans", to: ROUTES.PLAN },
      { label: "Upgrade Plan", to: ROUTES.UPGRADE_PLAN },
      { label: "Invoice", to: ROUTES.SUBSCRIPTION_INVOICE },
      { label: "Billing History", to: ROUTES.BILLING_HISTORY },
    ],
  },


{
  title: "Settings",
  key: "settings",
  children: [

    // ================= ACCOUNT SETTINGS =================
    { label: "My Profile", to: ROUTES.MY_PROFILE },
    { label: "Security", to: ROUTES.SECURITY },
    { label: "Notifications", to: ROUTES.NOTIFICATIONS },
    { label: "Integrations", to: ROUTES.INTEGRATION_SETTING },

    // ================= CLINIC SETTINGS =================
    { label: "Appointment", to: ROUTES.APPOINTMENT },
    { label: "Working Hours", to: ROUTES.WORKING_HOURS },
    { label: "Cancellation Reason", to: ROUTES.CANCELLATION_REASON },

    // ================= APP SETTINGS =================
    { label: "Invoice Settings", to: ROUTES.INVOICE_SETTING },
    { label: "Invoice Templates", to: ROUTES.INVOICE_TEMPLATE },
    { label: "Signatures", to: ROUTES.SIGNATURE },
    { label: "Custom Fields", to: ROUTES.CUSTOM_FIELDS },

    // ================= SYSTEM SETTINGS =================
    { label: "Email Setting", to: ROUTES.EMAIL_SETTING },
    { label: "Email Template", to: ROUTES.EMAIL_TEMPLATE },
    { label: "SMS Gateway", to: ROUTES.SMS_GATEWAY },
    { label: "SMS Template", to: ROUTES.SMS_TEMPLATE },
    { label: "GDPR & Cookies", to: ROUTES.GDPR_COOKIES },

    // ================= FINANCE SETTINGS =================
    { label: "Payment Methods", to: ROUTES.PAYMENT_METHODS },
    { label: "Bank Accounts", to: ROUTES.BANK_ACCOUNTS },
    { label: "Tax Rates", to: ROUTES.TAX_RATES },
    { label: "Currencies", to: ROUTES.CURRENCIES },

    // ================= OTHER SETTINGS =================
    { label: "Sitemap", to: ROUTES.SITEMAP },
    { label: "Clear Cache", to: ROUTES.CLEAR_CACHE },
    { label: "Storage", to: ROUTES.STORAGE },
    { label: "Cronjob Settings", to: ROUTES.CRONJOB },
    { label: "Ban IP Address", to: ROUTES.BAN_IP },
    { label: "System Backup", to: ROUTES.SYSTEM_BACKUPS },
    { label: "Database Backup", to: ROUTES.DATABASE_BACKUPS },
    { label: "System Update", to: ROUTES.SYSTEM_UPDATE },

  ],
},



{
  title: "Developer",
  key: "developer",
  children: [
    { label: "Saroj", to: ROUTES.SAROJ },
    { label: "Banita", to: ROUTES.BANITA },
    { label: "Sarmistha", to: ROUTES.SARMISTHA },
  ],
},

];
