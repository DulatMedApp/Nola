import { MenuItem, Select } from "@mui/material";
import {
  getTherapyMethods,
  TherapyMethods,
} from "../../api/getCatalogs/getTherapyMethods";

import React, { useEffect, useState } from "react";

function PsyMethodWork({
  onMethodWorksChange,
}: {
  onMethodWorksChange: TherapyMethods[];
}) {
  const [therapy, setTherapy] = useState<TherapyMethods[]>([]);

  useEffect(() => {
    if (therapy.length > 0) {
      setContactValue(therapy[0].id.toString());
    }
  }, [therapy]);

  const [ContactValue, setContactValue] = useState("");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setContactValue(event.target.value);
  };

  //Hook to get Methods from Api
  useEffect(() => {
    const fetchTherapy = async () => {
      try {
        const therapyData = await getTherapyMethods();
        setTherapy(therapyData);
      } catch (error) {
        console.error("Failed to fetch Therapy", error);
      }
    };
    fetchTherapy();
  }, []);
  return (
    <>
      <Select
        labelId="Contact Select"
        id="demo-simple-select"
        value={ContactValue}
        label="Select Contact"
        onChange={handleChange}>
        {therapy.map((data) => {
          return (
            <MenuItem key={data.id} value={data.id}>
              {data.name}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}

export default PsyMethodWork;
