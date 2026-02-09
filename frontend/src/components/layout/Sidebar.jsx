import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SIDEBAR_LINKS } from "../../constants/sidebarLinks";

export default function Sidebar() {
  const [open, setOpen] = useState({});

  const toggle = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="col-2 bg-light border-end p-3">
      <ul className="list-group">

        {SIDEBAR_LINKS.map((section) => {
          const isOpen = open[section.key];

          return (
            <div key={section.key}>
              {/* SECTION HEADER */}
              <li
                className="list-group-item fw-bold d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => toggle(section.key)}
              >
                <span>{section.title}</span>

                {/* ARROW */}
                <span
                  style={{
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  &gt;
                </span>
              </li>

              {/* SUB MENU */}
              {isOpen && (
                <ul className="list-group ms-3">
                  {section.children.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.to}
                      className="list-group-item"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </ul>
              )}
            </div>
          );
        })}

      </ul>
    </div>
  );
}
