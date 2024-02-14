import { FormControlLabel, Checkbox, Grid } from "@mui/material";
import { getLanguages, Languages } from "../../api/getCatalogs/getLanguages";

import React, { useEffect, useState } from "react";

function LanguageChoose({
  onLanguagesChange,
}: {
  onLanguagesChange: Languages[];
}) {
  const [languages, setLanguages] = useState<Languages[]>([]);

  //Hook to get Languages from Api
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languagesData = await getLanguages();
        setLanguages(languagesData);
      } catch (error) {
        console.error("Failed to fetch languages", error);
      }
    };
    fetchLanguages();
  }, []);

  return (
    <>
      {languages.map((language, index) => (
        <Grid item xs={12} key={index}>
          <FormControlLabel
            control={<Checkbox className="topics-checkbox" />}
            label={language.name}
          />
        </Grid>
      ))}
    </>
  );
}

export default LanguageChoose;
