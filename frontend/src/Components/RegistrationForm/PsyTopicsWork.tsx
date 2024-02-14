import { FormControlLabel, Checkbox, Grid } from "@mui/material";
import {
  getPsyWorkTopics,
  PsyWorkTopics,
} from "../../api/getCatalogs/getPsyWorkTopics";

import React, { useEffect, useState } from "react";

function PsyTopicsWork({
  onTopicsChange,
}: {
  onTopicsChange: PsyWorkTopics[];
}) {
  const [topics, setTopics] = useState<PsyWorkTopics[]>([]);

  useEffect(() => {
    // Получение данных из API при загрузке компонента
    const fetchTopics = async () => {
      try {
        const topicsData = await getPsyWorkTopics();
        setTopics(topicsData);
      } catch (error) {
        console.error("Failed to fetch work topics:", error);
      }
    };

    fetchTopics();
  }, []);
  return (
    <>
      {topics.map((topics, index) => (
        <Grid item xs={12} key={index}>
          <FormControlLabel
            control={<Checkbox className="topics-checkbox" />}
            label={topics.name}
          />
        </Grid>
      ))}
    </>
  );
}

export default PsyTopicsWork;
