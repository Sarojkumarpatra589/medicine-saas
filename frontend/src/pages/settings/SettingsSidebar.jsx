import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { House, Gear, Wallet, FileText, Server } from "react-bootstrap-icons";
import "./settings.css";

export default function SettingsSidebar() {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState("");

  // Auto-open correct section
  useEffect(() => {
    const path = location.pathname;

    const sectionMap = {
      account: [
        ROUTES.MY_PROFILE,
        ROUTES.SECURITY,
        ROUTES.NOTIFICATIONS,
        ROUTES.INTEGRATION_SETTING,
      ],
      clinic: [
        ROUTES.APPOINTMENT,
        ROUTES.WORKING_HOURS,
        ROUTES.CANCELLATION_REASON,
      ],
      app: [
        ROUTES.INVOICE_SETTING,
        ROUTES.INVOICE_TEMPLATE,
        ROUTES.SIGNATURE,
        ROUTES.CUSTOM_FIELDS,
      ],
      system: [
        ROUTES.EMAIL_SETTING,
        ROUTES.EMAIL_TEMPLATE,
        ROUTES.SMS_GATEWAY,
        ROUTES.SMS_TEMPLATE,
        ROUTES.GDPR_COOKIES,
      ],
      finance: [
        ROUTES.PAYMENT_METHODS,
        ROUTES.BANK_ACCOUNTS,
        ROUTES.TAX_RATES,
        ROUTES.CURRENCIES,
      ],
      other: [
        ROUTES.SITEMAP,
        ROUTES.CLEAR_CACHE,
        ROUTES.STORAGE,
        ROUTES.CRONJOB,
        ROUTES.BAN_IP,
        ROUTES.SYSTEM_BACKUPS,
        ROUTES.DATABASE_BACKUPS,
        ROUTES.SYSTEM_UPDATE,
      ],
    };

    for (const key in sectionMap) {
      if (sectionMap[key].includes(path)) {
        setOpenMenu(key);
        break;
      }
    }
  }, [location.pathname]);

  return (
    <>
    <div className="settings-sidebar-container">
      <SidebarSection
        title="Account Settings"
        icon={<Gear size={16} />}
        openKey="account"
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        items={[
          { label: "Profile", path: ROUTES.MY_PROFILE },
          { label: "Security", path: ROUTES.SECURITY },
          { label: "Notifications", path: ROUTES.NOTIFICATIONS },
          { label: "Integrations", path: ROUTES.INTEGRATION_SETTING },
        ]}
      />

      <SidebarSection
        title="Clinic Settings"
        icon={<House size={16} />}
        openKey="clinic"
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        items={[
          { label: "Appointment", path: ROUTES.APPOINTMENT },
          { label: "Working Hours", path: ROUTES.WORKING_HOURS },
          { label: "Cancellation Reason", path: ROUTES.CANCELLATION_REASON },
        ]}
      />

      <SidebarSection
        title="App Settings"
        icon={<FileText size={16} />}
        openKey="app"
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        items={[
          { label: "Invoice Settings", path: ROUTES.INVOICE_SETTING },
          { label: "Invoice Templates", path: ROUTES.INVOICE_TEMPLATE },
          { label: "Signatures", path: ROUTES.SIGNATURE },
          { label: "Custom Fields", path: ROUTES.CUSTOM_FIELDS },
        ]}
      />

      <SidebarSection
        title="System Settings"
        icon={<Server size={16} />}
        openKey="system"
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        items={[
          { label: "Email Setting", path: ROUTES.EMAIL_SETTING },
          { label: "Email Template", path: ROUTES.EMAIL_TEMPLATE },
          { label: "SMS Gateway", path: ROUTES.SMS_GATEWAY },
          { label: "SMS Template", path: ROUTES.SMS_TEMPLATE },
          { label: "GDPR & Cookies", path: ROUTES.GDPR_COOKIES },
        ]}
      />

      <SidebarSection
        title="Finance Settings"
        icon={<Wallet size={16} />}
        openKey="finance"
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        items={[
          { label: "Payment Methods", path: ROUTES.PAYMENT_METHODS },
          { label: "Bank Accounts", path: ROUTES.BANK_ACCOUNTS },
          { label: "Tax Rates", path: ROUTES.TAX_RATES },
          { label: "Currencies", path: ROUTES.CURRENCIES },
        ]}
      />

      <SidebarSection
        title="Other Settings"
        icon={<Gear size={16} />}
        openKey="other"
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        items={[
          { label: "Sitemap", path: ROUTES.SITEMAP },
          { label: "Clear Cache", path: ROUTES.CLEAR_CACHE },
          { label: "Storage", path: ROUTES.STORAGE },
          { label: "Cronjob Settings", path: ROUTES.CRONJOB },
          { label: "Ban IP Address", path: ROUTES.BAN_IP },
          { label: "System Backup", path: ROUTES.SYSTEM_BACKUPS },
          { label: "Database Backup", path: ROUTES.DATABASE_BACKUPS },
          { label: "System Update", path: ROUTES.SYSTEM_UPDATE },
        ]}
      />
      </div>  
    </>
  );
}

function SidebarSection({ title, icon, openKey, openMenu, setOpenMenu, items }) {
  return (
    <div className="settings-sidebar mt-2">
      <div
        className="settings-title d-flex align-items-center"
        onClick={() => setOpenMenu(openMenu === openKey ? "" : openKey)}
      >
        {icon && <span className="me-2">{icon}</span>}
        {title}
      </div>

      {openMenu === openKey && (
        <ul className="settings-menu-list">
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  "settings-link" + (isActive ? " active-item" : "")
                }
              >
                <span className="dot"></span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}