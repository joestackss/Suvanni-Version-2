import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ headers, onSorting }) => {
  const [sortingFields, setSortingFields] = useState(
    headers.reduce((obj, { field }) => ({ ...obj, [field]: "desc" }), {})
  );

  const onSortingChange = (field) => {
    const newSortingFields = {
      ...sortingFields,
      [field]: sortingFields[field] === "asc" ? "desc" : "asc",
    };
    setSortingFields(newSortingFields);
    onSorting(field, newSortingFields[field]);
  };

  return (
    <div className="headerMain">
      <div className="headerInner1">
        {headers.map(({ name, field, sortable }, index) => (
          <span
            key={name}
            onClick={() => (sortable ? onSortingChange(field) : null)}
            className="headerTitle"
          >
            {name}

            <div className="arrow">
              {index === 2 || index === 3
                ? sortingFields[field] && (
                    <FontAwesomeIcon
                      icon={
                        sortingFields[field] === "asc"
                          ? "fa-sort-up"
                          : "fa-sort-down"
                      }
                    />
                  )
                : null}
            </div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Header;
