

import React from "react";
import { useForm } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Button,
  Grid
} from "@mui/material";

const MyForm = ({ valueForSelect, options, viewBy }) => {
  const { register, control, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange"
  });
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState(valueForSelect);
  const [showCheckbox, setShowCheckbox] = React.useState(false);

  const isAllSelected =
    options.length > 0 && selectedOptions.length === options.length;

  const handleSelectOption = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedOptions(
        selectedOptions.length === options.length ? [] : options
      );
      return;
    }
    setSelectedOptions(value);
  };

  const handleSelectValue = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    if (selectedValue === "View By Assigned") {
      setShowCheckbox(false);
      setSelectedOptions([]);
      setValue("options", []); // reset the value of "options" field
    } else {
      setShowCheckbox(true);
    }
  };

  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    console.log(data);
  };

  React.useEffect(() => {
    if (valueForSelect === "View By Committe") {
      setShowCheckbox(true);
    } else {
      setShowCheckbox(false);
    }
  }, [register]);

  // React.useEffect(() => {
  //   setShowCheckbox(false); // reset showCheckbox state when value changes
  // }, [register]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} lg={3}>
          <FormControl fullWidth>
            <InputLabel id="value-label"></InputLabel>
            <Select
              labelId="value-label"
              data-testid="getByTestId"
              id="value"
              value={selectedValue}
              onChange={handleSelectValue}
              inputProps={{
                ...register("value", { required: true }),
                "data-testid": "valueForSelect"
              }}
              fullWidth
              required
            >
              {viewBy.map((data, key) => (
                <MenuItem key={key} value={data.value}>
                  {data.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {showCheckbox && (
          <Grid item xs={12} md={3} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="options-label"></InputLabel>
              <Select
                labelId="options-label"
                id="options"
                multiple
                value={selectedOptions}
                onChange={handleSelectOption}
                inputProps={{
                  ...register("options", { required: true }),
                  "data-testid": "select-options"
                }}
                renderValue={(selected) => selected.join(", ")}
                control={control}
              >
                <MenuItem value="all">
                  <Checkbox checked={isAllSelected} />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={selectedOptions.indexOf(option) > -1} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12} md={3} lg={3}>
          <Button
            type="submit"
            variant="contained"
            // disabled={!formState.isValid}
            fullWidth
            data-testid="submit"
            sx={{ height: "100%", fontSize: "16px" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MyForm;

// import { render, screen, fireEvent } from "@testing-library/react";
// import MyForm from "../hello";

// describe("MyForm component", () => {
//   const options = ["Option 1", "Option 2", "Option 3"];
//   const viewBy = [
//     { label: "View By Committee", value: "View By Committee" },
//     { label: "View By Assigned", value: "View By Assigned" }
//   ];

//   it("renders the select options and submit button", () => {
//     render(<MyForm options={options} viewBy={viewBy} />);
//     const selectValue = screen.getByTestId("valueForSelect");
//     const selectOptions = screen.getByTestId("select-options");
//     const submitButton = screen.getByRole("button", { name: "Submit" });

//     expect(selectValue).toBeInTheDocument();
//     expect(selectOptions).toBeInTheDocument();
//     expect(submitButton).toBeInTheDocument();
//   });

//   it("displays all options when Select All is checked", () => {
//     render(<MyForm options={options} viewBy={viewBy} />);
//     const selectAllCheckbox = screen.getByLabelText("Select All");

//     fireEvent.click(selectAllCheckbox);

//     options.forEach((option) => {
//       expect(screen.getByText(option)).toBeInTheDocument();
//     });
//   });

//   it("displays the correct selected options", () => {
//     render(<MyForm options={options} viewBy={viewBy} />);
//     const option1Checkbox = screen.getByLabelText("Option 1");
//     const option2Checkbox = screen.getByLabelText("Option 2");

//     fireEvent.click(option1Checkbox);
//     fireEvent.click(option2Checkbox);

//     expect(option1Checkbox).toBeChecked();
//     expect(option2Checkbox).toBeChecked();
//   });

//   it("disables the submit button if required fields are not filled out", () => {
//     render(<MyForm options={options} viewBy={viewBy} />);
//     const submitButton = screen.getByRole("button", { name: "Submit" });

//     expect(submitButton).toBeDisabled();
//   });

//   it("enables the submit button when all required fields are filled out", () => {
//     render(<MyForm options={options} viewBy={viewBy} />);
//     const selectAllCheckbox = screen.getByLabelText("Select All");
//     const option1Checkbox = screen.getByLabelText("Option 1");
//     const selectValue = screen.getByTestId("valueForSelect");
//     const submitButton = screen.getByRole("button", { name: "Submit" });
//     fireEvent.click(selectAllCheckbox);
//     fireEvent.click(option1Checkbox);
//     fireEvent.change(selectValue, { target: { value: "View By Committee" } });

//     expect(submitButton).toBeEnabled();
//   });
//   it("calls onSubmit handler when form is submitted", () => {
//     const mockOnSubmit = jest.fn();
//     render(
//       <MyForm options={options} viewBy={viewBy} onSubmit={mockOnSubmit} />
//     );
//     const selectAllCheckbox = screen.getByLabelText("Select All");
//     const option1Checkbox = screen.getByLabelText("Option 1");
//     const selectValue = screen.getByTestId("valueForSelect");
//     const submitButton = screen.getByRole("button", { name: "Submit" });

//     fireEvent.click(selectAllCheckbox);
//     fireEvent.click(option1Checkbox);
//     fireEvent.change(selectValue, { target: { value: "View By Committee" } });
//     fireEvent.click(submitButton);

//     expect(mockOnSubmit).toHaveBeenCalledWith({
//       selectAll: true,
//       options: ["Option 1"],
//       viewBy: "View By Committee"
//     });
//   });
// });

