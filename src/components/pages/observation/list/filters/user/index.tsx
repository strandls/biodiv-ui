import { Spinner } from "@chakra-ui/core";
import { selectStyles } from "@components/form/configs";
import useTranslation from "@configs/i18n/useTranslation";
import useObservationFilter from "@hooks/useObservationFilter";
import { axGetUsersByID, axUserFilterSearch } from "@services/user.service";
import { isBrowser } from "@static/constants";
import debounce from "debounce-promise";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

export default function UserFilterInput({ filterKey }) {
  const { filter, addFilter, removeFilter } = useObservationFilter();
  const { t } = useTranslation();
  const [defaultValue, setDefaultValue] = useState<any[]>();

  const onQuery = debounce(axUserFilterSearch, 200);

  useEffect(() => {
    axGetUsersByID(filter?.[filterKey]).then(setDefaultValue);
  }, []);

  const handleOnChange = (values) => {
    if (values?.length > 0) {
      addFilter(filterKey, values.map(({ value }) => value).toString());
    } else {
      removeFilter(filterKey);
    }
  };

  return defaultValue ? (
    <AsyncSelect
      name={filterKey}
      inputId={filterKey}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null
      }}
      noOptionsMessage={() => null}
      defaultValue={defaultValue}
      isClearable={true}
      isMulti={true}
      isSearchable={true}
      loadOptions={onQuery}
      menuPortalTarget={isBrowser && document.body}
      onChange={handleOnChange}
      placeholder={t("FILTERS.USER.SEARCH")}
      styles={selectStyles}
    />
  ) : (
    <Spinner />
  );
}