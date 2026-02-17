import DashboardLayout from "../../components/layout/DashboardLayout";
import SettingsLayout from "./SettingsLayout";

import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";
import NotificationsTab from "./NotificationsTab";
import IntegrationsTab from "./IntegrationsTab";

import AppointmentTab from "./AppointmentTab";
import WorkingHoursTab from "./WorkingHoursTab";
import CancellationReasonTab from "./CancellationReasonTab";

import InvoiceSettings from "./InvoiceSettings";
import InvoiceTemplates from "./InvoiceTemplates";
import Signatures from "./Signatures";
import CustomField from "./CustomField";

import EmailSetting from "./EmailSetting";
import EmailTemplate from "./EmailTemplate";
import SmsGateway from "./SmsGateway";
import SmsTemplate from "./SmsTemplate";
import GdprTemplate from "./GdprTemplate";

import PaymentMethods from "./PaymentMethods";
import BankAccounts from "./BankAccounts";
import TaxRates from "./TaxRates";
import Currencies from "./Currencies";

import Sitemap from "./Sitemap";
import ClearCache from "./ClearCache";
import Storage from "./Storage";
import CronjobSettings from "./CronjobSettings";
import BanIPAddress from "./BanIPAddress";
import SystemBackup from "./SystemBackup";
import DatabaseBackup from "./DatabaseBackup";
import SystemUpdate from "./SystemUpdate";

import { ROUTES } from "../../constants/routes";

export default [
  {
    element: <DashboardLayout />,
    children: [
      {
        element: <SettingsLayout />,  // ⭐ wrapper
        children: [

          { path: ROUTES.MY_PROFILE, element: <ProfileTab /> },
          { path: ROUTES.SECURITY, element: <SecurityTab /> },
          { path: ROUTES.NOTIFICATIONS, element: <NotificationsTab /> },
          { path: ROUTES.INTEGRATION_SETTING, element: <IntegrationsTab /> },

          { path: ROUTES.APPOINTMENT, element: <AppointmentTab /> },
          { path: ROUTES.WORKING_HOURS, element: <WorkingHoursTab /> },
          { path: ROUTES.CANCELLATION_REASON, element: <CancellationReasonTab /> },

          { path: ROUTES.INVOICE_SETTING, element: <InvoiceSettings /> },
          { path: ROUTES.INVOICE_TEMPLATE, element: <InvoiceTemplates /> },
          { path: ROUTES.SIGNATURE, element: <Signatures /> },
          { path: ROUTES.CUSTOM_FIELDS, element: <CustomField /> },

          { path: ROUTES.EMAIL_SETTING, element: <EmailSetting /> },
          { path: ROUTES.EMAIL_TEMPLATE, element: <EmailTemplate /> },
          { path: ROUTES.SMS_GATEWAY, element: <SmsGateway /> },
          { path: ROUTES.SMS_TEMPLATE, element: <SmsTemplate /> },
          { path: ROUTES.GDPR_COOKIES, element: <GdprTemplate /> },

          { path: ROUTES.PAYMENT_METHODS, element: <PaymentMethods /> },
          { path: ROUTES.BANK_ACCOUNTS, element: <BankAccounts /> },
          { path: ROUTES.TAX_RATES, element: <TaxRates /> },
          { path: ROUTES.CURRENCIES, element: <Currencies /> },

          { path: ROUTES.SITEMAP, element: <Sitemap /> },
          { path: ROUTES.CLEAR_CACHE, element: <ClearCache /> },
          { path: ROUTES.STORAGE, element: <Storage /> },
          { path: ROUTES.CRONJOB, element: <CronjobSettings /> },
          { path: ROUTES.BAN_IP, element: <BanIPAddress /> },
          { path: ROUTES.SYSTEM_BACKUPS, element: <SystemBackup /> },
          { path: ROUTES.DATABASE_BACKUPS, element: <DatabaseBackup /> },
          { path: ROUTES.SYSTEM_UPDATE, element: <SystemUpdate /> },

        ],
      },
    ],
  },
];
