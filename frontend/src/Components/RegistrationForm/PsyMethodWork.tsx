import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import {
  getTherapyMethods,
  TherapyMethods,
} from "../../api/getCatalogs/getTherapyMethods";

import React, { useEffect, useState } from "react";

interface PsyMethodWorkProps {
  onMethodWorksChange: (selectedMethod: string) => void;
}

const PsyMethodWork: React.FC<PsyMethodWorkProps> = ({
  onMethodWorksChange,
}) => {
  const [therapy, setTherapy] = useState<TherapyMethods[]>([]);
  const [contactValue, setContactValue] = useState<string>("");

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

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setContactValue(selectedValue);
    onMethodWorksChange(selectedValue);
  };

  return (
    <Select
      labelId="Contact Select"
      id="demo-simple-select"
      value={contactValue}
      label="Select Contact"
      onChange={handleChange}>
      {therapy.map((data) => (
        <MenuItem key={data.id} value={data.id.toString()}>
          {data.name}
        </MenuItem>
      ))}
    </Select>
  );
};

// function PsyMethodWork({
//   onMethodWorksChange,
// }: {
//   onMethodWorksChange: TherapyMethods[];
// }) {
//   const [therapy, setTherapy] = useState<TherapyMethods[]>([]);

//   useEffect(() => {
//     if (therapy.length > 0) {
//       setContactValue(therapy[0].id.toString());
//     }
//   }, [therapy]);

//   const [ContactValue, setContactValue] = useState("");

//   const handleChange = (event: {
//     target: { value: React.SetStateAction<string> };
//   }) => {
//     setContactValue(event.target.value);
//   };

//   //Hook to get Methods from Api
//   useEffect(() => {
//     const fetchTherapy = async () => {
//       try {
//         const therapyData = await getTherapyMethods();
//         setTherapy(therapyData);
//       } catch (error) {
//         console.error("Failed to fetch Therapy", error);
//       }
//     };
//     fetchTherapy();
//   }, []);
//   return (
//     <>
//       <Select
//         labelId="Contact Select"
//         id="demo-simple-select"
//         value={ContactValue}
//         label="Select Contact"
//         onChange={handleChange}>
//         {therapy.map((data) => {
//           return (
//             <MenuItem key={data.id} value={data.id}>
//               {data.name}
//             </MenuItem>
//           );
//         })}
//       </Select>
//     </>
//   );
// }

export default PsyMethodWork;
